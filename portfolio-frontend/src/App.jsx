import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
import useCursor from './hooks/useCursor'

import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Experience from './components/Experience/Experience'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

import './index.css'
import './App.css'

/* ── Inner app that uses cursor hook ── */
const AppContent = () => {
  useCursor()

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor" />
      <div className="cursor-ring" />

      {/* Toast Notifications */}
      <Toaster position="bottom-right" />

      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App