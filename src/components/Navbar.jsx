import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { RiMenuLine, RiCloseLine } from 'react-icons/ri'
import { FaChevronDown } from 'react-icons/fa'
import { services } from '../data/services'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'News', href: '#news' },
  { label: 'Customer Feedbacks', href: '#feedbacks' },
  { label: 'Contact Us', href: '#contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const servicesRef = useRef(null)
  const navigate = useNavigate()
  const { pathname, state } = useLocation()

  const isDetailPage = pathname !== '/'

  useEffect(() => {
    if (state?.scrollTo) {
      setActiveLink(state.scrollTo)
    } else if (pathname.startsWith('/news/')) {
      setActiveLink('#news')
    } else if (pathname.startsWith('/services/')) {
      setActiveLink('#services')
    }
  }, [pathname, state?.scrollTo])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    setServicesOpen(false)
    if (isDetailPage) {
      setActiveLink(href)
      navigate('/', { state: { scrollTo: href } })
      return
    }
    setActiveLink(href)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  const handleLogoClick = () => {
    setMenuOpen(false)
    setServicesOpen(false)
    if (isDetailPage) navigate('/')
    else handleNavClick('#home')
  }

  const handleServiceNavigate = (slug) => {
    setMenuOpen(false)
    setServicesOpen(false)
    setMobileServicesOpen(false)
    navigate(`/services/${slug}`)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-primary shadow-lg py-5' : 'bg-transparent py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button onClick={handleLogoClick} className="flex items-center gap-3 focus:outline-none">
          <div className="w-13 h-13 rounded-full bg-accent flex items-center justify-center font-bold text-white text-base leading-none" style={{ width: '52px', height: '52px' }}>
            ICS
          </div>
          <div className="text-left">
            <div className="font-heading font-bold text-white text-2xl leading-tight">
              Immigration Consulting
            </div>
            <div className="text-accent text-sm font-body tracking-wide">Service · Sri Lanka</div>
          </div>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.label === 'Services' ? (
              /* Services item with dropdown */
              <li
                key={link.href}
                ref={servicesRef}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`inline-flex items-center gap-1.5 font-body text-sm font-medium transition-all duration-200 pb-1 border-b-2 ${
                    activeLink === link.href
                      ? 'text-accent border-accent'
                      : 'text-white/90 border-transparent hover:text-accent hover:border-accent'
                  }`}
                >
                  {link.label}
                  <motion.span
                    animate={{ rotate: servicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaChevronDown size={11} />
                  </motion.span>
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      key="services-dropdown"
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                    >
                      {/* Arrow */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-t border-l border-gray-100" />
                      <ul className="py-2 relative">
                        {services.map((s) => (
                          <li key={s.id}>
                            <button
                              onClick={() => handleServiceNavigate(s.slug)}
                              className="w-full text-left px-5 py-3 font-body text-sm text-bodytext hover:bg-lightbg hover:text-accent transition-colors duration-150"
                            >
                              {s.title}
                            </button>
                          </li>
                        ))}
                        <li className="border-t border-gray-100 mt-1 pt-1">
                          <button
                            onClick={() => handleNavClick('#services')}
                            className="w-full text-left px-5 py-3 font-body text-xs font-semibold text-accent hover:bg-lightbg transition-colors duration-150"
                          >
                            View All Services →
                          </button>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`font-body text-sm font-medium transition-all duration-200 pb-1 border-b-2 ${
                    activeLink === link.href
                      ? 'text-accent border-accent'
                      : 'text-white/90 border-transparent hover:text-accent hover:border-accent'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            )
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <RiCloseLine size={28} /> : <RiMenuLine size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-primary border-t border-white/10"
          >
            <ul className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) =>
                link.label === 'Services' ? (
                  <li key={link.href}>
                    {/* Services toggle row */}
                    <div className="flex items-center justify-between border-b border-white/10">
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className={`flex-1 text-left py-3 font-body font-medium transition-colors duration-200 ${
                          activeLink === link.href
                            ? 'text-accent'
                            : 'text-white/90 hover:text-accent'
                        }`}
                      >
                        {link.label}
                      </button>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="p-2 text-white/70 hover:text-accent transition-colors"
                        aria-label="Toggle services"
                      >
                        <motion.span
                          animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="block"
                        >
                          <FaChevronDown size={12} />
                        </motion.span>
                      </button>
                    </div>

                    {/* Mobile services sub-list */}
                    <AnimatePresence initial={false}>
                      {mobileServicesOpen && (
                        <motion.ul
                          key="mobile-services"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-3 border-l-2 border-accent/40 ml-2"
                        >
                          {services.map((s) => (
                            <li key={s.id}>
                              <button
                                onClick={() => handleServiceNavigate(s.slug)}
                                className="w-full text-left py-2.5 font-body text-sm text-white/70 hover:text-accent transition-colors duration-150"
                              >
                                {s.title}
                              </button>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`w-full text-left py-3 font-body font-medium border-b border-white/10 transition-colors duration-200 ${
                        activeLink === link.href
                          ? 'text-accent'
                          : 'text-white/90 hover:text-accent'
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                )
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
