'use client';
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
