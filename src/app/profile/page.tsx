import { ProfileWidget } from '@/components/features/ProfileWidget';
import { getProfile, getMyBookings } from '@/services/profile.service';
export const dynamic='force-dynamic';
export default async function ProfilePage(){
  const [user, bookings]=await Promise.all([getProfile(), getMyBookings()]);
  // Fallback mock ketika API belum ready — tetap render role-aware
  const mockUser=user ?? null;
  const mockBookings=bookings ?? [];
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-xl font-bold">Profil</h1>
      <div className="mt-6"><ProfileWidget user={mockUser as any} bookings={mockBookings as any} /></div>
    </div>
  );
}
