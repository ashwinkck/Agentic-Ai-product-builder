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



      <main className="landing-main">
        {/* Hero Section */}
        <section className="hero-section">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="hero-content"
          >


            <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem', width: '100%' }}>
              <motion.div 
                animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ color: 'var(--neon-2)' }}
              >
                <Bot size={64} />
              </motion.div>
              
              <h1 className="hero-title" style={{ margin: 0 }}>
                <span className="text-gradient">LaunchPad AI</span>
              </h1>

              <motion.div 
                animate={{ y: [0, -20, 0], rotate: [0, -10, 10, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{ color: 'var(--neon-blue)' }}
              >
                <Bot size={64} />
              </motion.div>
            </motion.div>

            <motion.p variants={itemVariants} className="hero-subtitle">
              Leverage a specialized crew of AI agents—a Market Oracle, Feature Architect, Tech Stack Architect, and Product Strategist—equipped with a RAG startup knowledge base to instantly validate, design, and plan your startup idea.
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
              { icon: <Activity size={32} />, title: 'Market Oracle', desc: 'A legendary venture analyst who understands market demand and startup trends.' },
              { icon: <Bot size={32} />, title: 'Feature Architect', desc: 'A product designer who turns abstract ideas into real, actionable product features.' },
              { icon: <Cpu size={32} />, title: 'Tech Architect', desc: 'A senior software architect who recommends the optimal modern tech stack.' },
              { icon: <Zap size={32} />, title: 'Product Strategist', desc: 'An experienced startup founder who creates a complete product launch roadmap.' }
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
