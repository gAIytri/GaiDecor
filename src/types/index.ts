/**
 * Shared Types — re-exports product types + adds cart, order, user, review types
 */

export type {
  Product,
  ProductImage,
  ProductAttributes,
  EnrichedDescription,
  Category,
  ProductType,
  FilterOption,
  FilterType,
  FilterSource,
  FilterDefinition,
  CategoryFilterConfig,
  SortOption,
  FilterState,
  ProductFilters,
  ProductSearchResult,
} from './product';

// ---------------------------------------------------------------------------
// Cart
// ---------------------------------------------------------------------------

export interface CartItem {
  id: string;
  product: import('./product').Product;
  selectedColor: string;
  selectedSize?: string;
  quantity: number;
}

// ---------------------------------------------------------------------------
// User & Address
// ---------------------------------------------------------------------------

export interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  addresses: Address[];
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Order
// ---------------------------------------------------------------------------

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  selectedColor: string;
  selectedSize?: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  shippingAddress: Address;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Review
// ---------------------------------------------------------------------------

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  body: string;
  isVerifiedPurchase: boolean;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Chat (for voice pipeline integration)
// ---------------------------------------------------------------------------

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  products?: import('./product').Product[];
  orderStatus?: Order;
  timestamp: Date;
}

// ---------------------------------------------------------------------------
// Shipping
// ---------------------------------------------------------------------------

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDaysMin: number;
  estimatedDaysMax: number;
}
