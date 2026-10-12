'use client';
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
