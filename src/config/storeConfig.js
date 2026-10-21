/**
 * Nordic Botanical Luxury Storefront Configuration
 * Central config for thresholds, brand details, currency, and shopper defaults.
 */
export const STORE_CONFIG = {
  brandName: 'BJÖRK & TALL',
  brandTagline: 'Nordic Botanical Luxury • Hand-Harvested Wildcraft',
  defaultShopperName: 'Astrid',
  currency: 'USD',
  currencySymbol: '$',
  
  // Cart & Gift Thresholds (from PRD Section 5.4 & 5.5)
  freeShippingThreshold: 75.0,
  standardShippingFee: 6.5,
  complimentaryGiftThreshold: 100.0,
  complimentaryGift: {
    name: 'Wild Cloudberry Restorative Lip Balm',
    volume: '15 ml / 0.5 fl oz',
    value: 24.0,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80',
    description: 'Cold-pressed Arctic cloudberries and organic spruce resin for deep moisture.',
  },

  // Motion Settings
  motion: {
    fast: 0.16,
    base: 0.3,
    slow: 0.5,
    easeOut: [0.2, 0.8, 0.2, 1],
  },
};
