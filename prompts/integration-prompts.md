# AI Prompts for Re-enabling Integrations

Use these prompts as a starting point when asking an AI coding assistant to help re-enable the various integrations in this template. Adapt them based on the specific requirements and progress.

## 1. Enable Clerk Authentication

### Enable Clerk Middleware

```
Task: Enable Clerk Middleware

Goal: Protect all routes except specified public ones using Clerk authentication.

Files to Modify:
*   `middleware.ts`

Steps:
1.  In `middleware.ts`, uncomment the `clerkMiddleware` and `createRouteMatcher` imports from `@clerk/nextjs/server`.
2.  Uncomment the `isPublicRoute` constant and its `createRouteMatcher` call. Define the following public routes:
    *   `/`
    *   `/login(.*)`
    *   `/signup(.*)`
    *   `/api/stripe/webhooks` (Anticipatory for Stripe)
    *   `/api/clerk/webhooks` (Anticipatory for Clerk webhooks, if used)
3.  Comment out the default minimal middleware function (`export function middleware(request: NextRequest) {...}`).
4.  Uncomment the `export default clerkMiddleware(...)` block and its internal logic (`if (!isPublicRoute(request)) { auth().protect() }`).
5.  Ensure the `config` export remains correct for matching routes.
6.  Ensure code adheres to project rules: `auth`, `general`.

Provide the complete updated code for `middleware.ts`.
```

### Enable Clerk Provider & UI

```
Task: Enable Clerk Provider and Basic UI

Goal: Wrap the application in the ClerkProvider and add basic sign-in/sign-up/user buttons to the header.

Files to Modify:
*   `app/layout.tsx`
*   `components/header.tsx`

Steps:
1.  In `app/layout.tsx`, uncomment the `<ClerkProvider>` wrapping the `<html>` tag.
2.  Import `ClerkProvider`, `SignInButton`, `SignUpButton`, `SignedIn`, `SignedOut`, `UserButton` from `@clerk/nextjs`.
3.  In `components/header.tsx`:
    *   Add `<SignedOut>` and `<SignedIn>` components.
    *   Inside `<SignedOut>`, add a `<SignInButton />` and `<SignUpButton />` (likely styled as Buttons from shadcn).
    *   Inside `<SignedIn>`, add a `<UserButton />`.
4.  Ensure components have the necessary 'use client' or 'use server' directives as per project rules (`frontend`). Header is likely 'use client' if it contains interactive buttons.

Provide the complete updated code for `app/layout.tsx` and `components/header.tsx`.
```

## 2. Connect Supabase Database & Profiles

```
Task: Implement Profile Syncing with Clerk

Goal: Ensure a user profile exists in the Supabase `profiles` table corresponding to the authenticated Clerk user.

Assumptions:
*   Clerk authentication is enabled.
*   `DATABASE_URL` is set in `.env.local`.
*   A `profilesTable` schema exists in `db/schema/profiles-schema.ts` (with at least `userId: text("user_id").primaryKey()` and `email: text("email")`).
*   Actions `getProfileByUserIdAction(userId: string)` and `createProfileAction(profileData: InsertProfile)` exist in `actions/db/profile-actions.ts`.

Files to Modify:
*   `app/layout.tsx`
*   (Optional: Create `app/api/webhooks/clerk/route.ts` if using webhooks)

Method 1: Check on Layout Load (Simpler)

Steps:
1.  In `app/layout.tsx`:
    *   Import `auth` from `@clerk/nextjs/server`.
    *   Import the necessary profile actions.
    *   Uncomment or add logic to get the `userId` using `await auth()`.
    *   If `userId` exists, call `getProfileByUserIdAction(userId)`.
    *   If the profile doesn't exist (`!profileResult.isSuccess` or `!profileResult.data`), call `createProfileAction` with the `userId` and potentially other details fetched from Clerk (though fetching user details here adds complexity; a webhook is often better).

Method 2: Clerk Webhook (More Robust)

Steps:
1.  Create `app/api/webhooks/clerk/route.ts`.
2.  Implement a `POST` handler using `WebhookReceiver` from `svix` to handle Clerk webhooks (specifically `user.created`).
3.  Verify the webhook signature using secrets from `.env.local` (`CLERK_WEBHOOK_SECRET`).
4.  On `user.created` event, extract user data (`id`, `email_addresses`, etc.).
5.  Call `createProfileAction` with the extracted data.
6.  Ensure this route (`/api/clerk/webhooks`) is public in `middleware.ts`.
7.  In the Clerk dashboard, configure the webhook endpoint.

Provide the code for the chosen method (Method 1 modification to `app/layout.tsx` or full code for `app/api/webhooks/clerk/route.ts`). Ensure adherence to project rules (`backend`, `auth`).
```

## 3. Implement Supabase Storage

