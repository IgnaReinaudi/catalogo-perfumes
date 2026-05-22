"use client";

import { motion } from "framer-motion";
import type { Perfume } from "@/lib/data";

const WA_NUMBER = "5493472587090";
function buildWhatsAppUrl(p: Perfume): string {
  const msg = `Hola! Como estás? 👋🏻\n\nMe interesa el perfume *${p.perfume}* de la marca *${p.marca}* que vi en tu catálogo. El precio es de $${p.precio} USD. ¿Tienen stock? 📦`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

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
        <div className="flex items-center justify-between gap-1 mt-1">
          <p className={`text-sm font-bold ${s.price}`}>USD {perfume.precio}</p>
          <motion.a
            href={buildWhatsAppUrl(perfume)}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, boxShadow: "0 0 14px rgba(37,211,102,0.5)" }}
            className="rounded-full p-1.5 flex items-center justify-center flex-shrink-0"
            style={{ background: "#25D366", color: "#ffffff" }}
            onClick={(e) => e.stopPropagation()}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
