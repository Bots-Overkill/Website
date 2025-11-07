import { useState, useRef, useEffect } from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { useForm, ValidationError } from '@formspree/react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactUs = () => {
  const [state, handleSubmit] = useForm("xrbygvqk"); // Replace with your Formspree form ID
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isFormFocused, setIsFormFocused] = useState(false);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const sections = sectionRefs.current;
    sections.forEach(section => {
      if (section) sectionObserver.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) sectionObserver.unobserve(section);
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const result = await handleSubmit(e);
    return result;
  };

  // Clear form data when submission is successful
  useEffect(() => {
    if (state.succeeded) {
      setFormData({ 
        firstName: "", 
        lastName: "", 
        email: "", 
        phone: "", 
        subject: "", 
        message: "" 
      });
    }
  }, [state.succeeded]);

  // Show success message if form was submitted successfully
  if (state.succeeded) {
    return (
      <section 
        className="pt-20 min-h-screen flex items-center justify-center relative bg-black"
      >
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
        
        {/* Content wrapper with relative positioning */}
        <div className="relative z-10 w-full">
          <Navbar />
          <div className="container mx-auto max-w-2xl px-4 text-white pt-20">
            <div className="relative overflow-hidden">
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-transparent to-gray-800/30 rounded-2xl"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-600/20 via-transparent to-gray-500/20 rounded-2xl blur-sm"></div>
              
              {/* Main content */}
              <div className="relative bg-black/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 sm:p-12 text-center space-y-6 sm:space-y-8 animate-fade-in">
                {/* Success icon with animation */}
                <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full animate-pulse-slow"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/25">
                    <svg 
                      className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-bounce-subtle" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2.5} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                  </div>
                </div>

                {/* Heading */}
                <div className="space-y-3 sm:space-y-4">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-300">
                    Message Sent!
                  </h2>
                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-md mx-auto px-4">
                  Thank you for reaching out. We&apos;ve received your message and will get back to you soon!
                </p>

                {/* Action button */}
                <div className="pt-4">
                  <button 
                    onClick={() => window.location.reload()} 
                    className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/25 text-sm sm:text-base"
                  >
                    <span className="relative z-10">Send Another Message</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-gray-500/30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-gray-400/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-8 left-8 w-1 h-1 bg-gray-600/50 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
    <Navbar />
    <section className="pt-2 bg-black min-h-screen">
      
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 text-white">
        {/* Contact Form Section */}
        <section 
          ref={addToRefs} 
          className="w-full py-8 sm:py-12 md:py-16 lg:py-24 opacity-0 translate-y-4 duration-700 ease-out relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">
                  Get In Touch
                </h2>
                <p className="text-gray-400 text-sm sm:text-base">
                  Have a question or want to discuss a project? We&apos;d love to hear from you.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Email Contact */}
                <div 
                  className="flex items-start gap-4 p-4 sm:p-5 rounded-lg border border-neutral-600 relative group overflow-hidden hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => window.location.href = 'mailto:akhilbarackal@botsoverkill.com'}
                >
                  <div className="p-3 rounded-lg bg-[#EA4335] text-white group-hover:bg-[#D33426] group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                    <FaEnvelope className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white group-hover:text-neutral-200 transition-colors duration-300 text-sm sm:text-base mb-1">
                      Email
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm break-all">
                      akhilbarackal@botsoverkill.com
                    </p>
                  </div>
                </div>

                {/* WhatsApp Contact */}
                <div 
                  className="flex items-start gap-4 p-4 sm:p-5 rounded-lg border border-neutral-600 relative group overflow-hidden hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => window.open('https://wa.me/919447360345', '_blank')}
                >
                  <div className="p-3 rounded-lg bg-[#25D366] text-white group-hover:bg-[#22c55e] group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                    <FaWhatsapp className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white group-hover:text-neutral-200 transition-colors duration-300 text-sm sm:text-base mb-1">
                      WhatsApp
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Chat with us on WhatsApp
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div 
              className={`space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8 rounded-lg border border-gray-800 relative z-20 bg-black/50 backdrop-blur-sm ${isFormFocused ? 'ring-2 ring-primary/50 border-primary/30 shadow-lg' : 'hover:border-primary/30 hover:shadow-md'} transition-all duration-500 order-1 lg:order-2`}
            >
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">
                  Send Message
                </h2>
                <p className="text-gray-400 text-sm sm:text-base">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
              </div>

              {/* General Error Message */}
              {state.errors && state.errors.length > 0 && !state.errors.some(error => error.field) && (
                <div className="p-3 sm:p-4 rounded-lg bg-red-600/20 border border-red-500/30 text-red-100 text-sm">
                  <h3 className="font-semibold text-base sm:text-lg mb-1">Error sending message</h3>
                  <p className="text-xs sm:text-sm">Please check your information and try again.</p>
                </div>
              )}

              <form 
                className="space-y-3 sm:space-y-4 relative z-30 text-gray-100" 
                onSubmit={handleFormSubmit}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm text-gray-100 font-medium">First Name</label>
                    <input 
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John" 
                      className="w-full p-2.5 sm:p-3 rounded-md border border-gray-700 bg-black/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 text-gray-100 text-sm sm:text-base"
                      onFocus={() => setIsFormFocused(true)}
                      onBlur={() => setIsFormFocused(false)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm text-gray-100 font-medium">Last Name</label>
                    <input 
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe" 
                      className="w-full p-2.5 sm:p-3 rounded-md border border-gray-700 bg-black/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 text-gray-100 text-sm sm:text-base"
                      onFocus={() => setIsFormFocused(true)}
                      onBlur={() => setIsFormFocused(false)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm text-gray-100 font-medium">Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com" 
                    className="w-full p-2.5 sm:p-3 rounded-md border border-gray-700 bg-black/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 text-gray-100 text-sm sm:text-base"
                    onFocus={() => setIsFormFocused(true)}
                    onBlur={() => setIsFormFocused(false)}
                    required
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                    className="text-red-400 text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm text-gray-100 font-medium">Phone Number</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210" 
                    className="w-full p-2.5 sm:p-3 rounded-md border border-gray-700 bg-black/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 text-gray-100 text-sm sm:text-base"
                    onFocus={() => setIsFormFocused(true)}
                    onBlur={() => setIsFormFocused(false)}
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit phone number"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm text-gray-100 font-medium">Subject</label>
                  <input 
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Inquiry about..." 
                    className="w-full p-2.5 sm:p-3 rounded-md border border-gray-700 bg-black/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 text-gray-100 text-sm sm:text-base"
                    onFocus={() => setIsFormFocused(true)}
                    onBlur={() => setIsFormFocused(false)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm text-gray-100 font-medium">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full min-h-[120px] sm:min-h-[150px] p-2.5 sm:p-3 rounded-md border border-gray-700 bg-black/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 text-gray-100 text-sm sm:text-base resize-none"
                    placeholder="Your message..."
                    onFocus={() => setIsFormFocused(true)}
                    onBlur={() => setIsFormFocused(false)}
                    required
                  />
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                    className="text-red-400 text-xs sm:text-sm"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={state.submitting}
                  className={`text-white transition-colors duration-300 px-4 py-2.5 sm:px-6 sm:py-3 rounded-md text-sm sm:text-base lg:text-lg w-full text-center ${
                    state.submitting 
                      ? 'bg-neutral-500 cursor-not-allowed opacity-70' 
                      : 'bg-neutral-600 hover:bg-neutral-700 opacity-90 hover:opacity-100'
                  }`}
                >
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .animate-in {
          animation: animateIn 0.8s ease forwards;
        }
        
        @keyframes animateIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-slow {
          0% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s forwards;
        }
      `}</style>
    </section>
    <Footer />
    </>
  );
};

export default ContactUs;

