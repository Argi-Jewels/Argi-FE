export type MetalFinish = 'Rhodium Silver' | '18k Yellow Gold Plated' | 'Rose Gold Plated';

export type ProductCategory = 
  | 'Rings' 
  | 'Necklaces' 
  | 'Bracelets' 
  | 'Earrings' 
  | 'Personalized' 
  | 'Engagement';

export type OccasionType = 
  | 'Everyday Luxury' 
  | 'Bridal & Festive' 
  | 'Office Minimalist' 
  | 'Special Gifting';

export type ProductStatus = 'Active' | 'Draft' | 'Out of Stock';

export interface Product {
  id: string;
  title: string;
  slug: string;
  sku: string;
  category: ProductCategory;
  subCategory?: string;
  price: number;
  originalPrice?: number;
  description: string;
  material: string;
  finishes: MetalFinish[];
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
  hallmarkCertified: boolean;
  occasion: OccasionType;
  dimensions?: string;
  weight?: string;
  sizes?: string[];
  status: ProductStatus;
  features?: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  finish: MetalFinish;
  size?: string;
  engraving?: string;
  quantity: number;
}

export type BespokeStatus = 
  | 'New Request' 
  | 'Design Confirmed' 
  | 'In Crafting' 
  | 'Ready for Dispatch' 
  | 'Shipped';

export interface CustomOrderRequest {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  city: string;
  category: string;
  description: string;
  referenceImageUrl?: string;
  selectedFinish: MetalFinish;
  stonePreference: string;
  size?: string;
  engraving?: string;
  budgetRange: string;
  status: BespokeStatus;
  createdAt: string;
  notes?: string;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export type PaymentMethod = 'UPI' | 'Card' | 'NetBanking' | 'Cash on Delivery';

export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  totalAmount: number;
  status: OrderStatus;
  customer: OrderCustomer;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Pending';
  courierPartner?: 'Blue Dart Express' | 'Delhivery' | 'DTDC Air' | 'Speed Post';
  trackingNumber?: string;
  createdAt: string;
  isGift?: boolean;
  giftRecipientName?: string;
  giftMessage?: string;
}

export interface CustomerReview {
  id: string;
  productId: string;
  author: string;
  city: string;
  rating: number;
  title: string;
  content: string;
  verifiedPurchase: boolean;
  date: string;
  images?: string[];
  finishPurchased?: MetalFinish;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  avatar?: string;
  authProvider?: 'google' | 'otp';
  addresses: {
    id: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
  }[];
}
