// src/components/ui/Button.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'landing' | 'dashboard' | 'outline' | 'ghost';
};

export function Button({ className, variant = 'dashboard', ...props }: ButtonProps) {
  const style = variant === 'outline'
    ? 'border border-primary bg-white text-primary hover:bg-azure'
    : variant === 'ghost'
      ? 'bg-transparent text-primary hover:bg-azure'
      : 'bg-cyan text-white hover:bg-primary';

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center px-6 py-3 font-medium transition duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan disabled:opacity-50',
        style,
        variant === 'landing' ? 'rounded-full' : 'rounded-lg',
        className,
      )}
      {...props}
    />
  );
}
