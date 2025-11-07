import { Link } from 'react-router-dom'
import { productCategories } from '../data/products'

function Land() {
  const category = productCategories.find(cat => cat.id === 'land')

  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <div className="min-h-screen bg-black">
    

      {/* Hero Section */}
      <section className="bg-black py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {category.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products - Hero Cards */}
      <section className="bg-black pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {category.products.slice(0, 1).map((product) => (
            <div
              key={product.id}
              className="relative rounded-2xl overflow-hidden bg-gray-900 min-h-[600px] flex items-end"
              style={{
                backgroundImage: `url(${product.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              <div className="relative z-10 p-8 lg:p-12 max-w-2xl">
                <p className="text-sm text-white/60 mb-2">Featured Product</p>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  {product.title}
                </h2>
                <p className="text-lg text-white/80 mb-6">
                  {product.description}
                </p>
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">
                    Learn More
                  </button>
                  <button className="px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors backdrop-blur-sm">
                    Where to Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {category.products.slice(1).map((product) => (
              <div
                key={product.id}
                className="relative rounded-2xl overflow-hidden bg-gray-900 min-h-[400px] flex items-end"
                style={{
                  backgroundImage: `url(${product.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="relative z-10 p-8 max-w-xl">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                    {product.title}
                  </h3>
                  <p className="text-base text-white/80 mb-6">
                    {product.description}
                  </p>
                  <div className="flex gap-4">
                    <button className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">
                      Learn More
                    </button>
                    <button className="px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors backdrop-blur-sm">
                      Where to Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Grid */}
      <section className="bg-gray-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 text-center">
            All {category.title} Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.products.map((product) => (
              <div key={product.id} className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="aspect-[4/3] relative">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {product.description}
                  </p>
                  <Link
                    to={`${category.route}/${product.id}`}
                    className="text-white text-sm font-medium hover:underline inline-flex items-center gap-2"
                  >
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}

export default Land

