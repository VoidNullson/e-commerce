export default function AdminNewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Create product</h1>
        <p className="text-sm text-slate-300">
          Firestore mutations are not wired up yet. Use this form as a reference when building the admin experience.
        </p>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white" htmlFor="title">
            Title
          </label>
          <input id="title" className="w-full rounded border border-white/10 bg-white/10 p-2 text-sm text-white" placeholder="Product title" />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white" htmlFor="price">
            Price
          </label>
          <input id="price" className="w-full rounded border border-white/10 bg-white/10 p-2 text-sm text-white" placeholder="$0.00" />
        </div>
        <button type="button" className="btn btn-primary">
          Save draft (stub)
        </button>
      </form>
    </div>
  )
}
