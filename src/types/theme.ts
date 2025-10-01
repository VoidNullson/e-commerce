export type ThemeTokenSet = {
	colors?: {
		primary?: string;
		background?: string;
		foreground?: string;
		border?: string;
		muted?: string;
		accent?: string;
	};
	fonts?: {
		heading?: string;
		body?: string;
	};
};

export type SectionType =
	| "Hero"
	| "ProductGrid"
	| "RichText"
	| "Banner"
	| "Testimonials"
	| "Custom";

/**
 * Props for a section. We keep this as a loose `Record` for now
 * so each section can define its own props shape.
 * Later we can make this a union type per section type.
 */
export type SectionProps = Record<string, any>;

export interface ThemeSection {
	type: SectionType;
	props?: SectionProps;
}

export interface ThemeDocument {
	/** CSS tokens like colors, fonts, etc. */
	tokens?: ThemeTokenSet;

	/** All the sections that make up a page */
	sections: ThemeSection[];

	/** Optional metadata */
	name?: string;
	description?: string;
	createdAt?: number;
	updatedAt?: number;
}
