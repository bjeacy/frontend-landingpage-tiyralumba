import Link from 'next/link';

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-heading font-bold text-primary">PT Tirya Lumba</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/pelatih" className="transition hover:text-primary">Pelatih</Link>
          <Link href="/daftar" className="transition hover:text-primary">Daftar</Link>
          <Link href="/profile" className="transition hover:text-primary">Profil</Link>
          <Link href="/login" className="rounded-2xl bg-cyan px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-primary">Masuk</Link>
        </nav>
      </div>
    </header>
  );
}
