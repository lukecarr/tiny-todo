import Header from './components/Header'
import Router from './components/Router'

export function App() {
  return (
    <div class="container max-w-screen-md min-h-screen py-8">
      <Header />
      <main class="mt-8">
        <Router />
      </main>
    </div>
  )
}
