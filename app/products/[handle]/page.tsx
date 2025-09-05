import { notFound } from 'next/navigation'
import prisma from '@/lib/db'
import Image from 'next/image'
import { currency } from '@/lib/utils'
import AddToCartButton from '@/components/AddToCartButton'
import { Star } from 'lucide-react'

export default async function ProductDetailPage({
  params,
}: {
  params: { handle: string }
}) {
  const product = await prisma.product.findUnique({
    where: { handle: params.handle },
    include: {
      media: true,
      variants: {
        orderBy: {
          price: 'asc'
        }
      },
      reviews: {
        take: 3,
        orderBy: {
          createdAt: 'desc'
        }
      },
    },
  })

  if (!product || !product.variants.length) {
    return notFound()
  }

  const primaryVariant = product.variants[0];

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Image Gallery */}
        <div>
          <div className="mb-4 h-96 w-full overflow-hidden rounded-lg border">
            <Image
              src={product.media[0]?.url || '/placeholder.svg'}
              alt={product.title}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.media.slice(1, 5).map((img) => (
              <div
                key={img.id}
                className="overflow-hidden rounded-lg border"
              >
                <Image
                  src={img.url}
                  alt={product.title}
                  width={150}
                  height={150}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="mt-4 text-2xl font-semibold">
            {currency(primaryVariant.price)}
          </p>
          <p className="mt-6 text-gray-600">{product.description}</p>
          
          <div className="mt-8">
            <AddToCartButton variants={product.variants} />
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-bold">Recent Reviews</h2>
            {product.reviews.length > 0 ? (
              <div className="mt-4 space-y-4">
                {product.reviews.map(review => (
                  <div key={review.id} className="rounded-lg border bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{review.author}</p>
                      <div className="flex items-center">
                        {Array.from({length: review.rating}).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                        ))}
                         {Array.from({length: 5 - review.rating}).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gray-300"/>
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">{review.body}</p>
                  </div>
                ))}
              </div>
            ) : (
                <p className="mt-4 text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
