import { useEffect } from 'preact/hooks'

import type { FunctionalComponent } from 'preact'

const About: FunctionalComponent = () => {
  useEffect(() => {
    document.title = 'about :: tiny-todo'
  }, [])

  return (
    <>
      <ul>
        <li class="font-bold">REST API and HTTP server built using Go:</li>
        <ul class="ml-8 mb-4">
          <li>HTTP framework: Fiber.</li>
          <li>SQL: jmoiron/sqlx + rubenv/sql-migrate.</li>
          <li>CLI framework: spf13/cobra.</li>
        </ul>
        <li class="font-bold">Frontend interface built using Preact:</li>
        <ul class="ml-8">
          <li>Fully typed with TypeScript.</li>
          <li>Routing: preact-router and preact-async-route.</li>
          <li>Powered by Vite (bundling for dist and dev server with HMR).</li>
          <li>Styled with WindiCSS.</li>
        </ul>
      </ul>
    </>
  )
}

export default About
