import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, ShoppingBag, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useBotanicalWishlist } from '../context/BotanicalWishlistContext';
import { useBotanicalCart } from '../context/BotanicalCartContext';
import BotanicalProductCard from '../components/product/BotanicalProductCard';

export default function BotanicalWishlistPage() {
  const { wishlist, clearWishlist } = useBotanicalWishlist();
  const { addToBag } = useBotanicalCart();
  const navigate = useNavigate();

  const handleMoveAllToBag = () => {
    wishlist.forEach((item) => {
      addToBag(item, 1, null, false);
    });
    clearWishlist();
  };

  return (
    <div className="pb-28 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      {/* ========================================================= */}
      {/* ATMOSPHERIC NORDIC FOREST WISHLIST HERO BANNER            */}
      {/* ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-[#1A3326]/20 shadow-2xl bg-[#09150D]"
      >
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&auto=format&fit=crop&q=85"
            alt="Misty Nordic Mountains"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07130B]/95 via-[#0D1F13]/85 to-[#07130B]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07130B] via-[#07130B]/40 to-black/30" />
          <div className="absolute -top-20 right-1/4 w-80 h-80 rounded-full bg-[#C26747]/15 blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-6 sm:p-8 lg:p-10 space-y-6">
          {/* Frosted Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-[#E8DCC8] font-medium">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#FBF9F5] font-semibold">Saved Formulations</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10.5px] uppercase font-bold tracking-[0.16em] text-[#E8DCC8] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8C5A8] animate-pulse" />
                <span>Personal Formulary Archive</span>
              </div>
              <h1 className="font-botanical text-3xl sm:text-5xl font-bold text-[#FBF9F5] tracking-tight drop-shadow-sm">
                Saved Formulations
              </h1>
              <p className="text-xs sm:text-sm text-[#DCD4C7] max-w-xl">
                {wishlist.length} {wishlist.length === 1 ? 'specimen' : 'specimens'} reserved for upcoming seasonal harvests and small-batch allocations.
              </p>
            </div>

            {wishlist.length > 0 && (
              <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
                <button
                  type="button"
                  onClick={clearWishlist}
                  className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs text-[#E8C5A8] hover:text-white transition-colors cursor-pointer"
                >
                  Clear Saved
                </button>
                <button
                  type="button"
                  onClick={handleMoveAllToBag}
                  className="px-6 py-2.5 rounded-full bg-[#C26747] hover:bg-[#A85335] text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-[#C26747]/30 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move All to Bag</span>
                </button>
              </div>
            )}
          </div>

          {/* Provenance Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none text-[11px] pt-1">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#E8DCC8] shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#E8C5A8]" />
              <span>Harvest Priority Allocation</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#E8DCC8] shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7D9678]" />
              <span>Saved Formulation Vault</span>
            </div>
          </div>
        </div>
      </motion.div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((product) => (
            <BotanicalProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center space-y-4 bg-[#FBF9F5] rounded-3xl border border-dashed border-[#EBE6DC] p-8 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#EFF4EE] text-[#C26747] flex items-center justify-center mx-auto shadow-xs">
            <Heart className="w-8 h-8 stroke-[1.8]" />
          </div>
          <div>
            <h3 className="font-botanical text-2xl font-bold text-[#1A3326]">
              Your Saved Archive is Empty
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-sm mx-auto leading-relaxed">
              Tap the heart icon on any wildcraft tincture, restorative balm, or scented candle to reserve it here.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/series')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
          >
            <span>Explore Curated Series</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
