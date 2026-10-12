import './globals.css';
import type { Metadata } from 'next';
import { TopBar } from '@/components/features/TopBar';
import { Footer } from '@/components/features/Footer';
import { Providers } from '@/components/features/Providers';
export const metadata: Metadata={ title:'PT Tirya Lumba — Sekolah Renang', description:'Portal publik PT Tirya Lumba' };
export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <TopBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
