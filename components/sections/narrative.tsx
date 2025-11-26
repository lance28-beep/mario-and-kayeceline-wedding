"use client"
import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import Stack from "@/components/stack"
import { motion } from "motion/react"
import Image from "next/image"


export function Narrative() {
  return (
    <Section id="narrative" className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/decoration/background2.jpg"
          alt="Background"
          fill
          sizes="100vw"
          priority={false}
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-4 md:mb-6 text-balance drop-shadow-lg tracking-tight">
            <span className="text-[#324D3E]">Our Love Story</span>
          </h2>
          
          {/* Decorative flourish with motif colors */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-[#324D3E]/60 to-[#738A6E]/50"></div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#324D3E]/70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </motion.div>
            <div className="w-8 md:w-12 h-px bg-gradient-to-l from-transparent via-[#324D3E]/60 to-[#738A6E]/50"></div>
          </div>
        </motion.div>

        {/* Main Content - Centered Layout */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 items-center lg:items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Left Spacer */}
          <div className="hidden lg:block"></div>

          {/* Interactive Stack Component - Center */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Enhanced glow effect with motif colors */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#A1857A]/25 via-[#E6CFC9]/20 to-[#BCCFC0]/30 rounded-full blur-3xl -z-10 w-full h-full max-w-sm animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8EA58B]/20 via-transparent to-[#D9E5D7]/15 rounded-full blur-2xl -z-10 w-full h-full max-w-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-bl from-[#A1857A]/15 via-transparent to-[#E6CFC9]/10 rounded-full blur-xl -z-10 w-full h-full max-w-sm"></div>

              <Stack
                randomRotation={true}
                sensitivity={180}
                sendToBackOnClick={false}
                cardDimensions={{ width: 240, height: 280 }}
                cardsData={[
                  { id: 1, img: "/mobile-background/couple (3).jpg" },
                  { id: 2, img: "/mobile-background/couple (12).jpg" },
                  { id: 3, img: "/mobile-background/couple (2).jpg" },
                ]}
                animationConfig={{ stiffness: 260, damping: 20 }}
              />

              <motion.p 
                className="text-center text-xs md:text-sm text-[#324D3E] mt-4 font-sans font-medium tracking-wide"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                <span className="text-[#738A6E]">✨</span> Drag to explore our moments <span className="text-[#738A6E]">✨</span>
              </motion.p>
            </div>
          </div>

          {/* Right Spacer */}
          <div className="hidden lg:block"></div>
        </motion.div>

        {/* Story Text - Full Width Below */}
        <motion.div 
          className="mt-10 md:mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-white/40"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-4 md:space-y-6">
              {siteConfig.narrative.split("\n\n").map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-sm md:text-base leading-relaxed text-[#324D3E] text-pretty font-sans font-light"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  {/* First paragraph with drop cap */}
                  {index === 0 ? (
                    <>
                      <span className="float-left text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[#A1857A] leading-none mr-3 mt-1 drop-shadow-md">
                        {paragraph.charAt(0)}
                      </span>
                      {paragraph.slice(1)}
                    </>
                  ) : (
                    paragraph
                  )}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Divider and CTA */}
          <motion.div 
            className="mt-10 md:mt-14 space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Decorative divider with motif colors */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#A1857A]/50 to-[#E6CFC9]/40"></div>
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <svg className="w-5 h-5 text-[#A1857A]/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                </svg>
              </motion.div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#A1857A]/50 to-[#E6CFC9]/40"></div>
            </div>

            {/* Enhanced CTA Button with motif colors */}
            <div className="flex justify-center">
              <motion.a
                href="#guest-list"
                className="group relative w-full sm:w-auto px-6 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-[#FFFFFF] font-sans font-bold text-sm sm:text-base md:text-lg rounded-[2rem] transition-all duration-500 text-center overflow-hidden shadow-xl hover:shadow-2xl border-2 border-[#BCCFC0] hover:border-[#324D3E] hover:text-white"
                style={{ 
                  backgroundColor: "#324D3E",
                  boxShadow: "0 10px 40px rgba(50, 77, 62, 0.4), 0 4px 12px rgba(0,0,0,0.3)"
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(50, 77, 62, 0.95)";
                  e.currentTarget.style.boxShadow = "0 15px 50px rgba(50, 77, 62, 0.6), 0 6px 16px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#324D3E";
                  e.currentTarget.style.boxShadow = "0 10px 40px rgba(50, 77, 62, 0.4), 0 4px 12px rgba(0,0,0,0.3)";
                }}
              >
                {/* Pulsing glow effect with motif color */}
                <motion.div 
                  className="absolute inset-0 bg-[#324D3E]/35 rounded-[2rem] blur-2xl"
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* Secondary glow with accent color */}
                <motion.div 
                  className="absolute inset-0 bg-[#E6CFC9]/20 rounded-[2rem] blur-xl"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
                
                {/* Enhanced gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Double shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
                <div className="absolute inset-0 translate-x-full group-hover:-translate-x-full transition-transform duration-1200 delay-200 bg-gradient-to-l from-transparent via-white/15 to-transparent"></div>
                
                {/* Enhanced sparkle effects */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      top: `${20 + i * 15}%`,
                      left: `${10 + (i % 3) * 40}%`,
                    }}
                    animate={{
                      scale: [0, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <svg className="w-3 h-3 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                  </motion.div>
                ))}
                
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-[2rem] border-2 border-white/10 group-hover:border-white/30 transition-all duration-500"></div>
                <motion.div 
                  className="absolute inset-0 rounded-[2rem] border-2 border-white/20"
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Decorative waves on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ y: 0 }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <svg className="w-full h-full" fill="none" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <path d="M0,50 Q100,20 200,50 T400,50 L400,100 L0,100 Z" fill="white" opacity="0.1"/>
                  </svg>
                </motion.div>
                
                {/* Button content */}
                <span className="relative z-10 tracking-wide uppercase inline-flex items-center gap-3 font-bold text-[#FFFFFF]">
                  Join Our Celebration
                  <motion.svg 
                    className="w-5 h-5 md:w-6 md:h-6 text-[#FFFFFF]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
                
                {/* Enhanced decorative corner ornaments */}
                <motion.div 
                  className="absolute top-2 left-2 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div 
                  className="absolute top-2 right-2 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
                <motion.div 
                  className="absolute bottom-2 left-2 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <motion.div 
                  className="absolute bottom-2 right-2 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </Section>
  )
}
