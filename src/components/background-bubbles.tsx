"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Bubble {
  width: number
  height: number
  left: string
  top: string
  color: string
  duration: number
  delay: number
  yDelta: number
  xDelta: number
}

function makeBubbles(count: number): Bubble[] {
  return Array.from({ length: count }, (_, i) => ({
    width:    Math.random() * 300 + 150,
    height:   Math.random() * 300 + 150,
    left:     `${Math.random() * 100}%`,
    top:      `${Math.random() * 100}%`,
    color:    i % 2 === 0 ? "var(--accent)" : "var(--accent-2)",
    duration: 20 + Math.random() * 15,
    delay:    i * 0.5,
    yDelta:   Math.random() * -150,
    xDelta:   Math.random() * 100,
  }))
}

export default function BackgroundBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])

  // Only generate random values on the client — prevents SSR hydration mismatch
  useEffect(() => {
    setBubbles(makeBubbles(15))
  }, [])

  if (bubbles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ opacity: 0.4 }}>
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width:   b.width,
            height:  b.height,
            left:    b.left,
            top:     b.top,
            background: b.color,
            opacity: 0.15,
            filter:  "blur(100px)",
          }}
          animate={{
            y:      [0, b.yDelta, 0],
            x:      [0, b.xDelta, 0],
            scale:  [1, 1.3, 1],
          }}
          transition={{
            duration: b.duration,
            repeat:   Infinity,
            ease:     "linear",
            delay:    b.delay,
          }}
        />
      ))}
    </div>
  )
}
