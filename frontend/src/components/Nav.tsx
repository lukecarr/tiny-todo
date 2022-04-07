import Link from 'src/components/Link'

import type { FunctionalComponent } from 'preact'

const Nav: FunctionalComponent = () => {
  return <nav>
    <Link href="/">todo</Link>
    <span> &#9679; </span>
    <Link href="/about">about</Link>
  </nav>
}

export default Nav