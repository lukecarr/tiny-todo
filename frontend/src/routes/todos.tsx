import type { FunctionalComponent } from 'preact'
import { useEffect } from 'preact/hooks'

const Todos: FunctionalComponent = () => {
  useEffect(() => {
    document.title = 'tiny-todo'
  }, [])
  
  return (
    <>
      <p>You have no tasks left todo!</p>
    </>
  )
}

export default Todos
