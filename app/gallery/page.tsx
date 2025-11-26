import fs from "fs/promises"
import path from "path"
import Link from "next/link"
import MasonryGallery from "@/components/masonry-gallery"
import { GalleryQRSection } from "@/components/gallery-qr-section"

// Generate on each request so newly added images in public/ appear without a rebuild
export const dynamic = "force-dynamic"

async function getImagesFrom(dir: string) {
  const abs = path.join(process.cwd(), "public", dir)
  try {
    const entries = await fs.readdir(abs, { withFileTypes: true })
    return entries
      .filter((e) => e.isFile())
      .map((e) => `/${dir}/${e.name}`)
      .filter((p) => p.match(/\.(jpe?g|png|webp|gif)$/i))
      .sort((a, b) => a.localeCompare(b))
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const [desktop, mobile, frontGallery] = await Promise.all([
    getImagesFrom("desktop-background"),
    getImagesFrom("mobile-background"),
    getImagesFrom("FrontGallery"),
  ])
  const images = [
    ...desktop.map((src) => ({ src, category: "desktop" as const })),
    ...mobile.map((src) => ({ src, category: "mobile" as const })),
    ...frontGallery.map((src) => ({ src, category: "front" as const })),
  ]

  return (
    <main className="min-h-screen bg-[#D9E5D7] relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays with new color palette */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#E6CFC9]/25 via-[#E6CFC9]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#E6CFC9]/25 via-[#E6CFC9]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#D9E5D7]/40 via-transparent to-[#D9E5D7]/40" />
        
        {/* Floating decorative circles with new colors */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#E6CFC9]/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-20 right-16 w-24 h-24 bg-[#E6CFC9]/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-16 left-20 w-28 h-28 bg-[#E6CFC9]/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-24 right-12 w-20 h-20 bg-[#E6CFC9]/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#D9E5D7]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Decorative lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E6CFC9]/30 to-transparent" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
          {/* Decorative element above title */}
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#9B7C6A]/50" />
            <div className="w-1.5 h-1.5 bg-[#E6CFC9]/70 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#FCB8B5]/70 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#E6CFC9]/70 rounded-full" />
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#9B7C6A]/50" />
          </div>
          
          <h1 className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-[#9B7C6A] mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
            Gallery
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#9B7C6A]/90 font-light max-w-xl mx-auto leading-relaxed px-2">
            A collection from our favorite moments
          </p>
          
          {/* Decorative element below subtitle */}
          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            <div className="w-1.5 h-1.5 bg-[#E6CFC9]/70 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#FCB8B5]/70 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#E6CFC9]/70 rounded-full" />
          </div>
        </div>

        {images.length === 0 ? (
          <div className="text-center text-[#9B7C6A]/90">
            <p className="font-light">
              No images found. Add files to{" "}
              <code className="px-2 py-1 bg-[#D9E5D7]/80 rounded border border-[#9B7C6A]/30 text-[#9B7C6A]">
                public/desktop-background
              </code>{" "}
              ,{" "}
              <code className="px-2 py-1 bg-[#D9E5D7]/80 rounded border border-[#9B7C6A]/30 text-[#9B7C6A]">
                public/mobile-background
              </code>{" "}
              or{" "}
              <code className="px-2 py-1 bg-[#D9E5D7]/80 rounded border border-[#9B7C6A]/30 text-[#9B7C6A]">
                public/FrontGallery
              </code>
              .
            </p>
          </div>
        ) : (
          <MasonryGallery images={images} />
        )}

        {/* CTA Section */}
        <div className="mt-8 sm:mt-12 md:mt-16 text-center">
          <div className="bg-[#D9E5D7]/98 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-[#E6CFC9]/50 max-w-2xl mx-auto shadow-[0_8px_32px_rgba(255,189,135,0.15)] hover:shadow-[0_12px_40px_rgba(255,189,135,0.25)] transition-all duration-300">
            {/* Corner accents */}
            <div className="relative">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#E6CFC9]/50 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#E6CFC9]/50 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#E6CFC9]/50 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#E6CFC9]/50 rounded-br-lg" />
              
              <h2 className="font-playfair text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#9B7C6A] mb-2 sm:mb-4 drop-shadow-md">
                Help us capture every smile!
              </h2>
              <p className="text-[#9B7C6A]/90 font-light text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed px-2">
                Upload your snapshots and be part of our wedding album and be featured in this gallery.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#E6CFC9]/30 border-2 border-[#E6CFC9]/40 rounded-full text-[#9B7C6A] font-semibold text-xs sm:text-sm md:text-base shadow-md">
                  #JulaineAndCristopher
                </span>
              </div>
              <Link
                href="/#snap-share"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-[#E6CFC9] to-[#FCB8B5] text-white font-semibold text-xs sm:text-sm md:text-base rounded-full hover:from-[#E6CFC9]/90 hover:to-[#FCB8B5]/90 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Learn More About Sharing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


