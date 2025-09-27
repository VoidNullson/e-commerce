import { NextResponse } from 'next/server'

export async function POST(request: Request, { params }: { params: { storeId: string } }) {
  const payload = await request.json().catch(() => ({}))
  return NextResponse.json({
    storeId: params.storeId,
    cartId: payload.cartId ?? 'guest-cart',
    status: 'stubbed',
    items: payload.items ?? [],
    message: 'Persist carts to Firestore /tenants/{tenantId}/carts to replace this stub.',
  })
}
