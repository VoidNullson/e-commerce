import ProductCard from '@/components/ProductCard'
import prisma from '@/lib/db'

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { status: 'active' },
    orderBy: { createdAt: 'desc' },
    include: {
      media: true,
      variants: true,
    },
  })

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">All Products</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
