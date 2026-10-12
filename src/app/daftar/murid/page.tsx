import { BookingWizard } from '@/components/features/BookingWizard';
export const dynamic='force-dynamic';
export default function DaftarMuridPage(){
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-xl font-bold">Pendaftaran Murid</h1>
      <p className="text-sm text-gray-600 mt-1">Lengkapi 3 langkah untuk mendaftar sebagai murid.</p>
      <div className="mt-6"><BookingWizard type="murid" /></div>
    </div>
  );
}
