'use client';
export default function Error({error, reset}:{error:Error; reset:()=>void}){
  return <div className="mx-auto max-w-4xl px-6 py-10 text-center"><p className="text-red-600">{error.message}</p><button onClick={reset} className="mt-4 rounded-xl bg-brand-600 px-4 py-2 text-white">Coba lagi</button></div>;
}
