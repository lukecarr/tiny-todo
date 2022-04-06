import { useLocalStorage } from 'hooks/local-storage'

import type { FunctionalComponent } from 'preact'

const Welcome: FunctionalComponent = () => {
  const [hidden, setHidden] = useLocalStorage('hideWelcome', false)

  if (hidden) return null

  return <section m="b-8" p="2 l-3" border="gray-600 l-4" font="semibold" bg="gray-100">
    <h3>Welcome to tiny-todo!</h3>
    <p>A simple todo app that's: tiny 🐜, lightweight 🔦🏋️‍♀️, and performant ⚡. Built using Go &amp; Preact!</p>
    <button text="sm" font="semibold" underline="~ dotted hover:solid" onClick={() => setHidden(true)}>don't show again</button>
  </section>
}

export default Welcome