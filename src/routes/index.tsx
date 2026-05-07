import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { PARTS_OF_SPEECH, LEVEL_COLORS, type PartOfSpeech } from "@/data/partsOfSpeech";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/40">
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <header className="mb-10 text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-muted-foreground">
            BAB 2 · CAMBRIDGE ENGLISH
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            Parts of Speech
          </h1>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            8 Jenis Kata dalam Bahasa Inggris · Level A2 – C2
          </p>
        </header>

        <section className="mb-10 rounded-2xl border bg-card p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold">Apa itu Parts of Speech?</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            <strong className="text-foreground">Parts of Speech</strong> adalah klasifikasi
            kata dalam bahasa Inggris berdasarkan fungsi gramatikalnya di dalam kalimat.
            Memahami parts of speech adalah fondasi utama untuk menguasai grammar, menyusun
            kalimat yang benar, dan meningkatkan skor di tes seperti{" "}
            <strong className="text-foreground">TOEFL, IELTS, dan Linguaskill</strong>.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            Dalam bahasa Inggris terdapat <strong className="text-foreground">8 jenis
            parts of speech</strong> utama: Noun, Pronoun, Verb, Adjective, Adverb,
            Preposition, Conjunction, dan Interjection. Setiap kata memiliki peran khusus
            dan dapat berubah fungsi tergantung konteks kalimat.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <UsageCard
              title="Cara Penggunaan"
              points={[
                "Identifikasi fungsi kata dalam kalimat (subjek, objek, modifier).",
                "Perhatikan posisi kata: sebelum/sesudah noun, verb, dll.",
                "Satu kata bisa berubah parts of speech (run = verb / noun).",
              ]}
            />
            <UsageCard
              title="Tips Menguasai"
              points={[
                "Hafal contoh kalimat, bukan hanya definisi.",
                "Latihan mengidentifikasi parts of speech di reading section.",
                "Pelajari collocation untuk hasil maksimal di tes.",
              ]}
            />
          </div>
        </section>

        <h2 className="mb-5 text-center text-xl font-bold tracking-wide">
          8 KARTU PARTS OF SPEECH
        </h2>

        <div className="space-y-4">
          {PARTS_OF_SPEECH.map((pos, i) => (
            <PosCard key={pos.id} pos={pos} index={i + 1} />
          ))}
        </div>

        <footer className="mt-12 text-center text-xs text-muted-foreground">
          Cambridge English · Offline Learning Companion
        </footer>
      </div>
    </div>
  );
}

