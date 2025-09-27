import Link from 'next/link'

const MOCK_PRODUCTS = [
  { id: '1', title: 'Placeholder tee', status: 'draft' },
  { id: '2', title: 'Canvas tote', status: 'active' },
]

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Products</h1>
          <p className="text-sm text-slate-300">Manage catalog items for the selected tenant store.</p>
        </div>
        <Link href="/(admin)/products/new" className="btn btn-primary">
          New product
        </Link>
      </div>
      <div className="space-y-4">
        {MOCK_PRODUCTS.map((product) => (
          <div key={product.id} className="flex items-center justify-between rounded border border-white/10 bg-white/5 p-4">
            <div>
              <p className="font-medium">{product.title}</p>
              <p className="text-xs uppercase tracking-wide text-slate-400">{product.status}</p>
            </div>
            <Link href={`/(admin)/products/${product.id}`} className="text-sm text-sky-300 hover:text-white">
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
