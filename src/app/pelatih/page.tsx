import { InstructorCard } from '@/components/features/InstructorCard';
import { getInstructors } from '@/services/instructor.service';
export const revalidate=60;
export default async function PelatihPage(){
  const instructors=await getInstructors();
  const list=instructors.length ? instructors : [
    { id:'i1', name:'Coach Andi', specialty:'Gaya Bebas', experience:8 },
    { id:'i2', name:'Coach Sari', specialty:'Anak & Pemula', experience:6 },
    { id:'i3', name:'Coach Budi', specialty:'Atlet', experience:10 },
    { id:'i4', name:'Coach Rina', specialty:'Gaya Punggung', experience:7 },
  ];
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-bold">Daftar Pelatih</h1>
      <p className="text-sm text-gray-600 mt-1">Parent Server Component — fetch di server, render di server.</p>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {list.map(i=> <InstructorCard key={i.id} instructor={i} />)}
      </div>
    </div>
  );
}
