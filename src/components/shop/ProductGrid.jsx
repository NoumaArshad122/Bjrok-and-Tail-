import React from 'react';
import ProductCard from '../product/ProductCard';
import { X, SearchX } from 'lucide-react';
import Button from '../ui/Button';

export default function ProductGrid({
  products = [],
  activeFilters = [],
  onRemoveFilter,
  onResetAll,
}) {
  return (
    <div className="space-y-6">
      {/* Active filter chips */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap pb-2 border-b border-slate-100">
          <span className="text-xs text-slate-500 font-medium">Active Filters:</span>
          {activeFilters.map((filter) => (
            <span
              key={filter.id}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200"
            >
              <span>{filter.label}</span>
              <button
                type="button"
                onClick={() => onRemoveFilter(filter.id)}
                className="hover:text-blue-900 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={onResetAll}
            className="text-xs text-[#E53935] hover:underline font-semibold ml-2 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-[#F5F8FC] rounded-3xl border border-dashed border-slate-200 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-200 text-slate-400 flex items-center justify-center mx-auto">
            <SearchX className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#123B72]">No matching products</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find any items matching your selected criteria. Try widening your price range or clearing filters.
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={onResetAll}>
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
