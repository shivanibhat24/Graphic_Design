"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [label, setLabel] = useState("")

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })

    const onMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)

      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "none" })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.55, ease: "power3.out" })
    }

    const onEnter = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement
      const isProject = !!target.closest(".project-card")
      setLabel(isProject ? "View" : "")

      gsap.to(dot, { scale: 0, duration: 0.2 })
      gsap.to(ring, {
        scale: isProject ? 4 : 2.5,
        backgroundColor: "rgba(124, 58, 237, 0.15)",
        borderColor: "rgba(124, 58, 237, 0.6)",
        duration: 0.4,
        ease: "power2.out",
      })
    }

    const onLeave = () => {
      setLabel("")
      gsap.to(dot, { scale: 1, duration: 0.2 })
      gsap.to(ring, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 255, 0.4)",
        duration: 0.4,
        ease: "power2.out",
      })
    }

    const onMouseLeaveWindow = () => setIsVisible(false)
    const onMouseEnterWindow = () => setIsVisible(true)

    window.addEventListener("mousemove", onMove)
    document.documentElement.addEventListener("mouseleave", onMouseLeaveWindow)
    document.documentElement.addEventListener("mouseenter", onMouseEnterWindow)

    const interactives = document.querySelectorAll("a, button, .interactive")
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter as any)
      el.addEventListener("mouseleave", onLeave)
    })

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.documentElement.removeEventListener("mouseleave", onMouseLeaveWindow)
      document.documentElement.removeEventListener("mouseenter", onMouseEnterWindow)
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter as any)
        el.removeEventListener("mouseleave", onLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Dot (fast) */}
      <div
        ref={dotRef}
        className="custom-cursor w-2 h-2 bg-white rounded-full"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s" }}
      />
      {/* Ring (lagged) */}
      <div
        ref={ringRef}
        className="custom-cursor w-10 h-10 rounded-full border border-white/40 flex items-center justify-center"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s" }}
      >
        {label && (
          <span className="text-[8px] font-bold uppercase tracking-widest text-white leading-none">
            {label}
          </span>
        )}
      </div>
    </>
  )
}
