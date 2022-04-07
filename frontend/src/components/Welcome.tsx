import { useLocalStorage } from 'src/hooks/local-storage'

import type { FunctionalComponent } from 'preact'

const Welcome: FunctionalComponent = () => {
  const [hidden, setHidden] = useLocalStorage('hideWelcome', false)

  if (hidden) return null

  return <section m="b-8" p="y-6 x-3" space="y-4" border="gray-600 l-4" bg="gray-100">
    <h3 text="xl" font="bold">Welcome to tiny-todo!</h3>
    <p>tiny-todo is a powerful task-management tapp (tiny-app), built using Go and Preact.</p>
    <p font="semibold">To get started, create a new task below!</p>
    <button text="sm" font="semibold" underline="~ dotted hover:solid" onClick={() => setHidden(true)}>don't show again</button>
  </section>
}

export default Welcome