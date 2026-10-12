import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const PROTECTED=['/daftar','/profile','/guru'];
export function middleware(req: NextRequest){
  const token=req.cookies.get('token')?.value;
  const path=req.nextUrl.pathname;
  const isProtected=PROTECTED.some(p=>path.startsWith(p));
  if(isProtected && !token){
    const url=req.nextUrl.clone();
    url.pathname='/login';
    url.searchParams.set('next', path);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config={ matcher:['/daftar/:path*','/profile/:path*','/guru/:path*'] };
