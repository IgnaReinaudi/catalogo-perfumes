import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(process.cwd(), ".env.local");
const envContent = readFileSync(envPath, "utf-8");
const env = Object.fromEntries(
  envContent.split("\n")
    .filter(l => l.includes("=") && !l.startsWith("#"))
    .map(l => { const [k, ...v] = l.split("="); return [k.trim(), v.join("=").trim()]; })
);

const url = env["NEXT_PUBLIC_SUPABASE_URL"]?.replace(/\/rest\/v1\/?$/, "");
const key = env["SUPABASE_SERVICE_ROLE_KEY"];
const supabase = createClient(url, key);

const updates = [
  { id: 1790, perfume: "TOMMY GIRL 100ML",                          imagen_url: "https://http2.mlstatic.com/D_NQ_NP_795369-MLU73613257046_122023-O.webp" },
  { id: 1172, perfume: "CK ETERNITY AROMATIC ESS.PARFUM INT.MAS 50ML", imagen_url: "https://www.blessimport.com.py/image/cache/catalog/perfumeecosmeticos/9014571-2048x2048.png" },
];

for (const u of updates) {
  const { error } = await supabase
    .from("perfumes")
    .update({ imagen_url: u.imagen_url })
    .eq("id", u.id);

  if (error) {
    console.log(`❌ Error en ID ${u.id} (${u.perfume}): ${error.message}`);
  } else {
    console.log(`✓ ID ${u.id} | ${u.perfume}`);
  }
}

console.log("\nListo.");
