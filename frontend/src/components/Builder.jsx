import { useState } from 'react'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Builder({ onBack }) {
  const [idea, setIdea] = useState('')
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!idea.trim()) return

    setIsLoading(true)
    setResult('')

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:10000'
      const response = await fetch(`${apiUrl}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setResult(data.result);
      } else {
        setResult(`[ERROR] Backend Error: ${data.message}`);
      }
    } catch (err) {
      setResult(`[CONNECTION ERROR] Failed to connect to the CrewAI backend.\n\nEnsure your FastAPI server is running on ${import.meta.env.VITE_API_URL || 'http://localhost:10000'}!\n\nDetails: ${err.message}`);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="builder-container">
      <nav className="builder-nav" style={{ border: 'none', background: 'transparent' }}>
        <button className="back-btn" onClick={onBack} title="Close Builder" style={{ marginLeft: 'auto', background: 'rgba(255, 255, 255, 0.1)', padding: '0.5rem', borderRadius: '50%' }}>
          <X size={24} />
        </button>
      </nav>

      <motion.main 
        className="builder-main"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <motion.h1 
          className="builder-title"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          LaunchPad AI Builder
        </motion.h1>
        <motion.div 
          className="container futuristic-border glass-panel"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="input-group">
            <label htmlFor="startup-idea">INITIALIZE SEQUENCE // ENTER STARTUP IDEA</label>
            <textarea 
              id="startup-idea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your project vision..."
            />
          </div>
          
          <button 
            className="action-btn"
            onClick={handleGenerate} 
            disabled={isLoading || !idea.trim()}
          >
            {isLoading ? 'PROCESSING...' : 'INITIALIZE AGENTS'}
          </button>

          {(isLoading || result) && (
            <div className="result-area">
              {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className="loading-spinner"></div>
                </div>
              ) : (
                <div style={{ whiteSpace: 'pre-wrap', textAlign: 'left', lineHeight: '1.6' }}>{result}</div>
              )}
            </div>
          )}
        </motion.div>
      </motion.main>
    </div>
  )
}
