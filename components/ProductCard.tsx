"use client";

import { motion } from "framer-motion";
import type { Perfume } from "@/lib/data";

interface ProductCardProps {
  perfume: Perfume;
  theme: "arabic" | "masculine" | "feminine";
}

const themeStyles = {
  arabic: {
    card: "bg-[#2a1f0a] border border-[#c9a84c]/30 hover:border-[#c9a84c]/70",
    name: "text-[#e8d5a3]",
    notes: "text-[#a08a5a]",
    price: "text-[#c9a84c]",
    tag: "bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/40",
    size: "text-[#6b5a3a]",
    divider: "bg-[#c9a84c]/20",
  },
  masculine: {
    card: "bg-[#141c28] border border-[#4a6fa5]/30 hover:border-[#4a6fa5]/70",
    name: "text-[#e2e8f0]",
    notes: "text-[#64748b]",
    price: "text-[#7aa8d8]",
    tag: "bg-[#4a6fa5]/20 text-[#7aa8d8] border border-[#4a6fa5]/40",
    size: "text-[#3d4f66]",
    divider: "bg-[#4a6fa5]/20",
  },
  feminine: {
    card: "bg-white border border-[#e8c4b8]/40 hover:border-[#c8956c]/60",
    name: "text-[#3a2a20]",
    notes: "text-[#9e7060]",
    price: "text-[#c8956c]",
    tag: "bg-[#f5e0d8] text-[#c8956c] border border-[#e8c4b8]",
    size: "text-[#c4a898]",
    divider: "bg-[#e8c4b8]/40",
  },
};

export default function ProductCard({ perfume, theme }: ProductCardProps) {
  const s = themeStyles[theme];

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`relative rounded-xl overflow-hidden transition-all duration-300 cursor-default ${s.card}`}
    >
      <div className="w-full bg-white" style={{ aspectRatio: "3/4" }}>
        {perfume.imagen_url ? (
          <img
            src={perfume.imagen_url}
            alt={perfume.perfume}
            className="w-full h-full object-contain pointer-events-none"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1">
              <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col gap-0.5">
        <p className={`text-[9px] uppercase tracking-[0.3em] font-semibold ${s.size}`}>
          {perfume.marca}
        </p>
        <h3 className={`text-xs font-medium leading-snug line-clamp-2 ${s.name}`}>
          {perfume.perfume}
        </h3>
        <p className={`text-sm font-bold mt-1 ${s.price}`}>
          USD {perfume.precio}
        </p>
      </div>
    </motion.div>
  );
}
