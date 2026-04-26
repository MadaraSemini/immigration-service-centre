import { motion } from 'framer-motion'
import {
  FaPassport,
  FaHome,
  FaBriefcase,
  FaHeartbeat,
  FaBuilding,
  FaStar,
} from 'react-icons/fa'
import { services } from '../data/services'
import ScrollReveal from './ScrollReveal'

const iconMap = {
  FaPassport,
  FaHome,
  FaBriefcase,
  FaHeartbeat,
  FaBuilding,
  FaStar,
}

const ServiceCard = ({ service, index, onServiceSelect }) => {
  const Icon = iconMap[service.icon]

  const handleClick = () => {
    onServiceSelect(service.title)
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      setTimeout(() => {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    }
  }

  return (
    <motion.div
      className="group bg-white rounded-2xl shadow-lg p-6 cursor-pointer flex flex-col gap-4 border-l-4 border-transparent hover:border-accent hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -4 }}
      onClick={handleClick}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: '#E8A020' }}
      >
        <Icon size={24} color="#fff" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <h3 className="font-body font-bold text-lg text-bodytext mb-2 group-hover:text-primary transition-colors duration-200">
          {service.title}
        </h3>
        <p className="font-body text-muted text-sm leading-relaxed flex-1">
          {service.description}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-2">
        <span className="font-body text-sm font-semibold text-accent group-hover:underline">
          Get Consultation →
        </span>
      </div>
    </motion.div>
  )
}

const Services = ({ onServiceSelect }) => {
  return (
    <section id="services" className="py-20 bg-lightbg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <ScrollReveal>
          <div className="mb-12">
            <div className="flex items-start gap-4">
              <div className="w-1 h-16 rounded-full bg-accent flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-heading font-bold text-4xl sm:text-5xl text-bodytext leading-tight">
                  Our Immigration Services
                </h2>
                <p className="font-body text-muted mt-3 text-base">
                  Click any service to get in touch with us instantly.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={0.1 * index}>
              <ServiceCard
                service={service}
                index={index}
                onServiceSelect={onServiceSelect}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
