// Category Configuration
// Simplified - just maps category slugs to IDs for routing

export interface CategoryConfig {
  id: string;
  name: string;
  slug: string;
}

// Category configurations
const categoryRegistry: Record<string, CategoryConfig> = {
  'rugs': { id: 'rugs', name: 'Rugs', slug: 'rugs' },
  'lighting': { id: 'lighting', name: 'Lighting', slug: 'lighting' },
  'furniture': { id: 'furniture', name: 'Furniture', slug: 'furniture' },
  'decor': { id: 'decor', name: 'Decor', slug: 'decor' },
  'art': { id: 'art', name: 'Art & Mirrors', slug: 'art' },
  'bedding': { id: 'bedding', name: 'Bedding & Curtains', slug: 'bedding' },
};

// Helper function to get category config by slug
export function getCategoryConfig(slug: string): CategoryConfig | undefined {
  return categoryRegistry[slug];
}

// Helper function to get all category slugs
export function getAllCategorySlugs(): string[] {
  return Object.keys(categoryRegistry);
}
