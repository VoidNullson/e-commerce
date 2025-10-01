import * as dotenv from "dotenv";
import * as fs from "node:fs";
import * as path from "node:path";
import * as admin from "firebase-admin";

const envLocal = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envLocal)) {
	dotenv.config({ path: envLocal });
} else {
	dotenv.config(); // loads .env if present
}

// Debug (one-time): confirm values are loaded
console.log("[seed] cwd:", process.cwd());
console.log("[seed] FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
console.log(
	"[seed] GOOGLE_APPLICATION_CREDENTIALS:",
	process.env.GOOGLE_APPLICATION_CREDENTIALS
);

function resolveCred() {
	const p = process.env.GOOGLE_APPLICATION_CREDENTIALS || "";
	const abs = path.isAbsolute(p) ? p : path.join(process.cwd(), p);
	if (!fs.existsSync(abs)) {
		throw new Error(`Service account file not found at ${abs}`);
	}
	process.env.GOOGLE_APPLICATION_CREDENTIALS = abs; // help ADC
}

async function main() {
	const projectId = process.env.FIREBASE_PROJECT_ID;
	if (!projectId) throw new Error("FIREBASE_PROJECT_ID is not set.");

	resolveCred();

	if (!admin.apps.length) {
		admin.initializeApp({
			projectId,
			credential: admin.credential.applicationDefault(),
		});
	}
	const db = admin.firestore();

	const tenantId = process.env.NEXT_PUBLIC_TENANT_ID || "demo-tenant";
	const storeId = process.env.NEXT_PUBLIC_STORE_ID || "demo-store";

	console.log(
		"Seeding to project:",
		projectId,
		"tenant:",
		tenantId,
		"store:",
		storeId
	);

	await db.doc(`/tenants/${tenantId}`).set(
		{
			name: "Demo Tenant",
			plan: "starter",
			status: "active",
			createdAt: Date.now(),
		},
		{ merge: true }
	);

	await db.doc(`/tenants/${tenantId}/stores/${storeId}`).set(
		{
			name: "Demo Store",
			currency: "USD",
			locales: ["en-US"],
			previewSubdomain: "demo",
			themeSettings: {
				tokens: { colors: { primary: "#00d4ff" } },
				sections: [
					{
						type: "Hero",
						props: {
							title: "Welcome to Demo",
							subtitle: "Handpicked drops",
							ctaText: "Shop Now",
							ctaLink: "/products",
						},
					},
					{
						type: "ProductGrid",
						props: {
							items: [
								{
									id: "p1",
									handle: "tee",
									title: "Classic Tee",
								},
								{
									id: "p2",
									handle: "hoodie",
									title: "Fleece Hoodie",
								},
							],
						},
					},
				],
			},
		},
		{ merge: true }
	);

	await db.doc(`/tenants/${tenantId}/products/p1`).set({
		tenantId,
		storeId,
		id: "p1",
		handle: "tee",
		title: "Classic Tee",
		pricing: { base: 2000, currency: "usd" },
		status: "active",
	});

	await db.doc(`/tenants/${tenantId}/products/p2`).set({
		tenantId,
		storeId,
		id: "p2",
		handle: "hoodie",
		title: "Fleece Hoodie",
		pricing: { base: 4800, currency: "usd" },
		status: "active",
	});

	console.log("✅ Seed complete.");
}

main().catch((err) => {
	console.error("❌ Seed failed:", err);
	process.exit(1);
});
