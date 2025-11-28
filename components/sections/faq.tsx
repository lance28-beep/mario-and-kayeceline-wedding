"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/section"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "Will the ceremony and reception be held in the same place?",
    answer:
      "Yes, both will be held at Orchid Garden Suites Manila in Malate.",
  },
  {
    question: "Is there a parking area for guests?",
    answer:
      "Yes, free parking is available. Please arrive at least 30 minutes before the 1:00 PM ceremony.",
  },
  {
    question: "What if I arrive late?",
    answer:
      "Please avoid walking down the aisle. Ask the coordinator for help or wait until the reception.",
  },
  {
    question: "Can guests choose their seats at the reception?",
    answer:
      "No, the couple prepared a seating arrangement. Coordinators will guide you.",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "Only guests named on this invitation will be accommodated.",
  },
  {
    question: "Is RSVP required?",
    answer:
      `Yes. If we don't receive your RSVP by January 6, 2026, it will be recorded as "No."\n\n[RSVP_LINK]Click here to RSVP[/RSVP_LINK]`,
  },
  {
    question: "Can I cancel my RSVP?",
    answer:
      "Yes. Please inform us ASAP so we can adjust the guest list.",
  },
  {
    question: "How can I help the couple enjoy their wedding day?",
    answer:
      "Be on time. Wear appropriate attire. Stay until the end of the program.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Section
      id="faq"
      className="relative bg-[#D9E5D7] overflow-hidden"
    >
      {/* Enhanced background elements with layered depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D9E5D7] via-[#E8F0E6] to-[#D9E5D7]" />
        
        {/* Soft gradient overlays with peachy tones */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#E6CFC9]/30 via-[#E6CFC9]/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#E6CFC9]/30 via-[#E6CFC9]/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#D9E5D7]/50 via-transparent to-[#D9E5D7]/50" />
        
        {/* Floating decorative circles with enhanced visibility */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#E6CFC9]/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-[#FCB8B5]/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-[#E6CFC9]/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#D9E5D7]/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Additional subtle decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-[#EDD6AC]/25 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.8s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-[#C2D3C3]/25 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1.2s' }} />
        
        {/* Decorative lines with enhanced visibility */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E6CFC9]/40 to-transparent" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E6CFC9]/40 to-transparent" />
      </div>


      {/* Section Header */}
      <div className="relative z-10 text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-3 sm:px-4">
        {/* Decorative element above title */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-[#324D3E]/50" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#324D3E]/70 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#324D3E]/50 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#324D3E]/70 rounded-full" />
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-[#324D3E]/50" />
        </div>
        
        <h2 className="imperial-script-regular text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-[#324D3E] mb-2 sm:mb-3 md:mb-4 drop-shadow-lg leading-tight">
          Frequently Asked Questions
        </h2>
        
        <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-[#324D3E]/80 font-light max-w-xl mx-auto leading-relaxed px-2">
          Everything you need to know
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 md:mt-4">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#324D3E]/70 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#324D3E]/50 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#324D3E]/70 rounded-full" />
        </div>
      </div>

      {/* FAQ content */}
      <div className="relative z-10 max-w-5xl mx-auto px-2 sm:px-3 md:px-6 lg:px-8">
        {/* Enhanced card with gradient glow */}
        <div className="relative bg-white/85 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border-2 border-[#324D3E]/35 shadow-[0_8px_32px_rgba(50,77,62,0.18)]">
          {/* Enhanced decorative corner accents */}
          <div className="absolute top-0 left-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 border-t-2 border-l-2 border-[#324D3E]/45 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 border-t-2 border-r-2 border-[#324D3E]/45 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 border-b-2 border-l-2 border-[#324D3E]/45 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 border-b-2 border-r-2 border-[#324D3E]/45 rounded-br-lg" />
          
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#E6CFC9]/15 via-transparent to-[#C2D3C3]/15 pointer-events-none" />
          
          {/* Card content */}
          <div className="relative p-2.5 sm:p-4 md:p-6 lg:p-8 xl:p-10 z-10">
            {/* FAQ items */}
            <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                return (
                  <div
                    key={index}
                    className="rounded-lg sm:rounded-xl border-2 border-[#324D3E]/25 bg-white/95 backdrop-blur-sm hover:border-[#324D3E]/40 transition-all duration-300 hover:shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group w-full px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#324D3E]/50 focus-visible:ring-offset-2 transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span className="font-semibold text-[#324D3E] pr-2 sm:pr-3 md:pr-4 text-xs sm:text-sm md:text-base lg:text-lg font-sans leading-snug sm:leading-relaxed transition-colors duration-200 group-hover:text-[#324D3E]/80">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-[#324D3E]/60 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} w-4 h-4 sm:w-5 sm:h-5`}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 bg-[#D9E5D7]/40 border-t border-[#324D3E]/20">
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className="text-[#324D3E]/90 leading-snug sm:leading-relaxed text-xs sm:text-sm md:text-base font-sans whitespace-pre-line">
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a 
                                href="#guest-list" 
                                className="text-[#324D3E] underline font-semibold hover:text-[#324D3E]/70 transition-colors"
                                onClick={(e) => {
                                  e.preventDefault()
                                  document.getElementById('guest-list')?.scrollIntoView({ behavior: 'smooth' })
                                }}
                              >
                                {item.answer.match(/\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/)?.[1]}
                              </a>
                              {item.answer.split("[/RSVP_LINK]")[1]}
                            </p>
                          ) : (
                            <p className="text-[#324D3E]/90 leading-snug sm:leading-relaxed text-xs sm:text-sm md:text-base font-sans whitespace-pre-line">
                              {item.answer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
