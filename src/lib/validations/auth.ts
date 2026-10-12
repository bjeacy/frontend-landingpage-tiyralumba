import { z } from 'zod';
export const loginSchema=z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6,'Minimal 6 karakter'),
});
export const registerSchema=z.object({
  name: z.string().min(2,'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(9,'No HP minimal 9 digit').regex(/^[0-9+]+$/,'No HP tidak valid'),
  password: z.string().min(8,'Minimal 8 karakter'),
  confirmPassword: z.string(),
}).refine(d=>d.password===d.confirmPassword,{ message:'Konfirmasi password tidak cocok', path:['confirmPassword'] });
export const otpSchema=z.object({
  otp: z.string().length(6,'OTP 6 digit').regex(/^[0-9]+$/,'OTP hanya angka'),
});
export type LoginInput=z.infer<typeof loginSchema>;
export type RegisterInput=z.infer<typeof registerSchema>;
export type OtpInput=z.infer<typeof otpSchema>;
