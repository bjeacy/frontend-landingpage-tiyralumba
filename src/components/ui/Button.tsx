import * as React from 'react';
import { cn } from '@/lib/utils';
type Props=React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?:'primary'|'outline'|'ghost'; size?:'sm'|'md'|'lg' };
export function Button({className, variant='primary', size='md', ...props}:Props){
  const base='inline-flex items-center justify-center rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50';
  const v={ primary:'bg-brand-600 text-white hover:bg-brand-700', outline:'border border-gray-300 bg-white hover:bg-gray-50', ghost:'hover:bg-gray-100' }[variant];
  const s={ sm:'h-8 px-3 text-sm', md:'h-10 px-4', lg:'h-12 px-6 text-lg' }[size];
  return <button className={cn(base,v,s,className)} {...props} />;
}
