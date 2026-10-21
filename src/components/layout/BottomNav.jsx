import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { useBotanicalCart } from '../../context/BotanicalCartContext';
import { useBotanicalWishlist } from '../../context/BotanicalWishlistContext';

export default function BottomNav() {
  const { totalItemCount, badgeBump } = useBotanicalCart();
  const { wishlistCount } = useBotanicalWishlist();
  const location = useLocation();

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      to: '/',
      icon: Home,
    },
    {
      id: 'series',
      label: 'Series',
      to: '/series',
      icon: Sparkles,
    },
    {
      id: 'saved',
      label: 'Saved',
      to: '/wishlist',
      icon: Heart,
      badge: wishlistCount > 0 ? wishlistCount : null,
    },
    {
      id: 'bag',
      label: 'Your Bag',
      to: '/bag',
      icon: ShoppingBag,
      badge: totalItemCount > 0 ? totalItemCount : null,
      isBag: true,
    },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-5 inset-x-0 z-40 flex justify-center pointer-events-none px-4"
    >
      <div className="pointer-events-auto relative flex items-center gap-1 p-1.5 rounded-full bg-[#1A3326]/95 backdrop-blur-xl border border-[#2B4E3C]/80 shadow-2xl shadow-[#12241B]/35">
        {tabs.map((tab) => {
          const isActive =
            tab.to === '/'
              ? location.pathname === '/' && !location.search
              : location.pathname.startsWith(tab.to);

          const Icon = tab.icon;

          return (
            <NavLink
              key={tab.id}
              to={tab.to}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium transition-colors select-none cursor-pointer ${
                isActive
                  ? 'text-[#FBF9F5] font-semibold'
                  : 'text-[#DCE4DA]/70 hover:text-white'
              }`}
            >
              {/* Sliding Pill Background for Active Tab */}
              {isActive && (
                <motion.div
                  layoutId="activeBottomTabPill"
                  className="absolute inset-0 rounded-full bg-[#C26747] shadow-md shadow-[#C26747]/30"
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 34,
                  }}
                />
              )}

              {/* Icon & Live Badge */}
              <div className="relative z-10 flex items-center justify-center">
                <Icon className="w-4 h-4 stroke-[2]" />

                {/* Badge Bump Animation for Bag */}
                {tab.isBag && tab.badge && (
                  <motion.span
                    animate={badgeBump ? { scale: [1, 1.45, 1] } : { scale: 1 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] rounded-full bg-[#FBF9F5] text-[#1A3326] text-[10px] font-black flex items-center justify-center px-1 shadow-sm"
                  >
                    {tab.badge}
                  </motion.span>
                )}

                {!tab.isBag && tab.badge && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-[16px] rounded-full bg-[#C26747] text-white text-[9px] font-bold flex items-center justify-center px-1">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className="relative z-10 hidden sm:inline-block">
                {tab.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
