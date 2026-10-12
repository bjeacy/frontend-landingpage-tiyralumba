import Link from 'next/link';
export function TopBar(){
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-brand-600">PT Tirya Lumba</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/pelatih" className="hover:text-brand-600">Pelatih</Link>
          <Link href="/daftar" className="hover:text-brand-600">Daftar</Link>
          <Link href="/profile" className="hover:text-brand-600">Profil</Link>
          <Link href="/login" className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Masuk</Link>
        </nav>
      </div>
    </header>
  );
}
