import { useEffect } from 'preact/hooks'
import { SubmitHandler, useForm } from 'react-hook-form'
import useSWR, { mutate } from 'swr'

import { createTask, Task } from 'src/lib/task'

import type { FunctionalComponent } from 'preact'

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

const SubmitBtn: FunctionalComponent = () => <input
    bg="gray-700 hover:black"
    text="white"
    p="x-3 y-1"
    font="bold"
    cursor="pointer"
    rounded="sm"
    type="submit"
    value="Create task"
  />

const NewTask: FunctionalComponent = () => {
  const { register, handleSubmit, reset } = useForm<NewTaskInputs>()
  
  /**
   * Attempts to create a new task, and then mutates the SWR cache and resets
   * the form inputs.
   * 
   * @param task The new task to create.
   */
  const create: SubmitHandler<NewTaskInputs> = async ({ name }) => {
    try {
      await createTask({ name })
      mutate('/tasks')
      reset()
    } catch (err) {
      // TODO: better error handling (UI toasts/alerts?)
      console.error(err)
    }
  }

  return <form onSubmit={handleSubmit(create)} class="mb-8 space-y-4">
    <input
      block="~"
      border="gray-200 focus:gray-400 1"
      w="full"
      p="x-4 y-2"
      rounded="sm"
      outline="focus:none"
      placeholder="Use tiny-todo everyday!"
      {...register('name', { required: true })}
    />
    <SubmitBtn />
  </form>
}

const Todos: FunctionalComponent = () => {
  useEffect(() => {
    document.title = 'tiny-todo'
  }, [])
  
  return <>
    <NewTask />
    <Tasks />
  </>
}

export default Todos
