import Link from 'next/link'
import clsx from 'clsx'
// import type { SectionProps } from './registry'

// type HeroProps = SectionProps & {
//   data?: {
//     eyebrow?: string
//     heading?: string
//     subheading?: string
//     ctaLabel?: string
//     ctaHref?: string
//     alignment?: 'left' | 'center'
//   }
// }

export function Hero({ title, subtitle, ctaText, ctaLink }: any) {
	return (
		<section className="p-6 border rounded-xl mb-4">
			<h1 className="text-2xl font-semibold">{title}</h1>
			{subtitle && (
				<p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
			)}
			{ctaText && (
				<a
					href={ctaLink ?? "#"}
					className="btn btn-primary mt-3 inline-block"
				>
					{ctaText}
				</a>
			)}
		</section>
	);
}

// export default function Hero({ tokens, data }: HeroProps) {
//   const alignment = data?.alignment ?? 'center'
//   return (
//     <section className="border-b bg-gradient-to-b from-[var(--brand)]/10 to-transparent">
//       <div
//         className={clsx('container flex flex-col gap-6 py-16', {
//           'text-left items-start': alignment === 'left',
//           'text-center items-center': alignment !== 'left',
//         })}
//       >
//         {data?.eyebrow && <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{data.eyebrow}</span>}
//         {data?.heading && <h1 className="text-4xl font-bold tracking-tight text-slate-900">{data.heading}</h1>}
//         {data?.subheading && <p className="max-w-2xl text-lg text-muted-foreground">{data.subheading}</p>}
//         {data?.ctaLabel && data?.ctaHref && (
//           <div className={clsx('flex w-full', alignment === 'left' ? 'justify-start' : 'justify-center')}>
//             <Link
//               href={data.ctaHref}
//               className="btn btn-primary"
//               style={{ backgroundColor: tokens?.colors?.brand, borderColor: tokens?.colors?.brand }}
//             >
//               {data.ctaLabel}
//             </Link>
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }
