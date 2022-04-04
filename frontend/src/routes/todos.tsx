import { useEffect } from 'preact/hooks'

import type { FunctionalComponent } from 'preact'

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
