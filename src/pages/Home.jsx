import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { productCategories as allCategories } from '../data/products'

/**
 * Home Page Component
 * Contains hero section with video background and all product grids
 */
function Home() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const navigate = useNavigate()

  // Get first product from each category for the 4-card grid
  const featuredProducts = allCategories.map(category => ({
    categoryTitle: category.title,
    categoryRoute: category.route,
    product: category.products[0] || null
  })).filter(item => item.product !== null)

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        {/* Background Video - Fixed z-index and positioning */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
          onLoadedData={() => setIsVideoLoaded(true)}
          onCanPlay={() => setIsVideoLoaded(true)}
        >
          <source src="/home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay for better text readability - Above video */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" style={{ zIndex: 1 }}></div>
        
        {/* Loading State - Above overlay */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-black flex items-center justify-center" style={{ zIndex: 2 }}>
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Text Overlay with Animation - Above everything */}
        <div className="relative text-center px-3 xs:px-4 sm:px-6 lg:px-8 animate-fade-in" style={{ zIndex: 3 }}>
          <div className="mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-6 flex justify-center">
            <img 
              src="/Logo/BOTSOVERKILL _ White _ Transparent.png" 
              alt="Bots Overkill" 
              className="h-12 xs:h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto object-contain drop-shadow-2xl max-w-[90vw]"
            />
          </div>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 font-light max-w-3xl mx-auto drop-shadow-lg px-2">
          Built to last, made to explore
          </p>
          
        </div>
      </section>

      {/* Products Section - 4 Card Grid */}
      <section id="products" className="homepage-section collection-module w-full bg-white" data-module-template="promos" data-analytics-region="promo">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 md:gap-8 lg:gap-10 py-6 md:py-8 lg:py-10 px-4 md:px-6 lg:px-8">
          {featuredProducts.slice(0, 4).map((item, index) => {
            const { categoryTitle, categoryRoute, product } = item

            // Category-specific theme colors
            const categoryColors = {
              0: { // Underwater - Dark Blue
                bg: '#1e3a5f',
                text: 'text-white',
                subtext: 'text-gray-200',
                primaryBtn: 'bg-white text-[#1e3a5f] hover:bg-gray-100',
                secondaryBtn: 'border-2 border-white text-white hover:bg-white/10'
              },
              1: { // Surface Water - Light Blue
                bg: '#e6f3ff',
                text: 'text-[#1e3a5f]',
                subtext: 'text-[#2d4a6b]',
                primaryBtn: 'bg-[#0066cc] text-white hover:bg-[#0052a3]',
                secondaryBtn: 'border-2 border-[#0066cc] text-[#0066cc] hover:bg-[#0066cc]/10'
              },
              2: { // Land - Yellow/Brownish
                bg: '#f4e4bc',
                text: 'text-[#5c4a2a]',
                subtext: 'text-[#6b5638]',
                primaryBtn: 'bg-[#8b6914] text-white hover:bg-[#6d520f]',
                secondaryBtn: 'border-2 border-[#8b6914] text-[#8b6914] hover:bg-[#8b6914]/10'
              },
              3: { // Air - Gray
                bg: '#e5e7eb',
                text: 'text-gray-900',
                subtext: 'text-gray-700',
                primaryBtn: 'bg-gray-900 text-white hover:bg-gray-800',
                secondaryBtn: 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900/10'
              }
            }

            const colors = categoryColors[index] || categoryColors[0]

            return (
              <div
                key={index}
                onClick={() => navigate(categoryRoute)}
                data-unit-id={product.id}
                data-analytics-section-engagement={`name:promo-${product.id}`}
                className="product-card relative overflow-hidden flex flex-col items-center justify-center min-h-[700px] sm:min-h-[800px] md:min-h-[900px] lg:min-h-[1000px] hover:opacity-95 transition-opacity duration-300 cursor-pointer shadow-lg"
                style={{ backgroundColor: colors.bg }}
              >
                <div className="module-content h-full w-full max-w-[900px] mx-auto flex flex-col items-center justify-center px-6 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-12 lg:py-24">
                  <div className="unit-wrapper relative h-full w-full flex flex-col items-center text-center">
                    
                    {/* Text Section - Top */}
                    <div className="unit-copy-wrapper w-full mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                      <h3 className={`headline ${colors.text} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 leading-tight`}>
                        {categoryTitle}
                      </h3>
                      <p className={`subhead ${colors.subtext} text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed`}>
                        {product.description}
                      </p>
                    </div>

                    {/* Button Row - Reduced gap for Land and Air */}
                    <div 
                      className={`cta-links flex flex-wrap justify-center gap-4 sm:gap-5 ${index === 2 || index === 3 ? 'mb-4 sm:mb-6 md:mb-8 lg:mb-10' : 'mb-12 sm:mb-16 md:mb-20 lg:mb-24'}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link
                        to={categoryRoute}
                        className={`button button-primary px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 lg:px-10 lg:py-5 ${colors.primaryBtn} rounded-full font-medium transition-colors text-sm sm:text-base md:text-lg lg:text-xl inline-block`}
                        data-analytics-region="learn more"
                        data-analytics-title={`learn more - ${product.id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Learn more
                      </Link>
                      <Link
                        to="/contact"
                        className={`button button-tertiary px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 lg:px-10 lg:py-5 ${colors.secondaryBtn} rounded-full font-medium transition-colors text-sm sm:text-base md:text-lg lg:text-xl inline-block`}
                        data-analytics-region="buy"
                        data-analytics-title={`buy - ${product.id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Buy now
                      </Link>
                    </div>

                    {/* Image Section - Bottom */}
                    <div className="unit-image-wrapper relative w-full flex-1 flex items-center justify-center mt-auto">
                      <figure
                        className="unit-image w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] flex items-center justify-center"
                        role="img"
                        aria-label={`${product.title}, ${product.description}`}
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-full h-auto object-contain"
                          loading="lazy"
                        />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* About Section Placeholder */}
      <section id="about" className="bg-black py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 lg:mb-8">
            Innovation Meets Precision
          </h2>
          <p className="text-lg lg:text-xl text-gray-400 leading-relaxed">
            We design and manufacture cutting-edge robotic solutions 
            for the most demanding environments. From the depths of the ocean to the skies above, 
            our fleet of autonomous vehicles pushes the boundaries of what's possible.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home

