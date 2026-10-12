import { Card } from '@/components/ui/Card';
import type { Instructor } from '@/types';
export function InstructorCard({instructor}:{instructor:Instructor}){
  return (
    <Card className="text-center">
      <div className="mx-auto h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">{instructor.name.charAt(0)}</div>
      <h3 className="mt-3 font-semibold">{instructor.name}</h3>
      <p className="text-sm text-gray-600">{instructor.specialty}</p>
      <p className="text-xs text-gray-500 mt-1">{instructor.experience} tahun pengalaman</p>
    </Card>
  );
}
