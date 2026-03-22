"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

function SplitChars({ text }: { text: string }) {
  return (
    <span className="split-parent inline-block overflow-hidden">
      {text.split("").map((ch, i) => (
        <span key={i} className="split-char inline-block">
          {ch}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const fadeOut = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const slideUp = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])

  useEffect(() => {
    if (typeof window === "undefined") return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".split-char",
        { yPercent: 120, opacity: 0, rotateX: -80 },
        { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.03, ease: "back.out(1.4)", delay: 0.3 }
      )
      gsap.fromTo(".hero-eyebrow", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.5, ease: "power3.out" })
      gsap.fromTo(".hero-sub",    { opacity: 0, y: 30 },  { opacity: 1, y: 0, duration: 1,   delay: 1.2, ease: "power3.out" })
      gsap.fromTo(".hero-cta",    { opacity: 0, y: 20 },  { opacity: 1, y: 0, duration: 0.8, delay: 1.6, ease: "power3.out" })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      className="relative min-h-[100vh] flex flex-col items-center justify-center text-center px-6 md:px-16 overflow-hidden"
    >
      {/* Decorative accent blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[50vw] h-[50vw] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-20 right-0 w-[40vw] h-[40vw] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, var(--accent-2), transparent 70%)" }} />

      <motion.div style={{ opacity: fadeOut, y: slideUp }} className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">

        {/* Eyebrow */}
        <p className="hero-eyebrow opacity-0 flex items-center justify-center gap-4 mb-10">
          <span className="inline-block w-8 h-0.5" style={{ background: "var(--accent)" }} />
          <span className="text-[10px] uppercase tracking-[0.6em] font-bold" style={{ color: "var(--accent)" }}>
            Graphic Designer &nbsp;|&nbsp; Visual Storyteller &nbsp;|&nbsp; Mumbai
          </span>
          <span className="inline-block w-8 h-0.5" style={{ background: "var(--accent)" }} />
        </p>

        {/* Name — two separate lines, center-aligned */}
        <div className="flex flex-col items-center select-none gap-0">
          <h1
            className="font-syne font-black uppercase leading-[0.82] tracking-[-0.06em] whitespace-nowrap"
            style={{ fontSize: "clamp(3rem, 13vw, 16rem)" }}
          >
            <SplitChars text="SHIVANI" />
          </h1>
          <h1
            className="font-syne font-black uppercase leading-[0.82] tracking-[-0.06em] text-outline-accent whitespace-nowrap"
            style={{ fontSize: "clamp(3.5rem, 16vw, 20rem)", marginTop: "-0.06em" }}
          >
            <SplitChars text="BHAT" />
          </h1>
        </div>

        {/* Tagline */}
        <div className="hero-sub opacity-0 mt-12 max-w-2xl">
          <p className="text-base md:text-xl font-medium leading-relaxed" style={{ color: "var(--muted)" }}>
            I craft bold visual identities, high-fidelity concept art, and digital stories that demand attention.
            Currently shaping aesthetics from Mumbai, available worldwide.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 mt-8">
            {[["88+", "Works"], ["7", "Categories"], ["∞", "Ideas"]].map(([n, l]) => (
              <div key={l} className="flex flex-col items-center gap-1">
                <span className="text-3xl md:text-4xl font-black font-syne" style={{ color: "var(--accent)" }}>{n}</span>
                <span className="text-[9px] uppercase tracking-[0.5em]" style={{ color: "var(--muted)" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="hero-cta opacity-0 flex flex-wrap items-center justify-center gap-4 mt-12">
          <a
            href="/work/logos"
            className="interactive inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.4em] text-white transition-all duration-300 hover:scale-105 hover:glow-accent"
            style={{ background: "var(--accent)" }}
          >
            Explore Work
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
          <a
            href="mailto:shivani.gbhat@gmail.com"
            className="interactive inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.4em] glass transition-all duration-300 hover:scale-105"
          >
            Contact Me
          </a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "var(--muted)" }}
      >
        <div className="h-12 w-px overflow-hidden relative" style={{ background: "var(--card-border)" }}>
          <motion.div
            className="absolute inset-0"
            style={{ background: "var(--accent)" }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <span className="text-[8px] uppercase tracking-[0.5em]">Scroll</span>
      </motion.div>
    </section>
  )
}
