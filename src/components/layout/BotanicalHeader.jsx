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
  Globe,
  Truck,
  HelpCircle,
  PackageCheck,
  ChevronDown,
} from 'lucide-react';
import { useBotanicalCart } from '../../context/BotanicalCartContext';
import { useBotanicalWishlist } from '../../context/BotanicalWishlistContext';
import { useCurrency } from '../../context/CurrencyContext';
import { STORE_CONFIG, REGIONS } from '../../config/storeConfig';

export default function BotanicalHeader({
  onOpenLiveSearch,
  onOpenTracking,
  onOpenContact,
  onOpenStory,
  onOpenShipping,
}) {
  const { totalItemCount, subtotal, openCartDrawer } = useBotanicalCart();
  const { wishlistCount } = useBotanicalWishlist();
  const { regionId, setRegion, activeRegion, formatRaw } = useCurrency();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCurrencyDropdownOpen(false);
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

  const navLinks = [
    { label: 'All Series', to: '/series' },
    { label: 'Elixirs', to: '/series?category=elixirs' },
    { label: 'Forest Teas', to: '/series?category=teas' },
    { label: 'Balms', to: '/series?category=balms' },
    { label: 'Pure Oils', to: '/series?category=oils' },
    { label: 'Candles', to: '/series?category=candles' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#F4F1EA]/95 backdrop-blur-md border-b border-[#EBE6DC] shadow-xs transition-all">
        {/* Top Micro-Bar for Desktop */}
        <div className="hidden lg:block bg-[#1A3326] text-[#FBF9F5] text-[11px] py-1.5 px-4 font-medium border-b border-[#254736]">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7D9678]" />
              <span className="text-[#DCE4DA]">
                Stockholm (59°N) & Subarctic Lapland (68°N) • Fresh Wildcraft Harvest
              </span>
              <span className="text-[#7D9678]">•</span>
              <button
                type="button"
                onClick={onOpenStory}
                className="text-[#DCE4DA] hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
              >
                Foraging Map & Reserves
              </button>
            </div>

            <div className="flex items-center gap-4 text-[#DCE4DA]">
              <span className="text-emerald-300">
                Free Transit on orders over {formatRaw(activeRegion.freeShippingThreshold)}
              </span>

              <span>•</span>

              <button
                type="button"
                onClick={onOpenTracking}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              >
                <PackageCheck className="w-3.5 h-3.5 text-[#7D9678]" />
                <span>Track Dispatch</span>
              </button>

              <span>•</span>

              <button
                type="button"
                onClick={onOpenContact}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#7D9678]" />
                <span>Client Care</span>
              </button>

              <span>•</span>

              {/* Currency & Region Selector Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <span>{activeRegion.flag}</span>
                  <span className="font-semibold">{activeRegion.currency}</span>
                  <ChevronDown className="w-3 h-3 text-slate-300" />
                </button>

                {currencyDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-44 rounded-2xl bg-[#1A3326] border border-[#2B4E3C] shadow-2xl py-1 z-50 overflow-hidden">
                    {Object.values(REGIONS).map((reg) => (
                      <button
                        key={reg.id}
                        type="button"
                        onClick={() => {
                          setRegion(reg.id);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          reg.id === regionId
                            ? 'bg-[#C26747] text-white font-bold'
                            : 'text-[#DCE4DA] hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{reg.flag}</span>
                          <span>{reg.label}</span>
                        </span>
                        <span className="text-[10px] font-mono opacity-80">{reg.currencySymbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
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

            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1A3326] text-[#FBF9F5] flex items-center justify-center font-botanical font-bold text-base sm:text-lg shadow-xs group-hover:bg-[#C26747] transition-colors shrink-0">
                B
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-botanical text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-[#1A3326] leading-none whitespace-nowrap group-hover:text-[#C26747] transition-colors">
                  {STORE_CONFIG.brandName}
                </span>
                <span className="hidden sm:block text-[8.5px] lg:text-[9px] uppercase tracking-[0.22em] text-[#7D9678] font-semibold leading-none mt-0.5 whitespace-nowrap">
                  Nordic Dispensary & Apothecary
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Minimalist Editorial Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-[11px] font-medium tracking-[0.16em] uppercase text-[#1A3326]">
            {navLinks.map((link) => {
              const isActive =
                link.to === '/'
                  ? location.pathname === '/' && !location.search
                  : location.pathname + location.search === link.to;

              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`relative py-1 transition-colors ${
                    isActive
                      ? 'text-[#1A3326] font-semibold after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px] after:bg-[#1A3326]'
                      : 'text-[#1A3326]/75 hover:text-[#C26747]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Search, Wishlist, Bag, Region Switcher on Mobile */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            {/* Live Search Trigger */}
            <button
              type="button"
              onClick={onOpenLiveSearch}
              aria-label="Search formulations"
              className="flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-full hover:bg-[#EBE6DC]/70 text-[#1A3326] hover:text-[#C26747] transition-all cursor-pointer border border-transparent sm:border-[#EBE6DC]/80 bg-transparent sm:bg-white/60"
              title="Search botanicals (Press Cmd+K or Ctrl+K)"
            >
              <Search className="w-4 h-4 text-[#7D9678]" />
              <span className="hidden md:inline-block text-xs text-slate-500 font-normal">
                Search specimens...
              </span>
              <kbd className="hidden md:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F4F1EA] text-slate-400 border border-[#EBE6DC]">
                /
              </kbd>
            </button>

            {/* Region / Currency Button on Mobile / Tablet */}
            <button
              type="button"
              onClick={() => {
                const next = regionId === 'US' ? 'PK' : 'US';
                setRegion(next);
              }}
              className="lg:hidden p-2 rounded-full hover:bg-[#EBE6DC]/60 text-xs font-semibold flex items-center gap-1 text-[#1A3326]"
              title={`Switch currency to ${regionId === 'US' ? 'PKR' : 'USD'}`}
            >
              <span>{activeRegion.flag}</span>
              <span className="text-[11px] font-bold">{activeRegion.currency}</span>
            </button>

            {/* Wishlist Shortcut */}
            <Link
              to="/wishlist"
              aria-label="Saved Botanicals"
              className="p-2 rounded-full hover:bg-[#EBE6DC]/60 text-[#1A3326] hover:text-[#C26747] transition-colors relative"
              title="Saved Formulations"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] rounded-full bg-[#C26747] text-white text-[9px] font-bold flex items-center justify-center px-0.5 shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Bag Shortcut Trigger (Opens Cart Drawer) */}
            <button
              type="button"
              onClick={openCartDrawer}
              aria-label="View Botanical Bag"
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-[#FBF9F5] hover:bg-[#EFF4EE] border border-[#EBE6DC] text-[#1A3326] transition-all cursor-pointer group shrink-0 shadow-xs"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#1A3326] group-hover:text-[#C26747] transition-colors" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] rounded-full bg-[#C26747] text-white text-[9px] font-bold flex items-center justify-center px-0.5 shadow-xs">
                    {totalItemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left text-xs font-semibold">
                <span className="text-[10px] uppercase font-bold text-[#7D9678] block leading-none">
                  Bag
                </span>
                <span className="text-[#1A3326] font-bold leading-none">
                  {formatRaw(subtotal)}
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              aria-hidden="true"
            />

            <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="w-screen max-w-xs bg-[#FBF9F5] border-r border-[#EBE6DC] shadow-2xl flex flex-col justify-between"
              >
                <div className="p-5 border-b border-[#EBE6DC] flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1A3326] text-white flex items-center justify-center font-botanical font-bold text-sm">
                      B
                    </div>
                    <div>
                      <span className="font-botanical font-bold text-base text-[#1A3326] block leading-none">
                        {STORE_CONFIG.brandName}
                      </span>
                      <span className="text-[9px] text-[#7D9678] uppercase tracking-wider block font-semibold mt-0.5">
                        Stockholm • Tromsø
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Menu Links */}
                <div className="p-5 overflow-y-auto space-y-6">
                  {/* Region Switcher */}
                  <div className="p-3 rounded-2xl bg-white border border-[#EBE6DC] space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Regional Currency & Storefront
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.values(REGIONS).map((reg) => (
                        <button
                          key={reg.id}
                          type="button"
                          onClick={() => setRegion(reg.id)}
                          className={`p-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                            regionId === reg.id
                              ? 'bg-[#1A3326] text-white border-[#1A3326]'
                              : 'bg-[#EFF4EE] text-slate-700 border-[#DCE4DA]'
                          }`}
                        >
                          <span>{reg.flag}</span>
                          <span>{reg.currency}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#7D9678] tracking-widest block mb-2 px-1">
                      Departments
                    </span>
                    {navLinks.map((link) => (
                      <Link
                        key={link.label}
                        to={link.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2.5 rounded-xl font-medium text-sm text-[#1A3326] hover:bg-[#EFF4EE] transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  {/* Quick Utility Links */}
                  <div className="pt-4 border-t border-[#EBE6DC] space-y-1 text-xs">
                    <span className="text-[10px] uppercase font-bold text-[#7D9678] tracking-widest block mb-2 px-1">
                      Dispensary Care
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenTracking();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-slate-700 hover:bg-[#EFF4EE] font-medium flex items-center gap-2 cursor-pointer"
                    >
                      <PackageCheck className="w-4 h-4 text-[#7D9678]" />
                      <span>Track Active Order</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenStory();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-slate-700 hover:bg-[#EFF4EE] font-medium flex items-center gap-2 cursor-pointer"
                    >
                      <Globe className="w-4 h-4 text-[#7D9678]" />
                      <span>Wildcraft Foraging Map</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenShipping();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-slate-700 hover:bg-[#EFF4EE] font-medium flex items-center gap-2 cursor-pointer"
                    >
                      <Truck className="w-4 h-4 text-[#7D9678]" />
                      <span>Shipping Guarantees</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenContact();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-slate-700 hover:bg-[#EFF4EE] font-medium flex items-center gap-2 cursor-pointer"
                    >
                      <HelpCircle className="w-4 h-4 text-[#7D9678]" />
                      <span>Apothecary Inquiries</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-[#EFF4EE] border-t border-[#DCE4DA] text-center text-[10px] text-slate-500">
                  BJÖRK & TALL • Arctic Botanicals AB
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
