// "use client";
// import { ThemeSection, ThemeTokenSet } from "@/types/theme";
// import * as R from "./registry";

// type RendererProps = {
// 	sections: ThemeSection[];
// 	tokens?: ThemeTokenSet;
// };

// export function Renderer({ sections, tokens }: RendererProps) {
// 	return (
// 		<main
// 			style={{ ["--brand" as any]: tokens?.colors?.primary ?? "#00d4ff" }}
// 			className="min-h-screen"
// 		>
// 			{sections.map((s, i) => {
// 				const Cmp = (R as any)[s.type] ?? R.fallbackSection;
// 				return <Cmp key={i} {...(s.props || {})} />;
// 			})}
// 		</main>
// 	);
// }


"use client";
import { registry, Fallback } from "./registry";
import type { ThemeSection, ThemeTokenSet } from "@/types/theme";

const pick = (type?: string) => (type ?? "").trim();

type RendererProps = { sections: ThemeSection[]; tokens?: ThemeTokenSet };

export function Renderer({ sections, tokens }: RendererProps) {
	return (
		<main
			style={{ ["--brand" as any]: tokens?.colors?.primary ?? "#00d4ff" }}
			className="min-h-screen"
		>
			{sections.map((s, i) => {
				const key = pick(s.type);
				const Cmp = (registry as any)[key] ?? Fallback;
				return <Cmp key={i} {...(s.props ?? {})} type={s.type} />;
			})}
		</main>
	);
}