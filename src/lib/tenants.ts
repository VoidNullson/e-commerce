// NOTE: Simple in-memory tenant-store resolver for domain routing.
type StoreCacheValue = {
  tenantId: string
  storeId: string
  updatedAt: number
}

const TTL = 1000 * 60 // 1 minute
const cache = new Map<string, StoreCacheValue>()

export function cacheStoreMapping(host: string, value: StoreCacheValue) {
  cache.set(host, { ...value, updatedAt: Date.now() })
}

export function getCachedStoreMapping(host: string) {
  const entry = cache.get(host)
  if (!entry) return null
  if (Date.now() - entry.updatedAt > TTL) {
    cache.delete(host)
    return null
  }
  return entry
}

export function clearStoreCache() {
  cache.clear()
}

// TODO: hydrate cache from Firestore when admin configures custom domains.
