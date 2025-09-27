import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { storeId: string; handle: string } }) {
  return NextResponse.json({
    id: `${params.storeId}-${params.handle}`,
    title: `Product ${params.handle}`,
    description: 'Product detail data will eventually load from Firestore.',
    price: '$42.00',
    handle: params.handle,
  })
}
