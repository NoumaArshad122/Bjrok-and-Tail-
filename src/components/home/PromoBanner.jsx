import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag } from 'lucide-react';
import { PROMO_BANNERS } from '../../data/banners';

export default function PromoBanner() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROMO_BANNERS.map((banner) => (
            <div
              key={banner.id}
              className={`relative rounded-3xl overflow-hidden p-8 flex flex-col justify-between min-h-[260px] shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-200/80 ${
                banner.theme === 'blue'
                  ? 'bg-gradient-to-br from-[#123B72] to-[#1e40af] text-white'
                  : 'bg-gradient-to-br from-slate-900 to-slate-800 text-white'
              }`}
            >
              {/* Background accent image with blend */}
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute right-0 top-0 w-2/3 h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />

              <div className="relative z-10 max-w-sm space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md">
                  <Tag className="w-3 h-3 text-amber-300" />
                  <span>Promo Code: {banner.code}</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  {banner.title}
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {banner.subtitle}
                </p>
              </div>

              <div className="relative z-10 pt-4">
                <Link
                  to={banner.link}
                  className="inline-flex items-center gap-2 text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 px-4 py-2.5 rounded-xl transition-all shadow-md"
                >
                  <span>Claim Offer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
