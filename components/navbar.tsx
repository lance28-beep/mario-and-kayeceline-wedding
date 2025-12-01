"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/content/site"
import StaggeredMenu from "./StaggeredMenu"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#couple-video", label: "Pre-Wedding Film" },
  { href: "#gallery", label: "Gallery" },
  { href: "#entourage", label: "Entourage" },
  { href: "#messages", label: "Messages" },
  { href: "#details", label: "Details" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#faq", label: "FAQ" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("#home")

  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current != null) return
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null
        setIsScrolled(window.scrollY > 50)
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current)
      window.removeEventListener("scroll", onScroll as EventListener)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const sectionIds = navLinks.map(l => l.href.substring(1))
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))
        if (visible.length > 0) {
          const topMost = visible[0]
          if (topMost.target && topMost.target.id) {
            const newActive = `#${topMost.target.id}`
            setActiveSection(prev => (prev === newActive ? prev : newActive))
          }
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
      }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const menuItems = useMemo(() => navLinks.map((l) => ({ label: l.label, ariaLabel: `Go to ${l.label}`, link: l.href })), [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-700 ease-out ${
      isScrolled 
        ? 'bg-[#324D3E] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(50,77,62,0.45)] border-b border-white/10' 
        : 'bg-[#324D3E]/95 backdrop-blur-lg border-b border-white/5'
    }`}>
      {/* Elegant glow effect when scrolled */}
      {isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 pointer-events-none" />
      )}
      {/* Subtle texture overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          <Link href="#home" className="flex-shrink-0 group relative z-10">
            <div className="relative flex items-center">
              <Image
                src="/monogram/MK MONOGRAM.png"
                alt={`${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname} monogram`}
                width={80}
                height={80}
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto group-hover:scale-105 group-active:scale-100 transition-all duration-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)] group-hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                priority
              />
            </div>
            
            {/* Subtle background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E6CFC9]/0 via-[#E6CFC9]/20 to-[#E6CFC9]/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg -z-10" />
          </Link>

          <div className="hidden md:flex gap-1 items-center">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
              className={`px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium rounded-lg transition-all duration-500 relative group drop-shadow-md ${
                    isActive 
                      ? 'text-[#E6CFC9] bg-gradient-to-br from-white/10 via-[#324D3E]/40 to-white/10 backdrop-blur-md shadow-[0_4px_15px_rgba(50,77,62,0.45)] border border-white/30' 
                      : 'text-white/80 hover:text-white hover:bg-gradient-to-br hover:from-white/5 hover:via-[#324D3E]/30 hover:to-white/5 hover:backdrop-blur-md hover:border hover:border-white/20 hover:shadow-lg hover:scale-105 active:scale-95'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-white via-[#E6CFC9] to-white transition-all duration-500 rounded-full ${
                    isActive ? 'w-full shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'w-0 group-hover:w-full group-hover:shadow-[0_0_6px_rgba(255,255,255,0.6)]'
                  }`} />
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#E6CFC9] animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
                  )}
                  {/* Subtle accent on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </Link>
              )
            })}
          </div>

          <div className="md:hidden flex items-center h-full">
            {/* Decorative halo to improve tap target and visual affordance */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-white/20 via-[#324D3E]/30 to-transparent blur-md pointer-events-none" />
              <StaggeredMenu
                position="left"
                items={menuItems}
                socialItems={[]}
                displaySocials={false}
                displayItemNumbering={true}
                menuButtonColor="#E6CFC9"
                openMenuButtonColor="#324D3E"
                changeMenuColorOnOpen={true}
                colors={["#324D3E", "#486957", "#607F6E", "#A8C0AF", "#EDD6AC"]}
                accentColor="#324D3E"
                isFixed={true}
                onMenuOpen={() => {}}
                onMenuClose={() => {}}
              />
            </div>
          </div>
        </div>

      </div>
    </nav>
  )
}
