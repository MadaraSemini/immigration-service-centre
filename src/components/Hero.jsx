import { motion } from 'framer-motion'

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const words = ['Navigate', 'Your', 'Immigration', 'Journey', 'With', 'Confidence']

  const stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '1000+', label: 'Clients Served' },
    { value: '98%', label: 'Success Rate' },
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grain-overlay"
      style={{
        background:
          'linear-gradient(135deg, #0D1F3C 0%, #1B3A6B 60%, #0D1F3C 100%)',
      }}
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(13, 31, 60, 0.80)' }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center pt-40">
        {/* Headline */}
        <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6">
          {['Navigate Your', 'Immigration Journey', 'With Confidence'].map(
            (line, lineIndex) => (
              <span key={lineIndex} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.4 + lineIndex * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {lineIndex === 1 ? (
                    <span>
                      Immigration{' '}
                      <span className="text-accent">Journey</span>
                    </span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            )
          )}
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="font-body text-white/75 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          With over 10 years of experience, we help individuals and families
          with visa extensions and immigration services — fast, affordable, and
          transparent.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo('#services')}
            className="px-8 py-4 bg-accent text-white font-body font-semibold rounded-xl hover:bg-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-1"
          >
            Explore Our Services
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="px-8 py-4 bg-transparent border-2 border-white/60 text-white font-body font-semibold rounded-xl hover:border-accent hover:text-accent transition-all duration-300 hover:-translate-y-1"
          >
            Contact Us Today
          </button>
        </motion.div>
      </div>

      {/* Stats Strip */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="relative z-10 w-full mt-8"
      >
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-3 gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-heading font-bold text-3xl sm:text-4xl text-accent">
                  {stat.value}
                </div>
                <div className="font-body text-white/75 text-xs sm:text-sm mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
