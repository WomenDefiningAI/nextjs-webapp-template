/*
import { Webhook } from "svix"
// ... other imports ...

export async function POST(req: Request) {
  // ... entire function body commented out ...
}
*/

// Placeholder export to avoid build errors if file is imported elsewhere
export async function POST(req: Request) {
  console.log("Clerk webhook endpoint disabled.")
  return new Response("Webhook disabled", { status: 200 })
}
