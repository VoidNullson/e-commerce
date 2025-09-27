import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { storeId: string } }) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page') ?? '1')
  const pageSize = Number(searchParams.get('pageSize') ?? '12')

  const products = Array.from({ length: pageSize }).map((_, index) => ({
    id: `${params.storeId}-product-${(page - 1) * pageSize + index + 1}`,
    title: `Product ${(page - 1) * pageSize + index + 1}`,
    handle: `product-${(page - 1) * pageSize + index + 1}`,
    price: '$42.00',
  }))

  return NextResponse.json({
    data: products,
    pagination: {
      page,
      pageSize,
      hasMore: true,
    },
  })
}
