"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Brand } from "@/lib/data";
import type { Product } from "@/lib/supabase";

type Category = "arabic" | "masculine" | "feminine";

const WA_NUMBER = "5493472587090";
function buildWhatsAppUrl(p: Product): string {
  const msg = `Hola! Como estás? 👋🏻\n\nMe interesa el perfume *${p.perfume}* de la marca *${p.marca}* que vi en tu catálogo. El precio es de $${p.precio} USD. ¿Tienen stock? 📦`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const THEMES = {
  arabic: {
    bg: "#0f0b05",
    cardBg: "#1a1208",
    filterBg: "#1a1208",
    border: "rgba(201,168,76,0.18)",
    accent: "#c9a84c",
    accentFg: "#0f0b05",
    text: "#e8d5a3",
    subtext: "#7a6040",
    input: "#140e04",
    tag: "rgba(201,168,76,0.1)",
    shimmer: "rgba(201,168,76,0.12)",
  },
  masculine: {
    bg: "#09090b",
    cardBg: "#111113",
    filterBg: "#18181b",
    border: "rgba(255,255,255,0.07)",
    accent: "#c9a84c",
    accentFg: "#09090b",
    text: "#f4f4f5",
    subtext: "#52525b",
    input: "#18181b",
    tag: "rgba(255,255,255,0.04)",
    shimmer: "rgba(201,168,76,0.08)",
  },
  feminine: {
    bg: "#0d0508",
    cardBg: "#130810",
    filterBg: "#1a0d14",
    border: "rgba(244,114,182,0.2)",
    accent: "#f472b6",
    accentFg: "#0d0508",
    text: "#fdf2f8",
    subtext: "#9d7a86",
    input: "#1a0d14",
    tag: "rgba(244,114,182,0.08)",
    shimmer: "rgba(244,114,182,0.1)",
  },
};

type Theme = (typeof THEMES)[Category];


interface Props {
  category: Category;
  title: string;
  subtitle: string;
  brands: Brand[];
  featuredProducts: Product[];
  allProducts: Product[];
}

export default function CategoryPageLayout({
  category,
  title,
  subtitle,
  brands,
  featuredProducts,
  allProducts,
}: Props) {
  const t = THEMES[category];

  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filterBrands, setFilterBrands] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("")
  const [searchLimit, setSearchLimit] = useState(24);

  useEffect(() => { setSearchLimit(24); }, [query]);

  const isSearching = query.trim().length >= 2;
  const filtersActive = filterBrands.length > 0 || minPrice !== "" || maxPrice !== "";

  const filteredCatalogProducts = useMemo(() => {
    const hasBrands = filterBrands.length > 0;
    const min = minPrice !== "" ? parseFloat(minPrice) : null;
    const max = maxPrice !== "" ? parseFloat(maxPrice) : null;
    if (!hasBrands && min === null && max === null) return [];
    const results = allProducts.filter((p) => {
      if (hasBrands && !filterBrands.some(fb => fb.toLowerCase() === p.marca.toLowerCase())) return false;
      if (min !== null && p.precio < min) return false;
      if (max !== null && p.precio > max) return false;
      return true;
    });
    if (sortOrder === "asc") return [...results].sort((a, b) => a.precio - b.precio);
    if (sortOrder === "desc") return [...results].sort((a, b) => b.precio - a.precio);
    return results;
  }, [allProducts, filterBrands, minPrice, maxPrice, sortOrder]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const minP = minPrice !== "" ? parseFloat(minPrice) : null;
    const maxP = maxPrice !== "" ? parseFloat(maxPrice) : null;
    const words = q.split(/\s+/).filter((w) => w.length > 1);

    return allProducts
      .map((p) => {
        if (minP !== null && p.precio < minP) return null;
        if (maxP !== null && p.precio > maxP) return null;
        const name = p.perfume.toLowerCase();
        const brand = p.marca.toLowerCase();
        let score = 0;
        if (name === q || brand === q) score = 100;
        else if (name.startsWith(q) || brand.startsWith(q)) score = 80;
        else if (name.includes(q) || brand.includes(q)) score = 60;
        else if (words.length > 0 && words.every((w) => name.includes(w) || brand.includes(w))) score = 40;
        else if (words.some((w) => w.length > 2 && (name.includes(w) || brand.includes(w)))) score = 20;
        return score > 0 ? { ...p, _score: score } : null;
      })
      .filter(Boolean)
      .sort((a: any, b: any) => {
        if (sortOrder === "asc") return a.precio - b.precio;
        if (sortOrder === "desc") return b.precio - a.precio;
        return b._score - a._score;
      }) as Product[];
  }, [allProducts, query, minPrice, maxPrice, sortOrder]);

  const filterRef = useRef<HTMLDivElement>(null);
  const productCarouselRef = useRef<HTMLDivElement>(null);
  const brandCarouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, dir: 1 | -1) => {
    if (!ref.current) return;
    const first = ref.current.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 12 : 220;
    ref.current.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleBrand = (name: string) => {
    setSelectedBrands((prev) =>
      prev.includes(name) ? prev.filter((b) => b !== name) : [...prev, name]
    );
  };

  const filteredItems = featuredProducts.filter((p) => {
    const min = minPrice !== "" ? parseFloat(minPrice) : null;
    const max = maxPrice !== "" ? parseFloat(maxPrice) : null;
    if (min !== null && p.precio < min) return false;
    if (max !== null && p.precio > max) return false;
    return true;
  });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: t.bg, color: t.text }}>
      {/* Header */}
      <div className="relative" style={{ borderBottom: `1px solid ${t.border}` }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 70% at 50% -10%, ${t.shimmer}, transparent)`,
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-5 pt-6 sm:pt-8 pb-8 sm:pb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-5 sm:mb-8 text-xs uppercase tracking-[0.3em] transition-opacity hover:opacity-80"
            style={{ color: t.subtext }}
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <polyline points="5,1 1,5 5,9" />
              <line x1="1" y1="5" x2="13" y2="5" />
            </svg>
            Inicio
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display font-bold leading-tight mb-3"
            style={{ fontSize: "clamp(2.2rem, 7vw, 4.5rem)", color: t.text }}
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="text-sm font-light tracking-wide"
            style={{ color: t.subtext }}
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-5 py-6 sm:py-10 space-y-8 sm:space-y-12">
        {/* Search + Filter */}
        <div ref={filterRef} className="relative">
          <div className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar perfume o marca..."
              className="flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              style={{
                background: t.input,
                border: `1px solid ${t.border}`,
                color: t.text,
              }}
            />
            <button
              onClick={() => setFilterOpen((p) => !p)}
              className="px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2 transition-all duration-200"
              style={{
                background: filterOpen ? t.accent : t.input,
                border: `1px solid ${filterOpen ? t.accent : t.border}`,
                color: filterOpen ? t.accentFg : t.text,
              }}
            >
              <svg
                width="14"
                height="12"
                viewBox="0 0 14 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <line x1="0" y1="2" x2="14" y2="2" />
                <line x1="2" y1="6" x2="12" y2="6" />
                <line x1="4" y1="10" x2="10" y2="10" />
              </svg>
              Filtros
            </button>
          </div>

          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.22 }}
                className="absolute top-full left-0 right-0 mt-2 rounded-2xl p-4 sm:p-6 z-50"
                style={{
                  background: t.filterBg,
                  border: `1px solid ${t.border}`,
                  boxShadow: "0 24px 64px rgba(0,0,0,0.55)",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p
                      className="text-[10px] uppercase tracking-[0.3em] mb-3 font-medium"
                      style={{ color: t.accent }}
                    >
                      Marcas
                    </p>
                    <div className="flex flex-wrap gap-2 max-h-44 overflow-y-auto pr-1">
                      {brands.map((b) => (
                        <button
                          key={b.slug}
                          onClick={() => toggleBrand(b.name)}
                          className="px-3 py-1.5 rounded-lg text-xs transition-all duration-150"
                          style={{
                            background: selectedBrands.includes(b.name)
                              ? t.accent
                              : t.tag,
                            color: selectedBrands.includes(b.name)
                              ? t.accentFg
                              : t.text,
                            border: `1px solid ${
                              selectedBrands.includes(b.name)
                                ? t.accent
                                : "transparent"
                            }`,
                          }}
                        >
                          {b.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-4">
                      <p className="text-[10px] uppercase tracking-[0.3em] mb-2 font-medium" style={{ color: t.accent }}>Ordenar por</p>
                      <div className="flex gap-2">
                        {(["asc", "desc"] as const).map((v) => (
                          <button
                            key={v}
                            onClick={() => setSortOrder(sortOrder === v ? "" : v)}
                            className="flex-1 py-2 rounded-lg text-xs font-medium transition-all"
                            style={{
                              background: sortOrder === v ? t.accent : t.tag,
                              color: sortOrder === v ? t.accentFg : t.text,
                              border: `1px solid ${sortOrder === v ? t.accent : "transparent"}`,
                            }}
                          >
                            {v === "asc" ? "Precio + Bajo ↑" : "Precio + Alto ↓"}
                          </button>
                        ))}
                      </div>
                    </div>
                    <p
                      className="text-[10px] uppercase tracking-[0.3em] mb-3 font-medium"
                      style={{ color: t.accent }}
                    >
                      Precio (USD)
                    </p>
                    <div className="flex gap-2 items-center mb-5">
                      <input
                        type="number"
                        placeholder="Mín"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="flex-1 min-w-0 rounded-lg px-2 sm:px-3 py-2.5 text-sm outline-none"
                        style={{ background: t.input, border: `1px solid ${t.border}`, color: t.text }}
                      />
                      <span className="text-xs flex-shrink-0" style={{ color: t.subtext }}>—</span>
                      <input
                        type="number"
                        placeholder="Máx"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="flex-1 min-w-0 rounded-lg px-2 sm:px-3 py-2.5 text-sm outline-none"
                        style={{ background: t.input, border: `1px solid ${t.border}`, color: t.text }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setSelectedBrands([]); setMinPrice(""); setMaxPrice(""); setFilterBrands([]); setSortOrder(""); }}
                        className="flex-1 py-2.5 rounded-lg text-xs transition-opacity hover:opacity-70"
                        style={{ background: t.tag, color: t.subtext }}
                      >
                        Limpiar
                      </button>
                      <button
                        onClick={() => {
                          setFilterBrands(selectedBrands.map(n => brands.find(b => b.name === n)?.marcaKey ?? n));
                          setSelectedBrands([]);
                          setFilterOpen(false);
                        }}
                        className="flex-1 py-2.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-90"
                        style={{ background: t.accent, color: t.accentFg }}
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Resultados de búsqueda */}
        {isSearching && (
          <section className="pb-10">
            <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-xl sm:text-2xl font-semibold" style={{ color: t.text }}>Resultados</h2>
                <span className="text-sm" style={{ color: t.subtext }}>
                  {searchResults.length} perfume{searchResults.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex gap-2">
                {(["asc", "desc"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setSortOrder(sortOrder === v ? "" : v)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{
                      background: sortOrder === v ? t.accent : t.tag,
                      color: sortOrder === v ? t.accentFg : t.text,
                      border: `1px solid ${sortOrder === v ? t.accent : "transparent"}`,
                    }}
                  >
                    {v === "asc" ? "↑ + Bajo" : "↓ + Alto"}
                  </button>
                ))}
              </div>
            </div>
            {searchResults.length === 0 ? (
              <p className="text-sm py-12 text-center" style={{ color: t.subtext }}>
                No se encontraron perfumes para &ldquo;{query}&rdquo;
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchResults.slice(0, searchLimit).map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: Math.min(i * 0.02, 0.4) }}
                    whileHover={{ scale: 1.03, boxShadow: `0 0 22px ${t.accent}35, 0 0 0 1.5px ${t.accent}55`, zIndex: 2 }}
                    className="rounded-2xl overflow-hidden flex flex-col cursor-default"
                    style={{ background: t.cardBg, border: `1px solid ${t.border}`, position: "relative" }}
                  >
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4", background: "#ffffff" }}>
                      {item.imagen_url ? (
                        <img src={item.imagen_url} alt={item.perfume} className="w-full h-full object-contain pointer-events-none" draggable={false} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ color: t.subtext }}>
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                        </div>
                      )}
                    </div>
                    <div className="p-3 flex flex-col gap-0.5">
                      <p className="text-[9px] uppercase tracking-[0.3em] font-semibold" style={{ color: t.accent }}>{item.marca}</p>
                      <p className="text-xs font-medium leading-snug line-clamp-2" style={{ color: t.text }}>{item.perfume}</p>
                      <div className="flex items-center justify-between gap-1 mt-1">
                        <p className="text-sm font-bold" style={{ color: t.accent }}>USD {item.precio}</p>
                        <motion.a
                          href={buildWhatsAppUrl(item)}
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
                ))}
              </div>
            )}
            {searchLimit < searchResults.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setSearchLimit((prev) => prev + 24)}
                  className="px-6 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ background: t.tag, border: `1px solid ${t.border}`, color: t.text }}
                >
                  Cargar {Math.min(24, searchResults.length - searchLimit)} más &nbsp;({searchLimit}/{searchResults.length})
                </button>
              </div>
            )}
          </section>
        )}

        {/* Los perfumes más pedidos — solo visible sin filtros activos */}
        {!isSearching && !filtersActive && <section>
          <div className="flex items-center gap-2 sm:gap-4 mb-5 sm:mb-6">
            <h2
              className="font-display text-lg sm:text-2xl lg:text-3xl font-semibold"
              style={{ color: t.text }}
            >
              Los perfumes más pedidos
            </h2>
            <div className="flex-1 h-px" style={{ background: t.border }} />
            <div className="flex gap-1 sm:gap-2 flex-shrink-0">
              <CarouselArrow dir="left" accent={t.accent} accentFg={t.accentFg} border={t.border} cardBg={t.cardBg} onClick={() => scrollCarousel(productCarouselRef, -1)} />
              <CarouselArrow dir="right" accent={t.accent} accentFg={t.accentFg} border={t.border} cardBg={t.cardBg} onClick={() => scrollCarousel(productCarouselRef, 1)} />
            </div>
          </div>

          <div
            ref={productCarouselRef}
            className="flex gap-4 overflow-x-auto pb-3 hide-scrollbar"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            } as React.CSSProperties}
          >
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -3, boxShadow: `0 0 28px ${t.accent}45, 0 0 0 1.5px ${t.accent}70` }}
                className="rounded-2xl overflow-hidden flex flex-col flex-shrink-0 cursor-default w-[calc(50%-8px)] sm:w-[220px]"
                style={{
                  background: t.cardBg,
                  border: `1px solid ${t.border}`,
                  scrollSnapAlign: "start",
                }}
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4", background: "#ffffff" }}>
                  {item.imagen_url ? (
                    <img
                      src={item.imagen_url}
                      alt={item.perfume}
                      className="w-full h-full object-contain pointer-events-none"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ color: t.subtext }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M12 2C8 2 4 5 4 9c0 5 8 13 8 13s8-8 8-13c0-4-4-7-8-7z" />
                      </svg>
                    </div>
                  )}
                  <div
                    className="absolute inset-x-0 bottom-0 h-16"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}
                  />
                </div>
                <div className="p-3 flex flex-col gap-0.5">
                  <p
                    className="text-[9px] uppercase tracking-[0.3em] font-semibold"
                    style={{ color: t.accent }}
                  >
                    {item.marca}
                  </p>
                  <p
                    className="text-xs font-medium leading-snug line-clamp-2"
                    style={{ color: t.text }}
                  >
                    {item.perfume}
                  </p>
                  <div className="flex items-center justify-between gap-1 mt-1">
                    <p className="text-sm font-bold" style={{ color: t.accent }}>USD {item.precio}</p>
                    <motion.a
                      href={buildWhatsAppUrl(item)}
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
            ))}
          </div>
        </section>}

        {!isSearching && <>
        {/* Catálogo por marcas */}
        <section className="pb-2">
          <div className="flex items-center gap-2 sm:gap-4 mb-3">
            <h2
              className="font-display text-lg sm:text-2xl lg:text-3xl font-semibold"
              style={{ color: t.text }}
            >
              Catálogo por marcas
            </h2>
            <div className="flex-1 h-px" style={{ background: t.border }} />
            {filterBrands.length === 0 && (
              <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                <CarouselArrow dir="left" accent={t.accent} accentFg={t.accentFg} border={t.border} cardBg={t.cardBg} onClick={() => scrollCarousel(brandCarouselRef, -1)} />
                <CarouselArrow dir="right" accent={t.accent} accentFg={t.accentFg} border={t.border} cardBg={t.cardBg} onClick={() => scrollCarousel(brandCarouselRef, 1)} />
              </div>
            )}
          </div>

          {filterBrands.length === 0 ? (
            <>
              <p className="text-xs sm:text-sm mb-4 sm:mb-6" style={{ color: t.subtext }}>
                Elegí tu marca favorita y descubrí sus productos
              </p>
              <div
                ref={brandCarouselRef}
                className="flex gap-3 overflow-x-auto pb-3 hide-scrollbar"
                style={{
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                } as React.CSSProperties}
              >
                {brands
                  .filter((b) => {
                    const q = query.toLowerCase();
                    return !q || b.name.toLowerCase().includes(q);
                  })
                  .map((brand, i) => (
                    <BrandCard
                      key={brand.slug}
                      brand={brand}
                      t={t}
                      index={i}
                      onClick={() => setFilterBrands([brand.marcaKey ?? brand.name])}
                    />
                  ))}
              </div>
            </>
          ) : (
            <div className="flex items-center flex-wrap gap-3 mt-3 mb-6">
              {filterBrands.length === 1 ? (
                (() => {
                  const b = brands.find((b) => (b.marcaKey ?? b.name).toLowerCase() === filterBrands[0].toLowerCase());
                  return b ? <BrandCard brand={b} t={t} index={0} /> : null;
                })()
              ) : (
                <div className="flex flex-wrap gap-3">
                  {filterBrands.map((key, i) => {
                    const b = brands.find((b) => (b.marcaKey ?? b.name).toLowerCase() === key.toLowerCase());
                    return b ? <BrandCard key={key} brand={b} t={t} index={i} /> : null;
                  })}
                </div>
              )}
              <button
                onClick={() => { setFilterBrands([]); setMinPrice(""); setMaxPrice(""); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                style={{ background: t.tag, border: `1px solid ${t.border}`, color: t.text }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="1" y1="1" x2="11" y2="11" />
                  <line x1="11" y1="1" x2="1" y2="11" />
                </svg>
                Limpiar
              </button>
            </div>
          )}
        </section>

        {/* Grid de productos filtrados */}
        <AnimatePresence>
          {filtersActive && (() => {
            const catalogProducts = filteredCatalogProducts;
            return (
              <motion.section
                key={filterBrands.join(",") + "|" + minPrice + "|" + maxPrice}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.35 }}
                className="pb-10"
              >
                <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
                  <p className="text-xs" style={{ color: t.subtext }}>
                    {catalogProducts.length} producto{catalogProducts.length !== 1 ? "s" : ""}
                  </p>
                  <div className="flex gap-2">
                    {(["asc", "desc"] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => setSortOrder(sortOrder === v ? "" : v)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={{
                          background: sortOrder === v ? t.accent : t.tag,
                          color: sortOrder === v ? t.accentFg : t.text,
                          border: `1px solid ${sortOrder === v ? t.accent : "transparent"}`,
                        }}
                      >
                        {v === "asc" ? "↑ Precio + Bajo" : "↓ Precio + Alto"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {catalogProducts.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.5) }}
                      whileHover={{ scale: 1.03, boxShadow: `0 0 22px ${t.accent}35, 0 0 0 1.5px ${t.accent}55`, zIndex: 2 }}
                      className="rounded-2xl overflow-hidden flex flex-col cursor-default"
                      style={{ background: t.cardBg, border: `1px solid ${t.border}`, position: "relative" }}
                    >
                      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4", background: "#ffffff" }}>
                        {item.imagen_url ? (
                          <img
                            src={item.imagen_url}
                            alt={item.perfume}
                            className="w-full h-full object-contain pointer-events-none"
                            draggable={false}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center" style={{ color: t.subtext }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
                          </div>
                        )}
                      </div>
                      <div className="p-3 flex flex-col gap-0.5">
                        <p className="text-[9px] uppercase tracking-[0.3em] font-semibold" style={{ color: t.accent }}>
                          {item.marca}
                        </p>
                        <p className="text-xs font-medium leading-snug line-clamp-2" style={{ color: t.text }}>
                          {item.perfume}
                        </p>
                        <div className="flex items-center justify-between gap-1 mt-1">
                          <p className="text-sm font-bold" style={{ color: t.accent }}>USD {item.precio}</p>
                          <motion.a
                            href={buildWhatsAppUrl(item)}
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
                  ))}
                </div>
              </motion.section>
            );
          })()}
        </AnimatePresence>
        </>}
      </div>
    </div>
  );
}

function BrandCard({
  brand,
  t,
  index,
  onClick,
}: {
  brand: Brand;
  t: Theme;
  index: number;
  onClick?: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  const cardBg = brand.cardBg
    ?? (brand.logo.includes("black-background") ? "#000000" : "#ffffff");
  const darkBg = cardBg !== "#ffffff";
  const cardBorder = darkBg ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const fallbackColor = darkBg ? "#ffffff" : "#111111";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.4) }}
      whileHover={{ y: -4, boxShadow: `0 10px 30px rgba(0,0,0,0.22), 0 0 0 2px ${t.accent}66` }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex items-center justify-center cursor-pointer flex-shrink-0"
      style={{
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        borderRadius: 16,
        boxShadow: "0 2px 12px rgba(0,0,0,0.09)",
        scrollSnapAlign: "start",
        width: "min(46vw, 170px)",
        height: 150,
        padding: 16,
      }}
    >
      {brand.logo && !imgError ? (
        <img
          src={brand.logo}
          alt={brand.name}
          style={{
            maxWidth: "100%",
            maxHeight: 118,
            width: "auto",
            height: "auto",
            objectFit: "contain",
            display: "block",
            backgroundColor: darkBg ? "transparent" : "#ffffff",
          }}
          onError={() => setImgError(true)}
          draggable={false}
        />
      ) : (
        <p
          className="text-center font-bold leading-tight"
          style={{
            fontSize: brand.name.length > 12 ? 11 : brand.name.length > 8 ? 13 : 15,
            color: fallbackColor,
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.02em",
          }}
        >
          {brand.name}
        </p>
      )}
    </motion.div>
  );
}

function CarouselArrow({
  dir,
  accent,
  accentFg,
  border,
  cardBg,
  onClick,
}: {
  dir: "left" | "right";
  accent: string;
  accentFg: string;
  border: string;
  cardBg: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
      className="flex items-center justify-center rounded-full flex-shrink-0 transition-colors"
      style={{
        width: 36,
        height: 36,
        background: cardBg,
        border: `1px solid ${border}`,
        color: accent,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = accent;
        (e.currentTarget as HTMLButtonElement).style.color = accentFg;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = cardBg;
        (e.currentTarget as HTMLButtonElement).style.color = accent;
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {dir === "left" ? (
          <>
            <polyline points="9,2 4,7 9,12" />
          </>
        ) : (
          <>
            <polyline points="5,2 10,7 5,12" />
          </>
        )}
      </svg>
    </motion.button>
  );
}
