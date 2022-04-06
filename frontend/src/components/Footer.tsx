import useSWR from 'swr'

import type { FunctionalComponent } from 'preact'
import Link from './Link'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const BuildInfo: FunctionalComponent = () => {
  const { data, error } = useSWR<{
    version?: string
    date: string
    commit?: string
  }>('/api/version', fetcher)

  if (error) return null
  if (!data) return null

  return <div class="text-gray-700 text-sm font-mono text-right">
    {data.version && <p>
      <Link href={`https://github.com/lukecarr/tiny-todo/releases/tag/${data.version}`} newTab>{data.version}</Link>
    </p>}
    <p class="text-xs">Built at: {data.date}</p>
    {data.commit && <p class="text-xs">
      <Link href={`https://github.com/lukecarr/tiny-todo/commit/${data.commit}`} newTab>{data.commit}</Link>
    </p>}
  </div>
}

const Footer: FunctionalComponent = () => {
  return <footer class="border-t-1 border-gray-400 py-8">
    <div class="container max-w-screen-md flex justify-between items-center">
      <p>Made with ❤ by <Link href="https://github.com/lukecarr" newTab>Luke Carr</Link></p>
      <BuildInfo />
    </div>
  </footer>
}

export default Footer