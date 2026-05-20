export interface Brand {
  name: string;
  logo: string;
  slug: string;
  cardBg?: string;
  origin?: string;
  perfumes?: unknown[];
}

const L: Record<string, string> = {
  afnan:           "https://fimgs.net/mdimg/dizajneri/o.2048.jpg",
  alHaramain:      "https://fimgs.net/mdimg/dizajneri/o.429.jpg",
  armaf:           "https://fimgs.net/mdimg/dizajneri/o.2068.jpg",
  bharara:         "https://acdn-us.mitiendanube.com/stores/004/407/494/products/logo-bharara-37026f4cf035d1dfbc17271366844331-1024-1024.webp",
  lattafa:         "https://fimgs.net/mdimg/dizajneri/m.1979.jpg",
  frenchAvenue:    "https://yt3.googleusercontent.com/qi8gPyGq6picwcyClIV5E96vQWX4K-sHpdhNBRDUzIP7WwAZ-TvIfKPr2Q7Gs7k2IYTpJ62LUrM=s900-c-k-c0x00ffffff-no-rj",
  rayhaan:         "https://fimgs.net/mdimg/dizajneri/o.6029.jpg",
  hawas:           "https://fimgs.net/mdimg/dizajneri/o.888.jpg",
  antBanderas:     "https://fimgs.net/mdimg/dizajneri/o.5.jpg",
  armani:          "https://static.vecteezy.com/system/resources/thumbnails/023/585/874/small/giorgio-armani-logo-brand-clothes-white-design-fashion-symbol-illustration-with-black-background-free-vector.jpg",
  azzaro:          "https://fimgs.net/mdimg/dizajneri/o.8.jpg",
  benetton:        "https://logoeps.com/wp-content/uploads/2013/01/benetton-.eps-logo-vector.png",
  burberry:        "https://media.fashionnetwork.com/cdn-cgi/image/fit=cover,width=440,height=248,format=auto/m/729b/4f15/ad93/6733/a228/7c61/f4ea/98a5/b081/1317/1317.jpg",
  carolinaHerrera: "https://1000marcas.net/wp-content/uploads/2019/12/logo-Carolina-Herrer.png",
  chanel:          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQahc9-wbC0L-AZYjOFVlWbGNPJlUPL45X4PQ&s",
  calvinKlein:     "https://upload.wikimedia.org/wikipedia/commons/e/e2/CK_Calvin_Klein_logo.svg",
  dior:            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Dior_Logo.svg/3840px-Dior_Logo.svg.png",
  dolceGabbana:    "https://1000marcas.net/wp-content/uploads/2020/01/logo-Dolce-and-Gabbana.png",
  ferrari:         "https://www.rioperfumes.co.za/cdn/shop/collections/logo_3cc63d70-a47d-4ac5-b202-351d6565f95e.jpg?v=1563060949",
  givenchy:        "https://1000marcas.net/wp-content/uploads/2020/02/Givenchy-Logo.png",
  gucci:           "https://cdn.worldvectorlogo.com/logos/gucci-4.svg",
  halloween:       "https://www.newsfragancias.com/wp-content/uploads/2015/02/Logo-Halloween-Marca_5W.webp",
  hugoBoss:        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Hugo-Boss-Logo.svg/960px-Hugo-Boss-Logo.svg.png",
  jpGaultier:      "https://images.seeklogo.com/logo-png/7/1/jean-paul-gaultier-logo-png_seeklogo-75250.png",
  lacoste:         "https://cdn.worldvectorlogo.com/logos/lacoste-logo.svg",
  parfumsMarly:    "https://media.licdn.com/dms/image/v2/D4E0BAQHf0rDex1LcXg/company-logo_200_200/B4EZmAbGTnKcAM-/0/1758796212353/parfums_de_marly_logo?e=2147483647&v=beta&t=MHpbviv2JD_4FJuxJJQZXegtZe49fB71Ii1tl52g--x4",
  mercedes:        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Mercedes-Benz_logo_2.svg/3840px-Mercedes-Benz_logo_2.svg.png",
  montBlanc:       "https://cdn.worldvectorlogo.com/logos/mont-blanc-1.svg",
  montale:         "https://images.seeklogo.com/logo-png/29/2/montale-paris-logo-png_seeklogo-290763.png",
  moschino:        "https://1000marcas.net/wp-content/uploads/2020/03/Moschino-logo-1.png",
  pacoRabanne:     "https://cdn.worldvectorlogo.com/logos/paco-rabanne-1.svg",
  prada:           "https://images.icon-icons.com/2845/PNG/512/prada_logo_icon_181409.png",
  ralphLauren:     "https://i.pinimg.com/474x/c3/54/e2/c354e2fb10eff981c580d43ef2fc41d4.jpg",
  ferragamo:       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShW5_gze5Jw7nsrSZ_5B7WbXdFcZwjgWuEeA&s",
  tommy:           "https://static.vecteezy.com/system/resources/thumbnails/010/994/288/small/tommy-hilfiger-symbol-logo-red-and-blue-with-name-clothes-design-icon-abstract-football-illustration-with-white-background-free-vector.jpg",
  valentino:       "https://static.vecteezy.com/system/resources/previews/024/131/240/non_2x/valentino-brand-symbol-white-logo-clothes-design-icon-abstract-illustration-with-black-background-free-vector.jpg",
  versace:         "https://1000marcas.net/wp-content/uploads/2019/11/Versace-logo-5.png",
  xerjoff:         "https://vesaura.com/cdn/shop/collections/Xerjoff_500x500_4b532273-b9f2-4aa6-a4f2-86deb55d2833.png?v=1729180664",
  ysl:             "https://static.vecteezy.com/system/resources/thumbnails/024/131/481/small/ysl-yves-saint-laurent-brand-logo-black-symbol-clothes-design-icon-abstract-illustration-free-vector.jpg",
  cacharel:        "https://cdn.worldvectorlogo.com/logos/cacharel-paris.svg",
  creed:           "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Creed_Fragrances_logo.svg/1280px-Creed_Fragrances_logo.svg.png",
  kenzo:           "https://thumbs.dreamstime.com/b/kenzo-logo-120007058.jpg",
  marcJacobs:      "https://i.pinimg.com/736x/62/29/24/62292401feb5d0f7402a4b1e8cec34a4.jpg",
  narciso:         "https://images.seeklogo.com/logo-png/62/1/narciso-rodriguez-logo-png_seeklogo-625199.png",
  sabrina:         "https://fimgs.net/mdimg/dizajneri/o.4929.jpg",
  shakira:         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8PNfTm6AiPj8DiHjn1xj94LcdHgKtcvA39Q&s",
  viktorRolf:      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Viktor_%26_Rolf.svg/3840px-Viktor_%26_Rolf.svg.png",
};

