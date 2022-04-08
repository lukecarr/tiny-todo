import { $fetch } from 'ohmyfetch'
import { z } from 'zod'

export type Task = {
  /**
   * The unique identifier of the task.
   */
  id: number
  
  /**
   * The task's name.
   */
  name: string

  /**
   * Whether the task is marked as complete (true) or not (false).
   */
  complete: boolean
}

export const TaskSchema = z.object({
  name: z.string().min(1, 'Task name cannot be empty!'),
})

export type TaskInput = z.infer<typeof TaskSchema>

/**
 * Creates a new task by sending a POST request to the `/api/tasks` endpoint.
 * 
 * @param task The new task to create. 
 * @returns The newly created task.
 */
export async function createTask(task: TaskInput): Promise<Task> {
  const body = TaskSchema.parse(task)

  const created = await $fetch<Task>('/api/tasks', {
    method: 'POST',
    body,
  })

  return created
}
