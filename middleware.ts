/*
<ai_context>
Contains middleware for protecting routes, checking user authentication, and redirecting as needed.
</ai_context>
*/

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// Define public routes (accessible without login)
// const isPublicRoute = createRouteMatcher([
//   "/",
//   "/about",
//   "/pricing",
//   "/contact",
//   "/login(.*)", // Matches /login and any sub-paths
//   "/signup(.*)", // Matches /signup and any sub-paths
//   "/api/stripe/webhooks", // Stripe webhook needs to be public
//   "/api/clerk/webhooks"  // Clerk webhook needs to be public
// ])

// // Commented out Clerk middleware logic
// // export default clerkMiddleware((auth, request) => {
// //   // Protect routes that are not public
// //   // if (!isPublicRoute(request)) {
// //   //   auth().protect() // Redirects to login if not authenticated
// //   // }
// // });

// Minimal default middleware export to satisfy Next.js requirement
export function middleware(request: NextRequest) {
  // Simply pass the request through without any checks
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all routes except static files and internal Next.js paths
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)"
  ]
}
