// import type { SectionProps } from './registry'

// type ProductGridProps = SectionProps & {
//   data?: {
//     title?: string
//     subtitle?: string
//     products?: Array<{
//       id: string
//       title: string
//       price: string
//       image?: string
//       href?: string
//     }>
//   }
// }

export function ProductGrid({ items = [] as any[] }) {
	return (
		<section className="p-6 border rounded-xl mb-4 grid gap-3">
			<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
				{items.map((p: any) => (
					<div key={p.id} className="border rounded-lg p-3">
						<div className="font-medium">{p.title}</div>
						{p.handle && (
							<a
								href={`/products/${p.handle}`}
								className="text-sm underline"
							>
								View
							</a>
						)}
					</div>
				))}
			</div>
		</section>
	);
}


// export default function ProductGrid({ data }: ProductGridProps) {
//   return (
//     <section className="container space-y-6 py-16">
//       <div className="space-y-2 text-center">
//         {data?.title && <h2 className="text-3xl font-semibold tracking-tight text-slate-900">{data.title}</h2>}
//         {data?.subtitle && <p className="text-muted-foreground">{data.subtitle}</p>}
//       </div>
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//         {(data?.products ?? []).map((product) => (
//           <a key={product.id} href={product.href ?? '#'} className="card-base flex flex-col overflow-hidden">
//             {product.image ? (
//               <img src={product.image} alt={product.title} className="h-48 w-full object-cover" />
//             ) : (
//               <div className="flex h-48 items-center justify-center bg-muted text-muted-foreground">No image</div>
//             )}
//             <div className="space-y-2 p-4">
//               <h3 className="text-lg font-medium text-slate-900">{product.title}</h3>
//               <p className="text-sm text-muted-foreground">{product.price}</p>
//             </div>
//           </a>
//         ))}
//       </div>
//     </section>
//   )
// }
