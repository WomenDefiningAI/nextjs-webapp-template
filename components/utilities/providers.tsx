/*
<ai_context>
This client component provides the providers for the app.
</ai_context>
*/

"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
// import posthog from "posthog-js"
// import { PostHogProvider } from "posthog-js/react"

export const Providers = ({ children, ...props }: ThemeProviderProps) => {
  // Check if window is defined (ensures client-side execution)
  // if (typeof window !== "undefined") {
  //   // Initialize PostHog
  //   posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  //     api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  //     // Capture pageviews automatically, handled by PostHogPageview component instead
  //     capture_pageview: false
  //   })
  // }

  return (
    // <PostHogProvider client={posthog}>
    <NextThemesProvider {...props}>
      <TooltipProvider>{children}</TooltipProvider>
    </NextThemesProvider>
    // </PostHogProvider>
  )
}
