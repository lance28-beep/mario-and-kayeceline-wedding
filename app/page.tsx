"use client"

import { useState, useEffect } from "react"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { AudioProvider } from "@/contexts/audio-context"
import { AppState } from "@/lib/types"
import { LoadingScreen } from "@/components/LoadingScreen"
import { HeroLanding } from "@/components/HeroLanding"
import { Hero } from "@/components/sections/hero"
// import { Countdown } from "@/components/sections/countdown"
import { CoupleVideo } from "@/components/sections/couple-video"
import { WeddingTimeline } from "@/components/sections/wedding-timeline"
import { Gallery } from "@/components/sections/gallery"
import { Messages } from "@/components/sections/messages"
import { Details } from "@/components/sections/details"
import { EntourageImage } from "@/components/sections/entourage-image"
// import { BookOfGuests } from "@/components/sections/book-of-guests"
import { Registry } from "@/components/sections/registry"
import { FAQ } from "@/components/sections/faq"
import { SnapShare } from "@/components/sections/snap-share"
import { Footer } from "@/components/sections/footer"
import BackgroundMusic from "@/components/background-music"
import { RSVP } from "@/components/sections/rsvp"

const Silk = dynamic(() => import("@/components/silk"), { ssr: false })
// const GuestList = dynamic(() => import("@/components/sections/guest-list").then(mod => ({ default: mod.GuestList })), { ssr: false })

export default function Home() {
  const [appState, setAppState] = useState<AppState>(AppState.LOADING)
  const enableDecor = process.env.NEXT_PUBLIC_ENABLE_DECOR !== 'false'

  // Hide navbar during LOADING and LANDING states, show during DETAILS
  useEffect(() => {
    const navbar = document.querySelector('nav') as HTMLElement | null
    if (navbar) {
      if (appState === AppState.LOADING || appState === AppState.LANDING) {
        navbar.style.display = 'none'
      } else if (appState === AppState.DETAILS) {
        navbar.style.display = ''
      }
    }
  }, [appState])

  const handleLoadingComplete = () => {
    setAppState(AppState.LANDING)
  }

  const handleOpenInvitation = () => {
    setAppState(AppState.DETAILS)
    // Smooth scroll to top if needed, though component handles its own layout
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AudioProvider>
      <div className="relative min-h-screen bg-background text-foreground selection:bg-card selection:text-secondary overflow-hidden font-sans">
        
        {/* Loading Screen: Only mounted initially or during loading */}
        {appState === AppState.LOADING && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}

        {/* Main Content Area */}
        <main className="relative w-full h-full">
          
          {/* Landing Hero - Stays mounted but fades out to handle background transitions nicely */}
          <HeroLanding 
            onOpen={handleOpenInvitation} 
            visible={appState === AppState.LANDING} 
          />

          {/* Details Section - Main wedding content */}
          {appState === AppState.DETAILS && (
            <>
              {enableDecor && <BackgroundMusic />}
              {/* Silk Background Animation */}
              {enableDecor && (
                <div className="fixed inset-0 z-0 pointer-events-none">
                  <Suspense fallback={<div className="w-full h-full bg-gradient-to-b from-primary/10 to-secondary/5" />}>
                    <Silk speed={5} scale={1.1} color="#324D3E" noiseIntensity={0.8} rotation={0.3} />
                  </Suspense>
                </div>
              )}

              {/* Content */}
              <div className="relative z-10">
                <Hero />
                {/* <Countdown /> */}
                <CoupleVideo />
                <Gallery />
                <EntourageImage />
                <Messages />
                <Details />
                <WeddingTimeline />
                <RSVP />
                {/* <GuestList /> */}
                {/* <BookOfGuests /> */}
                <Registry />
                <FAQ />
                <SnapShare />
                <Footer />
              </div>
            </>
          )}
          
        </main>
      </div>
    </AudioProvider>
  )
}
