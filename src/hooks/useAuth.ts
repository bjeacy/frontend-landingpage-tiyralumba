'use client';
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
