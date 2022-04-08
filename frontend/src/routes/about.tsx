import { useEffect } from 'preact/hooks'

import type { FunctionalComponent } from 'preact'

const About: FunctionalComponent = () => {
  useEffect(() => {
    document.title = 'about :: tiny-todo'
  }, [])

  return (
    <>
      <ul m="b-8">
        <li font="bold">REST API and HTTP server built using Go:</li>
        <ul m="l-8 b-4">
          <li>HTTP framework: Fiber.</li>
          <li>SQL: jmoiron/sqlx, rubenv/sql-migrate, and modernc.org/sqlite.</li>
          <li>CLI framework: spf13/cobra.</li>
          <li>Logging: zerolog</li>
        </ul>
        <li font="bold">Frontend interface built using Preact:</li>
        <ul m="l-8">
          <li>Fully typed with TypeScript.</li>
          <li>Routing: preact-router and preact-async-route.</li>
          <li>Powered by Vite (bundling for dist and dev server with HMR).</li>
          <li>Styled with WindiCSS.</li>
          <li>Data fetching and caching: swr and ohmyfetch</li>
          <li>Form handling: react-hook-form</li>
          <li>Validation: zod</li>
        </ul>
      </ul>
    </>
  )
}

export default About
