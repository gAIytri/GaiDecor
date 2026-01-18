export type Category = 'Furniture' | 'Rugs' | 'Lighting' | 'Decor' | 'Art & Mirrors' | 'Bedding & Curtains' | 'Pillows & Throws' | 'Gifts';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  images: string[];
  colors?: string[];
  sizes?: string[];
  inStock: boolean;
  trending?: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  trackingNumber?: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  products?: Product[];
  orderStatus?: Order;
  timestamp: Date;
}
