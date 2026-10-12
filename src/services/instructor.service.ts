import api from '@/lib/axios';
import type { Instructor } from '@/types';
export async function getInstructors(): Promise<Instructor[]>{
  try{
    const {data}=await api.get('/instructors');
    return (data.data ?? data) as Instructor[];
  }catch{
    return [];
  }
}
export async function getInstructorById(id:string): Promise<Instructor | null>{
  try{
    const {data}=await api.get('/instructors/'+id);
    return (data.data ?? data) as Instructor;
  }catch{ return null; }
}
