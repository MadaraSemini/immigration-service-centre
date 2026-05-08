import { FaCheckCircle } from 'react-icons/fa'
import ScrollReveal from './ScrollReveal'

const checkItems = [
  { title: '10+ Years of Trusted Experience', text: 'Serving clients across Sri Lanka and beyond.' },
  { title: 'Fast, One-Day Processing Available', text: 'Quick turnaround for urgent visa needs.' },
  { title: 'Affordable and Transparent Pricing', text: 'No hidden fees, ever.' },
  { title: 'On-Location Passport Collection', text: 'We come to you — hotel, home, or office.' },
  { title: 'Friendly, Professional Agents', text: 'Courteous team dedicated to your success.' },
  { title: 'Personalized Guidance for Every Client', text: 'Tailored solutions for each unique case.' },
]

const stats = [
  { value: '10+', label: 'Years' },
  { value: '1000+', label: 'Clients' },
  { value: '98%', label: 'Success' },
]

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div>
            <ScrollReveal delay={0}>
              <span className="inline-block bg-accent/10 text-accent font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-4 tracking-wide">
                About Us
              </span>
              <h2 className="font-heading font-bold text-4xl sm:text-5xl text-bodytext leading-tight mb-6">
                Your Trusted Immigration Partner for Over a Decade
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="font-body text-muted leading-relaxed mb-4">
                At Immigration Consulting Service, we specialize in helping individuals
                and families navigate the often complex process of visa extensions and
                immigration-related services. With over 10 years of experience, we have
                proudly served thousands of clients with professionalism, transparency,
                and care.
              </p>
              <p className="font-body text-muted leading-relaxed mb-8">
                We are a trusted immigration consulting agency committed to delivering
                fast, affordable, and reliable services. Our mission is to make
                immigration services easy, accessible, and affordable for everyone.
              </p>
            </ScrollReveal>

            {/* Why Choose Us */}
            <ScrollReveal delay={0.2}>
              <h3 className="font-body font-bold text-xl text-bodytext mb-5">
                Why Choose Us
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {checkItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FaCheckCircle
                      size={18}
                      className="text-accent flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <div className="font-body font-semibold text-sm text-bodytext">
                        {item.title}
                      </div>
                      <div className="font-body text-xs text-muted mt-0.5">
                        {item.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Tagline */}
            <ScrollReveal delay={0.3}>
              <p className="mt-8 font-body italic text-accent font-medium border-l-4 border-accent pl-4">
                "Your documents are safe with us — and so is your peace of mind."
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column */}
          <ScrollReveal delay={0.15}>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              {/* Mission Card */}
              <div className="bg-primary p-8">
                <h3 className="font-heading font-bold text-2xl text-accent mb-4">
                  Our Mission
                </h3>
                <p className="font-body text-white/80 leading-relaxed text-sm">
                  Our mission is to make immigration services easy, accessible, and
                  affordable for everyone. Whether you're a tourist extending your stay
                  or planning a more permanent future, we're here to support you every
                  step of the way.
                </p>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-3 mt-8">
                  {stats.map((s, i) => (
                    <div
                      key={i}
                      className="text-center bg-white/10 rounded-xl p-4"
                    >
                      <div className="font-heading font-bold text-3xl text-accent">
                        {s.value}
                      </div>
                      <div className="font-body text-white/70 text-xs mt-1">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative bottom strip */}
              <div className="bg-accent h-2" />
            </div>

            {/* Decorative image placeholder / visual block */}
            <div className="mt-6 rounded-2xl bg-lightbg border border-gray-100 p-6 text-center">
              <div className="text-4xl mb-3">🇱🇰</div>
              <div className="font-body font-semibold text-primary">
                Based in Sri Lanka
              </div>
              <div className="font-body text-muted text-sm mt-1">
                Serving clients from 30+ countries worldwide
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
