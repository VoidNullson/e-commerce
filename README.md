# Vega Commerce

A production-ready e-commerce application built with Next.js 14 (App Router), Prisma, PostgreSQL, Stripe, and Tailwind CSS.

## Features

- Products with Variants (size/color), Media, Categories, Reviews
- Cart persisted by session cookie
- Real Stripe Checkout or a "Dev Checkout" for local development without keys
- Simple Admin Dashboard for recent products & orders
- Comprehensive seed data

## Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Payments**: [Stripe](https://stripe.com/)
- **Testing**: [Vitest](https://vitest.dev/) (Unit) & [Playwright](https://playwright.dev/) (E2E)
- **TypeScript**

---

## Quickstart

Follow these steps to get the application running locally.

### 1. Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [pnpm](https://pnpm.io/installation) (or npm/yarn)
- [PostgreSQL](https://www.postgresql.org/download/) running locally or a connection string to a hosted instance.
- [Docker](https://www.docker.com/products/docker-desktop/) (optional, for running PostgreSQL)

### 2. Clone the Repository

```bash
git clone <repository-url>
cd vega-commerce-next
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Setup Environment Variables

Copy the example environment file and update it with your database URL and other credentials.

```bash
cp .env.example .env
```

You will need to set at least `DATABASE_URL`. For a local PostgreSQL instance, it typically looks like this:
`DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"`

Example: `DATABASE_URL="postgresql://postgres:password@localhost:5432/vega_commerce"`

### 5. Setup Database

Push the Prisma schema to your database. This will create the necessary tables.

```bash
pnpm db:push
```

### 6. Seed the Database

Populate the database with sample products, categories, reviews, and more.

```bash
pnpm db:seed
```

### 7. Run the Development Server

```bash
pnpm dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

---

## Stripe Setup (Optional)

To enable real payments with Stripe Checkout:

1.  Sign up for a [Stripe account](https://dashboard.stripe.com/register).
2.  Find your API keys in the [Stripe Dashboard](https://dashboard.stripe.com/apikeys). You need the **Secret key**.
3.  Add the key to your `.env` file:
    ```
    STRIPE_SECRET_KEY=sk_test_...
    ```
4.  Set up a webhook endpoint to handle payment success events.
    - Install the [Stripe CLI](https://stripe.com/docs/stripe-cli).
    - Run `stripe login`.
    - Forward webhook events to your local server:
      ```bash
      stripe listen --forward-to localhost:3000/api/stripe/webhook
      ```
    - The CLI will print a webhook signing secret (`whsec_...`). Add this to your `.env` file:
      ```
      STRIPE_WEBHOOK_SECRET=whsec_...
      ```
5.  Set your base URL in `.env`:
    ```
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    ```
6.  Restart your development server.

If you do not provide Stripe keys, the app will fall back to a "Dev Checkout" mode, which simulates a successful payment.

---

## Testing

### Unit Tests

Run all unit tests with Vitest:

```bash
pnpm test
```

### End-to-End (E2E) Tests

E2E tests use Playwright. Make sure your development server is running (`pnpm dev`) before executing the tests.

```bash
pnpm test:e2e
```

---

## Deployment (Vercel)

1.  Push your code to a Git repository (e.g., GitHub).
2.  Import the project into [Vercel](https://vercel.com/).
3.  Configure the environment variables (especially `DATABASE_URL` and Stripe keys).
4.  Vercel will automatically detect the Next.js framework and build settings. The `postinstall` script will run `prisma generate`.
5.  Deploy!
