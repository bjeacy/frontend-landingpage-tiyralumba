'use client';
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
