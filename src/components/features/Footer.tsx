export function Footer(){
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-gray-600">
        <p className="font-medium text-gray-900">PT Tirya Lumba — Sekolah Renang</p>
        <p className="mt-1">Jl. Kolam Renang No. 1 • info@tiryatumba.id • 0812-0000-0000</p>
        <p className="mt-4 text-xs text-gray-400">© {new Date().getFullYear()} PT Tirya Lumba. All rights reserved.</p>
      </div>
    </footer>
  );
}
