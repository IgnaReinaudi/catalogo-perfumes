import CategoryPageLayout from "@/components/CategoryPageLayout";
import { arabicBrands, FEATURED_IDS } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/supabase";

export default async function ArabesPage() {
  const ids = FEATURED_IDS.arabes;

  const [{ data: featuredData }, { data: allData }] = await Promise.all([
    supabase
      .from("perfumes")
      .select("id,perfume,marca,categoria,genero,precio,imagen_url")
      .in("id", ids),
    supabase
      .from("perfumes")
      .select("id,perfume,marca,categoria,genero,precio,imagen_url")
      .eq("categoria", "Arabes")
      .order("marca")
      .order("perfume"),
  ]);

  const byId = Object.fromEntries((featuredData ?? []).map((p: Product) => [p.id, p]));
  const featured = ids.map((id) => byId[id]).filter(Boolean) as Product[];

  return (
    <CategoryPageLayout
      category="arabic"
      title="Perfumes Árabes"
      subtitle="Fragancias exquisitas del Medio Oriente — oud, ambar y especias milenarias"
      brands={arabicBrands}
      featuredProducts={featured}
      allProducts={(allData ?? []) as Product[]}
    />
  );
}
