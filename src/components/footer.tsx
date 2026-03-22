"use client"

import { motion } from "framer-motion"

const SOCIALS = [
  { label: "LinkedIn",  href: "https://ww.linkedin.com/in/shivani-gbhat/" },
  { label: "Medium", href: "https://indiaindesign.medium.com/" },
]

export default function Footer() {
  return (
    <footer id="contact" className="relative z-10 pt-32 overflow-hidden">
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />
      
      <div className="px-8 md:px-16 lg:px-24 py-32 md:py-48 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.6em] font-black mb-10" style={{ color: "var(--accent)" }}>
              — Let&apos;s talk
            </p>
            <h2 className="text-6xl md:text-9xl font-black font-syne uppercase leading-[0.85] tracking-tighter mb-12">
              Ready to<br />
              <span className="text-outline-accent">Scale?</span>
            </h2>
            <a 
              href="mailto:shivani.gbhat@gmail.com" 
              className="interactive text-xl md:text-3xl font-medium opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all duration-500 block break-words"
            >
              shivani.gbhat@gmail.com
            </a>
          </div>

          <div className="flex flex-col justify-between items-start lg:items-end">
             <div className="flex flex-col gap-6 items-start lg:items-end w-full">
                {SOCIALS.map(({ label, href }) => (
                  <a 
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive text-sm uppercase tracking-[0.4em] font-black opacity-30 hover:opacity-100 hover:text-[var(--accent)] transition-all duration-300"
                  >
                    {label}
                  </a>
                ))}
             </div>
             
             <div className="mt-20 lg:mt-0">
               <p className="text-[10px] uppercase tracking-[0.5em] opacity-20">
                 © 2026 Shivani Bhat. All rights reserved.
               </p>
             </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute -bottom-[10%] -right-[5%] text-[35vw] font-black font-syne select-none pointer-events-none opacity-[0.02]" style={{ color: "var(--fg)" }}>
        SB
      </div>
    </footer>
  )
}
