# NextJS Webapp Template

A pre-built webapp template for [Women Defining AI](https://www.womendefiningai.com/) vibecoding intro, edited from the [McKay App Template](https://github.com/mckaywrigley/mckays-app-template). This template hides boilerplate integrations while we build out functionality & also uses boime checks instead of prettier for format and linting.

## Tech Stack

- IDE: [Cursor](https://www.cursor.com/)
- Frontend: [Next.js](https://nextjs.org/docs), [Tailwind](https://tailwindcss.com/docs/guides/nextjs), [Shadcn](https://ui.shadcn.com/docs/installation), [Framer Motion](https://www.framer.com/motion/introduction/)
- Backend: [PostgreSQL](https://www.postgresql.org/about/), [Supabase](https://supabase.com/), [Drizzle](https://orm.drizzle.team/docs/get-started-postgresql), [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- Auth: [Clerk](https://clerk.com/)
- Payments: [Stripe](https://stripe.com/)
- Analytics: [PostHog](https://posthog.com/)

## Prerequisites

You will need accounts for the following services.

They all have free plans that you can use to get started.

- Create a [Cursor](https://www.cursor.com/) account
- Create a [GitHub](https://github.com/) account
- Create a [Supabase](https://supabase.com/) account
- Create a [Clerk](https://clerk.com/) account
- Create a [Stripe](https://stripe.com/) account
- Create a [PostHog](https://posthog.com/) account
- Create a [Vercel](https://vercel.com/) account

You will likely not need paid plans unless you are building a business.

## Environment Variables

```bash
# DB (Supabase)
DATABASE_URL=

# Auth (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup

# Payments (Stripe)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PORTAL_LINK=
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_YEARLY=
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_MONTHLY=

# Analytics (PostHog)
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env.local` and fill in the environment variables from above
3. Run `npm install` to install dependencies
4. Run `npm run dev` to run the app locally

## Known Issues

- **Moderate Vulnerability in `esbuild` (via `drizzle-kit`)**: As of July 2024, `npm audit` reports a moderate vulnerability in `esbuild`, a development dependency pulled in by `drizzle-kit`. This vulnerability ([GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99)) only affects the local development server (`npm run dev`) and does not impact the production build. The current recommendation is to monitor Dependabot alerts and wait for an upstream fix in `drizzle-kit` or its dependencies, rather than using `npm audit fix --force` which may cause breaking changes.

## Re-enabling Integrations Step-by-Step

Follow this order to re-enable the core integrations:

1.  **Enable Clerk Authentication:** This is foundational.
    *   Add Clerk keys to `.env.local`.
    *   Uncomment `ClerkProvider` in `app/layout.tsx`.
    *   Uncomment and configure `clerkMiddleware` in `middleware.ts` (define public/protected routes).
    *   Add Clerk UI components (`<SignInButton>`, `<SignUpButton>`, `<UserButton>`) to the header or relevant pages.
    *   (Optional but recommended) Set up Clerk webhooks (`app/api/webhooks/clerk/route.ts` - needs creation) for user sync. Ensure the route is public in `middleware.ts`.

2.  **Connect Supabase Database & Profiles:** Link users to data.
    *   Add `DATABASE_URL` to `.env.local`.
    *   Ensure the `profilesTable` schema exists and is configured in `db/db.ts`.
    *   Implement or uncomment logic to sync Clerk users with the `profiles` table (via webhook or layout check).

3.  **Implement Supabase Storage (If Needed):**
    *   Add necessary Supabase env vars.
    *   Create storage actions in `actions/storage/`.
    *   Implement UI components for file handling.
    *   Set up bucket policies/RLS in Supabase UI (provide necessary SQL).

4.  **Enable Stripe Payments:** Requires Auth and DB.
    *   Add Stripe keys and links to `.env.local`.
    *   Create the Stripe webhook handler (`app/api/webhooks/stripe/route.ts`). Handle events like `checkout.session.completed`.
    *   Ensure the webhook route is public in `middleware.ts`.
    *   Implement Stripe actions (checkout, portal).
    *   Add pricing page/UI elements.

5.  **Enable PostHog Analytics:** Requires Auth.
    *   Add PostHog keys to `.env.local`.
    *   Uncomment `PostHogProvider` and initialization in `components/utilities/providers.tsx`.
    *   Uncomment `PostHogPageview` and `PostHogUserIdentify` in `app/layout.tsx`.
    *   Add custom event tracking (`posthog.capture()`) where needed.
