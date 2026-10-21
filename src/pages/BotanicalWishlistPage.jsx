import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, ShoppingBag, Trash2, ChevronRight } from 'lucide-react';
import { useBotanicalWishlist } from '../context/BotanicalWishlistContext';
import { useBotanicalCart } from '../context/BotanicalCartContext';
import BotanicalProductCard from '../components/product/BotanicalProductCard';

export default function BotanicalWishlistPage() {
  const { wishlist, clearWishlist } = useBotanicalWishlist();
  const { addToBag } = useBotanicalCart();
  const navigate = useNavigate();

  const handleMoveAllToBag = () => {
    wishlist.forEach((item) => {
      addToBag(item, 1);
    });
    clearWishlist();
  };

  return (
    <div className="pb-28 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      {/* Breadcrumbs */}
      <nav className="pt-4 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Link to="/" className="hover:text-[#1A3326] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[#1A3326] font-semibold">Saved Botanicals</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#EBE6DC]">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#7D9678]">
            Sacred Botanicals Haven
          </span>
          <h1 className="font-botanical text-3xl sm:text-5xl font-bold text-[#1A3326] tracking-tight mt-1">
            Saved Botanicals
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for future seasonal harvests
          </p>
        </div>

        {wishlist.length > 0 && (
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              type="button"
              onClick={clearWishlist}
              className="text-xs text-[#C26747] hover:underline font-semibold cursor-pointer"
            >
              Clear Wishlist
            </button>
            <button
              type="button"
              onClick={handleMoveAllToBag}
              className="px-5 py-2.5 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Move All to Bag</span>
            </button>
          </div>
        )}
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((product) => (
            <BotanicalProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center space-y-4 bg-[#FBF9F5] rounded-3xl border border-dashed border-[#EBE6DC] p-8 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#EFF4EE] text-[#C26747] flex items-center justify-center mx-auto shadow-sm">
            <Heart className="w-8 h-8 stroke-[1.8]" />
          </div>
          <div>
            <h3 className="font-botanical text-2xl font-bold text-[#1A3326]">
              Your Saved Haven is Empty
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-sm mx-auto leading-relaxed">
              Tap the heart icon on any wildcraft tincture, restorative balm, or scented candle to hold it here.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/series')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Explore Curated Series</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
