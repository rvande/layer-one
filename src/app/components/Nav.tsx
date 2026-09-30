// @ts-nocheck
'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [threeLoaded, setThreeLoaded] = useState(false);
  const [vantaLoaded, setVantaLoaded] = useState(false);
  // Only fetch three.js + Vanta (~600KB) once the menu is first opened
  const [loadVanta, setLoadVanta] = useState(false);
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const pathname = usePathname();

  // Initialize Vanta effect
  const initVanta = () => {
    if (threeLoaded && vantaLoaded && !vantaEffect.current && window.VANTA) {
      vantaEffect.current = window.VANTA.DOTS({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xeb6a1e,
        backgroundColor: 0x1d1d1d,
        size: 4.70,
        spacing: 50.00,
        showLines: false
      });
    }
  };

  // Handle script loading
  useEffect(() => {
    if (threeLoaded && vantaLoaded && isOpen) {
      initVanta();
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, [threeLoaded, vantaLoaded, isOpen]);

  useEffect(() => {
    if (isOpen) setLoadVanta(true);
  }, [isOpen]);

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {loadVanta && (
        <>
          <Script 
            src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" 
            onLoad={() => setThreeLoaded(true)}
          />
          <Script 
            src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js" 
            onLoad={() => setVantaLoaded(true)}
          />
        </>
      )}

       {/* Contact information - centered at top */}
       <div className="fixed top-0 w-full z-40 flex justify-center pt-2 px-4 bg-opacity-70 backdrop-blur-sm">
        <div className="text-white/60 font-roboto text-xs sm:text-sm text-center animate-fade-in-delay-long truncate">
          Contact: <a 
            href="/contact" 
            className="text-[#eb6a1e] hover:text-[#eb6a1e]/80 transition-colors"
          >
            <span className="hidden sm:inline">contact@layeroneconsultants.com</span>
            <span className="sm:hidden">Email Us</span>
          </a> <span className="hidden xs:inline">|</span> <span className="whitespace-nowrap">© 2025 Layer One IT Consultants</span>
        </div>
      </div>

      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
        aria-label="Toggle navigation"
      >
        <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`} />
        <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black backdrop-blur-sm transition-opacity z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 w-full sm:w-[400px] h-full  z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Vanta container */}
        <div 
          ref={vantaRef} 
          className="absolute inset-0 w-full h-full"
          style={{ 
            minHeight: '100vh',
            opacity: threeLoaded && vantaLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
        
        <div className="relative z-10 h-full flex flex-col p-8">
          {/* Logo */}
          <div className="mb-12">
            <Image
              src="/logo.png"
              alt="Layer One Logo"
              width={150}
              height={30}
              className="w-[150px] h-auto"
              priority
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-6 text-lg text-white/90">
            <a 
              href="#about" 
              className="hover:text-[#eb6a1e] transition-colors flex items-center gap-3 text-2xl font-light"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a 
              href="#services" 
              className="hover:text-[#eb6a1e] transition-colors flex items-center gap-3 text-2xl font-light"
              onClick={() => setIsOpen(false)}
            >
              Services
            </a>
            <a 
              href="#partners" 
              className="hover:text-[#eb6a1e] transition-colors flex items-center gap-3 text-2xl font-light"
              onClick={() => setIsOpen(false)}
            >
              Partners
            </a>
            <a 
              href="#team" 
              className="hover:text-[#eb6a1e] transition-colors flex items-center gap-3 text-2xl font-light"
              onClick={() => setIsOpen(false)}
            >
              Team
            </a>
            <a 
              href="/contact" 
              className="hover:text-[#eb6a1e] transition-colors flex items-center gap-3 text-2xl font-light"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      </aside>
    </>
  );
}