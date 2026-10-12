import { Card } from '@/components/ui/Card';
import type { Program } from '@/types';
export function ProgramCard({program}:{program:Program}){
  return (
    <Card className="flex flex-col gap-3">
      <div className="h-32 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center text-sm text-gray-500">{program.title}</div>
      <h3 className="font-semibold">{program.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{program.description}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="rounded-full bg-brand-50 px-2 py-1 text-brand-700 capitalize">{program.level}</span>
        <span className="font-medium">Rp {program.price.toLocaleString('id-ID')}</span>
      </div>
    </Card>
  );
}
