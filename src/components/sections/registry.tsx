// import type { ComponentType } from 'react'
// import Hero from './Hero'
// import ProductGrid from './ProductGrid'
// import RichText from './RichText'
// import Fallback from './Fallback'

import type { ComponentType } from "react";
import { Hero } from "./Hero";
import { ProductGrid } from "./ProductGrid";

export const Fallback: ComponentType<{ type?: string }> = ({ type }) => (
	<div className="p-4 border rounded-xl mb-4 text-sm">
		Unknown section type <code>{String(type)}</code> – rendering fallback
		component.
	</div>
);

// allow multiple spellings/cases
export const registry: Record<string, ComponentType<any>> = {
	Hero,
	hero: Hero,
	"hero-section": Hero,

	ProductGrid,
	productgrid: ProductGrid,
	"product-grid": ProductGrid,
};

// export type SectionProps = {
//   tokens?: {
//     colors?: Record<string, string>
//     fonts?: Record<string, string>
//   }
//   data?: Record<string, unknown>
// }

// export type SectionComponent = ComponentType<SectionProps>

// export const sectionRegistry: Record<string, SectionComponent> = {
//   hero: Hero,
//   productGrid: ProductGrid,
//   richText: RichText,
// }

// export const fallbackSection = Fallback
