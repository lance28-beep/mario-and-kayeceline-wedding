"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { AudioProvider } from "@/contexts/audio-context"
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
  const enableDecor = process.env.NEXT_PUBLIC_ENABLE_DECOR !== 'false'

  return (
    <AudioProvider>
      <main className="relative">
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
      </main>
    </AudioProvider>
  )
}
