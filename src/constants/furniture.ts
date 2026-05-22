import {createFurniture} from "../utils";

export interface Dimensions {
   width: number;
   depth: number;
   height: number;
   weight?: number;
}

export interface FurnitureItem {
   id: string;
   slug: string;
   name: string;
   brand: string;
   category: string;
   description: string;
   dimensions: Dimensions;
   images?: string[];
   features?: string[];
}

export const FURNITURE: FurnitureItem[] = [
   createFurniture({
      name: "Battleville Power Reclining Sofa",
      brand: "Ashley",
      category: "Sofa",
      description: "Double down on sleek style with this power reclining sofa. It has a streamlined, space-conscious appeal, with two-tone upholstery in neutral hues creating subtly striking visual intrigue.",
      dimensions: {
         width: 85,
         depth: 40,
         height: 43,
         weight: 304
      },
      features: [
         "Power reclining",
         "Adjustable headrests",
         "Wireless charging",
         "Two-tone upholstery"
      ]
   }),
   createFurniture({
      name: "Battleville Power Reclining Loveseat",
      brand: "Ashley",
      category: "Loveseat",
      description: "Streamlined loveseat with power reclining functionality and adjustable headrests.",
      dimensions: {
         width: 60,
         depth: 40,
         height: 43,
         weight: 247
      },
      features: [
         "Power reclining",
         "Adjustable headrests",
         "Two-tone upholstery"
      ]
   }),
   createFurniture({
      name: "Wolfridge Power Reclining Sofa",
      brand: "Ashley",
      category: "Sofa",
      description: "Furnish your space with fashionable function in mind. This power reclining sofa is defined by its rich tonal variation, handy storage space in the armrests and seamless one-touch reclining.",
      dimensions: {
         width: 0, // Dimensions not provided in source
         depth: 0,
         height: 0
      },
      features: [
         "Power reclining",
         "USB charging",
         "Storage in armrests",
         "One-touch control"
      ]
   }),
   createFurniture({
      name: "Trasimeno Power Reclining Sofa",
      brand: "Ashley",
      category: "Sofa",
      description: "This power reclining sofa delivers comfort and contemporary style in a big (but not bulky) way. Its supple leather and faux leather upholstery, sumptuous cushioning and one-touch control are sure to take you to your happy place.",
      dimensions: {
         width: 0, // Dimensions not provided in source
         depth: 0,
         height: 0
      },
      features: [
         "Power reclining",
         "Power adjustable headrests",
         "USB charging",
         "Leather and faux leather upholstery"
      ]
   }),
   createFurniture({
      name: "Willenburg California King Upholstered Bed",
      brand: "Ashley",
      category: "Bed",
      description: "This bedroom is constructed with hardwood solids and birch veneers and finished in a transparent dark coffee finish. Features framed drawers with dovetailed construction and ball-bearing side glides.",
      dimensions: {
         width: 83,
         depth: 88.25,
         height: 54,
         weight: 188 // Combined weight of components
      },
      features: [
         "Button tufting",
         "Linen textured fabric",
         "AC power supply",
         "USB charging ports",
         "Hardwood solids",
         "Birch veneers"
      ]
   }),
   createFurniture({
      name: "Flynnter King Panel Bed",
      brand: "Ashley",
      category: "Bed",
      description: "A fresh, new take on traditional style. This king panel bed meets today's design tastes with beauty and grace. Tobacco brown finish allows the natural grain of the Acacia veneers to show through in an organic way.",
      dimensions: {
         width: 83.75,
         depth: 91.38,
         height: 60,
         weight: 255.01
      },
      features: [
         "Acacia veneers",
         "Profiled crown molding",
         "Tobacco brown finish"
      ]
   })
];


interface FilterOption {
   value: string;
   label: string;
}

interface Filter {
   id: string;
   name: string;
   options: FilterOption[];
}

const generateFurnitureFilters = (products: FurnitureItem[]): Filter[] => {
   // Initialize collectors for unique values
   const uniqueValues = {
      category: new Set<string>(),
      brand: new Set<string>(),
      features: new Set<string>(),
   };

   // Define dimension ranges for filtering
   const dimensionRanges = {
      width: {
         'small': { min: 0, max: 60, label: 'Small (0-60")' },
         'medium': { min: 60, max: 80, label: 'Medium (60-80")' },
         'large': { min: 80, max: Infinity, label: 'Large (80"+)' }
      },
      depth: {
         'shallow': { min: 0, max: 40, label: 'Shallow (0-40")' },
         'deep': { min: 40, max: 60, label: 'Deep (40-60")' },
         'extra-deep': { min: 60, max: Infinity, label: 'Extra Deep (60"+)' }
      }
   };

   const usedDimensionRanges = {
      width: new Set<string>(),
      depth: new Set<string>()
   };

   // Collect unique values from products
   products.forEach(product => {
      if (product.category) uniqueValues.category.add(product.category);
      if (product.brand) uniqueValues.brand.add(product.brand);
      if (product.features) {
         product.features.forEach(feature => uniqueValues.features.add(feature));
      }

      // Find matching dimension ranges
      Object.keys(dimensionRanges).forEach(dimension => {
         const rangeKey = Object.keys(dimensionRanges[dimension as keyof typeof dimensionRanges]).find(range => {
            // @ts-ignore
            const { min, max } = dimensionRanges[dimension as keyof typeof dimensionRanges][range];
            // @ts-ignore
            return product.dimensions[dimension as keyof typeof product.dimensions] >= min && product.dimensions[dimension as keyof typeof product.dimensions] < max;
         });
         if (rangeKey) usedDimensionRanges[dimension as keyof typeof usedDimensionRanges].add(rangeKey);
      });
   });

   // Create filters array with collected values
   const dynamicFilters: Filter[] = [
      {
         id: 'category',
         name: 'Category',
         options: Array.from(uniqueValues.category).map(value => ({
            value,
            label: value
         }))
      },
      {
         id: 'brand',
         name: 'Brand',
         options: Array.from(uniqueValues.brand).map(value => ({
            value,
            label: value
         }))
      },
      {
         id: 'width',
         name: 'Width',
         options: Array.from(usedDimensionRanges.width).map(range => ({
            value: range,
            label: dimensionRanges.width[range as keyof typeof dimensionRanges.width].label
         }))
      },
      {
         id: 'depth',
         name: 'Depth',
         options: Array.from(usedDimensionRanges.depth).map(range => ({
            value: range,
            label: dimensionRanges.depth[range as keyof typeof dimensionRanges.depth].label
         }))
      },
      {
         id: 'features',
         name: 'Features',
         options: Array.from(uniqueValues.features).map(value => ({
            value,
            label: value
         }))
      }
   ];

   // Remove any filters that have no options
   return dynamicFilters.filter(filter => filter.options.length > 0);
};

export const furnitureFilters = generateFurnitureFilters(FURNITURE);
