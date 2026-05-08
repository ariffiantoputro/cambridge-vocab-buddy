import { useEffect, useState } from "react";
import { PARTS_OF_SPEECH, type Level, type VocabRow } from "@/data/partsOfSpeech";

export type PosId =
  | "noun"
  | "pronoun"
  | "verb"
  | "adjective"
  | "adverb"
  | "preposition"
  | "conjunction"
  | "interjection";

export interface UserVocab extends VocabRow {
  id: string;
  pos: PosId;
  createdAt: number;
}

const KEY = "cambridge_user_vocab_v1";
const OVERRIDE_KEY = "cambridge_seed_overrides_v1";
const HIDDEN_KEY = "cambridge_seed_hidden_v1";

function read(): UserVocab[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
function write(list: UserVocab[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("vocab:changed"));
}

export type SeedOverrides = Record<string, Partial<VocabRow> & { pos?: PosId }>;
function readOverrides(): SeedOverrides {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(OVERRIDE_KEY) || "{}"); } catch { return {}; }
}
function writeOverrides(o: SeedOverrides) {
  localStorage.setItem(OVERRIDE_KEY, JSON.stringify(o));
  window.dispatchEvent(new Event("vocab:changed"));
}
function readHidden(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(HIDDEN_KEY) || "[]"); } catch { return []; }
}
function writeHidden(h: string[]) {
  localStorage.setItem(HIDDEN_KEY, JSON.stringify(h));
  window.dispatchEvent(new Event("vocab:changed"));
}

export function seedKey(pos: string, word: string) {
  return `${pos}::${word.toLowerCase()}`;
}

export function useUserVocab() {
  const [list, setList] = useState<UserVocab[]>([]);
  const [overrides, setOverrides] = useState<SeedOverrides>({});
  const [hidden, setHidden] = useState<string[]>([]);
  useEffect(() => {
    setList(read()); setOverrides(readOverrides()); setHidden(readHidden());
    const h = () => { setList(read()); setOverrides(readOverrides()); setHidden(readHidden()); };
    window.addEventListener("vocab:changed", h);
    return () => window.removeEventListener("vocab:changed", h);
  }, []);
  return {
    list,
    overrides,
    hidden,
    add: (v: Omit<UserVocab, "id" | "createdAt">) => {
      const all = read();
      all.push({ ...v, id: crypto.randomUUID(), createdAt: Date.now() });
      write(all);
    },
    addMany: (vs: Omit<UserVocab, "id" | "createdAt">[]) => {
      const all = read();
      const now = Date.now();
      vs.forEach((v, i) =>
        all.push({ ...v, id: crypto.randomUUID(), createdAt: now + i }),
      );
      write(all);
    },
    update: (id: string, patch: Partial<UserVocab>) => {
      write(read().map((v) => (v.id === id ? { ...v, ...patch } : v)));
    },
    remove: (id: string) => {
      write(read().filter((v) => v.id !== id));
    },
    clear: () => write([]),
    overrideSeed: (key: string, patch: Partial<VocabRow> & { pos?: PosId }) => {
      const o = readOverrides();
      o[key] = { ...(o[key] || {}), ...patch };
      writeOverrides(o);
    },
    resetSeed: (key: string) => {
      const o = readOverrides(); delete o[key]; writeOverrides(o);
    },
    hideSeed: (key: string) => {
      const h = readHidden(); if (!h.includes(key)) h.push(key); writeHidden(h);
    },
    unhideSeed: (key: string) => {
      writeHidden(readHidden().filter((k) => k !== key));
    },
  };
}

// ===== Auto-detection =====

const PRONOUNS = new Set([
  "i","you","he","she","it","we","they","me","him","her","us","them",
  "my","your","his","its","our","their","mine","yours","hers","ours","theirs",
  "this","that","these","those","who","whom","whose","which","what",
  "myself","yourself","himself","herself","itself","ourselves","yourselves","themselves",
  "someone","anyone","everyone","nobody","somebody","anybody","everybody","none","one",
]);
const PREPOSITIONS = new Set([
  "in","on","at","to","from","of","for","with","by","as","about","into","onto",
  "over","under","above","below","between","among","amongst","across","through",
  "during","before","after","since","until","till","against","behind","beside",
  "beneath","beyond","within","without","upon","despite","regarding","via",
  "throughout","notwithstanding",
]);
const CONJUNCTIONS = new Set([
  "and","or","but","so","because","if","when","while","although","though",
  "whereas","unless","until","since","as","before","after","once","whenever",
  "wherever","moreover","however","therefore","furthermore","nevertheless",
  "nonetheless","albeit","whether","than","that",
]);
const INTERJECTIONS = new Set([
  "wow","ouch","oops","alas","hurray","hooray","phew","bravo","eureka","behold",
  "yikes","aha","hey","oh","ah","hmm","ugh","yay","whoa","gosh","damn","wtf","lol",
]);
const AUX_VERBS = new Set([
  "is","am","are","was","were","be","been","being",
  "have","has","had","do","does","did","done",
  "will","would","can","could","should","must","may","might","shall",
]);

