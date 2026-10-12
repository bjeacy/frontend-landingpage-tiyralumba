'use client';
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
