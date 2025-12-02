import type React from "react"
import type { Metadata } from "next"
import { Great_Vibes, Inter, Imperial_Script } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })
const imperialScript = Imperial_Script({ subsets: ["latin"], weight: "400", variable: "--font-imperial-script" })

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Mario & Kaye Celine Wedding",
  startDate: "2026-02-06T13:00:00+08:00",
  endDate: "2026-02-06T22:00:00+08:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: [
    {
      "@type": "Place",
      name: "Orchid Garden Suites Manila",
      address: {
        "@type": "PostalAddress",
        streetAddress: "620 Pablo Ocampo Street",
        addressLocality: "Malate, Manila",
        addressCountry: "PH",
      },
    },
  ],
  image: ["https://mario-and-kayeceline-wedding.vercel.app/images/mario-kaye-cover.png?v=1"],
  description:
    "Join us in celebrating the wedding of Mario & Kaye Celine on February 06, 2026 at Orchid Garden Suites Manila. A joyful day of love, commitment, and celebration.",
  organizer: {
    "@type": "Person",
    name: "Mario & Kaye Celine",
  },
  offers: {
    "@type": "Offer",
    url: "https://mario-and-kayeceline-wedding.vercel.app/",
    availability: "https://schema.org/InStock",
    price: "0",
    priceCurrency: "PHP",
  },
  eventAttendanceModeDetails: "Wedding ceremony and reception",
  eventHashtag: "#MarioAndKayeCelineWedding",
} as const

export const metadata: Metadata = {
  title: "Mario & Kaye Celine Wedding | February 06, 2026 | Orchid Garden Suites Manila",
  description:
    "Join us in celebrating the wedding of Mario & Kaye Celine on February 06, 2026 at Orchid Garden Suites Manila. A joyful day of love, commitment, and celebration.",
  keywords:
    "Mario and Kaye Celine wedding, February 06 2026 wedding, Orchid Garden Suites Manila wedding, Manila wedding, wedding invitation website",
  authors: [
    { name: "Mario" },
    { name: "Kaye Celine" },
  ],
  creator: "Mario and Kaye Celine",
  publisher: "Mario and Kaye Celine",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://mario-and-kayeceline-wedding.vercel.app/"),
  alternates: {
    canonical: "https://mario-and-kayeceline-wedding.vercel.app/",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: "Mario & Kaye Celine Wedding | February 06, 2026",
    description:
      "Join us in celebrating the wedding of Mario & Kaye Celine on February 06, 2026 at Orchid Garden Suites Manila. A joyful day of love, commitment, and celebration.",
    url: "https://mario-and-kayeceline-wedding.vercel.app/",
    siteName: "Mario and Kaye Celine Wedding",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://mario-and-kayeceline-wedding.vercel.app/images/mario-kaye-cover.png?v=1",
        width: 1200,
        height: 630,
        alt: "Mario & Kaye Celine Wedding Invitation - February 06, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mario & Kaye Celine Wedding | February 06, 2026",
    description:
      "Join us in celebrating the wedding of Mario & Kaye Celine on February 06, 2026 at Orchid Garden Suites Manila. A joyful day of love, commitment, and celebration.",
    images: ["https://mario-and-kayeceline-wedding.vercel.app/images/mario-kaye-cover.png?v=1"],
    creator: "@marioandkayeceline",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "mobile-web-app-capable": "yes",
    "theme-color": "#8EA58B",
    "image": "https://mario-and-kayeceline-wedding.vercel.app/images/mario-kaye-cover.png?v=1",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#8EA58B" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lavishly+Yours&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Imperial+Script&display=swap" rel="stylesheet" />
        <link rel="preload" as="image" href="/mobile-background/DSCF2614-min.jpg" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/desktop-background/DSCF2444-min.jpg" media="(min-width: 768px)" />
        <script
          type="application/ld+json"
          // JSON-LD for rich search results (wedding event)
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${greatVibes.variable} ${imperialScript.variable} font-inter antialiased text-foreground`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
