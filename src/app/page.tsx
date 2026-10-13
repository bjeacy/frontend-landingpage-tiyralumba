// src/app/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const programs = [
  {
    title: 'Kelas Pemula Anak',
    description: 'Adaptasi air, keselamatan, dan dasar gaya bebas untuk perenang muda.',
  },
  {
    title: 'Kelas Menengah',
    description: 'Sempurnakan teknik gaya bebas dan punggung sambil membangun stamina.',
  },
  {
    title: 'Kelas Lanjutan Atlet',
    description: 'Latihan kompetitif untuk teknik start, turn, dan performa pertandingan.',
  },
];

export default function Home() {
  return (
    <>
      <section className="overflow-hidden bg-azure">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
          <p className="font-heading text-sm font-semibold tracking-[0.2em] text-primary">PT TIRYA LUMBA</p>
          <h1 className="mx-auto mt-5 max-w-4xl font-heading text-4xl font-bold leading-tight text-textDark md:text-6xl">
            Temukan ritme terbaikmu di dalam air.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-textDark/80">
            Kelas renang aman dan terarah untuk setiap usia, dari langkah pertama hingga prestasi.
          </p>
          <Link href="/daftar" className="mt-9 inline-block">
            <Button variant="landing">Daftar Sekarang</Button>
          </Link>
        </div>
      </section>

      <section id="program" className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="font-heading text-sm font-semibold tracking-[0.2em] text-cyan">PROGRAM RENANG</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-textDark md:text-4xl">Belajar sesuai levelmu.</h2>
          <p className="mt-4 leading-7 text-textDark/75">Program berjenjang untuk membangun percaya diri dan kemampuan di air.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {programs.map((program) => (
            <article key={program.title} className="rounded-2xl bg-white p-7 shadow-lg shadow-blue-900/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-azure font-heading text-xl font-bold text-primary">
                ~
              </div>
              <h3 className="mt-6 font-heading text-xl font-bold text-textDark">{program.title}</h3>
              <p className="mt-3 leading-7 text-textDark/75">{program.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
