import { adminDb } from "@/lib/firebase.admin";
import type { ThemeDocument } from "@/types/theme";

export async function getThemeForStore(
	tenantId: string,
	storeId: string
): Promise<ThemeDocument | null> {
	try {
		if (!tenantId || !storeId)
			throw new Error(
				`Missing ids tenantId=${tenantId} storeId=${storeId}`
			);

		const storeSnap = await adminDb
			.doc(`/tenants/${tenantId}/stores/${storeId}`)
			.get();
		if (!storeSnap.exists) {
			console.warn("[getThemeForStore] store not found", {
				tenantId,
				storeId,
			});
			return null;
		}

		// Only return plain JSON — never return Snapshots
		const store = storeSnap.data() as any;

		if (store?.themeSettings?.sections) {
			return store.themeSettings as ThemeDocument;
		}

		if (store?.themeId) {
			const themeSnap = await adminDb
				.doc(`/tenants/${tenantId}/themes/${store.themeId}`)
				.get();
			return themeSnap.exists
				? (themeSnap.data() as ThemeDocument)
				: null;
		}

		return null;
	} catch (err) {
		console.error("[getThemeForStore] failed", {
			projectId: process.env.FIREBASE_PROJECT_ID,
			creds: process.env.GOOGLE_APPLICATION_CREDENTIALS,
			err,
		});
		throw err;
	}
}
