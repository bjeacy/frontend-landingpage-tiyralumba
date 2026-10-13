// src/components/features/ProgramCard.tsx
import { Card } from '@/components/ui/Card';
import type { Program } from '@/types';

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex h-32 items-center justify-center rounded-2xl bg-azure text-sm font-medium text-primary">
        {program.title}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="font-heading text-xl font-bold text-textDark">{program.title}</h3>
        <p className="text-sm leading-6 text-textDark/70">{program.address ?? program.description}</p>
        <p className="mt-auto text-lg font-bold text-primary">Rp {program.price.toLocaleString('id-ID')}</p>
      </div>
    </Card>
  );
}
