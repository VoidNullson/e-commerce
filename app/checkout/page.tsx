import prisma from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'

async function DevCheckoutButton({ orderId }: { orderId: string }) {
  async function markOrderPaid() {
    'use server'
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'paid', paymentRef: 'dev-checkout' },
    })
    redirect(`/success?orderId=${orderId}`)
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border p-8 text-center">
      <h2 className="text-xl font-semibold">Dev Checkout</h2>
      <p className="my-4 text-gray-600">
        Stripe is not configured. Use this button to simulate a successful payment.
      </p>
      <form action={markOrderPaid}>
        <button type="submit" className="btn btn-primary w-full">
          Mark Order as Paid
        </button>
      </form>
    </div>
  )
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { orderId?: string }
}) {
  const { orderId } = searchParams
  if (!orderId) {
    return redirect('/cart')
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { variant: { include: { product: true } } } } },
  })

  if (!order) {
    return redirect('/cart')
  }

  // If Stripe is not configured, show the dev checkout.
  if (!stripe || !process.env.NEXT_PUBLIC_BASE_URL) {
    return <DevCheckoutButton orderId={order.id} />
  }

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: order.items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
        },
        unit_amount: Math.round(Number(item.unitPrice) * 100),
      },
      quantity: item.quantity,
    })),
    metadata: {
      orderId: order.id,
    },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
  })

  if (session.url) {
    redirect(session.url)
  } else {
    // Handle error case where session URL isn't created
    return redirect('/cart?error=checkout-failed')
  }
}
