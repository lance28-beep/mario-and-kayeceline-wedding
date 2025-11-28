"use client"

import { useState, useEffect, useRef } from "react"
import { Section } from "@/components/section"
import Image from "next/image"
import { motion } from "motion/react"
import { Play } from "lucide-react"
import { useAudio } from "@/contexts/audio-context"

// YouTube Player API types
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export function CoupleVideo() {
  // State to track if user has clicked to play the video
  const [hasClicked, setHasClicked] = useState(false)
  const playerRef = useRef<any>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { pauseMusic, resumeMusic } = useAudio()

  // YouTube video ID
  const videoId = "2iLHTXpOe7I"

  // Load YouTube IFrame API
  useEffect(() => {
    // Load YouTube IFrame API script if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }
  }, [])

  // Initialize YouTube player when clicked
  useEffect(() => {
    if (!hasClicked || !iframeRef.current) return

    const initPlayer = () => {
      if (window.YT && window.YT.Player && iframeRef.current) {
        playerRef.current = new window.YT.Player(iframeRef.current, {
          events: {
            onReady: () => {
              // Pause background music when video is ready
              pauseMusic()
            },
            onStateChange: (event: any) => {
              // YouTube player states:
              // -1 (unstarted)
              // 0 (ended)
              // 1 (playing)
              // 2 (paused)
              // 3 (buffering)
              // 5 (video cued)
              
              if (event.data === 1) {
                // Video is playing - pause background music
                pauseMusic()
              } else if (event.data === 2 || event.data === 0) {
                // Video is paused or ended - resume background music
                resumeMusic()
              }
            },
          },
        })
      }
    }

    // Wait a bit for iframe to be ready, then initialize
    const timer = setTimeout(() => {
      if (window.YT && window.YT.Player) {
        initPlayer()
      } else {
        // Otherwise wait for API to load
        window.onYouTubeIframeAPIReady = initPlayer
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy()
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
    }
  }, [hasClicked, pauseMusic, resumeMusic, videoId])

  // Handle thumbnail click - show iframe with autoplay
  const handleThumbnailClick = () => {
    setHasClicked(true)
    // Pause music immediately when user clicks
    pauseMusic()
  }

  return (
    <>
      {/* Global styles to hide YouTube branding */}
      <style jsx global>{`
        /* Hide YouTube logo, title, and branding */
        .youtube-embed-wrapper iframe {
          pointer-events: auto;
        }
        
        /* Additional masking for YouTube UI elements */
        .youtube-mask-container {
          position: relative;
        }
        
        .youtube-mask-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: transparent;
          z-index: 1;
          pointer-events: none;
        }
        
        .youtube-mask-container::after {
          content: '';
          position: absolute;
          top: 8px;
          right: 8px;
          width: 100px;
          height: 50px;
          background: transparent;
          z-index: 1;
          pointer-events: none;
        }
      `}</style>
      
      <Section
        id="couple-video"
        className="relative bg-[#D9E5D7] bg-[url('/decoration/background.jpg')] bg-cover bg-center py-8 sm:py-10 md:py-12 lg:py-16 overflow-hidden"
      >
        {/* Minimal background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#E6CFC9]/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#E6CFC9]/15 to-transparent" />
      </div>

      {/* Header - more compact */}
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
        {/* Simple decorative dots */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-1 h-1 bg-[#8EA58B]/50 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#8EA58B]/70 rounded-full" />
          <div className="w-1 h-1 bg-[#8EA58B]/50 rounded-full" />
        </div>
        
        <h2 className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#324D3E] mb-2 drop-shadow-lg">
        A Glimpse of Our Love
        </h2>
        
        {/* Subtitle intentionally left blank – main heading and video act as the focal point */}
      </div>

      {/* Video Container */}
      <div className="relative z-10 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group"
          >
            {/* Enhanced layered shadow effects for depth */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#8EA58B]/20 via-[#E6CFC9]/20 to-[#8EA58B]/20 blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-500" />
            <div className="absolute -inset-4 bg-black/15 blur-3xl opacity-40 group-hover:opacity-60 transition-all duration-500" />
            
            {/* Elegant video frame with rounded corners and enhanced shadows */}
            <div className="relative bg-gradient-to-br from-black via-[#1a1a1a] to-black overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3),0_16px_64px_rgba(0,0,0,0.25),0_0_0_1px_rgba(142,165,139,0.1)] group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.4),0_24px_96px_rgba(0,0,0,0.3),0_0_0_1px_rgba(142,165,139,0.2)] transition-all duration-500">
              {/* Decorative border with gradient */}
              <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl border border-[#8EA58B]/10 group-hover:border-[#8EA58B]/20 transition-colors duration-500 pointer-events-none z-20" />
              
              {/* Inner shadow for depth */}
              <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[inset_0_0_40px_rgba(0,0,0,0.4)] pointer-events-none z-10" />
              
              {/* Elegant corner accents - top left */}
              <div className="absolute top-0 left-0 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 pointer-events-none z-20">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#8EA58B]/40 via-[#E6CFC9]/30 to-transparent" />
                <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-[#8EA58B]/40 via-[#E6CFC9]/30 to-transparent" />
              </div>
              
              {/* Elegant corner accents - top right */}
              <div className="absolute top-0 right-0 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 pointer-events-none z-20">
                <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-[#8EA58B]/40 via-[#E6CFC9]/30 to-transparent" />
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-[#8EA58B]/40 via-[#E6CFC9]/30 to-transparent" />
              </div>
              
              {/* Elegant corner accents - bottom left */}
              <div className="absolute bottom-0 left-0 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 pointer-events-none z-20">
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#8EA58B]/40 via-[#E6CFC9]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 w-px h-full bg-gradient-to-t from-[#8EA58B]/40 via-[#E6CFC9]/30 to-transparent" />
              </div>
              
              {/* Elegant corner accents - bottom right */}
              <div className="absolute bottom-0 right-0 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 pointer-events-none z-20">
                <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-[#8EA58B]/40 via-[#E6CFC9]/30 to-transparent" />
                <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-[#8EA58B]/40 via-[#E6CFC9]/30 to-transparent" />
              </div>
              
              {/* Video wrapper with 16:9 aspect ratio */}
              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                
                {/* Custom Thumbnail - shown before user clicks */}
                {!hasClicked && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 cursor-pointer z-20 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden"
                    onClick={handleThumbnailClick}
                  >
                    {/* Custom poster image */}
                    <Image
                      src="/images/mario-kaye-cover.png"
                      alt="Video thumbnail"
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    
                    {/* Enhanced gradient overlay for better depth and play button visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/30 group-hover:from-black/60 group-hover:via-black/30 group-hover:to-black/40 transition-all duration-300" />
                    
                    {/* Inner shadow for depth */}
                    <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.3)]" />
                    
                    {/* Custom Play Button with enhanced shadows - positioned in bottom left corner */}
                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative"
                      >
                        {/* Glow effect behind button */}
                        <div className="absolute inset-0 rounded-full bg-[#8EA58B]/30 blur-2xl scale-150 group-hover:bg-[#E6CFC9]/40 group-hover:scale-[1.7] transition-all duration-300" />
                        
                        {/* Play button */}
                        <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white/95 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.3),0_16px_48px_rgba(0,0,0,0.2),0_0_0_1px_rgba(142,165,139,0.1)] group-hover:bg-white group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.4),0_24px_64px_rgba(142,165,139,0.3),0_0_0_1px_rgba(142,165,139,0.2)] transition-all duration-300">
                          <Play className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#8EA58B] fill-[#8EA58B] ml-1 drop-shadow-md" />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                
                {/* YouTube player - only shown after user clicks */}
                {hasClicked && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 youtube-embed-wrapper"
                  >
                    {/* Wrapper to mask YouTube UI elements */}
                    <div className="relative w-full h-full overflow-hidden youtube-mask-container">
                      <iframe
                        ref={iframeRef}
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&fs=1&playsinline=1&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                        className="absolute inset-0 w-full h-full"
                        style={{ border: 0 }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        title="Wedding Video"
                      />
                      
                      {/* CSS masks to hide YouTube branding areas */}
                      {/* Top overlay - hides title, uploader, and "watch on YouTube" */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-10"
                        style={{
                          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)',
                        }}
                      />
                      
                      {/* Top-right corner mask - hides YouTube logo and related icons */}
                      <div 
                        className="absolute top-2 right-2 w-24 h-12 pointer-events-none z-10 bg-black/60 blur-xl"
                        style={{
                          mixBlendMode: 'multiply',
                        }}
                      />
                      
                      {/* Center overlay when paused - prevents YouTube logo from showing */}
                      <div 
                        className="absolute inset-0 pointer-events-none z-[5]"
                        style={{
                          background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.02) 100%)',
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Simple caption below video */}
          {/* Caption below video intentionally removed to keep the focus on the video itself */}
        </div>
      </div>
    </Section>
    </>
  )
}

