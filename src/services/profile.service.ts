import api from '@/lib/axios';
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
