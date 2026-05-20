"use client";

import { motion } from "framer-motion";
import type { Brand } from "@/lib/data";
import ProductCard from "./ProductCard";

interface BrandSectionProps {
  brand: Brand;
  theme: "arabic" | "masculine" | "feminine";
  index: number;
}

const themeStyles = {
  arabic: {
    brandName: "text-[#c9a84c]",
    origin: "text-[#6b5a3a]",
    line: "bg-gradient-to-r from-[#c9a84c]/60 to-transparent",
  },
  masculine: {
    brandName: "text-[#9aa5b4]",
    origin: "text-[#3d4f66]",
    line: "bg-gradient-to-r from-[#4a6fa5]/60 to-transparent",
  },
  feminine: {
    brandName: "text-[#c8956c]",
    origin: "text-[#c4a898]",
    line: "bg-gradient-to-r from-[#c8956c]/60 to-transparent",
  },
};

export default function BrandSection({
  brand,
  theme,
  index,
}: BrandSectionProps) {
  const s = themeStyles[theme];

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <div className="flex items-baseline gap-4 mb-6">
        <h2
          className={`font-display text-2xl md:text-3xl font-semibold ${s.brandName}`}
        >
          {brand.name}
        </h2>
        {brand.origin && (
          <span className={`text-xs uppercase tracking-widest ${s.origin}`}>
            {brand.origin}
          </span>
        )}
      </div>
      <div className={`h-px mb-8 ${s.line}`} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {(brand.perfumes ?? []).map((perfume: any) => (
          <ProductCard key={perfume.id} perfume={perfume} theme={theme} />
        ))}
      </div>
    </motion.section>
  );
}
