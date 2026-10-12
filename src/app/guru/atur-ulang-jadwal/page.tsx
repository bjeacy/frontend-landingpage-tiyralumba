import { RescheduleForm } from '@/components/features/RescheduleForm';
export default function AturUlangJadwalPage(){
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-xl font-bold">Atur Ulang Jadwal Pelatih</h1>
      <p className="text-sm text-gray-600 mt-1">Pindahkan jadwal mengajar ke tanggal/jam baru.</p>
      <div className="mt-6"><RescheduleForm /></div>
    </div>
  );
}
