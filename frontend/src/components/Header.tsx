import type { FunctionalComponent } from 'preact'

const Header: FunctionalComponent = () => {
  return <header>
    <h1 class="font-extrabold text-3xl">tiny-todo</h1>
    <blockquote class="my-4 border-l-4 border-gray-600 pl-3 font-semibold">A simple todo app that's: tiny 🐜, lightweight 🔦🏋️‍♀️, and performant ⚡. Built using Go &amp; Preact!</blockquote>
    <nav>
      <a href="/">todo</a>
      <span> &#9679; </span>
      <a href="/about">about</a>
    </nav>
  </header>
}

export default Header