import { useState, useRef, useEffect } from 'react'

/**
 * ProductCard Component
 * Displays product image by default, plays video on hover
 * 
 * Props:
 * - title: Product name
 * - imageUrl: Path to product image
 * - videoUrl: Optional path to product video (plays on hover)
 */
function ProductCard({ title, imageUrl, videoUrl }) {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered && videoUrl) {
        videoRef.current.play().catch(() => {
          // Handle autoplay restrictions
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [isHovered, videoUrl])

  return (
    <div
      className="group cursor-pointer flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Container with Image/Video */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-900 transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:shadow-white/10">
        {/* Image - shown by default */}
        <img
          src={imageUrl}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered && videoUrl ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />
        
        {/* Video - shown on hover if videoUrl is provided */}
        {videoUrl && (
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
        
        {/* Gradient Overlay on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>
      </div>
      
      {/* Product Title */}
      <h3 className="mt-4 text-lg font-medium text-white text-center group-hover:text-gray-300 transition-colors duration-200">
        {title}
      </h3>
    </div>
  )
}

export default ProductCard