export const arabicBrands: Brand[] = [
  { name: "Afnan",         logo: L.afnan,       slug: "afnan",        cardBg: "#0a0f1e" },
  { name: "Al Haramain",   logo: L.alHaramain,  slug: "al-haramain" },
  { name: "Armaf",         logo: L.armaf,       slug: "armaf" },
  { name: "Bharara",       logo: L.bharara,     slug: "bharara" },
  { name: "Lattafa",       logo: L.lattafa,     slug: "lattafa" },
  { name: "French Avenue", logo: L.frenchAvenue,slug: "french-avenue", cardBg: "#000000" },
  { name: "Rayhaan",       logo: L.rayhaan,     slug: "rayhaan" },
  { name: "Hawas",         logo: L.hawas,       slug: "hawas" },
];

export const masculineBrands: Brand[] = [
  { name: "Antonio Banderas",    logo: L.antBanderas,   slug: "antonio-banderas" },
  { name: "Armani",              logo: L.armani,        slug: "armani",      cardBg: "#000000" },
  { name: "Azzaro",              logo: L.azzaro,        slug: "azzaro" },
  { name: "Benetton",            logo: L.benetton,      slug: "benetton" },
  { name: "Burberry",            logo: L.burberry,      slug: "burberry" },
  { name: "Carolina Herrera",    logo: L.carolinaHerrera, slug: "carolina-herrera" },
  { name: "Chanel",              logo: L.chanel,        slug: "chanel" },
  { name: "Calvin Klein",        logo: L.calvinKlein,   slug: "calvin-klein" },
  { name: "Dior",                logo: L.dior,          slug: "dior" },
  { name: "Dolce & Gabbana",     logo: L.dolceGabbana,  slug: "dolce-gabbana" },
  { name: "Ferrari",             logo: L.ferrari,       slug: "ferrari" },
  { name: "Givenchy",            logo: L.givenchy,      slug: "givenchy" },
  { name: "Gucci",               logo: L.gucci,         slug: "gucci" },
  { name: "Halloween",           logo: L.halloween,     slug: "halloween" },
  { name: "Hugo Boss",           logo: L.hugoBoss,      slug: "hugo-boss" },
  { name: "Jean Paul Gaultier",  logo: L.jpGaultier,    slug: "jean-paul-gaultier" },
  { name: "Lacoste",             logo: L.lacoste,       slug: "lacoste" },
  { name: "Parfums de Marly",    logo: L.parfumsMarly,  slug: "parfums-de-marly" },
  { name: "Mercedes",            logo: L.mercedes,      slug: "mercedes" },
  { name: "Mont Blanc",          logo: L.montBlanc,     slug: "mont-blanc" },
  { name: "Montale",             logo: L.montale,       slug: "montale" },
  { name: "Moschino",            logo: L.moschino,      slug: "moschino" },
  { name: "Paco Rabanne",        logo: L.pacoRabanne,   slug: "paco-rabanne" },
  { name: "Prada",               logo: L.prada,         slug: "prada" },
  { name: "Polo Ralph Lauren",   logo: L.ralphLauren,   slug: "polo-ralph-lauren" },
  { name: "Salvatore Ferragamo", logo: L.ferragamo,     slug: "salvatore-ferragamo" },
  { name: "Tommy Hilfiger",      logo: L.tommy,         slug: "tommy" },
  { name: "Valentino",           logo: L.valentino,     slug: "valentino",   cardBg: "#000000" },
  { name: "Versace",             logo: L.versace,       slug: "versace" },
  { name: "Xerjoff",             logo: L.xerjoff,       slug: "xerjoff" },
  { name: "YSL",                 logo: L.ysl,           slug: "ysl" },
];

