import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Underwater from './pages/Underwater'
import SurfaceWater from './pages/SurfaceWater'
import Land from './pages/Land'
import Air from './pages/Air'

/**
 * Main App Component
 * Sets up routing and combines Navbar, pages, and Footer
 */
function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-gray-200 font-sans">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/contact" element={<Contact />} />
          <Route path="/underwater" element={
            <>
              <Navbar />
              <Underwater />
              <Footer />
            </>
          } />
          <Route path="/surfacewater" element={
            <>
              <Navbar />
              <SurfaceWater />
              <Footer />
            </>
          } />
          <Route path="/land" element={
            <>
              <Navbar />
              <Land />
              <Footer />
            </>
          } />
          <Route path="/air" element={
            <>
              <Navbar />
              <Air />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
