"use client"

import React, { useEffect, useState, useMemo } from 'react'
import { FadeIn } from './FadeIn'
import { Sparkles } from 'lucide-react'

interface HeroLandingProps {
  onOpen: () => void
  visible: boolean
}

const DEFAULT_DESKTOP = "/desktop-background/couple (13).jpg"
const DEFAULT_MOBILE = "/mobile-background/couple (10).jpg"

const desktopImages = [
  DEFAULT_DESKTOP,
  "/desktop-background/couple (2).jpg",
  "/desktop-background/couple (3).jpg",
]

const mobileImages = [
  DEFAULT_MOBILE,
  "/mobile-background/couple (2).jpg",
  "/mobile-background/couple (3).jpg",
]

export const HeroLanding: React.FC<HeroLandingProps> = ({ onOpen, visible }) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false
    return window.innerWidth < 768
  })
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Hide navbar when HeroLanding is visible
  useEffect(() => {
    const navbar = document.querySelector('nav') as HTMLElement | null
    if (visible && navbar) {
      navbar.style.display = 'none'
    } else if (!visible && navbar) {
      navbar.style.display = ''
    }
    
    return () => {
      // Restore navbar when component unmounts
      if (navbar) {
        navbar.style.display = ''
      }
    }
  }, [visible])

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Get the appropriate image array based on screen size
  const backgroundImages = useMemo(() => {
    return isMobile ? mobileImages : desktopImages
  }, [isMobile])

  // Preload images
  useEffect(() => {
    setImagesLoaded(false)
    setCurrentImageIndex(0)
    
    const firstImg = new Image()
    firstImg.src = backgroundImages[0]
    firstImg.onload = () => {
      setImagesLoaded(true)
    }
    
    setTimeout(() => {
      if (typeof navigator !== 'undefined' && (navigator as any).connection?.saveData) return
      backgroundImages.slice(1, 3).forEach((src) => {
        const img = new Image()
        img.decoding = 'async'
        img.loading = 'lazy' as any
        img.src = src
      })
    }, 200)
  }, [backgroundImages])

  // Image transition effect - transitions every 5 seconds
  useEffect(() => {
    if (!imagesLoaded || !visible) return
    
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(imageTimer)
  }, [imagesLoaded, backgroundImages, visible])

  const initialBackground = isMobile ? DEFAULT_MOBILE : DEFAULT_DESKTOP

  return (
    <div className={`fixed inset-0 z-30 flex items-center justify-center overflow-hidden transition-all duration-1000 ${visible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      
      {/* Background Image matching main Hero with transitions */}
      <div className="absolute inset-0 z-0">
        {/* Render all images with opacity transitions */}
        {imagesLoaded && backgroundImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              willChange: "opacity",
            }}
          />
        ))}
        {/* Base background fallback */}
        {!imagesLoaded && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${initialBackground}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
        {/* Matching gradient overlays from main Hero */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#A1857A]/55 via-[#E6CFC9]/30 to-transparent z-0 transition-opacity duration-700 ease-out ${
            imagesLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b from-[#8EA58B]/35 via-[#8EA58B]/20 to-transparent z-0 transition-opacity duration-700 ease-out ${
            imagesLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex w-full items-end justify-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16 pt-24 pb-10 sm:pt-32 sm:pb-16 md:pb-20 lg:pb-24 min-h-screen">
        <div className="relative w-full max-w-[420px] sm:max-w-3xl lg:max-w-5xl px-4 py-8 sm:px-8 sm:py-10 md:px-12 md:py-14 lg:px-16 lg:py-16">
          <div className="relative z-10 flex flex-col items-center text-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            
            <div className="flex flex-col items-center justify-center my-auto">
              <FadeIn show={visible} delay={600}>
                <h2 
                  className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#FFFFFF] transform -rotate-6 mb-4 opacity-90"
                  style={{
                    textShadow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(230, 207, 201, 0.4), 0 0 40px rgba(230, 207, 201, 0.3), 0 12px 26px rgba(0,0,0,0.45)",
                  }}
                >
                  You are
                </h2>
              </FadeIn>
              
              {/* Divider with icons matching main Hero */}
              <FadeIn show={visible} delay={750}>
                <div className="flex items-center justify-center gap-2 md:gap-3 my-2 md:my-3" style={{ textShadow: "0 4px 12px rgba(0,0,0,0.45)" }}>
                  <span className="h-px w-10 md:w-14 lg:w-16 bg-gradient-to-r from-transparent via-[#E6CFC9] to-[#E6CFC9]/60" />
                  <Sparkles size={11} className="text-[#E6CFC9] md:w-3.5 md:h-3.5" />
                  <span className="h-px w-10 md:w-14 lg:w-16 bg-gradient-to-l from-transparent via-[#E6CFC9] to-[#E6CFC9]/60" />
                </div>
              </FadeIn>
              
              <FadeIn show={visible} delay={900}>
                <h1 
                  className="text-5xl md:text-7xl lg:text-8xl text-[#FFFFFF] tracking-wider uppercase mb-8"
                  style={{
                    fontFamily: "var(--font-cinzel), serif",
                    fontWeight: 700,
                    textShadow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(230, 207, 201, 0.4), 0 0 40px rgba(230, 207, 201, 0.3), 0 12px 26px rgba(0,0,0,0.45)",
                  }}
                >
                  Invited!
                </h1>
              </FadeIn>

              <FadeIn show={visible} delay={1200}>
                <button 
                  onClick={onOpen}
                  className="group relative px-8 md:px-10 lg:px-12 py-3 md:py-4 lg:py-5 bg-[#324D3E]/90 border border-white/40 text-[#FFFFFF] text-xs md:text-sm lg:text-base tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#324D3E] hover:border-white/60 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 rounded-full overflow-hidden backdrop-blur-sm"
                  style={{ 
                    fontFamily: "var(--font-cinzel), serif",
                    fontWeight: 700,
                    textShadow: "0 4px 12px rgba(0,0,0,0.45)" 
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Open Invitation
                  </span>
                  {/* Button sheen effect */}
                  <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-[shimmer_1s_infinite]" />
                </button>
              </FadeIn>
            </div>

            {/* Bottom Spacer */}
            <div className="mb-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}

