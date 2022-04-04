import type { FunctionalComponent } from 'preact'

const About: FunctionalComponent = () => {
  return (
    <>
      <ul>
        <li>REST API and HTTP server built using Go.</li>
        <ul>
          <li>HTTP framework: Fiber.</li>
          <li>SQL: jmoiron/sqlx + rubenv/sql-migrate.</li>
          <li>CLI framework: spf13/cobra.</li>
        </ul>
        <li>Frontend interface built using Preact.</li>
        <ul>
          <li>Fully typed with TypeScript.</li>
          <li>Routing: preact-router and preact-async-route.</li>
          <li>Powered by Vite (bundling for dist and dev server with HMR).</li>
        </ul>
      </ul>
    </>
  )
}

export default About
