import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

export default function Builder({ onBack }) {
  const [idea, setIdea] = useState('')
  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!idea.trim()) return

    setIsLoading(true)
    setResult(null)
    setActiveTab('')

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:10000'
      const response = await fetch(`${apiUrl}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setResult(data.agent_outputs);
        setActiveTab('Product Strategist'); // Set default tab to the final agent
      } else {
        setResult({ error: `[ERROR] Backend Error: ${data.message}` });
        setActiveTab('error');
      }
    } catch (err) {
      setResult({ error: `[CONNECTION ERROR] Failed to connect to the CrewAI backend.\n\nEnsure your FastAPI server is running on ${import.meta.env.VITE_API_URL || 'http://localhost:10000'}!\n\nDetails: ${err.message}` });
      setActiveTab('error');
    } finally {
      setIsLoading(false)
    }
  }

  const agentThoughts = [
    "Market Oracle is analyzing market demand and finding your target audience...",
    "Feature Architect is blueprinting the core product features...",
    "Tech Stack Architect is evaluating the optimal technologies...",
    "Product Strategist is drafting the launch roadmap...",
    "Synthesizing final startup blueprint..."
  ];
  
  const [currentThought, setCurrentThought] = useState(0);

  // Cycle through thoughts while loading
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setCurrentThought(prev => (prev < agentThoughts.length - 1 ? prev + 1 : prev));
      }, 10000); // Change thought every 10 seconds
    } else {
      setCurrentThought(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div className="loading-spinner"></div>
                  <div className="thinking-text blur-in" key={currentThought}>
                    {agentThoughts[currentThought]}
                  </div>
                </div>
              ) : result?.error ? (
                <div style={{ whiteSpace: 'pre-wrap', textAlign: 'left', lineHeight: '1.6' }}>{result.error}</div>
              ) : (
                <div className="markdown-container">
                  <div className="agent-tabs">
                    {Object.keys(result).map((agentName) => (
                      <button 
                        key={agentName}
                        className={`tab-btn ${activeTab === agentName ? 'active' : ''}`}
                        onClick={() => setActiveTab(agentName)}
                      >
                        {agentName}
                      </button>
                    ))}
                  </div>
                  <div className="markdown-body">
                    <ReactMarkdown>{result[activeTab]}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </motion.main>
    </div>
  )
}
