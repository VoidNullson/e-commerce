import { clearCart, getCart, updateCartItemQuantity } from '@/lib/cart'
import { currency } from '@/lib/utils'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic'

export default async function CartPage() {
  const cart = await getCart()
  const subtotal = cart?.items.reduce(
    (acc, item) => acc + Number(item.variant.price) * item.quantity,
    0
  ) || 0;

  async function createOrder() {
    'use server'
    const cart = await getCart();
    if (!cart || cart.items.length === 0) {
      // should not happen if button is disabled
      return;
    }
    const subtotal = cart.items.reduce(
        (acc, item) => acc + Number(item.variant.price) * item.quantity,
        0
    );

    const order = await prisma.order.create({
      data: {
        email: 'guest@example.com', // Placeholder
        subtotal: subtotal,
        total: subtotal, // Assuming no tax/shipping for now
        items: {
          create: cart.items.map(item => ({
            variantId: item.variantId,
            quantity: item.quantity,
            unitPrice: item.variant.price,
            title: `${item.variant.product.title} - ${item.variant.title}`,
            sku: item.variant.sku,
          }))
        }
      },
    });

    await prisma.cart.delete({ where: { id: cart.id }});

    redirect(`/checkout?orderId=${order.id}`);
  }


  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <p>Your cart is empty. <Link href="/products" className="text-blue-600 underline">Continue shopping</Link></p>
      ) : (
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 rounded-lg border p-4"
                >
                  <Image
                    src={item.variant.product.media[0]?.url || '/placeholder.svg'}
                    alt={item.variant.product.title}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.variant.product.title}</h3>
                    <p className="text-sm text-gray-500">{item.variant.title}</p>
                    <p className="mt-1 font-medium">{currency(item.unitPrice)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <form action={updateCartItemQuantity.bind(null, {itemId: item.id})}>
                        <input
                            type="number"
                            name="quantity"
                            defaultValue={item.quantity}
                            min={1}
                            className="w-16 rounded-md border px-2 py-1 text-center"
                            onChange={(e) => e.currentTarget.form?.requestSubmit()}
                        />
                    </form>
                    <form action={updateCartItemQuantity.bind(null, {itemId: item.id, quantity: 0})}>
                        <button type="submit" className="text-gray-500 hover:text-red-600">
                            <Trash2 size={18} />
                        </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border bg-gray-50 p-6 h-fit">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{currency(subtotal)}</span>
            </div>
             <div className="mt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{currency(subtotal)}</span>
            </div>
            <form action={createOrder} className="mt-6">
                <button type="submit" className="btn btn-primary w-full">
                    Proceed to Checkout
                </button>
            </form>
            <form action={clearCart} className="mt-2">
                <button type="submit" className="btn btn-secondary w-full">
                    Clear Cart
                </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
