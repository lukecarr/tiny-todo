import useSWR from 'swr'

import type { FunctionalComponent } from 'preact'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const Version: FunctionalComponent = () => {
  const { data, error } = useSWR<{
    version: string
  }>('/api/version', fetcher)

  if (error) return null
  if (!data?.version) return null

  const version = data.version.startsWith('v') ? data.version.slice(1) : data.version
  return <span class="ml-4 px-3 py-1 text-white bg-black text-base">{version}</span>
}


const Header: FunctionalComponent = () => {
  return <header class="border-b-1 border-gray-400 py-8">
    <div class="container max-w-screen-md">
      <h1 class="font-extrabold text-3xl flex items-center">👌 tiny-todo <Version /></h1>
      <nav class="mt-4">
        <a href="/">todo</a>
        <span> &#9679; </span>
        <a href="/about">about</a>
      </nav>
    </div>
  </header>
}

export default Header