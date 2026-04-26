import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaUserEdit,
  FaArrowRight,
  FaPhone,
} from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { newsArticles } from '../data/news'

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

/* ── Article content renderer ─────────────────────────────────── */
const ArticleBody = ({ content }) => (
  <div className="space-y-6">
    {content.map((block, i) => {
      if (block.type === 'paragraph') {
        return (
          <p key={i} className="font-body text-bodytext leading-relaxed text-base">
            {block.text}
          </p>
        )
      }
      if (block.type === 'heading') {
        return (
          <h2
            key={i}
            className="font-heading font-bold text-2xl text-primary mt-10 mb-2 border-l-4 border-accent pl-4"
          >
            {block.text}
          </h2>
        )
      }
      if (block.type === 'list') {
        return (
          <ul key={i} className="space-y-2.5 ml-1">
            {block.items.map((item, j) => (
              <li key={j} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2" />
                <span className="font-body text-bodytext text-base leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        )
      }
      if (block.type === 'image') {
        return (
          <figure key={i} className="my-8 rounded-2xl overflow-hidden shadow-md">
            <img
              src={block.src}
              alt={block.caption}
              className="w-full object-cover max-h-96"
              onError={(e) => { e.target.closest('figure').style.display = 'none' }}
            />
            {block.caption && (
              <figcaption className="bg-gray-50 px-4 py-2 font-body text-xs text-muted text-center">
                {block.caption}
              </figcaption>
            )}
          </figure>
        )
      }
      return null
    })}
  </div>
)

/* ── Related articles sidebar ─────────────────────────────────── */
const RelatedCard = ({ article }) => {
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false)

  return (
    <button
      onClick={() => navigate(`/news/${article.slug}`)}
      className="w-full text-left group flex gap-3 p-3 rounded-xl hover:bg-lightbg transition-colors duration-200"
    >
      <div
        className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
        style={{
          background: imgError
            ? `linear-gradient(135deg, ${article.categoryColor}cc, ${article.categoryColor}66)`
            : `${article.categoryColor}20`,
        }}
      >
        {!imgError && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span
          className="font-body text-xs font-semibold"
          style={{ color: article.categoryColor }}
        >
          {article.category}
        </span>
        <p className="font-body text-sm font-medium text-bodytext leading-snug mt-0.5 group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </p>
        <p className="font-body text-xs text-muted mt-1">{formatDate(article.date)}</p>
      </div>
    </button>
  )
}

/* ── Main page ─────────────────────────────────────────────────── */
const NewsPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false)
  const [selectedService, setSelectedService] = useState('')

  const article = newsArticles.find((a) => a.slug === slug)
  const related = newsArticles.filter((a) => a.slug !== slug).slice(0, 3)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center bg-lightbg">
          <div className="text-center px-4">
            <h1 className="font-heading font-bold text-3xl text-bodytext mb-4">Article Not Found</h1>
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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-primary pt-24 pb-0 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white font-body text-sm mb-6 transition-colors duration-200"
          >
            <FaArrowLeft size={12} /> Back to Home
          </button>

          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="font-body font-semibold text-xs text-white px-3 py-1.5 rounded-full"
              style={{ backgroundColor: article.categoryColor }}
            >
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 font-body text-white/60 text-sm">
              <FaCalendarAlt size={11} /> {formatDate(article.date)}
            </span>
            <span className="flex items-center gap-1.5 font-body text-white/60 text-sm">
              <FaUserEdit size={11} /> {article.author}
            </span>
          </div>

          <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-4xl">
            {article.title}
          </h1>
          <p className="font-body text-white/70 mt-4 text-lg max-w-3xl leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Hero image strip */}
        <div className="relative h-72 sm:h-96 overflow-hidden">
          {!imgError ? (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : null}
          <div
            className="absolute inset-0"
            style={{
              background: imgError
                ? `linear-gradient(135deg, ${article.categoryColor}99 0%, #0D1F3C 100%)`
                : 'linear-gradient(to top, rgba(13,31,60,0.7) 0%, rgba(13,31,60,0.1) 60%)',
            }}
          />
          {imgError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading font-bold text-white/10 text-[120px] select-none leading-none">
                ICS
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Article */}
            <motion.article
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ArticleBody content={article.content} />

              {/* Divider */}
              <div className="border-t border-gray-200 mt-12 pt-8">
                <p className="font-body text-sm text-muted italic">
                  Published by {article.author} · {formatDate(article.date)}
                </p>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="space-y-8">

              {/* CTA card */}
              <div className="bg-primary rounded-2xl p-6 text-white">
                <h3 className="font-heading font-bold text-xl mb-2">Need Assistance?</h3>
                <p className="font-body text-white/70 text-sm leading-relaxed mb-5">
                  Our immigration experts are available to help you navigate any policy changes or new requirements.
                </p>
                <button
                  onClick={() => navigate('/', { state: { scrollTo: '#contact' } })}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-accent text-white font-body font-semibold rounded-xl hover:bg-amber-500 transition-all duration-300 text-sm"
                >
                  Get Free Consultation <FaArrowRight size={12} />
                </button>
                <a
                  href="tel:+94772744628"
                  className="mt-3 w-full flex items-center justify-center gap-2 py-3 border border-white/30 text-white/80 font-body text-sm font-medium rounded-xl hover:border-white/60 transition-colors duration-200"
                >
                  <FaPhone size={12} /> +94 772 744 628
                </a>
              </div>

              {/* Related */}
              <div>
                <h3 className="font-heading font-bold text-xl text-bodytext mb-4">
                  Related Articles
                </h3>
                <div className="space-y-1">
                  {related.map((a) => (
                    <RelatedCard key={a.id} article={a} />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer onServiceSelect={setSelectedService} />
    </div>
  )
}

export default NewsPage
