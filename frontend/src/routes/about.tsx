import useSWR from 'swr'
import { useEffect } from 'preact/hooks'

import type { FunctionalComponent } from 'preact'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const Version: FunctionalComponent = () => {
  const { data, error } = useSWR<{
    version: string
  }>('/api/version', fetcher)

  if (error) return <p>Failed to load tiny-todo version!</p>
  if (!data) return <p>Version: loading...</p>
  return <p>Version: {data.version}</p>
}

const About: FunctionalComponent = () => {
  useEffect(() => {
    document.title = 'about :: tiny-todo'
  }, [])

  return (
    <>
      <ul class="mb-8">
        <li class="font-bold">REST API and HTTP server built using Go:</li>
        <ul class="ml-8 mb-4">
          <li>HTTP framework: Fiber.</li>
          <li>SQL: jmoiron/sqlx, rubenv/sql-migrate, and modernc.org/sqlite.</li>
          <li>CLI framework: spf13/cobra.</li>
          <li>Logging: zerolog</li>
        </ul>
        <li class="font-bold">Frontend interface built using Preact:</li>
        <ul class="ml-8">
          <li>Fully typed with TypeScript.</li>
          <li>Routing: preact-router and preact-async-route.</li>
          <li>Powered by Vite (bundling for dist and dev server with HMR).</li>
          <li>Styled with WindiCSS.</li>
          <li>Data fetching and caching: swr and ohmyfetch</li>
          <li>Form handling: react-hook-form</li>
        </ul>
      </ul>
      
      <Version />
    </>
  )
}

export default About
