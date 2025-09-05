import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import type { Stripe } from 'stripe'
import prisma from '@/lib/db'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('Stripe webhook secret is not set.');
    return new Response('Webhook secret not configured.', { status: 500 });
  }

  let event: Stripe.Event
  try {
    event = stripe!.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error(`Webhook signature verification failed: ${errorMessage}`)
    return new Response(`Webhook Error: ${errorMessage}`, { status: 400 })
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { orderId } = session.metadata || {}

    if (orderId) {
        try {
            await prisma.order.update({
                where: { id: orderId },
                data: {
                    status: 'paid',
                    paymentRef: session.payment_intent as string,
                },
            });
            console.log(`Order ${orderId} marked as paid.`);
        } catch (error) {
            console.error(`Failed to update order ${orderId}:`, error);
        }
    } else {
        console.warn('Checkout session completed without an orderId in metadata.');
    }
  }

  return new Response(null, { status: 200 })
}
