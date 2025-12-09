"use client"

import React, { useEffect, useState } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false
    return window.innerWidth < 768
  })

  // Hide navbar when LoadingScreen is mounted
  // Note: Navbar visibility is also controlled by parent component based on appState
  useEffect(() => {
    const navbar = document.querySelector('nav') as HTMLElement | null
    if (navbar) {
      navbar.style.display = 'none'
    }
  }, [])

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(onComplete, 1000) // Wait for fade out animation
    }, 2500)

    return () => clearTimeout(timer)
  }, [onComplete])

  const backgroundImage = isMobile 
    ? "/mobile-background/couple (10).jpg" 
    : "/desktop-background/couple (13).jpg"

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Background Image matching main Hero */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage}
          alt="Loading background" 
          className="w-full h-full object-cover"
        />
        {/* Matching gradient overlays from main Hero */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#A1857A]/55 via-[#E6CFC9]/30 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#8EA58B]/35 via-[#8EA58B]/20 to-transparent z-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">

        {/* Loading animation */}
        <div className="relative flex items-center justify-center mb-6 md:mb-8">
          {/* Outer decorative ring */}
          <div className="absolute w-24 h-24 md:w-32 md:h-32 border border-[#E6CFC9]/40 rounded-full animate-ping opacity-70" />
          <div className="absolute w-20 h-20 md:w-28 md:h-28 border-t-2 border-b-2 border-[#E6CFC9] rounded-full animate-spin-slow" />
          
          {/* Monogram with matching style */}
          <div className="flex flex-col items-center justify-center z-10">
            <span 
              className="text-4xl md:text-5xl lg:text-6xl text-[#FFFFFF] tracking-widest"
              style={{
                fontFamily: "var(--font-cinzel), serif",
                fontWeight: 700,
                textShadow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(230, 207, 201, 0.4), 0 0 40px rgba(230, 207, 201, 0.3), 0 12px 26px rgba(0,0,0,0.45)",
              }}
            >
              M&K
            </span>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="text-center">
          <p 
            className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#FFFFFF] animate-pulse"
            style={{ 
              fontFamily: "var(--font-cinzel), serif",
              fontWeight: 700,
              textShadow: "0 6px 18px rgba(0,0,0,0.45)" 
            }}
          >
            Loading Invitation
          </p>
        </div>
      </div>
    </div>
  )
}

