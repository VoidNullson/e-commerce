# Vega Commerce Platform

The Vega Commerce platform is now a Firebase-first, multi-tenant e-commerce stack powered by Next.js 14 App Router, Firestore, Firebase Auth, and Stripe Connect. Each tenant can publish a JSON-driven theme or connect a premium external storefront that consumes the same backend APIs.

## What's included
- Multi-tenant Firestore schema (tenants → stores → catalog, carts, orders, customers, themes).
- Theme JSON renderer with composable sections (Hero, ProductGrid, RichText, Fallback).
- Public REST APIs for storefronts plus an SDK for premium external frontends.
- Firebase Functions (2nd gen) for Stripe webhook handling and Auth custom claims.
- Firebase Hosting rewrites to the Next.js SSR runtime.

## Prerequisites
- Node.js 20+
- pnpm (or npm/yarn)
- Firebase CLI (`npm i -g firebase-tools`)
- Stripe CLI (optional for local webhook testing)

## Local setup
1. Install dependencies: `pnpm install`.
2. Copy environment variables: `cp .env.example .env.local` and populate Firebase + Stripe secrets.
3. Run the Next.js dev server: `pnpm dev`.
4. (Optional) Start the Firebase emulators: `firebase emulators:start` (requires `FIREBASE_PROJECT_ID`).

### Environment variables
| Key | Description |
| --- | --- |
| `NEXT_PUBLIC_FB_API_KEY` | Client web API key from Firebase project. |
| `NEXT_PUBLIC_FB_AUTH_DOMAIN` | Auth domain. |
| `NEXT_PUBLIC_FB_PROJECT_ID` | Project ID used for tenant demo fallback. |
| `NEXT_PUBLIC_FB_STORAGE` | Storage bucket (optional for uploads). |
| `NEXT_PUBLIC_API_BASE` | Override for API base path (default `/api`). |
| `STRIPE_SECRET` | Stripe secret key (test or live). |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret from Stripe CLI/dashboard. |
| `FIREBASE_PROJECT_ID` | Project ID for Admin/Functions. |
| `GOOGLE_APPLICATION_CREDENTIALS` | JSON credentials string for local admin emulation (optional). |

## Development workflow
- Theme-driven storefront renders at `/` using Firestore or stub data.
- Admin surfaces live under `/(admin)` (currently stubbed for UI scaffolding).
- Public API routes live at `/api/stores/:storeId/...` for products, cart, and checkout.
- Premium clients can install `src/lib/sdk/commerce.ts` in their own Next.js app to consume the API.

## Deploying to Firebase
1. Initialise Firebase in this directory: `firebase use <project>`.
2. Build Next.js: `pnpm build`.
3. Deploy hosting + functions: `firebase deploy --only hosting,functions`.
4. Configure custom domains per store document (`domain` / `previewSubdomain`).

## External storefront mode
Set `mode: "external"` on a store document and populate `externalFrontend.url`. The built-in storefront will display a notice, while the same backend APIs remain available via the SDK for the premium frontend.

## Stripe Connect
- Each tenant’s store should save `stripeAccountId` (Standard account).
- Checkout API creates PaymentIntents with `transfer_data.destination` when configured.
- Cloud Function webhook marks Firestore orders as paid on `payment_intent.succeeded`.

## Testing
Testing is currently manual for this refactor. Wire up Vitest/Playwright to the Firestore-backed data layer once the catalog migrations are complete.
