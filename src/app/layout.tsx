// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { TopBar } from '@/components/features/TopBar';
import { Footer } from '@/components/features/Footer';

const heading = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta' });
const body = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'PT Tirya Lumba — Sekolah Renang',
  description: 'Portal publik PT Tirya Lumba',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${heading.variable} ${body.variable} min-h-screen bg-neutralLight font-body text-textDark`}>
        <TopBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
