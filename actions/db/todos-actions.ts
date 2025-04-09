/*
<ai_context>
Contains server actions related to todos in the DB.
</ai_context>
*/

"use server"

// import { db } from "@/db/db"
// import { eq } from "drizzle-orm"
import {
  type InsertTodo,
  type SelectTodo,
  todosTable
} from "@/db/schema/todos-schema"
import type { ActionState } from "@/types"

export async function createTodoAction(
  todo: InsertTodo
): Promise<ActionState<SelectTodo>> {
  console.log("DB Action Disabled: createTodoAction")
  // Mock data - create a realistic-looking fake todo
  const mockTodo: SelectTodo = {
    ...todo,
    id: crypto.randomUUID(), // Use crypto for UUID
    userId: todo.userId || "mock-user-id", // Ensure userId exists
    completed: todo.completed || false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  return {
    isSuccess: true,
    message: "Mock: Todo created successfully",
    data: mockTodo
  }
  /*
  try {
    const [newTodo] = await db.insert(todosTable).values(todo).returning()
    return {
      isSuccess: true,
      message: "Todo created successfully",
      data: newTodo
    }
  } catch (error) {
    console.error("Error creating todo:", error)
    return { isSuccess: false, message: "Failed to create todo" }
  }
  */
}

export async function getTodosAction(
  userId: string
): Promise<ActionState<SelectTodo[]>> {
  console.log("DB Action Disabled: getTodosAction")
  return {
    isSuccess: true,
    message: "Mock: Todos retrieved successfully",
    data: [] // Return empty array
  }
  /*
  try {
    const todos = await db.query.todos.findMany({
      where: eq(todosTable.userId, userId)
    })
    return {
      isSuccess: true,
      message: "Todos retrieved successfully",
      data: todos
    }
  } catch (error) {
    console.error("Error getting todos:", error)
    return { isSuccess: false, message: "Failed to get todos" }
  }
  */
}

export async function updateTodoAction(
  id: string,
  data: Partial<InsertTodo>
): Promise<ActionState<SelectTodo>> {
  console.log("DB Action Disabled: updateTodoAction")
  // Mock data - needs original todo structure which we don't have here
  // Return a generic success or potentially fetch mock data if needed elsewhere
  // For simplicity, returning success without specific data
  const mockUpdatedTodo: SelectTodo = {
    id: id,
    userId: data.userId || "mock-user-id", // Need userId
    content: data.content || "Updated Content",
    completed: data.completed !== undefined ? data.completed : false,
    createdAt: new Date(), // Ideally fetch original, but mock for now
    updatedAt: new Date()
  }
  return {
    isSuccess: true,
    message: "Mock: Todo updated successfully",
    data: mockUpdatedTodo
  }
  /*
  try {
    const [updatedTodo] = await db
      .update(todosTable)
      .set(data)
      .where(eq(todosTable.id, id))
      .returning()

    return {
      isSuccess: true,
      message: "Todo updated successfully",
      data: updatedTodo
    }
  } catch (error) {
    console.error("Error updating todo:", error)
    return { isSuccess: false, message: "Failed to update todo" }
  }
  */
}

export async function deleteTodoAction(id: string): Promise<ActionState<void>> {
  console.log("DB Action Disabled: deleteTodoAction")
  return {
    isSuccess: true,
    message: "Mock: Todo deleted successfully",
    data: undefined
  }
  /*
  try {
    await db.delete(todosTable).where(eq(todosTable.id, id))
    return {
      isSuccess: true,
      message: "Todo deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting todo:", error)
    return { isSuccess: false, message: "Failed to delete todo" }
  }
  */
}
