import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa'
import { newsArticles } from '../data/news'
import ScrollReveal from './ScrollReveal'

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

const NewsCard = ({ article }) => {
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      className="group bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/news/${article.slug}`)}
    >
      {/* Image */}
      <div
        className="relative h-48 overflow-hidden flex-shrink-0"
        style={{
          background: imgError
            ? `linear-gradient(135deg, ${article.categoryColor}dd 0%, ${article.categoryColor}88 100%)`
            : `${article.categoryColor}15`,
        }}
      >
        {!imgError && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Fallback watermark */}
        {imgError && (
          <span className="absolute bottom-3 right-4 font-heading font-bold text-white/20 text-5xl select-none">
            ICS
          </span>
        )}

        {/* Category badge */}
        <span
          className="absolute top-3 left-3 font-body font-semibold text-xs text-white px-3 py-1 rounded-full"
          style={{ backgroundColor: article.categoryColor }}
        >
          {article.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-muted mb-3">
          <FaCalendarAlt size={11} />
          <span className="font-body text-xs">{formatDate(article.date)}</span>
        </div>

        <h3 className="font-heading font-bold text-lg text-bodytext leading-snug mb-2 group-hover:text-primary transition-colors duration-200 flex-1">
          {article.title}
        </h3>

        <p className="font-body text-muted text-sm leading-relaxed line-clamp-2 mb-4">
          {article.summary}
        </p>

        <div className="flex items-center gap-1.5 text-accent font-body text-sm font-semibold group-hover:gap-3 transition-all duration-200 mt-auto">
          Read Full Article <FaArrowRight size={12} />
        </div>
      </div>
    </motion.div>
  )
}

const NewsSection = () => (
  <section id="news" className="py-20 bg-lightbg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="flex items-start gap-4 mb-12">
          <div className="w-1 h-16 rounded-full bg-accent flex-shrink-0 mt-1" />
          <div>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-bodytext leading-tight">
              Immigration News
            </h2>
            <p className="font-body text-muted mt-2 text-base">
              Stay informed with the latest updates, policy changes, and advisories.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {newsArticles.map((article, index) => (
          <ScrollReveal key={article.id} delay={0.08 * index}>
            <NewsCard article={article} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
)

export default NewsSection
