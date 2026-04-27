import { FaPassport, FaDotCircle } from 'react-icons/fa'
import ScrollReveal from './ScrollReveal'

const keyPoints = [
  'Extensions available up to 3 times',
  'Fast one-day processing available',
  'Required: Original passport + 1 passport-sized photograph',
  'Our agent visits your location for passport collection',
  'Official acknowledgment issued on the spot',
]

const VisaBlog = () => {
  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-20 bg-lightbg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <ScrollReveal>
          <div className="flex items-start gap-4 mb-10">
            <div className="w-1 h-14 rounded-full bg-accent flex-shrink-0 mt-1" />
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-bodytext leading-tight">
              About Sri Lanka Visit Visa Extension
            </h2>
          </div>
        </ScrollReveal>

        {/* Blog Card */}
        <ScrollReveal delay={0.1}>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Icon side */}
              <div className="lg:w-64 bg-primary flex flex-col items-center justify-center p-6 lg:p-10 gap-4 flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                  <FaPassport size={36} color="#E8A020" />
                </div>
                <div className="text-center">
                  <div className="font-heading font-bold text-3xl lg:text-4xl text-white">3×</div>
                  <div className="font-body text-white/70 text-sm mt-1">
                    Maximum Extensions
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-heading font-bold text-2xl lg:text-3xl text-accent">1 Day</div>
                  <div className="font-body text-white/70 text-sm mt-1">
                    Processing Time
                  </div>
                </div>
              </div>

              {/* Content side */}
              <div className="flex-1 p-8 lg:p-10">
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-bodytext mb-4">
                  Extending Your Tourist Visa in Sri Lanka
                </h3>
                <p className="font-body text-muted leading-relaxed mb-6">
                  Tourists visiting Sri Lanka can extend their visa up to three times
                  beyond the initial stay. Visa extension fees vary depending on your
                  country of origin and visa type.
                </p>

                {/* Key Points */}
                <ul className="space-y-3 mb-8">
                  {keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2" />
                      <span className="font-body text-sm text-bodytext">{point}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white font-body font-semibold rounded-xl hover:bg-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5"
                >
                  Apply for Extension →
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default VisaBlog
