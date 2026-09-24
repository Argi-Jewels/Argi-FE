import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  CustomOrderRequest, 
  UserProfile, 
  BespokeStatus, 
  OrderStatus,
  MetalFinish,
  CustomerReview
} from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { INITIAL_ORDERS } from '../data/initialOrders';
import { INITIAL_CUSTOM_REQUESTS } from '../data/initialCustomRequests';
import { INITIAL_REVIEWS } from '../data/initialReviews';

interface CouponInfo {
  code: string;
  type: 'percent' | 'flat';
  value: number;
}

const AVAILABLE_COUPONS: Record<string, CouponInfo> = {
  'ARGI10': { code: 'ARGI10', type: 'percent', value: 10 },
  'INDORE': { code: 'INDORE', type: 'flat', value: 500 },
  'SARAFA500': { code: 'SARAFA500', type: 'flat', value: 500 },
  'SILVER925': { code: 'SILVER925', type: 'percent', value: 15 },
  'FIRSTORDER': { code: 'FIRSTORDER', type: 'flat', value: 300 },
  'FIRSTBUY': { code: 'FIRSTBUY', type: 'flat', value: 300 },
};

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'gold';
}

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'slug'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlugOrId: (identifier: string) => Product | undefined;

  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartSubtotal: number;
  cartCount: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  appliedCoupon: { code: string; discountAmount: number } | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, courier?: Order['courierPartner'], tracking?: string) => void;

  // Custom Bespoke Requests
  customRequests: CustomOrderRequest[];
  submitCustomRequest: (data: Omit<CustomOrderRequest, 'id' | 'createdAt' | 'status'>) => CustomOrderRequest;
  updateCustomRequestStatus: (id: string, status: BespokeStatus, notes?: string) => void;

  // User Authentication
  currentUser: UserProfile | null;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (val: boolean) => void;
  loginUser: (name: string, email: string, phone: string, city?: string) => void;
  loginWithGoogle: (data: { name: string; email: string; avatar?: string; phone?: string }) => void;
  logoutUser: () => void;
  
  // Admin Management
  isAdmin: boolean;
  adminRole: 'Owner' | 'Jeweler' | 'Support';
  setIsAdmin: (val: boolean) => void;
  setAdminRole: (role: 'Owner' | 'Jeweler' | 'Support') => void;

  // Customer Reviews
  reviews: CustomerReview[];
  addReview: (review: Omit<CustomerReview, 'id' | 'date'>) => void;
  getProductReviews: (productId: string) => CustomerReview[];

  // Notification Toast
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'info' | 'gold') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'argi_products_v1',
  CART: 'argi_cart_v1',
  WISHLIST: 'argi_wishlist_v1',
  ORDERS: 'argi_orders_v1',
  CUSTOM_REQUESTS: 'argi_custom_requests_v1',
  USER: 'argi_user_v1',
  COUPON: 'argi_coupon_v1',
  REVIEWS: 'argi_reviews_v1',
  IS_ADMIN: 'argi_is_admin_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial products from localStorage or defaults
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.COUPON) || null;
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ['argi-01', 'argi-05'];
    } catch {
      return ['argi-01', 'argi-05'];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Custom Bespoke Inquiries
  const [customRequests, setCustomRequests] = useState<CustomOrderRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_REQUESTS);
      return saved ? JSON.parse(saved) : INITIAL_CUSTOM_REQUESTS;
    } catch {
      return INITIAL_CUSTOM_REQUESTS;
    }
  });

  // Current User
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : {
        id: 'user-default-1',
        name: 'Ananya Sharma',
        email: 'ananya.s@gmail.com',
        phone: '+91 98260 12345',
        city: 'Indore',
        addresses: [
          {
            id: 'addr-1',
            street: 'Flat 402, Royal Palms, Scheme No. 54, Vijay Nagar',
            city: 'Indore',
            state: 'Madhya Pradesh',
            pincode: '452010',
            isDefault: true,
          }
        ]
      };
    } catch {
      return null;
    }
  });

  // Customer Reviews
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Login Modal State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.IS_ADMIN) === 'true';
  });
  const [adminRole, setAdminRole] = useState<'Owner' | 'Jeweler' | 'Support'>('Owner');

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_REQUESTS, JSON.stringify(customRequests));
  }, [customRequests]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IS_ADMIN, isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  const showToast = (message: string, type: 'success' | 'info' | 'gold' = 'gold') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Product Operations
  const addProduct = (productData: Omit<Product, 'id' | 'slug'>) => {
    const newId = `argi-${Date.now().toString().slice(-4)}`;
    const slug = productData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProduct: Product = {
      ...productData,
      id: newId,
      slug,
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`"${newProduct.title}" added to catalog.`, 'gold');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('Product updated successfully.', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog.', 'info');
  };

  const getProductBySlugOrId = (identifier: string) => {
    return products.find(p => p.slug === identifier || p.id === identifier);
  };

  // Cart Operations
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        i => i.productId === item.productId && i.finish === item.finish && i.size === item.size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          ...item,
          id: `cart-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`
        };
        return [...prev, newItem];
      }
    });
    showToast(`Added ${item.title} (${item.finish}) to your bag.`, 'gold');
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item removed from cart.', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCouponCode(null);
    localStorage.removeItem(STORAGE_KEYS.COUPON);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const freeShippingThreshold = 1999;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  // Coupon Operations
  const applyCoupon = (code: string) => {
    const upper = code.trim().toUpperCase();
    const coupon = AVAILABLE_COUPONS[upper];
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code. Try ARGI10 or INDORE' };
    }
    setAppliedCouponCode(upper);
    localStorage.setItem(STORAGE_KEYS.COUPON, upper);
    showToast(`Coupon ${upper} applied successfully!`, 'success');
    return { success: true, message: `Coupon ${upper} applied!` };
  };

  const removeCoupon = () => {
    setAppliedCouponCode(null);
    localStorage.removeItem(STORAGE_KEYS.COUPON);
    showToast('Coupon removed.', 'info');
  };

  let appliedCoupon: { code: string; discountAmount: number } | null = null;
  if (appliedCouponCode && AVAILABLE_COUPONS[appliedCouponCode]) {
    const coupon = AVAILABLE_COUPONS[appliedCouponCode];
    let discount = 0;
    if (coupon.type === 'percent') {
      discount = Math.round((cartSubtotal * coupon.value) / 100);
    } else {
      discount = Math.min(coupon.value, cartSubtotal);
    }
    appliedCoupon = { code: coupon.code, discountAmount: discount };
  }

  // Wishlist Operations
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to your wishlist.', 'gold');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Order Operations
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt'>): Order => {
    const newOrderId = `ARGI-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id: newOrderId,
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast(`Order ${newOrderId} placed successfully!`, 'gold');
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string, 
    status: OrderStatus, 
    courier?: Order['courierPartner'], 
    tracking?: string
  ) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status,
          courierPartner: courier || order.courierPartner,
          trackingNumber: tracking || order.trackingNumber,
        };
      }
      return order;
    }));
    showToast(`Order ${orderId} updated to ${status}.`, 'success');
  };

  // Bespoke Custom Requests
  const submitCustomRequest = (data: Omit<CustomOrderRequest, 'id' | 'createdAt' | 'status'>): CustomOrderRequest => {
    const newId = `REQ-ARG-${Math.floor(500 + Math.random() * 500)}`;
    const newRequest: CustomOrderRequest = {
      ...data,
      id: newId,
      status: 'New Request',
      createdAt: new Date().toISOString(),
    };
    setCustomRequests(prev => [newRequest, ...prev]);
    showToast(`Bespoke inquiry #${newId} submitted to our Indore master jeweler.`, 'gold');
    return newRequest;
  };

  const updateCustomRequestStatus = (id: string, status: BespokeStatus, notes?: string) => {
    setCustomRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status,
          notes: notes !== undefined ? notes : req.notes,
        };
      }
      return req;
    }));
    showToast(`Inquiry ${id} status moved to "${status}".`, 'success');
  };

  // User Auth
  const loginUser = (name: string, email: string, phone: string, city: string = 'Indore') => {
    const user: UserProfile = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      city,
      addresses: [
        {
          id: 'addr-primary',
          street: 'Scheme 54, Vijay Nagar',
          city,
          state: 'Madhya Pradesh',
          pincode: '452010',
          isDefault: true,
        }
      ]
    };
    setCurrentUser(user);
    showToast(`Welcome back, ${name}.`, 'gold');
  };

  const loginWithGoogle = (data: { name: string; email: string; avatar?: string; phone?: string }) => {
    const user: UserProfile = {
      id: `user-google-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone || '+91 98260 12345',
      city: 'Indore',
      avatar: data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      authProvider: 'google',
      addresses: [
        {
          id: 'addr-primary',
          street: 'Scheme 54, Vijay Nagar',
          city: 'Indore',
          state: 'Madhya Pradesh',
          pincode: '452010',
          isDefault: true,
        }
      ]
    };
    setCurrentUser(user);
    setIsLoginModalOpen(false);
    showToast(`Welcome, ${data.name}! Signed in with Google.`, 'gold');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('Signed out.', 'info');
  };

  // Customer Reviews
  const addReview = (reviewData: Omit<CustomerReview, 'id' | 'date'>) => {
    const newRev: CustomerReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    setReviews(prev => [newRev, ...prev]);
    showToast('Thank you! Your verified review has been published.', 'gold');
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter(r => r.productId === productId);
  };

  return (
    <StoreContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductBySlugOrId,

      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      cartSubtotal,
      cartCount,
      freeShippingThreshold,
      amountNeededForFreeShipping,
      appliedCoupon,
      applyCoupon,
      removeCoupon,

      wishlist,
      toggleWishlist,
      isInWishlist,

      orders,
      createOrder,
      updateOrderStatus,

      customRequests,
      submitCustomRequest,
      updateCustomRequestStatus,

      currentUser,
      isLoginModalOpen,
      setIsLoginModalOpen,
      loginUser,
      loginWithGoogle,
      logoutUser,

      isAdmin,
      adminRole,
      setIsAdmin,
      setAdminRole,

      reviews,
      addReview,
      getProductReviews,

      toasts,
      showToast,
      removeToast,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
