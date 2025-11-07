import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { productCategories } from '../data/products'

/**
 * Professional Navbar Component
 * Fixed navigation with smooth scroll behavior and backdrop blur
 * Includes mobile menu with slide-in drawer
 */
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [dropdownTimeout, setDropdownTimeout] = useState(null)
  const location = useLocation()
  const mobileMenuRef = useRef(null)
  const dropdownRef = useRef(null)

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
      
      // Close dropdown when clicking outside
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        hoveredCategory &&
        !event.target.closest('[data-category-item]')
      ) {
        setHoveredCategory(null)
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
  }, [isMobileMenuOpen, hoveredCategory])

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

  // Handle dropdown hover with delay for smoother UX
  const handleCategoryEnter = (categoryId) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
      setDropdownTimeout(null)
    }
    setHoveredCategory(categoryId)
  }

  const handleCategoryLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredCategory(null)
    }, 150) // Small delay to allow moving to dropdown
    setDropdownTimeout(timeout)
  }

  const handleDropdownEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
      setDropdownTimeout(null)
    }
  }

  const handleDropdownLeave = () => {
    setHoveredCategory(null)
  }

  // Mobile menu items
  const mobileMenuItems = [
    ...productCategories.map(cat => ({
      name: cat.title,
      href: cat.route,
      onClick: closeMobileMenu,
      isAnchor: false
    })),
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

  // Get the hovered category data
  const hoveredCategoryData = productCategories.find(cat => cat.id === hoveredCategory)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-black/50 backdrop-blur-lg'
        }`}
      >
        <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8">
          {/* Desktop Layout - Logo on elevated ledge with diagonal divider */}
          <div className="hidden md:flex items-start w-full relative">
            {/* Logo Section - Elevated on Left */}
            <div className="relative flex-shrink-0 pt-2 xs:pt-3 sm:pt-4">
              <Link
                to="/"
                className="hover:opacity-80 transition-opacity duration-200 flex items-center relative z-10"
                onClick={closeMobileMenu}
              >
                <img 
                  src="/Logo/Bots Overkill _ White _ Transparent.png" 
                  alt="Bots Overkill" 
                  className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
                />
              </Link>
              
             
            </div>

            {/* Navigation Links Bar - Horizontal with centered product categories */}
            <div className="flex-1 flex items-center h-14 xs:h-16 sm:h-16 lg:h-20 relative">
              {/* Product Categories - Absolutely centered in viewport with dropdowns */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 xl:space-x-12">
                {productCategories.map((category) => (
                  <div
                    key={category.id}
                    className="relative"
                    data-category-item
                    onMouseEnter={() => handleCategoryEnter(category.id)}
                    onMouseLeave={handleCategoryLeave}
                  >
                    <Link
                      to={category.route}
                      className={`text-gray-300 hover:text-white transition-all duration-200 text-xs sm:text-sm md:text-sm lg:text-base font-medium relative group px-2 py-1 block ${
                        hoveredCategory === category.id ? 'text-white' : ''
                      }`}
                    >
                      {category.title}
                      <span className={`absolute bottom-0 left-2 right-2 h-0.5 bg-white transition-transform duration-200 origin-left ${
                        hoveredCategory === category.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}></span>
                    </Link>

                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Links - About & Contact */}
            <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 xl:space-x-12 h-14 xs:h-16 sm:h-16 lg:h-20 flex-shrink-0 ml-auto">
              {location.pathname === '/' ? (
                <>
                  <a
                    href="#about"
                    onClick={(e) => handleNavClick(e, '#about')}
                    className="text-gray-300 hover:text-white transition-all duration-200 text-xs sm:text-sm md:text-sm lg:text-base font-medium relative group px-2 py-1"
                  >
                    About
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                  </a>
                </>
              ) : (
                <>
                  <Link
                    to="/#about"
                    className="text-gray-300 hover:text-white transition-all duration-200 text-xs sm:text-sm md:text-sm lg:text-base font-medium relative group px-2 py-1"
                  >
                    About
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                  </Link>
                </>
              )}
              <Link
                to="/contact"
                className="text-gray-300 hover:text-white transition-all duration-200 text-xs sm:text-sm md:text-sm lg:text-base font-medium relative group px-2 py-1"
              >
                Contact Us
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
              </Link>
            </div>
          </div>

          {/* Mobile Layout - Simplified */}
          <div className="md:hidden flex items-center justify-between h-14 xs:h-16 sm:h-16 w-full">
            {/* Logo/Brand - Left Corner */}
            <Link
              to="/"
              className="hover:opacity-80 transition-opacity duration-200 flex items-center flex-shrink-0"
              onClick={closeMobileMenu}
            >
              <img 
                src="/Logo/Bots Overkill _ White _ Transparent.png" 
                alt="Bots Overkill" 
                className="h-6 xs:h-7 sm:h-8 md:h-10 lg:h-12 w-auto object-contain"
              />
            </Link>

            {/* Mobile Menu Button - Right Corner */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white p-1.5 xs:p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 z-[100] relative flex-shrink-0 ml-auto"
              aria-label="Toggle mobile menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-5 h-5 xs:w-6 xs:h-6" />
                ) : (
                  <FaBars className="w-5 h-5 xs:w-6 xs:h-6" />
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

      {/* Full-Width Dropdown Menu - Apple Style */}
      <AnimatePresence>
        {hoveredCategory && hoveredCategoryData && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
            className="fixed top-[72px] md:top-[80px] left-0 right-0 bg-black/98 backdrop-blur-2xl border-t border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] z-40 hidden md:block"
          >
            <div className="max-w-7xl mx-auto px-8 lg:px-12 py-20">
              {/* Category Title - Apple Style */}
              <div className="mb-16 text-center">
                <h2 className="text-4xl font-semibold text-white mb-4 tracking-tight">
                  {hoveredCategoryData.title}
                </h2>
                {/* <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                  {hoveredCategoryData.description}
                </p> */}
              </div>

              {/* Products Grid - Apple Style - All Products Displayed */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 lg:gap-12">
                {hoveredCategoryData.products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.03 }}
                  >
                    <Link
                      to={`${hoveredCategoryData.route}#${product.id}`}
                      className="group block"
                      onClick={() => setHoveredCategory(null)}
                    >
                      <div className="space-y-3">
                        {/* Product Image - Apple Style */}
                        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-900/50 group-hover:scale-[1.02] transition-all duration-300 ease-out">
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Product Info - Clean Typography */}
                        <div className="space-y-0.5">
                          <h3 className="text-base font-medium text-white group-hover:text-gray-200 transition-colors leading-tight">
                            {product.title}
                          </h3>
                          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
