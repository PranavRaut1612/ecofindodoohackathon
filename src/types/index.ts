export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone?: string;
  address?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  sellerId: string;
  sellerName: string;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Purchase {
  id: string;
  products: CartItem[];
  totalAmount: number;
  purchaseDate: Date;
  status: 'completed' | 'pending' | 'cancelled';
}

export const CATEGORIES = [
  'Electronics',
  'Furniture',
  'Clothing',
  'Books',
  'Sports',
  'Home & Garden',
  'Toys',
  'Automotive',
  'Other'
] as const;

export type Category = typeof CATEGORIES[number];