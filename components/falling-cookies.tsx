"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"

interface Cookie {
  id: number
  style: React.CSSProperties
}

const NUM_COOKIES = 15 // Reduced for a less cluttered feel

export function FallingCookies() {
  const [cookies, setCookies] = useState<Cookie[]>([])

  useEffect(() => {
    const newCookies = Array.from({ length: NUM_COOKIES }).map((_, i) => {
      const size = Math.random() * 350 + 100 // BIGGER! Size between 100px and 350px
      const animationName = Math.random() > 0.5 ? "fall-and-rotate-clockwise" : "fall-and-rotate-counter-clockwise"
      const animationDuration = Math.random() * 15 + 10 // Duration between 10s and 25s
      const animationDelay = Math.random() * -animationDuration // Start at random points in the animation cycle

      return {
        id: i,
        style: {
          position: "absolute",
          top: "-350px", // Start above the viewport (adjusted for max size)
          left: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: Math.random() * 0.13 + 0.02, // Lighter and more transparent (0.02 to 0.15)
          animation: `${animationName} ${animationDuration}s linear ${animationDelay}s infinite`,
        } as React.CSSProperties,
      }
    })
    setCookies(newCookies)
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
      {cookies.map((cookie) => (
        <div key={cookie.id} style={cookie.style}>
          <Image src="/images/cookie.png" alt="" width={350} height={350} className="w-full h-full" />
        </div>
      ))}
    </div>
  )
}
