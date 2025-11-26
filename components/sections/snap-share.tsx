"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Share2, Copy, Check, Download } from "lucide-react"
import { Section } from "@/components/section"
import { QRCodeCanvas } from "qrcode.react"
import { siteConfig } from "@/content/site"

export function SnapShare() {
  const [copiedHashtag, setCopiedHashtag] = useState(false)
  const [copiedDriveQR, setCopiedDriveQR] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const googleDriveUrl = siteConfig.snapShare?.googleDriveLink || ""
  const hashtags = ["#JUNfoundTheKAYEtoForever"]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedHashtag(true)
      setTimeout(() => setCopiedHashtag(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const downloadDriveQRCode = () => {
    const canvas = document.getElementById("drive-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "drive-qr.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const copyDriveLink = async () => {
    if (googleDriveUrl) {
      try {
        await navigator.clipboard.writeText(googleDriveUrl)
        setCopiedDriveQR(true)
        setTimeout(() => setCopiedDriveQR(false), 2000)
      } catch (err) {
        console.error("Failed to copy: ", err)
      }
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <Section id="snap-share" className="relative bg-transparent py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 overflow-hidden">

      <div className="relative max-w-6xl mx-auto px-3 sm:px-4 md:px-6 z-10">
        <motion.div
          className="text-center mb-6 sm:mb-7 md:mb-9"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Decorative element above title */}
          <div className="flex items-center justify-center gap-2 mb-2.5 sm:mb-3">
            <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
            <div className="w-8 sm:w-12 md:w-16 h-px bg-white/40" />
          </div>
          
          <h2 className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-2 sm:mb-3 drop-shadow-lg leading-tight">
            Snap & Share
          </h2>
          
          <p className="text-xs sm:text-sm md:text-base text-white/90 font-light max-w-2xl mx-auto leading-relaxed px-2">
            Upload your photos and videos from the reception by scanning the QR code below,
            creating a folder with your name, and sharing every joyful snap with us.
          </p>
          
          {/* Decorative element below subtitle */}
          <div className="flex items-center justify-center gap-2 mt-2.5 sm:mt-3">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4" variants={staggerChildren} initial="initial" animate="animate">
          <motion.div
            className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-[#8EA58B]/40 hover:shadow-[0_10px_50px_rgba(131,146,125,0.3)] transition-all duration-300"
            variants={fadeInUp}
            whileHover={{ y: -2 }}
          >
            <div className="relative p-3 sm:p-4 md:p-5">
              {/* Corner accents */}
              <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-l-2 border-[#8EA58B]/50 rounded-tl-lg" />
              <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-[#8EA58B]/50 rounded-tr-lg" />
              <div className="absolute bottom-0.5 left-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-[#8EA58B]/50 rounded-bl-lg" />
              <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-r-2 border-[#8EA58B]/50 rounded-br-lg" />
              <div className="text-center">
                <div className="space-y-2 mb-3">
                  {hashtags.map((hashtag) => (
                    <div key={hashtag} className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-[#BCCFC0]/10 to-[#8EA58B]/15 px-3 py-2 sm:py-2.5 rounded-lg shadow-md border border-[#BCCFC0]/25 w-full sm:w-auto mx-auto">
                      <span className="font-lora text-sm sm:text-base md:text-lg font-bold text-[#8EA58B] break-all sm:break-normal tracking-wide">{hashtag}</span>
                      <button
                        onClick={() => copyToClipboard(hashtag)}
                        className="p-1 sm:p-1.5 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 shadow-sm flex-shrink-0 ring-1 ring-[#8EA58B]/40"
                        title="Copy hashtag"
                      >
                        {copiedHashtag ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#BCCFC0]" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8EA58B]/60" />}
                      </button>
                    </div>
                  ))}
                </div>
                <p className="font-lora text-[#8EA58B] text-[10px] sm:text-xs md:text-sm mb-2.5">Use these hashtags on your posts to be featured in our gallery.</p>
              </div>

              <div className="mt-4 sm:mt-5">
                <h4 className="font-playfair text-sm sm:text-base md:text-lg font-bold text-[#8EA58B] mb-2.5 sm:mb-3 text-center">Our Favorite Moments</h4>
                {/* Two squares on top, one landscape below */}
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  <motion.div className="relative aspect-square rounded-lg overflow-hidden shadow-md ring-1 ring-[#8EA58B]/40" whileHover={{ scale: 1.03 }} transition={{ duration: 0.25 }}>
                    <Image src="/desktop-background/couple (1).jpeg" alt="Favorite moment 1" fill className="object-cover" />
                  </motion.div>
                  <motion.div className="relative aspect-square rounded-lg overflow-hidden shadow-md ring-1 ring-[#8EA58B]/40" whileHover={{ scale: 1.03 }} transition={{ duration: 0.25 }}>
                    <Image src="/desktop-background/couple (2).jpeg" alt="Favorite moment 2" fill className="object-cover" />
                  </motion.div>
                  <motion.div className="relative col-span-2 aspect-[3/2] rounded-lg overflow-hidden shadow-md ring-1 ring-[#8EA58B]/40" whileHover={{ scale: 1.02 }} transition={{ duration: 0.25 }}>
                    <Image src="/desktop-background/couple (4).jpg" alt="Favorite moment 3" fill className="object-cover" />
                  </motion.div>
                </div>
                <p className="font-lora text-[#8EA58B] text-[9px] sm:text-[10px] md:text-xs text-center mt-2 sm:mt-2.5 px-2">Share your photos using our hashtag to be featured here!</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="space-y-3 sm:space-y-4" variants={fadeInUp}>
            {/* Google Drive QR Code Section */}
            {googleDriveUrl && (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-[#8EA58B]/40 hover:shadow-[0_10px_50px_rgba(131,146,125,0.3)] transition-all duration-300 overflow-hidden">
                <div className="relative p-3 sm:p-4 md:p-5">
                  {/* Corner accents */}
                  <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-l-2 border-[#8EA58B]/50 rounded-tl-lg" />
                  <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-[#8EA58B]/50 rounded-tr-lg" />
                  <div className="absolute bottom-0.5 left-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-[#8EA58B]/50 rounded-bl-lg" />
                  <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-r-2 border-[#8EA58B]/50 rounded-br-lg" />
                  
                  {/* Header with icon */}
                  <div className="flex items-center justify-center gap-2 sm:gap-2.5 mb-2 sm:mb-2.5">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#BCCFC0] to-[#8EA58B] flex items-center justify-center flex-shrink-0 shadow-md">
                      <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
                    </div>
                    <h4 className="font-playfair text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#8EA58B]">Upload Your Photos & Videos</h4>
                  </div>
                  
                  {/* Instructions */}
                  <p className="font-lora text-[#8EA58B]/70 text-[10px] sm:text-xs md:text-sm mb-3 sm:mb-4 px-2 leading-relaxed text-center">
                    {siteConfig.snapShare?.instructions ||
                      "Please scan this QR Code, create a folder with your name and upload the photos and videos you have taken during our wedding reception. We are delighted to see your snaps too!"}
                  </p>
                  
                  {/* Enhanced QR container with larger QR */}
                  <div className="mx-auto max-w-xs">
                    <div className="text-center mb-1">
                      <span className="inline-flex items-center justify-center rounded-full border border-[#8EA58B]/40 px-3 py-1 text-[10px] sm:text-xs font-lora text-[#8EA58B]/80 uppercase tracking-[0.3em]">
                        QR
                      </span>
                    </div>
                    <div className="bg-gradient-to-br from-[#BCCFC0]/10 via-white to-[#8EA58B]/10 p-3 sm:p-4 rounded-2xl shadow-lg border border-[#8EA58B]/30 mb-3 sm:mb-4">
                      <div className="bg-white p-2.5 sm:p-3 rounded-xl shadow-inner">
                        <div className="relative mx-auto w-fit">
                          <QRCodeCanvas 
                            id="drive-qr" 
                            value={googleDriveUrl} 
                            size={isMobile ? 140 : 200} 
                            includeMargin={true}
                            level="H"
                            className="bg-white rounded-lg"
                          />
                          {/* Decorative corners on QR */}
                          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#BCCFC0] rounded-tl" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#BCCFC0] rounded-tr" />
                          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#BCCFC0] rounded-bl" />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#BCCFC0] rounded-br" />
                        </div>
                      </div>
                      
                      {/* Scan instruction */}
                      <p className="text-center mt-2 sm:mt-2.5 text-[9px] sm:text-[10px] md:text-xs text-[#8EA58B]/60 font-lora">
                        📱 Scan with your camera app
                      </p>
                    </div>
                    
                    {/* Action buttons - improved layout */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={downloadDriveQRCode}
                          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-[10px] sm:text-xs md:text-sm bg-gradient-to-r from-[#BCCFC0] to-[#BCCFC0]/90 text-white hover:from-[#BCCFC0]/90 hover:to-[#BCCFC0]/80 font-medium"
                        >
                          <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span className="font-lora">Download</span>
                        </button>
                        
                        <button
                          onClick={copyDriveLink}
                          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-[10px] sm:text-xs md:text-sm border-2 border-[#8EA58B]/40 hover:border-[#8EA58B]/60 bg-white hover:bg-[#8EA58B]/5 font-medium"
                          title="Copy link"
                        >
                          {copiedDriveQR ? (
                            <>
                              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#BCCFC0]" />
                              <span className="font-lora text-[#BCCFC0]">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8EA58B]/60" />
                              <span className="font-lora text-[#8EA58B]/80">Copy Link</span>
                            </>
                          )}
                        </button>
                      </div>
                      
                      {/* Divider */}
                      <div className="flex items-center gap-2 py-1">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#8EA58B]/30 to-transparent" />
                        <span className="text-[9px] sm:text-[10px] text-[#8EA58B]/50 font-lora italic">or</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#8EA58B]/30 to-transparent" />
                      </div>
                      
                      {/* Direct link button - full width */}
                      <a
                        href={googleDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2 sm:py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#8EA58B]/10 to-[#BCCFC0]/10 border border-[#8EA58B]/30 hover:border-[#8EA58B]/50 transition-all duration-200 shadow-sm hover:shadow-md group"
                      >
                        <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#BCCFC0] group-hover:scale-110 transition-transform" />
                        <span className="font-lora text-[10px] sm:text-xs md:text-sm text-[#8EA58B]/80 group-hover:text-[#BCCFC0] font-medium transition-colors">Open Google Drive Folder</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </motion.div>

        <motion.div className="text-center mt-5 sm:mt-6 md:mt-7" variants={fadeInUp}>
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-[#8EA58B]/40 hover:shadow-[0_10px_50px_rgba(131,146,125,0.3)] transition-all duration-300 max-w-3xl mx-auto">
            <div className="relative p-4 sm:p-5 md:p-6">
              {/* Corner accents */}
              <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-l-2 border-[#8EA58B]/50 rounded-tl-lg" />
              <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-[#8EA58B]/50 rounded-tr-lg" />
              <div className="absolute bottom-0.5 left-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-[#8EA58B]/50 rounded-bl-lg" />
              <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-r-2 border-[#8EA58B]/50 rounded-br-lg" />
              
              <p className="font-lora text-[#8EA58B] text-xs sm:text-sm md:text-base leading-relaxed mb-3">
                We are delighted to share this wonderful and blessed moment with you!
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="text-center">
                  <span className="block font-playfair text-[#8EA58B] font-bold text-base sm:text-lg md:text-xl">– Mario & Kaye Celine –</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
