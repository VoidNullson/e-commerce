// NOTE: Lightweight ESM SDK for premium storefronts consuming the Vega Commerce API.
export type CommerceConfig = {
  baseUrl: string
  apiBase?: string
  fetcher?: typeof fetch
}

export class Commerce {
  private baseUrl: string
  private apiBase: string
  private fetcher: typeof fetch

  constructor(config: CommerceConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '')
    this.apiBase = (config.apiBase ?? '/api').replace(/\/$/, '')
    this.fetcher = config.fetcher ?? fetch
  }

  private url(path: string) {
    return `${this.baseUrl}${this.apiBase}${path}`
  }

  async products_list(storeId: string, params: URLSearchParams = new URLSearchParams()) {
    const url = this.url(`/stores/${storeId}/products?${params.toString()}`)
    const res = await this.fetcher(url)
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`)
    return res.json()
  }

  async product_by_handle(storeId: string, handle: string) {
    const res = await this.fetcher(this.url(`/stores/${storeId}/products/${handle}`))
    if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`)
    return res.json()
  }

  async cart_update(storeId: string, payload: unknown) {
    const res = await this.fetcher(this.url(`/stores/${storeId}/cart`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`Failed to update cart: ${res.status}`)
    return res.json()
  }

  async checkout_start(storeId: string, payload: unknown) {
    const res = await this.fetcher(this.url(`/stores/${storeId}/checkout`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`Failed to start checkout: ${res.status}`)
    return res.json()
  }
}
