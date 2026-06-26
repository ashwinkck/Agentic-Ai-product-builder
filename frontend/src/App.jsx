import { useState } from 'react'

function App() {
  const [idea, setIdea] = useState('')
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!idea.trim()) return

    setIsLoading(true)
    setResult('')

    // Mock API call for now, since we haven't connected the backend yet
    setTimeout(() => {
      setResult(`🚀 [SYSTEM: CONNECTED]
Analyzing Startup Idea: "${idea}"...
Agent 1: Market Analyst has finished scanning the web.
Agent 2: Product Manager has structured the feature list.
Agent 3: Tech Lead has outlined the stack.

--- PRODUCT PLAN ---
This is a mock response while we wait for the backend to be connected.
Your idea looks solid and the agents are ready to build the actual plan once the API is hooked up!
      `)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <>
      <h1>Agentic AI Builder</h1>
      <div className="container futuristic-border">
        <div className="input-group">
          <label htmlFor="startup-idea">INITIALIZE SEQUENCE // ENTER STARTUP IDEA</label>
          <textarea 
            id="startup-idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g. A neon-themed web platform for AI agents..."
          />
        </div>
        
        <button 
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
      </div>
    </>
  )
}

export default App
