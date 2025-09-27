import type { ThemeDocument, ThemeSection } from '@/lib/firestore'
import { fallbackSection, sectionRegistry } from './registry'

export function Renderer({ theme }: { theme: ThemeDocument | null }) {
  if (!theme) {
    return (
      <div className="container py-16">
        <p className="text-muted-foreground">No theme has been published yet.</p>
      </div>
    )
  }

  const tokens = theme.tokens ?? {}
  const sections = theme.sections ?? []

  return (
    <div
      style={{
        ['--brand' as string]: tokens.colors?.brand ?? 'var(--brand)',
      }}
    >
      {sections.map((section: ThemeSection, index) => {
        const Component = sectionRegistry[section.type] ?? fallbackSection
        return <Component key={`${section.type}-${index}`} tokens={tokens} data={section.props as Record<string, unknown>} />
      })}
    </div>
  )
}
