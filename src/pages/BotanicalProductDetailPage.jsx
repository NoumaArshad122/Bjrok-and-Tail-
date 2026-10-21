import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  ShoppingBag,
  Heart,
  Star,
  Sparkles,
  ShieldCheck,
  Leaf,
  Check,
  Compass,
  ChevronRight,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { BOTANICAL_PRODUCTS } from '../data/botanicalProducts';
import { useBotanicalCart } from '../context/BotanicalCartContext';
import { useBotanicalWishlist } from '../context/BotanicalWishlistContext';
import { formatCurrency, calculateDiscount } from '../../src/lib/formatCurrency';
import BotanicalProductCard from '../components/product/BotanicalProductCard';

export default function BotanicalProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToBag } = useBotanicalCart();
  const { toggleWishlist, isInWishlist } = useBotanicalWishlist();

  const product = BOTANICAL_PRODUCTS.find((p) => p.slug === slug);

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  // Accordion toggle states
  const [openSection, setOpenSection] = useState('ritual');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setQuantity(1);
    setSelectedImageIdx(0);
    setIsAdded(false);
  }, [slug]);

  if (!product) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4 space-y-4">
        <h2 className="font-botanical text-2xl font-bold text-[#1A3326]">
          Botanical Specimen Not Found
        </h2>
        <p className="text-xs text-slate-500">
          This wildcraft formulation may have ended its harvest cycle.
        </p>
        <button
          type="button"
          onClick={() => navigate('/series')}
          className="px-5 py-2.5 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white text-xs font-semibold cursor-pointer transition-colors"
        >
          Return to Series
        </button>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.compareAtPrice);
  const relatedBotanicals = BOTANICAL_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const startCoords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    setIsAdded(true);
    addToBag(product, quantity, startCoords);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const toggleAccordion = (sectionName) => {
    setOpenSection((prev) => (prev === sectionName ? null : sectionName));
  };

  return (
    <div className="pb-28 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-in fade-in duration-300">
      {/* Breadcrumbs */}
      <nav className="pt-4 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Link to="/" className="hover:text-[#1A3326] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/series" className="hover:text-[#1A3326] transition-colors">
          The Series
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link
          to={`/series?category=${product.category}`}
          className="hover:text-[#1A3326] transition-colors capitalize"
        >
          {product.categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[#1A3326] font-semibold truncate max-w-xs">
          {product.title}
        </span>
      </nav>

      {/* Main 2-Column Split on Laptop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Image Gallery Showcase */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#EFF4EE] shadow-md border border-[#EBE6DC]">
            <motion.img
              src={product.images[selectedImageIdx] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover object-center"
              initial={{ scale: 1.05, opacity: 0.9 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            />

            {/* Harvest & Discount Tag */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {discount > 0 && (
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C26747] text-white shadow-md">
                  -{discount}% Seasonal Offer
                </span>
              )}
              <span className="px-3 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#1A3326]/85 backdrop-blur-md text-[#FBF9F5]">
                {product.harvestSeason}
              </span>
            </div>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-label={inWishlist ? 'Remove from saved' : 'Save botanical'}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all cursor-pointer ${
                inWishlist
                  ? 'bg-[#C26747] text-white hover:bg-[#1A3326]'
                  : 'bg-white/90 text-[#1A3326] hover:bg-[#C26747] hover:text-white'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${inWishlist ? 'fill-white stroke-white' : 'stroke-[2]'}`}
              />
            </button>
          </div>

          {/* Thumbnail Selector Strip */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    selectedImageIdx === idx
                      ? 'border-[#C26747] ring-2 ring-[#C26747]/20 scale-105'
                      : 'border-[#EBE6DC] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information, Pricing, Stepper, Accordions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7D9678]">
                {product.categoryName} • {product.size}
              </span>
              <div className="flex items-center gap-1 text-[#C26747]">
                <Star className="w-4 h-4 fill-[#C26747] stroke-[#C26747]" />
                <span className="font-bold text-xs text-[#1A3326]">{product.rating}</span>
                <span className="text-slate-400 text-xs">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            <h1 className="font-botanical text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A3326] tracking-tight leading-snug">
              {product.title}
            </h1>
            <p className="font-serif italic text-sm text-[#7D9678] mt-1.5">
              {product.botanicalName}
            </p>
          </div>

          {/* Price & Provenance Box */}
          <div className="p-5 rounded-3xl bg-[#FBF9F5] border border-[#EBE6DC] flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#7D9678] block mb-0.5">
                Dispensary Price
              </span>
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl font-bold text-[#1A3326]">
                  {formatCurrency(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatCurrency(product.compareAtPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-[#7D9678] block mb-0.5">
                Wildcraft Origin
              </span>
              <span className="text-xs font-semibold text-[#1A3326]">
                {product.provenance}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Add to Bag Controller with Quantity Stepper */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#EBE6DC] shadow-md flex items-center gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-[#EBE6DC] rounded-full overflow-hidden bg-[#FBF9F5] h-12 shrink-0">
              <button
                type="button"
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 h-full text-slate-500 hover:text-[#1A3326] disabled:opacity-30 cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 text-sm font-bold text-[#1A3326]">
                {quantity}
              </span>
              <button
                type="button"
                disabled={quantity >= product.stock}
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-4 h-full text-slate-500 hover:text-[#1A3326] disabled:opacity-30 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Bag CTA Button */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={handleAddToCart}
              className={`flex-1 h-12 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                isAdded
                  ? 'bg-[#1A3326] text-[#FBF9F5] hover:bg-[#C26747]'
                  : 'bg-[#C26747] hover:bg-[#1A3326] text-white'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added to Your Botanical Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 stroke-[2]" />
                  <span>Add to Bag • {formatCurrency(product.price * quantity)}</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 pt-1">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#7D9678]" />
              <span>Free Nordic Transit over $75</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#7D9678]" />
              <span>30-Day Freshness Guarantee</span>
            </div>
          </div>

          {/* 3 Expandable Accordions */}
          <div className="space-y-3 pt-2">
            {/* 1. Ritual & Usage */}
            <div className="rounded-3xl border border-[#EBE6DC] bg-[#FBF9F5] overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('ritual')}
                className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#C26747]" />
                  <span className="font-botanical text-lg font-bold text-[#1A3326]">
                    The Botanical Ritual & Usage
                  </span>
                </div>
                {openSection === 'ritual' ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>
              <AnimatePresence>
                {openSection === 'ritual' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-[#EBE6DC]/60">
                      {product.ritual}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Provenance & Ingredients */}
            <div className="rounded-3xl border border-[#EBE6DC] bg-[#FBF9F5] overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('provenance')}
                className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Leaf className="w-4 h-4 text-[#7D9678]" />
                  <span className="font-botanical text-lg font-bold text-[#1A3326]">
                    Wildcrafted Provenance & Ingredients
                  </span>
                </div>
                {openSection === 'provenance' ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>
              <AnimatePresence>
                {openSection === 'provenance' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-[#EBE6DC]/60">
                      <div>
                        <strong className="text-[#1A3326] block mb-1">
                          Full Botanical Ingredients:
                        </strong>
                        <p className="font-mono text-xs text-slate-500">
                          {product.ingredients}
                        </p>
                      </div>
                      <div>
                        <strong className="text-[#1A3326] block mb-0.5">
                          Foraging Coordinates & Terroir:
                        </strong>
                        <p>{product.provenance} (Harvested {product.harvestSeason})</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Carbon-Neutral Transport */}
            <div className="rounded-3xl border border-[#EBE6DC] bg-[#FBF9F5] overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('sustainability')}
                className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#1A3326]" />
                  <span className="font-botanical text-lg font-bold text-[#1A3326]">
                    Carbon-Neutral Nordic Transport
                  </span>
                </div>
                {openSection === 'sustainability' ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>
              <AnimatePresence>
                {openSection === 'sustainability' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-[#EBE6DC]/60 space-y-2">
                      <p>{product.ecoNote}</p>
                      <p className="text-xs text-slate-500 italic">
                        All deliveries are packaged in biodegradable wood-pulp cushions and post-consumer recycled boxes sealed with water-activated linen tape.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Companion Formulations Grid */}
      {relatedBotanicals.length > 0 && (
        <div className="pt-10 border-t border-[#EBE6DC] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#7D9678]">
                Harmonious Pairings
              </span>
              <h3 className="font-botanical text-2xl sm:text-3xl font-bold text-[#1A3326]">
                Companion Formulations
              </h3>
            </div>
            <Link
              to="/series"
              className="text-xs font-bold text-[#C26747] hover:underline"
            >
              Explore Full Dispensary →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedBotanicals.map((rel) => (
              <BotanicalProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
