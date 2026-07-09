export interface Service {
  slug: string
  name: string
}

export const SERVICES: Service[] = [
  { slug: 'mobile-detailing', name: 'Mobile Detailing' },
  { slug: 'paint-correction', name: 'Paint Correction' },
  { slug: 'ceramic-coating', name: 'Ceramic Coating' },
  { slug: 'steam-shampoo-carpet', name: 'Steam and Shampoo Carpet' },
  { slug: 'headlight-restoration', name: 'Headlight Restoration' },
  { slug: 'water-spot-removal', name: 'Water Spot Removal' },
  { slug: 'steam-shampoo-seats', name: 'Steam and Shampoo Seats' },
  { slug: 'exterior-trim-restoration', name: 'Exterior Black Trim Restoration' },
  { slug: 'pet-hair-extraction', name: 'Pet Hair Extraction' },
  { slug: 'engine-bay-cleaning', name: 'Engine Bay Cleaning' },
  { slug: 'odor-elimination-treatment', name: 'Odor Elimination Treatment' },
]
