"use client"

import { useState } from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import { Heart, CreditCard, Smartphone, Banknote } from "lucide-react"

const paymentMethods = [
  {
    id: "paymaya",
    label: "PayMaya",
    description: "Scan via PayMaya app",
    accent: "from-[#E6CFC9] to-[#A1857A]",
    Icon: CreditCard,
  },
  {
    id: "gcash",
    label: "GCash",
    description: "Instant transfer via GCash",
    accent: "from-[#BCCFC0] to-[#8EA58B]",
    Icon: Smartphone,
  },
  {
    id: "metroBank",
    label: "MetroBank",
    description: "Direct bank transfer",
    accent: "from-[#E6CFC9] to-[#BCCFC0]",
    Icon: Banknote,
  },
] as const

type PaymentId = typeof paymentMethods[number]["id"]

const qrImageByMethod: Record<PaymentId, string | null> = {
  paymaya: "/QR/Maya.png",
  gcash: null,
  metroBank: null,
}

export function Registry() {
  const [activeMethod, setActiveMethod] = useState<PaymentId>("paymaya")

  const activeDetails = paymentMethods.find(method => method.id === activeMethod)

  return (
    <Section id="registry" className="relative overflow-hidden py-10 sm:py-12 md:py-16 lg:py-20">

      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#8EA58B]/40" />
          <div className="w-1.5 h-1.5 bg-[#A1857A]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#BCCFC0]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#A1857A]/60 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-[#8EA58B]/40" />
        </div>
        
        <h2 className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
          Gift Guide
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-light max-w-2xl mx-auto leading-relaxed px-2">
          Your presence is the greatest gift. Should you wish to give, a monetary gift to help us begin our new life together would mean so much to us.
        </p>
        
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-[#A1857A]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#BCCFC0]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#A1857A]/60 rounded-full" />
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="relative bg-[#D9E5D7] backdrop-blur-md border-2 border-[#324D3E]/30 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_8px_32px_rgba(50,77,62,0.12)] p-4 sm:p-6 md:p-8 overflow-hidden">
          {/* Enhanced decorative corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-t-2 border-l-2 border-[#324D3E]/40 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-t-2 border-r-2 border-[#324D3E]/40 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-b-2 border-l-2 border-[#324D3E]/40 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 border-b-2 border-r-2 border-[#324D3E]/40 rounded-br-lg" />
          
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#C2D3C3]/10 via-transparent to-[#E8F0E6]/10 pointer-events-none" />
          
          <div className="relative">
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-5 sm:mb-6">
              {paymentMethods.map(({ id, label, description, accent, Icon }) => {
                const isActive = id === activeMethod
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveMethod(id)}
                    className={`relative rounded-xl border-2 px-4 py-3 flex items-center gap-3 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      isActive
                        ? "border-[#324D3E] text-[#324D3E] shadow-lg bg-white"
                        : "border-[#324D3E]/30 bg-white/80 hover:border-[#324D3E]/50 hover:shadow-md text-[#324D3E]/80"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="text-left">
                      <p className="text-sm font-semibold tracking-wide uppercase">{label}</p>
                      <p className="text-[11px] text-[#324D3E]/70">{description}</p>
                    </div>
                  </button>
                )
              })}
            </div>

            {activeDetails && (
              <div className="relative bg-white/95 rounded-xl sm:rounded-2xl border-2 border-dashed border-[#324D3E]/30 p-5 sm:p-6 md:p-8 text-center">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D9E5D7] px-3 py-1 rounded-full shadow-sm border-2 border-[#324D3E]/40 text-xs font-semibold tracking-[0.2em] text-[#324D3E] uppercase">
                  {activeDetails.label}
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-56 h-56 sm:w-64 sm:h-64 border-2 border-dashed border-[#324D3E]/40 rounded-xl sm:rounded-2xl flex items-center justify-center bg-white relative overflow-hidden">
                    {qrImageByMethod[activeMethod] ? (
                      <Image
                        src={qrImageByMethod[activeMethod]!}
                        alt={`${activeDetails.label} QR code`}
                        fill
                        sizes="256px"
                        className="object-contain p-4"
                      />
                    ) : (
                      <span className="text-[#324D3E] text-sm sm:text-base font-medium">
                        {activeDetails.label} QR Placeholder
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-[#324D3E] max-w-md">
                    Tap the buttons above to switch between QR codes. Only one payment option is shown at a time for clarity.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-white italic">
            Thank you from the bottom of our hearts.
          </p>
        </div>
      </div>
    </Section>
  )
}
