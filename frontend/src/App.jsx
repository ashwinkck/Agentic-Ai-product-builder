import { useState } from 'react'
import LandingPage from './components/LandingPage'
import Builder from './components/Builder'

function App() {
  const [isStarted, setIsStarted] = useState(false)

  if (!isStarted) {
    return <LandingPage onStart={() => setIsStarted(true)} />
  }

  return <Builder onBack={() => setIsStarted(false)} />
}

export default App
