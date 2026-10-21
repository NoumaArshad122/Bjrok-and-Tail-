import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  ChevronDown,
  Sparkles,
  User,
  Shield,
  Zap,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import { formatCurrency } from '../../lib/formatCurrency';

export default function Header() {
  const { totalCount, subtotal, openDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const megaMenuRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Scroll listener for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2.5'
          : 'bg-white border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile navigation menu"
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-[#2563EB] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#123B72] via-[#2563EB] to-blue-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-600/25 group-hover:scale-105 transition-transform">
              A
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-[#123B72] block leading-none">
                AURA
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#2563EB]">
                STOREFRONT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-slate-700 relative">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg hover:text-[#2563EB] hover:bg-[#F5F8FC] transition-colors ${
                location.pathname === '/' ? 'text-[#2563EB] font-semibold' : ''
              }`}
            >
              Home
            </Link>

            {/* Mega Menu Toggle */}
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg hover:text-[#2563EB] hover:bg-[#F5F8FC] transition-colors cursor-pointer ${
                  isMegaMenuOpen ? 'text-[#2563EB] bg-[#F5F8FC]' : ''
                }`}
              >
                <span>Categories</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isMegaMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isMegaMenuOpen && (
                <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />
              )}
            </div>

            <Link
              to="/shop"
              className={`px-3 py-2 rounded-lg hover:text-[#2563EB] hover:bg-[#F5F8FC] transition-colors ${
                location.pathname === '/shop' ? 'text-[#2563EB] font-semibold' : ''
              }`}
            >
              Shop All
            </Link>

            <Link
              to="/shop?tag=sale"
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-[#E53935] font-semibold hover:bg-red-50 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flash Deals</span>
            </Link>
          </nav>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-md mx-2 sm:mx-4 hidden md:block"
          >
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#2563EB] transition-colors" />
              <input
                id="header-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search headphones, desk bars, backpacks..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F5F8FC] border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </form>

          {/* Action Icons: Wishlist & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              aria-label="View Wishlist"
              className="relative p-2.5 rounded-xl text-slate-700 hover:text-[#E53935] hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E53935] text-white text-[11px] font-bold flex items-center justify-center shadow-sm animate-in zoom-in duration-200">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              id="header-cart-btn"
              type="button"
              onClick={openDrawer}
              aria-label="Open Shopping Cart"
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F5F8FC] hover:bg-blue-50 border border-slate-200/80 text-slate-800 transition-all cursor-pointer group hover:border-blue-200"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#2563EB] group-hover:scale-110 transition-transform" />
                {totalCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#E53935] text-white text-[10px] font-bold flex items-center justify-center shadow-sm animate-in zoom-in">
                    {totalCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 leading-tight">
                  Cart
                </span>
                <span className="text-xs font-extrabold text-[#123B72]">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Input Bar */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, or deals..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F5F8FC] border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        wishlistCount={wishlistCount}
      />
    </header>
  );
}
