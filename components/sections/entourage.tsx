"use client"

import React from "react"
import { useState, useEffect, useMemo, useRef } from "react"
import { Loader2, Users } from "lucide-react"
import Image from "next/image"
import { Section } from "@/components/section"

interface EntourageMember {
  Name: string
  RoleCategory: string
  RoleTitle: string
  Email: string
}

const ROLE_CATEGORY_ORDER = [
  "The Couple",
  "Parents of the Groom",
  "Parents of the Bride",
  "Best Man",
  "Maid/Matron of Honor",
  "Candle Sponsors",
  "Veil Sponsors",
  "Cord Sponsors",
  "Groomsmen",
  "Bridesmaids",
  "Flower Girls",
  "Ring/Coin Bearers",
]

export function Entourage() {
  const [entourage, setEntourage] = useState<EntourageMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const fetchEntourage = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/entourage", { cache: "no-store" })
      if (!response.ok) {
        throw new Error("Failed to fetch entourage")
      }
      const data: EntourageMember[] = await response.json()
      setEntourage(data)
    } catch (error: any) {
      console.error("Failed to load entourage:", error)
      setError(error?.message || "Failed to load entourage")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEntourage()

    // Set up auto-refresh listener for dashboard updates
    const handleEntourageUpdate = () => {
      setTimeout(() => {
        fetchEntourage()
      }, 1000)
    }

    window.addEventListener("entourageUpdated", handleEntourageUpdate)

    return () => {
      window.removeEventListener("entourageUpdated", handleEntourageUpdate)
    }
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Group entourage by role category
  const grouped = useMemo(() => {
    const grouped: Record<string, EntourageMember[]> = {}
    
    entourage.forEach((member) => {
      const category = member.RoleCategory || "Other"
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(member)
    })
    
    return grouped
  }, [entourage])

  // Helper component for elegant section titles
  const SectionTitle = ({ 
    children,
    align = "center",
    className = ""
  }: { 
    children: React.ReactNode
    align?: "left" | "center" | "right"
    className?: string
  }) => {
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
      return (
        <h3 className={`relative text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold uppercase text-[#324D3E] mb-1.5 sm:mb-2 md:mb-3 tracking-[0.1em] sm:tracking-[0.15em] ${textAlign} ${className} drop-shadow-sm transition-all duration-300`}>
          <span className="relative inline-block">
            {children}
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] sm:h-[2px] bg-gradient-to-r from-transparent via-[#324D3E]/40 to-transparent" />
          </span>
        </h3>
      )
  }

  // Helper component for name items with role title (supports alignment)
  const NameItem = ({
    member,
    align = "center",
    showRole = true,
  }: {
    member: EntourageMember
    align?: "left" | "center" | "right"
    showRole?: boolean
  }) => {
    const containerAlign =
      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <div className={`relative flex flex-col ${containerAlign} justify-center py-1 sm:py-1.5 md:py-2.5 leading-snug sm:leading-relaxed group/item transition-all duration-300 hover:scale-[1.02] sm:hover:scale-[1.03]`}>
        {/* Hover highlight effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#324D3E]/0 via-[#324D3E]/10 to-[#324D3E]/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-md" />
        
        <p className={`relative text-[#324D3E] text-[11px] sm:text-[13px] md:text-sm lg:text-base font-semibold ${textAlign} group-hover/item:text-[#324D3E]/80 transition-all duration-300 drop-shadow-sm`}>
          {member.Name}
        </p>
        {showRole && member.RoleTitle && (
          <p className={`relative text-[#324D3E]/70 text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs font-medium mt-0.5 leading-tight sm:leading-snug ${textAlign} tracking-wide uppercase group-hover/item:text-[#324D3E] transition-colors duration-300`}>
            {member.RoleTitle}
          </p>
        )}
      </div>
    )
  }

  // Helper component for two-column layout wrapper
  const TwoColumnLayout = ({ 
    children, 
    leftTitle, 
    rightTitle,
    singleTitle,
    centerContent = false 
  }: { 
    children: React.ReactNode
    leftTitle?: string
    rightTitle?: string
    singleTitle?: string
    centerContent?: boolean
  }) => {
    if (singleTitle) {
      return (
        <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8">
          <SectionTitle>{singleTitle}</SectionTitle>
          <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 gap-y-1 sm:gap-y-1.5 md:gap-y-2 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
            {children}
          </div>
        </div>
      )
    }

    return (
      <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8">
        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 mb-1.5 sm:mb-2 md:mb-3">
          {leftTitle && (
            <SectionTitle align="right" className="pr-2 sm:pr-3 md:pr-4">{leftTitle}</SectionTitle>
          )}
          {rightTitle && (
            <SectionTitle align="left" className="pl-2 sm:pl-3 md:pl-4">{rightTitle}</SectionTitle>
          )}
        </div>
        <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 gap-y-1 sm:gap-y-1.5 md:gap-y-2 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <Section
      id="entourage"
      className="relative min-h-screen overflow-hidden"
    >

      {/* Section Header */}
      <div ref={sectionRef} className={`relative z-10 text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-3 sm:px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        {/* Decorative element above title */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-white/50" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/70 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/50 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/70 rounded-full" />
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-white/50" />
        </div>
        
        <h2 className="imperial-script-regular text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-lg leading-tight">
          Wedding Entourage
        </h2>
        
        <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-white font-light max-w-xl mx-auto leading-relaxed px-2">
          Those who stand with us as we begin our journey
        </p>
        
        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 md:mt-4">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/70 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/50 rounded-full" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/70 rounded-full" />
        </div>
      </div>

      {/* Central Card Container */}
      <div className={`relative z-10 max-w-5xl mx-auto px-2 sm:px-3 md:px-6 lg:px-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Enhanced card with gradient glow */}
        <div className="relative bg-white/80 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border-2 border-[#324D3E]/30 shadow-[0_8px_32px_rgba(50,77,62,0.15)]">
          {/* Card content */}
          <div className="relative p-2.5 sm:p-4 md:p-6 lg:p-8 xl:p-10 z-10">
            {isLoading ? (
              <div className="flex items-center justify-center py-24 sm:py-28 md:py-32">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin text-[#324D3E]" />
                  <span className="text-[#324D3E]/70 font-serif text-base sm:text-lg">Loading entourage...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-24 sm:py-28 md:py-32">
                <div className="text-center">
                  <p className="text-red-600 font-serif text-base sm:text-lg mb-3">{error}</p>
                  <button
                    onClick={fetchEntourage}
                    className="text-[#324D3E] hover:text-[#324D3E]/80 font-serif underline transition-colors duration-200"
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : entourage.length === 0 ? (
              <div className="text-center py-24 sm:py-28 md:py-32">
                <Users className="h-14 w-14 sm:h-16 sm:w-16 text-[#324D3E]/30 mx-auto mb-4" />
                <p className="text-[#324D3E]/60 font-serif text-base sm:text-lg">No entourage members yet</p>
              </div>
            ) : (
            <>
              {ROLE_CATEGORY_ORDER.map((category, categoryIndex) => {
                const members = grouped[category] || []
                
                if (members.length === 0) return null

                // Special handling for The Couple - display Bride and Groom side by side
                if (category === "The Couple") {
                   const groom = members.find(m => m.RoleTitle?.toLowerCase().includes('groom'))
                  const bride = members.find(m => m.RoleTitle?.toLowerCase().includes('bride'))
                  
                  return (
                    <div key={category}>
                      {categoryIndex > 0 && (
                        <div className="flex justify-center py-2 sm:py-3 md:py-4 mb-3 sm:mb-4 md:mb-6">
                          <div className="flex items-center gap-1.5 sm:gap-2 w-full max-w-md">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#324D3E]/50 to-[#324D3E]/70"></div>
                            <div className="flex items-center gap-1 sm:gap-1.5">
                              <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#324D3E]/70 rounded-full" />
                              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#324D3E]/90 rounded-full" />
                              <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#324D3E]/70 rounded-full" />
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#324D3E]/50 to-[#324D3E]/70"></div>
                          </div>
                        </div>
                      )}
                      <TwoColumnLayout singleTitle="The Couple" centerContent={true}>
                        <div className="px-2 sm:px-3 md:px-4">
                          {groom && <NameItem member={groom} align="right" />}
                        </div>
                        <div className="px-2 sm:px-3 md:px-4">
                          {bride && <NameItem member={bride} align="left" />}
                        </div>
                      </TwoColumnLayout>
                    </div>
                  )
                }

                // Special handling for Parents sections - combine into single two-column layout
                if (category === "Parents of the Bride" || category === "Parents of the Groom") {
                  // Get both parent groups
                  const parentsBride = grouped["Parents of the Bride"] || []
                  const parentsGroom = grouped["Parents of the Groom"] || []
                  
                  // Helper function to sort parents: father first, then mother
                  const sortParents = (members: EntourageMember[]) => {
                    return [...members].sort((a, b) => {
                      const aIsFather = a.RoleTitle?.toLowerCase().includes('father') ?? false
                      const bIsFather = b.RoleTitle?.toLowerCase().includes('father') ?? false
                      
                      // Father comes first
                      if (aIsFather && !bIsFather) return -1
                      if (!aIsFather && bIsFather) return 1
                      return 0
                    })
                  }
                  
                  // Only render once (when processing "Parents of the Groom")
                  if (category === "Parents of the Groom") {
                    return (
                      <div key="Parents">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-3 sm:py-4 md:py-5 mb-5 sm:mb-6 md:mb-8">
                            <div className="flex items-center gap-2 w-full max-w-md">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#324D3E]/50 to-[#324D3E]/70"></div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-1 h-1 bg-[#324D3E]/70 rounded-full" />
                            <div className="w-1.5 h-1.5 bg-[#324D3E]/90 rounded-full" />
                            <div className="w-1 h-1 bg-[#324D3E]/70 rounded-full" />
                          </div>
                          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#324D3E]/50 to-[#324D3E]/70"></div>
                            </div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Parents of the Groom" rightTitle="Parents of the Bride">
                          {(() => {
                            const leftArr = sortParents(parentsGroom)
                            const rightArr = sortParents(parentsBride)
                            const maxLen = Math.max(leftArr.length, rightArr.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const left = leftArr[i]
                              const right = rightArr[i]
                              rows.push(
                                <React.Fragment key={`parents-row-${i}`}>
                                  <div key={`parent-groom-${i}`} className="px-2 sm:px-3 md:px-4">
                                    {left ? <NameItem member={left} align="right" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                  </div>
                                  <div key={`parent-bride-${i}`} className="px-2 sm:px-3 md:px-4">
                                    {right ? <NameItem member={right} align="left" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Parents of the Bride" since it's already rendered above
                  return null
                }

                // Special handling for Maid/Matron of Honor and Best Man - combine into single two-column layout
                if (category === "Maid/Matron of Honor" || category === "Best Man") {
                  // Get both honor attendant groups
                  const maidOfHonor = grouped["Maid/Matron of Honor"] || []
                  const bestMan = grouped["Best Man"] || []
                  
                  // Only render once (when processing "Best Man")
                  if (category === "Best Man") {
                    return (
                      <div key="HonorAttendants">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-3 sm:py-4 md:py-5 mb-5 sm:mb-6 md:mb-8">
                            <div className="flex items-center gap-2 w-full max-w-md">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#324D3E]/50 to-[#324D3E]/70"></div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-1 h-1 bg-[#324D3E]/70 rounded-full" />
                            <div className="w-1.5 h-1.5 bg-[#324D3E]/90 rounded-full" />
                            <div className="w-1 h-1 bg-[#324D3E]/70 rounded-full" />
                          </div>
                          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#324D3E]/50 to-[#324D3E]/70"></div>
                            </div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Best Man" rightTitle="Maid/Matron of Honor">
                          {(() => {
                            const maxLen = Math.max(bestMan.length, maidOfHonor.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const left = bestMan[i]
                              const right = maidOfHonor[i]
                              rows.push(
                                <React.Fragment key={`honor-row-${i}`}>
                                  <div key={`bestman-cell-${i}`} className="px-2 sm:px-3 md:px-4">
                                    {left ? <NameItem member={left} align="right" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                  </div>
                                  <div key={`maid-cell-${i}`} className="px-2 sm:px-3 md:px-4">
                                    {right ? <NameItem member={right} align="left" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Maid/Matron of Honor" since it's already rendered above
                  return null
                }

                // Special handling for Bridesmaids and Groomsmen - combine into single two-column layout
                if (category === "Bridesmaids" || category === "Groomsmen") {
                  // Get both bridal party groups
                  const bridesmaids = grouped["Bridesmaids"] || []
                  const groomsmen = grouped["Groomsmen"] || []
                  
                  // Only render once (when processing "Bridesmaids")
                  if (category === "Bridesmaids") {
                    return (
                      <div key="BridalParty">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-3 sm:py-4 md:py-5 mb-5 sm:mb-6 md:mb-8">
                            <div className="flex items-center gap-2 w-full max-w-md">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#324D3E]/50 to-[#324D3E]/70"></div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-1 h-1 bg-[#324D3E]/70 rounded-full" />
                            <div className="w-1.5 h-1.5 bg-[#324D3E]/90 rounded-full" />
                            <div className="w-1 h-1 bg-[#324D3E]/70 rounded-full" />
                          </div>
                          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#324D3E]/50 to-[#324D3E]/70"></div>
                            </div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Groomsmen" rightTitle="Bridesmaids">
                          {(() => {
                            const maxLen = Math.max(bridesmaids.length, groomsmen.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const groomsman = groomsmen[i]
                              const bridesmaid = bridesmaids[i]
                              rows.push(
                                <React.Fragment key={`bridal-row-${i}`}>
                                  <div key={`groomsman-cell-${i}`} className="px-2 sm:px-3 md:px-4">
                                    {groomsman ? <NameItem member={groomsman} align="right" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                  </div>
                                  <div key={`bridesmaid-cell-${i}`} className="px-2 sm:px-3 md:px-4">
                                    {bridesmaid ? <NameItem member={bridesmaid} align="left" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Groomsmen" since it's already rendered above
                  return null
                }

                // Special handling for Candle/Veil Sponsors sections - combine into single two-column layout
                if (category === "Candle Sponsors" || category === "Veil Sponsors") {
                  // Get both sponsor groups
                  const candleSponsors = grouped["Candle Sponsors"] || []
                  const veilSponsors = grouped["Veil Sponsors"] || []
                  
                  // Only render once (when processing "Candle Sponsors")
                  if (category === "Candle Sponsors") {
                    return (
                      <div key="Sponsors">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-3 sm:py-4 md:py-5 mb-5 sm:mb-6 md:mb-8">
                            <div className="flex items-center gap-2 w-full max-w-md">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#324D3E]/50 to-[#324D3E]/70"></div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-1 h-1 bg-[#324D3E]/70 rounded-full" />
                            <div className="w-1.5 h-1.5 bg-[#324D3E]/90 rounded-full" />
                            <div className="w-1 h-1 bg-[#324D3E]/70 rounded-full" />
                          </div>
                          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#324D3E]/50 to-[#324D3E]/70"></div>
                            </div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Candle Sponsors" rightTitle="Veil Sponsors">
                          {(() => {
                            const maxLen = Math.max(candleSponsors.length, veilSponsors.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const left = candleSponsors[i]
                              const right = veilSponsors[i]
                              rows.push(
                                <React.Fragment key={`sponsors-row-${i}`}>
                                  <div key={`candle-cell-${i}`} className="px-2 sm:px-3 md:px-4">
                                    {left ? <NameItem member={left} align="right" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                  </div>
                                  <div key={`veil-cell-${i}`} className="px-2 sm:px-3 md:px-4">
                                    {right ? <NameItem member={right} align="left" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Veil Sponsors" since it's already rendered above
                  return null
                }

                // Default: single title, centered content
                return (
                  <div key={category}>
                    {categoryIndex > 0 && (
                      <div className="flex justify-center py-3 sm:py-4 md:py-5 mb-5 sm:mb-6 md:mb-8">
                        <div className="flex items-center gap-2 w-full max-w-md">
                          <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-[#324D3E]/50 to-[#324D3E]"></div>
                          <div className="w-1.5 h-1.5 bg-[#324D3E] rounded-full"></div>
                          <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-[#324D3E]/50 to-[#324D3E]"></div>
                        </div>
                      </div>
                    )}
                    <TwoColumnLayout singleTitle={category} centerContent={true}>
                      {(() => {
                        const SINGLE_COLUMN_SECTIONS = new Set([
                          "Best Man",
                          "Maid/Matron of Honor",
                          "Ring Bearer",
                          "Coin Bearer",
                          "Bible Bearer",
                          "Presider",
                        ])
                        // Special rule: Cord Sponsors with exactly 2 names should be displayed as two columns meeting at center
                        if (category === "Cord Sponsors" && members.length === 2) {
                          const left = members[0]
                          const right = members[1]
                          return (
                            <>
                              <div className="px-2 sm:px-3 md:px-4">
                                <NameItem member={left} align="right" />
                              </div>
                              <div className="px-2 sm:px-3 md:px-4">
                                <NameItem member={right} align="left" />
                              </div>
                            </>
                          )
                        }
                        if (SINGLE_COLUMN_SECTIONS.has(category) || members.length <= 2) {
                          return (
                            <div className="col-span-full">
                              <div className="max-w-sm mx-auto flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
                                {members.map((member, idx) => (
                                  <NameItem key={`${category}-${idx}-${member.Name}`} member={member} align="center" />
                                ))}
                              </div>
                            </div>
                          )
                        }
                        // Default two-column sections: render row-by-row pairs to keep alignment on small screens
                        const half = Math.ceil(members.length / 2)
                        const left = members.slice(0, half)
                        const right = members.slice(half)
                        const maxLen = Math.max(left.length, right.length)
                        const rows = []
                        for (let i = 0; i < maxLen; i++) {
                          const l = left[i]
                          const r = right[i]
                          rows.push(
                            <React.Fragment key={`${category}-row-${i}`}>
                              <div key={`${category}-cell-left-${i}`} className="px-2 sm:px-3 md:px-4">
                                {l ? <NameItem member={l} align="right" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                              </div>
                              <div key={`${category}-cell-right-${i}`} className="px-2 sm:px-3 md:px-4">
                                {r ? <NameItem member={r} align="left" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                              </div>
                            </React.Fragment>
                          )
                        }
                        return rows
                      })()}
                    </TwoColumnLayout>
                  </div>
                )
              })}
              
              {/* Display any other categories not in the ordered list */}
              {Object.keys(grouped).filter(cat => !ROLE_CATEGORY_ORDER.includes(cat)).map((category) => {
                const members = grouped[category]
                return (
                  <div key={category}>
                    <div className="flex justify-center py-3 sm:py-4 md:py-5 mb-5 sm:mb-6 md:mb-8">
                      <div className="flex items-center gap-2 w-full max-w-md">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#324D3E]/50 to-[#324D3E]/70"></div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-1 h-1 bg-[#324D3E]/70 rounded-full" />
                            <div className="w-1.5 h-1.5 bg-[#324D3E]/90 rounded-full" />
                            <div className="w-1 h-1 bg-[#324D3E]/70 rounded-full" />
                          </div>
                          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#324D3E]/50 to-[#324D3E]/70"></div>
                      </div>
                    </div>
                    <TwoColumnLayout singleTitle={category} centerContent={true}>
                      {(() => {
                        if (members.length <= 2) {
                          return (
                            <div className="col-span-full">
                              <div className="max-w-sm mx-auto flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
                                {members.map((member, idx) => (
                                  <NameItem key={`${category}-${idx}-${member.Name}`} member={member} align="center" />
                                ))}
                              </div>
                            </div>
                          )
                        }
                        // Pair row-by-row for other categories as well
                        const half = Math.ceil(members.length / 2)
                        const left = members.slice(0, half)
                        const right = members.slice(half)
                        const maxLen = Math.max(left.length, right.length)
                        const rows = []
                        for (let i = 0; i < maxLen; i++) {
                          const l = left[i]
                          const r = right[i]
                          rows.push(
                            <React.Fragment key={`${category}-row-${i}`}>
                              <div key={`${category}-cell-left-${i}`} className="px-2 sm:px-3 md:px-4">
                                {l ? <NameItem member={l} align="right" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                              </div>
                              <div key={`${category}-cell-right-${i}`} className="px-2 sm:px-3 md:px-4">
                                {r ? <NameItem member={r} align="left" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                              </div>
                            </React.Fragment>
                          )
                        }
                        return rows
                      })()}
                    </TwoColumnLayout>
                  </div>
                )
              })}
            </>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}