export function detectPos(wordRaw: string): PosId {
  const w = wordRaw.trim().toLowerCase();
  if (PRONOUNS.has(w)) return "pronoun";
  if (PREPOSITIONS.has(w)) return "preposition";
  if (CONJUNCTIONS.has(w)) return "conjunction";
  if (INTERJECTIONS.has(w)) return "interjection";
  if (AUX_VERBS.has(w)) return "verb";

  // suffix heuristics
  if (/(ly)$/.test(w) && w.length > 3) return "adverb";
  if (/(ous|ful|less|ive|able|ible|al|ic|ish|ant|ent)$/.test(w)) return "adjective";
  if (/(ing|ed)$/.test(w) && w.length > 4) return "verb";
  if (/(ize|ise|ate|ify|en)$/.test(w) && w.length > 4) return "verb";
  if (/(tion|sion|ment|ness|ity|ship|hood|ism|ance|ence|er|or|ist|age)$/.test(w))
    return "noun";

  // fallback: check seed dataset
  for (const p of PARTS_OF_SPEECH) {
    if (p.vocab.some((v) => v.word.toLowerCase() === w)) return p.id as PosId;
  }
  return "noun";
}

export function detectLevel(wordRaw: string): Level {
  const w = wordRaw.trim().toLowerCase();
  // check seed dataset first
  for (const p of PARTS_OF_SPEECH) {
    const hit = p.vocab.find((v) => v.word.toLowerCase() === w);
    if (hit) return hit.level;
  }
  const len = w.length;
  if (len <= 4) return "A2";
  if (len <= 6) return "B1";
  if (len <= 9) return "B2";
  if (len <= 12) return "C1";
  return "C2";
}

// Heuristic usage description per POS / suffix
export function detectUsage(wordRaw: string, pos?: PosId): string {
  const w = wordRaw.trim().toLowerCase();
  // check seed dataset first for an existing usage hint
  for (const p of PARTS_OF_SPEECH) {
    const hit = p.vocab.find((v) => v.word.toLowerCase() === w);
    if (hit && hit.usage) return hit.usage;
  }
  const p: PosId = pos || detectPos(w);
  switch (p) {
    case "noun":
      if (/(tion|sion|ment|ness|ity|ism|ance|ence)$/.test(w))
        return "Noun abstrak — sering muncul di TOEFL/Linguaskill akademik.";
      if (/(er|or|ist)$/.test(w))
        return "Noun pelaku (orang yang melakukan sesuatu).";
      return "Kata benda — bisa jadi subjek atau objek kalimat.";
    case "verb":
      if (/ing$/.test(w)) return "Bentuk -ing (gerund / present participle).";
      if (/ed$/.test(w)) return "Bentuk past / past participle.";
      if (/(ize|ise|ate|ify|en)$/.test(w)) return "Verb pembentuk aksi/proses.";
      return "Kata kerja — menyatakan aksi atau keadaan.";
    case "adjective":
      if (/(ous|ful|ive|al|ic)$/.test(w)) return "Adjective deskriptif.";
      if (/(less)$/.test(w)) return "Adjective negatif (tanpa…).";
      if (/(able|ible)$/.test(w)) return "Adjective bermakna 'dapat di-…'.";
      return "Kata sifat — menjelaskan noun.";
    case "adverb":
      return "Adverb — menjelaskan verb/adjective/adverb lain. Posisi fleksibel.";
    case "pronoun":
      return "Pronoun — pengganti noun untuk menghindari pengulangan.";
    case "preposition":
      return "Preposition — menghubungkan noun/pronoun dengan kata lain (waktu, tempat, arah).";
    case "conjunction":
      return "Conjunction — penghubung klausa/kata. Perhatikan koma & FANBOYS.";
    case "interjection":
      return "Interjection — ungkapan emosi singkat. Diakhiri tanda seru.";
  }
  return "";
}

/**
 * Parse bulk text. Supports:
 *   - one word per line
 *   - "word - meaning" / "word = meaning" / "word: meaning"
 *   - "word | meaning | example | exampleId"
 * Returns rows ready to be added (POS + level auto-detected when blank).
 */
export function parseBulk(text: string): Omit<UserVocab, "id" | "createdAt">[] {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|").map((s) => s.trim());
      let word = "", meaning = "", example = "", exampleId = "";
      if (parts.length >= 2) {
        [word, meaning, example = "", exampleId = ""] = parts as string[];
      } else {
        const m = line.match(/^([^\-=:]+)\s*[-=:]\s*(.+)$/);
        if (m) {
          word = m[1].trim();
          meaning = m[2].trim();
        } else {
          word = line;
        }
      }
      const pos = detectPos(word);
      const level = detectLevel(word);
      return {
        word,
        meaning,
        level,
        pos,
        synonym: "",
        antonym: "",
        usage: detectUsage(word, pos),
        example,
        exampleId,
      };
    });
}