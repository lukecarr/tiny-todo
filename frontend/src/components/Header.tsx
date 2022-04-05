import type { FunctionalComponent } from 'preact'

const Header: FunctionalComponent = () => {
  return <header class="border-b-1 border-gray-400 py-8">
    <div class="container max-w-screen-md">
      <h1 class="font-extrabold text-3xl flex items-center">👌 tiny-todo</h1>
      <nav class="mt-4">
        <a href="/">todo</a>
        <span> &#9679; </span>
        <a href="/about">about</a>
      </nav>
    </div>
  </header>
}

export default Header