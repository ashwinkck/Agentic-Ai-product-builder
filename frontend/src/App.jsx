import { useState } from 'react'
import LandingPage from './components/LandingPage'
import Builder from './components/Builder'

function App() {
  const [isStarted, setIsStarted] = useState(false)

  return (
    <>
      {/* Dynamic Video Background (Visuals) */}
      <div className="video-background-container">
        <video
          className="video-background"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/wallpaper.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Hidden YouTube Audio Player */}
      <iframe
        width="1"
        height="1"
        src="https://www.youtube.com/embed/fhL67fnDXcU?autoplay=1&controls=0&loop=1&playlist=fhL67fnDXcU"
        title="YouTube audio background"
        frameBorder="0"
        allow="autoplay"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      ></iframe>

      {/* Dynamic Background Effects (Kept for fallback/extra glow) */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>
      <div className="ambient-glow glow-3"></div>

      {!isStarted ? (
        <LandingPage onStart={() => setIsStarted(true)} />
      ) : (
        <Builder onBack={() => setIsStarted(false)} />
      )}
    </>
  )
}

export default App
