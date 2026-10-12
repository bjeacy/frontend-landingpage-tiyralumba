import axios from 'axios';
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: { 'Content-Type':'application/json' },
  withCredentials: true,
});
api.interceptors.request.use((config)=>{
  if(typeof window!=='undefined'){
    const token=localStorage.getItem('token') || document.cookie.split('; ').find(c=>c.startsWith('token='))?.split('=')[1];
    if(token) config.headers.Authorization='Bearer '+token;
  }
  return config;
});
export default api;
