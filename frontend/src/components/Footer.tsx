import useSWR from 'swr'

import type { FunctionalComponent } from 'preact'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const BuildInfo: FunctionalComponent = () => {
  const { data, error } = useSWR<{
    version: string
    date: string
    commit: string
  }>('/api/version', fetcher)

  if (error) return null
  if (!data) return null

  return <div class="text-gray-700 text-sm font-mono text-right">
    {data.version !== 'undefined' && <p>
      <a
        class="font-semibold underline underline-dotted hover:underline-solid"
        href={`https://github.com/lukecarr/tiny-todo/releases/tag/${data.version}`}
        target="_blank"
        rel="noopener"
      >
        {data.version}
      </a>
    </p>}
    <p class="text-xs">Built at: {data.date}</p>
    {data.commit !== 'undefined' && <p class="text-xs">
      <a
        class="font-semibold underline underline-dotted hover:underline-solid"
        href={`https://github.com/lukecarr/tiny-todo/commit/${data.commit}`}
        target="_blank"
        rel="noopener"
      >
        Commit: {data.commit.slice(0, 7)}
      </a>
    </p>}
  </div>
}

const Footer: FunctionalComponent = () => {
  return <footer class="border-t-1 border-gray-400 py-8">
    <div class="container max-w-screen-md flex justify-between items-center">
      <p>Made with ❤ by <a class="font-semibold underline underline-dotted hover:underline-solid" href="https://github.com/lukecarr" target="_blank" rel="noopener">Luke Carr</a></p>
      <BuildInfo />
    </div>
  </footer>
}

export default Footer