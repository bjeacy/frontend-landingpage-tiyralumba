const fs=require('fs'),p=require('path');
const b='C:/Users/Rakha Fernandes/Documents/frontend';
const W=(rel,content)=>{ const full=p.join(b,rel); fs.mkdirSync(p.dirname(full),{recursive:true}); fs.writeFileSync(full,content,'utf8'); console.log('w',rel); };

W('tsconfig.json', JSON.stringify({compilerOptions:{target:"ES2017",lib:["dom","dom.iterable","esnext"],allowJs:true,skipLibCheck:true,strict:true,noEmit:true,esModuleInterop:true,module:"esnext",moduleResolution:"bundler",resolveJsonModule:true,isolatedModules:true,jsx:"preserve",incremental:true,plugins:[{name:"next"}],paths:{"@/*":["./src/*"]},forceConsistentCasingInFileNames:true},include:["next-env.d.ts",".next/types/**/*.ts","**/*.ts","**/*.tsx"],exclude:["node_modules"]},null,2));
W('tailwind.config.ts', `import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: { extend: { colors: { brand: { 50:'#eff6ff',500:'#2563eb',600:'#1d4ed8',700:'#1e40af' } } } },
  plugins: [],
};
export default config;
`);
W('postcss.config.js', `module.exports={plugins:{tailwindcss:{},autoprefixer:{}}}\n`);
W('next.config.mjs', `/** @type {import('next').NextConfig} */
const nextConfig={ reactStrictMode:true, experimental:{ optimizePackageImports:['framer-motion'] } };
export default nextConfig;
`);
W('.env.local','NEXT_PUBLIC_API_URL=http://localhost:3001/api\n');
W('.env.example','NEXT_PUBLIC_API_URL=http://localhost:3001/api\n');
W('middleware.ts', `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const PROTECTED=['/daftar','/profile','/guru'];
export function middleware(req: NextRequest){
  const token=req.cookies.get('token')?.value;
  const path=req.nextUrl.pathname;
  const isProtected=PROTECTED.some(p=>path.startsWith(p));
  if(isProtected && !token){
    const url=req.nextUrl.clone();
    url.pathname='/login';
    url.searchParams.set('next', path);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config={ matcher:['/daftar/:path*','/profile/:path*','/guru/:path*'] };
`);

// eslint
W('.eslintrc.json', JSON.stringify({extends:"next/core-web-vitals"},null,2));

// src/types
W('src/types/index.ts', `export type Role='siswa'|'pelatih'|'admin'|null;
export type BookingStatus='pending'|'approved'|'rejected';
export interface User{ id:string; name:string; email:string; phone?:string; role:Role; avatarUrl?:string; }
export interface Instructor{ id:string; name:string; specialty:string; experience:number; avatarUrl?:string; rating?:number; schedule?: string[]; }
export interface Program{ id:string; title:string; description:string; level:'pemula'|'menengah'|'lanjutan'; duration:string; price:number; imageUrl?:string; }
export interface Booking{ id:string; userId:string; programId:string; scheduleDate:string; scheduleTime:string; status:BookingStatus; note?:string; }
export interface ApiResponse<T>{ data:T; message?:string; }
export interface Paginated<T>{ data:T[]; total:number; page:number; limit:number; }
`);

// lib/utils
W('src/lib/utils.ts', `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]){ return twMerge(clsx(inputs)); }
`);

// lib/axios
W('src/lib/axios.ts', `import axios from 'axios';
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: { 'Content-Type':'application/json' },
  withCredentials: true,
});
api.interceptors.request.use((config)=>{
  if(typeof window!=='undefined'){
    const token=localStorage.getItem('token') || document.cookie.split('; ').find(c=>c.startsWith('token='))?.split('=')[1];
    if(token) config.headers.Authorization='Bearer '+token;
  }
  return config;
});
export default api;
`);

// validations
W('src/lib/validations/auth.ts', `import { z } from 'zod';
export const loginSchema=z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6,'Minimal 6 karakter'),
});
export const registerSchema=z.object({
  name: z.string().min(2,'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(9,'No HP minimal 9 digit').regex(/^[0-9+]+$/,'No HP tidak valid'),
  password: z.string().min(8,'Minimal 8 karakter'),
  confirmPassword: z.string(),
}).refine(d=>d.password===d.confirmPassword,{ message:'Konfirmasi password tidak cocok', path:['confirmPassword'] });
export const otpSchema=z.object({
  otp: z.string().length(6,'OTP 6 digit').regex(/^[0-9]+$/,'OTP hanya angka'),
});
export type LoginInput=z.infer<typeof loginSchema>;
export type RegisterInput=z.infer<typeof registerSchema>;
export type OtpInput=z.infer<typeof otpSchema>;
`);
W('src/lib/validations/booking.ts', `import { z } from 'zod';
export const bookingStep1Schema=z.object({
  programId: z.string().min(1,'Pilih program'),
  scheduleDate: z.string().min(1,'Pilih tanggal'),
  scheduleTime: z.string().min(1,'Pilih jam'),
});
export const bookingStep2Schema=z.object({
  name: z.string().min(2,'Nama minimal 2 karakter'),
  phone: z.string().min(9,'No HP minimal 9 digit'),
  note: z.string().optional(),
});
export const bookingSchema=bookingStep1Schema.merge(bookingStep2Schema);
export type BookingStep1=z.infer<typeof bookingStep1Schema>;
export type BookingStep2=z.infer<typeof bookingStep2Schema>;
export type BookingInput=z.infer<typeof bookingSchema>;
`);
W('src/lib/validations/reschedule.ts', `import { z } from 'zod';
export const rescheduleSchema=z.object({
  bookingId: z.string().min(1,'Booking ID wajib'),
  newDate: z.string().min(1,'Tanggal baru wajib'),
  newTime: z.string().min(1,'Jam baru wajib'),
  reason: z.string().min(5,'Alasan minimal 5 karakter').optional(),
});
export type RescheduleInput=z.infer<typeof rescheduleSchema>;
`);

