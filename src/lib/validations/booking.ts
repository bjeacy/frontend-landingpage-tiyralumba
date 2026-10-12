import { z } from 'zod';
export const bookingStep1Schema=z.object({
  programId: z.string().min(1,'Pilih program'),
  scheduleDate: z.string().min(1,'Pilih tanggal'),
  scheduleTime: z.string().min(1,'Pilih jam'),
});
export const bookingStep2Schema=z.object({
  name: z.string().min(2,'Nama minimal 2 karakter'),
  phone: z.string().min(9,'No HP minimal 9 digit'),
  note: z.string().optional(),
});
export const bookingSchema=bookingStep1Schema.merge(bookingStep2Schema);
export type BookingStep1=z.infer<typeof bookingStep1Schema>;
export type BookingStep2=z.infer<typeof bookingStep2Schema>;
export type BookingInput=z.infer<typeof bookingSchema>;
