'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
// framer-motion only via dynamic import per spec
const MotionDiv: any = dynamic(()=> import('framer-motion').then(m=> m.motion.div as any), { ssr:false });
const MotionH1: any = dynamic(()=> import('framer-motion').then(m=> m.motion.h1 as any), { ssr:false });
export function HeroSection(){
  const Title = MotionH1 || 'h1';
  const Wrap = MotionDiv || 'div';
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-700 text-white">
      <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-2 gap-8 items-center">
        <Wrap initial={MotionDiv?{opacity:0,y:12}:undefined} animate={MotionDiv?{opacity:1,y:0}:undefined} transition={{duration:0.5}}>
          <Title className="text-4xl md:text-5xl font-bold leading-tight">Jago Renang Bersama PT Tirya Lumba</Title>
          <p className="mt-4 text-white/90">Program terstruktur untuk pemula hingga atlet. Pelatih bersertifikat, jadwal fleksibel.</p>
          <div className="mt-8 flex gap-3">
            <Link href="/daftar"><Button variant="outline" className="bg-white text-brand-700 hover:bg-gray-50">Daftar Sekarang</Button></Link>
            <Link href="/pelatih"><Button variant="ghost" className="text-white border border-white/30">Lihat Pelatih</Button></Link>
          </div>
        </Wrap>
        <div className="relative h-64 md:h-80 rounded-3xl bg-white/15 backdrop-blur flex items-center justify-center">
          <span className="text-white/80 text-sm">Hero Image / Illustration</span>
        </div>
      </div>
    </section>
  );
}
