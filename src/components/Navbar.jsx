import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'

/**
 * Professional Navbar Component
 * Fixed navigation with smooth scroll behavior and backdrop blur
 * Includes mobile menu with slide-in drawer
 */
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        isMobileMenuOpen
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Handle scroll to section on home page
  const handleNavClick = (e, target) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      return
    }
    e.preventDefault()
    setIsMobileMenuOpen(false) // Close mobile menu
    const element = document.querySelector(target)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Mobile menu items
  const mobileMenuItems = [
    {
      name: 'Products',
      href: '#products',
      onClick: (e) => handleNavClick(e, '#products'),
      isAnchor: true
    },
    {
      name: 'About',
      href: '#about',
      onClick: (e) => handleNavClick(e, '#about'),
      isAnchor: true
    },
    {
      name: 'Contact Us',
      href: '/contact',
      onClick: closeMobileMenu,
      isAnchor: false
    }
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-black/50 backdrop-blur-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo/Brand */}
            <Link
              to="/"
              className="hover:opacity-80 transition-opacity duration-200 flex items-center"
              onClick={closeMobileMenu}
            >
              <img 
                src="/Logo/Bots Overkill _ White _ Transparent.png" 
                alt="Bots Overkill" 
                className="h-8 sm:h-10 lg:h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
              {location.pathname === '/' ? (
                <>
                  <a
                    href="#products"
                    onClick={(e) => handleNavClick(e, '#products')}
                    className="text-gray-300 hover:text-white transition-all duration-200 text-sm lg:text-base font-medium relative group"
                  >
                    Products
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                  </a>
                  <a
                    href="#about"
                    onClick={(e) => handleNavClick(e, '#about')}
                    className="text-gray-300 hover:text-white transition-all duration-200 text-sm lg:text-base font-medium relative group"
                  >
                    About
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                  </a>
                </>
              ) : (
                <>
                  <Link
                    to="/#products"
                    className="text-gray-300 hover:text-white transition-all duration-200 text-sm lg:text-base font-medium relative group"
                  >
                    Products
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                  <Link
                    to="/#about"
                    className="text-gray-300 hover:text-white transition-all duration-200 text-sm lg:text-base font-medium relative group"
                  >
                    About
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                </>
              )}
              <Link
                to="/contact"
                className="text-gray-300 hover:text-white transition-all duration-200 text-sm lg:text-base font-medium relative group"
              >
                Contact Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 z-[100] relative"
              aria-label="Toggle mobile menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <FaBars className="w-6 h-6" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Portal - Rendered outside navbar */}
      {createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  zIndex: 9997,
                  pointerEvents: isMobileMenuOpen ? 'auto' : 'none'
                }}
                onClick={closeMobileMenu}
              />

              {/* Slide-in Drawer */}
              <motion.div
                ref={mobileMenuRef}
                className="fixed left-0 top-0 h-full w-[280px] max-w-[85vw] bg-[#171717] backdrop-blur-lg text-white overflow-y-auto md:hidden shadow-2xl"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }}
                style={{
                  zIndex: 9998,
                  pointerEvents: isMobileMenuOpen ? 'auto' : 'none'
                }}
              >
                {/* Header */}
                <motion.div
                  className="p-6 border-b border-neutral-800"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Link to="/" onClick={closeMobileMenu} className="flex items-center">
                    <img 
                      src="/Logo/Bots Overkill _ White _ Transparent.png" 
                      alt="Bots Overkill" 
                      className="h-8 w-auto object-contain"
                    />
                  </Link>
                </motion.div>

                {/* Menu Items */}
                <div className="px-4 py-6">
                  <ul className="space-y-2">
                    {mobileMenuItems.map((item, index) => (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                      >
                        {item.isAnchor && location.pathname === '/' ? (
                          <a
                            href={item.href}
                            onClick={item.onClick}
                            className="flex items-center p-4 hover:bg-white/5 rounded-xl cursor-pointer transition-all duration-300 group"
                          >
                            <motion.span
                              className="text-white text-base font-medium group-hover:text-gray-300 transition-colors duration-300"
                              whileHover={{ x: 5 }}
                              transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 10
                              }}
                            >
                              {item.name}
                            </motion.span>
                          </a>
                        ) : (
                          <Link
                            to={item.isAnchor ? '/' + item.href : item.href}
                            onClick={item.onClick}
                            className="flex items-center p-4 hover:bg-white/5 rounded-xl cursor-pointer transition-all duration-300 group"
                          >
                            <motion.span
                              className="text-white text-base font-medium group-hover:text-gray-300 transition-colors duration-300"
                              whileHover={{ x: 5 }}
                              transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 10
                              }}
                            >
                              {item.name}
                            </motion.span>
                          </Link>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Section - Contact Button */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-neutral-800 p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <Link to="/contact" onClick={closeMobileMenu}>
                      <motion.div
                        className="bg-white text-black px-6 py-3 shadow-lg rounded-xl text-center font-semibold hover:bg-gray-100 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Contact Us
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

export default Navbar