// services
W('src/services/auth.service.ts', `import api from '@/lib/axios';
import type { User } from '@/types';
export async function login(payload:{email:string;password:string}){
  const {data}=await api.post('/auth/login', payload);
  return data as { user:User; token:string; message?:string };
}
export async function register(payload:{name:string;email:string;phone:string;password:string}){
  const {data}=await api.post('/auth/register', payload);
  return data as { message:string; needOtp?:boolean };
}
export async function verifyOtp(payload:{email:string;otp:string}){
  const {data}=await api.post('/auth/verify-otp', payload);
  return data as { user:User; token:string };
}
export async function resendOtp(email:string){
  const {data}=await api.post('/auth/resend-otp',{email});
  return data as { message:string };
}
export async function getMe(){
  const {data}=await api.get('/auth/me');
  return data as User;
}
export async function logout(){
  const {data}=await api.post('/auth/logout');
  return data;
}
`);
W('src/services/booking.service.ts', `import api from '@/lib/axios';
import type { Booking } from '@/types';
export async function createBooking(payload: Omit<Booking,'id'|'status'|'userId'> & {note?:string}){
  const {data}=await api.post('/bookings', payload);
  return data as Booking;
}
export async function getBookings(){
  const {data}=await api.get('/bookings');
  return data as Booking[];
}
export async function getBookingById(id:string){
  const {data}=await api.get('/bookings/'+id);
  return data as Booking;
}
`);
W('src/services/instructor.service.ts', `import api from '@/lib/axios';
import type { Instructor } from '@/types';
export async function getInstructors(): Promise<Instructor[]>{
  try{
    const {data}=await api.get('/instructors');
    return (data.data ?? data) as Instructor[];
  }catch{
    return [];
  }
}
export async function getInstructorById(id:string): Promise<Instructor | null>{
  try{
    const {data}=await api.get('/instructors/'+id);
    return (data.data ?? data) as Instructor;
  }catch{ return null; }
}
`);
W('src/services/program.service.ts', `import api from '@/lib/axios';
import type { Program } from '@/types';
export async function getPrograms(): Promise<Program[]>{
  try{
    const {data}=await api.get('/programs');
    return (data.data ?? data) as Program[];
  }catch{ return []; }
}
`);
W('src/services/profile.service.ts', `import api from '@/lib/axios';
import type { User, Booking } from '@/types';
export async function getProfile(): Promise<User | null>{
  try{
    const {data}=await api.get('/profile');
    return (data.data ?? data) as User;
  }catch{ return null; }
}
export async function getMyBookings(): Promise<Booking[]>{
  try{
    const {data}=await api.get('/profile/bookings');
    return (data.data ?? data) as Booking[];
  }catch{ return []; }
}
export async function rescheduleBooking(payload:{bookingId:string; newDate:string; newTime:string; reason?:string}){
  const {data}=await api.post('/bookings/reschedule', payload);
  return data as { message:string };
}
`);

