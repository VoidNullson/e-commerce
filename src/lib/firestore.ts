// NOTE: Firestore helpers for multi-tenant Vega Commerce data fetching.
import { cache } from 'react'
import { adminDb } from './firebase.admin'

export type ThemeSection = {
  type: string
  props?: Record<string, unknown>
}

export type ThemeDocument = {
  tokens?: {
    colors?: Record<string, string>
    fonts?: Record<string, string>
  }
  sections: ThemeSection[]
}

export type StoreDocument = {
  id: string
  name: string
  tenantId: string
  mode: 'theme' | 'external'
  themeId?: string
  themeSettings?: ThemeDocument
  currency?: string
  locales?: string[]
  externalFrontend?: {
    url?: string
    allowListOrigins?: string[]
    publicKey?: string
  }
}

export const getStore = cache(async (tenantId: string, storeId: string) => {
  const storeSnap = await adminDb
    .collection('tenants')
    .doc(tenantId)
    .collection('stores')
    .doc(storeId)
    .get()

  if (!storeSnap.exists) {
    return null
  }

  return { id: storeSnap.id, tenantId, ...(storeSnap.data() as Omit<StoreDocument, 'id' | 'tenantId'>) }
})

export const getTheme = cache(async (tenantId: string, themeId?: string | null) => {
  if (!themeId) return null

  const themeSnap = await adminDb
    .collection('tenants')
    .doc(tenantId)
    .collection('themes')
    .doc(themeId)
    .get()

  if (!themeSnap.exists) {
    return null
  }

  return themeSnap.data() as ThemeDocument
})
