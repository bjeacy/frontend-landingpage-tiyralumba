'use client';
import * as React from 'react';
import dynamic from 'next/dynamic';
const MotionDiv: any = dynamic(()=> import('framer-motion').then(m=> m.motion.div as any), { ssr:false });
export function Modal({open,onClose,children}:{open:boolean; onClose:()=>void; children:React.ReactNode}){
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      {MotionDiv ? (
        <MotionDiv initial={{opacity:0, scale:0.96}} animate={{opacity:1, scale:1}} className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          {children}
        </MotionDiv>
      ) : (
        <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">{children}</div>
      )}
    </div>
  );
}
