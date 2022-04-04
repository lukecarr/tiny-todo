import type { FunctionalComponent } from 'preact'
import Welcome from './Welcome'

const Header: FunctionalComponent = () => {
  return <header>
    <h1 class="font-extrabold text-3xl">tiny-todo</h1>
    <Welcome />
    <nav class="mt-4">
      <a href="/">todo</a>
      <span> &#9679; </span>
      <a href="/about">about</a>
    </nav>
  </header>
}

export default Header