import { useLocalStorage } from 'hooks/local-storage'

import type { FunctionalComponent } from 'preact'

const Welcome: FunctionalComponent = () => {
  const [hidden, setHidden] = useLocalStorage('hideWelcome', false)

  if (hidden) return null

  return <section class="mb-8 border-l-4 border-gray-600 p-2 pl-3 font-semibold bg-gray-100">
    <h3>Welcome to tiny-todo!</h3>
    <p>A simple todo app that's: tiny 🐜, lightweight 🔦🏋️‍♀️, and performant ⚡. Built using Go &amp; Preact!</p>
    <button class="text-sm font-semibold underline underline-dotted hover:underline-solid" onClick={() => setHidden(true)}>don't show again</button>
  </section>
}

export default Welcome