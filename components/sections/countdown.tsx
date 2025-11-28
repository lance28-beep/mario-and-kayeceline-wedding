"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import Counter from "@/components/counter"
import { motion } from "motion/react"
import { siteConfig } from "@/content/site"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Countdown() {
  const ceremonyDate = siteConfig.ceremony.date
  const ceremonyTimeDisplay = siteConfig.ceremony.time
  const [ceremonyMonth = "December", ceremonyDayRaw = "28", ceremonyYear = "2025"] = ceremonyDate.split(" ")
  const ceremonyDayNumber = ceremonyDayRaw.replace(/[^0-9]/g, "") || "28"
  const ceremonyDayName =
    siteConfig.ceremony.day ||
    (() => {
      const parsed = new Date(`${ceremonyMonth} ${ceremonyDayNumber}, ${ceremonyYear}`)
      if (Number.isNaN(parsed.getTime())) return ""
      return parsed.toLocaleDateString("en-US", { weekday: "long" })
    })() ||
    ""
  
  // Parse the date: December 28, 2025 at 3:00 PM PH Time (GMT+0800)
  // Extract time from "3:00 PM, PH Time" -> "3:00 PM"
  const timeStr = ceremonyTimeDisplay.split(",")[0].trim() // "3:00 PM"
  
  // Create date string in ISO-like format for better parsing
  // December 28, 2025 -> 2025-12-28
  const monthMap: { [key: string]: string } = {
    "January": "01", "February": "02", "March": "03", "April": "04",
    "May": "05", "June": "06", "July": "07", "August": "08",
    "September": "09", "October": "10", "November": "11", "December": "12"
  }
  const monthNum = monthMap[ceremonyMonth] || "12"
  const dayNum = ceremonyDayNumber.padStart(2, "0")
  
  // Parse time: "3:00 PM" -> 15:00
  const timeMatch = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
  let hour = 15 // default 3 PM
  let minutes = 0
  
  if (timeMatch) {
    hour = parseInt(timeMatch[1])
    minutes = parseInt(timeMatch[2])
    const ampm = timeMatch[3].toUpperCase()
    if (ampm === "PM" && hour !== 12) hour += 12
    if (ampm === "AM" && hour === 12) hour = 0
  }
  
  // Create date in GMT+8 (PH Time)
  // Using Date.UTC and adjusting for GMT+8 offset (subtract 8 hours to convert GMT+8 to UTC)
  const parsedTargetDate = new Date(Date.UTC(
    parseInt(ceremonyYear),
    parseInt(monthNum) - 1,
    parseInt(dayNum),
    hour - 8, // Convert GMT+8 to UTC
    minutes,
    0
  ))
  
  const targetTimestamp = Number.isNaN(parsedTargetDate.getTime())
    ? new Date(Date.UTC(2025, 11, 28, 7, 0, 0)).getTime() // Fallback: December 28, 2025, 3:00 PM GMT+8 = 7 AM UTC
    : parsedTargetDate.getTime()

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = targetTimestamp
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [targetTimestamp])

  const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-2.5">
      {/* Counter card */}
      <div className="relative group">
        {/* Elegant glow on hover */}
        <div className="absolute -inset-1 bg-[#8EA58B]/30 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
        
        {/* Main card - elegant and clean */}
        <div className="relative bg-[#FFFFFF]/98 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3.5 md:px-5 md:py-4 lg:px-6 lg:py-5 border-2 border-[#E6CFC9]/50 shadow-[0_8px_32px_rgba(230,207,201,0.15)] hover:shadow-[0_12px_40px_rgba(230,207,201,0.25)] transition-all duration-300 hover:scale-[1.03] min-w-[52px] sm:min-w-[64px] md:min-w-[76px] lg:min-w-[88px]">
          
          {/* Counter */}
          <div className="relative z-10 flex items-center justify-center text-[#324D3E]">
            <Counter
              value={value}
              places={value >= 100 ? [100, 10, 1] : [10, 1]}
              fontSize={36}
              padding={3}
              gap={2}
              textColor="#324D3E"
              fontWeight={900}
              horizontalPadding={2}
              borderRadius={6}
              gradientHeight={6}
              gradientFrom="rgba(155,124,106,0.08)"
              gradientTo="transparent"
              containerStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              counterStyle={{
                fontSize: "clamp(26px, 5.5vw, 48px)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Label - elegant with better contrast */}
      <span className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm font-semibold text-[#8EA58B] uppercase tracking-[0.15em] drop-shadow-sm">
        {label}
      </span>
    </div>
  )

  return (
    <Section
      id="countdown"
      className="relative bg-[#D9E5D7] py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays with new color palette */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#E6CFC9]/25 via-[#E6CFC9]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#E6CFC9]/25 via-[#E6CFC9]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#D9E5D7]/40 via-transparent to-[#D9E5D7]/40" />
        
        {/* Floating decorative circles with new colors */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#E6CFC9]/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-20 right-16 w-24 h-24 bg-[#E6CFC9]/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-16 left-20 w-28 h-28 bg-[#E6CFC9]/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-24 right-12 w-20 h-20 bg-[#E6CFC9]/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#D9E5D7]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Decorative lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E6CFC9]/30 to-transparent" />
      </div>


      {/* Monogram - centered at top */}
      <div className="relative flex justify-center pt-8 sm:pt-10 md:pt-12 mb-6 sm:mb-8 md:mb-10 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <Image
            src="/monogram/updated monogram.png"
            alt={`${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname} monogram`}
            width={384}
            height={384}
            className="w-48 sm:w-60 md:w-72 lg:w-80 xl:w-96 h-auto opacity-95"
            priority
          />
          {/* Glow effect behind monogram */}
          <div className="absolute inset-0 blur-3xl bg-[#8EA58B]/25 -z-10 scale-125" />
        </motion.div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
        {/* Decorative element above title */}
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#8EA58B]/50" />
          <div className="w-1.5 h-1.5 bg-[#E6CFC9]/70 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#A1857A]/70 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#E6CFC9]/70 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#8EA58B]/50" />
        </div>
        
        <h2 className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-[#324D3E] mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
          Countdown to Our Special Day
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#8EA58B]/90 font-light max-w-xl mx-auto leading-relaxed px-2">
          Every moment brings us closer to forever
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-[#E6CFC9]/70 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#A1857A]/70 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#E6CFC9]/70 rounded-full" />
        </div>
      </div>

      {/* Countdown Timer - Elegant */}
      <div className="relative z-10 mb-7 sm:mb-9 md:mb-11 px-3 sm:px-4">
        <div className="flex justify-center items-center gap-2 sm:gap-2.5 md:gap-3.5 lg:gap-5 flex-wrap max-w-4xl mx-auto">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>



      <div className="relative z-10 mt-8 flex justify-center px-4">

      </div>
    </Section>
  )
}
