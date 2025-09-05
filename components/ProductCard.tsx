// Fix: Import React to provide context for JSX and related types.
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { currency } from '@/lib/utils'
import { Prisma } from '@prisma/client'

type ProductWithDetails = Prisma.ProductGetPayload<{
  include: { media: true, variants: true }
}>

interface ProductCardProps {
  product: ProductWithDetails
}

export default function ProductCard({ product }: ProductCardProps) {
  const firstVariant = product.variants[0]

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <Link href={`/products/${product.handle}`}>
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
            <Image
              src={product.media[0]?.url || '/placeholder.svg'}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-base font-medium">
          <Link href={`/products/${product.handle}`}>{product.title}</Link>
        </CardTitle>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="font-semibold">{firstVariant ? currency(firstVariant.price) : 'N/A'}</p>
      </CardFooter>
    </Card>
  )
}