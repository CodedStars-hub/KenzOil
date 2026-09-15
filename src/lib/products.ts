export type Category = {
  slug: string;
  name: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  description: string;
};

export const categories: Category[] = [
  { slug: "automotive", name: "Automotive Lubricants" },
  { slug: "industrial", name: "Industrial Lubricants" },
  { slug: "textile", name: "Textile Lubricants" },
  { slug: "metal-working", name: "Metal Working Oil" },
  { slug: "rubber-process", name: "Rubber Process Oil" },
  { slug: "transformer", name: "Transformer Oil" },
  { slug: "white-oil", name: "White Oil" },
  { slug: "grease", name: "Grease" },
];

export const products: Product[] = [
  // Automotive Lubricants
  {
    slug: "super-multigrade-engine-oil",
    name: "Super Multigrade Engine Oil",
    category: "automotive",
    description:
      "Kenzoil Super MG Oils are blended from high quality base stocks and a balanced additive package containing shear stable VI improver, metallic detergent dispersant, and anti-oxidant. Formulated to meet the lubrication requirements of both gasoline and diesel engines, offering maximum driving comfort, power, and longer engine life. Red in colour and suitable for all seasons.",
  },
  {
    slug: "motorcycle-engine-oil",
    name: "Motorcycle Engine Oil",
    category: "automotive",
    description:
      "Kenzoil 4T is a high performance engine oil for 4-stroke 2/3 wheelers, blended from high quality viscosity index base oil stocks with additives to meet stated performance standards. Specially developed for new generation 4-stroke gasoline engines.",
  },
  {
    slug: "diesel-engine-oils",
    name: "Diesel Engine Oils",
    category: "automotive",
    description:
      "Kenzoil Super 15W40/20W50 is a premium quality Super High Performance Diesel Engine Oil, engineered for modern, high performance diesel engines. Suitable for a wide range of heavy duty applications including trucks, mining, construction equipment, industrial and agricultural industries, and large power generation sets.",
  },
  {
    slug: "premium-cf4-15w40",
    name: "Kenzoil Premium CF-4 15W40",
    category: "automotive",
    description:
      "A premium quality, commercial multipurpose diesel engine oil. A highly advanced lubricant designed for demanding applications in naturally aspirated and turbo charged engines, suitable for both petrol and diesel engines in high output trucks, buses, and passenger cars, plus agricultural, commercial, industrial and construction equipment.",
  },
  {
    slug: "transmission-fluids",
    name: "Transmission Fluids",
    category: "automotive",
    description:
      "Kenzoil Transfluid A is formulated to meet automatic transmission fluid requirements, imparting anti-oxidation, anti-wear, dispersancy, defoaming, and the desired friction characteristics. Compatible with seal materials generally used in transmission systems; suitable for automatic and semi-automatic gearboxes, power-steering, and other ATF-A applications.",
  },
  {
    slug: "premium-cng-engine-oil",
    name: "Kenzoil Premium CNG Engine Oil",
    category: "automotive",
    description:
      "Specifically developed for all vehicles running on CNG. Provides excellent lubrication under all working conditions, leading to longer engine life and reduced maintenance cost, while protecting engine parts from overheating.",
  },
  {
    slug: "automotive-industrial-gear-oils",
    name: "Kenzoil Automotive & Industrial Gear Oils",
    category: "automotive",
    description:
      "An extreme pressure hypoid gear oil blended from selected base stocks with a specific additive package to provide extreme pressure and anti-wear characteristics.",
  },
  {
    slug: "super-kool-oil",
    name: "Kenzoil Super Kool Oil",
    category: "automotive",
    description:
      "A long life radiator coolant oil. Kenzoil Super Kool Oil is a high quality, heavy duty fully formulated engine coolant.",
  },
  {
    slug: "brake-fluid-dot-4",
    name: "Kenzoil Brake Fluid DOT 4",
    category: "automotive",
    description:
      "A heavy duty hydraulic brake fluid that ensures long service life of the brake fluid and components of the brake mechanism, and effectively lubricates the moving parts of the brake system. Blended from glycol esters, polyglycols, and high performance additives.",
  },
  // Industrial Lubricants
  {
    slug: "hydraulic-oils",
    name: "Kenzoil Hydraulic Oils",
    category: "industrial",
    description:
      "Kenzoil Hydraulic AW oil range is a group of premium quality, transparent, antiwear hydraulic oils blended from high viscosity index base oils with selected antiwear and other additives, designed to operate across a wide range of working conditions from low to high load.",
  },
  {
    slug: "industrial-gear-oils",
    name: "Kenzoil Industrial Gear Oils",
    category: "industrial",
    description:
      "Premium quality industrial gear lubricants produced with high quality base oils blended with EP, antioxidant, anti-corrosion, and anti-wear additives, offering high load carrying capacity and anti-friction performance in industrial gears and other applications.",
  },
  {
    slug: "refrigeration-oil",
    name: "Kenzoil Refrigeration Oil",
    category: "industrial",
    description:
      "A premium quality oil range blended from high viscosity index base oils with selected antiwear and other additives, designed for a wide range of working conditions and recommended for a wide range of refrigeration compressors using all conventional refrigerants.",
  },
  {
    slug: "thermic-oil",
    name: "Kenzoil Thermic Oil",
    category: "industrial",
    description:
      "Specially developed for use as a heat transfer fluid in industrial applications, possessing high viscosity index, excellent thermal and oxidation stability, and low volatility and vapour pressure.",
  },
  {
    slug: "vacuum-oil",
    name: "Kenzoil Vacuum Oil",
    category: "industrial",
    description:
      "Kenz Vacuum Oil has low vapour pressure and good thermal stability.",
  },
  // Textile Lubricants
  {
    slug: "looms-oil",
    name: "Kenzoil Looms Oil",
    category: "textile",
    description:
      "A group of premium quality, antiwear looms oils blended from high viscosity index base oils with selected antiwear and other additives, designed to operate across a wide range of working conditions from low to high load.",
  },
  {
    slug: "spindle-oil",
    name: "Kenzoil Spindle Oil",
    category: "textile",
    description:
      "Kenzoil Spin Oil range is a premium quality, transparent, antiwear spindle oil blended from high viscosity index base oils with selected antiwear and other additives, for use on ultramodern textile machines.",
  },
];

export function productsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.category === categorySlug);
}
