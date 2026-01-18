// DecorCategory TypeScript interfaces

export interface FilterOption {
  value: string;
  label: string;
  color?: string;
}

export interface FilterDefinition {
  id: string;
  label: string;
  type: 'checkbox' | 'color';
  options?: FilterOption[];
}

export interface ProductTypeTile {
  name: string;
  slug: string;
  image: string;
  description?: string;
}
