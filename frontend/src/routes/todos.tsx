import { $fetch } from 'ohmyfetch'
import { useEffect } from 'preact/hooks'
import { SubmitHandler, useForm } from 'react-hook-form'
import useSWR, { mutate } from 'swr'

import type { FunctionalComponent } from 'preact'

type Task = {
  id: number
  name: string
  complete: boolean
}

const Tasks: FunctionalComponent = () => {
  const { data, error } = useSWR<{ tasks: Task[] }>('/tasks')

  if (error) return <p>Failed to load tasks!</p>
  if (!data?.tasks) return <p>Loading tasks...</p>

  return <ul>
    {data.tasks.map((task) => <li key={task.id}>{task.id}: {task.name} {task.complete ? '✅' : '❌'}</li>)}
  </ul>
}

type NewTaskInputs = {
  name: string
}

const NewTask: FunctionalComponent = () => {
  const { register, handleSubmit, reset } = useForm<NewTaskInputs>()
  const create: SubmitHandler<NewTaskInputs> = async ({ name }) => {
    await $fetch('/api/tasks', {
      method: 'POST',
      body: {
        name,
      },
    })

    mutate('/tasks')
    reset()
  }

  return <form onSubmit={handleSubmit(create)} class="mb-8 space-y-4">
    <input
      class="block border-gray-200 border-1 w-full px-4 py-2 rounded-sm focus:border-gray-400 focus:outline-none"
      placeholder="Use tiny-todo everyday!"
      {...register('name', { required: true })}
    />
    <input class="bg-gray-700 text-white px-3 py-1 font-bold hover:bg-black cursor-pointer rounded-sm" type="submit" value="Create task" />
  </form>
}

const Todos: FunctionalComponent = () => {
  useEffect(() => {
    document.title = 'tiny-todo'
  }, [])
  
  return (
    <>
      <NewTask />
      <Tasks />
    </>
  )
}

export default Todos
