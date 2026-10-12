export const dynamic='force-dynamic';
export const revalidate=0;
export const fetchCache='force-no-store';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
export default function DaftarPage(){
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-bold text-center">Pilih Jenis Pendaftaran</h1>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Link href="/daftar/murid"><Card className="hover:border-brand-300 hover:shadow-md transition cursor-pointer text-center py-10">
          <h2 className="text-lg font-semibold">Daftar sebagai Murid</h2>
          <p className="text-sm text-gray-600 mt-1">Untuk siswa baru semua usia & level</p>
          <span className="mt-4 inline-block rounded-xl bg-brand-600 px-4 py-2 text-white text-sm">Lanjut</span>
        </Card></Link>
        <Link href="/daftar/guru"><Card className="hover:border-brand-300 hover:shadow-md transition cursor-pointer text-center py-10">
          <h2 className="text-lg font-semibold">Daftar sebagai Guru / Pelatih</h2>
          <p className="text-sm text-gray-600 mt-1">Untuk calon pelatih profesional</p>
          <span className="mt-4 inline-block rounded-xl bg-white border px-4 py-2 text-sm">Lanjut</span>
        </Card></Link>
      </div>
    </div>
  );
}
