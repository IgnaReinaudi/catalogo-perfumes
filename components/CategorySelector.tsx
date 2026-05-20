"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CategorySelector() {
  const [showGender, setShowGender] = useState(false);

  return (
    <section
      className="relative py-20 px-5 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #0c0a06 0%, #0e0c08 100%)",
      }}
    >
      {/* Blurred perfume images — decorative background */}
      <div
        aria-hidden="true"
        className="absolute -bottom-10 -right-10 w-56 h-80 pointer-events-none hidden sm:block"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=50)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(52px)",
          opacity: 0.13,
          transform: "rotate(8deg)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-10 -left-10 w-48 h-72 pointer-events-none hidden sm:block"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&q=50)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(56px)",
          opacity: 0.10,
          transform: "rotate(-6deg)",
        }}
      />

      {/* Top separator line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/25 to-transparent" />

      <div className="relative z-10 max-w-md mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="font-display text-center font-bold text-[#f0e4cc] mb-3 tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 12vw, 5rem)", lineHeight: 1.05 }}
        >
          ¿Qué estás
          <br />
          buscando?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-center text-[#5a4a2a] text-sm font-light tracking-wide mb-11"
        >
          Encontrá tu fragancia ideal
        </motion.p>

        {/* ── Card 1: Árabes ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mb-4"
        >
          <Link href="/arabes" className="block">
            <motion.div
              whileHover={{ scale: 1.015, boxShadow: "0 16px 56px rgba(201,168,76,0.2)" }}
              whileTap={{ scale: 0.975 }}
              transition={{ duration: 0.2 }}
              className="relative w-full overflow-hidden rounded-2xl border border-[#c9a84c]/22 cursor-pointer group"
              style={{
                background: "linear-gradient(140deg, #1e1608 0%, #2c2010 55%, #1a1208 100%)",
                minHeight: "88px",
              }}
            >
              {/* Gold top line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/55 to-transparent" />
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="relative flex items-center justify-between px-6 py-5 gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl border border-[#c9a84c]/25 flex items-center justify-center"
                    style={{ background: "rgba(201,168,76,0.08)" }}
                  >
                    <svg viewBox="0 0 36 26" fill="none" width="28" height="20" aria-hidden="true">
                      {/* Sun */}
                      <circle cx="22" cy="5.5" r="3.5" fill="#FFD700"/>
                      {/* Big pyramid */}
                      <polygon points="1,25 14,2 27,25" fill="#F5A623"/>
                      <line x1="7.5" y1="12" x2="20.5" y2="12" stroke="#D47A10" strokeWidth="0.75"/>
                      <line x1="5" y1="17" x2="23" y2="17" stroke="#D47A10" strokeWidth="0.75"/>
                      <line x1="2.5" y1="21.5" x2="25.5" y2="21.5" stroke="#D47A10" strokeWidth="0.75"/>
                      {/* Small pyramid right */}
                      <polygon points="21,25 30,10 36,25" fill="#F5A623" opacity="0.82"/>
                      <line x1="25.5" y1="17.5" x2="33" y2="17.5" stroke="#D47A10" strokeWidth="0.6"/>
                      <line x1="23" y1="21.5" x2="35" y2="21.5" stroke="#D47A10" strokeWidth="0.6"/>
                      {/* Ground */}
                      <line x1="0" y1="25" x2="36" y2="25" stroke="#D47A10" strokeWidth="1.3"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#c9a84c]/45 text-[9px] uppercase tracking-[0.32em] mb-1">
                      Colección Oriental
                    </p>
                    <p className="font-display text-xl sm:text-2xl font-semibold text-[#e8d5a3] leading-tight">
                      Perfumes Árabes
                    </p>
                    <p className="text-[#7a6040] text-[11px] mt-1 tracking-wide">
                      Oud · Ambar · Especias
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 w-9 h-9 rounded-full border border-[#c9a84c]/25 flex items-center justify-center group-hover:border-[#c9a84c]/60 transition-colors duration-300">
                  <span className="text-[#c9a84c]/50 text-sm group-hover:text-[#c9a84c] transition-colors">→</span>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* ── Card 2: Diseñador ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.38 }}
        >
          <motion.div
            whileHover={{ scale: 1.015, boxShadow: "0 16px 56px rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.975 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowGender((p) => !p)}
            className="relative w-full overflow-hidden rounded-2xl border border-white/10 cursor-pointer group select-none"
            style={{
              background: "linear-gradient(140deg, #161616 0%, #1e1e1e 55%, #131313 100%)",
              minHeight: "88px",
            }}
          >
            {/* White top line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/22 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/4 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

            <div className="relative flex items-center justify-between px-6 py-5 gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                    <svg viewBox="0 0 24 34" fill="none" width="18" height="26" aria-hidden="true">
                      {/* Antenna */}
                      <rect x="11.3" y="0" width="1.4" height="3.5" rx="0.7" fill="#7B6B52"/>
                      {/* Top body */}
                      <polygon points="10.8,3.5 13.2,3.5 13.6,10.5 10.4,10.5" fill="#A08060"/>
                      {/* First platform */}
                      <rect x="8.5" y="10.5" width="7" height="1.8" rx="0.5" fill="#7B6B52"/>
                      {/* Upper-mid body */}
                      <polygon points="8.5,12.3 15.5,12.3 16,19 8,19" fill="#A08060"/>
                      <line x1="8.5" y1="14.8" x2="15.5" y2="14.8" stroke="#7B6B52" strokeWidth="0.55"/>
                      <line x1="8.5" y1="17" x2="15.5" y2="17" stroke="#7B6B52" strokeWidth="0.55"/>
                      {/* Second platform */}
                      <rect x="6.5" y="19" width="11" height="1.8" rx="0.5" fill="#7B6B52"/>
                      {/* Left leg */}
                      <polygon points="6.5,20.8 10,20.8 7.5,31.5 3.5,31.5" fill="#A08060"/>
                      {/* Right leg */}
                      <polygon points="17.5,20.8 14,20.8 16.5,31.5 20.5,31.5" fill="#A08060"/>
                      {/* Cross-hatch on left leg */}
                      <line x1="9.5" y1="22.5" x2="5.5" y2="28" stroke="#7B6B52" strokeWidth="0.6"/>
                      <line x1="5.5" y1="22.5" x2="9.5" y2="28" stroke="#7B6B52" strokeWidth="0.6"/>
                      {/* Cross-hatch on right leg */}
                      <line x1="14.5" y1="22.5" x2="18.5" y2="28" stroke="#7B6B52" strokeWidth="0.6"/>
                      <line x1="18.5" y1="22.5" x2="14.5" y2="28" stroke="#7B6B52" strokeWidth="0.6"/>
                      {/* Middle horizontal bar */}
                      <rect x="9.5" y="24" width="5" height="1.3" rx="0.3" fill="#A08060"/>
                      {/* Arch */}
                      <path d="M3.5 31.5 Q12 25.5 20.5 31.5" stroke="#7B6B52" strokeWidth="1.3" fill="none"/>
                      {/* Base */}
                      <line x1="2.5" y1="32.2" x2="21.5" y2="32.2" stroke="#7B6B52" strokeWidth="1.3"/>
                    </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-white/28 text-[9px] uppercase tracking-[0.32em] mb-1">
                    Alta Perfumería
                  </p>
                  <p className="font-display text-xl sm:text-2xl font-semibold text-white/88 leading-tight">
                    Perfumes de Diseñador
                  </p>
                  <p className="text-white/28 text-[11px] mt-1 tracking-wide">
                    Dior · Chanel · YSL · Tom Ford
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: showGender ? 90 : 0 }}
                transition={{ duration: 0.28 }}
                className="flex-shrink-0 w-9 h-9 rounded-full border border-white/12 flex items-center justify-center group-hover:border-white/30 transition-colors duration-300"
              >
                <span className="text-white/38 text-sm group-hover:text-white/70 transition-colors">→</span>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Gender sub-cards ── */}
          <AnimatePresence>
            {showGender && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-3 pt-3">

                  {/* Masculino */}
                  <Link href="/disenador/masculino" className="block">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 }}
                      whileHover={{ scale: 1.03, boxShadow: "0 12px 40px rgba(74,111,165,0.28)" }}
                      whileTap={{ scale: 0.96 }}
                      className="relative overflow-hidden rounded-xl border border-[#3d5f94]/35 cursor-pointer group"
                      style={{
                        background: "linear-gradient(145deg, #080f1e 0%, #0d1a32 100%)",
                        minHeight: "110px",
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4a6fa5]/55 to-transparent" />
                      <div className="flex flex-col items-center justify-center py-5 px-3 text-center h-full gap-1">
                        {/* Gender symbol ♂ */}
                        <span
                          className="font-light leading-none mb-1 select-none"
                          style={{
                            fontSize: "2.4rem",
                            color: "#5b8fd4",
                            fontFamily: "Georgia, serif",
                            textShadow: "0 0 20px rgba(91,143,212,0.45)",
                          }}
                        >
                          ♂
                        </span>
                        <p className="text-[#3d5f94]/70 text-[9px] uppercase tracking-[0.28em]">
                          Para él
                        </p>
                        <p className="font-display text-base font-semibold text-[#a8c4e8] group-hover:text-white transition-colors duration-200">
                          Masculino
                        </p>
                      </div>
                    </motion.div>
                  </Link>

                  {/* Femenino */}
                  <Link href="/disenador/femenino" className="block">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      whileHover={{ scale: 1.03, boxShadow: "0 12px 40px rgba(195,100,115,0.22)" }}
                      whileTap={{ scale: 0.96 }}
                      className="relative overflow-hidden rounded-xl border border-[#9e4f5a]/30 cursor-pointer group"
                      style={{
                        background: "linear-gradient(145deg, #1e080d 0%, #2e1018 100%)",
                        minHeight: "110px",
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c87882]/50 to-transparent" />
                      <div className="flex flex-col items-center justify-center py-5 px-3 text-center h-full gap-1">
                        {/* Gender symbol ♀ */}
                        <span
                          className="font-light leading-none mb-1 select-none"
                          style={{
                            fontSize: "2.4rem",
                            color: "#d4909a",
                            fontFamily: "Georgia, serif",
                            textShadow: "0 0 20px rgba(212,144,154,0.4)",
                          }}
                        >
                          ♀
                        </span>
                        <p className="text-[#9e4f5a]/70 text-[9px] uppercase tracking-[0.28em]">
                          Para ella
                        </p>
                        <p className="font-display text-base font-semibold text-[#e8b0b8] group-hover:text-white transition-colors duration-200">
                          Femenino
                        </p>
                      </div>
                    </motion.div>
                  </Link>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Help text */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-6 px-5 py-4 rounded-xl border border-[#c9a84c]/15 text-center"
          style={{ background: "rgba(201,168,76,0.05)" }}
        >
          <p className="text-[#a08a5a] text-sm font-light leading-relaxed">
            ¿No encontraste lo que buscabas?{" "}
            <span className="text-[#c9a84c] font-medium">Mandanos un mensaje</span>{" "}
            y conseguimos tu perfume.
          </p>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center text-[#3a3020] text-[10px] tracking-[0.28em] uppercase mt-8"
        >
          Consultá por WhatsApp · Envíos a todo el país 🇦🇷
        </motion.p>
      </div>
    </section>
  );
}
