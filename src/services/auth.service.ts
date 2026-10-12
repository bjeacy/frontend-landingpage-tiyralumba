import api from '@/lib/axios';
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
