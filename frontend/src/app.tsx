import { $fetch, FetchOptions } from 'ohmyfetch'
import { SWRConfig } from 'swr'

import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import Router from 'src/components/Router'
import Welcome from 'src/components/Welcome'

import type { FunctionalComponent } from 'preact'

const Layout: FunctionalComponent = () => {
  return <div class="min-h-screen flex flex-col">
    <Header />
    <main class="container max-w-screen-md my-8 flex-1">
      <Welcome />
      <Router />
    </main>
    <Footer />
  </div>
}

const fetcher = (url: string, opts?: FetchOptions<'json'>) => $fetch(`/api${url}`, opts)

const App: FunctionalComponent = () => {
  return <SWRConfig value={{ fetcher }}>
    <Layout />
  </SWRConfig>
}

export default App
