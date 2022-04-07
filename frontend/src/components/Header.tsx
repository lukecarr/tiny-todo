import Nav from 'src/components/Nav'

import type { FunctionalComponent } from 'preact'

const Header: FunctionalComponent = () => {
  return <header border="gray-400 b-1" p="y-8">
    <div container="~" max-w="screen-md">
      <h1 font="extrabold" text="3xl" flex="~" items="center" m="b-4">📋 tiny-todo</h1>
      <Nav />
    </div>
  </header>
}

export default Header