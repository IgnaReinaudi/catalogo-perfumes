import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// ─── Config ────────────────────────────────────────────────────────────────
const envPath = resolve(process.cwd(), ".env.local");
const envContent = readFileSync(envPath, "utf-8");
const env = Object.fromEntries(
  envContent.split("\n")
    .filter(l => l.includes("=") && !l.startsWith("#"))
    .map(l => { const [k, ...v] = l.split("="); return [k.trim(), v.join("=").trim()]; })
);

const supabaseUrl = env["NEXT_PUBLIC_SUPABASE_URL"]?.replace(/\/rest\/v1\/?$/, "");
const serviceKey  = env["SUPABASE_SERVICE_ROLE_KEY"];
const supabase    = createClient(supabaseUrl, serviceKey);

const BUCKET      = "perfumes";
const CONCURRENCY = 5; // imágenes en paralelo

// ─── Helpers ───────────────────────────────────────────────────────────────
function extFromContentType(ct = "") {
  if (ct.includes("webp")) return "webp";
  if (ct.includes("png"))  return "png";
  if (ct.includes("gif"))  return "gif";
  if (ct.includes("avif")) return "avif";
  return "jpg";
}

function extFromUrl(url) {
  try {
    const p = new URL(url).pathname;
    const m = p.match(/\.(webp|png|gif|avif|jpe?g)($|\?)/i);
    return m ? m[1].toLowerCase().replace("jpeg", "jpg") : null;
  } catch { return null; }
}

async function downloadImage(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
      "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
      "Referer": "https://www.google.com/",
    },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ct = res.headers.get("content-type") || "";
  if (!ct.startsWith("image/")) throw new Error(`No es imagen (${ct})`);
  const ext         = extFromUrl(url) || extFromContentType(ct);
  const contentType = ct.split(";")[0].trim();
  const buffer      = Buffer.from(await res.arrayBuffer());
  return { buffer, ext, contentType };
}

async function migrateOne(p, index, total) {
  const tag = `[${String(index).padStart(4)}/${total}] ID ${p.id}`;
  try {
    const { buffer, ext, contentType } = await downloadImage(p.imagen_url);
    const fileName = `${p.id}.${ext}`;

    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, buffer, { contentType, upsert: true });
    if (upErr) throw new Error(`Storage: ${upErr.message}`);

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(fileName);

    const { error: dbErr } = await supabase
      .from("perfumes")
      .update({ imagen_url: publicUrl })
      .eq("id", p.id);
    if (dbErr) throw new Error(`DB: ${dbErr.message}`);

    console.log(`✓ ${tag} | ${p.perfume}`);
    return "ok";
  } catch (err) {
    console.log(`❌ ${tag} | ${p.perfume} → ${err.message}`);
    return "fail";
  }
}

// ─── Main ──────────────────────────────────────────────────────────────────
const { data: perfumes, error: fetchErr } = await supabase
  .from("perfumes")
  .select("id, perfume, imagen_url")
  .not("imagen_url", "is", null)
  .not("imagen_url", "ilike", "%supabase.co%")
  .order("id");

if (fetchErr) { console.error("Error al traer perfumes:", fetchErr.message); process.exit(1); }

console.log(`\n🚀 Migrando ${perfumes.length} imágenes (${CONCURRENCY} en paralelo)...\n`);

let ok = 0, fail = 0;
const total = perfumes.length;

// Process in batches of CONCURRENCY
for (let i = 0; i < total; i += CONCURRENCY) {
  const batch   = perfumes.slice(i, i + CONCURRENCY);
  const results = await Promise.all(
    batch.map((p, j) => migrateOne(p, i + j + 1, total))
  );
  results.forEach(r => r === "ok" ? ok++ : fail++);
}

console.log(`\n${"─".repeat(50)}`);
console.log(`✅ Exitosas : ${ok}`);
console.log(`❌ Fallidas : ${fail}`);
console.log(`📦 Total    : ${total}`);
