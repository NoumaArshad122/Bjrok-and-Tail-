import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, X, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const OFFERS = [
  { text: 'FLASH SALE: Save up to 40% on wireless studio audio & desk gear!', code: 'AUDIO40', link: '/shop?category=audio' },
  { text: 'Free express worldwide shipping on all orders over $150', code: 'FREESHIP', link: '/shop' },
  { text: 'Extra 10% off your first checkout with promo code SAVE10', code: 'SAVE10', link: '/shop' },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % OFFERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  const current = OFFERS[index];

  return (
    <div className="bg-[#123B72] text-white text-xs py-2 px-4 relative z-40 border-b border-blue-900/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Urgent Sale Tag */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="bg-[#E53935] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider flex items-center gap-1 shadow-sm">
            <Sparkles className="w-2.5 h-2.5" />
            Limited Offer
          </span>
          <span className="font-medium text-slate-100 hidden sm:inline transition-opacity duration-300">
            {current.text}
          </span>
          <span className="font-medium text-slate-100 sm:hidden">
            {current.text.slice(0, 48)}...
          </span>
          <Link
            to={current.link}
            className="text-blue-200 hover:text-white font-semibold underline underline-offset-2 flex items-center gap-0.5 ml-1 transition-colors"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Promo code badge + Close button */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full text-[11px] text-blue-100">
            <span>Use Code:</span>
            <span className="font-bold text-white tracking-wider">{current.code}</span>
          </div>
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Dismiss banner"
            className="text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
