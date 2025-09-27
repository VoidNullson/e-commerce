// NOTE: Stripe helper configured for Connect destination charges.
import Stripe from 'stripe'

const stripeSecret = process.env.STRIPE_SECRET

export const stripe = stripeSecret
  ? new Stripe(stripeSecret, {
      apiVersion: '2024-06-20',
    })
  : null
