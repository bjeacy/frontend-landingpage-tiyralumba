'use client';
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
