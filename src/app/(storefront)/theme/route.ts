import { NextResponse } from 'next/server'
import { getTheme } from '@/lib/firestore'

export async function GET() {
  const tenantId = process.env.NEXT_PUBLIC_FB_PROJECT_ID ?? 'demo-tenant'
  try {
    const theme = await getTheme(tenantId, 'default')
    return NextResponse.json(theme ?? { sections: [] })
  } catch (error) {
    console.warn('Failed to load theme', error)
    return NextResponse.json({ sections: [] }, { status: 200 })
  }
}
