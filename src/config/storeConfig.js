/**
 * BJÖRK & TALL — Storefront Configuration
 * Centralized settings for multi-regional currency, thresholds, shipping, and promotional codes.
 */

export const REGIONS = {
  US: {
    id: 'US',
    label: 'Global (USD $)',
    flag: '🌐',
    currency: 'USD',
    currencySymbol: '$',
    exchangeRate: 1,
    freeShippingThreshold: 75.0,
    standardShippingFee: 6.5,
    giftThreshold: 100.0,
    complimentaryGiftValue: 24.0,
    phonePlaceholder: '+1 (555) 000-0000',
    phoneRegex: /^\+?[0-9\s\-()]{8,20}$/,
    methods: ['card', 'apple_pay', 'google_pay', 'paypal', 'cod'],
    defaultCourier: 'DHL Nordic Express (3–5 business days)',
  },
  PK: {
    id: 'PK',
    label: 'Pakistan (PKR ₨)',
    flag: '🇵🇰',
    currency: 'PKR',
    currencySymbol: '₨',
    exchangeRate: 280,
    freeShippingThreshold: 15000,
    standardShippingFee: 450,
    giftThreshold: 25000,
    complimentaryGiftValue: 6500,
    phonePlaceholder: '0300 1234567',
    phoneRegex: /^(03\d{9}|\+923\d{9})$/,
    methods: ['cod', 'jazzcash', 'easypaisa', 'nayapay', 'card'],
    defaultCourier: 'TCS Air Courier (2–3 business days)',
  },
};

export const PROMO_CODES = {
  NORDIC10: {
    code: 'NORDIC10',
    type: 'percentage',
    value: 10,
    description: '10% off entire order',
    minSubtotal: 0,
  },
  FREESHIP: {
    code: 'FREESHIP',
    type: 'shipping',
    value: 100,
    description: 'Complimentary shipping',
    minSubtotal: 0,
  },
  HARVEST25: {
    code: 'HARVEST25',
    type: 'fixed',
    valueUSD: 25,
    valuePKR: 7000,
    description: '$25 / Rs 7,000 off orders over $100 / Rs 28,000',
    minSubtotalUSD: 100,
    minSubtotalPKR: 28000,
  },
};

export const STORE_CONFIG = {
  brandName: 'BJÖRK & TALL',
  brandTagline: 'Nordic Botanical Luxury • Hand-Harvested Wildcraft',
  defaultShopperName: 'Valued Guest',
  regions: REGIONS,
  defaultRegion: 'US',

  complimentaryGift: {
    name: 'Wild Cloudberry Restorative Lip Balm',
    volume: '15 ml / 0.5 fl oz',
    valueUSD: 24.0,
    valuePKR: 6500,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80',
    description: 'Cold-pressed Arctic cloudberries and organic spruce resin for deep cellular hydration.',
  },

  motion: {
    fast: 0.16,
    base: 0.3,
    slow: 0.5,
    easeOut: [0.2, 0.8, 0.2, 1],
  },
};
