import { getCart } from '@/lib/cart'
import { Package2, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default async function Navbar() {
  const cart = await getCart()
  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Package2 className="h-6 w-6" />
          <span className="font-bold">Vega Commerce</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="/products">Products</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
        <div className="flex items-center justify-end space-x-4">
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
