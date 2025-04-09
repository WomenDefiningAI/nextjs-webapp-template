"use server"

// import { HeroSection } from "@/components/landing/hero"
import { FeaturesSection } from "@/components/landing/features"
import { Suspense } from "react"

export default async function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center px-8 pt-20 text-center">
      <h1 className="mb-8 text-4xl font-bold">Awesome WebApp In Development</h1>

      <div className="mb-8 w-full max-w-screen-md overflow-hidden rounded-lg border shadow-lg">
        <img
          // src="hero.png"
          src="wdai-hero.png"
          // alt="WebApp Placeholder"
          alt="Women Defining AI Hero"
          width={1920} // Maintain aspect ratio
          height={1080}
          className="w-full object-cover"
        />
      </div>

      <p className="max-w-xl text-balance text-lg text-muted-foreground">
        A pre-built webapp template for{" "}
        <a
          href="https://www.womendefiningai.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary"
        >
          Women Defining AI
        </a>{" "}
        vibecoding intro, edited from the{" "}
        <a
          href="https://github.com/mckaywrigley/mckays-app-template"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary"
        >
          McKay App Template
        </a>
        . This template hides boilerplate integrations while we build out
        functionality & also uses boime checks instead of prettier for format
        and linting.
      </p>

      {/* Keep features section for now, or remove if not needed */}
      <Suspense>
        <FeaturesSection />
      </Suspense>

      {/* <HeroSection /> */}
    </div>
  )
}
