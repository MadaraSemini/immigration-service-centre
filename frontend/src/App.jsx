import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import AboutUs from './components/AboutUs'
import VisaBlog from './components/VisaBlog'
import NewsSection from './components/NewsSection'
import Feedbacks from './components/Feedbacks'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import ServicePage from './pages/ServicePage'
import NewsPage from './pages/NewsPage'

function HomePage() {
  const [selectedService, setSelectedService] = useState('')
  const { state } = useLocation()

  useEffect(() => {
    if (state?.scrollTo) {
      const target = document.querySelector(state.scrollTo)
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100)
      }
      window.history.replaceState({}, '')
    }
  }, [state?.scrollTo])

  return (
    <>
      <Navbar />
      <Hero />
      <Services onServiceSelect={setSelectedService} />
      <AboutUs />
      <VisaBlog />
      <NewsSection />
      <Feedbacks />
      <ContactUs selectedService={selectedService} setSelectedService={setSelectedService} />
      <Footer onServiceSelect={setSelectedService} />
      <FloatingButtons />
    </>
  )
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/news/:slug" element={<NewsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
