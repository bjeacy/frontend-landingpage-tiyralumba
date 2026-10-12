import { Card } from '@/components/ui/Card';
import type { User, Booking } from '@/types';
export function ProfileWidget({user, bookings}:{user:User|null; bookings:Booking[]}){
  if(!user) return <Card><p className="text-sm text-gray-600">Belum login. <a href="/login" className="text-brand-600 underline">Masuk</a></p></Card>;
  const statusMap:Record<string,string>={ pending:'Menunggu', approved:'Diterima', rejected:'Ditolak' };
  if(bookings.some(b=> b.status==='rejected') || (user as any).status==='rejected'){
    return (
      <Card className="border-red-200 bg-red-50">
        <h3 className="font-semibold text-red-700">Pendaftaran Ditolak</h3>
        <p className="text-sm text-red-600 mt-1">Hubungi admin untuk informasi selengkapnya.</p>
      </Card>
    );
  }
  return (
    <div className="space-y-4">
      <Card>
        <h3 className="font-semibold">{user.name}</h3>
        <p className="text-sm text-gray-600">{user.email} • {user.role ?? 'siswa'}</p>
      </Card>
      {user.role==='pelatih' ? (
        <Card>
          <h4 className="font-medium">Jadwal Mengajar</h4>
          {bookings.length===0 ? <p className="text-sm text-gray-500">Belum ada jadwal.</p> :
            <ul className="mt-2 space-y-2">{bookings.map(b=> <li key={b.id} className="text-sm flex justify-between"><span>{b.scheduleDate} {b.scheduleTime}</span><span className="text-gray-500">{statusMap[b.status]||b.status}</span></li>)}</ul>
          }
          <a href="/guru/atur-ulang-jadwal" className="text-sm text-brand-600 underline mt-3 inline-block">Atur Ulang Jadwal</a>
        </Card>
      ) : (
        <Card>
          <h4 className="font-medium">Riwayat Pendaftaran</h4>
          {bookings.length===0 ? <p className="text-sm text-gray-500">Belum ada pendaftaran.</p> :
            <ul className="mt-2 space-y-2">{bookings.map(b=> <li key={b.id} className="text-sm flex justify-between"><span>{b.scheduleDate} {b.scheduleTime}</span><span>{statusMap[b.status]||b.status}</span></li>)}</ul>
          }
        </Card>
      )}
    </div>
  );
}
