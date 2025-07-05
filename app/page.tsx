"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { SmartChip, type ChipType, chipConfig } from "@/components/ui/smart-chip"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function ChipGenerator() {
  const [label, setLabel] = useState("")
  const [type, setType] = useState<ChipType>("docs")
  const [key, setKey] = useState(0) // To re-trigger animation

  // Re-trigger animation whenever the label or type changes
  useEffect(() => {
    if (label) {
      setKey((prev) => prev + 1)
    }
  }, [label, type])

  return (
    <div
      className="bg-[#FFFBEB] min-h-screen flex flex-col items-center justify-center p-4 font-sans relative cookie-background"
      style={{ fontFamily: "var(--font-patrick-hand)" }}
    >
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
              <SelectContent className="playful-select-content">
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
              placeholder="Your Google Document Title"
              className="playful-input"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="relative w-full aspect-[4/3] oven-background">
          <div className="absolute left-1/2 top-[58%] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
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
