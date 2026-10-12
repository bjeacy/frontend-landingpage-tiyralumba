'use client';
export default function Error({error, reset}:{error: Error & {digest?:string}; reset:()=>void}){
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 text-center">
      <h2 className="text-xl font-semibold">Terjadi kesalahan</h2>
      <p className="text-sm text-gray-600 mt-2">{error.message}</p>
      <button onClick={reset} className="mt-6 rounded-xl bg-brand-600 px-4 py-2 text-white">Coba lagi</button>
    </div>
  );
}
