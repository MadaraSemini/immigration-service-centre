import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import AboutUs from './components/AboutUs'
import VisaBlog from './components/VisaBlog'
import Feedbacks from './components/Feedbacks'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'

function App() {
  const [selectedService, setSelectedService] = useState('')

  return (
    <>
      <Navbar />
      <Hero />
      <Services onServiceSelect={setSelectedService} />
      <AboutUs />
      <VisaBlog />
      <Feedbacks />
      <ContactUs selectedService={selectedService} setSelectedService={setSelectedService} />
      <Footer onServiceSelect={setSelectedService} />
      <FloatingButtons />
    </>
  )
}

export default App
