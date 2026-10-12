'use client';
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
