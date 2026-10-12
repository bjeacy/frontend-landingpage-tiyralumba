import { Skeleton } from '@/components/ui/Skeleton';
export default function Loading(){
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-40 w-full" />
      <div className="grid md:grid-cols-3 gap-4">
        <Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" />
      </div>
    </div>
  );
}
