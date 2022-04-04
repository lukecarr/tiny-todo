import Header from 'src/components/Header'
import Router from 'src/components/Router'
import Welcome from 'src/components/Welcome'

export function App() {
  return (
    <div class="min-h-screen">
      <Header />
      <main class="container max-w-screen-md my-8">
        <Welcome />
        <Router />
      </main>
    </div>
  )
}
