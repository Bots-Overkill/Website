import { Link } from 'react-router-dom'

/**
 * Professional Footer Component
 * Clean, minimalist footer with company information
 */
function Footer() {
  return (
    <footer id="contact" className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <img 
              src="/Logo/Bots Overkill _ White _ Transparent.png" 
              alt="Bots Overkill" 
              className="h-10 w-auto object-contain"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Advanced robotic solutions for every environment. 
              Pushing the boundaries of autonomous technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/#products" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>akhilbarackal@botsoverkill.com</li>
              <li>+91 94473 60345</li>
              <li>Bhopal, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Bots Overkill. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-200 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-200 text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

