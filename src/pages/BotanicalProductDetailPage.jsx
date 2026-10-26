import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
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
  ChevronRight,
  Truck,
  RotateCcw,
  MessageSquare,
} from 'lucide-react';
import { BOTANICAL_PRODUCTS } from '../data/botanicalProducts';
import { useBotanicalCart } from '../context/BotanicalCartContext';
import { useBotanicalWishlist } from '../context/BotanicalWishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { calculateDiscount } from '../lib/formatCurrency';
import BotanicalProductCard from '../components/product/BotanicalProductCard';
import WriteReviewModal from '../components/modals/WriteReviewModal';
import { getProductReviews } from '../data/mockReviews';

export default function BotanicalProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToBag } = useBotanicalCart();
  const { toggleWishlist, isInWishlist } = useBotanicalWishlist();
  const { formatPrice, activeRegion } = useCurrency();

  const product = BOTANICAL_PRODUCTS.find((p) => p.slug === slug);

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [openSection, setOpenSection] = useState('ritual');
  const [reviews, setReviews] = useState([]);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setQuantity(1);
    setSelectedImageIdx(0);
    setIsAdded(false);
    if (product) {
      setReviews(getProductReviews(product.id));
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4 space-y-4">
        <h2 className="font-botanical text-2xl font-bold text-[#1A3326]">
          Botanical Specimen Not Found
        </h2>
        <p className="text-xs text-slate-500">
          This wildcraft formulation may have completed its seasonal harvest cycle.
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

  const handleAddToCart = () => {
    setIsAdded(true);
    addToBag(product, quantity);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const toggleAccordion = (sectionName) => {
    setOpenSection((prev) => (prev === sectionName ? null : sectionName));
  };

  const handleReviewSubmitted = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  // Compute rating average
  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : product.rating || 4.9;

  return (
    <div className="pb-28 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-in fade-in duration-300">
      {/* ========================================================= */}
      {/* ATMOSPHERIC NORDIC FOREST SPECIMEN HERO BANNER            */}
      {/* ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-[#1A3326]/20 shadow-xl bg-[#09150D]"
      >
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1920&auto=format&fit=crop&q=85"
            alt={product.title}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07130B]/95 via-[#0D1F13]/85 to-[#07130B]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07130B] via-transparent to-black/30" />
          <div className="absolute -top-24 right-1/4 w-80 h-80 rounded-full bg-[#C26747]/15 blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-5 sm:p-7 lg:p-8 space-y-4">
          {/* Frosted Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-[#E8DCC8] font-medium">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <Link to="/series" className="hover:text-white transition-colors">
              The Series
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#FBF9F5] font-semibold truncate max-w-xs">{product.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] uppercase font-bold tracking-[0.16em] text-[#E8DCC8]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8C5A8] animate-pulse" />
                <span>{product.provenance} • Batch 2026</span>
              </div>
              <h1 className="font-botanical text-2xl sm:text-4xl lg:text-5xl font-bold text-[#FBF9F5] tracking-tight">
                {product.title}
              </h1>
              <p className="text-xs sm:text-sm font-botanical italic text-[#E8C5A8]">
                {product.botanicalName}
              </p>
            </div>

            {/* Quick Badges */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#E8DCC8]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7D9678]" />
                <span>Miron Violet Glass</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#E8DCC8]">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cold-Chain Transit</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#C26747]/30 border border-[#C26747]/40 text-[#FBF9F5] font-semibold">
                <Star className="w-3.5 h-3.5 fill-[#C26747] text-[#C26747]" />
                <span>{avgRating} ({reviews.length})</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Grid: Gallery + Product Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Artwork Frame */}
          <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden bg-[#EFF4EE] border border-[#EBE6DC] shadow-md">
            <img
              src={product.images[selectedImageIdx] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />

            {/* Tags */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {product.tag && (
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1A3326]/90 backdrop-blur-md text-[#FBF9F5]">
                  {product.tag}
                </span>
              )}
              {discount > 0 && (
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C26747] text-white">
                  {discount}% Harvest Special
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-sm ${
                inWishlist
                  ? 'bg-[#C26747] text-white'
                  : 'bg-white/85 text-[#1A3326] hover:bg-white hover:text-[#C26747]'
              }`}
            >
              <Heart
                className={`w-5 h-5 ${
                  inWishlist ? 'fill-white stroke-white' : 'stroke-[1.75]'
                }`}
              />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    selectedImageIdx === idx
                      ? 'border-[#1A3326] ring-2 ring-[#1A3326]/20'
                      : 'border-[#EBE6DC] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Specimen Dossier & Commerce Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-widest text-[#7D9678]">
                {product.categoryName} • {product.size}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-700 font-semibold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{avgRating} ({reviews.length || product.reviewCount} Appraisals)</span>
              </div>
            </div>

            <h1 className="font-botanical text-2xl sm:text-4xl font-bold text-[#1A3326] leading-tight">
              {product.title}
            </h1>

            <p className="font-serif italic text-sm text-slate-500">
              {product.botanicalName}
            </p>
          </div>

          {/* Price Box */}
          <div className="p-5 rounded-3xl bg-[#FBF9F5] border border-[#EBE6DC] flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#7D9678] block mb-0.5">
                Dispensary Price • {activeRegion.label}
              </span>
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl font-bold text-[#1A3326]">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-[#7D9678] block mb-0.5">
                Wildcraft Provenance
              </span>
              <span className="text-xs font-semibold text-[#1A3326] max-w-[150px] truncate block">
                {product.provenance}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Batch Urgency Badge */}
          {product.stock && product.stock <= 15 && (
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center gap-2 text-xs text-amber-900">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>
                <strong>Seasonal Harvest Availability:</strong> Only {product.stock} bottles remaining in this extraction run.
              </span>
            </div>
          )}

          {/* Add to Bag Stepper Controller */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#EBE6DC] shadow-md flex items-center gap-4">
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

            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={handleAddToCart}
              className={`flex-1 h-12 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                isAdded
                  ? 'bg-[#1A3326] text-[#FBF9F5]'
                  : 'bg-[#C26747] hover:bg-[#1A3326] text-white'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 stroke-[2]" />
                  <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 pt-1">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#7D9678]" />
              <span>Complimentary Transit Available</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#7D9678]" />
              <span>30-Day Freshness Guarantee</span>
            </div>
          </div>

          {/* Expandable Accordions */}
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
                    Botanical Ritual & Usage
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
                    Wildcrafted Ingredients & Provenance
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
                          Full Botanical Nomenclature:
                        </strong>
                        <p className="font-mono text-xs text-slate-500">
                          {product.ingredients}
                        </p>
                      </div>
                      <div>
                        <strong className="text-[#1A3326] block mb-0.5">
                          Terroir & Coordinates:
                        </strong>
                        <p>{product.provenance} (Harvested {product.harvestSeason})</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Carbon-Neutral Packaging */}
            <div className="rounded-3xl border border-[#EBE6DC] bg-[#FBF9F5] overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('sustainability')}
                className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#1A3326]" />
                  <span className="font-botanical text-lg font-bold text-[#1A3326]">
                    Biophotonic Preservation & Transit
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
                        Insulated in compostable wood-pulp cushions and post-consumer recycled boxes sealed with water-activated organic gummed tape.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Client Appraisals & Reviews Section */}
      <div className="pt-12 border-t border-[#EBE6DC] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#7D9678]">
              Formulation Experience
            </span>
            <h3 className="font-botanical text-2xl sm:text-3xl font-bold text-[#1A3326] mt-0.5">
              Client Appraisals ({reviews.length})
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Verified patron appraisals from Nordic and international orders.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsWriteReviewOpen(true)}
            className="px-5 py-2.5 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Write an Appraisal</span>
          </button>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#EBE6DC] space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= rev.rating
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
                </div>

                <h4 className="font-bold text-xs sm:text-sm text-[#1A3326] leading-snug">
                  {rev.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  "{rev.comment}"
                </p>

                {rev.ritual && (
                  <div className="p-2.5 rounded-xl bg-white border border-[#EBE6DC] text-[11px] text-slate-500 italic">
                    <strong className="not-italic text-[#1A3326] block font-semibold text-[10px] uppercase tracking-wider mb-0.5">
                      Ritual:
                    </strong>
                    {rev.ritual}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-[#EBE6DC] flex items-center justify-between text-[11px]">
                <div>
                  <span className="font-bold text-[#1A3326] block leading-none">{rev.author}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{rev.location}</span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Verified Patron</span>
                </span>
              </div>
            </div>
          ))}
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

      {/* Review Modal */}
      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        product={product}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </div>
  );
}
