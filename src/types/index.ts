export type Role='siswa'|'pelatih'|'admin'|null;
export type BookingStatus='pending'|'approved'|'rejected';
export interface User{ id:string; name:string; email:string; phone?:string; role:Role; avatarUrl?:string; }
export interface Instructor{ id:string; name:string; specialty:string; experience:number; avatarUrl?:string; rating?:number; schedule?: string[]; }
export interface Program{ id:string; title:string; description:string; level:'pemula'|'menengah'|'lanjutan'; duration:string; price:number; imageUrl?:string; address?:string; mapUrl?:string; }
export interface Booking{ id:string; userId:string; programId:string; scheduleDate:string; scheduleTime:string; status:BookingStatus; note?:string; }
export interface ApiResponse<T>{ data:T; message?:string; }
export interface Paginated<T>{ data:T[]; total:number; page:number; limit:number; }
