import Header from 'src/components/Header'
import Router from 'src/components/Router'
import Welcome from 'src/components/Welcome'
import Footer from './components/Footer'

export function App() {
  return (
    <div class="min-h-screen flex flex-col">
      <Header />
      <main class="container max-w-screen-md my-8 flex-1">
        <Welcome />
        <Router />
      </main>
      <Footer />
    </div>
  )
}
