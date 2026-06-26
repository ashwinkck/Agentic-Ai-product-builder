import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LandingPage from './components/LandingPage'
import Builder from './components/Builder'
import { Volume2, VolumeX } from 'lucide-react'

const floatingEmojisData = Array.from({ length: 35 }).map(() => ({
  emoji: ['✨', '🤖', '🚀', '💫', '👾', '🌟', '🛸', '💻', '⚡️', '🪐', '🔮', '🌌'][Math.floor(Math.random() * 12)],
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: 4 + Math.random() * 6,
  delay: Math.random() * 3,
  size: 1 + Math.random() * 1.5,
  moveX1: Math.random() * 80 - 40,
  moveX2: Math.random() * 80 - 40,
  moveY: -40 - Math.random() * 60
}));

function App() {
  const [isStarted, setIsStarted] = useState(false)
  const [isMuted, setIsMuted] = useState(true) 
  const [hasInteracted, setHasInteracted] = useState(false)

  const handleGlobalClick = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
      setIsMuted(false)
    }
  }

  const handleEnter = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
      setIsMuted(false)
    }
  }

  return (
    <div onClick={handleGlobalClick} style={{ width: '100%', height: '100%', minHeight: '100vh' }}>
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            onClick={handleEnter}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: '#050505',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              overflow: 'hidden'
            }}
          >
            {/* Lofi Background Elements */}
            <motion.div 
              animate={{ 
                x: [-20, 20, -20],
                y: [-20, 20, -20],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '40vw',
                height: '40vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)',
                top: '10%',
                left: '20%',
                filter: 'blur(40px)',
              }}
            />
            <motion.div 
              animate={{ 
                x: [20, -20, 20],
                y: [20, -20, 20],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '50vw',
                height: '50vw',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(138,43,226,0.12) 0%, transparent 70%)',
                bottom: '0%',
                right: '10%',
                filter: 'blur(60px)',
              }}
            />
            
            {/* Floating Emojis / Animations */}
            {floatingEmojisData.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.5],
                  y: [0, item.moveY / 2, item.moveY],
                  x: [0, item.moveX1, item.moveX2],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: item.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: item.delay
                }}
                style={{
                  position: 'absolute',
                  left: `${item.left}%`,
                  top: `${item.top}%`,
                  fontSize: `${item.size}rem`,
                  pointerEvents: 'none',
                  zIndex: 5,
                  filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
                }}
              >
                {item.emoji}
              </motion.div>
            ))}

            <motion.div
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="intro-text"
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: 'monospace',
                textShadow: '0 0 10px rgba(255,255,255,0.3)',
                zIndex: 10,
                textAlign: 'center',
                padding: '0 1rem'
              }}
            >
              CLICK ANYWHERE TO OPEN
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
        allow="autoplay; encrypted-media"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      ></iframe>

      {/* Dynamic Background Effects (Kept for fallback/extra glow) */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>
      <div className="ambient-glow glow-3"></div>

      {/* Global Mute Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation()
          setIsMuted(!isMuted)
        }}
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
    </div>
  )
}

export default App
