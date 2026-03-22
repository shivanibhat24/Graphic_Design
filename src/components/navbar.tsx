"use client"

import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Palette, Check, ChevronDown, Github, Mail, Linkedin } from "lucide-react"
import Link from "next/link"

const CATEGORIES = [
  { label: "Logos",         href: "/work/logos" },
  { label: "Vectors",       href: "/work/vectors" },
  { label: "Concept Art",   href: "/work/concept-art" },
  { label: "T-Shirts",      href: "/work/t-shirt-design" },
  { label: "Stickers",      href: "/work/stickers" },
  { label: "Visuals",       href: "/work/visuals" },
  { label: "Presentations", href: "/work/presentations" },
  { label: "Film Posters", href: "/work/film-posters" },
]

const THEMES = [
  { id: "light",       label: "Light",       color: "#FEFAE8" },
  { id: "dark",        label: "Dark",        color: "#080809" },
  { id: "teal-ombre",  label: "Teal Ombre",  color: "#003838" },
  { id: "light-grey",  label: "Light Grey",  color: "#f2f2f2" },
  { id: "firey",       label: "Firey",       color: "#1a0500" },
  { id: "pink-purple", label: "Pink Purple", color: "#180018" },
]

type DropdownId = "work" | "contact" | "theme" | null

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted]   = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState<DropdownId>(null)
  const navRef                  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close dropdowns when clicking outside the entire navbar
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(null)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  if (!mounted) return null

  const toggle = (id: DropdownId) => setOpen(prev => prev === id ? null : id)

  const dropdownCls =
    "absolute top-full mt-3 glass rounded-2xl p-2 shadow-2xl z-[200] min-w-[180px]"

  return (
    <motion.header
      ref={navRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-[100] px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between transition-all duration-500 ${
        scrolled ? "glass shadow-lg" : ""
      }`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(null)}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs text-white font-syne transition-transform duration-300 group-hover:rotate-6"
          style={{ background: "var(--accent)" }}
        >
          SB
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-[11px] font-black uppercase tracking-[0.25em]" style={{ color: "var(--fg)" }}>
            Shivani Bhat
          </span>
          <span className="text-[8px] uppercase tracking-[0.35em] opacity-50" style={{ color: "var(--fg)" }}>
            Creative Designer
          </span>
        </div>
      </Link>

      {/* Centre Nav — Home · Work · Contact */}
      <nav className="flex items-center gap-1">

        {/* HOME */}
        <Link
          href="/"
          onClick={() => setOpen(null)}
          className="px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.35em] transition-all duration-200 hover:opacity-70"
          style={{ color: "var(--fg)" }}
        >
          Home
        </Link>

        {/* WORK */}
        <div className="relative">
          <button
            onClick={() => toggle("work")}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.35em] transition-all duration-200 hover:opacity-70"
            style={{ color: open === "work" ? "var(--accent)" : "var(--fg)" }}
          >
            Work
            <ChevronDown
              size={12}
              className="transition-transform duration-200"
              style={{ transform: open === "work" ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>

          <AnimatePresence>
            {open === "work" && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                className={`${dropdownCls} left-0`}
              >
                {CATEGORIES.map(cat => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setOpen(null)}
                    className="flex items-center w-full px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-white/10"
                    style={{ color: "var(--fg)" }}
                  >
                    {cat.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CONTACT */}
        <div className="relative">
          <button
            onClick={() => toggle("contact")}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.35em] transition-all duration-200 hover:opacity-70"
            style={{ color: open === "contact" ? "var(--accent)" : "var(--fg)" }}
          >
            Contact
            <ChevronDown
              size={12}
              className="transition-transform duration-200"
              style={{ transform: open === "contact" ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>

          <AnimatePresence>
            {open === "contact" && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                className={`${dropdownCls} right-0`}
              >
                <a
                  href="mailto:shivani.gbhat@gmail.com"
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-white/10"
                  style={{ color: "var(--fg)" }}
                >
                  <Mail size={14} style={{ color: "var(--accent)" }} />
                  Gmail
                </a>
                <a
                  href="https://www.linkedin.com/in/shivani-gbhat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-white/10"
                  style={{ color: "var(--fg)" }}
                >
                  <Linkedin size={14} style={{ color: "var(--accent)" }} />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/shivanibhat24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-white/10"
                  style={{ color: "var(--fg)" }}
                >
                  <Github size={14} style={{ color: "var(--accent)" }} />
                  GitHub
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Theme Toggle */}
      <div className="relative">
        <button
          onClick={() => toggle("theme")}
          className="w-10 h-10 rounded-full glass flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ color: "var(--accent)" }}
        >
          <Palette size={16} />
        </button>

        <AnimatePresence>
          {open === "theme" && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              className={`${dropdownCls} right-0`}
            >
              {THEMES.map(t => (
                <button
                  key={t.id}
                  onClick={() => { setTheme(t.id); setOpen(null) }}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-white/10"
                  style={{ color: theme === t.id ? "var(--accent)" : "var(--fg)" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full border border-white/20" style={{ background: t.color }} />
                    {t.label}
                  </div>
                  {theme === t.id && <Check size={12} />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
