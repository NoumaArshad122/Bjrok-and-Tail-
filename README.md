# BJÖRK & TALL — Artisanal Nordic Dispensary & Luxury Apothecary

[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-1A3326)]()

An enterprise-grade, luxury Scandinavian botanical apothecary e-commerce application. BJÖRK & TALL delivers hand-harvested wildcraft elixirs, conifer resin salves, and restorative forest teas from Swedish Lapland (68°N) in biophotonic Miron violet glass.

---

## 🌿 Architectural Highlights

### 1. Multi-Regional Currency & Settlement Engine
- **Global / International Market (USD $)**:
  - Standard & express DHL Nordic cold-chain transit (3–5 business days).
  - Stripe-style encrypted Card settlement (Visa, Mastercard, Amex), Apple Pay, Google Pay, PayPal.
  - International phone formatting and customs pre-clearance.
- **Pakistan Flagship Dispensary (PKR ₨)**:
  - Dynamic currency conversion with regional pricing and shipping thresholds.
  - Nationwide domestic express delivery via TCS & Leopards (24–48 hours).
  - Full local payment channels: Cash on Delivery (COD), JazzCash, EasyPaisa, NayaPay, SadaPay, and Debit/Credit Card.
- **1-Click Region Switching**: Seamlessly toggle storefront markets from the utility micro-bar or mobile navigation drawer.

### 2. High-End Customer Experience (Zero Vibe-Coding Artifacts)
- **Live Search Modal**: Instant `Cmd+K` / `Ctrl+K` autocomplete search overlay across species, categories, terroir, and Latin nomenclature with quick-add.
- **Slide-Over Mini-Cart Drawer**: Smooth drawer interface featuring real-time Free Transit thresholds, Solstice Lip Balm Gift progress, and promo code validation (`NORDIC10`, `FREESHIP`, `HARVEST25`).
- **Cold-Chain Order Tracking**: Real-time dispatch lookup by order reference (e.g. `BT-PK-982341`) tracking milestones from Södermalm laboratory compounding to courier handover.
- **Verified Patron Appraisals**: Multi-point rating breakdowns, customer reviews with verified purchase status, skin ritual tags, and an interactive appraisal submission modal.
- **Interactive Provenance Map & Treaties**: Detailed modal exploring ethical foraging reserves (Swedish Lapland 68°N, Norrbotten Peatlands, Dalarna, Stockholm Archipelago), Miron violet glass photobiology, and zero-depletion harvesting treaties.

---

## 🛠 Tech Stack

- **Framework**: React 19 + Vite 8
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Animations**: Framer Motion (orchestrated springs and slide-overs)
- **Icons**: Lucide React
- **Typography**: Cormorant Garamond (Editorial Serif) + Plus Jakarta Sans (UI Sans)
- **Linting & Quality**: Oxlint

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/NoumaArshad122/Bjrok-and-Tail-.git
cd tododo

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be live at `http://localhost:5173/`.

### Production Build

```bash
# Validate and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```
src/
├── components/
│   ├── cart/             # Slide-over Mini-Cart Drawer
│   ├── checkout/         # Multi-region payment and checkout modal
│   ├── home/             # Hero slider and curated home components
│   ├── layout/           # Header, Footer, Bottom navigation
│   ├── modals/           # LiveSearch, BrandStory, ShippingPolicy, Contact, OrderTracking
│   ├── product/          # Product card with responsive quick-add and badge logic
│   └── ui/               # Toast notifications
├── config/               # Store settings, regional presets, and promo codes
├── context/              # CurrencyContext, CartContext, WishlistContext
├── data/                 # Curated botanical products, categories, mock reviews
├── lib/                  # Currency formatting and calculation utilities
├── pages/                # Home, Series, Product Detail, Bag, Wishlist
└── App.jsx               # Main router and modal orchestration
```

---

## 📜 Ethical Treaties & Philosophy
All extractions honor *Allemansrätten* (The Right of Public Access), limited by strict 5-year cyclical rotation reserves to guarantee zero botanical depletion. Formulated and compounded in Stockholm, Sweden.
