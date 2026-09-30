//@ts-nocheck

'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
// Import React Icons
import { 
  FaShieldAlt, 
  FaCode, 
  FaChartLine, 
  FaLock, 
  FaCloud, 
  FaShieldVirus, 
  FaRocket, 
  FaMobile, 
  FaLink, 
  FaChartBar, 
  FaBullseye, 
  FaLightbulb, 
  FaArrowRight, 
  FaCalendarCheck 
} from 'react-icons/fa';

export default function AboutUs() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile on component mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Animation variants that don't animate on mobile
  const fadeInVariants = {
    hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <section 
      ref={sectionRef}
      id="about"
      className="relative py-20 sm:py-28 md:py-32 overflow-visible bg-gray/10 z-10"
      style={{ opacity: 1 }} // Ensure section is always visible
    >
      {/* Background geometric elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-1/3 w-1/2 h-1/2 bg-gradient-radial from-purple-900/20 to-transparent"></div>
        <div className="absolute bottom-0 right-1/4 w-1/3 h-2/3 bg-gradient-radial from-[#eb6a1e]/10 to-transparent"></div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 w-full h-full" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        ></div>
        
        {/* Diagonal line */}
        <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
          <div className="absolute -left-1/4 top-3/4 w-full h-[1px] bg-gradient-to-r from-transparent via-[#eb6a1e]/40 to-transparent transform -rotate-12"></div>
        </div>
      </div>
      
      {/* Main content container with max width */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title with animated line */}
        <motion.div 
          className="flex flex-col items-center justify-center mb-16 sm:mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.7 }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-[orbitron] text-white mb-4 tracking-wide"
            initial={{ opacity: isMobile ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: isMobile ? 0 : 0.2 }}
          >
            ABOUT US
          </motion.h2>
          <motion.div 
            className="h-[3px] w-24 bg-gradient-to-r from-transparent via-[#eb6a1e] to-transparent"
            initial={{ width: isMobile ? 96 : 0, opacity: isMobile ? 1 : 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ duration: 0.8, delay: isMobile ? 0 : 0.4 }}
          ></motion.div>
        </motion.div>
        
        {/* Main content with alternating layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Vision Section - Left column on desktop */}
          <motion.div 
            className="flex flex-col order-2 lg:order-1"
            initial={{ opacity: isMobile ? 1 : 0, x: isMobile ? 0 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: isMobile ? 0 : 0.3 }}
          >
            <div className="relative mb-6">
              <h3 className="text-2xl sm:text-3xl font-[orbitron] text-white font-semibold mb-2 animate-glow">
                Our Vision
              </h3>
              <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#eb6a1e] to-transparent"></div>
            </div>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed">
                At Layer One, we envision a future where businesses of all sizes have access to enterprise-grade technology solutions. We believe that the right digital tools can level the playing field, allowing local businesses to compete effectively in a global marketplace.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed mt-4">
                Our goal is to demystify technology, making it accessible, useful, and powerful for those who need it most. Through innovative solutions and personalized service, we are building a world where technology empowers rather than intimidates.
              </p>
            </div>
            
            {/* Stats with animated counters */}
            <div className="grid grid-cols-2 gap-4 mt-8 text-center">
              <motion.div 
                className="bg-black/60 md:bg-black/40 md:backdrop-blur-md border border-gray-800 rounded-lg p-6"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.p 
                  className="text-[#eb6a1e] text-4xl font-bold"
                  initial={{ opacity: isMobile ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: isMobile ? 0 : 0.7 }}
                >
                  100%
                </motion.p>
                <p className="text-gray-400 text-sm mt-2">Client Satisfaction</p>
              </motion.div>
              
              <motion.div 
                className="bg-black/60 md:bg-black/40 md:backdrop-blur-md border border-gray-800 rounded-lg p-6"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.p 
                  className="text-[#eb6a1e] text-4xl font-bold"
                  initial={{ opacity: isMobile ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: isMobile ? 0 : 0.9 }}
                >
                  10+
                </motion.p>
                <p className="text-gray-400 text-sm mt-2">Years Experience</p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Image Section - Right column on desktop */}
          <motion.div 
            className="relative order-1 lg:order-2 flex items-center justify-center"
            initial={{ opacity: isMobile ? 1 : 0, scale: isMobile ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: isMobile ? 0 : 0.5 }}
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Main image with parallax effect */}
              <div className="absolute inset-6 overflow-hidden rounded-xl">
                <video
                  src="/video.mp4" 
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative frame */}
              <div className="absolute inset-0 border-2 border-[#eb6a1e]/30 rounded-xl"></div>
              <div className="absolute -top-3 -left-3 w-16 h-16 border-l-2 border-t-2 border-[#eb6a1e] rounded-tl-xl"></div>
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-[#eb6a1e] rounded-br-xl"></div>
              
              {/* Floating accent element */}
              <motion.div 
                className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-[#eb6a1e]/20 to-purple-500/10 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Mission Section - Full width */}
        <motion.div 
          className="mt-20 relative"
          initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: isMobile ? 0 : 0.3 }}
        >
          <div className="absolute -left-4 -top-4 w-16 h-16 border-l-2 border-t-2 border-[#eb6a1e]/40 rounded-tl-xl"></div>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
            At Layer One, we believe that small and mid-sized businesses deserve access to the same powerful technology and digital strategies as enterprise-level corporations. That is why we bridge the gap—offering expert IT solutions, custom web development, and data-driven growth strategies tailored to your specific needs.
            </p>
            
            {/* Services Grid - with reduced animation on mobile */}
            <div id="services" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {/* Card 1 - Security */}
              <div 
                className="bg-black/60 md:bg-black/40 md:backdrop-blur-md border border-gray-800 rounded-lg p-6 hover:border-[#eb6a1e]/50 transition-colors duration-300"
                style={{ opacity: 1, transform: 'none' }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#eb6a1e] to-orange-400 flex items-center justify-center mb-4">
                  <FaShieldAlt className="h-6 w-6 text-white" />
                </div>
                
                <h4 className="text-white text-xl font-medium font-[orbitron] mb-3">Secure Solutions</h4>
                <p className="text-gray-300 text-sm mb-4">Enterprise-Level Protection for Your Business</p>
                
                <ul className="text-gray-400 text-sm space-y-2 mb-6">
                  <li className="flex items-start">
                    <FaLock className="text-[#eb6a1e] mr-2 mt-1 flex-shrink-0" />
                    <span>End-to-End Encryption – Safeguard sensitive data.</span>
                  </li>
                  <li className="flex items-start">
                    <FaCloud className="text-[#eb6a1e] mr-2 mt-1 flex-shrink-0" />
                    <span>Cloud Security & Backups – Prevent data loss and downtime.</span>
                  </li>
                  <li className="flex items-start">
                    <FaShieldVirus className="text-[#eb6a1e] mr-2 mt-1 flex-shrink-0" />
                    <span>Threat Monitoring – 24/7 protection against cyber threats.</span>
                  </li>
                </ul>
                
                <Link 
                  href="/contact"
                  className="inline-flex items-center text-sm pt-10 font-medium text-[#eb6a1e] hover:text-orange-400 transition-colors"
                >
                  <span className="flex items-center">
                    <FaLock className="mr-1" /> Get a security assessment today
                  </span>
                  <FaArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              {/* Card 2 - Development */}
              <div 
                className="bg-black/60 md:bg-black/40 md:backdrop-blur-md border border-gray-800 rounded-lg p-6 hover:border-[#eb6a1e]/50 transition-colors duration-300"
                style={{ opacity: 1, transform: 'none' }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#eb6a1e] to-orange-400 flex items-center justify-center mb-4">
                  <FaCode className="h-6 w-6 text-white" />
                </div>
                
                <h4 className="text-white text-xl font-medium font-[orbitron] mb-3">Custom Development</h4>
                <p className="text-gray-300 text-sm mb-4">Tailored Technology for Your Success</p>
                
                <ul className="text-gray-400 text-sm space-y-2 mb-6">
                  <li className="flex items-start">
                    <FaRocket className="text-[#eb6a1e] mr-2 mt-1 flex-shrink-0" />
                    <span>Web Development – High-performance websites & web apps.</span>
                  </li>
                  <li className="flex items-start">
                    <FaMobile className="text-[#eb6a1e] mr-2 mt-1 flex-shrink-0" />
                    <span>Software Solutions – Custom tools & automation for efficiency.</span>
                  </li>
                  <li className="flex items-start">
                    <FaLink className="text-[#eb6a1e] mr-2 mt-1 flex-shrink-0" />
                    <span>API Integrations – Seamless connectivity with existing systems.</span>
                  </li>
                </ul>
                
                <Link 
                  href="/contact"
                  className="inline-flex items-center text-sm font-medium text-[#eb6a1e] hover:text-orange-400 transition-colors"
                >
                  <span className="flex items-center">
                    <FaRocket className="mr-1" /> Get a Custom-Built Solution
                  </span>
                  <FaArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              {/* Card 3 - Growth */}
              <div 
                className="bg-black/60 md:bg-black/40 md:backdrop-blur-md border border-gray-800 rounded-lg p-6 hover:border-[#eb6a1e]/50 transition-colors duration-300"
                style={{ opacity: 1, transform: 'none' }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#eb6a1e] to-orange-400 flex items-center justify-center mb-4">
                  <FaChartLine className="h-6 w-6 text-white" />
                </div>
                
                <h4 className="text-white text-xl font-medium font-[orbitron] mb-3">Growth Strategy</h4>
                <p className="text-gray-300 text-sm mb-4">Turn Clicks into Customers</p>
                
                <ul className="text-gray-400 text-sm space-y-2 mb-6">
                  <li className="flex items-start">
                    <FaChartBar className="text-[#eb6a1e] mr-2 mt-1 flex-shrink-0" />
                    <span>SEO & Content Marketing – Rank higher, attract organic traffic.</span>
                  </li>
                  <li className="flex items-start">
                    <FaBullseye className="text-[#eb6a1e] mr-2 mt-1 flex-shrink-0" />
                    <span>PPC & Paid Ads – Maximize ROI with high-converting campaigns.</span>
                  </li>
                  <li className="flex items-start">
                    <FaLightbulb className="text-[#eb6a1e] mr-2 mt-1 flex-shrink-0" />
                    <span>Conversion Optimization – Turn visitors into loyal customers.</span>
                  </li>
                </ul>
                
                <Link 
                  href="/contact"
                  className="inline-flex items-center text-sm font-medium text-[#eb6a1e] hover:text-orange-400 transition-colors"
                >
                  <span className="flex items-center">
                    <FaChartLine className="mr-1" /> Get a Free Strategy Session
                  </span>
                  <FaArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            
            <div
              className="mt-12 text-center"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden text-base font-medium rounded-md text-white bg-gradient-to-r from-[#eb6a1e] to-orange-600 hover:from-orange-600 hover:to-[#eb6a1e] transition-all duration-500"
              >
                <span className="relative z-10 flex items-center">
                  <FaCalendarCheck className="mr-2" /> Schedule a Consultation
                </span>
                <span className="absolute inset-0 w-full h-full bg-white/10 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 