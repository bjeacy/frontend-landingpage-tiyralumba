'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
export function OTPInput({value,onChange,length=6}:{value:string; onChange:(v:string)=>void; length?:number}){
  const refs=React.useRef<HTMLInputElement[]>([]);
  const handle=(idx:number, v:string)=>{
    const ch=v.slice(-1).replace(/[^0-9]/g,'');
    const arr=value.split('');
    while(arr.length<length) arr.push('');
    arr[idx]=ch;
    const next=arr.join('').slice(0,length);
    onChange(next);
    if(ch && idx<length-1) refs.current[idx+1]?.focus();
  };
  const onKey=(idx:number,e:React.KeyboardEvent)=>{
    if(e.key==='Backspace' && !value[idx] && idx>0) refs.current[idx-1]?.focus();
  };
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({length}).map((_,i)=>(
        <input key={i} ref={el=>{ if(el) refs.current[i]=el; }} value={value[i]||''} onChange={e=>handle(i,e.target.value)} onKeyDown={e=>onKey(i,e)} maxLength={1} inputMode="numeric"
          className={cn('h-12 w-10 rounded-xl border border-gray-200 text-center text-lg focus:ring-2 focus:ring-brand-500 outline-none')} />
      ))}
    </div>
  );
}
