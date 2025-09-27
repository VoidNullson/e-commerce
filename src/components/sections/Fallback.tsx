import type { SectionProps } from './registry'

export default function Fallback({ data }: SectionProps) {
  return (
    <section className="container py-8 text-sm text-muted-foreground">
      <pre className="overflow-x-auto rounded border bg-muted/30 p-4">{JSON.stringify(data, null, 2)}</pre>
      <p className="mt-2">Unknown section type – rendering fallback component.</p>
    </section>
  )
}
