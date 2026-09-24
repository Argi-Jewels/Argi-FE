import { CustomOrderRequest } from '../types';

export const INITIAL_CUSTOM_REQUESTS: CustomOrderRequest[] = [
  {
    id: 'REQ-ARG-501',
    customerName: 'Vikramaditya Solanki',
    phone: '+91 94250 88990',
    email: 'vikram.solanki@gmail.com',
    city: 'Indore',
    category: 'Custom Engagement Ring',
    description: 'Looking to craft a bespoke 925 sterling silver ring with a 2-carat emerald-cut moissanite center stone, flanked by two tapered baguette stones. Looking for a hidden halo underneath the prongs and an internal engraving of our anniversary date (18.11.2024).',
    referenceImageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
    selectedFinish: 'Rhodium Silver',
    stonePreference: 'Moissanite 2.0ct Emerald Cut',
    size: '10',
    engraving: '18.11.2024 ∞',
    budgetRange: '₹8,000 - ₹15,000',
    status: 'In Crafting',
    createdAt: '2026-09-14T11:20:00Z',
    notes: 'CAD model approved by customer on WhatsApp. Master karigar Jagdish ji in Sarafa workshop is casting in pure 925 silver with Rhodium dip.'
  },
  {
    id: 'REQ-ARG-502',
    customerName: 'Dr. Meera Iyer',
    phone: '+91 98450 77123',
    email: 'meera.iyer@apollo.org',
    city: 'Bengaluru',
    category: 'Heirloom Pendant',
    description: 'We have an antique family emblem featuring peacocks flanking a lotus. I want to replicate this in solid sterling silver with 18k yellow gold plating and micro-pearl dangles for my mother’s 60th birthday.',
    referenceImageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    selectedFinish: '18k Yellow Gold Plated',
    stonePreference: 'Natural Seed Pearls',
    size: 'N/A (Pendant)',
    engraving: 'Amma 60th',
    budgetRange: '₹12,000 - ₹20,000',
    status: 'Design Confirmed',
    createdAt: '2026-09-15T18:05:00Z',
    notes: 'Rough sketch digitized. Waiting for 3D wax mold preview to send customer via WhatsApp.'
  },
  {
    id: 'REQ-ARG-503',
    customerName: 'Aarav Patel',
    phone: '+91 99099 22341',
    email: 'aarav.patel@techcorp.io',
    city: 'Ahmedabad',
    category: 'Personalized Cuff Bracelet',
    description: 'Heavy gauge 925 sterling silver hammered cuff bracelet with GPS coordinates of Indore Sarafa Bazar on the interior rim: 22.7196° N, 75.8577° E. Matte brushed finish on exterior.',
    referenceImageUrl: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=600&q=80',
    selectedFinish: 'Rhodium Silver',
    stonePreference: 'None (Solid Silver Metalwork)',
    size: 'Medium (7.25 inch wrist)',
    engraving: '22.7196° N, 75.8577° E',
    budgetRange: '₹6,000 - ₹9,000',
    status: 'New Request',
    createdAt: '2026-09-17T09:45:00Z',
    notes: 'Submitted via storefront form. Reach out on WhatsApp today.'
  }
];
