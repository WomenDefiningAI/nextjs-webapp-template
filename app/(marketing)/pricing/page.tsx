/*
<ai_context>
This server page displays pricing options for the product, integrating Stripe payment links.
</ai_context>
*/

"use server"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { auth } from "@clerk/nextjs/server"

export default async function PricingPage() {
  // const { userId } = await auth()
  const userId = null // Set userId to null as auth is disabled

  return (
    <div className="container mx-auto py-12">
      <h1 className="mb-8 text-center text-3xl font-bold">Choose Your Plan</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <PricingCard
          title="Monthly Plan"
          price="$10"
          description="Billed monthly"
          buttonText="Subscribe Monthly"
          buttonLink="#" // Hardcode to #
          userId={userId}
        />
        <PricingCard
          title="Yearly Plan"
          price="$100"
          description="Billed annually"
          buttonText="Subscribe Yearly"
          buttonLink="#" // Hardcode to #
          userId={userId}
        />
      </div>
    </div>
  )
}

interface PricingCardProps {
  title: string
  price: string
  description: string
  buttonText: string
  buttonLink: string
  userId: string | null
}

function PricingCard({
  title,
  price,
  description,
  buttonText,
  buttonLink,
  userId
}: PricingCardProps) {
  // const finalButtonLink = userId
  //   ? `${buttonLink}?client_reference_id=${userId}`
  //   : buttonLink
  const finalButtonLink = "#" // Hardcode to #

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex grow items-center justify-center">
        <p className="text-4xl font-bold">{price}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">{buttonText}</Button>
      </CardFooter>
    </Card>
  )
}
