"use client"

import type { JSX } from "react"
import { Section } from "@/components/section"

interface TimelineEvent {
  time: string
  title: string
  Icon: () => JSX.Element
}

const timelineEvents: TimelineEvent[] = [
  {
    time: "12:30 PM",
    title: "Call Time",
    Icon: ClocheIcon,
  },
  {
    time: "1:00 PM",
    title: "Processional",
    Icon: RingsIcon,
  },
  {
    time: "1:35 PM",
    title: "Worship",
    Icon: MicrophoneIcon,
  },
  {
    time: "1:45 PM",
    title: "Vows & I Do's",
    Icon: DanceIcon,
  },
  {
    time: "3:30 PM",
    title: "Sequence Pictorial",
    Icon: ClocheIcon,
  },
  {
    time: "4:00 PM",
    title: "Cocktails & Social Hour",
    Icon: DinnerIcon,
  },
  {
    time: "5:00 PM",
    title: "Celebration Dinner",
    Icon: DinnerIcon,
  },
  {
    time: "6:00 PM",
    title: "Send-off",
    Icon: FireworksIcon,
  },
]

export function WeddingTimeline() {
  return (
    <Section id="wedding-timeline" className="relative overflow-hidden bg-[#D9E5D7] py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#E6CFC9]/25 via-[#E6CFC9]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#E6CFC9]/25 via-[#E6CFC9]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#D9E5D7]/50 via-transparent to-[#D9E5D7]/50" />
        
        {/* Floating decorative circles */}
        <div className="absolute top-12 left-12 w-32 h-32 sm:w-40 sm:h-40 bg-[#E6CFC9]/20 rounded-full blur-2xl opacity-80 animate-pulse" />
        <div className="absolute top-20 right-20 w-24 h-24 sm:w-32 sm:h-32 bg-[#E6CFC9]/15 rounded-full blur-xl opacity-70 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-24 w-28 h-28 sm:w-36 sm:h-36 bg-[#E6CFC9]/20 rounded-full blur-2xl opacity-70 animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-24 right-16 w-24 h-24 sm:w-28 sm:h-28 bg-[#E6CFC9]/15 rounded-full blur-xl opacity-60 animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-[#D9E5D7]/30 rounded-full blur-3xl opacity-70 animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Header Section */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-12 sm:w-16 md:w-20 h-px bg-[#324D3E]/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#324D3E]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#324D3E]/70" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#324D3E]/50" />
          <div className="w-12 sm:w-16 md:w-20 h-px bg-[#324D3E]/50" />
        </div>
        <h2 className="imperial-script-regular text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#324D3E] mb-3 sm:mb-4">
          Wedding Timeline
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-[#324D3E]/75 font-light max-w-lg mx-auto leading-relaxed">
          A glimpse of the moments we'll share
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Mobile: Vertical Timeline */}
        <div className="block md:hidden">
          <div className="relative">
            {/* Vertical line for mobile */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#324D3E]/30 via-[#324D3E]/60 to-[#324D3E]/30">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#324D3E]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#324D3E]" />
            </div>

            <div className="space-y-8 sm:space-y-10">
              {timelineEvents.map((event, index) => (
                <TimelineEventMobile
                  key={`${event.title}-${index}`}
                  event={event}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Alternating Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Central vertical line for desktop */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#324D3E]/30 via-[#324D3E]/60 to-[#324D3E]/30 -translate-x-1/2">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#324D3E]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#324D3E]" />
            </div>

            <div className="space-y-12 lg:space-y-16">
              {timelineEvents.map((event, index) => (
                <TimelineEventDesktop
                  key={`${event.title}-${index}`}
                  event={event}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

// Mobile Timeline Event Component
function TimelineEventMobile({ event, index }: { event: TimelineEvent; index: number }) {
  return (
    <div className="relative pl-20 pr-4">
      {/* Connector line to main timeline */}
      <div className="absolute left-8 top-6 w-12 h-0.5 bg-[#324D3E]/40" />
      
      {/* Icon Badge */}
      <div className="absolute left-0 top-0 z-10">
        <IconBadge Icon={event.Icon} />
      </div>

      {/* Content Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 shadow-lg border border-[#324D3E]/10 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="space-y-2">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.15em] text-[#324D3E]/70 uppercase">
            {event.time}
          </p>
          <h3 className="text-lg sm:text-xl font-playfair text-[#324D3E] tracking-wide">
            {event.title}
          </h3>
        </div>
      </div>
    </div>
  )
}

// Desktop Timeline Event Component
function TimelineEventDesktop({ event, index }: { event: TimelineEvent; index: number }) {
  const isEven = index % 2 === 0
  
  return (
    <div className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Content Card */}
      <div className={`w-[45%] ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-[#324D3E]/10 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
          <div className={`space-y-3 ${isEven ? 'text-right' : 'text-left'}`}>
            <p className="text-sm lg:text-base font-semibold tracking-[0.2em] text-[#324D3E]/70 uppercase">
              {event.time}
            </p>
            <h3 className="text-xl lg:text-2xl xl:text-3xl font-playfair text-[#324D3E] tracking-wide">
              {event.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Central Icon Badge */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20">
        <IconBadge Icon={event.Icon} />
      </div>

      {/* Spacer for opposite side */}
      <div className="w-[45%]" />
    </div>
  )
}

// Enhanced Icon Badge Component
function IconBadge({ Icon }: { Icon: () => JSX.Element }) {
  return (
    <div className="relative group">
      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-full bg-[#324D3E]/20 blur-md group-hover:bg-[#324D3E]/30 transition-all duration-300 scale-110" />
      
      {/* Main badge */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-2 border-[#324D3E] bg-white flex items-center justify-center shadow-[0_8px_24px_rgba(50,77,62,0.25)] group-hover:shadow-[0_12px_32px_rgba(50,77,62,0.35)] transition-all duration-300 group-hover:scale-110">
        <Icon />
      </div>
    </div>
  )
}

function RingsIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#324D3E]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="13" cy="19" r="7" />
      <circle cx="21" cy="13" r="7" />
    </svg>
  )
}

function ClocheIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#324D3E]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 23h22" />
      <path d="M8 23a8 8 0 1 1 16 0" />
      <path d="M16 11v-2" />
      <circle cx="16" cy="8" r="1" fill="currentColor" />
    </svg>
  )
}

function MicrophoneIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#324D3E]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="12" y="3" width="8" height="14" rx="4" />
      <path d="M10 12v3a6 6 0 0 0 12 0v-3" />
      <path d="M16 19v6" />
      <path d="M12 25h8" />
    </svg>
  )
}

function DinnerIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#324D3E]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 23h22" />
      <path d="M8 23a8 8 0 0 1 16 0" />
      <path d="M12 12V5" />
      <path d="M20 12V5" />
      <path d="M16 10V5" />
    </svg>
  )
}

function DanceIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#324D3E]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 9c3-4 9-4 9 2 0 4-5 8-9 10-4-2-9-6-9-10 0-6 6-6 9-2z" />
    </svg>
  )
}

function FireworksIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#324D3E]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 5v6" />
      <path d="M9 7l3 5" />
      <path d="M23 7l-3 5" />
      <path d="M8 19l4-3" />
      <path d="M24 19l-4-3" />
      <path d="M6 13h6" />
      <path d="M20 13h6" />
      <path d="M12 27l4-8 4 8" />
    </svg>
  )
}


