import type { Product } from "./types";
import type { Dimensions, FurnitureItem } from "./constants/furniture";

function formatBrandName(brand: string): string {
  return brand.toLowerCase().replace(/\s+/g, "-");
}

export function getProductSlug(name: string, brand: string): string {
  const formattedName: string = name.toLowerCase().replace(/\s+/g, "-");
  const formattedBrand: string = formatBrandName(brand);
  return `${formattedBrand}-${formattedName}`;
}

// Import all product images dynamically
const productImages = import.meta.glob('/src/assets/**/*', {
  eager: true,
  query: '?url',
  import: 'default'
});

export function getProductImages(productSlug: string): string[] {
  const images: string[] = [];

  // Convert the import.meta.glob result into a more manageable format
  Object.entries(productImages).forEach(([path, url]) => {
    // Check if the path includes the product slug
    if (path.includes(`/src/assets/${productSlug}/`)) {
      // Add the image URL to our array
      images.push(url as string);
    }
  });

  // Sort the images to ensure consistent ordering
  return images.sort();
}

export function createProduct(
   name: string,
   brand: string,
   price: string | number,
   description: string,
   comfortLevel?: string,
   color?: string,
   size?: string,
   originalPrice?: number
): Product {
  const processedPrice =
     typeof price === "string" ? price :
        typeof price === "number" ? price :
           "Price not available";

  const slug = getProductSlug(name, brand);
  const images = getProductImages(slug);

  return {
    name,
    slug,
    brand,
    price: processedPrice,
    description,
    images,
    comfortLevel: comfortLevel || "",
    color: color || "",
    size: size || "ALL",
    originalPrice: originalPrice
  };
}

interface CreateFurnitureOptions {
  name: string;
  brand: string;
  category: string;
  description: string;
  dimensions: Dimensions;
  features?: string[];
}

export function createFurniture({
                                  name,
                                  brand,
                                  category,
                                  description,
                                  dimensions,
                                  features = [],
                                }: CreateFurnitureOptions): FurnitureItem {
  const slug = getProductSlug(name, brand);
  const images = getProductImages(slug);

  const id = slug;

  return {
    id,
    name,
    slug,
    brand,
    category,
    description,
    dimensions: {
      width: dimensions.width || 0,
      depth: dimensions.depth || 0,
      height: dimensions.height || 0,
      weight: dimensions.weight || 0
    },
    images,
    features,
  };
}