// hooks
W('src/hooks/useAuth.ts', `'use client';
import { useMutation } from '@tanstack/react-query';
import { login as loginSvc, register as registerSvc, verifyOtp } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
export function useAuth(){
  const router=useRouter();
  const loginMut=useMutation({
    mutationFn: loginSvc,
    onSuccess:(res)=>{
      if(res.token){ localStorage.setItem('token', res.token); document.cookie='token='+res.token+'; path=/; max-age=86400'; }
      router.push('/profile');
    }
  });
  const registerMut=useMutation({ mutationFn: registerSvc });
  const otpMut=useMutation({
    mutationFn: verifyOtp,
    onSuccess:(res)=>{
      if(res.token){ localStorage.setItem('token', res.token); document.cookie='token='+res.token+'; path=/; max-age=86400'; }
      router.push('/profile');
    }
  });
  return { login: loginMut, register: registerMut, verifyOtp: otpMut };
}
`);
W('src/hooks/useOTP.ts', `'use client';
import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { resendOtp } from '@/services/auth.service';
export function useOTP(email: string){
  const [cooldown,setCooldown]=useState(0);
  const mut=useMutation({ mutationFn: ()=>resendOtp(email), onSuccess:()=>setCooldown(60) });
  const tick=useCallback(()=>{
    setCooldown(c=> c>0 ? c-1 : 0);
  },[]);
  return { resend: mut, cooldown, tick, canResend: cooldown===0 && !mut.isPending };
}
`);
W('src/hooks/useBooking.ts', `'use client';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createBooking } from '@/services/booking.service';
import type { BookingInput } from '@/lib/validations/booking';
export function useBooking(){
  const [step,setStep]=useState(1);
  const [formData,setFormData]=useState<Partial<BookingInput>>({});
  const mutation=useMutation({ mutationFn: (payload: BookingInput)=> createBooking(payload as any) });
  const next=(data:Partial<BookingInput>)=>{ setFormData(prev=>({...prev,...data})); setStep(s=> Math.min(s+1,3)); };
  const back=()=> setStep(s=> Math.max(s-1,1));
  const submit=(data:Partial<BookingInput>)=>{
    const payload={...formData,...data} as BookingInput;
    return mutation.mutateAsync(payload);
  };
  return { step, setStep, formData, next, back, submit, mutation };
}
`);
W('src/hooks/useReschedule.ts', `'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rescheduleBooking } from '@/services/profile.service';
import type { RescheduleInput } from '@/lib/validations/reschedule';
export function useReschedule(){
  const qc=useQueryClient();
  return useMutation({
    mutationFn: (payload: RescheduleInput)=> rescheduleBooking(payload as any),
    onSuccess:()=> qc.invalidateQueries({ queryKey:['bookings'] }),
  });
}
`);

// components/ui
W('src/components/ui/Button.tsx', `import * as React from 'react';
import { cn } from '@/lib/utils';
type Props=React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?:'primary'|'outline'|'ghost'; size?:'sm'|'md'|'lg' };
export function Button({className, variant='primary', size='md', ...props}:Props){
  const base='inline-flex items-center justify-center rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50';
  const v={ primary:'bg-brand-600 text-white hover:bg-brand-700', outline:'border border-gray-300 bg-white hover:bg-gray-50', ghost:'hover:bg-gray-100' }[variant];
  const s={ sm:'h-8 px-3 text-sm', md:'h-10 px-4', lg:'h-12 px-6 text-lg' }[size];
  return <button className={cn(base,v,s,className)} {...props} />;
}
`);
W('src/components/ui/Input.tsx', `import * as React from 'react';
import { cn } from '@/lib/utils';
export const Input=React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({className,...props},ref)=>{
  return <input ref={ref} className={cn('flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500',className)} {...props} />;
});
Input.displayName='Input';
`);
W('src/components/ui/Card.tsx', `import * as React from 'react';
import { cn } from '@/lib/utils';
export function Card({className,...props}:React.HTMLAttributes<HTMLDivElement>){
  return <div className={cn('rounded-2xl border border-gray-200 bg-white p-6 shadow-sm',className)} {...props} />;
}
`);
W('src/components/ui/Modal.tsx', `'use client';
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
`);
W('src/components/ui/Skeleton.tsx', `import { cn } from '@/lib/utils';
export function Skeleton({className}:{className?:string}){
  return <div className={cn('animate-pulse rounded-xl bg-gray-200',className)} />;
}
`);
W('src/components/ui/OTPInput.tsx', `'use client';
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
`);

