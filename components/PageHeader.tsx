"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  theme: "arabic" | "masculine" | "feminine";
  stats?: { label: string; value: string }[];
}

const themeStyles = {
  arabic: {
    back: "text-[#c9a84c]/60 hover:text-[#c9a84c]",
    backIcon: "←",
    title: "text-[#e8d5a3]",
    subtitle: "text-[#a08a5a]",
    statValue: "text-[#c9a84c]",
    statLabel: "text-[#6b5a3a]",
    divider: "bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent",
    ornament: "text-[#c9a84c]/30",
  },
  masculine: {
    back: "text-[#4a6fa5]/60 hover:text-[#7aa8d8]",
    backIcon: "←",
    title: "text-[#e2e8f0]",
    subtitle: "text-[#64748b]",
    statValue: "text-[#7aa8d8]",
    statLabel: "text-[#3d4f66]",
    divider: "bg-gradient-to-r from-transparent via-[#4a6fa5]/40 to-transparent",
    ornament: "text-[#4a6fa5]/20",
  },
  feminine: {
    back: "text-[#c8956c]/60 hover:text-[#c8956c]",
    backIcon: "←",
    title: "text-[#3a2a20]",
    subtitle: "text-[#9e7060]",
    statValue: "text-[#c8956c]",
    statLabel: "text-[#c4a898]",
    divider: "bg-gradient-to-r from-transparent via-[#c8956c]/40 to-transparent",
    ornament: "text-[#e8c4b8]",
  },
};

export default function PageHeader({
  title,
  subtitle,
  theme,
  stats,
}: PageHeaderProps) {
  const s = themeStyles[theme];

  return (
    <header className="text-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/"
          className={`inline-flex items-center gap-2 text-sm tracking-widest uppercase transition-colors duration-200 mb-10 ${s.back}`}
        >
          <span>{s.backIcon}</span>
          <span>Volver al inicio</span>
        </Link>

        <p className={`text-4xl mb-4 ${s.ornament}`}>✦</p>

        <h1
          className={`font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight ${s.title}`}
        >
          {title}
        </h1>

        <p className={`text-base md:text-lg font-light tracking-wide max-w-lg mx-auto ${s.subtitle}`}>
          {subtitle}
        </p>

        {stats && (
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className={`font-display text-2xl font-bold ${s.statValue}`}>
                  {stat.value}
                </p>
                <p className={`text-xs uppercase tracking-widest mt-1 ${s.statLabel}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className={`h-px max-w-xs mx-auto mt-12 ${s.divider}`} />
      </motion.div>
    </header>
  );
}
