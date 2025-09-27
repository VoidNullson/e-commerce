import Link from 'next/link'
import type { ReactNode } from 'react'

export default function StorefrontLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Vega Commerce
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/products">Products</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t bg-muted/40 py-8 text-sm text-muted-foreground">
        <div className="container">
          Built on the Vega multi-tenant commerce platform.
        </div>
      </footer>
    </div>
  )
}