// components/features
W('src/components/features/HeroSection.tsx', `'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
// framer-motion only via dynamic import per spec
const MotionDiv: any = dynamic(()=> import('framer-motion').then(m=> m.motion.div as any), { ssr:false });
const MotionH1: any = dynamic(()=> import('framer-motion').then(m=> m.motion.h1 as any), { ssr:false });
export function HeroSection(){
  const Title = MotionH1 || 'h1';
  const Wrap = MotionDiv || 'div';
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-700 text-white">
      <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-2 gap-8 items-center">
        <Wrap initial={MotionDiv?{opacity:0,y:12}:undefined} animate={MotionDiv?{opacity:1,y:0}:undefined} transition={{duration:0.5}}>
          <Title className="text-4xl md:text-5xl font-bold leading-tight">Jago Renang Bersama PT Tirya Lumba</Title>
          <p className="mt-4 text-white/90">Program terstruktur untuk pemula hingga atlet. Pelatih bersertifikat, jadwal fleksibel.</p>
          <div className="mt-8 flex gap-3">
            <Link href="/daftar"><Button variant="outline" className="bg-white text-brand-700 hover:bg-gray-50">Daftar Sekarang</Button></Link>
            <Link href="/pelatih"><Button variant="ghost" className="text-white border border-white/30">Lihat Pelatih</Button></Link>
          </div>
        </Wrap>
        <div className="relative h-64 md:h-80 rounded-3xl bg-white/15 backdrop-blur flex items-center justify-center">
          <span className="text-white/80 text-sm">Hero Image / Illustration</span>
        </div>
      </div>
    </section>
  );
}
`);
W('src/components/features/ProgramCard.tsx', `import { Card } from '@/components/ui/Card';
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
`);
W('src/components/features/InstructorCard.tsx', `import { Card } from '@/components/ui/Card';
import type { Instructor } from '@/types';
export function InstructorCard({instructor}:{instructor:Instructor}){
  return (
    <Card className="text-center">
      <div className="mx-auto h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">{instructor.name.charAt(0)}</div>
      <h3 className="mt-3 font-semibold">{instructor.name}</h3>
      <p className="text-sm text-gray-600">{instructor.specialty}</p>
      <p className="text-xs text-gray-500 mt-1">{instructor.experience} tahun pengalaman</p>
    </Card>
  );
}
`);
W('src/components/features/BookingWizard.tsx', `'use client';
import { useState } from 'react';
import { useBooking } from '@/hooks/useBooking';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
export function BookingWizard({type}:{type:'murid'|'guru'}){
  const {step, next, back, submit, mutation, formData}=useBooking();
  const [programId,setProgramId]=useState((formData as any).programId||'');
  const [date,setDate]=useState((formData as any).scheduleDate||'');
  const [time,setTime]=useState((formData as any).scheduleTime||'');
  const [name,setName]=useState((formData as any).name||'');
  const [phone,setPhone]=useState((formData as any).phone||'');
  const onNext1=()=> next({ programId, scheduleDate: date, scheduleTime: time } as any);
  const onSubmit=async()=>{ await submit({ name, phone } as any); };
  return (
    <Card className="max-w-xl mx-auto">
      <div className="flex gap-2 mb-6">
        {[1,2,3].map(n=>(
          <div key={n} className={'h-2 flex-1 rounded-full '+(step>=n ? 'bg-brand-600':'bg-gray-200')} />
        ))}
      </div>
      <p className="text-sm text-gray-500 mb-4">Pendaftaran {type} — Langkah {step} dari 3</p>
      {step===1 && (
        <div className="space-y-3">
          <Input placeholder="Program ID (contoh: prog-1)" value={programId} onChange={e=>setProgramId(e.target.value)} />
          <Input type="date" value={date} onChange={e=>setDate(e.target.value)} />
          <Input type="time" value={time} onChange={e=>setTime(e.target.value)} />
          <Button onClick={onNext1} disabled={!programId||!date||!time} className="w-full">Lanjut</Button>
        </div>
      )}
      {step===2 && (
        <div className="space-y-3">
          <Input placeholder="Nama lengkap" value={name} onChange={e=>setName(e.target.value)} />
          <Input placeholder="No HP" value={phone} onChange={e=>setPhone(e.target.value)} />
          <div className="flex gap-2">
            <Button variant="outline" onClick={back} className="flex-1">Kembali</Button>
            <Button onClick={()=> next({ name, phone } as any)} disabled={!name||!phone} className="flex-1">Lanjut</Button>
          </div>
        </div>
      )}
      {step===3 && (
        <div className="space-y-3">
          <p className="text-sm">Konfirmasi pendaftaran {type}:</p>
          <pre className="text-xs bg-gray-50 p-3 rounded-xl overflow-auto">{JSON.stringify({programId, date, time, name, phone}, null, 2)}</pre>
          <div className="flex gap-2">
            <Button variant="outline" onClick={back} className="flex-1">Kembali</Button>
            <Button onClick={onSubmit} disabled={mutation.isPending} className="flex-1">{mutation.isPending ? 'Mengirim...' : 'Kirim Pendaftaran'}</Button>
          </div>
          {mutation.isSuccess && <p className="text-green-600 text-sm">Pendaftaran berhasil!</p>}
          {mutation.isError && <p className="text-red-600 text-sm">Gagal: {(mutation.error as any)?.response?.data?.message || (mutation.error as Error).message}</p>}
        </div>
      )}
    </Card>
  );
}
`);
W('src/components/features/ProfileWidget.tsx', `import { Card } from '@/components/ui/Card';
import type { User, Booking } from '@/types';
export function ProfileWidget({user, bookings}:{user:User|null; bookings:Booking[]}){
  if(!user) return <Card><p className="text-sm text-gray-600">Belum login. <a href="/login" className="text-brand-600 underline">Masuk</a></p></Card>;
  const statusMap:Record<string,string>={ pending:'Menunggu', approved:'Diterima', rejected:'Ditolak' };
  if(bookings.some(b=> b.status==='rejected') || (user as any).status==='rejected'){
    return (
      <Card className="border-red-200 bg-red-50">
        <h3 className="font-semibold text-red-700">Pendaftaran Ditolak</h3>
        <p className="text-sm text-red-600 mt-1">Hubungi admin untuk informasi selengkapnya.</p>
      </Card>
    );
  }
  return (
    <div className="space-y-4">
      <Card>
        <h3 className="font-semibold">{user.name}</h3>
        <p className="text-sm text-gray-600">{user.email} • {user.role ?? 'siswa'}</p>
      </Card>
      {user.role==='pelatih' ? (
        <Card>
          <h4 className="font-medium">Jadwal Mengajar</h4>
          {bookings.length===0 ? <p className="text-sm text-gray-500">Belum ada jadwal.</p> :
            <ul className="mt-2 space-y-2">{bookings.map(b=> <li key={b.id} className="text-sm flex justify-between"><span>{b.scheduleDate} {b.scheduleTime}</span><span className="text-gray-500">{statusMap[b.status]||b.status}</span></li>)}</ul>
          }
          <a href="/guru/atur-ulang-jadwal" className="text-sm text-brand-600 underline mt-3 inline-block">Atur Ulang Jadwal</a>
        </Card>
      ) : (
        <Card>
          <h4 className="font-medium">Riwayat Pendaftaran</h4>
          {bookings.length===0 ? <p className="text-sm text-gray-500">Belum ada pendaftaran.</p> :
            <ul className="mt-2 space-y-2">{bookings.map(b=> <li key={b.id} className="text-sm flex justify-between"><span>{b.scheduleDate} {b.scheduleTime}</span><span>{statusMap[b.status]||b.status}</span></li>)}</ul>
          }
        </Card>
      )}
    </div>
  );
}
`);
W('src/components/features/RescheduleForm.tsx', `'use client';
import { useState } from 'react';
import { useReschedule } from '@/hooks/useReschedule';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
export function RescheduleForm(){
  const [bookingId,setBookingId]=useState('');
  const [newDate,setNewDate]=useState('');
  const [newTime,setNewTime]=useState('');
  const mut=useReschedule();
  const submit=()=> mut.mutate({ bookingId, newDate, newTime } as any);
  return (
    <Card className="max-w-lg">
      <h3 className="font-semibold mb-4">Atur Ulang Jadwal</h3>
      <div className="space-y-3">
        <Input placeholder="Booking ID" value={bookingId} onChange={e=>setBookingId(e.target.value)} />
        <Input type="date" value={newDate} onChange={e=>setNewDate(e.target.value)} />
        <Input type="time" value={newTime} onChange={e=>setNewTime(e.target.value)} />
        <Button onClick={submit} disabled={mut.isPending || !bookingId || !newDate || !newTime} className="w-full">{mut.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}</Button>
        {mut.isSuccess && <p className="text-sm text-green-600">Jadwal berhasil diperbarui.</p>}
        {mut.isError && <p className="text-sm text-red-600">{(mut.error as any)?.response?.data?.message || (mut.error as Error).message}</p>}
      </div>
    </Card>
  );
}
`);
W('src/components/features/TopBar.tsx', `import Link from 'next/link';
export function TopBar(){
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-brand-600">PT Tirya Lumba</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/pelatih" className="hover:text-brand-600">Pelatih</Link>
          <Link href="/daftar" className="hover:text-brand-600">Daftar</Link>
          <Link href="/profile" className="hover:text-brand-600">Profil</Link>
          <Link href="/login" className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Masuk</Link>
        </nav>
      </div>
    </header>
  );
}
`);
W('src/components/features/Footer.tsx', `export function Footer(){
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-gray-600">
        <p className="font-medium text-gray-900">PT Tirya Lumba — Sekolah Renang</p>
        <p className="mt-1">Jl. Kolam Renang No. 1 • info@tiryatumba.id • 0812-0000-0000</p>
        <p className="mt-4 text-xs text-gray-400">© {new Date().getFullYear()} PT Tirya Lumba. All rights reserved.</p>
      </div>
    </footer>
  );
}
`);
W('src/components/features/Providers.tsx', `'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
export function Providers({children}:{children:React.ReactNode}){
  const [client]=React.useState(()=> new QueryClient({ defaultOptions:{ queries:{ retry:1, staleTime: 30_000 } } }));
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
`);

