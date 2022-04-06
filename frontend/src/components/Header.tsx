import type { FunctionalComponent } from 'preact'

const Header: FunctionalComponent = () => {
  return <header border="gray-400 b-1" p="y-8">
    <div container="~" max-w="screen-md">
      <h1 font="extrabold" text="3xl" flex="~" items="center">👌 tiny-todo</h1>
      <nav m="t-4">
        <a href="/">todo</a>
        <span> &#9679; </span>
        <a href="/about">about</a>
      </nav>
    </div>
  </header>
}

export default Header