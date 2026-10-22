import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Check, Heart, Sparkles } from 'lucide-react';
import { useBotanicalCart } from '../../context/BotanicalCartContext';
import { useBotanicalWishlist } from '../../context/BotanicalWishlistContext';
import { formatCurrency, calculateDiscount } from '../../lib/formatCurrency';

export default function BotanicalProductCard({ product }) {
  const { addToBag } = useBotanicalCart();
  const { toggleWishlist, isInWishlist } = useBotanicalWishlist();
  const [justAdded, setJustAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.compareAtPrice);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const startCoords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    setJustAdded(true);
    addToBag(product, 1, startCoords);
    setTimeout(() => setJustAdded(false), 900);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative bg-[#FBF9F5] rounded-3xl p-3 sm:p-3.5 border border-[#EBE6DC] shadow-sm hover:shadow-xl hover:shadow-[#1A3326]/5 transition-all flex flex-col justify-between overflow-hidden"
    >
      <div>
        {/* Product Art Frame */}
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#EFF4EE] mb-2.5 sm:mb-3">
          <Link to={`/product/${product.slug}`} className="block w-full h-full">
            <motion.img
              src={product.images[0]}
              alt={product.title}
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full h-full object-cover object-center"
            />
          </Link>

          {/* Sale or Seasonal Badge */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {discount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#C26747] text-white shadow-sm">
                -{discount}% Harvest
              </span>
            )}
            {product.tag && (
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase bg-[#1A3326]/80 backdrop-blur-sm text-[#FBF9F5]">
                {product.tag}
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-sm transition-all cursor-pointer ${
              inWishlist
                ? 'bg-[#C26747] text-white hover:bg-[#1A3326]'
                : 'bg-white/80 text-[#1A3326] hover:bg-[#C26747] hover:text-white'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                inWishlist ? 'fill-white stroke-white' : 'stroke-[2]'
              }`}
            />
          </button>
        </div>

        {/* Botanical Details */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#7D9678] block">
            {product.categoryName} • {product.size}
          </span>

          <h3 className="font-botanical text-sm sm:text-base font-bold text-[#1A3326] group-hover:text-[#C26747] transition-colors leading-snug line-clamp-1">
            <Link to={`/product/${product.slug}`}>{product.title}</Link>
          </h3>

          <p className="text-[11px] font-serif italic text-slate-500 line-clamp-1">
            {product.botanicalName}
          </p>
        </div>
      </div>

      {/* Footer Price & Add Button */}
      <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-[#EBE6DC]/80 flex items-center justify-between gap-1.5 min-w-0">
        <div className="flex flex-col xs:flex-row xs:items-baseline gap-0.5 xs:gap-1.5 min-w-0">
          <span className="text-xs sm:text-sm font-bold text-[#1A3326] leading-tight whitespace-nowrap">
            {formatCurrency(product.price)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-[10px] sm:text-[11px] text-slate-400 line-through leading-none whitespace-nowrap">
              {formatCurrency(product.compareAtPrice)}
            </span>
          )}
        </div>

        {/* Quick Add Button with Tap Scale Animation */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={handleQuickAdd}
          aria-label={`Add ${product.title} to bag`}
          className={`h-7 sm:h-8 px-2 sm:px-3 rounded-full flex items-center justify-center gap-1 text-[11px] sm:text-xs font-semibold shadow-sm transition-all cursor-pointer shrink-0 ${
            justAdded
              ? 'bg-[#1A3326] text-[#FBF9F5] hover:bg-[#C26747]'
              : 'bg-[#C26747] hover:bg-[#1A3326] text-white'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="text-[10px] sm:text-[11px] whitespace-nowrap">In Bag</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="text-[10px] sm:text-[11px] whitespace-nowrap">Add</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
