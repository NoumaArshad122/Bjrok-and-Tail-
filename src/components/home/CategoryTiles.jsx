import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { ArrowRight, Layers } from 'lucide-react';

export default function CategoryTiles() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Curated Departments</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B72]">
              Explore by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1d4ed8] group"
          >
            <span>View All Departments</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Grid of category tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 flex flex-col justify-end p-4 border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Background Image with Zoom */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

              {/* Content overlay */}
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] font-semibold text-blue-300 tracking-wider uppercase">
                  {cat.itemCount} items
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-blue-200 transition-colors">
                  {cat.name}
                </h3>
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-200 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                  <span>Browse catalog</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
