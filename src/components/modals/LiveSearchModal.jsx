import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { BOTANICAL_PRODUCTS } from '../../data/botanicalProducts';
import { useCurrency } from '../../context/CurrencyContext';
import { useBotanicalCart } from '../../context/BotanicalCartContext';

export default function LiveSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { addToBag } = useBotanicalCart();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return BOTANICAL_PRODUCTS.filter((product) => {
      return (
        product.title.toLowerCase().includes(q) ||
        product.botanicalName.toLowerCase().includes(q) ||
        product.categoryName.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q) ||
        product.provenance.toLowerCase().includes(q)
      );
    }).slice(0, 6);
  }, [query]);

  const handleSelectProduct = (slug) => {
    navigate(`/product/${slug}`);
    onClose();
  };

  const handleViewAllResults = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/series?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div
          className="fixed inset-0"
          onClick={onClose}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-3xl border border-[#EBE6DC] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[82vh]"
        >
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-[#EBE6DC] flex items-center gap-3 bg-white">
            <Search className="w-5 h-5 text-[#7D9678] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search formulations, botanical species (chaga, cloudberry, pine)..."
              className="flex-1 bg-transparent text-sm sm:text-base text-[#1A3326] placeholder-slate-400 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-slate-400 hover:text-[#1A3326] hover:bg-[#EFF4EE] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#EFF4EE] text-slate-600 hover:text-[#1A3326] transition-colors cursor-pointer"
            >
              ESC
            </button>
          </div>

          {/* Quick Categories Bar when empty */}
          {!query.trim() && (
            <div className="p-6 space-y-4 overflow-y-auto">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#7D9678] block">
                Popular Dispensary Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Chaga Elixir',
                  'Cloudberry Balm',
                  'Sea Buckthorn Oil',
                  'Scots Pine Tea',
                  'Arctic Birch',
                  'Smoked Cedar Candle',
                ].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-full text-xs bg-white hover:bg-[#1A3326] text-[#1A3326] hover:text-white border border-[#EBE6DC] transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-[#EBE6DC]/70">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#7D9678] block mb-3">
                  Browse by Department
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { label: 'Elixirs', slug: 'elixirs' },
                    { label: 'Forest Teas', slug: 'teas' },
                    { label: 'Botanical Balms', slug: 'balms' },
                    { label: 'Pure Oils', slug: 'oils' },
                  ].map((dept) => (
                    <button
                      key={dept.slug}
                      type="button"
                      onClick={() => {
                        navigate(`/series?category=${dept.slug}`);
                        onClose();
                      }}
                      className="p-2.5 rounded-xl bg-white hover:bg-[#EFF4EE] border border-[#EBE6DC] text-left font-medium text-[#1A3326] transition-colors cursor-pointer"
                    >
                      {dept.label} →
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results List */}
          {query.trim() && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2">
              <div className="flex items-center justify-between pb-2 text-xs text-slate-500 font-medium border-b border-[#EBE6DC]">
                <span>Matching Formulations ({results.length})</span>
                {results.length > 0 && (
                  <button
                    type="button"
                    onClick={handleViewAllResults}
                    className="text-[#C26747] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all on Series page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {results.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <p className="text-sm font-semibold text-[#1A3326]">
                    No botanical specimens matched "{query}"
                  </p>
                  <p className="text-xs text-slate-500">
                    Try searching for chaga, cloudberry, pine, birch, or elixir.
                  </p>
                </div>
              ) : (
                results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.slug)}
                    className="p-3 rounded-2xl bg-white hover:bg-[#EFF4EE] border border-[#EBE6DC] transition-all flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={product.images[0]}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover border border-[#EBE6DC] shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] uppercase font-bold tracking-widest text-[#7D9678]">
                            {product.categoryName}
                          </span>
                          {product.tag && (
                            <span className="px-1.5 py-0.2 rounded text-[8px] font-semibold bg-[#C26747]/10 text-[#C26747]">
                              {product.tag}
                            </span>
                          )}
                        </div>
                        <h4 className="font-botanical text-sm font-bold text-[#1A3326] group-hover:text-[#C26747] transition-colors truncate">
                          {product.title}
                        </h4>
                        <p className="text-[11px] font-serif italic text-slate-500 truncate">
                          {product.botanicalName}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-[#1A3326] block">
                        {formatPrice(product.price)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToBag(product, 1);
                        }}
                        className="mt-1 px-3 py-1 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white text-[10px] font-semibold transition-colors cursor-pointer"
                      >
                        Quick Add
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Bottom Bar */}
          <div className="p-3 bg-[#EFF4EE] border-t border-[#DCE4DA] flex items-center justify-between text-[11px] text-slate-500 px-5">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#DCE4DA] font-mono text-[10px]">ESC</kbd> to exit</span>
            <span>Stockholm • Tromsø Dispensary Archive</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
