import * as React from 'react';
import { cn } from '@/lib/utils';
export const Input=React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({className,...props},ref)=>{
  return <input ref={ref} className={cn('flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500',className)} {...props} />;
});
Input.displayName='Input';