export const feminineBrands: Brand[] = [
  { name: "Antonio Banderas",    logo: L.antBanderas,    slug: "antonio-banderas" },
  { name: "Armani",              logo: L.armani,         slug: "armani",      cardBg: "#000000" },
  { name: "Benetton",            logo: L.benetton,       slug: "benetton" },
  { name: "Burberry",            logo: L.burberry,       slug: "burberry" },
  { name: "Cacharel",            logo: L.cacharel,       slug: "cacharel" },
  { name: "Carolina Herrera",    logo: L.carolinaHerrera,slug: "carolina-herrera" },
  { name: "Chanel",              logo: L.chanel,         slug: "chanel" },
  { name: "Calvin Klein",        logo: L.calvinKlein,    slug: "calvin-klein" },
  { name: "Creed",               logo: L.creed,          slug: "creed" },
  { name: "Dior",                logo: L.dior,           slug: "dior" },
  { name: "Dolce & Gabbana",     logo: L.dolceGabbana,   slug: "dolce-gabbana" },
  { name: "Givenchy",            logo: L.givenchy,       slug: "givenchy" },
  { name: "Gucci",               logo: L.gucci,          slug: "gucci" },
  { name: "Halloween",           logo: L.halloween,      slug: "halloween" },
  { name: "Hugo Boss",           logo: L.hugoBoss,       slug: "hugo-boss" },
  { name: "Jean Paul Gaultier",  logo: L.jpGaultier,     slug: "jean-paul-gaultier" },
  { name: "Kenzo",               logo: L.kenzo,          slug: "kenzo" },
  { name: "Lacoste",             logo: L.lacoste,        slug: "lacoste" },
  { name: "Marc Jacobs",         logo: L.marcJacobs,     slug: "marc-jacobs" },
  { name: "Mont Blanc",          logo: L.montBlanc,      slug: "mont-blanc" },
  { name: "Moschino",            logo: L.moschino,       slug: "moschino" },
  { name: "Narciso Rodriguez",   logo: L.narciso,        slug: "narciso-rodriguez" },
  { name: "Paco Rabanne",        logo: L.pacoRabanne,    slug: "paco-rabanne" },
  { name: "Prada",               logo: L.prada,          slug: "prada" },
  { name: "Polo Ralph Lauren",   logo: L.ralphLauren,    slug: "polo-ralph-lauren" },
  { name: "Sabrina Carpenter",   logo: L.sabrina,        slug: "sabrina-carpenter" },
  { name: "Salvatore Ferragamo", logo: L.ferragamo,      slug: "salvatore-ferragamo" },
  { name: "Shakira",             logo: L.shakira,        slug: "shakira" },
  { name: "Tommy Hilfiger",      logo: L.tommy,          slug: "tommy" },
  { name: "Valentino",           logo: L.valentino,      slug: "valentino",  cardBg: "#000000" },
  { name: "Versace",             logo: L.versace,        slug: "versace" },
  { name: "Viktor & Rolf",       logo: L.viktorRolf,     slug: "viktor-rolf" },
  { name: "Xerjoff",             logo: L.xerjoff,        slug: "xerjoff" },
  { name: "YSL",                 logo: L.ysl,            slug: "ysl" },
];

export interface Perfume {
  id: number;
  perfume: string;
  marca: string;
  categoria: string;
  genero: string;
  precio: number;
  imagen_url?: string;
}

export const FEATURED_IDS: Record<"arabes" | "masculino" | "femenino", number[]> = {
  arabes:    [930, 985, 919, 977, 950, 1039, 942, 1022, 1027, 972],
  masculino: [1089, 1208, 1293, 1426, 1411, 1437, 1289, 1101, 1160, 1085, 1371, 1075],
  femenino:  [1814, 1506, 1758, 1690, 1467, 1589, 1795, 1737, 1494, 1638],
};
