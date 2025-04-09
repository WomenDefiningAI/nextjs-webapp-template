/*
<ai_context>
Contains the Stripe configuration for the app.
</ai_context>
*/

import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY environment variable is not set")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
  appInfo: {
    name: "Mckay's App Template",
    version: "0.1.0"
  }
})