function UsageCard({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="rounded-xl border bg-muted/30 p-4">
      <h3 className="text-sm font-bold uppercase tracking-wide">{title}</h3>
      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
        {points.map((p, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-primary">•</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PosCard({ pos, index }: { pos: PartOfSpeech; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-gradient-to-br ${pos.color} shadow-sm transition-all`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-4 bg-card/70 p-5 text-left backdrop-blur transition hover:bg-card/90"
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-background text-2xl shadow-sm">
          {pos.icon}
        </div>
        <div className="flex-1">
          <div className="text-xs font-semibold tracking-wider text-muted-foreground">
            KARTU {index}
          </div>
          <div className="text-lg font-bold md:text-xl">{pos.name}</div>
          <div className="text-xs text-muted-foreground md:text-sm">{pos.subtitle}</div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="space-y-5 bg-card/95 p-5 md:p-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-primary">
              Penjelasan
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              {pos.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-primary">
              Cara Penggunaan
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">{pos.usage}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-muted/30 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wide">Aturan Penting</h4>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {pos.rules.map((r, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary">›</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wide">Contoh Kalimat</h4>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {pos.examples.map((e, i) => (
                  <li key={i} className="italic">
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wide text-primary">
              💡 Tips Sering Keluar di TOEFL / Linguaskill
            </h4>
            <ul className="mt-2 space-y-1.5 text-sm text-foreground/90">
              {pos.testTips.map((t, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary font-bold">{i + 1}.</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">
              Tabel Kosakata
            </h3>
            <p className="mb-2 text-[11px] text-muted-foreground">
              💬 <strong>Tap</strong> sebuah kata untuk lihat artinya per kata · <strong>Tekan & tahan</strong> untuk lihat terjemahan kalimat penuh.
            </p>
            <div className="overflow-x-auto rounded-lg border bg-background">
              <table className="w-full text-left text-xs md:text-sm">
                <thead className="bg-muted/60 text-foreground">
                  <tr>
                    <th className="p-2.5 font-semibold">No</th>
                    <th className="p-2.5 font-semibold">Kata</th>
                    <th className="p-2.5 font-semibold">Level</th>
                    <th className="p-2.5 font-semibold">Arti</th>
                    <th className="p-2.5 font-semibold">Synonym</th>
                    <th className="p-2.5 font-semibold">Antonym</th>
                    <th className="p-2.5 font-semibold">Penggunaan</th>
                    <th className="p-2.5 font-semibold">Contoh Kalimat (EN → ID)</th>
                  </tr>
                </thead>
                <tbody>
                  {pos.vocab.map((v, i) => (
                    <tr key={i} className="border-t align-top hover:bg-muted/30">
                      <td className="p-2.5 text-muted-foreground">{i + 1}</td>
                      <td className="p-2.5 font-bold">{v.word}</td>
                      <td className="p-2.5">
                        <span
                          className={`inline-block rounded-md border px-1.5 py-0.5 text-[10px] font-bold ${LEVEL_COLORS[v.level]}`}
                        >
                          {v.level}
                        </span>
                      </td>
                      <td className="p-2.5">{v.meaning}</td>
                      <td className="p-2.5 text-muted-foreground">{v.synonym}</td>
                      <td className="p-2.5 text-muted-foreground">{v.antonym}</td>
                      <td className="p-2.5 text-muted-foreground">{v.usage}</td>
                      <td className="p-2.5">
                        <InteractiveSentence
                          sentence={v.example}
                          translation={v.exampleId}
                          headword={v.word}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Mini word-by-word EN→ID dictionary for example sentences.
// Tap a word = show its meaning. Long-press the sentence = show full translation.
// ============================================================
const WORD_DICT: Record<string, string> = {
  a: "sebuah", an: "sebuah", the: "(itu/ini)",
  i: "saya", "i'm": "saya sedang", you: "kamu", he: "dia (lk)", she: "dia (pr)",
  it: "itu", we: "kami/kita", they: "mereka", me: "saya (obj)", him: "dia (lk obj)",
  her: "dia/-nya (pr)", us: "kami (obj)", them: "mereka (obj)", his: "miliknya (lk)",
  my: "saya punya", your: "kamu punya", our: "kami punya", their: "mereka punya",
  this: "ini", that: "itu", "that's": "itu adalah", these: "ini (jamak)", those: "itu (jamak)",
  is: "adalah", am: "adalah", are: "adalah", was: "adalah (lampau)", were: "adalah (lampau)",
  be: "menjadi", been: "telah", being: "sedang menjadi",
  has: "memiliki", have: "memiliki", had: "memiliki (lampau)",
  do: "melakukan", does: "melakukan", did: "melakukan (lampau)", done: "selesai",
  will: "akan", would: "akan", can: "bisa", could: "bisa (lampau)", should: "seharusnya",
  must: "harus", may: "mungkin", might: "mungkin",
  not: "tidak", "won't": "tidak akan", "don't": "tidak", "didn't": "tidak (lampau)",
  and: "dan", or: "atau", but: "tetapi", so: "jadi", because: "karena", if: "jika",
  when: "ketika", while: "selagi", although: "meskipun", though: "meskipun",
  in: "di (dalam)", on: "di (atas)", at: "di/pada", to: "ke/untuk", from: "dari",
  of: "dari/milik", for: "untuk", with: "dengan", by: "oleh", as: "sebagai",
  about: "tentang", into: "ke dalam", out: "keluar", up: "atas", down: "bawah",
  family: "keluarga", lives: "tinggal", jakarta: "Jakarta",
  knowledge: "pengetahuan", power: "kekuatan",
  opportunity: "kesempatan", got: "mendapat", study: "belajar", abroad: "ke luar negeri",
  perspective: "sudut pandang", plan: "rencana", risky: "berisiko",
  paradigm: "paradigma", discovery: "penemuan", shifted: "menggeser", scientific: "ilmiah",
  research: "penelitian", doing: "melakukan", climate: "iklim", change: "perubahan",
  environment: "lingkungan", protect: "melindungi",
  consequence: "akibat", every: "setiap", action: "tindakan",
  phenomenon: "fenomena", global: "global",
  integrity: "integritas", leader: "pemimpin", great: "hebat",
  friends: "teman-teman", friend: "teman",
  ourselves: "kami sendiri", themselves: "mereka sendiri", oneself: "diri sendiri",
  whom: "siapa (obj)", speak: "berbicara", whoever: "siapa pun", calls: "menelepon",
  tell: "katakan", "let's": "mari kita",
  one: "seseorang", believe: "percaya",
  built: "membangun", house: "rumah",
  anybody: "siapa saja", home: "rumah",
  each: "masing-masing", other: "lain", love: "cinta",
  such: "begitu", life: "hidup",
  none: "tidak satu pun", came: "datang",
  achieve: "mencapai", achieved: "mencapai", goal: "tujuan",
  analyze: "menganalisis", need: "perlu", data: "data",
  demonstrate: "menunjukkan", demonstrated: "mendemonstrasikan", new: "baru", product: "produk",
  implement: "menerapkan", company: "perusahaan", rules: "aturan",
  elaborate: "menjelaskan rinci", idea: "ide",
  scrutinize: "memeriksa cermat", scrutinized: "memeriksa cermat", auditor: "auditor", report: "laporan",
  discuss: "diskusikan",
  consider: "mempertimbangkan", considering: "mempertimbangkan", moving: "pindah",
  enhance: "meningkatkan", enhances: "meningkatkan", reading: "membaca", vocabulary: "kosakata",
  advocate: "membela", advocates: "membela", "women's": "perempuan", rights: "hak",
  happy: "bahagia", today: "hari ini",
  important: "penting", education: "pendidikan",
  significant: "signifikan", there: "(ada)",
  comprehensive: "menyeluruh",
  ubiquitous: "ada di mana-mana", smartphones: "smartphone",
  reliable: "dapat diandalkan",
  efficient: "efisien", method: "metode",
  ambiguous: "ambigu", answer: "jawaban",
  diverse: "beragam", indonesia: "Indonesia", cultures: "budaya",
  meticulous: "sangat teliti", work: "pekerjaan",
  carefully: "dengan hati-hati", drive: "berkendara",
  usually: "biasanya", wake: "bangun",
  frequently: "sering", travels: "bepergian",
  particularly: "khususnya", enjoyed: "menikmati", music: "musik",
  consequently: "akibatnya", rained: "hujan", match: "pertandingan", cancelled: "dibatalkan",
  ostensibly: "seolah-olah", help: "membantu",
  rarely: "jarang", eats: "makan", meat: "daging",
  thoroughly: "secara menyeluruh", clean: "bersihkan", room: "kamar",
  nevertheless: "meskipun demikian", hard: "sulit", succeeded: "berhasil",
  henceforth: "mulai sekarang", smoking: "merokok", prohibited: "dilarang",
  between: "di antara", sit: "duduklah",
  among: "di antara", popular: "populer", students: "siswa",
  despite: "meskipun", rain: "hujan", went: "pergi",
  throughout: "sepanjang", worked: "bekerja", night: "malam",
  regarding: "mengenai", writing: "menulis", application: "lamaran",
  notwithstanding: "walaupun", cost: "biaya", proceeded: "melanjutkan",
  beneath: "di bawah", keys: "kunci", mat: "keset",
  across: "menyeberangi", swam: "berenang", river: "sungai",
  amongst: "di antara", walked: "berjalan", crowd: "kerumunan",
  via: "melalui", send: "kirim", email: "email",
  left: "pergi", tired: "lelah",
  whereas: "sedangkan", calm: "tenang", loud: "berisik",
  moreover: "selain itu", cheap: "murah",
  nonetheless: "namun", won: "menang",
  albeit: "walaupun", agreed: "setuju", reluctantly: "dengan enggan",
  unless: "kecuali jika", come: "datang", "go": "pergi",
  whenever: "kapan pun", call: "hubungi",
  furthermore: "lebih lanjut", healthy: "sehat", tasty: "enak",
  thus: "dengan demikian", studied: "belajar", passed: "lulus",
  wow: "wah", view: "pemandangan", what: "betapa",
  ouch: "aduh", hurt: "sakit",
  oops: "ups", forgot: "lupa",
  alas: "sayang sekali", never: "tidak pernah", returned: "kembali",
  hurray: "hore",
  phew: "fiuh", close: "nyaris",
  bravo: "bagus", excellent: "luar biasa", performance: "penampilan",
  eureka: "ketemu!", found: "menemukan",
  behold: "lihatlah", king: "raja", arrives: "tiba",
  yikes: "astaga", big: "besar", spider: "laba-laba",
};

function lookupWord(raw: string): string {
  const key = raw.toLowerCase().replace(/[.,!?;:'"()]/g, "");
  if (WORD_DICT[key]) return WORD_DICT[key];
  // strip common suffixes
  const stripped = key.replace(/(ing|ed|es|s|ly)$/, "");
  if (WORD_DICT[stripped]) return WORD_DICT[stripped];
  return "—";
}

function InteractiveSentence({
  sentence,
  translation,
  headword,
}: {
  sentence: string;
  translation: string;
  headword: string;
}) {
  const [showFull, setShowFull] = useState(false);
  const [activeWord, setActiveWord] = useState<{ word: string; meaning: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressed = useRef(false);

  const tokens = sentence.split(/(\s+)/);
  const head = headword.toLowerCase();

  const startPress = (word: string) => {
    longPressed.current = false;
    timer.current = setTimeout(() => {
      longPressed.current = true;
      setShowFull(true);
      setActiveWord(null);
    }, 450);
  };

  const endPress = (word: string) => {
    if (timer.current) clearTimeout(timer.current);
    if (!longPressed.current) {
      const meaning = lookupWord(word);
      setActiveWord({ word: word.replace(/[.,!?;:]/g, ""), meaning });
      setShowFull(false);
    }
  };

  const cancelPress = () => {
    if (timer.current) clearTimeout(timer.current);
  };

  return (
    <div className="space-y-1.5">
      <div className="font-medium italic leading-relaxed select-none">
        {tokens.map((tok, idx) => {
          if (/^\s+$/.test(tok)) return <span key={idx}>{tok}</span>;
          const clean = tok.toLowerCase().replace(/[.,!?;:'"()]/g, "");
          const isHead = clean === head || clean.startsWith(head);
          return (
            <span
              key={idx}
              onMouseDown={() => startPress(tok)}
              onMouseUp={() => endPress(tok)}
              onMouseLeave={cancelPress}
              onTouchStart={() => startPress(tok)}
              onTouchEnd={() => endPress(tok)}
              onTouchCancel={cancelPress}
              onContextMenu={(e) => e.preventDefault()}
              className={`cursor-pointer rounded px-0.5 transition active:bg-primary/20 hover:bg-primary/10 ${
                isHead ? "font-extrabold not-italic text-primary" : ""
              }`}
            >
              {tok}
            </span>
          );
        })}
      </div>

      {activeWord && !showFull && (
        <div className="rounded-md border border-primary/30 bg-primary/5 px-2 py-1 text-[11px]">
          <strong>{activeWord.word}</strong> → {activeWord.meaning}
          {activeWord.meaning === "—" && (
            <span className="ml-1 text-muted-foreground">(tahan untuk arti kalimat)</span>
          )}
        </div>
      )}

      {showFull && (
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 px-2 py-1 text-xs">
          🇮🇩 {translation}
        </div>
      )}

      {!activeWord && !showFull && (
        <div className="text-[10px] text-muted-foreground">
          tap kata · tahan untuk kalimat penuh
        </div>
      )}
    </div>
  );
}