// app files
W('src/app/globals.css', `@tailwind base;
@tailwind components;
@tailwind utilities;
:root{ color-scheme: light; }
body{ @apply bg-white text-gray-900 antialiased; }
`);
W('src/app/layout.tsx', `import './globals.css';
import type { Metadata } from 'next';
import { TopBar } from '@/components/features/TopBar';
import { Footer } from '@/components/features/Footer';
import { Providers } from '@/components/features/Providers';
export const metadata: Metadata={ title:'PT Tirya Lumba — Sekolah Renang', description:'Portal publik PT Tirya Lumba' };
export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <TopBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
`);
W('src/app/loading.tsx', `import { Skeleton } from '@/components/ui/Skeleton';
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
`);
W('src/app/error.tsx', `'use client';
export default function Error({error, reset}:{error: Error & {digest?:string}; reset:()=>void}){
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 text-center">
      <h2 className="text-xl font-semibold">Terjadi kesalahan</h2>
      <p className="text-sm text-gray-600 mt-2">{error.message}</p>
      <button onClick={reset} className="mt-6 rounded-xl bg-brand-600 px-4 py-2 text-white">Coba lagi</button>
    </div>
  );
}
`);
W('src/app/page.tsx', `import { HeroSection } from '@/components/features/HeroSection';
import { ProgramCard } from '@/components/features/ProgramCard';
import { InstructorCard } from '@/components/features/InstructorCard';
import { getPrograms } from '@/services/program.service';
import { getInstructors } from '@/services/instructor.service';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

// Server Component — data fetch di server (RAM-friendly)
export const revalidate=60;

export default async function Home(){
  const [programs, instructors]=await Promise.all([getPrograms(), getInstructors()]);
  const fallbackPrograms= programs.length? programs : [
    { id:'p1', title:'Kelas Pemula Anak', description:'Dasar renang, adaptasi air, gaya bebas dasar.', level:'pemula' as const, duration:'8 pertemuan', price:1200000 },
    { id:'p2', title:'Kelas Menengah', description:'Penyempurnaan gaya bebas & punggung, endurance.', level:'menengah' as const, duration:'12 pertemuan', price:1800000 },
    { id:'p3', title:'Kelas Lanjutan / Atlet', description:'Teknik kompetitif, start & turn, program atlet.', level:'lanjutan' as const, duration:'16 pertemuan', price:2500000 },
  ];
  const fallbackInstructors= instructors.length? instructors.slice(0,3) : [
    { id:'i1', name:'Coach Andi', specialty:'Gaya Bebas', experience:8 },
    { id:'i2', name:'Coach Sari', specialty:'Anak & Pemula', experience:6 },
    { id:'i3', name:'Coach Budi', specialty:'Atlet', experience:10 },
  ];
  return (
    <>
      <HeroSection />
      {/* Brand */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-center text-sm tracking-widest text-gray-400">DIPERCAYA OLEH 500+ SISWA & 20+ SEKOLAH MITRA</p>
        <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <span className="rounded-full border px-4 py-1">KONI</span><span className="rounded-full border px-4 py-1">Dispora</span><span className="rounded-full border px-4 py-1">PRSI</span>
        </div>
      </section>
      {/* Program */}
      <section id="program" className="mx-auto max-w-6xl px-6 py-8">
        <h2 className="text-2xl font-bold">Program Kami</h2>
        <p className="text-sm text-gray-600 mt-1">Pilih level sesuai kemampuanmu.</p>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {fallbackPrograms.map(p=> <ProgramCard key={p.id} program={p} />)}
        </div>
      </section>
      {/* Tentang */}
      <section className="mx-auto max-w-6xl px-6 py-8 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold">Tentang Kami</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">PT Tirya Lumba adalah sekolah renang dengan kurikulum berjenjang, fokus pada keselamatan, teknik yang benar, dan pembentukan karakter atlet sejak dini.</p>
          <ul className="mt-4 text-sm text-gray-600 list-disc pl-5 space-y-1">
            <li>Kolam standar & aman untuk anak</li>
            <li>Rasio pelatih : siswa 1:4</li>
            <li>Sertifikat & evaluasi berkala</li>
          </ul>
        </div>
        <div className="h-56 rounded-3xl bg-gray-100 flex items-center justify-center text-sm text-gray-400">Foto Kolam / Kegiatan</div>
      </section>
      {/* Kenapa */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <h2 className="text-2xl font-bold">Kenapa Pilih Kami</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white p-5 border"><h3 className="font-medium">Pelatih Bersertifikat</h3><p className="text-sm text-gray-600 mt-1">Lisensi nasional & pengalaman kompetisi.</p></div>
            <div className="rounded-2xl bg-white p-5 border"><h3 className="font-medium">Jadwal Fleksibel</h3><p className="text-sm text-gray-600 mt-1">Pagi / sore, weekday & weekend.</p></div>
            <div className="rounded-2xl bg-white p-5 border"><h3 className="font-medium">Aman untuk Anak</h3><p className="text-sm text-gray-600 mt-1">Protokol keselamatan & pendampingan penuh.</p></div>
          </div>
        </div>
      </section>
      {/* Pelatih */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Pelatih Kami</h2>
          <Link href="/pelatih" className="text-sm text-brand-600 underline">Lihat semua</Link>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {fallbackInstructors.map(i=> <InstructorCard key={i.id} instructor={i} />)}
        </div>
        <div className="mt-8 text-center">
          <Link href="/daftar"><Button size="lg">Daftar Sekarang</Button></Link>
        </div>
      </section>
    </>
  );
}
`);

