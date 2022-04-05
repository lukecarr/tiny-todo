import { $fetch } from 'ohmyfetch'
import { useEffect } from 'preact/hooks'
import { SubmitHandler, useForm } from 'react-hook-form'
import useSWR, { mutate } from 'swr'

import type { FunctionalComponent } from 'preact'

const fetcher = (url: string) => fetch(url).then(r => r.json())

type Task = {
  id: number
  name: string
  complete: boolean
}

const Tasks: FunctionalComponent = () => {
  const { data, error } = useSWR<{ tasks: Task[] }>('/api/tasks', fetcher)

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

    mutate('/api/tasks')
    reset()
  }

  return <form onSubmit={handleSubmit(create)} class="mb-8">
    <input placeholder="Use tiny-todo everyday!" {...register('name', { required: true })} />
    <input type="submit" value="Create task" />
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
