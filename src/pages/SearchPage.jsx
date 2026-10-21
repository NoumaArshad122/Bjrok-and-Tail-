import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { Search, ChevronRight, SearchX } from 'lucide-react';
import Button from '../components/ui/Button';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const matchedProducts = useMemo(() => {
    if (!query.trim()) return PRODUCTS;
    const lower = query.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      const matchTitle = p.title.toLowerCase().includes(lower);
      const matchDesc = p.description.toLowerCase().includes(lower);
      const matchCat = p.categoryName && p.categoryName.toLowerCase().includes(lower);
      const matchTags = p.tags && p.tags.some((t) => t.toLowerCase().includes(lower));
      return matchTitle || matchDesc || matchCat || matchTags;
    });
  }, [query]);

  return (
    <div className="py-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#2563EB] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">Search Results</span>
        </nav>

        {/* Heading */}
        <div className="pb-4 border-b border-slate-100">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B72]">
            Search Results for <span className="text-[#2563EB]">"{query}"</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Found {matchedProducts.length} matching items
          </p>
        </div>

        {/* Results */}
        {matchedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {matchedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 max-w-md mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <SearchX className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-[#123B72]">No Results Found</h2>
            <p className="text-xs text-slate-500">
              We couldn't find any items matching "{query}". Try searching for broader terms like "audio", "desk", or "smartwatch".
            </p>
            <Link to="/shop">
              <Button variant="primary">Browse All Products</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
