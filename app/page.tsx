"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { SmartChip, type ChipType, chipConfig } from "@/components/ui/smart-chip"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { FallingCookies } from "@/components/falling-cookies"
import { FallingIcons } from "@/components/falling-icons"

export default function ChipGenerator() {
  const [label, setLabel] = useState("")
  const [type, setType] = useState<ChipType>("docs")
  const [key, setKey] = useState(0) // To re-trigger animation

  const placeholderMap: Record<ChipType, string> = {
    docs: "Your Google Docs Title",
    sheets: "Your Google Sheets Title",
    slides: "Your Google Slides Title",
    forms: "Your Google Forms Title",
    drawings: "Your Google Drawings Title",
    vids: "Your YouTube Video Title",
  }

  // Re-trigger animation whenever the label or type changes
  useEffect(() => {
    if (label) {
      setKey((prev) => prev + 1)
    }
  }, [label, type])

  const downloadChip = async () => {
    if (!label) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Calculate dimensions at 2x resolution
    const scale = 2
    const fontSize = 14 * scale
    const iconSize = 16 * scale
    const padding = 8 * scale
    const gap = 6 * scale
    const height = 24 * scale
    
    // Measure text to calculate width
    ctx.font = `500 ${fontSize}px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
    const textWidth = ctx.measureText(label).width
    const width = iconSize + gap + textWidth + (padding * 2)
    
    canvas.width = width
    canvas.height = height
    
    // Clear canvas with transparent background
    ctx.clearRect(0, 0, width, height)
    
    // Draw rounded rectangle background
    const radius = height / 2
    ctx.fillStyle = '#E9EAED'
    ctx.beginPath()
    ctx.roundRect(0, 0, width, height, radius)
    ctx.fill()
    
    // Load and draw icon
    const iconImg = new Image()
    iconImg.crossOrigin = 'anonymous'
    
    return new Promise<void>((resolve) => {
      iconImg.onload = () => {
        // Draw icon
        const iconY = (height - iconSize) / 2
        ctx.drawImage(iconImg, padding, iconY, iconSize, iconSize)
        
        // Draw text
        ctx.fillStyle = '#1F2937'
        ctx.font = `500 ${fontSize}px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        const textX = padding + iconSize + gap
        const textY = height / 2
        ctx.fillText(label, textX, textY)
        
        // Download as PNG
        const link = document.createElement('a')
        link.download = `${label.replace(/[^a-zA-Z0-9]/g, '_')}-chip.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
        
        resolve()
      }
      
      iconImg.src = chipConfig[type].icon
    })
  }

  return (
    <div
      className="isolate bg-[#FFFBEB] min-h-screen flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden"
      style={{ fontFamily: "var(--font-patrick-hand)" }}
    >
      <FallingCookies />
      <FallingIcons />
      <header className="text-center mb-8 w-full">
        <h1 className="text-6xl md:text-8xl font-bold text-amber-900 tracking-tight">Google Smart Chip Generator</h1>
        <div className="text-2xl md:text-3xl text-amber-800 mt-8 mx-auto max-w-6xl px-4 text-center">
          Tired of ugly text links ruining your sleek slide designs? Our chip bakery cooks up delicious visual chips
          that look exactly like Google's smart links - but work everywhere!
        </div>
      </header>

      <main className="w-full max-w-4xl">
        {/* Inputs */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
          <div className="w-full md:w-1/3">
            <Select value={type} onValueChange={(value: ChipType) => setType(value)}>
              <SelectTrigger className="playful-select-trigger">
                <SelectValue placeholder="Select a flavor" />
              </SelectTrigger>
              <SelectContent className="playful-select-content w-80">
                {Object.entries(chipConfig).map(([key, { name, icon }]) => (
                  <SelectItem key={key} value={key} className="playful-select-item">
                    <div className="flex items-center gap-3">
                      <Image src={icon || "/placeholder.svg"} alt={name} width={24} height={24} />
                      <span>{name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-2/3">
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder={placeholderMap[type]}
              className="playful-input"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="relative w-full aspect-[4/3] oven-background">
          <div className="absolute left-1/2 top-[53%] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            {label && (
              <div key={key} className="animate-pop-out">
                <SmartChip type={type} label={label} className="text-lg p-2 h-8" />
              </div>
            )}
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-4 text-center">
          <Button
            disabled={!label}
            onClick={downloadChip}
            className="bg-amber-800 hover:bg-amber-900 text-white font-bold text-3xl py-8 px-10 rounded-full shadow-lg transition-all duration-300 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed transform disabled:scale-100 hover:scale-105"
          >
            <Image
              src="/images/download-icon.png"
              alt="Download"
              width={48}
              height={48}
              className="mr-2 h-12 w-12 animate-gentle-bounce"
            />
            Grab your Chip!
          </Button>
        </div>
      </main>

      {/* Footer - Lead Magnet */}
      <footer className="mt-12 w-full max-w-3xl mb-40">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-amber-200/50 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center">
            <div className="flex items-center gap-2">
              <Image src="/images/un.png" alt="unRemarkable AI logo" width={32} height={32} className="w-8 h-8" />
              <div className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-inter)" }}>
                unRemarkable.ai
              </div>
            </div>
            <div className="hidden md:block text-amber-500 text-lg">•</div>
            <div className="text-base text-gray-600" style={{ fontFamily: "var(--font-inter)" }}>
              More AI tools that solve real problems at{" "}
              <a
                href="https://www.unremarkable.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors duration-200"
              >
                unRemarkable.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}