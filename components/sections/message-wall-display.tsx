"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
}

export default function MessageWallDisplay({ messages, loading }: MessageWallDisplayProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      setIsAnimating(true)
      // Stagger the animation of messages
      const timer = setTimeout(() => {
        setVisibleMessages(messages)
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setVisibleMessages([])
    }
  }, [messages])

  if (loading) {
    return (
      <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border border-[#324D3E]/20 shadow-lg bg-white/40 backdrop-blur-xl rounded-xl sm:rounded-2xl">
            <CardContent className="p-2.5 sm:p-3 md:p-4 lg:p-5">
              <div className="flex justify-between items-start mb-2 sm:mb-3 md:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                  <Skeleton className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#324D3E]/25 to-[#8EA58B]/20" />
                  <div className="space-y-1.5 sm:space-y-2">
                    <Skeleton className="h-3 w-20 sm:w-24 md:w-32 bg-[#324D3E]/20" />
                    <Skeleton className="h-2.5 w-16 sm:w-20 md:w-24 bg-[#8EA58B]/20" />
                  </div>
                </div>
                <div className="flex gap-1.5 sm:gap-2">
                  <Skeleton className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-[#324D3E]/25" />
                  <Skeleton className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-[#8EA58B]/20" />
                </div>
              </div>
              <Skeleton className="h-12 sm:h-14 md:h-16 w-full bg-gradient-to-r from-[#324D3E]/10 via-[#8EA58B]/10 to-transparent rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-6 sm:py-10 md:py-14 lg:py-16 xl:py-20 px-2 sm:px-4">
        <div className="relative inline-block mb-4 sm:mb-5 md:mb-6 lg:mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[#324D3E]/30 to-[#8EA58B]/20 rounded-full blur-xl scale-150 animate-pulse"></div>
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 bg-white/80 border border-[#324D3E]/20 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 text-[#324D3E]" />
          </div>
          {/* Outer decorative rings */}
          <div className="absolute -inset-2 sm:-inset-3 rounded-full border-2 border-[#8EA58B]/20 animate-ping"></div>
          <div className="absolute -inset-1.5 sm:-inset-2 rounded-full border border-[#A1857A]/30"></div>
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-playfair font-bold text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
          No Messages Yet
        </h3>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 font-lora max-w-md mx-auto leading-relaxed mb-4 sm:mb-5 md:mb-6">
          Be the first to share your heartfelt wishes for the happy couple!
        </p>
        <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-8 flex justify-center">
          <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#324D3E] animate-pulse" />
            <span className="text-[10px] sm:text-xs md:text-sm font-lora text-white/90">Your message will appear here</span>
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#8EA58B] animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-4">
      {visibleMessages.map((msg, index) => (
        <Card
          key={index}
          className={`relative border border-[#324D3E]/35 shadow-lg bg-white/45 backdrop-blur-2xl hover:shadow-2xl hover:border-[#324D3E]/60 transition-all duration-500 group overflow-hidden transform rounded-xl sm:rounded-2xl hover:scale-[1.01] ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            animation: isAnimating ? 'none' : 'fadeInUp 0.6s ease-out forwards',
            boxShadow: '0 4px 22px rgba(50, 77, 62, 0.18), 0 2px 10px rgba(0,0,0,0.08)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 32px rgba(50, 77, 62, 0.3), 0 6px 18px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 22px rgba(50, 77, 62, 0.18), 0 2px 10px rgba(0,0,0,0.08)';
          }}
        >
          {/* Enhanced card background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-[#8EA58B]/10 opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#324D3E]/35 via-[#8EA58B]/45 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          <div className="absolute -inset-[1px] rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: 'inset 0 0 0 1px rgba(50, 77, 62, 0.25)' }} />
          
          {/* Subtle shimmer effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {/* Decorative inner border */}
          <div className="absolute inset-2 sm:inset-3 rounded-xl pointer-events-none">
            {/* Main decorative border */}
            <div className="absolute inset-0 rounded-xl border border-white/30 group-hover:border-[#324D3E]/40 transition-colors duration-300"></div>
            
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#324D3E]/30 rounded-tl-xl group-hover:border-[#324D3E]/50 transition-colors duration-300"></div>
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#8EA58B]/30 rounded-tr-xl group-hover:border-[#8EA58B]/50 transition-colors duration-300"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#8EA58B]/30 rounded-bl-xl group-hover:border-[#8EA58B]/50 transition-colors duration-300"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white/40 rounded-br-xl group-hover:border-white/70 transition-colors duration-300"></div>
            
            {/* Gradient overlay on border */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#324D3E]/10 via-transparent to-[#8EA58B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Decorative dots at corners */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#324D3E]/40 rounded-full group-hover:bg-[#324D3E]/60 transition-colors duration-300"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#8EA58B]/40 rounded-full group-hover:bg-[#8EA58B]/60 transition-colors duration-300"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#8EA58B]/40 rounded-full group-hover:bg-[#8EA58B]/60 transition-colors duration-300"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white/60 rounded-full group-hover:bg-white transition-colors duration-300"></div>
          </div>
          
          <CardContent className="relative p-2.5 sm:p-3 md:p-4 lg:p-5">
            <div className="flex justify-between items-start mb-2 sm:mb-3 md:mb-4">
              <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                <div className="relative">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 bg-[#324D3E] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg ring-2 ring-white/60">
                    <span className="text-white font-lora text-xs sm:text-sm md:text-base font-semibold drop-shadow-sm">
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  {/* Enhanced avatar glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#324D3E]/35 via-[#8EA58B]/25 to-white/15 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-[#324D3E]/15 to-[#8EA58B]/15 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-20 animate-pulse"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-lora text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold truncate group-hover:text-white transition-colors duration-300">{msg.name}</h4>
                  <span className="text-[10px] sm:text-xs md:text-sm text-white/70 font-lora group-hover:text-white/90 transition-colors duration-300">
                    {new Date(msg.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Heart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#324D3E]/70 fill-transparent group-hover:fill-[#324D3E]/35 group-hover:text-[#324D3E] transition-all duration-300 group-hover:scale-110" />
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-[#8EA58B]/70 group-hover:text-[#8EA58B] transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              </div>
            </div>
            
            <div className="relative">
              <span className="absolute -left-0.5 -top-0.5 sm:-left-1 sm:-top-1 md:-left-2 md:-top-2 text-xl sm:text-2xl md:text-4xl text-white/30 font-playfair group-hover:text-white/55 transition-all duration-300 group-hover:scale-110">"</span>
              <p className="text-white/90 text-xs sm:text-sm md:text-base leading-snug sm:leading-relaxed pl-3 sm:pl-4 md:pl-6 font-lora group-hover:text-white transition-colors duration-300">{msg.message}</p>
              <span className="absolute -right-0.5 -bottom-0.5 sm:-right-1 sm:-bottom-1 md:-right-2 md:-bottom-2 text-xl sm:text-2xl md:text-4xl text-white/30 font-playfair group-hover:text-white/55 transition-all duration-300 group-hover:scale-110">"</span>
            </div>
            
            {/* Enhanced message bottom accent */}
            <div className="mt-2 sm:mt-3 md:mt-4 flex items-center justify-between">
              <div className="flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] text-white/70">
                <div className="w-1 h-1 rounded-full bg-[#324D3E]/60"></div>
                <div className="w-1 h-1 rounded-full bg-[#8EA58B]/60"></div>
                <div className="w-1 h-1 rounded-full bg-white/70"></div>
              </div>
              <div className="w-14 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-[#324D3E]/45 via-[#8EA58B]/55 to-transparent group-hover:via-[#324D3E]/70 group-hover:via-[#8EA58B]/80 transition-all duration-300"></div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
