import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import FilterSidebar from '../components/shop/FilterSidebar';
import SortSelect from '../components/shop/SortSelect';
import ProductGrid from '../components/shop/ProductGrid';
import { ChevronRight, Filter, X } from 'lucide-react';
import Button from '../components/ui/Button';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query sync
  const categoryParam = searchParams.get('category') || 'all';
  const tagParam = searchParams.get('tag') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState(500);
  const [selectedRating, setSelectedRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const handleSelectCategory = (catSlug) => {
    setSelectedCategory(catSlug);
    if (catSlug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catSlug);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setPriceRange(500);
    setSelectedRating(0);
    setInStockOnly(false);
    setSortBy('featured');
    searchParams.delete('category');
    searchParams.delete('tag');
    setSearchParams(searchParams);
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Tag filter
      if (tagParam && (!product.tags || !product.tags.includes(tagParam))) {
        return false;
      }
      // Price range
      if (product.price > priceRange) {
        return false;
      }
      // Rating filter
      if (selectedRating > 0 && product.rating < selectedRating) {
        return false;
      }
      // Stock filter
      if (inStockOnly && product.stock <= 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') {
        const discA = a.compareAtPrice ? a.compareAtPrice - a.price : 0;
        const discB = b.compareAtPrice ? b.compareAtPrice - b.price : 0;
        return discB - discA;
      }
      return 0; // featured default
    });
  }, [selectedCategory, tagParam, priceRange, selectedRating, inStockOnly, sortBy]);

  // Compute active filters
  const activeFilters = useMemo(() => {
    const list = [];
    if (selectedCategory !== 'all') {
      const catObj = CATEGORIES.find((c) => c.slug === selectedCategory);
      list.push({ id: 'category', label: `Category: ${catObj ? catObj.name : selectedCategory}` });
    }
    if (tagParam) {
      list.push({ id: 'tag', label: `Tag: ${tagParam}` });
    }
    if (priceRange < 500) {
      list.push({ id: 'price', label: `Under $${priceRange}` });
    }
    if (selectedRating > 0) {
      list.push({ id: 'rating', label: `${selectedRating}★ & Up` });
    }
    if (inStockOnly) {
      list.push({ id: 'stock', label: 'In Stock Only' });
    }
    return list;
  }, [selectedCategory, tagParam, priceRange, selectedRating, inStockOnly]);

  const handleRemoveFilter = (filterId) => {
    if (filterId === 'category') handleSelectCategory('all');
    if (filterId === 'tag') {
      searchParams.delete('tag');
      setSearchParams(searchParams);
    }
    if (filterId === 'price') setPriceRange(500);
    if (filterId === 'rating') setSelectedRating(0);
    if (filterId === 'stock') setInStockOnly(false);
  };

  const currentCategoryObj = CATEGORIES.find((c) => c.slug === selectedCategory);
  const pageTitle = tagParam === 'sale'
    ? 'Flash Sale & Limited Offers'
    : currentCategoryObj
    ? currentCategoryObj.name
    : 'All Products';

  return (
    <div className="py-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#2563EB] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">{pageTitle}</span>
        </nav>

        {/* Page Heading & Mobile Filter trigger */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#123B72]">
              {pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing {filteredProducts.length} premium lifestyle & tech items
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            {/* Mobile filter button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <Filter className="w-4 h-4 text-[#2563EB]" />
              <span>Filters ({activeFilters.length})</span>
            </button>

            {/* Sort Select */}
            <SortSelect value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {/* Main Content Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block sticky top-24 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <FilterSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              priceRange={priceRange}
              onChangePriceRange={setPriceRange}
              selectedRating={selectedRating}
              onSelectRating={setSelectedRating}
              inStockOnly={inStockOnly}
              onToggleInStockOnly={setInStockOnly}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            <ProductGrid
              products={filteredProducts}
              activeFilters={activeFilters}
              onRemoveFilter={handleRemoveFilter}
              onResetAll={handleResetFilters}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="font-bold text-[#123B72]">Filters</h3>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                handleSelectCategory(cat);
                setIsMobileFilterOpen(false);
              }}
              priceRange={priceRange}
              onChangePriceRange={setPriceRange}
              selectedRating={selectedRating}
              onSelectRating={setSelectedRating}
              inStockOnly={inStockOnly}
              onToggleInStockOnly={setInStockOnly}
              onResetFilters={handleResetFilters}
            />
            <div className="mt-6 pt-4 border-t border-slate-200">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                Apply Filters ({filteredProducts.length} items)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
