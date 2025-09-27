export default function CheckoutPage() {
  return (
    <div className="container space-y-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Checkout</h1>
      <p className="text-muted-foreground">
        Stripe Connect destination payments will be triggered here. Hook up your store and call the checkout API to begin a
        payment flow.
      </p>
    </div>
  )
}
