'use client'

import { addToCart } from '@/lib/cart'
import { ProductVariant } from '@prisma/client'
import { useTransition, useState } from 'react'

interface AddToCartButtonProps {
    variants: ProductVariant[]
}

export default function AddToCartButton({ variants }: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0].id)

  const handleAddToCart = () => {
    startTransition(async () => {
      await addToCart({ variantId: selectedVariantId, quantity: 1 })
      alert('Added to cart!')
    })
  }

  // A real app would have more complex variant selection logic
  const hasOptions = variants.length > 1 && variants.some(v => v.option1 || v.option2);

  return (
    <div>
        {hasOptions && (
            <div className='mb-4'>
                <label htmlFor="variant-select" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Option
                </label>
                <select 
                    id="variant-select"
                    value={selectedVariantId}
                    onChange={(e) => setSelectedVariantId(e.target.value)}
                    className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                    {variants.map(variant => (
                        <option key={variant.id} value={variant.id}>{variant.title}</option>
                    ))}
                </select>
            </div>
        )}
      <button
        onClick={handleAddToCart}
        disabled={isPending}
        className="btn btn-primary w-full"
      >
        {isPending ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  )
}
