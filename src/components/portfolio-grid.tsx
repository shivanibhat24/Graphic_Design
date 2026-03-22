"use client"

import { useState, useMemo, useEffect } from "react"
import { portfolioItems } from "@/lib/data"
import { motion, AnimatePresence } from "framer-motion"

interface PortfolioGridProps {
  category?: string; // Optional: used to filter the view initially
  showTabs?: boolean; // Optional: whether to show the category tabs (e.g., on home page)
}

export default function PortfolioGrid({ category, showTabs = true }: PortfolioGridProps) {
  const [activeCollection, setActiveCollection] = useState("All")
  const [selectedItem, setSelectedItem] = useState<any>(null)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  // 1. First, filter by category if provided
  const categoryFiltered = useMemo(() => 
    category && category !== "All" 
      ? portfolioItems.filter(i => i.category.toLowerCase() === category.toLowerCase())
      : portfolioItems,
    [category]
  )

  // 2. Identify available collections for this category
  const collections = useMemo(() => {
    const set = new Set(["All"])
    categoryFiltered.forEach(i => {
      if (i.collection) set.add(i.collection)
    })
    return Array.from(set)
  }, [categoryFiltered])

  // 3. Final filter by collection
  const finalFiltered = useMemo(() =>
    activeCollection === "All"
      ? categoryFiltered
      : categoryFiltered.filter(i => i.collection === activeCollection),
    [categoryFiltered, activeCollection]
  )

  return (
    <section id="work" className="relative z-10 py-24 px-8 md:px-16 lg:px-24 min-h-[50vh]">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.55em] font-bold mb-3" style={{ color: "var(--accent)" }}>
              — {category ? category : "Selected Works"}
            </p>
            <h2 className="text-5xl md:text-7xl font-black font-syne uppercase leading-none tracking-tighter">
              {category ? category : "Portfolio"}
            </h2>
          </div>
          <p className="text-base max-w-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            Exploring {finalFiltered.length} pieces of intentional visual strategy and creative grit.
          </p>
        </div>

        {/* Collection Filter */}
        {collections.length > 1 && (
          <div className="flex flex-wrap gap-2.5 mb-14 pb-10" style={{ borderBottom: "1px solid var(--card-border)" }}>
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold self-center mr-4 opacity-30">Collections:</span>
            {collections.map(coll => (
              <button
                key={coll}
                onClick={() => setActiveCollection(coll)}
                className="interactive px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.35em] transition-all duration-300"
                style={{
                  background: activeCollection === coll ? "var(--accent)" : "var(--card-bg)",
                  color:      activeCollection === coll ? "var(--bg)" : "var(--muted)",
                  border:     `1px solid ${activeCollection === coll ? "var(--accent)" : "var(--card-border)"}`,
                }}
              >
                {coll}
              </button>
            ))}
          </div>
        )}

        {/* Grid display */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {finalFiltered.map((item, i) => (
              <GalleryCard key={item.title} item={item} index={i} onClick={() => setSelectedItem(item)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox / Detail View */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10 backdrop-blur-3xl"
            style={{ background: "rgba(0,0,0,0.95)" }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center gap-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 text-white opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-black"
              >
                Close (ESC)
              </button>
              
              <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                />
              </div>

              <div className="w-full max-w-2xl text-center">
                <p className="text-[9px] uppercase tracking-[0.4em] font-black mb-3" style={{ color: "var(--accent)" }}>
                  — {selectedItem.category} {selectedItem.collection ? `| ${selectedItem.collection}` : ''}
                </p>
                <h3 className="text-3xl md:text-5xl font-black font-syne uppercase tracking-tighter text-white mb-6">
                  {selectedItem.title}
                </h3>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed font-medium italic">
                  &quot;{selectedItem.caption || "A testament to tactical visual design and brand immersion."}&quot;
                </p>

                {selectedItem.pdfUrl && (
                  <a 
                    href={selectedItem.pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex px-8 py-3 rounded-full bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 transition-transform"
                  >
                    View Presentation PDF
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function GalleryCard({ item, index, onClick }: { item: any; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className="gallery-card group relative rounded-2xl overflow-hidden flex flex-col glass cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden" style={{ height: "260px" }}>
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-contain p-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
        />

        {/* Hover reveal overlay */}
        <motion.div
           animate={{ opacity: hovered ? 1 : 0 }}
           transition={{ duration: 0.3 }}
           className="absolute inset-0 flex items-center justify-center pointer-events-none"
           style={{ background: "rgba(0,0,0,0.6)" }}
        >
           <div className="w-16 h-16 rounded-full flex items-center justify-center font-black text-xs uppercase tracking-widest text-white shadow-2xl"
                style={{ background: "var(--accent)" }}>
             View
           </div>
        </motion.div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest glass" style={{ borderColor: "var(--accent)" }}>
            {item.category}
          </span>
          {item.collection && (
            <span className="px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-white/10 text-white/50">
              {item.collection}
            </span>
          )}
        </div>

        {item.pdfUrl && (
          <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer" 
             className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-[var(--accent)] text-white shadow-2xl"
             onClick={(e) => e.stopPropagation()}>
            PDF View
          </a>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <h3 className="text-sm font-bold leading-snug tracking-tight mb-2 opacity-90">{item.title}</h3>
        <div className="w-8 h-[2px] mt-2 group-hover:w-full transition-all duration-700" style={{ background: "var(--accent)" }}></div>
      </div>
    </motion.article>
  )
}
