import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contact from './pages/Contact'

/**
 * Main App Component
 * Sets up routing and combines Navbar, pages, and Footer
 */
function App() {
  return (
    <Router>
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
        </Routes>
      </div>
    </Router>
  )
}

export default App