// (auth)
W('src/app/(auth)/login/page.tsx', `'use client';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { loginSchema } from '@/lib/validations/auth';
import Link from 'next/link';
export default function LoginPage(){
  const { login }=useAuth();
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [err,setErr]=useState('');
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault(); setErr('');
    const parsed=loginSchema.safeParse({email,password});
    if(!parsed.success){ setErr(parsed.error.errors[0].message); return; }
    try{ await login.mutateAsync({email,password}); } catch(ex:any){ setErr(ex?.response?.data?.message || ex.message || 'Login gagal'); }
  };
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <Card>
        <h1 className="text-xl font-semibold">Masuk</h1>
        <p className="text-sm text-gray-600 mt-1">Masuk ke portal PT Tirya Lumba</p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <Input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {err && <p className="text-sm text-red-600">{err}</p>}
          {login.isError && <p className="text-sm text-red-600">{(login.error as any)?.response?.data?.message || (login.error as Error).message}</p>}
          <Button type="submit" disabled={login.isPending} className="w-full">{login.isPending ? 'Memproses...' : 'Masuk'}</Button>
        </form>
        <p className="text-sm text-center mt-4">Belum punya akun? <Link href="/register" className="text-brand-600 underline">Daftar</Link></p>
      </Card>
    </div>
  );
}
`);
W('src/app/(auth)/register/page.tsx', `'use client';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { OTPInput } from '@/components/ui/OTPInput';
import { registerSchema } from '@/lib/validations/auth';
import { verifyOtp, resendOtp } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
export default function RegisterPage(){
  const { register }=useAuth();
  const router=useRouter();
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [phone,setPhone]=useState('');
  const [password,setPassword]=useState(''); const [confirmPassword,setConfirmPassword]=useState('');
  const [err,setErr]=useState(''); const [step,setStep]=useState<1|2>(1); const [otp,setOtp]=useState('');
  const submitReg=async(e:React.FormEvent)=>{
    e.preventDefault(); setErr('');
    const parsed=registerSchema.safeParse({name,email,phone,password,confirmPassword});
    if(!parsed.success){ setErr(parsed.error.errors[0].message); return; }
    try{ await register.mutateAsync({name,email,phone,password}); setStep(2); } catch(ex:any){ setErr(ex?.response?.data?.message || ex.message || 'Registrasi gagal'); }
  };
  const submitOtp=async(e:React.FormEvent)=>{
    e.preventDefault(); setErr('');
    if(otp.length!==6){ setErr('OTP harus 6 digit'); return; }
    try{ const res=await verifyOtp({email, otp}); if(res.token){ localStorage.setItem('token',res.token); document.cookie='token='+res.token+'; path=/; max-age=86400'; } router.push('/profile'); }
    catch(ex:any){ setErr(ex?.response?.data?.message || ex.message || 'OTP salah'); }
  };
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <Card>
        <h1 className="text-xl font-semibold">{step===1 ? 'Daftar Akun' : 'Verifikasi OTP'}</h1>
        {step===1 ? (
          <form onSubmit={submitReg} className="mt-6 space-y-3">
            <Input placeholder="Nama lengkap" value={name} onChange={e=>setName(e.target.value)} />
            <Input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <Input placeholder="No HP" value={phone} onChange={e=>setPhone(e.target.value)} />
            <Input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            <Input placeholder="Konfirmasi password" type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
            {err && <p className="text-sm text-red-600">{err}</p>}
            <Button type="submit" disabled={register.isPending} className="w-full">{register.isPending ? 'Memproses...' : 'Daftar'}</Button>
          </form>
        ) : (
          <form onSubmit={submitOtp} className="mt-6 space-y-4">
            <p className="text-sm text-gray-600">Kode OTP dikirim ke {email}</p>
            <OTPInput value={otp} onChange={setOtp} />
            {err && <p className="text-sm text-red-600 text-center">{err}</p>}
            <Button type="submit" className="w-full">Verifikasi</Button>
            <button type="button" onClick={async()=>{ try{ await resendOtp(email);}catch(ex:any){ setErr(ex?.response?.data?.message || 'Gagal kirim ulang'); } }} className="w-full text-sm text-brand-600 underline">Kirim ulang OTP</button>
            <button type="button" onClick={()=>setStep(1)} className="w-full text-sm text-gray-500">Kembali</button>
          </form>
        )}
      </Card>
    </div>
  );
}
`);

