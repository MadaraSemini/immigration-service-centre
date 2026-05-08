import { motion } from 'framer-motion'
import { FaWhatsapp, FaTelegram } from 'react-icons/fa'

const FloatingButtons = () => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 flex flex-col gap-3 z-50"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 2 }}
    >
      {/* WhatsApp */}
      <a
        href="https://wa.me/94772744628"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        style={{ backgroundColor: '#25D366' }}
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} color="#fff" />
        <span className="absolute right-16 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          WhatsApp
        </span>
      </a>

      {/* Telegram */}
      <a
        href="https://t.me/+94772744628"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        style={{ backgroundColor: '#0088CC' }}
        aria-label="Chat on Telegram"
      >
        <FaTelegram size={28} color="#fff" />
        <span className="absolute right-16 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          Telegram
        </span>
      </a>
    </motion.div>
  )
}

export default FloatingButtons
