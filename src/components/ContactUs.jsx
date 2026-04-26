import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaWhatsapp,
  FaTelegram,
  FaCheckCircle,
} from 'react-icons/fa'
import { services } from '../data/services'
import ScrollReveal from './ScrollReveal'

const contactDetails = [
  {
    icon: FaMapMarkerAlt,
    label: 'Address',
    value: '51/E Galle Road, Kamburugamuwa',
  },
  {
    icon: FaPhone,
    label: 'Phone',
    value: '077 274 4628',
  },
  {
    icon: FaPhone,
    label: 'Phone',
    value: '076 369 6592',
  },
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'immigrationconsulting@gmail.com',
  },
  {
    icon: FaClock,
    label: 'Hours',
    value: 'Mon–Sat: 8:00 AM – 6:00 PM',
  },
]

const ContactUs = ({ selectedService, setSelectedService }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const selectRef = useRef(null)

  // Sync selectedService prop → form state
  useEffect(() => {
    if (selectedService) {
      setForm((prev) => ({ ...prev, service: selectedService }))
    }
  }, [selectedService])

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Full name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email address'
    if (!form.service) errs.service = 'Please select a service'
    if (!form.message.trim()) errs.message = 'Message is required'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
    if (name === 'service' && setSelectedService) setSelectedService(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
    setForm({ name: '', email: '', phone: '', service: '', message: '' })
    if (setSelectedService) setSelectedService('')
    setTimeout(() => setSubmitted(false), 5000)
  }

  const inputClass = (field) =>
    `w-full font-body text-sm border rounded-xl px-4 py-3 outline-none transition-all duration-200 bg-gray-50 ${
      errors[field]
        ? 'border-red-400 focus:border-red-500'
        : 'border-gray-200 focus:border-accent focus:bg-white'
    }`

  return (
    <section id="contact" className="py-20 bg-lightbg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <ScrollReveal>
          <div className="flex items-start gap-4 mb-12">
            <div className="w-1 h-14 rounded-full bg-accent flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-heading font-bold text-4xl sm:text-5xl text-bodytext leading-tight">
                Get in Touch
              </h2>
              <p className="font-body text-muted mt-2">
                Our immigration experts are ready to assist you.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT — Contact Info */}
          <ScrollReveal delay={0.05}>
            <div className="space-y-6">
              {/* Contact details */}
              <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
                {contactDetails.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={16} color="#E8A020" />
                    </div>
                    <div>
                      <div className="font-body text-xs text-muted uppercase tracking-wide">
                        {item.label}
                      </div>
                      <div className="font-body text-sm font-medium text-bodytext mt-0.5">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp + Telegram buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://wa.me/94772744628"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 py-4 rounded-xl font-body font-semibold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <FaWhatsapp size={20} />
                  WhatsApp Us
                </a>
                <a
                  href="https://t.me/+94772744628"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 py-4 rounded-xl font-body font-semibold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: '#0088CC' }}
                >
                  <FaTelegram size={20} />
                  Telegram Us
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT — Form */}
          <ScrollReveal delay={0.1}>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-heading font-bold text-2xl text-bodytext mb-6">
                Send Us a Message
              </h3>

              {/* Success toast */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-6"
                  >
                    <FaCheckCircle size={18} color="#16a34a" />
                    <p className="font-body text-sm text-green-700">
                      Thank you! We'll contact you shortly via WhatsApp or phone.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Name */}
                <div>
                  <label className="font-body text-xs font-semibold text-muted uppercase tracking-wide mb-1.5 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={inputClass('name')}
                  />
                  {errors.name && (
                    <p className="font-body text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="font-body text-xs font-semibold text-muted uppercase tracking-wide mb-1.5 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={inputClass('email')}
                  />
                  {errors.email && (
                    <p className="font-body text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="font-body text-xs font-semibold text-muted uppercase tracking-wide mb-1.5 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 234 567 8900"
                    className={inputClass('phone')}
                  />
                </div>

                {/* Service dropdown */}
                <div>
                  <label className="font-body text-xs font-semibold text-muted uppercase tracking-wide mb-1.5 block">
                    Subject / Service Type *
                  </label>
                  <select
                    ref={selectRef}
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={inputClass('service') + ' cursor-pointer'}
                  >
                    <option value="">Select a service…</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="font-body text-xs text-red-500 mt-1">{errors.service}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="font-body text-xs font-semibold text-muted uppercase tracking-wide mb-1.5 block">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us how we can help you…"
                    className={inputClass('message') + ' resize-none'}
                  />
                  {errors.message && (
                    <p className="font-body text-xs text-red-500 mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-accent text-white font-body font-semibold rounded-xl hover:bg-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 mt-2"
                >
                  Send Message →
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
