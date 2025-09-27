import { Renderer } from '@/components/sections/Renderer'
import { getStore, getTheme, type ThemeDocument } from '@/lib/firestore'

async function resolveTheme(): Promise<ThemeDocument | null> {
  const tenantId = process.env.NEXT_PUBLIC_FB_PROJECT_ID ?? 'demo-tenant'
  const storeId = 'demo-store'

  try {
    const store = await getStore(tenantId, storeId)
    if (!store) {
      return {
        sections: [
          {
            type: 'hero',
            props: {
              eyebrow: 'Demo mode',
              heading: 'Create your first store',
              subheading: 'Configure Firestore to replace this stub content with tenant-managed theme sections.',
              ctaLabel: 'Read the docs',
              ctaHref: '/docs',
            },
          },
          {
            type: 'productGrid',
            props: {
              title: 'Sample products',
              subtitle: 'Replace with real Firestore data by publishing your catalog.',
              products: [
                { id: '1', title: 'Placeholder tee', price: '$35.00' },
                { id: '2', title: 'Canvas tote', price: '$28.00' },
                { id: '3', title: 'Logo hoodie', price: '$65.00' },
                { id: '4', title: 'Sticker pack', price: '$12.00' },
              ],
            },
          },
        ],
      }
    }

    if (store.mode === 'external') {
      return {
        sections: [
          {
            type: 'richText',
            props: {
              content:
                '<h1>External storefront</h1><p>This store is configured to render via a premium external frontend. Update your domain rewrites to point at the custom app.</p>',
            },
          },
        ],
      }
    }

    const theme = store.themeSettings ?? (await getTheme(store.tenantId, store.themeId))
    return theme ?? null
  } catch (error) {
    console.warn('Failed to load theme from Firestore – falling back to demo theme', error)
    return {
      sections: [
        {
          type: 'hero',
          props: {
            eyebrow: 'Firestore unavailable',
            heading: 'Using fallback theme',
            subheading: 'Check your Firebase credentials to load tenant-managed themes.',
          },
        },
      ],
    }
  }
}

export default async function StorefrontHome() {
  const theme = await resolveTheme()
  return <Renderer theme={theme} />
}
