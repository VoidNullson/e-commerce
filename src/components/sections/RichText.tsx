import type { SectionProps } from './registry'

type RichTextProps = SectionProps & {
  data?: {
    content?: string
  }
}

export default function RichText({ data }: RichTextProps) {
  if (!data?.content) return null
  return (
    <section className="container prose prose-slate py-16" dangerouslySetInnerHTML={{ __html: data.content }} />
  )
}
