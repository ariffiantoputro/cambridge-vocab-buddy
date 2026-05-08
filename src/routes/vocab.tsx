import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus, Pencil, Trash2, Upload, X, ArrowLeft, Download, RotateCcw, Eye } from "lucide-react";
import { PARTS_OF_SPEECH, LEVEL_COLORS, type Level, type VocabRow } from "@/data/partsOfSpeech";
import {
  useUserVocab,
  detectPos,
  detectLevel,
  detectUsage,
  parseBulk,
  seedKey,
  type PosId,
  type UserVocab,
} from "@/lib/vocabStore";

export const Route = createFileRoute("/vocab")({
  component: VocabPage,
});

const LEVELS: Level[] = ["A2", "B1", "B2", "C1", "C2"];
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type Combined = VocabRow & {
  pos: PosId;
  posName: string;
  source: "seed" | "user";
  id?: string;
  seedKey?: string;
};

function VocabPage() {
  const {
    list: userList, overrides, hidden,
    add, addMany, update, remove,
    overrideSeed, resetSeed, hideSeed,
  } = useUserVocab();

  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState<string>("");
  const [level, setLevel] = useState<Level | "">("");
  const [pos, setPos] = useState<PosId | "">("");

  const [showAdd, setShowAdd] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [editing, setEditing] = useState<UserVocab | null>(null);
  const [editingSeed, setEditingSeed] = useState<{ key: string; row: Combined } | null>(null);
  const [showExport, setShowExport] = useState(false);

  const all: Combined[] = useMemo(() => {
    const seeds: Combined[] = PARTS_OF_SPEECH.flatMap((p) =>
      p.vocab.map((v) => {
        const key = seedKey(p.id, v.word);
        const ov = overrides[key] || {};
        return {
          ...v,
          ...ov,
          pos: (ov.pos as PosId) || (p.id as PosId),
          posName:
            PARTS_OF_SPEECH.find((x) => x.id === ((ov.pos as PosId) || p.id))?.name ||
            p.name,
          source: "seed" as const,
          seedKey: key,
        };
      }).filter((v) => !hidden.includes(v.seedKey!)),
    );
    const users: Combined[] = userList.map((u) => ({
      ...u,
      posName: PARTS_OF_SPEECH.find((p) => p.id === u.pos)?.name || u.pos,
      source: "user" as const,
    }));
    return [...users, ...seeds];
  }, [userList, overrides, hidden]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((v) => {
      if (letter && v.word[0]?.toUpperCase() !== letter) return false;
      if (level && v.level !== level) return false;
      if (pos && v.pos !== pos) return false;
      if (q && !(v.word.toLowerCase().includes(q) || v.meaning.toLowerCase().includes(q)))
        return false;
      return true;
    });
  }, [all, query, letter, level, pos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-4 flex items-center gap-2">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Bab 2
          </Link>
        </div>

        <header className="mb-6">
          <p className="text-xs font-bold tracking-[0.3em] text-muted-foreground">
            CAMBRIDGE ENGLISH · KAMUS
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
            Pencarian & Manajemen Kosakata
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Cari berdasarkan abjad, kata, level, atau jenis kata. Tambah kosakata kamu sendiri (satu per satu atau langsung banyak).
          </p>
        </header>

        {/* Search bar */}
        <div className="mb-4 flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari kata atau arti..."
              className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as Level | "")}
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          >
            <option value="">Semua Level</option>
            {LEVELS.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <select
            value={pos}
            onChange={(e) => setPos(e.target.value as PosId | "")}
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          >
            <option value="">Semua Jenis</option>
            {PARTS_OF_SPEECH.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" /> Tambah
          </button>
          <button
            onClick={() => setShowBulk(true)}
            className="inline-flex items-center gap-1 rounded-lg border bg-card px-3 py-2 text-sm font-semibold hover:bg-muted"
          >
            <Upload className="h-4 w-4" /> Bulk
          </button>
          <button
            onClick={() => setShowExport(true)}
            className="inline-flex items-center gap-1 rounded-lg border bg-card px-3 py-2 text-sm font-semibold hover:bg-muted"
            title="Export semua data sebagai JSON"
          >
            <Download className="h-4 w-4" /> Export
          </button>
        </div>

        {/* Alphabet */}
        <div className="mb-4 flex flex-wrap gap-1">
          <button
            onClick={() => setLetter("")}
            className={`rounded px-2 py-1 text-xs font-bold ${letter === "" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/70"}`}
          >
            ALL
          </button>
          {ALPHABET.map((l) => (
            <button
              key={l}
              onClick={() => setLetter(l === letter ? "" : l)}
              className={`h-7 w-7 rounded text-xs font-bold ${letter === l ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/70"}`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="mb-2 text-xs text-muted-foreground">
          {filtered.length} kata · {userList.length} kata milikmu
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-muted/60">
              <tr>
                <th className="p-2.5">No</th>
                <th className="p-2.5">Kata</th>
                <th className="p-2.5">Level</th>
                <th className="p-2.5">Jenis</th>
                <th className="p-2.5">Arti</th>
                <th className="p-2.5">Contoh (EN → ID)</th>
                <th className="p-2.5">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr key={(v.id || "s") + v.word + i} className="border-t align-top hover:bg-muted/30">
                  <td className="p-2.5 text-muted-foreground">{i + 1}</td>
                  <td className="p-2.5 font-bold">{v.word}</td>
                  <td className="p-2.5">
                    <span className={`inline-block rounded-md border px-1.5 py-0.5 text-[10px] font-bold ${LEVEL_COLORS[v.level]}`}>
                      {v.level}
                    </span>
                  </td>
                  <td className="p-2.5 text-muted-foreground">{v.posName}</td>
                  <td className="p-2.5">{v.meaning || "—"}</td>
                  <td className="p-2.5">
                    {v.example ? (
                      <div>
                        <div className="italic">{v.example}</div>
                        {v.exampleId && (
                          <div className="text-[11px] text-muted-foreground">🇮🇩 {v.exampleId}</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="p-2.5">
                    {v.source === "user" && v.id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => setEditing(userList.find((u) => u.id === v.id) || null)}
                          className="rounded p-1 hover:bg-muted"
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Hapus "${v.word}"?`)) remove(v.id!);
                          }}
                          className="rounded p-1 text-red-500 hover:bg-red-500/10"
                          title="Hapus"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-1">
                        <button
                          onClick={() => setEditingSeed({ key: v.seedKey!, row: v })}
                          className="rounded p-1 hover:bg-muted"
                          title="Edit (tersimpan sebagai override)"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        {overrides[v.seedKey!] && (
                          <button
                            onClick={() => resetSeed(v.seedKey!)}
                            className="rounded p-1 hover:bg-muted"
                            title="Reset ke default"
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (confirm(`Sembunyikan "${v.word}" dari daftar?`))
                              hideSeed(v.seedKey!);
                          }}
                          className="rounded p-1 text-red-500 hover:bg-red-500/10"
                          title="Sembunyikan"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-muted-foreground">
                    Tidak ada kata yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <AddDialog
          onClose={() => setShowAdd(false)}
          onSave={(v) => {
            add(v);
            setShowAdd(false);
          }}
        />
      )}
      {editing && (
        <AddDialog
          initial={editing}
          onClose={() => setEditing(null)}
          onSave={(v) => {
            update(editing.id, v);
            setEditing(null);
          }}
        />
      )}
      {editingSeed && (
        <AddDialog
          initial={{
            id: "seed",
            createdAt: 0,
            ...editingSeed.row,
          } as UserVocab}
          onClose={() => setEditingSeed(null)}
          onSave={(v) => {
            overrideSeed(editingSeed.key, v);
            setEditingSeed(null);
          }}
        />
      )}
      {showBulk && (
        <BulkDialog
          onClose={() => setShowBulk(false)}
          onSave={(rows) => {
            addMany(rows);
            setShowBulk(false);
          }}
        />
      )}
      {showExport && (
        <ExportDialog
          data={{ user: userList, overrides, hidden, seeds: PARTS_OF_SPEECH }}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
}

// =================== Add / Edit Dialog ===================

function AddDialog({
  initial,
  onClose,
  onSave,
}: {
  initial?: UserVocab;
  onClose: () => void;
  onSave: (v: Omit<UserVocab, "id" | "createdAt">) => void;
}) {
  const [word, setWord] = useState(initial?.word || "");
  const [meaning, setMeaning] = useState(initial?.meaning || "");
  const [autoLevel, setAutoLevel] = useState<Level>(initial?.level || "A2");
  const [autoPos, setAutoPos] = useState<PosId>(initial?.pos || "noun");
  const [manual, setManual] = useState(!!initial);
  const [synonym, setSynonym] = useState(initial?.synonym || "");
  const [antonym, setAntonym] = useState(initial?.antonym || "");
  const [usage, setUsage] = useState(initial?.usage || "");
  const [example, setExample] = useState(initial?.example || "");
  const [exampleId, setExampleId] = useState(initial?.exampleId || "");
  const [autoUsage, setAutoUsage] = useState(true);

  // auto detect on word change (when not manual override)
  const handleWord = (w: string) => {
    setWord(w);
    if (!manual && w.trim()) {
      const p = detectPos(w);
      setAutoPos(p);
      setAutoLevel(detectLevel(w));
      if (autoUsage && !initial) setUsage(detectUsage(w, p));
    }
  };

  return (
    <Modal title={initial ? "Edit Kosakata" : "Tambah Kosakata"} onClose={onClose}>
      <div className="space-y-3">
        <Field label="Kata (English) *">
          <input
            value={word}
            onChange={(e) => handleWord(e.target.value)}
            className="input"
            placeholder="e.g. opportunity"
            autoFocus
          />
        </Field>
        <Field label="Arti (Indonesia) *">
          <input value={meaning} onChange={(e) => setMeaning(e.target.value)} className="input" placeholder="e.g. kesempatan" />
        </Field>

        <div className="rounded-lg border bg-muted/30 p-3">
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" checked={manual} onChange={(e) => setManual(e.target.checked)} />
            Atur level & jenis kata manual (default: deteksi otomatis)
          </label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <select value={autoLevel} onChange={(e) => setAutoLevel(e.target.value as Level)} className="input" disabled={!manual}>
              {LEVELS.map((l) => <option key={l}>{l}</option>)}
            </select>
            <select value={autoPos} onChange={(e) => setAutoPos(e.target.value as PosId)} className="input" disabled={!manual}>
              {PARTS_OF_SPEECH.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          {!manual && (
            <div className="mt-2 text-[11px] text-muted-foreground">
              Auto: <strong>{autoLevel}</strong> · <strong>{PARTS_OF_SPEECH.find(p => p.id === autoPos)?.name}</strong>
            </div>
          )}
        </div>

        <details className="rounded-lg border p-3 text-sm">
          <summary className="cursor-pointer font-semibold">Detail tambahan (opsional)</summary>
          <div className="mt-3 space-y-2">
            <Field label="Synonym"><input value={synonym} onChange={(e) => setSynonym(e.target.value)} className="input" /></Field>
            <Field label="Antonym"><input value={antonym} onChange={(e) => setAntonym(e.target.value)} className="input" /></Field>
            <Field label="Penjelasan penggunaan (opsional, auto-detect)">
              <div className="flex gap-2">
                <input value={usage} onChange={(e) => { setUsage(e.target.value); setAutoUsage(false); }} className="input" placeholder="e.g. Noun abstrak..." />
                <button
                  type="button"
                  onClick={() => { setUsage(detectUsage(word, autoPos)); setAutoUsage(true); }}
                  className="whitespace-nowrap rounded-lg border px-2 text-xs"
                  title="Deteksi otomatis"
                >
                  Auto
                </button>
              </div>
            </Field>
            <Field label="Contoh kalimat (English) — opsional">
              <input value={example} onChange={(e) => setExample(e.target.value)} className="input" placeholder="e.g. She got an opportunity to study abroad." />
            </Field>
            <Field label="Translate kalimat (Indonesia) — opsional">
              <input value={exampleId} onChange={(e) => setExampleId(e.target.value)} className="input" />
            </Field>
          </div>
        </details>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="rounded-lg border px-4 py-2 text-sm">Batal</button>
          <button
            onClick={() => {
              if (!word.trim() || !meaning.trim()) {
                alert("Kata dan arti wajib diisi.");
                return;
              }
              onSave({
                word: word.trim(),
                meaning: meaning.trim(),
                level: autoLevel,
                pos: autoPos,
                synonym, antonym, usage, example, exampleId,
              });
            }}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Simpan
          </button>
        </div>
      </div>
    </Modal>
  );
}

// =================== Bulk Dialog ===================

function BulkDialog({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (rows: Omit<UserVocab, "id" | "createdAt">[]) => void;
}) {
  const [text, setText] = useState("");
  const [stage, setStage] = useState<"input" | "review">("input");
  const [rows, setRows] = useState<Omit<UserVocab, "id" | "createdAt">[]>([]);
  const parsed = useMemo(() => parseBulk(text), [text]);

  const updateRow = (i: number, patch: Partial<(typeof rows)[number]>) =>
    setRows((r) => r.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));
  const removeRow = (i: number) => setRows((r) => r.filter((_, idx) => idx !== i));

  if (stage === "review") {
    return (
      <Modal title={`Pratinjau & Koreksi (${rows.length} kata)`} onClose={onClose}>
        <p className="mb-2 text-xs text-muted-foreground">
          Edit setiap baris sebelum dikonfirmasi. Klik 🗑 untuk membuang baris yang salah.
        </p>
        <div className="max-h-[55vh] space-y-2 overflow-auto pr-1">
          {rows.map((r, i) => (
            <div key={i} className="rounded-lg border bg-muted/20 p-2 text-xs">
              <div className="mb-1 flex items-center justify-between">
                <strong className="text-sm">#{i + 1} {r.word}</strong>
                <button onClick={() => removeRow(i)} className="text-red-500" title="Buang">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <input className="input" value={r.word} onChange={(e) => updateRow(i, { word: e.target.value })} placeholder="word" />
                <input className="input" value={r.meaning} onChange={(e) => updateRow(i, { meaning: e.target.value })} placeholder="arti" />
                <select className="input" value={r.level} onChange={(e) => updateRow(i, { level: e.target.value as Level })}>
                  {LEVELS.map((l) => <option key={l}>{l}</option>)}
                </select>
                <select className="input" value={r.pos} onChange={(e) => updateRow(i, { pos: e.target.value as PosId, usage: detectUsage(r.word, e.target.value as PosId) })}>
                  {PARTS_OF_SPEECH.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <input className="input col-span-2" value={r.usage} onChange={(e) => updateRow(i, { usage: e.target.value })} placeholder="penggunaan (auto)" />
                <input className="input col-span-2" value={r.example} onChange={(e) => updateRow(i, { example: e.target.value })} placeholder="contoh kalimat (opsional)" />
                <input className="input col-span-2" value={r.exampleId} onChange={(e) => updateRow(i, { exampleId: e.target.value })} placeholder="translate kalimat (opsional)" />
              </div>
            </div>
          ))}
          {rows.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">Tidak ada baris.</div>
          )}
        </div>
        <div className="flex justify-end gap-2 pt-3">
          <button onClick={() => setStage("input")} className="rounded-lg border px-4 py-2 text-sm">← Kembali</button>
          <button
            disabled={rows.length === 0}
            onClick={() => onSave(rows.filter((r) => r.word.trim() && r.meaning.trim()))}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            ✓ Konfirmasi & Tambahkan
          </button>
        </div>
      </Modal>
    );
  }
  return (
    <Modal title="Tambah Banyak Kata Sekaligus" onClose={onClose}>
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">
          Satu kata per baris. Format yang didukung:
          <br />• <code>word</code>
          <br />• <code>word - meaning</code> atau <code>word: meaning</code>
          <br />• <code>word | meaning | example | translate</code>
          <br />Level & jenis kata akan dideteksi otomatis (bisa diedit nanti).
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="input font-mono text-xs"
          placeholder={"opportunity - kesempatan\nrun | berlari | I run every morning. | Saya berlari setiap pagi.\nbeautiful - cantik"}
        />
        {parsed.length > 0 && (
          <div className="max-h-48 overflow-auto rounded-lg border bg-muted/30 p-2 text-xs">
            <div className="mb-1 font-semibold">Hasil parsing ({parsed.length} kata):</div>
            {parsed.map((p, i) => (
              <div key={i} className="flex flex-wrap gap-2 border-b py-1 last:border-0">
                <strong>{p.word}</strong>
                <span className={`rounded border px-1 text-[10px] ${LEVEL_COLORS[p.level]}`}>{p.level}</span>
                <span className="text-muted-foreground">{PARTS_OF_SPEECH.find(x => x.id === p.pos)?.name}</span>
                <span className="text-muted-foreground">→ {p.meaning || "(no meaning)"}</span>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="rounded-lg border px-4 py-2 text-sm">Batal</button>
          <button
            disabled={parsed.length === 0}
            onClick={() => { setRows(parsed); setStage("review"); }}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            Lanjut ke Pratinjau →
          </button>
        </div>
      </div>
    </Modal>
  );
}

// =================== Export Dialog ===================

function ExportDialog({ data, onClose }: { data: unknown; onClose: () => void }) {
  const json = useMemo(() => JSON.stringify(data, null, 2), [data]);
  const download = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Modal title="Export Semua Data" onClose={onClose}>
      <p className="mb-2 text-xs text-muted-foreground">
        Berisi seluruh kosakata seed (8 part of speech), kata milikmu, override, dan kata yang disembunyikan.
        Salin JSON di bawah, atau download sebagai file <code>.json</code>.
      </p>
      <textarea readOnly value={json} rows={14} className="input font-mono text-[11px]" onFocus={(e) => e.currentTarget.select()} />
      <div className="flex justify-end gap-2 pt-3">
        <button
          onClick={() => { navigator.clipboard.writeText(json); }}
          className="rounded-lg border px-4 py-2 text-sm"
        >
          📋 Salin JSON
        </button>
        <button
          onClick={() => download("cambridge-vocab.json", json, "application/json")}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          ⬇ Download .json
        </button>
      </div>
    </Modal>
  );
}

// =================== UI helpers ===================

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-2xl bg-card p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="rounded p-1 hover:bg-muted"><X className="h-4 w-4" /></button>
        </div>
        {children}
      </div>
      <style>{`.input{width:100%;border:1px solid var(--border, #e5e7eb);background:var(--background, #fff);color:var(--foreground, #111);border-radius:.5rem;padding:.5rem .75rem;font-size:.875rem;outline:none}.input:focus{box-shadow:0 0 0 2px color-mix(in oklab, var(--primary, #3b82f6) 40%, transparent)}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-semibold text-muted-foreground">{label}</div>
      {children}
    </label>
  );
}