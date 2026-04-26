import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiMenuLine, RiCloseLine } from 'react-icons/ri'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Customer Feedbacks', href: '#feedbacks' },
  { label: 'Contact Us', href: '#contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setActiveLink(href)
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-primary shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('#home')}
          className="flex items-center gap-3 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold text-white text-sm leading-none">
            ICS
          </div>
          <div className="text-left">
            <div className="font-heading font-bold text-white text-base leading-tight">
              Immigration Consulting
            </div>
            <div className="text-accent text-xs font-body tracking-wide">
              Service · Sri Lanka
            </div>
          </div>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
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
          ))}
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
              {navLinks.map((link) => (
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
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
