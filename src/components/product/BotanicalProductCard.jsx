import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Check, Heart } from 'lucide-react';
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
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative bg-[#FBF9F5] rounded-2xl p-3 sm:p-4 border border-[#EBE6DC] hover:border-[#1A3326]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      <div>
        {/* Product Art Frame */}
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#EFF4EE] mb-3">
          <Link to={`/product/${product.slug}`} className="block w-full h-full">
            <motion.img
              src={product.images[0]}
              alt={product.title}
              loading="lazy"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="w-full h-full object-cover object-center"
            />
          </Link>

          {/* Understated Editorial Tags */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
            {product.tag ? (
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-medium tracking-wider uppercase bg-[#1A3326]/85 backdrop-blur-sm text-[#FBF9F5]">
                {product.tag}
              </span>
            ) : discount > 0 ? (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-medium tracking-wider uppercase bg-[#C26747] text-white">
                Harvest Special
              </span>
            ) : null}
          </div>

          {/* Minimal Wishlist Button */}
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
            className={`absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
              inWishlist
                ? 'bg-[#C26747] text-white hover:bg-[#1A3326]'
                : 'bg-white/80 text-[#1A3326] hover:bg-white hover:text-[#C26747]'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                inWishlist ? 'fill-white stroke-white' : 'stroke-[1.75]'
              }`}
            />
          </button>
        </div>

        {/* Botanical Details */}
        <div className="space-y-1">
          <span className="text-[9.5px] uppercase font-semibold tracking-widest text-[#7D9678] block">
            {product.categoryName} • {product.size}
          </span>

          <h3 className="font-botanical text-sm sm:text-base font-semibold text-[#1A3326] group-hover:text-[#C26747] transition-colors leading-snug line-clamp-1">
            <Link to={`/product/${product.slug}`}>{product.title}</Link>
          </h3>

          <p className="text-[11px] font-serif italic text-slate-500 line-clamp-1">
            {product.botanicalName}
          </p>
        </div>
      </div>

      {/* Footer Price & Add Button */}
      <div className="mt-3 pt-2.5 border-t border-[#EBE6DC] flex items-center justify-between gap-1.5 min-w-0">
        <div className="flex flex-col xs:flex-row xs:items-baseline gap-0.5 xs:gap-1.5 min-w-0">
          <span className="text-xs sm:text-sm font-semibold text-[#1A3326] leading-tight whitespace-nowrap">
            {formatCurrency(product.price)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-[10px] sm:text-[11px] text-slate-400 line-through leading-none whitespace-nowrap">
              {formatCurrency(product.compareAtPrice)}
            </span>
          )}
        </div>

        {/* Quick Add Button with Clean Minimalist Styling */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={handleQuickAdd}
          aria-label={`Add ${product.title} to bag`}
          className={`h-7 sm:h-8 px-2.5 sm:px-3 rounded-full flex items-center justify-center gap-1 text-[11px] font-medium tracking-wide transition-all cursor-pointer shrink-0 ${
            justAdded
              ? 'bg-[#1A3326] text-[#FBF9F5] hover:bg-[#C26747]'
              : 'bg-[#C26747] hover:bg-[#1A3326] text-white shadow-sm'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-3 h-3 stroke-[2.2]" />
              <span className="text-[10px] sm:text-[11px] whitespace-nowrap">In Bag</span>
            </>
          ) : (
            <>
              <Plus className="w-3 h-3 stroke-[2.2]" />
              <span className="text-[10px] sm:text-[11px] whitespace-nowrap">Add</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
