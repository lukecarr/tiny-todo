import PreactRouter from 'preact-router'
import AsyncRoute from 'preact-async-route'
import Todos from 'src/routes/todos'

import type { FunctionalComponent } from 'preact'

const Router: FunctionalComponent = () => {
  return <PreactRouter>
    <Todos path="/" />
    <AsyncRoute
      path="/about"
      getComponent={() => import('../routes/about').then(module => module.default)}
    />
  </PreactRouter>
}

export default Router