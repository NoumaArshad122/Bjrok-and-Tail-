import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function MegaMenu({ onClose }) {
  return (
    <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl py-8 px-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Categories List */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.slug}`}
              onClick={onClose}
              className="group p-3 rounded-xl hover:bg-[#F5F8FC] transition-all flex items-start gap-3 border border-transparent hover:border-slate-200/60"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-14 h-14 object-cover rounded-lg shrink-0 group-hover:scale-105 transition-transform"
              />
              <div>
                <h4 className="text-sm font-semibold text-[#123B72] group-hover:text-[#2563EB] transition-colors">
                  {cat.name}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                  {cat.description}
                </p>
                <span className="text-[11px] font-medium text-blue-600 mt-1 inline-block">
                  {cat.itemCount}+ Products
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Collection Highlight */}
        <div className="rounded-2xl overflow-hidden relative bg-gradient-to-br from-[#123B72] to-[#1e3a8a] text-white p-6 flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/20 text-white mb-3">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Flagship Collection
            </span>
            <h3 className="text-lg font-bold mb-1 text-white">Audiophile Acoustics</h3>
            <p className="text-xs text-blue-100 leading-relaxed mb-4">
              Explore lossless wireless monitors with hybrid noise-cancelling and 45h playback.
            </p>
          </div>
          <Link
            to="/shop?category=audio"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-white/20 hover:bg-white/30 px-3.5 py-2 rounded-xl transition-all self-start"
          >
            <span>Explore Audio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Hot Deal Promo Card */}
        <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6 flex flex-col justify-between">
          <div>
            <span className="inline-block bg-[#E53935] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3">
              Flash Deal • Save 25%
            </span>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Titanium Chrono Ultra
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Multi-band GNSS tracking with 14-day endurance and sapphire crystal display.
            </p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-lg font-extrabold text-[#E53935]">$349.00</span>
              <span className="text-xs text-slate-400 line-through">$449.00</span>
            </div>
          </div>
          <Link
            to="/product/horizon-chrono-smartwatch-ultra"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-[#E53935] hover:bg-red-700 px-4 py-2 rounded-xl transition-all shadow-sm shadow-red-500/20"
          >
            <span>Shop Deal</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
