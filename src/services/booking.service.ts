import api from '@/lib/axios';
import type { Booking } from '@/types';
export async function createBooking(payload: Omit<Booking,'id'|'status'|'userId'> & {note?:string}){
  const {data}=await api.post('/bookings', payload);
  return data as Booking;
}
export async function getBookings(){
  const {data}=await api.get('/bookings');
  return data as Booking[];
}
export async function getBookingById(id:string){
  const {data}=await api.get('/bookings/'+id);
  return data as Booking;
}
