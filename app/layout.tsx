/*
<ai_context>
The root server layout for the app.
</ai_context>
*/

import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/components/utilities/providers"
import { TailwindIndicator } from "@/components/utilities/tailwind-indicator"
import { cn } from "@/lib/utils"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import type { Metadata } from "next"
import type React from "react"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WebApp Template",
  description: "A full-stack web app template."
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  // const { userId } = await auth() // Get user ID on the server
  // const userId = null // Temporarily set userId to null

  // // Sync Clerk user with local profile DB if logged in but no profile exists
  // if (userId) {
  //   const profileResult = await getProfileByUserIdAction(userId)
  //   if (!profileResult.isSuccess || !profileResult.data) {
  //     // Assuming a webhook or similar process hasn't created it yet
  //     // Or handle potential race conditions/errors more robustly
  //     console.log(`Profile not found for userId: ${userId}, attempting creation.`)
  //     // Potential place to call createProfileAction if webhook failed or is delayed
  //     // await createProfileAction({ userId: userId /*, other defaults */ });
  //   }
  // }

  return (
    // <ClerkProvider> {/* Provides Clerk context */}
    <html lang="en" suppressHydrationWarning>
      {/* Add PostHogUserIdentify component INSIDE ClerkProvider but preferably outside Providers if it needs Clerk context directly */}
      {/* {userId && <PostHogUserIdentify userId={userId} />} */}
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          inter.className
        )}
      >
        <Providers>
          {" "}
          {/* Contains other providers like ThemeProvider */}
          {/* <Suspense> */}
          {/* <PostHogPageview /> */}
          {/* </Suspense> */}
          <Toaster />
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
    // </ClerkProvider>
  )
}
