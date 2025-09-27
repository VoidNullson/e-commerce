import Link from 'next/link'
import type { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-white/10">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Vega Admin
          </Link>
          <nav className="flex items-center gap-4 text-sm text-slate-300">
            <Link href="/(admin)" className="hover:text-white">
              Dashboard
            </Link>
            <Link href="/(admin)/products" className="hover:text-white">
              Products
            </Link>
          </nav>
        </div>
      </header>
      <main className="container py-10">{children}</main>
    </div>
  )
}
