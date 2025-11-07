import { Link, useNavigate } from 'react-router-dom'
import { productCategories as allCategories } from '../data/products'

/**
 * Home Page Component
 * Contains hero section with video background and all product grids
 */
function Home() {
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
        >
          <source src="/home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay for better text readability - Above video */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" style={{ zIndex: 1 }}></div>
        
        {/* Text Overlay with Animation - Above everything, centered on screen */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-3 xs:px-4 sm:px-6 lg:px-8 animate-fade-in" style={{ zIndex: 3 }}>
          <div className="flex flex-col items-center">
            <img 
              src="/Logo/BOTSOVERKILL _ White _ Transparent.png" 
              alt="Bots Overkill" 
              className="h-12 xs:h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto object-contain drop-shadow-2xl max-w-[90vw] mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-6"
            />
            <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 font-light max-w-3xl mx-auto drop-shadow-lg px-2">
              Built to last, made to explore
            </p>
          </div>
        </div>
      </section>

      {/* Products Section - 4 Card Grid */}
      <section id="products" className="homepage-section collection-module w-full bg-white" data-module-template="promos" data-analytics-region="promo">
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-2 sm:gap-2 md:gap-2 lg:gap-2 p-2 sm:p-2 md:p-2 lg:p-2">
          {featuredProducts.slice(0, 4).map((item, index) => {
            const { categoryTitle, categoryRoute, product } = item

            // Category-specific theme colors
            const categoryColors = {
              0: { // Underwater - Cyan Blue
                bg: '#1FA8D0',
                text: 'text-white',
                subtext: 'text-gray-200',
                primaryBtn: 'bg-white text-[#1FA8D0] hover:bg-gray-100',
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
                className="product-card relative overflow-hidden flex flex-col items-center justify-center w-full aspect-square hover:opacity-95 transition-opacity duration-300 cursor-pointer shadow-lg"
                style={{ backgroundColor: colors.bg }}
              >
                <div className="module-content h-full w-full flex flex-col items-center justify-center px-3 py-4 xs:px-4 xs:py-5 sm:px-5 sm:py-6 md:px-6 md:py-7 lg:px-8 lg:py-10">
                  <div className="unit-wrapper relative h-full w-full flex flex-col items-center justify-between text-center">
                    
                    {/* Text Section - Top */}
                    <div className="unit-copy-wrapper w-full mb-2 xs:mb-3 sm:mb-4 md:mb-5">
                      <h3 className={`headline ${colors.text} text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 xs:mb-2 sm:mb-2 md:mb-3 leading-tight`}>
                        {categoryTitle}
                      </h3>
                      <p className={`subhead ${colors.subtext} text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed`}>
                        {product.description}
                      </p>
                    </div>

                    {/* Button Row */}
                    <div 
                      className="cta-links flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-3 md:gap-4 mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link
                        to={categoryRoute}
                        className={`button button-primary px-3 py-1.5 xs:px-4 xs:py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 ${colors.primaryBtn} rounded-full font-medium transition-colors text-xs xs:text-sm sm:text-base md:text-lg inline-block`}
                        data-analytics-region="learn more"
                        data-analytics-title={`learn more - ${product.id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Learn more
                      </Link>
                      <Link
                        to="/contact"
                        className={`button button-tertiary px-3 py-1.5 xs:px-4 xs:py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 ${colors.secondaryBtn} rounded-full font-medium transition-colors text-xs xs:text-sm sm:text-base md:text-lg inline-block`}
                        data-analytics-region="buy"
                        data-analytics-title={`buy - ${product.id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Buy now
                      </Link>
                    </div>

                    {/* Image Section - Bottom */}
                    <div className="unit-image-wrapper relative w-full flex-1 flex items-center justify-center min-h-0">
                      <figure
                        className="unit-image w-full h-full max-w-[220px] xs:max-w-[250px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[380px] xl:max-w-[520px] flex items-center justify-center"
                        role="img"
                        aria-label={`${product.title}, ${product.description}`}
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-full h-full object-contain"
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
      <section id="about" className="bg-black py-12 xs:py-16 sm:py-20 md:py-24 lg:py-32 px-4 xs:px-5 sm:px-6 md:px-8 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-white mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-8">
            Innovation Meets Precision
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl text-gray-400 leading-relaxed">
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

