import { onCall } from 'firebase-functions/v2/https'
import { z } from 'zod'
import { auth } from '../utils/admin'

const PayloadSchema = z.object({
  uid: z.string(),
  tenants: z.record(z.object({ role: z.string() })).optional(),
  platformRole: z.string().optional(),
})

export const setCustomClaims = onCall({
  region: 'us-central1',
}, async (request) => {
  if (!request.auth || request.auth.token.platformRole !== 'superadmin') {
    throw new Error('Only platform superadmins can assign custom claims')
  }

  const payload = PayloadSchema.parse(request.data)
  await auth.setCustomUserClaims(payload.uid, {
    tenants: payload.tenants ?? {},
    platformRole: payload.platformRole ?? null,
  })

  return { status: 'ok' }
})
