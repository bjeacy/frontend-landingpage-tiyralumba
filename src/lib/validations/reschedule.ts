import { z } from 'zod';
export const rescheduleSchema=z.object({
  bookingId: z.string().min(1,'Booking ID wajib'),
  newDate: z.string().min(1,'Tanggal baru wajib'),
  newTime: z.string().min(1,'Jam baru wajib'),
  reason: z.string().min(5,'Alasan minimal 5 karakter').optional(),
});
export type RescheduleInput=z.infer<typeof rescheduleSchema>;
