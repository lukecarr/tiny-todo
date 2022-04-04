import Router from 'preact-router'
import AsyncRoute from 'preact-async-route'
import Todos from './routes/todos'

export function App() {
  return (
    <>
      <h1>tiny-todo</h1>
      <blockquote>A simple todo app that's: tiny 🐜, lightweight 🔦🏋️‍♀️, and performant ⚡. Built using Go &amp; Preact!</blockquote>
      <nav>
        <a href="/">todo</a>
        <span> &#9679; </span>
        <a href="/about">about</a>
      </nav>
      <Router>
        <Todos path="/" />
        <AsyncRoute
          path="/about"
          getComponent={() => import('./routes/about').then(module => module.default)}
        />
      </Router>
    </>
  )
}
