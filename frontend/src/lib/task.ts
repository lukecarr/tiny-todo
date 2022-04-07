import { $fetch } from 'ohmyfetch'

export type Task = {
  id: number
  name: string
  complete: boolean
}

export async function createTask({ name }: Omit<Task, 'id' | 'complete'>): Promise<Task> {
  const task = await $fetch<Task>('/api/tasks', {
    method: 'POST',
    body: {
      name,
    },
  })

  return task
}
