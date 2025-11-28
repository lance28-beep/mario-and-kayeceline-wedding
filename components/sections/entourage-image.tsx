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


      {/* Entourage Image */}
      <div className="relative z-10 left-1/2 -translate-x-1/2 w-screen lg:static lg:left-auto lg:translate-x-0 lg:w-full lg:max-w-5xl lg:mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <Image
            src="/images/4.jpg"
            alt="Wedding Entourage and Principal Sponsors"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover"
            priority={false}
          />
        </motion.div>
      </div>
    </Section>
  )
}

