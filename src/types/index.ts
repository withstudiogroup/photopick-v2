export interface Studio {
  id: string;
  name: string;
  location: {
    address: string;
    district: string;
    city: string;
    nearestStation: string;
    walkingMinutes: number;
  };
  rating: number;
  reviewCount: number;
  grade: 'premium' | 'standard' | 'budget';
  images: string[];
  thumbnail: string;
  categories: string[];
  facilities: string[];
  products: Product[];
  description: string;
  operatingHours: string;
  closedDays: string;
  phone: string;
  hasCoupon?: boolean;
  couponText?: string;
  discountRate?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  discountRate: number;
  includes: string[];
  duration: number;
  maxPersons: number;
  images: string[];
  category: string;
  availableSlots?: number;
}

export interface Reservation {
  id: string;
  studioId: string;
  productId: string;
  userId: string;
  date: Date;
  time: string;
  persons: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface Review {
  id: string;
  studioId: string;
  userId: string;
  userName: string;
  rating: number;
  content: string;
  images: string[];
  createdAt: Date;
  detailRatings: {
    quality: number;
    kindness: number;
    facility: number;
    value: number;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkUrl: string;
  backgroundColor: string;
}
