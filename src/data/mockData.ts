import { Product, User, Purchase } from '@/types';

export const mockUser: User = {
  id: '1',
  username: 'john_eco',
  email: 'john@example.com',
  fullName: 'John Smith',
  phone: '+1 234 567 8900',
  address: '123 Green Street, Eco City, EC 12345',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  createdAt: new Date('2024-01-15')
};

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Vintage Leather Armchair',
    description: 'Beautiful vintage leather armchair in excellent condition. Perfect for any living room or study. Genuine leather, very comfortable.',
    price: 450,
    category: 'Furniture',
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'],
    sellerId: '2',
    sellerName: 'Sarah Johnson',
    condition: 'good',
    isAvailable: true,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01')
  },
  {
    id: '2',
    title: 'iPhone 13 Pro - Mint Condition',
    description: 'iPhone 13 Pro 256GB in mint condition. Barely used, always had a case and screen protector. Includes original box and charger.',
    price: 750,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop'],
    sellerId: '3',
    sellerName: 'Mike Chen',
    condition: 'like-new',
    isAvailable: true,
    createdAt: new Date('2024-03-02'),
    updatedAt: new Date('2024-03-02')
  },
  {
    id: '3',
    title: 'Designer Winter Jacket',
    description: 'High-quality winter jacket from premium brand. Warm and stylish. Size Medium. Worn only a few times.',
    price: 120,
    category: 'Clothing',
    images: ['https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=300&fit=crop'],
    sellerId: '4',
    sellerName: 'Emma Wilson',
    condition: 'like-new',
    isAvailable: true,
    createdAt: new Date('2024-03-03'),
    updatedAt: new Date('2024-03-03')
  },
  {
    id: '4',
    title: 'Programming Books Collection',
    description: 'Collection of 10 programming books including React, Node.js, Python guides. Great for developers looking to expand their knowledge.',
    price: 85,
    category: 'Books',
    images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'],
    sellerId: '5',
    sellerName: 'David Lee',
    condition: 'good',
    isAvailable: true,
    createdAt: new Date('2024-03-04'),
    updatedAt: new Date('2024-03-04')
  },
  {
    id: '5',
    title: 'Gaming Laptop - High Performance',
    description: 'Powerful gaming laptop with RTX 3070, 16GB RAM, 1TB SSD. Perfect for gaming and professional work. Excellent condition.',
    price: 1200,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop'],
    sellerId: '6',
    sellerName: 'Alex Rodriguez',
    condition: 'like-new',
    isAvailable: true,
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05')
  },
  {
    id: '6',
    title: 'Dining Table Set for 4',
    description: 'Beautiful wooden dining table with 4 matching chairs. Solid wood construction, perfect for small families or apartments.',
    price: 320,
    category: 'Furniture',
    images: ['https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop'],
    sellerId: '7',
    sellerName: 'Lisa Park',
    condition: 'good',
    isAvailable: true,
    createdAt: new Date('2024-03-06'),
    updatedAt: new Date('2024-03-06')
  }
];

export const mockPurchases: Purchase[] = [
  {
    id: '1',
    products: [
      {
        id: '1',
        product: mockProducts[1],
        quantity: 1
      }
    ],
    totalAmount: 750,
    purchaseDate: new Date('2024-02-15'),
    status: 'completed'
  },
  {
    id: '2',
    products: [
      {
        id: '2',
        product: mockProducts[3],
        quantity: 1
      }
    ],
    totalAmount: 85,
    purchaseDate: new Date('2024-02-28'),
    status: 'completed'
  }
];