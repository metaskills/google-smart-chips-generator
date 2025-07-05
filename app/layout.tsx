import type React from "react"
import type { Metadata } from "next"
import { Patrick_Hand, Inter } from "next/font/google"
import "./globals.css"

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-patrick-hand",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Google Smart Chip Generator",
  description: "Bake your own Google Smart Chips for Slides!",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${patrickHand.variable} ${inter.variable} font-sans`}>{children}</body>
    </html>
  )
}
