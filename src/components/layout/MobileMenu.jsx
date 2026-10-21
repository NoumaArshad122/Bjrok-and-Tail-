import React from 'react';
import { Link } from 'react-router-dom';
import { X, Search, Sparkles, ChevronRight, Heart, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export default function MobileMenu({ isOpen, onClose, wishlistCount }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
              A
            </span>
            <span className="text-xl font-bold tracking-tight text-[#123B72]">
              AURA
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-2">
              Navigation
            </span>
            <div className="space-y-1">
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-[#F5F8FC] hover:text-[#2563EB]"
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                to="/shop"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-[#F5F8FC] hover:text-[#2563EB]"
              >
                <span>All Products</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                to="/shop?tag=sale"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-[#E53935] hover:bg-red-50"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Flash Deals
                </span>
                <span className="text-[10px] bg-[#E53935] text-white font-bold px-2 py-0.5 rounded-full">
                  HOT
                </span>
              </Link>
              <Link
                to="/wishlist"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-[#F5F8FC]"
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  Wishlist
                </span>
                {wishlistCount > 0 && (
                  <span className="text-xs bg-rose-100 text-rose-600 font-bold px-2 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-2">
              Product Categories
            </span>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-[#F5F8FC] hover:text-[#2563EB]"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-7 h-7 rounded-md object-cover"
                  />
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="p-4 border-t border-slate-100 bg-[#F5F8FC]">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>30-Day Risk-Free Returns Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}
