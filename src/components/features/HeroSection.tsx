// src/components/features/HeroSection.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="bg-azure">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="font-heading text-sm font-semibold tracking-[0.2em] text-primary">PT TIRYA LUMBA</p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-textDark md:text-5xl">
            Jago Renang Bersama PT Tirya Lumba
          </h1>
          <p className="mt-4 text-textDark/70">
            Program terstruktur untuk pemula hingga atlet. Pelatih bersertifikat, jadwal fleksibel.
          </p>
          <div className="mt-8">
            <Link href="/daftar">
              <Button variant="landing">Daftar Sekarang</Button>
            </Link>
          </div>
        </div>
        <div className="flex h-64 items-center justify-center rounded-2xl bg-white shadow-lg shadow-blue-900/5 md:h-80">
          <span className="text-sm text-textDark/70">Hero Image / Illustration</span>
        </div>
      </div>
    </section>
  );
}
