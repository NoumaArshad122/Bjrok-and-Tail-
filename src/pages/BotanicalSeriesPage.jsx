import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { BOTANICAL_CATEGORIES } from '../data/categories';
import { BOTANICAL_PRODUCTS } from '../data/botanicalProducts';
import BotanicalProductCard from '../components/product/BotanicalProductCard';

export default function BotanicalSeriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const urlSearchQuery = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    if (urlSearchQuery) {
      setSearchQuery(urlSearchQuery);
    }
  }, [urlSearchQuery]);

  const handleSelectCategory = (slug) => {
    setActiveCategory(slug);
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    if (val.trim()) {
      searchParams.set('search', val.trim());
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  // Filter products by category & live search
  const filteredProducts = useMemo(() => {
    return BOTANICAL_PRODUCTS.filter((product) => {
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = product.title.toLowerCase().includes(q);
        const matchLatin = product.botanicalName.toLowerCase().includes(q);
        const matchDesc = product.shortDescription.toLowerCase().includes(q);
        const matchProvenance = product.provenance.toLowerCase().includes(q);
        if (!matchTitle && !matchLatin && !matchDesc && !matchProvenance) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="pb-28 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      {/* Breadcrumbs */}
      <nav className="pt-4 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Link to="/" className="hover:text-[#1A3326] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[#1A3326] font-semibold">The Botanical Series</span>
        {activeCategory !== 'all' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#C26747] font-semibold capitalize">{activeCategory}</span>
          </>
        )}
      </nav>

      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#EBE6DC]">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#7D9678]">
            Curated Dispensary
          </span>
          <h1 className="font-botanical text-3xl sm:text-5xl font-bold text-[#1A3326] tracking-tight mt-1">
            The Botanical Series
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Explore wildcrafted formulations for deep restoration, calm aromatics, and biological barrier resilience.
          </p>
        </div>

        {/* Live Search Input Field on Laptop */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7D9678]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search birch, chaga, pine..."
            className="w-full pl-10 pr-9 py-2.5 rounded-full bg-[#FBF9F5] border border-[#EBE6DC] text-xs text-[#1A3326] placeholder-slate-400 focus:outline-none focus:border-[#C26747] focus:ring-1 focus:ring-[#C26747]/20 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1A3326] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Chips with Animated Indicator */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {BOTANICAL_CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.slug;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelectCategory(cat.slug)}
              className={`relative px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer select-none ${
                isSelected
                  ? 'text-white'
                  : 'bg-[#FBF9F5] text-[#1A3326] border border-[#EBE6DC] hover:border-[#7D9678]'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeCategoryChip"
                  className="absolute inset-0 rounded-full bg-[#1A3326] shadow-sm"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10">{cat.name} ({cat.count})</span>
            </button>
          );
        })}
      </div>

      {/* Results Count & Reset Controls */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong>{filteredProducts.length}</strong> botanical formulations
        </span>
        {(activeCategory !== 'all' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              handleSelectCategory('all');
              handleSearchChange('');
            }}
            className="text-[#C26747] font-semibold hover:underline cursor-pointer"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* 4-Column Responsive Grid on Laptop */}
      {filteredProducts.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <BotanicalProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 px-4 bg-[#FBF9F5] rounded-3xl border border-dashed border-[#EBE6DC] space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-full bg-[#EFF4EE] text-[#7D9678] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-botanical text-2xl font-bold text-[#1A3326]">
              No Botanicals Found
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              We couldn't locate any items matching your search criteria. Try resetting filters or exploring other wildcraft harvests.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              handleSelectCategory('all');
              handleSearchChange('');
            }}
            className="px-5 py-2.5 rounded-full bg-[#1A3326] text-white text-xs font-semibold hover:bg-[#C26747] transition-colors cursor-pointer"
          >
            Reset Catalog
          </button>
        </div>
      )}
    </div>
  );
}
