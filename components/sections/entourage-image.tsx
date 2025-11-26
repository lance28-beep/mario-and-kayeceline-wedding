"use client"

import Image from "next/image"
import { Section } from "@/components/section"
import { motion } from "motion/react"

export function EntourageImage() {
  return (
    <Section
      id="entourage"
      className="relative bg-[#D9E5D7] py-8 sm:py-10 md:py-12 lg:py-16 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#E6CFC9]/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#E6CFC9]/15 to-transparent" />
      </div>

      {/* Corner decorations */}
      <img
        src="/decoration/corner-down-left.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-0 left-0 w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 opacity-90"
        loading="lazy"
      />
      <img
        src="/decoration/corner-down-left.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-0 right-0 w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 opacity-90 scale-x-[-1]"
        loading="lazy"
      />
      <img
        src="/decoration/top-right-corner.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-0 right-0 w-40 sm:w-56 md:w-72 lg:w-80 xl:w-96 opacity-95"
        loading="lazy"
      />
      <img
        src="/decoration/top-right-corner.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-0 left-0 w-40 sm:w-56 md:w-72 lg:w-80 xl:w-96 opacity-95 scale-x-[-1]"
        loading="lazy"
      />

      {/* Entourage Image */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <Image
              src="/decoration/entourage.png"
              alt="Wedding Entourage and Principal Sponsors"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl"
              priority={false}
            />
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

