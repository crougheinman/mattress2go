import { createProduct } from "./utils.ts";

import type {
  Brand,
  CTAButtonType,
  Feature,
  FooterSection,
  HeaderNavLinksType,
  Product,
  Social,
} from "./types.ts";

export const DESCRIPTION: string =
  "Your Local Mattress Destination in Maricopa";

export const SITE_NAME: string = "Copa Mattress and Furniture";

export const HEADER_NAV_LINKS: HeaderNavLinksType[] = [
  {
    name: "Shop Mattresses",
    url: "/shop",
  },
  {
    name: "Shop Furniture",
    url: "/shop-furniture",
  },
  // {
  //    name: "How To Pick A Mattress",
  //    url: "/how-to-pick-a-mattress"
  // },
  {
    name: "Financing",
    url: "/financing",
  },
  {
    name: "Contact Us",
    url: "/contact",
  },
  // {
  //    name: "Visit Us",
  //    url: "/visit"
  // }
];

export const BRANDS: Brand[] = [
  {
    name: "Ashley Homestore",
    url: "",
    logo: "AshleyHomestoreLogo.svg",
  },
  {
    name: "Beautyrest",
    url: "",
    logo: "beautyrest-logo-png-transparent.png",
  },
  {
    name: "BIA Eclipse Glacier",
    url: "",
    logo: "BIAEclipseGlacierLogo.webp",
  },
  {
    name: "Bedgear",
    url: "",
    logo: "bedgear.svg",
  },
  // {
  //   name: "Bedtech",
  //   url: "",
  //   logo: "bedtech.webp",
  // },
  // {
  //   name: "Sealy",
  //   url: "",
  //   logo: "sealylogo.png",
  // },
  // {
  //   name: "Tempur-Pedic",
  //   url: "",
  //   logo: "tempurlogo.png",
  // },
  // {
  //   name: "Corsicana",
  //   url: "",
  //   logo: "corsicana-logo.png",
  // },
  {
    name: "Serta",
    url: "",
    logo: "serta-logo.png",
  },
  {
    name: "Puffy",
    url: "",
    logo: "puffy-logo.png",
  },
];

export const BRAND_ID_TO_NAME: Record<number, string> = {
  1: 'Ashley Homestore',
  2: 'Beautyrest',
  3: 'BIA Eclipse Glacier',
  4: 'Bedgear',
  5: 'Serta',
  6: 'Puffy',
  7: 'Conformatic',
};

export const HEADER_CTA_BUTTON: CTAButtonType = {
  name: "Contact Store",
  url: "/contact",
};

export const SOCIALS: Social[] = [
  {
    type: "Facebook",
    url: "https://www.facebook.com/copamattressandfurniture/",
    icon: `
         <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
         </svg>
      `,
  },
];

// export const LOGO = {
//    url:
// }

export const STORE_INFO = {
  address:
    "44360 West Edison Suite 100, Maricopa, AZ, United States, Arizona 85138",
  phone: "(520) 217-1942",
  email: "copamattressandfurniture@gmail.com",
};

