import { useState } from 'react'
import LandingPage from './components/LandingPage'
import Builder from './components/Builder'
import { Volume2, VolumeX } from 'lucide-react'

function App() {
  const [isStarted, setIsStarted] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

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
        src={`https://www.youtube.com/embed/fhL67fnDXcU?autoplay=1&controls=0&loop=1&playlist=fhL67fnDXcU${isMuted ? '&mute=1' : ''}`}
        title="YouTube audio background"
        frameBorder="0"
        allow="autoplay"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      ></iframe>

      {/* Dynamic Background Effects (Kept for fallback/extra glow) */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>
      <div className="ambient-glow glow-3"></div>

      {/* Global Mute Button */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 100,
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--neon-2)',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)'
        }}
        title={isMuted ? "Unmute Music" : "Mute Music"}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {!isStarted ? (
        <LandingPage onStart={() => setIsStarted(true)} />
      ) : (
        <Builder onBack={() => setIsStarted(false)} />
      )}
    </>
  )
}

export default App
