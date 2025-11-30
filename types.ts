export interface Fish {
  id: string;
  name: string;
  scientificName: string;
  price: number;
  originalPrice?: number;
  stock: number;
  description: string;
  imageUrl: string;
  category: 'Freshwater' | 'Saltwater' | 'Exotic' | 'Accessories';
  habitat: string;
}

export interface CartItem extends Fish {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'confirmed' | 'shipped';
}

export enum Page {
  HOME = 'HOME',
  SHOP = 'SHOP',
  CART = 'CART',
  LOGIN = 'LOGIN',
  ADMIN = 'ADMIN',
  PROFILE = 'PROFILE',
  CONTACT = 'CONTACT'
}