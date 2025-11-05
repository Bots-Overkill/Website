import { useState, useEffect } from 'react'
import HorizontalProductGrid from '../components/HorizontalProductGrid'

/**
 * Home Page Component
 * Contains hero section with video background and all product grids
 */
function Home() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  // Product data organized by category
  const productCategories = [
    {
      title: 'Underwater',
      products: [
        {
          title: 'Alpha',
          imageUrl: '/Underwater/Alpha-1536x864.png',
          videoUrl: '/home.mp4' // Using home.mp4 as placeholder video for Alpha
        },
        {
          title: 'ROV',
          imageUrl: '/Underwater/ROV-1536x864.png',
          videoUrl:  '/home.mp4' // Using home.mp4 as placeholder video for Alpha
        },
        {
          title: 'Luna',
          imageUrl: '/Underwater/Luna-1536x864.png',
          videoUrl:  '/home.mp4' // Using home.mp4 as placeholder video for Alpha
        },
        {
          title: 'ARVi',
          imageUrl: '/Underwater/ARVi-2023-version-web-materials-e1691747311126-1536x855.png',
          videoUrl:  '/home.mp4' // Using home.mp4 as placeholder video for Alpha
        },
        {
          title: 'Boxfish AUV',
          imageUrl: '/Underwater/Boxfsih-AUV-4K-camera-head-left-1536x1152.png',
          videoUrl:  '/home.mp4' // Using home.mp4 as placeholder video for Alpha
        }
      ]
    },
    {
      title: 'Surfacewater',
      products: [
        {
          title: 'APACHE4 USV',
          imageUrl: '/Surfacewater/APACHE4-USV-for-ADCP-surveys-1-e1648122399229.png',
          videoUrl:  '/home.mp4' // Using home.mp4 as placeholder video for Alpha
        },
        {
          title: 'Mariner X USV',
          imageUrl: '/Surfacewater/the-mariner-x-usv.webp',
          videoUrl:  '/home.mp4' // Using home.mp4 as placeholder video for Alpha
        },
        {
          title: 'Tactical AMY USV',
          imageUrl: '/Surfacewater/Tactical-AMY-USV.webp',
          videoUrl:  '/home.mp4' // Using home.mp4 as placeholder video for Alpha
        },
        {
          title: 'Hound Reckless USV',
          imageUrl: '/Surfacewater/Hound-Reckless-usv.webp',
          videoUrl:  '/home.mp4' // Using home.mp4 as placeholder video for Alpha
        }
      ]
    },
    {
      title: 'Land',
      products: [
        {
          title: 'Husky A300',
          imageUrl: '/Land/HuskyA300_Menu_Image.png',
          videoUrl:  '/home.mp4' // Using home.mp4 as placeholder video for Alpha
        },
        {
          title: 'Warthog',
          imageUrl: '/Land/warthog-menu.jpg',
          videoUrl:  '/home.mp4' // Using home.mp4 as placeholder video for Alpha
        },
        {
          title: 'Dingo',
          imageUrl: '/Land/dingo-menu-1.png',
          videoUrl:  '/home.mp4' // Using home.mp4 as placeholder video for Alpha
        },
        {
          title: 'Jackal',
          imageUrl: '/Land/jackal.jpg',
          videoUrl:  '/home.mp4' // Using home.mp4 as placeholder video for Alpha
        }
      ]
    },
    {
      title: 'Air',
      products: [
        {
          title: 'Aerial Platform 1',
          imageUrl: '/Air/6e82e273e1d05044bc6f02a278df51eb.png',
          videoUrl:  '/home.mp4' // Using home.mp4 as placeholder video for Alpha
        },
        {
          title: 'Aerial Platform 2',
          imageUrl: '/Air/133dbcbded142391e8ed57d0fcd57ac8.png',
          videoUrl:  '/home.mp4' // Using home.mp4 as placeholder video for Alpha
        },
        {
          title: 'Aerial Platform 3',
          imageUrl: '/Air/ae5d8b9987be8d5ecdeb5d502a1e887c.png',
          videoUrl:  '/home.mp4' // Using home.mp4 as placeholder video for Alpha
        },
        {
          title: 'Aerial Platform 4',
          imageUrl: '/Air/979ab68fd602bd3440fc4fb12f3ea38e.png',
          videoUrl:  '/home.mp4' // Using home.mp4 as placeholder video for Alpha
        },
        {
          title: 'Aerial Platform 5',
          imageUrl: '/Air/3be8aaab8409e1575c6363658007b517.png',
          videoUrl:  '/home.mp4' // Using home.mp4 as placeholder video for Alpha
        }
      ]
    }
  ]

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
        <div className="relative text-center px-4 sm:px-6 lg:px-8 animate-fade-in" style={{ zIndex: 3 }}>
          <div className="mb-4 lg:mb-6 flex justify-center">
            <img 
              src="/Logo/BOTSOVERKILL _ White _ Transparent.png" 
              alt="Bots Overkill" 
              className="h-20 xs:h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56 w-auto object-contain drop-shadow-2xl"
            />
          </div>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-200 font-light max-w-3xl mx-auto drop-shadow-lg px-2">
            Advanced Robotic Solutions for Every Environment
          </p>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block" style={{ zIndex: 3 }}>
            <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="bg-black">
        {productCategories.map((category, index) => (
          <HorizontalProductGrid
            key={index}
            title={category.title}
            products={category.products}
          />
        ))}
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

