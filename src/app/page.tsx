import { HeroSection } from '@/components/features/HeroSection';
import { ProgramCard } from '@/components/features/ProgramCard';
import { InstructorCard } from '@/components/features/InstructorCard';
import { getPrograms } from '@/services/program.service';
import { getInstructors } from '@/services/instructor.service';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

// Server Component — data fetch di server (RAM-friendly)
export const revalidate=60;

export default async function Home(){
  const [programs, instructors]=await Promise.all([getPrograms(), getInstructors()]);
  const fallbackPrograms= programs.length? programs : [
    { id:'p1', title:'Kelas Pemula Anak', description:'Dasar renang, adaptasi air, gaya bebas dasar.', level:'pemula' as const, duration:'8 pertemuan', price:1200000 },
    { id:'p2', title:'Kelas Menengah', description:'Penyempurnaan gaya bebas & punggung, endurance.', level:'menengah' as const, duration:'12 pertemuan', price:1800000 },
    { id:'p3', title:'Kelas Lanjutan / Atlet', description:'Teknik kompetitif, start & turn, program atlet.', level:'lanjutan' as const, duration:'16 pertemuan', price:2500000 },
  ];
  const fallbackInstructors= instructors.length? instructors.slice(0,3) : [
    { id:'i1', name:'Coach Andi', specialty:'Gaya Bebas', experience:8 },
    { id:'i2', name:'Coach Sari', specialty:'Anak & Pemula', experience:6 },
    { id:'i3', name:'Coach Budi', specialty:'Atlet', experience:10 },
  ];
  return (
    <>
      <HeroSection />
      {/* Brand */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-center text-sm tracking-widest text-gray-400">DIPERCAYA OLEH 500+ SISWA & 20+ SEKOLAH MITRA</p>
        <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <span className="rounded-full border px-4 py-1">KONI</span><span className="rounded-full border px-4 py-1">Dispora</span><span className="rounded-full border px-4 py-1">PRSI</span>
        </div>
      </section>
      {/* Program */}
      <section id="program" className="mx-auto max-w-6xl px-6 py-8">
        <h2 className="text-2xl font-bold">Program Kami</h2>
        <p className="text-sm text-gray-600 mt-1">Pilih level sesuai kemampuanmu.</p>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {fallbackPrograms.map(p=> <ProgramCard key={p.id} program={p} />)}
        </div>
      </section>
      {/* Tentang */}
      <section className="mx-auto max-w-6xl px-6 py-8 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold">Tentang Kami</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">PT Tirya Lumba adalah sekolah renang dengan kurikulum berjenjang, fokus pada keselamatan, teknik yang benar, dan pembentukan karakter atlet sejak dini.</p>
          <ul className="mt-4 text-sm text-gray-600 list-disc pl-5 space-y-1">
            <li>Kolam standar & aman untuk anak</li>
            <li>Rasio pelatih : siswa 1:4</li>
            <li>Sertifikat & evaluasi berkala</li>
          </ul>
        </div>
        <div className="h-56 rounded-3xl bg-gray-100 flex items-center justify-center text-sm text-gray-400">Foto Kolam / Kegiatan</div>
      </section>
      {/* Kenapa */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <h2 className="text-2xl font-bold">Kenapa Pilih Kami</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white p-5 border"><h3 className="font-medium">Pelatih Bersertifikat</h3><p className="text-sm text-gray-600 mt-1">Lisensi nasional & pengalaman kompetisi.</p></div>
            <div className="rounded-2xl bg-white p-5 border"><h3 className="font-medium">Jadwal Fleksibel</h3><p className="text-sm text-gray-600 mt-1">Pagi / sore, weekday & weekend.</p></div>
            <div className="rounded-2xl bg-white p-5 border"><h3 className="font-medium">Aman untuk Anak</h3><p className="text-sm text-gray-600 mt-1">Protokol keselamatan & pendampingan penuh.</p></div>
          </div>
        </div>
      </section>
      {/* Pelatih */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Pelatih Kami</h2>
          <Link href="/pelatih" className="text-sm text-brand-600 underline">Lihat semua</Link>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {fallbackInstructors.map(i=> <InstructorCard key={i.id} instructor={i} />)}
        </div>
        <div className="mt-8 text-center">
          <Link href="/daftar"><Button size="lg">Daftar Sekarang</Button></Link>
        </div>
      </section>
    </>
  );
}
