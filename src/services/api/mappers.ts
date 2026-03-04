/**
 * API ↔ Frontend Type Mappers
 * Bridges flat snake_case API types → nested camelCase frontend types.
 */

import type {
  ApiProduct,
  ApiCategory,
  ApiProductType,
  ApiCart,
  ApiCartItem,
  ApiOrder,
  ApiOrderItem,
  ApiUser,
  ApiAddress,
  ApiReview,
  ApiShippingMethod,
  ApiWishlistItem,
} from '@/types/api';

import type { Product } from '@/types/product';
import type {
  CartItem,
  Address,
  User,
  Order,
  OrderItem,
  Review,
  ShippingMethod,
} from '@/types';
import type { Category, ProductType } from '@/types/product';

// ---------------------------------------------------------------------------
// Product: flat API → nested frontend Product
// ---------------------------------------------------------------------------

export function mapApiProduct(api: ApiProduct): Product {
  const primaryImage = api.images.find((img) => img.is_primary);
  const sortedImages = [...api.images].sort((a, b) => a.display_order - b.display_order);

  return {
    id: api.id,
    sku: api.sku,
    name: api.name,
    description: api.description,
    price: api.price,
    compareAtPrice: api.compare_at_price ?? undefined,
    currency: api.currency,

    primaryImage: primaryImage?.url ?? sortedImages[0]?.url ?? '',
    images: sortedImages.map((img) => img.url),

    taxonomy: {
      category: {
        name: api.category_name,
        slug: api.category_slug,
      },
      subcategory: {
        name: api.product_type_name,
        slug: api.product_type_name.toLowerCase().replace(/\s+/g, '-'),
      },
      productType: api.product_type_name,
    },

    attributes: {
      color: (api.attributes.color as string[]) ?? [],
      material: (api.attributes.material as string[]) ?? [],
      style: (api.attributes.style as string[]) ?? [],
      room: (api.attributes.room as string[]) ?? [],
      ...(api.attributes.dimensions
        ? { dimensions: api.attributes.dimensions as Product['attributes']['dimensions'] }
        : {}),
    },

    metadata: {
      featured: api.is_featured,
      bestSeller: api.is_bestseller,
      onSale: api.compare_at_price != null && api.compare_at_price > api.price,
      inStock: api.stock_status === 'in_stock' || api.stock_status === 'low_stock',
      stockQuantity: api.stock_quantity,
      rating: api.avg_rating,
      reviewCount: api.review_count,
      createdAt: api.created_at,
    },

    enrichedDescription: {
      short: api.enriched_description.short,
      long: api.enriched_description.long,
      features: api.enriched_description.features,
      careInstructions: api.enriched_description.care_instructions,
    },

    tags: api.tags,
  };
}

// ---------------------------------------------------------------------------
// Category
// ---------------------------------------------------------------------------

export function mapApiCategory(api: ApiCategory): Category {
  return {
    id: api.id,
    name: api.name,
    slug: api.slug,
    description: api.description,
    imageUrl: api.image_url,
    displayOrder: api.display_order,
    productTypes: api.product_types.map(mapApiProductType),
    productCount: api.product_count,
  };
}

export function mapApiProductType(api: ApiProductType): ProductType {
  return {
    id: api.id,
    name: api.name,
    slug: api.slug,
    categoryId: api.category_id,
  };
}

// ---------------------------------------------------------------------------
// Address
// ---------------------------------------------------------------------------

export function mapApiAddress(api: ApiAddress): Address {
  return {
    id: api.id,
    label: api.label,
    firstName: api.first_name,
    lastName: api.last_name,
    street1: api.street1,
    street2: api.street2 ?? undefined,
    city: api.city,
    state: api.state,
    zipCode: api.zip_code,
    country: api.country,
    phone: api.phone,
    isDefault: api.is_default,
  };
}

export function addressToApi(addr: Omit<Address, 'id'>): Record<string, unknown> {
  return {
    label: addr.label,
    first_name: addr.firstName,
    last_name: addr.lastName,
    street1: addr.street1,
    street2: addr.street2 || null,
    city: addr.city,
    state: addr.state,
    zip_code: addr.zipCode,
    country: addr.country,
    phone: addr.phone,
    is_default: addr.isDefault,
  };
}

// ---------------------------------------------------------------------------
// User
// ---------------------------------------------------------------------------

export function mapApiUser(api: ApiUser): User {
  return {
    id: api.id,
    email: api.email,
    firstName: api.first_name,
    lastName: api.last_name,
    phone: api.phone ?? undefined,
    avatarUrl: api.avatar_url ?? undefined,
    addresses: api.addresses.map(mapApiAddress),
    createdAt: api.created_at,
  };
}

// ---------------------------------------------------------------------------
// Cart
// ---------------------------------------------------------------------------

export function mapApiCartItem(api: ApiCartItem): CartItem {
  return {
    id: api.id,
    product: mapApiProduct(api.product),
    selectedColor: api.selected_color,
    selectedSize: api.selected_size ?? undefined,
    quantity: api.quantity,
  };
}

export function mapApiCart(api: ApiCart) {
  return {
    id: api.id,
    items: api.items.map(mapApiCartItem),
    couponCode: api.coupon_code,
    discountAmount: api.discount_amount,
    subtotal: api.subtotal,
    shipping: api.shipping,
    tax: api.tax,
    total: api.total,
  };
}

// ---------------------------------------------------------------------------
// Order
// ---------------------------------------------------------------------------

export function mapApiOrderItem(api: ApiOrderItem): OrderItem {
  return {
    id: api.id,
    productId: api.product_id,
    productName: api.product_name,
    productImage: api.product_image,
    selectedColor: api.selected_color,
    selectedSize: api.selected_size ?? undefined,
    quantity: api.quantity,
    unitPrice: api.unit_price,
  };
}

export function mapApiOrder(api: ApiOrder): Order {
  return {
    id: api.id,
    orderNumber: api.order_number,
    items: api.items.map(mapApiOrderItem),
    status: api.status,
    subtotal: api.subtotal,
    shipping: api.shipping,
    tax: api.tax,
    discount: api.discount,
    total: api.total,
    shippingAddress: mapApiAddress(api.shipping_address),
    trackingNumber: api.tracking_number ?? undefined,
    createdAt: api.created_at,
    updatedAt: api.updated_at,
  };
}

// ---------------------------------------------------------------------------
// Review
// ---------------------------------------------------------------------------

export function mapApiReview(api: ApiReview): Review {
  return {
    id: api.id,
    productId: api.product_id,
    userId: api.user_id,
    userName: api.user_name,
    rating: api.rating,
    title: api.title,
    body: api.body,
    isVerifiedPurchase: api.is_verified_purchase,
    createdAt: api.created_at,
  };
}

// ---------------------------------------------------------------------------
// Shipping Method
// ---------------------------------------------------------------------------

export function mapApiShippingMethod(api: ApiShippingMethod): ShippingMethod {
  return {
    id: api.id,
    name: api.name,
    description: api.description,
    price: api.price,
    estimatedDaysMin: api.estimated_days_min,
    estimatedDaysMax: api.estimated_days_max,
  };
}

// ---------------------------------------------------------------------------
// Wishlist
// ---------------------------------------------------------------------------

export function mapApiWishlistItem(api: ApiWishlistItem) {
  return {
    id: api.id,
    productId: api.product_id,
    product: mapApiProduct(api.product),
    addedAt: api.added_at,
  };
}
