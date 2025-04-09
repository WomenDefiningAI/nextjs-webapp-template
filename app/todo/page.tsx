/*
<ai_context>
This server page retrieves user todos from the database and renders them in a list.
</ai_context>
*/

"use server"

import { getProfileByUserIdAction } from "@/actions/db/profiles-actions"
import { getTodosAction } from "@/actions/db/todos-actions"
import { TodoList } from "@/app/todo/_components/todo-list"
// import { auth } from "@clerk/nextjs/server" // Import auth helper
import { redirect } from "next/navigation"

export default async function TodoPage() {
  // const { userId } = await auth() // Get userId
  const userId = "mock-user-id" // Provide a mock user ID

  // if (!userId) { // Redirect if not logged in (though middleware should also catch this)
  //   return redirect("/login")
  // }

  // Fetch profile using userId - This action needs modification too
  const { data: profile } = await getProfileByUserIdAction(userId)

  // Remove profile checks as DB is disabled
  // if (!profile) {
  //   // Handle case where user exists in Clerk but not local DB
  //   // Could redirect to signup/onboarding or wait for webhook sync
  //   return redirect("/signup") // Or a dedicated setup page
  // }

  // if (profile.membership === "free") { // Example check using profile data
  //   return redirect("/pricing")
  // }

  // Fetch todos using userId - This action also needs modification
  const todos = await getTodosAction(userId)

  return (
    <div className="flex-1 p-4 pt-0">
      <TodoList userId={userId} initialTodos={todos.data ?? []} />
    </div>
  )
}
