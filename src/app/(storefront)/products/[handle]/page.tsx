import { notFound } from 'next/navigation'

type ProductDetailProps = {
  params: { handle: string }
}

const MOCK_PRODUCTS = {
  'placeholder-tee': {
    title: 'Placeholder tee',
    price: '$35.00',
    description: 'A stand-in product until Firestore data is wired up.',
  },
  'canvas-tote': {
    title: 'Canvas tote',
    price: '$28.00',
    description: 'A durable tote bag perfect for errands and groceries.',
  },
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const product = MOCK_PRODUCTS[params.handle as keyof typeof MOCK_PRODUCTS]
  if (!product) {
    notFound()
  }

  return (
    <div className="container grid gap-10 py-16 lg:grid-cols-[1.25fr_1fr]">
      <div className="space-y-6">
        <div className="aspect-square w-full rounded-lg bg-muted" />
      </div>
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">{product.title}</h1>
          <p className="text-lg text-muted-foreground">{product.price}</p>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{product.description}</p>
        <button className="btn btn-primary w-full">Add to cart (stub)</button>
      </div>
    </div>
  )
}
