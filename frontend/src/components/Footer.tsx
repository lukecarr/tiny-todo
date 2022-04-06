import useSWR from 'swr'

import type { FunctionalComponent } from 'preact'
import Link from './Link'

const BuildInfo: FunctionalComponent = () => {
  const { data, error } = useSWR<{
    version?: string
    date: string
    commit?: string
  }>('/version')

  if (error) return null
  if (!data) return null

  return <div text="gray-700 sm right" font="mono">
    {data.version && <p>
      <Link href={`https://github.com/lukecarr/tiny-todo/releases/tag/${data.version}`} newTab>{data.version}</Link>
    </p>}
    <p text="xs">Built at: {data.date}</p>
    {data.commit && <p text="xs">
      <Link href={`https://github.com/lukecarr/tiny-todo/commit/${data.commit}`} newTab>{data.commit.slice(0, 7)}</Link>
    </p>}
  </div>
}

const Footer: FunctionalComponent = () => {
  return <footer border="gray-400 t-1" p="y-8">
    <div container="~" max-w="screen-md" flex="~" justify="between" items="center">
      <p>Made with ❤ by <Link href="https://github.com/lukecarr" newTab>Luke Carr</Link></p>
      <BuildInfo />
    </div>
  </footer>
}

export default Footer