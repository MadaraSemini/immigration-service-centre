import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaArrowLeft,
  FaChevronDown,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { servicePages } from '../data/servicePages'
import { services } from '../data/services'

const FaqItem = ({ question, answer, isOpen, onToggle }) => (
  <div className="border border-gray-200 rounded-xl overflow-hidden">
    <button
      className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
      onClick={onToggle}
    >
      <span className="font-body font-semibold text-bodytext text-base pr-4">{question}</span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0 text-accent"
      >
        <FaChevronDown size={16} />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="faq-body"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-5 pt-1 bg-white border-t border-gray-100">
            <p className="font-body text-muted text-sm leading-relaxed">{answer}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

const ServicePage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)
  const [selectedService, setSelectedService] = useState('')

  const page = servicePages[slug]
  const service = services.find((s) => s.slug === slug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center bg-lightbg">
          <div className="text-center px-4">
            <h1 className="font-heading font-bold text-3xl text-bodytext mb-4">Page Not Found</h1>
            <p className="font-body text-muted mb-6">This service page does not exist.</p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-body font-semibold rounded-xl hover:bg-blue-900 transition-colors"
            >
              <FaArrowLeft size={14} /> Back to Home
            </button>
          </div>
        </div>
        <Footer onServiceSelect={() => {}} />
      </div>
    )
  }

  const handleToggleFaq = (i) => setOpenFaq(openFaq === i ? null : i)

  const scrollToContact = () => {
    navigate('/', { state: { scrollTo: '#contact' } })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Page Hero */}
      <section className="bg-primary pt-24 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white font-body text-sm mb-6 transition-colors duration-200"
          >
            <FaArrowLeft size={12} /> Back to Home
          </button>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white leading-tight mb-3">
            {page.heroTitle}
          </h1>
          <p className="font-body text-white/70 text-lg max-w-2xl">{page.heroSubtitle}</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-bodytext mb-2">
              {page.intro.heading}
            </h2>
            <p className="font-body text-accent italic text-lg mb-5">{page.intro.tagline}</p>
            {page.intro.paragraphs.map((p, i) => (
              <p key={i} className="font-body text-muted leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-16 bg-lightbg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-1 h-14 rounded-full bg-accent flex-shrink-0 mt-1" />
            <div>
              <p className="font-body text-accent text-sm font-semibold uppercase tracking-widest mb-1">
                {page.eligibility.title}
              </p>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-bodytext leading-tight">
                {page.eligibility.subtitle}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              {page.eligibility.intro.map((text, i) => (
                <p key={i} className="font-body text-muted leading-relaxed mb-4">
                  {text}
                </p>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-body font-bold text-base text-bodytext mb-4">
                {page.eligibility.listTitle}
              </h3>
              <ul className="space-y-3">
                {page.eligibility.list.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FaCheckCircle size={14} className="text-accent flex-shrink-0 mt-1" />
                    <span className="font-body text-sm text-bodytext">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Procedure */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-1 h-14 rounded-full bg-accent flex-shrink-0 mt-1" />
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-bodytext leading-tight">
              {page.procedure.title}
            </h2>
          </div>

          <p className="font-body text-muted mb-6">{page.procedure.intro}</p>

          {/* Main 3 steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {page.procedure.mainSteps.map((step, i) => (
              <div
                key={i}
                className="bg-lightbg rounded-2xl p-6 flex flex-col gap-3 border-t-4 border-accent"
              >
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-heading font-bold text-white text-lg flex-shrink-0">
                  {i + 1}
                </div>
                <p className="font-body text-sm text-bodytext leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          {/* Detailed steps */}
          <h3 className="font-body font-bold text-base text-bodytext mb-4">
            {page.procedure.detailTitle}
          </h3>
          <ol className="space-y-3 mb-6">
            {page.procedure.detailSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent/10 text-accent font-body font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="font-body text-sm text-muted leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>

          {/* Warning */}
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <FaExclamationTriangle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="font-body text-sm text-amber-800">{page.procedure.warning}</p>
          </div>
        </div>
      </section>

      {/* Documents + Fee — side by side */}
      <section className="py-16 bg-lightbg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Documents */}
            <div>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-1 h-12 rounded-full bg-accent flex-shrink-0 mt-0.5" />
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-bodytext leading-tight">
                  {page.documents.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {page.documents.list.map((doc, i) => (
                  <li key={i} className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
                    <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2" />
                    <span className="font-body text-sm text-bodytext">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fee + How to Apply */}
            <div className="flex flex-col gap-6">
              {/* Fee */}
              <div className="bg-primary rounded-2xl p-8 text-white">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-1 h-10 rounded-full bg-accent flex-shrink-0" />
                  <h2 className="font-heading font-bold text-2xl leading-tight">{page.fee.title}</h2>
                </div>
                <div className="font-heading font-bold text-3xl text-accent mb-2">
                  {page.fee.amount}
                </div>
                <p className="font-body text-white/60 text-sm">{page.fee.note}</p>
              </div>

              {/* How to Apply */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-1 h-10 rounded-full bg-accent flex-shrink-0" />
                  <h2 className="font-heading font-bold text-2xl text-bodytext leading-tight">
                    {page.howToApply.title}
                  </h2>
                </div>
                <p className="font-body text-muted text-sm mb-3">{page.howToApply.intro}</p>
                <ul className="space-y-2 mb-4">
                  {page.howToApply.options.map((opt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                      <span className="font-body text-sm text-bodytext">{opt}</span>
                    </li>
                  ))}
                </ul>
                {page.howToApply.description.map((line, i) => (
                  <p key={i} className="font-body text-sm text-muted leading-relaxed mb-2">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-1 h-14 rounded-full bg-accent flex-shrink-0 mt-1" />
            <div>
              <p className="font-body text-accent text-sm font-semibold uppercase tracking-widest mb-1">
                Common Questions
              </p>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-bodytext leading-tight">
                Frequently Asked Questions
              </h2>
            </div>
          </div>
          <div className="space-y-3">
            {page.faq.map((item, i) => (
              <FaqItem
                key={i}
                question={item.question}
                answer={item.answer}
                isOpen={openFaq === i}
                onToggle={() => handleToggleFaq(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="font-body text-white/70 mb-8 text-lg">
            Contact our expert consultants today — we're here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-body font-semibold rounded-xl hover:bg-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5"
            >
              Get Free Consultation →
            </button>
            <a
              href="tel:+94772744628"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-body font-semibold rounded-xl hover:border-white/70 transition-all duration-300"
            >
              <FaPhone size={14} /> Call Us Now
            </a>
          </div>
        </div>
      </section>

      <Footer onServiceSelect={setSelectedService} />
    </div>
  )
}

export default ServicePage
