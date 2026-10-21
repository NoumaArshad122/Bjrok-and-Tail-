import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import SaleBadge from './SaleBadge';
import Price from './Price';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const defaultVariant = product.variants && product.variants.length > 0 ? product.variants[0] : null;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, defaultVariant, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Badges Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <SaleBadge price={product.price} compareAtPrice={product.compareAtPrice} />
          {product.tags && product.tags.includes('bestseller') && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#123B72] text-white">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button Top Right */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md backdrop-blur-md transition-all duration-200 z-10 cursor-pointer ${
            inWishlist
              ? 'bg-rose-50 text-rose-500 hover:bg-rose-100 ring-1 ring-rose-200'
              : 'bg-white/90 text-slate-500 hover:text-rose-500 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500 stroke-rose-500' : ''}`} />
        </button>

        {/* Quick Add Overlay Button at Bottom of Image */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className="w-full py-2.5 px-3 rounded-xl bg-white/95 hover:bg-[#2563EB] text-slate-800 hover:text-white font-semibold text-xs shadow-lg backdrop-blur-md flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer border border-slate-200/60"
          >
            {isAdding ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Added to Cart!</span>
              </>
            ) : product.stock <= 0 ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-medium text-slate-400 uppercase tracking-wider text-[10px]">
              {product.categoryName || product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span className="font-bold text-slate-700 text-[11px]">{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-sm text-[#123B72] hover:text-[#2563EB] transition-colors line-clamp-1 mb-2">
            <Link to={`/product/${product.slug}`}>
              {product.title}
            </Link>
          </h3>

          {/* Color Variants Previews */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex items-center gap-1 mb-3">
              {product.variants.map((v) => (
                <span
                  key={v.id}
                  title={v.name}
                  className="w-3 h-3 rounded-full border border-slate-300 ring-1 ring-white"
                  style={{ backgroundColor: v.color }}
                />
              ))}
              <span className="text-[10px] text-slate-400 ml-1">
                {product.variants.length} colors
              </span>
            </div>
          )}
        </div>

        {/* Bottom Price & Stock State */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <Price price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
          {product.stock <= 5 && product.stock > 0 && (
            <span className="text-[10px] font-semibold text-[#E53935]">
              Only {product.stock} left
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
