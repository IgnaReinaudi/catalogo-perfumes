import CategoryPageLayout from "@/components/CategoryPageLayout";
import { masculineBrands, FEATURED_IDS } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/supabase";

export default async function MasculinoPage() {
  const ids = FEATURED_IDS.masculino;

  const [{ data: featuredData }, { data: allData }] = await Promise.all([
    supabase
      .from("perfumes")
      .select("id,perfume,marca,categoria,genero,precio,imagen_url")
      .in("id", ids),
    supabase
      .from("perfumes")
      .select("id,perfume,marca,categoria,genero,precio,imagen_url")
      .eq("categoria", "Disenador")
      .eq("genero", "masculino")
      .order("marca")
      .order("perfume"),
  ]);

  const byId = Object.fromEntries((featuredData ?? []).map((p: Product) => [p.id, p]));
  const featured = ids.map((id) => byId[id]).filter(Boolean) as Product[];

  return (
    <CategoryPageLayout
      category="masculine"
      title="Perfumes Masculinos"
      subtitle="Las casas de diseño más icónicas del mundo — elegancia y carácter en cada frasco"
      brands={masculineBrands}
      featuredProducts={featured}
      allProducts={(allData ?? []) as Product[]}
    />
  );
}
