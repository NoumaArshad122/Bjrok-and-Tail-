import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { Filter, RotateCcw, Star, Check } from 'lucide-react';

export default function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  priceRange,
  onChangePriceRange,
  selectedRating,
  onSelectRating,
  inStockOnly,
  onToggleInStockOnly,
  onResetFilters,
}) {
  return (
    <aside className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 text-sm font-bold text-[#123B72]">
          <Filter className="w-4 h-4 text-[#2563EB]" />
          <span>Filter Products</span>
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          className="flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:text-[#1d4ed8] cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Category
        </h4>
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
              selectedCategory === 'all'
                ? 'bg-blue-50 text-[#2563EB] font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>All Categories</span>
            {selectedCategory === 'all' && <Check className="w-3.5 h-3.5 text-[#2563EB]" />}
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-50 text-[#2563EB] font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] text-slate-400">({cat.itemCount})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Max Price
          </h4>
          <span className="text-xs font-extrabold text-[#123B72]">
            ${priceRange}
          </span>
        </div>
        <input
          type="range"
          min="30"
          max="500"
          step="10"
          value={priceRange}
          onChange={(e) => onChangePriceRange(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>$30</span>
          <span>$250</span>
          <span>$500</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Rating
        </h4>
        <div className="space-y-1">
          {[
            { val: 0, label: 'All Ratings' },
            { val: 4.8, label: '4.8 Stars & Up' },
            { val: 4.5, label: '4.5 Stars & Up' },
            { val: 4.0, label: '4.0 Stars & Up' },
          ].map((r) => (
            <button
              key={r.val}
              type="button"
              onClick={() => onSelectRating(r.val)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                selectedRating === r.val
                  ? 'bg-blue-50 text-[#2563EB] font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {r.val > 0 && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                <span>{r.label}</span>
              </div>
              {selectedRating === r.val && <Check className="w-3 h-3 text-[#2563EB]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Availability Checkbox */}
      <div className="pt-2 border-t border-slate-200">
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onToggleInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded text-[#2563EB] focus:ring-[#2563EB] border-slate-300"
          />
          <span>In Stock Items Only</span>
        </label>
      </div>
    </aside>
  );
}
