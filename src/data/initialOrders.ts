import { Order } from '../types';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ARGI-2026-9842',
    items: [
      {
        id: 'cart-1',
        productId: 'argi-01',
        title: 'The Indore Royal Solitaire Ring',
        price: 3499,
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
        finish: 'Rhodium Silver',
        size: '8',
        engraving: 'A & P Forever',
        quantity: 1
      },
      {
        id: 'cart-2',
        productId: 'argi-04',
        title: 'Sarafa Minimalist Pavé Huggie Hoops',
        price: 1899,
        image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
        finish: 'Rhodium Silver',
        quantity: 1
      }
    ],
    subtotal: 5398,
    discount: 500,
    shippingFee: 0,
    totalAmount: 4898,
    status: 'Shipped',
    customer: {
      name: 'Ananya Sharma',
      phone: '+91 98260 12345',
      email: 'ananya.s@gmail.com',
      address: 'Flat 402, Royal Palms, Scheme No. 54, Vijay Nagar',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452010'
    },
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    courierPartner: 'Blue Dart Express',
    trackingNumber: 'BLUEDART-IND-778942',
    createdAt: '2026-09-15T14:32:00Z'
  },
  {
    id: 'ARGI-2026-9841',
    items: [
      {
        id: 'cart-3',
        productId: 'argi-03',
        title: 'Ahilya Celestial Tennis Bracelet',
        price: 4999,
        image: 'https://images.unsplash.com/photo-1611591475825-9610f4384a2c?auto=format&fit=crop&w=600&q=80',
        finish: 'Rose Gold Plated',
        size: '7.0 inch',
        quantity: 1
      }
    ],
    subtotal: 4999,
    discount: 0,
    shippingFee: 0,
    totalAmount: 4999,
    status: 'Processing',
    customer: {
      name: 'Rohan Mehra',
      phone: '+91 98112 34567',
      email: 'rohan.mehra@outlook.com',
      address: 'Villa 12, Sobha Malabar, South Extension II',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110049'
    },
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    courierPartner: 'Delhivery',
    trackingNumber: 'DEL-ND-90214',
    createdAt: '2026-09-16T10:15:00Z'
  },
  {
    id: 'ARGI-2026-9838',
    items: [
      {
        id: 'cart-4',
        productId: 'argi-05',
        title: 'Custom Calligraphy Nameplate Necklace',
        price: 2699,
        image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80',
        finish: '18k Yellow Gold Plated',
        engraving: 'Priyanka',
        quantity: 1
      }
    ],
    subtotal: 2699,
    discount: 269,
    shippingFee: 0,
    totalAmount: 2430,
    status: 'Delivered',
    customer: {
      name: 'Priyanka Deshmukh',
      phone: '+91 97654 88120',
      email: 'priyanka.d@yahoo.com',
      address: 'Tower B, Lodha Bellissimo, Worli Sea Face',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400018'
    },
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    courierPartner: 'Blue Dart Express',
    trackingNumber: 'BLUEDART-MUM-445891',
    createdAt: '2026-09-12T16:40:00Z'
  }
];