export const FOOTER_LINKS: FooterSection[] = [
  {
    label: "Shop",
    links: [
      { label: "Shop", href: "/shop" },
      {
        label: "Brands",
        links: BRANDS.map((brand) => ({
          label: brand.name,
          href: '/shop',
          // href:
          //   brand.url ||
          //   `/shop/brands/${brand.name.toLowerCase().replace(/\s+/g, "-")}`,
        })),
      },
    ],
  },
  {
    label: "About",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      // { label: "Visit Us", href: "/visit-us" },
      { label: "Financing", href: "/financing" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    label: "Contact Us",
    links: [
      {
        label: `Email: ${STORE_INFO.email}`,
        href: `mailto:${STORE_INFO.email}`,
      },
      { label: `Call: ${STORE_INFO.phone}`, href: `tel:${STORE_INFO.phone}` },
      {
        label: `Visit: ${STORE_INFO.address}`,
        href: "https://www.google.com/maps/place/44360+W+Edison+Rd+Ste+100,+Maricopa,+AZ+85138/@33.0657134,-112.0475758,17z/data=!3m1!4b1!4m6!3m5!1s0x872afb2a895668a5:0x2639a721195e2e0e!8m2!3d33.0657089!4d-112.0450009!16s%2Fg%2F11tg5sxgsb?entry=ttu&g_ep=EgoyMDI0MTAxNC4wIKXMDSoASAFQAw%3D%3D",
      },
    ],
  },
];

export const FEATURES: Feature[] = [
  {
    icon: "mdi:bed",
    name: "2 Year Comfort Guarantee",
    text: "Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.",
    linkText: "Learn more",
  },
  {
    icon: "material-symbols:credit-card-clock",
    name: "Convenient Financing",
    text: "Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.",
    linkText: "Learn more",
    url: "/financing",
  },
  {
    icon: "ant-design:control-filled",
    name: "Customize Your Bed",
    text: "Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.",
    linkText: "Learn more",
  },
  {
    icon: "tabler:truck-delivery",
    name: "White Glove Delivery",
    text: "Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.",
    linkText: "Learn more",
    url: "/contact",
  },
];

export const PRODUCTS: Product[] = [
  createProduct(
    "Monarch Hybrid",
    "Puffy",
    "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
    "Puffy Monarch Hybrid Mattress",
    "Medium",
    "Green",
    "ALL",
  ),
  createProduct(
    "Royal Hybrid",
    "Puffy",
    "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
    "Puffy Royal Hybrid Mattress",
    "Medium",
    "Green",
    "ALL",
  ),
  createProduct(
    "Lux",
    "Puffy",
    "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
    "Puffy Lux Mattress",
    "Medium",
    "Green",
    "ALL",
  ),
  createProduct(
    "Cloud",
    "Puffy",
    "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
    "Puffy Cloud Mattress",
    "Medium Firm",
    "Orange",
    "ALL",
  ),
  createProduct(
    "McKinely Luxury Plush Eurotop",
    "Eclipse Glacier",
    "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
    `McKinley Luxury Plush Mattress

Experience the ultimate in luxurious sleep with the McKinley Luxury Plush Mattress. Crafted with advanced cooling technology and precision support, this mattress is designed to keep you comfortable throughout the night. The hand-tufted, cooling cover features glacierTECH™ fabric that actively wicks away moisture and heat, ensuring a consistently cool surface.

Key Features:
- Copper-Infused Memory Foam
- GlacierTECH™ Cooling Fabric
- Spinal Zone® Support
- Individually Wrapped Coils
- NanoCoil® Comfort Layer
- Height: 16.5 inches
- Warranty: 15 years`,
    "Medium",
    "Green",
    "ALL",
  ),
  createProduct(
    "Copper Infused Eurotop",
    "Eclipse Glacier",
    "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
    `Washington Plush Mattress

Discover unparalleled comfort with the Washington Plush Mattress, a perfect blend of cooling innovation and supportive design. The hand-tufted cover is crafted with ICE-Cool™ fabric using glacierTECH™ technology, designed to transport heat and moisture away from your body.

Key Features:
- Copper-Infused Memory Foam
- GlacierTECH™ Cooling Fabric
- Spinal Zone® Support
- Individually Wrapped Coils
- Height: 15.5 inches
- Warranty: 15 years`,
    "Medium",
    "Green",
    "ALL",
  ),
  createProduct(
    "Everest Luxury Firm Eurotop",
    "Eclipse Glacier",
    "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
    `Everest Luxury Firm Mattress

Experience top-tier support and cooling comfort with the Everest Luxury Firm Mattress. This premium mattress is engineered with natural Talalay latex, offering a perfect balance of contouring and responsiveness.

Key Features:
- Natural Talalay Latex
- GlacierTECH™ Cooling Fabric
- Spinal Zone® Support
- Individually Wrapped Coils
- Height: 16.5 inches
- Warranty: 15 years`,
    "Medium Firm",
    "Orange",
    "ALL",
  ),
  createProduct(
    "Natural Organic Latex",
    "Eclipse Glacier",
    "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
    `Glacier Latex Euro Top Mattress

Indulge in the luxurious comfort of the Glacier Latex Euro Top Mattress, featuring 100% natural Talalay latex and exceptional breathability.

Key Features:
- 100% Natural Talalay Latex
- GlacierTECH™ Cooling Fabric
- Spinal Zone® Support
- Individually Wrapped Coils
- Height: 13.5 inches
- Warranty: 15 years`,
    "",
    "",
    "ALL",
  ),
  createProduct(
    "Moonlight Lux 1",
    "Conformatic",
    "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
    "Ultra-soft & cushiony using our softest foam. Body hugging to relieve pressure points. Ideal for: Side sleepers who need extra pressure-relief on the hips and shoulders to promote the correct spinal alignment. Combination sleepers. Lighter body types",
    "Softest",
    "Pink",
    "ALL",
  ),
  createProduct(
    "Moonlight Plush 2",
    "Conformatic",
    "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
    "Ultra-soft, cloud-like cushioning comfort that responds to your movement with a soft-yet-supportive feel. Body hugging to relieve pressure points. Ideal for: Side sleepers who need extra pressure-relief on the hips and shoulders, Combination sleepers",
    "Medium Soft",
    "Blue",
    "ALL",
  ),
  createProduct(
    "Moonlight Cushion Firm 3",
    "Conformatic",
    "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
    "Customize your bed - Medium comfort level for balanced support",
    "Medium",
    "Green",
    "ALL",
  ),
  createProduct(
    "Moonlight Firm 4",
    "Conformatic",
    "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
    "Customize your bed - Medium Firm comfort level for enhanced support",
    "Medium Firm",
    "Orange",
    "ALL",
  ),
  createProduct(
    "Moonlight Extra Firm 5",
    "Conformatic",
    "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
    "Customize your bed - Extra Firm comfort level for maximum support",
    "Firm",
    "Red",
    "ALL",
  ),
  createProduct(
    "M3",
    "Bed Gear",
    "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
    "Customizable comfort mattress system",
    "Customizable",
    "Customizable",
    "ALL",
  ),
  createProduct(
     "Celebration",
     "BIA",
     549,
     "The BIA Celebration Mattress is perfect for guest rooms, growing kids and teens, and vacation homes.",
     "Medium",
     "Green",
     "Queen",
     1299
  ),
  createProduct(
     "Blue Magic",
     "BIA",
     399,
     "The BIA Blue Magic is perfect for guest rooms, growing kids and teens, and vacation homes.",
     "Medium",
     "",
     "QUEEN/FULL ONLY",
     899
  ),
  createProduct(
     "Black Series One Plush Pillow Top",
     "Beautyrest",
     "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
     "Our most advanced sleep system, featuring Triple-Stranded Pocketed Coil® Technology for maximum individualized support, plus the ultimate in motion separation, pressure relief and temperature management.",
     "Medium",
     "Green",
     "ALL"
  ),
  createProduct(
     "Black Series Two Plush Tight Top",
     "Beautyrest",
     "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
     "Our most advanced sleep system, featuring Triple-Stranded Pocketed Coil® Technology for maximum individualized support, plus the ultimate in motion separation, pressure relief and temperature management.",
     "Medium",
     "Green",
     "ALL"
  ),
  createProduct(
     "Black Series Two Plush Pillow Top",
     "Beautyrest",
     "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
     "Our most advanced sleep system, featuring Triple-Stranded Pocketed Coil® Technology for maximum individualized support, plus the ultimate in motion separation, pressure relief and temperature management.",
     "Medium",
     "Green",
     "ALL"
  ),
  createProduct(
     "Black Series 3 Medium Pillow Top",
     "Beautyrest",
     "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
     "Our most advanced sleep system, featuring Triple-Stranded Pocketed Coil® Technology for maximum individualized support, plus the ultimate in motion separation, pressure relief and temperature management.",
     "Medium",
     "Green",
     "ALL"
  ),
  createProduct(
     "Black Series 3 Plush Pillow Top",
     "Beautyrest",
     "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
     "Our most advanced sleep system, featuring Triple-Stranded Pocketed Coil® Technology for maximum individualized support, plus the ultimate in motion separation, pressure relief and temperature management.",
     "Medium",
     "Green",
     "ALL"
  ),
  createProduct(
     "Aveda",
     "Serta iComfort",
     "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
     "Featuring 5 support zones designed for full-body spinal alignment, with cool-to-the-touch fabric and premium memory foam comfort.",
     "Medium",
     "Green",
     "ALL"
  ),
  createProduct(
     "Aspire Plush 14 Inch",
     "Serta iComfort",
     "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
     "Our 5 ZoneResponse design provides full-body spinal alignment designed to offer comfort and support where you need it most",
     "Medium",
     "Green",
     "ALL"
  ),
  createProduct(
     "Perfect Sleeper",
     "Serta",
     "LOWEST PRICE IN AZ OR YOUR BED IS FREE",
     "Featuring an 825-coil density system, the Serta Perfect Sleeper Blue Lagoon Nights Plush Pillowtop mattress offers zoned comfort and pressure relief with a lumbar gel support band and Cool Twist® Gel Memory Foam that contours to your body—with upgrades available with more cooling layers and support.",
     "Medium",
     "Green",
     "ALL"
  )
];

// "The BIA Blue Magic is perfect for:\n" +
// "\n" +
// "Guest rooms and vacation homes - provide comfort for occasional visitors without the premium price\n" +
// "Growing kids and teens - an economical choice that can be replaced as your child's needs change\n" +
// "First-time apartment dwellers - ideal for young adults furnishing their first place on a budget\n" +
// "Temporary housing or short-term rentals - smart solution for transitional living spaces\n" +
// "College dorm rooms - durable and affordable option for student life\n" +
// "Starter homes - helps new homeowners manage their budget while furnishing multiple rooms\n" +
// "Home office daybeds - create a comfortable dual-purpose space for work and occasional guests\n" +
// "Investment properties - maintain quality while maximizing rental property returns",


// Function to generate filters from products
export const generateFiltersFromProducts = (products: Product[]) => {
  const uniqueValues: {
    comfortLevel: Set<string>;
    size: Set<string>;
    brand: Set<string>;
  } = {
    comfortLevel: new Set<string>(),
    size: new Set<string>(),
    brand: new Set<string>(),
  };

  const priceRanges = {
    '0-500': { min: 0, max: 500, label: 'Under $500' },
    '500-1000': { min: 500, max: 1000, label: '$500 - $1,000' },
    '1000-2000': { min: 1000, max: 2000, label: '$1,000 - $2,000' },
    '2000+': { min: 2000, max: Infinity, label: '$2,000+' },
  };
  const usedPriceRanges = new Set<string>();

  products.forEach((product) => {
    if (product.comfortLevel) uniqueValues.comfortLevel.add(product.comfortLevel);
    if (product.size) uniqueValues.size.add(product.size);
    if (product.brand) uniqueValues.brand.add(product.brand);

    const priceRangeKey = Object.keys(priceRanges).find((range) => {
      const { min, max } = priceRanges[range as keyof typeof priceRanges];
      return typeof product.price === 'number'
        ? product.price >= min && product.price < max
        : false;
    });

    if (priceRangeKey) {
      usedPriceRanges.add(priceRangeKey);
    }
  });

  const dynamicFilters = [
    {
      id: 'comfortLevel',
      name: 'Comfort Level',
      options: Array.from(uniqueValues.comfortLevel).map((value: string) => ({
        value,
        label: value.charAt(0).toUpperCase() + value.slice(1),
      })),
    },
    {
      id: 'size',
      name: 'Mattress Size',
      options: Array.from(uniqueValues.size).map((value: string) => ({
        value,
        label: value
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
      })),
    },
    {
      id: 'brand',
      name: 'Brand',
      options: Array.from(uniqueValues.brand).map((value: string) => ({
        value,
        label: value.charAt(0).toUpperCase() + value.slice(1),
      })),
    },
    {
      id: 'price',
      name: 'Price Range',
      options: Array.from(usedPriceRanges).map((range: string) => ({
        value: range,
        label: priceRanges[range as keyof typeof priceRanges].label,
      })),
    },
  ];

  return dynamicFilters.filter((filter) => filter.options.length > 0);
};

// Use the function to generate your filters
// @ts-ignore
export const dynamicFilters = generateFiltersFromProducts(PRODUCTS);