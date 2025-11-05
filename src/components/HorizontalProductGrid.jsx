import { useRef } from 'react'
import ProductCard from './ProductCard'

/**
 * HorizontalProductGrid Component
 * Displays a horizontal scrolling grid of products
 * 
 * Props:
 * - title: Section title (e.g., "Underwater")
 * - products: Array of product objects with title, imageUrl, and optional videoUrl
 */
function HorizontalProductGrid({ title, products }) {
  const scrollContainerRef = useRef(null)

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex items-center justify-between mb-8 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            {title}
          </h2>
          
          {/* Scroll Buttons - Desktop Only */}
          <div className="hidden lg:flex items-center space-x-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Container */}
        <div 
          ref={scrollContainerRef}
          className="flex space-x-4 sm:space-x-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {products.map((product, index) => (
            <div 
              key={index} 
              className="snap-start" 
              style={{ 
                minWidth: '280px', 
                maxWidth: '380px',
                width: 'calc(85vw - 2rem)'
              }}
            >
              <ProductCard
                title={product.title}
                imageUrl={product.imageUrl}
                videoUrl={product.videoUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HorizontalProductGrid

