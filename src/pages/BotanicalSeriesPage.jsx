import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, ChevronRight, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { BOTANICAL_CATEGORIES } from '../data/categories';
import { BOTANICAL_PRODUCTS } from '../data/botanicalProducts';
import BotanicalProductCard from '../components/product/BotanicalProductCard';
import { useCurrency } from '../context/CurrencyContext';

export default function BotanicalSeriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const urlSearchQuery = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc' | 'rating'
  const [inStockOnly, setInStockOnly] = useState(false);

  const { activeRegion } = useCurrency();

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

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = BOTANICAL_PRODUCTS.filter((product) => {
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      if (inStockOnly && (!product.stock || product.stock <= 0)) {
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

    // Sorting
    list = [...list].sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      // 'featured'
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    return list;
  }, [activeCategory, searchQuery, inStockOnly, sortBy]);

  return (
    <div className="pb-28 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      {/* ========================================================= */}
      {/* ATMOSPHERIC NORDIC FOREST SERIES HERO BANNER              */}
      {/* ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-[#1A3326]/20 shadow-2xl bg-[#09150D]"
      >
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1920&auto=format&fit=crop&q=85"
            alt="Nordic Evergreen Valley"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07130B]/95 via-[#0D1F13]/85 to-[#07130B]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07130B] via-[#07130B]/40 to-black/30" />
          <div className="absolute -top-20 right-1/4 w-80 h-80 rounded-full bg-[#C26747]/15 blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-6 sm:p-8 lg:p-10 space-y-6">
          {/* Frosted Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-[#E8DCC8] font-medium">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#FBF9F5] font-semibold">The Botanical Series</span>
            {activeCategory !== 'all' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                <span className="text-[#E8C5A8] font-semibold capitalize">{activeCategory}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10.5px] uppercase font-bold tracking-[0.16em] text-[#E8DCC8] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8C5A8] animate-pulse" />
                <span>Curated Dispensary • {activeRegion.label}</span>
              </div>
              <h1 className="font-botanical text-3xl sm:text-5xl lg:text-6xl font-bold text-[#FBF9F5] tracking-tight drop-shadow-sm">
                The Botanical Series
              </h1>
              <p className="text-xs sm:text-sm text-[#DCD4C7] max-w-xl leading-relaxed">
                Explore wildcrafted formulations for cellular hydration, conifer barrier defense, and calm aromatics compounded from Arctic Lapland botanicals.
              </p>
            </div>

            {/* Frosted Glass Live Search Bar */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E8C5A8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search birch, chaga, pine..."
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-xs text-[#FBF9F5] placeholder-[#DCD4C7]/60 focus:outline-none focus:border-[#E8C5A8] focus:bg-white/15 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Provenance Highlights Bar */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none text-[11px] pt-1">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#E8DCC8] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C26747]" />
              <span>100% Wildcrafted In Lapland (68°N)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#E8DCC8] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7D9678]" />
              <span>Miron Violet Biophotonic Glass</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#E8DCC8] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Cold-Chain Transit Dispatched</span>
            </div>
          </div>
        </div>
      </motion.div>

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
                  className="absolute inset-0 rounded-full bg-[#1A3326] shadow-xs"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10">{cat.name} ({cat.count})</span>
            </button>
          );
        })}
      </div>

      {/* Controls Bar: Sort, In Stock Toggle, Results Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 bg-white p-3.5 rounded-2xl border border-[#EBE6DC]">
        <div className="flex items-center gap-4 flex-wrap">
          <span>
            Showing <strong>{filteredProducts.length}</strong> botanical formulations
          </span>

          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded border-[#EBE6DC] text-[#1A3326] focus:ring-0 cursor-pointer"
            />
            <span className="text-[11px] font-medium text-[#1A3326]">In-Stock Only</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#7D9678]" />
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FBF9F5] border border-[#EBE6DC] rounded-lg px-2.5 py-1 text-xs text-[#1A3326] focus:outline-none focus:border-[#C26747] font-medium cursor-pointer"
            >
              <option value="featured">Featured Harvests</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {(activeCategory !== 'all' || searchQuery || inStockOnly || sortBy !== 'featured') && (
            <button
              type="button"
              onClick={() => {
                handleSelectCategory('all');
                handleSearchChange('');
                setInStockOnly(false);
                setSortBy('featured');
              }}
              className="text-[#C26747] font-semibold hover:underline cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* 4-Column Responsive Grid */}
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
              We couldn't locate any items matching your active filters. Try clearing your query or checking other series.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              handleSelectCategory('all');
              handleSearchChange('');
              setInStockOnly(false);
              setSortBy('featured');
            }}
            className="px-5 py-2.5 rounded-full bg-[#1A3326] text-white text-xs font-semibold hover:bg-[#C26747] transition-colors cursor-pointer"
          >
            Reset Catalog Filters
          </button>
        </div>
      )}
    </div>
  );
}