```
Task: Create Supabase File Upload Action

Goal: Create a server action to upload a file to a specified Supabase Storage bucket.

Assumptions:
*   Supabase project is set up with Storage enabled.
*   Environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in `.env.local`.

Files to Create/Modify:
*   `actions/storage/upload-file-storage-action.ts` (Create)
*   `types/actions-types.ts` (Potentially update ActionState if needed)
*   `lib/supabase/client.ts` (Create Supabase client helper if it doesn't exist)

Steps:
1.  If it doesn't exist, create `lib/supabase/client.ts` to export a configured Supabase client instance (e.g., using `createBrowserClient` from `@supabase/ssr` or `createClientComponentClient` from `@supabase/auth-helpers-nextjs` - choose based on project setup).
2.  Create `actions/storage/upload-file-storage-action.ts`.
3.  Define an async function `uploadFileStorageAction` that accepts `bucketName: string`, `filePath: string`, and `file: File` as arguments and returns `Promise<ActionState<{ path: string }>>`.
4.  Mark the file with "use server".
5.  Inside the action:
    *   Import the Supabase client.
    *   Get the authenticated user's ID (e.g., using `auth()` from Clerk).
    *   Construct the full storage path, potentially including the userId (e.g., `${userId}/${filePath}`).
    *   Implement validation (file size, type) using constants.
    *   Call `supabase.storage.from(bucketName).upload(fullStoragePath, file, { upsert: false, contentType: file.type })`.
    *   Handle errors and return the appropriate `ActionState` (success with `{ path: data.path }` or failure).
6.  Adhere to project rules (`storage`, `backend`, `general`, `types`). Include error handling and logging.

Provide the complete code for `actions/storage/upload-file-storage-action.ts` and `lib/supabase/client.ts` (if created).
```

## 4. Enable Stripe Payments

```
Task: Create Stripe Webhook Handler

Goal: Set up the API route to receive and handle Stripe webhook events, specifically `checkout.session.completed`.

Assumptions:
*   Stripe account and API keys (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`) are set in `.env.local`.
*   `lib/stripe.ts` exists and exports an initialized Stripe client.
*   A database action (e.g., `updateUserSubscriptionAction(userId, stripeCustomerId, stripeSubscriptionId, status)`) exists to update user records.
*   Clerk is used for authentication and provides `userId`.

Files to Create/Modify:
*   `app/api/webhooks/stripe/route.ts` (Create)
*   `middleware.ts` (Modify to ensure public access)

Steps:
1.  Create `app/api/webhooks/stripe/route.ts`.
2.  Implement a `POST` handler function.
3.  Import `stripe` from `lib/stripe.ts` and `headers` from `next/headers`.
4.  Retrieve the `stripe-signature` header.
5.  Read the raw request body using `request.text()`.
6.  Retrieve the `STRIPE_WEBHOOK_SECRET` from environment variables.
7.  Use `stripe.webhooks.constructEvent` inside a try/catch block to verify the signature and parse the event.
8.  Handle verification errors (return 400).
9.  Use a `switch` statement on `event.type`.
10. Implement the case for `checkout.session.completed`:
    *   Extract the session object: `const session = event.data.object as Stripe.Checkout.Session;`
    *   Retrieve necessary data from the session (e.g., `session.metadata?.userId`, `session.customer`, `session.subscription`).
    *   Check if `userId` is present in metadata.
    *   Call your database action (e.g., `updateUserSubscriptionAction`) to link the Stripe customer/subscription to the user and set their status (e.g., 'active').
11. Implement cases for other relevant events (e.g., `customer.subscription.updated`, `customer.subscription.deleted`) to handle plan changes or cancellations, updating the user record accordingly.
12. Return `NextResponse.json({ received: true })` on success or appropriate error responses (e.g., 500 for internal errors).
13. In `middleware.ts`, ensure `/api/stripe/webhooks` is included in the `isPublicRoute` matcher.
14. Remind the user to configure the webhook endpoint in their Stripe dashboard.
15. Follow project rules (`backend`, `general`, `payments`). Ensure robust error handling and logging.

Provide the complete code for `app/api/webhooks/stripe/route.ts` and the necessary modification snippet for `middleware.ts`.
```

## 5. Enable PostHog Analytics

```
Task: Enable PostHog Analytics

Goal: Initialize PostHog, enable automatic pageview tracking, and identify authenticated users.

Assumptions:
*   PostHog keys (`NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`) are set in `.env.local`.
*   Clerk authentication is enabled.

Files to Modify:
*   `components/utilities/providers.tsx`
*   `app/layout.tsx`
*   (Potentially create `components/utilities/posthog-pageview.tsx` and `components/utilities/posthog-user-identify.tsx` if they don't exist)

Steps:
1.  If they don't exist, create minimal client components:
    *   `components/utilities/posthog-pageview.tsx`: Uses `usePathname` and `useSearchParams` from `next/navigation` and calls `posthog.capture("$pageview")` inside a `useEffect` hook that runs when the path changes.
    *   `components/utilities/posthog-user-identify.tsx`: Takes `userId` and potentially user properties as props. Calls `posthog.identify(userId, { ...userProperties })` in a `useEffect` hook.
2.  In `components/utilities/providers.tsx`:
    *   Import `posthog` from `posthog-js` and `PostHogProvider` from `posthog-js/react`.
    *   Uncomment or add the PostHog initialization logic (`posthog.init(...)`) inside a client-side check (`if (typeof window !== 'undefined')`). Ensure `capture_pageview: false` is set, as we'll handle it manually.
    *   Wrap the `NextThemesProvider` (or the main content) with `<PostHogProvider client={posthog}>`.
3.  In `app/layout.tsx`:
    *   Import `Suspense` from `react`.
    *   Import the `PostHogPageview` and `PostHogUserIdentify` components.
    *   Uncomment or add `<Suspense><PostHogPageview /></Suspense>` inside the `Providers` component.
    *   Fetch the `userId` using `auth()` from Clerk.
    *   Conditionally render `<PostHogUserIdentify userId={userId} />` only if `userId` exists, also inside `Providers`.
4.  Ensure components use `'use client'` where appropriate (`providers.tsx`, `posthog-pageview.tsx`, `posthog-user-identify.tsx`).
5.  Adhere to project rules (`frontend`, `analytics`, `general`).

Provide the complete code for the modified `components/utilities/providers.tsx`, `app/layout.tsx`, and the code for `posthog-pageview.tsx` and `posthog-user-identify.tsx` if created.
``` 