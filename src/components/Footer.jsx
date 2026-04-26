import { FaFacebook, FaInstagram, FaWhatsapp, FaTelegram } from 'react-icons/fa'
import { services } from '../data/services'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Feedbacks', href: '#feedbacks' },
  { label: 'Contact Us', href: '#contact' },
]

const socialLinks = [
  { icon: FaFacebook, href: '#', label: 'Facebook' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  {
    icon: FaWhatsapp,
    href: 'https://wa.me/94772744628',
    label: 'WhatsApp',
  },
  {
    icon: FaTelegram,
    href: 'https://t.me/+94772744628',
    label: 'Telegram',
  },
]

const Footer = ({ onServiceSelect }) => {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleServiceClick = (serviceTitle) => {
    onServiceSelect(serviceTitle)
    setTimeout(() => {
      const el = document.querySelector('#contact')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <footer style={{ backgroundColor: '#0D1F3C' }} className="text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold text-white text-sm">
                ICS
              </div>
              <div>
                <div className="font-heading font-bold text-lg text-white leading-tight">
                  Immigration Consulting
                </div>
                <div className="text-accent text-xs font-body">Service</div>
              </div>
            </div>
            <p className="font-body text-white/60 text-sm leading-relaxed mb-6">
              Your trusted partner for all immigration needs in Sri Lanka.
              Professional, transparent, and affordable.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors duration-200"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="font-body font-bold text-sm uppercase tracking-widest text-accent mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-body text-sm text-white/60 hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h4 className="font-body font-bold text-sm uppercase tracking-widest text-accent mb-5">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => handleServiceClick(s.title)}
                    className="font-body text-sm text-white/60 hover:text-accent transition-colors duration-200 text-left"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row gap-2 justify-between items-center text-center">
          <p className="font-body text-white/40 text-xs">
            © 2025 Immigration Consulting Service. All rights reserved.
          </p>
          <p className="font-body text-white/30 text-xs">
            We are an independent immigration consulting agency. Not affiliated with any
            government department.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
