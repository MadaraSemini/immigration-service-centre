import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaTimes,
  FaCheckCircle,
  FaUpload,
  FaImage,
} from 'react-icons/fa'
import ReactCountryFlag from 'react-country-flag'
import { textFeedbacks, screenshotFeedbacks } from '../data/feedbacks'
import { services } from '../data/services'
import { countries } from '../data/countries'
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
        <div className="font-body font-semibold text-bodytext">{review.name}</div>
        <div className="flex gap-0.5 mt-0.5">
          {Array.from({ length: review.rating }).map((_, i) => (
            <FaStar key={i} size={12} color="#E8A020" />
          ))}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <ReactCountryFlag
            countryCode={review.countryCode}
            svg
            style={{ width: '1.1em', height: '1.1em', borderRadius: '2px' }}
          />
          <span className="font-body text-xs text-muted">{review.country}</span>
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
        <button
          onClick={prev}
          className="flex-shrink-0 w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors duration-200 shadow-md"
          aria-label="Previous"
        >
          <FaChevronLeft size={16} />
        </button>
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
        <button
          onClick={next}
          className="flex-shrink-0 w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors duration-200 shadow-md"
          aria-label="Next"
        >
          <FaChevronRight size={16} />
        </button>
      </div>
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
            <div className="relative bg-gradient-to-br from-primary to-dark min-h-[220px] flex items-center justify-center overflow-hidden">
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover absolute inset-0"
                onError={(e) => { e.target.style.display = 'none' }}
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
                  onError={(e) => { e.target.style.display = 'none' }}
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

/* ── Star Rating Picker ────────────────────────────────────────── */
const StarPicker = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none transition-transform duration-100 hover:scale-110"
          aria-label={`${star} star`}
        >
          <FaStar
            size={28}
            color={(hovered || value) >= star ? '#E8A020' : '#D1D5DB'}
          />
        </button>
      ))}
    </div>
  )
}

