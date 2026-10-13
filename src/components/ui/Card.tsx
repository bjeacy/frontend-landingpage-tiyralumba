// src/components/ui/Card.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-2xl bg-white p-6 shadow-lg shadow-blue-900/5', className)} {...props} />;
}
