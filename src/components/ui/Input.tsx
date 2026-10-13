// src/components/ui/Input.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-textDark placeholder:text-textDark/70 focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
