import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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

          <div>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">
              Tabel Kosakata
            </h3>
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
                        <div className="font-medium italic">{v.example}</div>
                        <div className="mt-0.5 text-muted-foreground">→ {v.exampleId}</div>
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
