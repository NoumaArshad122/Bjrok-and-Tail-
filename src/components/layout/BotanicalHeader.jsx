import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronLeft,
  ShoppingBag,
  Heart,
  Search,
  Sparkles,
  ArrowRight,
  Leaf,
} from 'lucide-react';
import { useBotanicalCart } from '../../context/BotanicalCartContext';
import { useBotanicalWishlist } from '../../context/BotanicalWishlistContext';
import { STORE_CONFIG } from '../../config/storeConfig';
import { formatCurrency } from '../../lib/formatCurrency';

export default function BotanicalHeader() {
  const { totalItemCount, subtotal } = useBotanicalCart();
  const { wishlistCount } = useBotanicalWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  // Close mobile menu and search on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/series?search=${encodeURIComponent(searchInput.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
      setSearchInput('');
    }
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'All Series', to: '/series' },
    { label: 'Elixirs', to: '/series?category=elixirs' },
    { label: 'Forest Teas', to: '/series?category=teas' },
    { label: 'Botanical Balms', to: '/series?category=balms' },
    { label: 'Pure Oils', to: '/series?category=oils' },
    { label: 'Candles', to: '/series?category=candles' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#F4F1EA]/95 backdrop-blur-md border-b border-[#EBE6DC] shadow-sm transition-all">
        {/* Top micro-bar for desktop */}
        <div className="hidden lg:block bg-[#1A3326] text-[#FBF9F5] text-[11px] py-1.5 px-4 font-medium border-b border-[#254736]">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7D9678] animate-ping" />
              <span className="text-[#DCE4DA]">
                Arctic Harvest 2026 • Wildcrafted in Swedish Lapland (68°N)
              </span>
            </div>
            <div className="flex items-center gap-4 text-[#DCE4DA]">
              <span>
                Free Nordic Transit on orders over {formatCurrency(STORE_CONFIG.freeShippingThreshold)}
              </span>
              <span>•</span>
              <span className="text-white font-semibold">Tromsø & Stockholm Dispensary</span>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Mobile Menu Trigger + Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 -ml-1 rounded-full hover:bg-[#EBE6DC]/70 text-[#1A3326] transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Back Button for internal subpages on mobile if not home */}
            {!isHome && (
              <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label="Go back"
                className="lg:hidden p-1.5 rounded-full hover:bg-[#EBE6DC]/70 text-[#1A3326] transition-colors cursor-pointer"
                title="Back"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Responsive Brand Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1A3326] text-[#FBF9F5] flex items-center justify-center font-botanical font-bold text-base sm:text-lg shadow-sm group-hover:bg-[#C26747] transition-colors shrink-0">
                B
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-botanical text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-[#1A3326] leading-none whitespace-nowrap group-hover:text-[#C26747] transition-colors">
                  {STORE_CONFIG.brandName}
                </span>
                <span className="hidden sm:block text-[8.5px] lg:text-[9px] uppercase tracking-[0.22em] text-[#7D9678] font-semibold leading-none mt-0.5 whitespace-nowrap">
                  Nordic Botanical Luxury
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-[#1A3326]">
            {navLinks.map((link) => {
              const isActive =
                link.to === '/'
                  ? location.pathname === '/' && !location.search
                  : location.pathname + location.search === link.to;

              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`px-3 py-2 rounded-full transition-all ${
                    isActive
                      ? 'bg-[#1A3326] text-[#FBF9F5] shadow-sm hover:bg-[#C26747]'
                      : 'text-[#1A3326]/80 hover:text-[#C26747] hover:bg-[#EBE6DC]/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Search, Wishlist, Bag */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            {/* Desktop Search Field Trigger */}
            <div className="relative hidden sm:block">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    autoFocus
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search botanical..."
                    className="w-44 sm:w-56 px-3.5 py-1.5 text-xs bg-white border border-[#EBE6DC] rounded-full text-[#1A3326] focus:outline-none focus:border-[#C26747] shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-[#1A3326] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Open search"
                  className="p-2 rounded-full hover:bg-[#EBE6DC]/60 text-[#1A3326] hover:text-[#C26747] transition-colors cursor-pointer"
                  title="Search botanicals"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile Search Icon (Toggles Mobile Search Bar) */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Toggle search"
              className="sm:hidden p-2 rounded-full hover:bg-[#EBE6DC]/60 text-[#1A3326] hover:text-[#C26747] transition-colors cursor-pointer"
            >
              {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </button>

            {/* Wishlist Shortcut */}
            <Link
              to="/wishlist"
              aria-label="Saved Botanicals"
              className="p-2 rounded-full hover:bg-[#EBE6DC]/60 text-[#1A3326] hover:text-[#C26747] transition-colors relative"
              title="Saved Botanicals"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] rounded-full bg-[#C26747] text-white text-[9px] font-bold flex items-center justify-center px-0.5 shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Bag Shortcut with Desktop Subtotal Preview */}
            <Link
              to="/bag"
              aria-label="View Botanical Bag"
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-[#FBF9F5] hover:bg-[#EFF4EE] border border-[#EBE6DC] text-[#1A3326] transition-all cursor-pointer group shrink-0"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#1A3326] group-hover:text-[#C26747] transition-colors" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] rounded-full bg-[#C26747] text-white text-[9px] font-bold flex items-center justify-center px-0.5 shadow-sm">
                    {totalItemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left text-xs font-semibold">
                <span className="text-[10px] uppercase font-bold text-[#7D9678] block leading-none">
                  Bag
                </span>
                <span className="text-[#1A3326] font-bold leading-none">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Search Dropdown Bar (when search is toggled on mobile) */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="sm:hidden border-t border-[#EBE6DC] bg-[#FBF9F5] px-4 py-2.5 overflow-hidden"
            >
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7D9678]" />
                  <input
                    type="text"
                    autoFocus
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search birch, chaga, resin..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#EBE6DC] rounded-full text-[#1A3326] focus:outline-none focus:border-[#C26747]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
                >
                  Search
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Slide-Over Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-4/5 max-w-sm bg-[#FBF9F5] border-r border-[#EBE6DC] shadow-2xl z-10 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Drawer Header */}
                <div className="p-5 border-b border-[#EBE6DC] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#1A3326] text-[#FBF9F5] flex items-center justify-center font-botanical font-bold text-base shadow-sm">
                      B
                    </div>
                    <div>
                      <span className="font-botanical text-xl font-bold tracking-tight text-[#1A3326] block leading-none">
                        {STORE_CONFIG.brandName}
                      </span>
                      <span className="text-[8.5px] uppercase tracking-[0.2em] text-[#7D9678] block font-semibold mt-0.5">
                        Nordic Botanical Luxury
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="p-1.5 rounded-full hover:bg-[#EBE6DC] text-slate-500 hover:text-[#1A3326] transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Quick Search */}
                <div className="p-4 border-b border-[#EBE6DC]">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7D9678]" />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Search botanicals & elixirs..."
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#EBE6DC] rounded-full text-[#1A3326] focus:outline-none focus:border-[#C26747]"
                    />
                  </form>
                </div>

                {/* Drawer Navigation Links */}
                <div className="p-4 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#7D9678] px-3 block mb-2">
                    Dispensary Collections
                  </span>
                  {navLinks.map((link) => {
                    const isActive =
                      link.to === '/'
                        ? location.pathname === '/' && !location.search
                        : location.pathname + location.search === link.to;

                    return (
                      <Link
                        key={link.label}
                        to={link.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-[#1A3326] text-white shadow-sm'
                            : 'text-[#1A3326] hover:bg-[#EFF4EE] hover:text-[#C26747]'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer Information */}
              <div className="p-5 border-t border-[#EBE6DC] bg-[#EFF4EE]/60 space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-medium">Arctic Harvest 2026</span>
                  <span className="font-semibold text-[#7D9678]">Swedish Lapland</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-medium">Free Nordic Transit</span>
                  <span className="font-semibold text-[#1A3326]">Over $75</span>
                </div>
                <div className="pt-2">
                  <Link
                    to="/series"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Explore Dispensary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
