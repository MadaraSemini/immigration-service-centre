import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'
import { textFeedbacks, screenshotFeedbacks } from '../data/feedbacks'
import ScrollReveal from './ScrollReveal'

/* ── Text Carousel ─────────────────────────────────────────────── */
const ReviewCard = ({ review }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4 h-full">
    <div className="flex items-center gap-3">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-body font-bold text-sm flex-shrink-0"
        style={{ backgroundColor: review.color }}
      >
        {review.initials}
      </div>
      <div>
        <div className="font-body font-semibold text-bodytext">
          {review.country} {review.name}
        </div>
        <div className="flex gap-0.5 mt-0.5">
          {Array.from({ length: review.rating }).map((_, i) => (
            <FaStar key={i} size={12} color="#E8A020" />
          ))}
        </div>
      </div>
    </div>
    <p className="font-body text-muted text-sm italic leading-relaxed flex-1">
      "{review.text}"
    </p>
    <div>
      <span className="inline-block bg-primary text-white text-xs font-body px-3 py-1 rounded-full">
        {review.service}
      </span>
    </div>
  </div>
)

const TextReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [direction, setDirection] = useState(1)
  const total = textFeedbacks.length

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const cardsPerPage = isMobile ? 1 : 3

  const next = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const getVisible = () => {
    const cards = []
    for (let i = 0; i < cardsPerPage; i++) {
      cards.push(textFeedbacks[(currentIndex + i) % total])
    }
    return cards
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="flex-shrink-0 w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors duration-200 shadow-md"
          aria-label="Previous"
        >
          <FaChevronLeft size={16} />
        </button>

        {/* Cards */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className={`grid gap-5 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}
            >
              {getVisible().map((review) => (
                <ReviewCard key={review.id + '-' + currentIndex} review={review} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="flex-shrink-0 w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors duration-200 shadow-md"
          aria-label="Next"
        >
          <FaChevronRight size={16} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1)
              setCurrentIndex(i)
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'bg-accent w-5' : 'bg-gray-300'
            }`}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Screenshot Reviews ────────────────────────────────────────── */
const ScreenshotReviews = () => {
  const [lightbox, setLightbox] = useState(null)

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {screenshotFeedbacks.map((item) => (
          <button
            key={item.id}
            onClick={() => setLightbox(item)}
            className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left w-full"
          >
            {/* Image or placeholder */}
            <div className="relative bg-gradient-to-br from-primary to-dark min-h-[220px] flex items-center justify-center overflow-hidden">
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover absolute inset-0"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
              <div className="text-white/60 font-body text-sm text-center px-4 z-10">
                <div className="text-4xl mb-2">📸</div>
                Client Feedback Screenshot
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            <div className="bg-white p-4">
              <p className="font-body text-sm text-muted">{item.caption}</p>
            </div>
          </button>
        ))}
      </div>

      <p className="text-center font-body text-muted text-sm mt-6 italic">
        + More reviews available on request
      </p>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-dark min-h-[300px] flex items-center justify-center">
                <img
                  src={lightbox.src}
                  alt={lightbox.caption}
                  className="max-w-full max-h-[80vh] object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
                <div className="absolute text-white/40 font-body text-sm">
                  Client Feedback Screenshot
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="font-body text-white/70 text-sm">{lightbox.caption}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xl hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <FaTimes size={16} color="#1A1A2E" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Main Section ──────────────────────────────────────────────── */
const Feedbacks = () => {
  const [activeTab, setActiveTab] = useState('text')

  return (
    <section id="feedbacks" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-bodytext">
              Client Success Stories
            </h2>
            <p className="font-body text-muted mt-4 max-w-xl mx-auto">
              Hear from those who've successfully navigated the immigration
              process with our help
            </p>
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveTab('text')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-body font-semibold text-sm transition-all duration-200 ${
                activeTab === 'text'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-lightbg text-muted hover:bg-gray-200'
              }`}
            >
              ⭐ Text Reviews
            </button>
            <button
              onClick={() => setActiveTab('screenshots')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-body font-semibold text-sm transition-all duration-200 ${
                activeTab === 'screenshots'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-lightbg text-muted hover:bg-gray-200'
              }`}
            >
              📸 Screenshot Reviews
            </button>
          </div>
        </ScrollReveal>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'text' ? <TextReviews /> : <ScreenshotReviews />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Feedbacks
