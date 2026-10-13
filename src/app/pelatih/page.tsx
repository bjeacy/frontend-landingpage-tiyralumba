import { InstructorCard } from '@/components/features/InstructorCard';
import { getInstructors } from '@/services/instructor.service';
export const revalidate = 3600;

type PelatihPageProps = {
  searchParams: { page?: string };
};

export default async function PelatihPage({ searchParams }: PelatihPageProps) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  const instructors=await getInstructors();
  const list=instructors.length ? instructors : [
    { id:'i1', name:'Coach Andi', specialty:'Gaya Bebas', experience:8 },
    { id:'i2', name:'Coach Sari', specialty:'Anak & Pemula', experience:6 },
    { id:'i3', name:'Coach Budi', specialty:'Atlet', experience:10 },
    { id:'i4', name:'Coach Rina', specialty:'Gaya Punggung', experience:7 },
  ];
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-heading text-2xl font-bold text-textDark">Daftar Pelatih</h1>
      <p className="mt-1 text-sm text-textDark/75">Halaman {page}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {list.map(i=> <InstructorCard key={i.id} instructor={i} />)}
      </div>
    </div>
  );
}
