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

    // Mock API call for now
    setTimeout(() => {
      setResult(`🚀 [SYSTEM: CONNECTED]
Analyzing Startup Idea: "${idea}"...
Agent 1: Market Analyst has finished scanning the web.
Agent 2: Product Manager has structured the feature list.
Agent 3: Tech Lead has outlined the stack.

--- PRODUCT PLAN ---
This is a mock response while we wait for the backend to be connected.
Your idea looks solid and the agents are ready to build the actual plan!
      `)
      setIsLoading(false)
    }, 2000)
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
                <div>{result}</div>
              )}
            </div>
          )}
        </motion.div>
      </motion.main>
    </div>
  )
}
