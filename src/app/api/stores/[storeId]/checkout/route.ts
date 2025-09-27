import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: Request, { params }: { params: { storeId: string } }) {
  const payload = await request.json().catch(() => ({}))
  const tenantId = payload.tenantId ?? 'demo-tenant'
  const storeStripeAccount = payload.stripeAccountId ?? null

  if (!stripe) {
    return NextResponse.json(
      {
        status: 'requires-stripe-secret',
        message: 'Set STRIPE_SECRET in your environment to create PaymentIntents.',
      },
      { status: 400 }
    )
  }

  const amount = Number(payload.amount ?? 0)
  const currency = payload.currency ?? 'usd'

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    metadata: {
      tenantId,
      storeId: params.storeId,
      orderId: payload.orderId ?? 'pending-order',
    },
    ...(storeStripeAccount
      ? {
          transfer_data: {
            destination: storeStripeAccount,
          },
        }
      : {}),
  })

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    destinationAccount: storeStripeAccount,
  })
}
