import type { ComponentType } from 'react'
import Hero from './Hero'
import ProductGrid from './ProductGrid'
import RichText from './RichText'
import Fallback from './Fallback'

export type SectionProps = {
  tokens?: {
    colors?: Record<string, string>
    fonts?: Record<string, string>
  }
  data?: Record<string, unknown>
}

export type SectionComponent = ComponentType<SectionProps>

export const sectionRegistry: Record<string, SectionComponent> = {
  hero: Hero,
  productGrid: ProductGrid,
  richText: RichText,
}

export const fallbackSection = Fallback
