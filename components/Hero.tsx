"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "+1000", label: "Perfumes" },
  { value: "+200", label: "Marcas" },
  { value: "100%", label: "Originales" },
];

interface BottleImage {
  url: string;
  top?: string; right?: string; bottom?: string; left?: string;
  width: string; height: string;
  blur: string; opacity: number; rotate: string;
}

// Replace these URLs with actual product shots when available
const BOTTLE_IMAGES: BottleImage[] = [
  {
    url: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=60",
    top: "8%", right: "-4%",
    width: "200px", height: "340px",
    blur: "32px", opacity: 0.28, rotate: "14deg",
  },
  {
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=60",
    bottom: "10%", left: "-6%",
    width: "220px", height: "370px",
    blur: "36px", opacity: 0.22, rotate: "-10deg",
  },
  {
    url: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=600&q=60",
    top: "-4%", left: "8%",
    width: "160px", height: "260px",
    blur: "44px", opacity: 0.16, rotate: "-18deg",
  },
  {
    url: "https://images.unsplash.com/photo-1616749711197-a9f3a1de0ef4?w=600&q=60",
    bottom: "0%", right: "25%",
    width: "180px", height: "300px",
    blur: "50px", opacity: 0.14, rotate: "6deg",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0c0a06]">

      {/* Blurred perfume bottle images — atmospheric background */}
      {BOTTLE_IMAGES.map((img, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute pointer-events-none hidden sm:block"
          style={{
            top: img.top,
            right: img.right,
            bottom: img.bottom,
            left: img.left,
            width: img.width,
            height: img.height,
            backgroundImage: `url(${img.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: `blur(${img.blur})`,
            opacity: img.opacity,
            transform: `rotate(${img.rotate})`,
          }}
        />
      ))}

      {/* Mobile: single subtle centered image glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none sm:hidden"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=40)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(60px)",
          opacity: 0.12,
        }}
      />

      {/* Color gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,168,76,0.18), transparent),
            radial-gradient(ellipse 60% 40% at 85% 110%, rgba(154,122,46,0.14), transparent),
            radial-gradient(ellipse 40% 60% at 5% 80%, rgba(201,168,76,0.10), transparent)
          `,
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 80px,#c9a84c 80px,#c9a84c 81px),
            repeating-linear-gradient(90deg,transparent,transparent 80px,#c9a84c 80px,#c9a84c 81px)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-2xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-display font-bold leading-[1.08] mb-5"
          style={{ color: "#f5e6c8", fontSize: "clamp(2.8rem, 10vw, 6rem)" }}
        >
          Los Mejores
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #c9a84c 0%, #e8d5a3 45%, #9a7a2e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Perfumes
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="text-[#a08a5a] text-base sm:text-lg font-light tracking-wide mb-2"
        >
          Los mejores precios de la provincia
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.52 }}
          className="text-[#5a4a2a] text-xs sm:text-sm tracking-[0.25em] uppercase mb-12"
        >
          Importados directamente de Estados Unidos
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-3 gap-6 sm:gap-14 max-w-xs sm:max-w-sm mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.75 + i * 0.08 }}
              className="text-center"
            >
              <p className="font-display text-2xl sm:text-3xl font-bold text-[#c9a84c]">
                {stat.value}
              </p>
              <p className="text-[#5a4a2a] text-[10px] uppercase tracking-[0.22em] mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#c9a84c]/25 text-[9px] uppercase tracking-[0.3em]">
          Explorar
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#c9a84c]/35 to-transparent"
        />
      </motion.div>
    </section>
  );
}
