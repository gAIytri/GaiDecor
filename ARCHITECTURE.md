# GaiDECOR Architecture & Design System

## Category Architecture Pattern

Each category follows a consistent folder structure:

```
src/pages/category/{category}/
├── {Category}Hub.tsx      # Landing page (no filters, visual showcase)
├── {Category}Category.tsx # Product listing with filters
```

### Routing Logic

```
/category/furniture                    → FurnitureHub (visual landing)
/category/furniture?view=all           → FurnitureCategory (all products)
/category/furniture?productType=sofa   → FurnitureCategory (filtered)
```

The router in `Category.tsx` decides:
- No params → Show Hub page
- With params (`?productType=x` or `?view=all`) → Show Category page with filters

---

## Product Data Schema

All products follow the schema in `src/types/product.ts`:

```typescript
interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  primaryImage: string;        // Filename like "sofa-1.jpg"
  images: string[];
  taxonomy: {
    category: { name: string; slug: string };
    subcategory: { name: string; slug: string };
    productType?: string;      // For filtering: "sofa", "floor-lamp", etc.
  };
  attributes: {
    color?: string[];
    material?: string[];
    style?: string[];
  };
  tags: string[];              // Room tags, features
  metadata: {
    inStock: boolean;
    rating?: number;
    reviewCount?: number;
  };
}
```

---

## Image Mapping Pattern

Images are centrally imported in `src/data/images/`:

```typescript
// src/data/images/furnitureImages.ts
import sofa1 from '@/assets/furniture/sofa/sofa-1.jpg';

export const furnitureImagesByFilename: Record<string, string> = {
  'sofa-1.jpg': sofa1,
};
```

Usage in components:
```typescript
import { furnitureImagesByFilename } from '@/data/images';

<img src={furnitureImagesByFilename[product.primaryImage]} />
```

---

## Design System (SX Props)

Custom design system in `src/design-system/` with primitives:
- `Box` - Base layout component
- `Flex` - Flexbox container
- `Text` - Typography
- `Grid` - CSS Grid
- `Heading` - Headings

### Basic Usage

```tsx
import { Box, Flex, Text } from '@/design-system';

<Flex sx={{
  gap: 4,
  p: { base: 2, lg: 4 },
  bg: 'bg-white',
  rounded: 'lg'
}}>
  <Text sx={{ fontSize: '2xl', fontWeight: 'bold' }}>
    Hello
  </Text>
</Flex>
```

### SX Props Reference

**Spacing:**
```tsx
sx={{ p: 4, m: 2, px: 6, py: 4, mt: 2, mb: 4 }}
```

**Layout:**
```tsx
sx={{
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'between',
  alignItems: 'center',
  gap: 4
}}
```

**Sizing:**
```tsx
sx={{ w: 'full', h: '100vh', maxW: '7xl', minH: '400px' }}
```

**Colors:**
```tsx
sx={{ bg: 'bg-white', color: 'text-gray-900' }}
```

**Borders:**
```tsx
sx={{ border: true, borderColor: 'border-gray-200', rounded: 'lg' }}
```

**Effects:**
```tsx
sx={{ shadow: 'md', opacity: 50 }}
```

**Responsive (breakpoints: base, sm, md, lg, xl):**
```tsx
sx={{
  p: { base: 2, md: 4, lg: 6 },
  display: { base: 'block', md: 'flex' },
  gridTemplateColumns: { base: 1, sm: 2, lg: 4 }
}}
```

**Hover/States:**
```tsx
sx={{
  bg: 'bg-white',
  '&:hover': { bg: 'bg-gray-100', shadow: 'lg' }
}}
```

---

## State Management (Zustand)

| Store | Purpose |
|-------|---------|
| `useCartStore` | Shopping cart state |
| `useCartDrawerStore` | Cart drawer open/close |
| `useFilterStore` | Filter state for category pages |
| `useToastStore` | Toast notifications |

---

## Adding a New Category

### 1. Add Assets
```
src/assets/{category}/
├── {subcategory-1}/
│   ├── image-1.jpeg
│   └── image-2.jpeg
```

### 2. Create Image Mapping
```typescript
// src/data/images/{category}Images.ts
import img1 from '@/assets/{category}/{subcategory}/image-1.jpeg';

export const {category}ImagesByFilename: Record<string, string> = {
  'image-1.jpeg': img1,
};
```

Update `src/data/images/index.ts` to export the new mapping.

### 3. Create Product Data
```json
// src/data/{category}.json
[
  {
    "id": "{category}-001",
    "name": "Product Name",
    "price": 299,
    "primaryImage": "image-1.jpeg",
    "taxonomy": {
      "category": { "name": "Category", "slug": "{category}" },
      "subcategory": { "name": "Subcategory", "slug": "subcategory" },
      "productType": "product-type"
    },
    "attributes": { "color": ["Brown"], "material": ["Wood"] },
    "tags": ["living-room"],
    "metadata": { "inStock": true }
  }
]
```

### 4. Create Category Pages
```
src/pages/category/{category}/
├── {Category}Hub.tsx
└── {Category}Category.tsx
```

### 5. Update Router
In `src/pages/Category.tsx`:
```typescript
import {Category}Hub from '@/pages/category/{category}/{Category}Hub';
import {Category}Category from '@/pages/category/{category}/{Category}Category';

// In switch statement:
case '{category}':
  if (hasSearchParams || searchParams.get('view') === 'all') {
    return <{Category}Category />;
  }
  return <{Category}Hub />;
```

### 6. Update Category Config
In `src/data/categoryConfig.ts`:
```typescript
'{category}': { id: '{category}', name: 'Category Name', slug: '{category}' },
```

### 7. Update Navigation
In `src/data/navigationData.json`, add the mega menu entry.

---

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ProductCard.tsx` |
| Hooks | camelCase with `use` | `useSearch.ts` |
| Stores | camelCase with `use` | `useCartStore.ts` |
| Data files | camelCase | `furniture.json` |
| Image files | lowercase with hyphens | `sofa-1.jpg` |
| Product type slugs | singular, hyphenated | `floor-lamp` (not `floor-lamps`) |

---

## URL Filter Pattern

Filters are stored in URL search params:
```
/category/furniture?productType=sofa&color=brown&style=Modern
```

In components:
```typescript
const [searchParams, setSearchParams] = useSearchParams();

// Read
const productType = searchParams.get('productType');

// Update
const handleFilter = (key: string, value: string) => {
  const newParams = new URLSearchParams(searchParams);
  newParams.set(key, value);
  setSearchParams(newParams);
};
```
