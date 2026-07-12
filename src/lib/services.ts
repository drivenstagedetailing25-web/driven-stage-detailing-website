export type ServiceGroup = 'detailing' | 'premium-coating' | 'premium-correction' | 'addon'

export interface Service {
  slug: string
  name: string
  group: ServiceGroup
}

export const SERVICE_GROUPS: Record<ServiceGroup, string> = {
  detailing: 'Detailing Service',
  'premium-coating': 'Ceramic Coating',
  'premium-correction': 'Paint Correction',
  addon: 'AddOns',
}

export const SERVICES: Service[] = [
  { slug: 'essential-stage-exterior', name: 'Essential Stage Exterior', group: 'detailing' },
  { slug: 'essential-stage-interior', name: 'Essential Stage Interior', group: 'detailing' },
  { slug: 'essential-stage-full-detail', name: 'Essential Stage Full Detail', group: 'detailing' },
  { slug: 'prestige-stage-exterior', name: 'Prestige Stage Exterior', group: 'detailing' },
  { slug: 'prestige-stage-interior', name: 'Prestige Stage Interior', group: 'detailing' },
  { slug: 'prestige-stage-full-detail', name: 'Prestige Stage Full Detail', group: 'detailing' },
  { slug: 'ceramic-coating-stage-1', name: 'Ceramic Coating Stage 1', group: 'premium-coating' },
  { slug: 'ceramic-coating-stage-2', name: 'Ceramic Coating Stage 2', group: 'premium-coating' },
  { slug: 'paint-correction-stage-1', name: 'Paint Correction Stage 1', group: 'premium-correction' },
  { slug: 'paint-correction-stage-2', name: 'Paint Correction Stage 2', group: 'premium-correction' },
  { slug: 'steam-shampoo-carpet', name: 'Steam and Shampoo Carpet', group: 'addon' },
  { slug: 'headlight-restoration', name: 'Headlight Restoration', group: 'addon' },
  { slug: 'water-spot-removal', name: 'Water Spot Removal', group: 'addon' },
  { slug: 'steam-shampoo-seats', name: 'Steam and Shampoo Seats', group: 'addon' },
  { slug: 'exterior-trim-restoration', name: 'Exterior Black Trim Restoration', group: 'addon' },
  { slug: 'pet-hair-extraction', name: 'Pet Hair Extraction', group: 'addon' },
  { slug: 'engine-bay-cleaning', name: 'Engine Bay Cleaning', group: 'addon' },
  { slug: 'odor-elimination-treatment', name: 'Odor Elimination Treatment', group: 'addon' },
]
