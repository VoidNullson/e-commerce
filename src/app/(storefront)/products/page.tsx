import Link from 'next/link'

const MOCK_PRODUCTS = [
  { id: '1', title: 'Placeholder tee', price: '$35.00', handle: 'placeholder-tee' },
  { id: '2', title: 'Canvas tote', price: '$28.00', handle: 'canvas-tote' },
]

export default function ProductsPage() {
  return (
    <div className="container space-y-6 py-16">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Catalog</h1>
        <p className="text-muted-foreground">Products will load from Firestore once seeded.</p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_PRODUCTS.map((product) => (
          <Link key={product.id} href={`/products/${product.handle}`} className="card-base space-y-2 p-6">
            <h2 className="text-xl font-medium text-slate-900">{product.title}</h2>
            <p className="text-muted-foreground">{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
