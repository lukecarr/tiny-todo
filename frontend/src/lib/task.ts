import { $fetch } from 'ohmyfetch'

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

/**
 * Creates a new task by sending a POST request to the `/api/tasks` endpoint.
 * 
 * @param input The new task to create. 
 * @returns The newly created task.
 */
export async function createTask({ name }: Omit<Task, 'id' | 'complete'>): Promise<Task> {
  const task = await $fetch<Task>('/api/tasks', {
    method: 'POST',
    body: {
      name,
    },
  })

  return task
}