// daftar
W('src/app/daftar/page.tsx', `export const dynamic='force-dynamic';
export const revalidate=0;
export const fetchCache='force-no-store';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
export default function DaftarPage(){
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-bold text-center">Pilih Jenis Pendaftaran</h1>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Link href="/daftar/murid"><Card className="hover:border-brand-300 hover:shadow-md transition cursor-pointer text-center py-10">
          <h2 className="text-lg font-semibold">Daftar sebagai Murid</h2>
          <p className="text-sm text-gray-600 mt-1">Untuk siswa baru semua usia & level</p>
          <span className="mt-4 inline-block rounded-xl bg-brand-600 px-4 py-2 text-white text-sm">Lanjut</span>
        </Card></Link>
        <Link href="/daftar/guru"><Card className="hover:border-brand-300 hover:shadow-md transition cursor-pointer text-center py-10">
          <h2 className="text-lg font-semibold">Daftar sebagai Guru / Pelatih</h2>
          <p className="text-sm text-gray-600 mt-1">Untuk calon pelatih profesional</p>
          <span className="mt-4 inline-block rounded-xl bg-white border px-4 py-2 text-sm">Lanjut</span>
        </Card></Link>
      </div>
    </div>
  );
}
`);
W('src/app/daftar/murid/page.tsx', `import { BookingWizard } from '@/components/features/BookingWizard';
export const dynamic='force-dynamic';
export default function DaftarMuridPage(){
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-xl font-bold">Pendaftaran Murid</h1>
      <p className="text-sm text-gray-600 mt-1">Lengkapi 3 langkah untuk mendaftar sebagai murid.</p>
      <div className="mt-6"><BookingWizard type="murid" /></div>
    </div>
  );
}
`);
W('src/app/daftar/murid/loading.tsx', `import { Skeleton } from '@/components/ui/Skeleton';
export default function Loading(){ return <div className="mx-auto max-w-4xl px-6 py-10 space-y-3"><Skeleton className="h-10 w-48"/><Skeleton className="h-64 w-full"/></div>; }
`);
W('src/app/daftar/murid/error.tsx', `'use client';
export default function Error({error, reset}:{error:Error; reset:()=>void}){
  return <div className="mx-auto max-w-4xl px-6 py-10 text-center"><p className="text-red-600">{error.message}</p><button onClick={reset} className="mt-4 rounded-xl bg-brand-600 px-4 py-2 text-white">Coba lagi</button></div>;
}
`);
W('src/app/daftar/guru/page.tsx', `import { BookingWizard } from '@/components/features/BookingWizard';
export const dynamic='force-dynamic';
export default function DaftarGuruPage(){
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-xl font-bold">Pendaftaran Guru / Pelatih</h1>
      <p className="text-sm text-gray-600 mt-1">Lengkapi 3 langkah untuk mendaftar sebagai pelatih.</p>
      <div className="mt-6"><BookingWizard type="guru" /></div>
    </div>
  );
}
`);
W('src/app/daftar/guru/loading.tsx', `import { Skeleton } from '@/components/ui/Skeleton';
export default function Loading(){ return <div className="mx-auto max-w-4xl px-6 py-10 space-y-3"><Skeleton className="h-10 w-48"/><Skeleton className="h-64 w-full"/></div>; }
`);
W('src/app/daftar/guru/error.tsx', `'use client';
export default function Error({error, reset}:{error:Error; reset:()=>void}){
  return <div className="mx-auto max-w-4xl px-6 py-10 text-center"><p className="text-red-600">{error.message}</p><button onClick={reset} className="mt-4 rounded-xl bg-brand-600 px-4 py-2 text-white">Coba lagi</button></div>;
}
`);

