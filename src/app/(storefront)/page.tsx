import { getThemeForStore } from "@/lib/theme";
import { ThemeDocument } from "@/types/theme";
import { Renderer } from "@/components/sections/Renderer";

export default async function Home() {
	const tenantId = process.env.NEXT_PUBLIC_TENANT_ID!;
	const storeId = process.env.NEXT_PUBLIC_STORE_ID!;
	const theme: ThemeDocument | null = await getThemeForStore(
		tenantId,
		storeId
	);

	if (!theme) {
		return (
			<div className="p-6">
				No theme found. Add a themeSettings JSON to the store doc.
			</div>
		);
	}

	return (
		<Renderer sections={theme.sections || []} tokens={theme.tokens || {}} />
	);
}
