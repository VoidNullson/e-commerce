import { onRequest } from 'firebase-functions/v2/https'
import Stripe from 'stripe'
import { db } from '../utils/admin'

const stripeSecret = process.env.STRIPE_SECRET
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

const stripe = stripeSecret
  ? new Stripe(stripeSecret, {
      apiVersion: '2024-06-20',
    })
  : null

export const stripeWebhook = onRequest({
  region: 'us-central1',
  secrets: ['STRIPE_WEBHOOK_SECRET'],
}, async (req, res) => {
  if (!stripe || !webhookSecret) {
    res.status(500).send('Stripe secret missing')
    return
  }

  const signature = req.header('stripe-signature')
  if (!signature) {
    res.status(400).send('Missing signature')
    return
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, signature, webhookSecret)
  } catch (error) {
    res.status(400).send(`Webhook verification failed: ${(error as Error).message}`)
    return
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object as Stripe.PaymentIntent
    const tenantId = intent.metadata?.tenantId
    const storeId = intent.metadata?.storeId
    const orderId = intent.metadata?.orderId

    if (tenantId && storeId && orderId) {
      await db
        .collection('tenants')
        .doc(tenantId)
        .collection('orders')
        .doc(orderId)
        .set(
          {
            paymentStatus: 'paid',
            stripePaymentIntentId: intent.id,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        )
    }
  }

  res.json({ received: true })
})