/* ── Country Select ────────────────────────────────────────────── */
const CountrySelect = ({ value, onChange, error }) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = countries.find((c) => c.code === value)
  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-3 font-body text-sm border rounded-xl px-4 py-3 bg-gray-50 text-left transition-all duration-200 ${
          error
            ? 'border-red-400'
            : open
            ? 'border-accent bg-white'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        {selected ? (
          <>
            <ReactCountryFlag
              countryCode={selected.code}
              svg
              style={{ width: '1.4em', height: '1.1em', borderRadius: '2px', flexShrink: 0 }}
            />
            <span className="text-bodytext flex-1">{selected.name}</span>
          </>
        ) : (
          <span className="text-gray-400 flex-1">Select your country…</span>
        )}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-muted flex-shrink-0"
        >
          <FaChevronDown size={11} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="country-dropdown"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden"
          >
            {/* Search */}
            <div className="p-2 border-b border-gray-100">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country…"
                autoFocus
                className="w-full font-body text-sm px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* List */}
            <div className="max-h-52 overflow-y-auto">
              {filtered.length > 0 ? (
                filtered.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => { onChange(c.code); setOpen(false); setSearch('') }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100 ${
                      value === c.code
                        ? 'bg-accent/10 text-accent'
                        : 'hover:bg-lightbg text-bodytext'
                    }`}
                  >
                    <ReactCountryFlag
                      countryCode={c.code}
                      svg
                      style={{ width: '1.4em', height: '1.1em', borderRadius: '2px', flexShrink: 0 }}
                    />
                    <span className="font-body text-sm">{c.name}</span>
                  </button>
                ))
              ) : (
                <p className="px-4 py-3 font-body text-sm text-muted">No countries found</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Feedback Form ─────────────────────────────────────────────── */
const FeedbackForm = () => {
  const fileInputRef = useRef(null)
  const [form, setForm] = useState({
    name: '',
    countryCode: '',
    service: '',
    rating: 0,
    message: '',
  })
  const [image, setImage] = useState(null)       // { file, preview }
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [dragging, setDragging] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Your name is required'
    if (!form.service) errs.service = 'Please select a service'
    if (!form.rating) errs.rating = 'Please select a rating'
    if (!form.message.trim()) errs.message = 'Please write your feedback'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleRating = (val) => {
    setForm((prev) => ({ ...prev, rating: val }))
    if (errors.rating) setErrors((prev) => ({ ...prev, rating: '' }))
  }

  const processFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const preview = URL.createObjectURL(file)
    setImage({ file, preview })
  }

  const handleFileChange = (e) => processFile(e.target.files[0])

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    processFile(e.dataTransfer.files[0])
  }

  const removeImage = () => {
    if (image?.preview) URL.revokeObjectURL(image.preview)
    setImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
    setForm({ name: '', countryCode: '', service: '', rating: 0, message: '' })
    removeImage()
    setTimeout(() => setSubmitted(false), 6000)
  }

  const inputClass = (field) =>
    `w-full font-body text-sm border rounded-xl px-4 py-3 outline-none transition-all duration-200 bg-gray-50 ${
      errors[field]
        ? 'border-red-400 focus:border-red-500'
        : 'border-gray-200 focus:border-accent focus:bg-white'
    }`

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8">
        <h3 className="font-heading font-bold text-2xl text-bodytext mb-2">
          Share Your Experience
        </h3>
        <p className="font-body text-muted text-sm mb-6">
          We'd love to hear how we helped you. Optionally attach a screenshot of your review.
        </p>

        {/* Success */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-4 mb-6"
            >
              <FaCheckCircle size={18} color="#16a34a" className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-body font-semibold text-sm text-green-700">
                  Thank you for your feedback!
                </p>
                <p className="font-body text-xs text-green-600 mt-0.5">
                  Your review helps others trust our services.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Name */}
          <div>
            <label className="font-body text-xs font-semibold text-muted uppercase tracking-wide mb-1.5 block">
              Your Name *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className={inputClass('name')}
            />
            {errors.name && <p className="font-body text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Country */}
          <div>
            <label className="font-body text-xs font-semibold text-muted uppercase tracking-wide mb-1.5 block">
              Your Country
            </label>
            <CountrySelect
              value={form.countryCode}
              onChange={(code) => setForm((prev) => ({ ...prev, countryCode: code }))}
            />
          </div>

          {/* Service */}
          <div>
            <label className="font-body text-xs font-semibold text-muted uppercase tracking-wide mb-1.5 block">
              Service Used *
            </label>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className={inputClass('service') + ' cursor-pointer'}
            >
              <option value="">Select the service…</option>
              {services.map((s) => (
                <option key={s.id} value={s.title}>{s.title}</option>
              ))}
            </select>
            {errors.service && (
              <p className="font-body text-xs text-red-500 mt-1">{errors.service}</p>
            )}
          </div>

          {/* Star Rating */}
          <div>
            <label className="font-body text-xs font-semibold text-muted uppercase tracking-wide mb-2 block">
              Your Rating *
            </label>
            <StarPicker value={form.rating} onChange={handleRating} />
            {errors.rating && (
              <p className="font-body text-xs text-red-500 mt-1">{errors.rating}</p>
            )}
          </div>

          {/* Feedback text */}
          <div>
            <label className="font-body text-xs font-semibold text-muted uppercase tracking-wide mb-1.5 block">
              Your Feedback *
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell others about your experience with our service…"
              className={inputClass('message') + ' resize-none'}
            />
            {errors.message && (
              <p className="font-body text-xs text-red-500 mt-1">{errors.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="font-body text-xs font-semibold text-muted uppercase tracking-wide mb-1.5 block">
              Attach Screenshot{' '}
              <span className="normal-case font-normal text-muted/70">(optional)</span>
            </label>

            {image ? (
              /* Preview */
              <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img
                  src={image.preview}
                  alt="Preview"
                  className="w-full max-h-52 object-contain"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow"
                  aria-label="Remove image"
                >
                  <FaTimes size={11} />
                </button>
                <div className="px-4 py-2 border-t border-gray-100 bg-white">
                  <p className="font-body text-xs text-muted truncate">{image.file.name}</p>
                </div>
              </div>
            ) : (
              /* Dropzone */
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl px-4 py-6 sm:py-8 cursor-pointer transition-all duration-200 ${
                  dragging
                    ? 'border-accent bg-accent/5'
                    : 'border-gray-200 bg-gray-50 hover:border-accent hover:bg-accent/5'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <FaImage size={20} color="#E8A020" />
                </div>
                <div className="text-center">
                  <p className="font-body text-sm font-medium text-bodytext">
                    Drop an image here or{' '}
                    <span className="text-accent underline">browse</span>
                  </p>
                  <p className="font-body text-xs text-muted mt-1">
                    PNG, JPG, WEBP — max 5 MB
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-accent text-white font-body font-semibold rounded-xl hover:bg-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 mt-2"
          >
            Submit Feedback →
          </button>
        </form>
      </div>
    </div>
  )
}

/* ── Main Section ──────────────────────────────────────────────── */
const Feedbacks = () => {
  const [activeTab, setActiveTab] = useState('text')

  const tabs = [
    { id: 'text', label: '⭐ Text Reviews' },
    { id: 'screenshots', label: '📸 Screenshot Reviews' },
    { id: 'submit', label: '✍️ Share Your Feedback' },
  ]

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
              Hear from those who've successfully navigated the immigration process with our help
            </p>
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-body font-semibold text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-lightbg text-muted hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
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
            {activeTab === 'text' && <TextReviews />}
            {activeTab === 'screenshots' && <ScreenshotReviews />}
            {activeTab === 'submit' && <FeedbackForm />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Feedbacks
