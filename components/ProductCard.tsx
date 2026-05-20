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
      className={`relative rounded-xl p-5 transition-all duration-300 luxury-shadow cursor-default ${s.card}`}
    >
      {perfume.tag && (
        <span
          className={`absolute top-4 right-4 text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full ${s.tag}`}
        >
          {perfume.tag}
        </span>
      )}

      <p className={`text-[10px] uppercase tracking-[0.2em] mb-1 ${s.size}`}>
        {perfume.brand} · {perfume.size}
      </p>

      <h3
        className={`font-display text-lg font-semibold leading-tight mb-2 pr-16 ${s.name}`}
      >
        {perfume.name}
      </h3>

      <div className={`h-px w-8 mb-3 ${s.divider}`} />

      <p className={`text-xs leading-relaxed mb-4 ${s.notes}`}>
        {perfume.notes}
      </p>

      <p className={`font-display text-xl font-bold ${s.price}`}>
        ${perfume.price.toLocaleString("es-AR")}
      </p>
    </motion.div>
  );
}
