import CategoryPageLayout from "@/components/CategoryPageLayout";
import { feminineBrands, FEATURED_IDS } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/supabase";

export default async function FemeninoPage() {
  const ids = FEATURED_IDS.femenino;

  const [{ data: featuredData }, { data: allData }] = await Promise.all([
    supabase
      .from("perfumes")
      .select("id,perfume,marca,categoria,genero,precio,imagen_url")
      .in("id", ids),
    supabase
      .from("perfumes")
      .select("id,perfume,marca,categoria,genero,precio,imagen_url")
      .eq("categoria", "Disenador")
      .eq("genero", "femenino")
      .order("marca")
      .order("perfume"),
  ]);

  const byId = Object.fromEntries((featuredData ?? []).map((p: Product) => [p.id, p]));
  const featured = ids.map((id) => byId[id]).filter(Boolean) as Product[];

  return (
    <CategoryPageLayout
      category="feminine"
      title="Perfumes Femeninos"
      subtitle="Glamour, sofisticación y sensualidad — las grandes firmas de la alta perfumería"
      brands={feminineBrands}
      featuredProducts={featured}
      allProducts={(allData ?? []) as Product[]}
    />
  );
}
