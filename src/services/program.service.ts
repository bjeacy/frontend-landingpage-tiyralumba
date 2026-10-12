import api from '@/lib/axios';
import type { Program } from '@/types';
export async function getPrograms(): Promise<Program[]>{
  try{
    const {data}=await api.get('/programs');
    return (data.data ?? data) as Program[];
  }catch{ return []; }
}
