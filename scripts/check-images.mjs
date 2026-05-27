import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// Parse .env.local
const envPath = resolve(process.cwd(), ".env.local");
const envContent = readFileSync(envPath, "utf-8");
const env = Object.fromEntries(
  envContent.split("\n")
    .filter(l => l.includes("=") && !l.startsWith("#"))
    .map(l => { const [k, ...v] = l.split("="); return [k.trim(), v.join("=").trim()]; })
);

const url = env["NEXT_PUBLIC_SUPABASE_URL"]?.replace(/\/rest\/v1\/?$/, "");
const key = env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];
const supabase = createClient(url, key);

async function checkUrl(url) {
  try {
    // Use GET with Range to avoid downloading full image; avoids HEAD 405 from mlstatic
    const res = await fetch(url, {
      method: "GET",
      headers: { "Range": "bytes=0-1023" },
      signal: AbortSignal.timeout(10000),
    });
    // 200 or 206 (partial content) = image exists
    if (res.status === 200 || res.status === 206) {
      const ct = res.headers.get("content-type") || "";
      if (!ct.startsWith("image/")) return `content-type no es imagen: ${ct}`;
      return "ok";
    }
    return `HTTP ${res.status}`;
  } catch (e) {
    return `ERROR: ${e.message}`;
  }
}

const { data, error } = await supabase
  .from("perfumes")
  .select("id, perfume, marca, imagen_url")
  .not("imagen_url", "is", null)
  .order("marca");

if (error) { console.error("Supabase error:", error.message); process.exit(1); }

console.log(`Revisando ${data.length} productos con imagen_url...\n`);

const broken = [];
for (const p of data) {
  const result = await checkUrl(p.imagen_url);
  if (result !== "ok") {
    broken.push({ id: p.id, perfume: p.perfume, marca: p.marca, url: p.imagen_url, error: result });
  }
}

console.log(`=== IMAGENES ROTAS (${broken.length} de ${data.length}) ===\n`);
for (const b of broken) {
  console.log(`ID ${b.id} | ${b.marca} | ${b.perfume}`);
  console.log(`  Motivo: ${b.error}`);
  console.log(`  URL: ${b.url}\n`);
}
if (broken.length === 0) console.log("Todas las imagenes cargan correctamente.");
