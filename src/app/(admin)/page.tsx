export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-slate-300">
          This dashboard reads from Firestore; connect Firebase Auth to view tenant metrics.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Next steps</h2>
          <ul className="mt-4 list-disc space-y-2 pl-4 text-sm text-slate-300">
            <li>Invite your merchants via Firebase Auth.</li>
            <li>Assign custom claims with <code>setCustomClaims</code>.</li>
            <li>Seed products and publish a theme for each store.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Stripe Connect</h2>
          <p className="mt-2 text-sm text-slate-300">
            Once a tenant links a Stripe Standard account we will deliver destination payouts during checkout confirmation.
          </p>
        </div>
      </div>
    </div>
  )
}
