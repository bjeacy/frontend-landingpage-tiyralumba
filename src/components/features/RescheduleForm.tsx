'use client';
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
