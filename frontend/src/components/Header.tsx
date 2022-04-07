import type { FunctionalComponent } from 'preact'
import Link from './Link'

const Header: FunctionalComponent = () => {
  return <header border="gray-400 b-1" p="y-8">
    <div container="~" max-w="screen-md">
      <h1 font="extrabold" text="3xl" flex="~" items="center">👌 tiny-todo</h1>
      <nav m="t-4">
        <Link href="/">todo</Link>
        <span> &#9679; </span>
        <Link href="/about">about</Link>
      </nav>
    </div>
  </header>
}

export default Header