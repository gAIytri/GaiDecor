/**
 * Backend wire-format types — maps to FastAPI Pydantic response schemas.
 * These mirror the exact JSON shape returned by the API.
 * Transform to/from canonical frontend types in the service layer.
 */

import type { OrderStatus } from './index';

// ---------------------------------------------------------------------------
// Pagination wrapper
// ---------------------------------------------------------------------------

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  pages: number;
}

// ---------------------------------------------------------------------------
// Product (GET /api/v1/products, GET /api/v1/products/:slug)
// ---------------------------------------------------------------------------

export interface ApiProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  currency: string;
  category_id: string;
  category_slug: string;
  category_name: string;
  product_type_id: string;
  product_type_name: string;
  stock_quantity: number;
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'pre_order';
  attributes: Record<string, unknown>;
  images: ApiProductImage[];
  enriched_description: ApiEnrichedDescription;
  is_featured: boolean;
  is_bestseller: boolean;
  avg_rating: number;
  review_count: number;
  tags: string[];
  created_at: string;
}

export interface ApiProductImage {
  id: string;
  url: string;
  alt: string;
  is_primary: boolean;
  display_order: number;
}

export interface ApiEnrichedDescription {
  short: string;
  long: string;
  features: string[];
  care_instructions: string;
}

// ---------------------------------------------------------------------------
// Category (GET /api/v1/categories)
// ---------------------------------------------------------------------------

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  display_order: number;
  product_types: ApiProductType[];
  product_count: number;
}

export interface ApiProductType {
  id: string;
  name: string;
  slug: string;
  category_id: string;
}

// ---------------------------------------------------------------------------
// Cart (GET /api/v1/cart)
// ---------------------------------------------------------------------------

export interface ApiCart {
  id: string;
  items: ApiCartItem[];
  coupon_code: string | null;
  discount_amount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface ApiCartItem {
  id: string;
  product_id: string;
  product: ApiProduct;
  selected_color: string;
  selected_size: string | null;
  quantity: number;
}

export interface ApiAddCartItemRequest {
  product_id: string;
  quantity: number;
  selected_color?: string;
  selected_size?: string;
}

// ---------------------------------------------------------------------------
// Order (GET /api/v1/orders, POST /api/v1/orders)
// ---------------------------------------------------------------------------

export interface ApiOrder {
  id: string;
  order_number: string;
  items: ApiOrderItem[];
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  shipping_address: ApiAddress;
  tracking_number: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiOrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  selected_color: string;
  selected_size: string | null;
  quantity: number;
  unit_price: number;
}

export interface ApiPlaceOrderRequest {
  shipping_address_id: string;
  shipping_method_id: string;
  payment_method_id: string;
  coupon_code?: string;
}

// ---------------------------------------------------------------------------
// User & Address (GET /api/v1/users/me)
// ---------------------------------------------------------------------------

export interface ApiUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  avatar_url: string | null;
  addresses: ApiAddress[];
  created_at: string;
}

export interface ApiAddress {
  id: string;
  label: string;
  first_name: string;
  last_name: string;
  street1: string;
  street2: string | null;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  phone: string;
  is_default: boolean;
}

// ---------------------------------------------------------------------------
// Review (GET /api/v1/products/:id/reviews)
// ---------------------------------------------------------------------------

export interface ApiReview {
  id: string;
  product_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  title: string;
  body: string;
  is_verified_purchase: boolean;
  created_at: string;
}

export interface ApiCreateReviewRequest {
  product_id: string;
  rating: number;
  title: string;
  body: string;
}

// ---------------------------------------------------------------------------
// Checkout
// ---------------------------------------------------------------------------

export interface ApiShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimated_days_min: number;
  estimated_days_max: number;
}

export interface ApiPaymentIntent {
  client_secret: string;
  amount: number;
  currency: string;
}

// ---------------------------------------------------------------------------
// Search (GET /api/v1/search)
// ---------------------------------------------------------------------------

export interface ApiSearchResponse {
  products: ApiProduct[];
  total: number;
  facets: Record<string, ApiSearchFacet[]>;
}

export interface ApiSearchFacet {
  value: string;
  count: number;
}

// ---------------------------------------------------------------------------
// Wishlist (GET /api/v1/wishlist)
// ---------------------------------------------------------------------------

export interface ApiWishlistItem {
  id: string;
  product_id: string;
  product: ApiProduct;
  added_at: string;
}

// ---------------------------------------------------------------------------
// Auth (POST /api/v1/auth/login response)
// ---------------------------------------------------------------------------

export interface ApiAuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: ApiUser;
}

// ---------------------------------------------------------------------------
// Generic API error
// ---------------------------------------------------------------------------

export interface ApiError {
  detail: string;
  status_code: number;
  errors?: Record<string, string[]>;
}
