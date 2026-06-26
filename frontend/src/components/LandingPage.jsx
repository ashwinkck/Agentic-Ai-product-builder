import { motion } from 'framer-motion'
import { ArrowRight, Bot, Cpu, Zap, Activity } from 'lucide-react'

export default function LandingPage({ onStart }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  }

  return (
    <div className="landing-wrapper">
      {/* Dynamic Background Effects */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>
      <div className="ambient-glow glow-3"></div>

      <nav className="top-nav">
        <div className="nav-logo">
          <Activity className="text-emerald" size={28} />
          <span className="font-bold">AGENTIC.AI</span>
        </div>
        <button className="launch-app-btn" onClick={onStart}>
          Launch App
        </button>
      </nav>

      <main className="landing-main">
        {/* Hero Section */}
        <section className="hero-section">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={containerVariants}
            className="hero-content"
          >
            <motion.div variants={itemVariants} className="badge">
              <span className="live-dot"></span> System Online
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="hero-title">
              AI Agentic<br/>
              <span className="text-gradient">Product Builder</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="hero-subtitle">
              Deploy a swarm of autonomous AI agents to research, design, and plan your next big startup idea in seconds. Powered by advanced multi-agent architecture.
            </motion.p>
            
            <motion.div variants={itemVariants} className="hero-cta-group">
              <button className="primary-btn" onClick={onStart}>
                Initialize System <ArrowRight size={20} />
              </button>
              <button className="secondary-btn">
                Read Documentation
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hero-graphic"
          >
            <div className="abstract-sphere">
               <div className="orbiting-dot dot-1"></div>
               <div className="orbiting-dot dot-2"></div>
               <div className="orbiting-dot dot-3"></div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="section-header"
          >
            <h2>The Protocol Engine</h2>
            <p>A specialized crew of intelligent agents working in parallel.</p>
          </motion.div>

          <div className="features-grid">
            {[
              { icon: <Bot size={32}/>, title: 'Market Analyst', desc: 'Scours the web in real-time to analyze competitors, target audience, and market trends.' },
              { icon: <Cpu size={32}/>, title: 'Tech Lead', desc: 'Architects the optimal tech stack and infrastructure for high scalability and performance.' },
              { icon: <Zap size={32}/>, title: 'Product Manager', desc: 'Synthesizes findings into actionable features, user stories, and a concrete roadmap.' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="feature-card glass-panel"
                whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0, 255, 170, 0.2)' }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
