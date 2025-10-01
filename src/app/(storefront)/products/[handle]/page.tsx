import { notFound } from "next/navigation";
import { adminDb } from "@/lib/firebase.admin";

export const dynamic = "force-dynamic"; // avoid stale ISR

async function getProduct(tenantId: string, handle: string) {
	const snap = await adminDb
		.collection(`tenants/${tenantId}/products`)
		.where("handle", "==", handle)
		.limit(1)
		.get();

	return snap.empty ? null : (snap.docs[0].data() as any);
}

export default async function ProductPage({
	params,
}: {
	params: { handle: string };
}) {
	const tenantId = process.env.NEXT_PUBLIC_TENANT_ID!;
	const product = await getProduct(tenantId, params.handle).catch((e) => {
		console.error("[product page] query failed", e);
		return null;
	});

	if (!product) {
		console.warn("[product page] not found", {
			tenantId,
			handle: params.handle,
		});
		return notFound();
	}

	return (
		<main className="container mx-auto p-6">
			<h1 className="text-2xl font-semibold">{product.title}</h1>
			<p className="mt-2 text-muted-foreground">
				{product.description ?? "No description yet."}
			</p>
			<div className="mt-6 flex items-center gap-4">
				<span className="text-xl font-medium">
					${(Number(product?.pricing?.base ?? 0) / 100).toFixed(2)}
				</span>
				<form action="/api/cart/add" method="post">
					<input type="hidden" name="id" value={product.id} />
					<button className="btn btn-primary">Add to cart</button>
				</form>
			</div>
		</main>
	);
}