// profile
W('src/app/profile/page.tsx', `import { ProfileWidget } from '@/components/features/ProfileWidget';
import { getProfile, getMyBookings } from '@/services/profile.service';
export const dynamic='force-dynamic';
export default async function ProfilePage(){
  const [user, bookings]=await Promise.all([getProfile(), getMyBookings()]);
  // Fallback mock ketika API belum ready — tetap render role-aware
  const mockUser=user ?? null;
  const mockBookings=bookings ?? [];
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-xl font-bold">Profil</h1>
      <div className="mt-6"><ProfileWidget user={mockUser as any} bookings={mockBookings as any} /></div>
    </div>
  );
}
`);
W('src/app/profile/loading.tsx', `import { Skeleton } from '@/components/ui/Skeleton';
export default function Loading(){ return <div className="mx-auto max-w-4xl px-6 py-10 space-y-3"><Skeleton className="h-24"/><Skeleton className="h-32"/></div>; }
`);
W('src/app/profile/error.tsx', `'use client';
export default function Error({error, reset}:{error:Error; reset:()=>void}){
  return <div className="mx-auto max-w-4xl px-6 py-10 text-center"><p className="text-red-600">{error.message}</p><button onClick={reset} className="mt-4 rounded-xl bg-brand-600 px-4 py-2 text-white">Coba lagi</button></div>;
}
`);

// guru atur-ulang-jadwal
W('src/app/guru/atur-ulang-jadwal/page.tsx', `import { RescheduleForm } from '@/components/features/RescheduleForm';
export default function AturUlangJadwalPage(){
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-xl font-bold">Atur Ulang Jadwal Pelatih</h1>
      <p className="text-sm text-gray-600 mt-1">Pindahkan jadwal mengajar ke tanggal/jam baru.</p>
      <div className="mt-6"><RescheduleForm /></div>
    </div>
  );
}
`);

// pelatih (parent server component example)
W('src/app/pelatih/page.tsx', `import { InstructorCard } from '@/components/features/InstructorCard';
import { getInstructors } from '@/services/instructor.service';
export const revalidate=60;
export default async function PelatihPage(){
  const instructors=await getInstructors();
  const list=instructors.length ? instructors : [
    { id:'i1', name:'Coach Andi', specialty:'Gaya Bebas', experience:8 },
    { id:'i2', name:'Coach Sari', specialty:'Anak & Pemula', experience:6 },
    { id:'i3', name:'Coach Budi', specialty:'Atlet', experience:10 },
    { id:'i4', name:'Coach Rina', specialty:'Gaya Punggung', experience:7 },
  ];
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-bold">Daftar Pelatih</h1>
      <p className="text-sm text-gray-600 mt-1">Parent Server Component — fetch di server, render di server.</p>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {list.map(i=> <InstructorCard key={i.id} instructor={i} />)}
      </div>
    </div>
  );
}
`);

// styles
W('src/styles/tailwind.css', `@tailwind base;
@tailwind components;
@tailwind utilities;
`);

console.log('all written');
