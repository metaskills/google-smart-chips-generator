"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { chipConfig } from "@/components/ui/smart-chip"

interface FallingItem {
  id: number
  iconSrc: string
  style: React.CSSProperties
}

const iconSources = Object.values(chipConfig).map((config) => config.icon)
const NUM_ICONS = 40 // Increased number since icons are smaller
const ICON_SIZE = 24 // Fixed size, same as select menu

export function FallingIcons() {
  const [items, setItems] = useState<FallingItem[]>([])

  useEffect(() => {
    const newItems = Array.from({ length: NUM_ICONS }).map((_, i) => {
      const iconSrc = iconSources[Math.floor(Math.random() * iconSources.length)]
      const animationDuration = Math.random() * 10 + 8 // Duration between 8s and 18s
      const animationDelay = Math.random() * -animationDuration // Start at random points in the animation cycle

      return {
        id: i,
        iconSrc,
        style: {
          position: "absolute",
          top: `-${ICON_SIZE}px`, // Start above the viewport
          left: `${Math.random() * 100}%`,
          width: `${ICON_SIZE}px`,
          height: `${ICON_SIZE}px`,
          opacity: Math.random() * 0.3 + 0.1, // Lighter and more transparent (0.1 to 0.4)
          animation: `fall-straight ${animationDuration}s linear ${animationDelay}s infinite`,
        } as React.CSSProperties,
      }
    })
    setItems(newItems)
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
      {items.map((item) => (
        <div key={item.id} style={item.style}>
          <Image src={item.iconSrc || "/placeholder.svg"} alt="" width={ICON_SIZE} height={ICON_SIZE} />
        </div>
      ))}
    </div>
  )
}
