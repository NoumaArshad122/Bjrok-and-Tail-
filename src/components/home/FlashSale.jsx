import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import ProductCard from '../product/ProductCard';

export default function FlashSale() {
  // 12-hour countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter products that have compareAtPrice > price
  const saleProducts = PRODUCTS.filter(
    (p) => p.compareAtPrice && p.compareAtPrice > p.price
  ).slice(0, 4);

  return (
    <section className="py-16 bg-[#F5F8FC] border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flash Sale Header with Live Timer */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E53935] mb-2">
              <span className="p-1 rounded-md bg-red-100 flex items-center justify-center">
                <Flame className="w-4 h-4 text-[#E53935]" />
              </span>
              <span>Limited-Time Flash Event</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#123B72]">
              Deals of the Day
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Save up to 40% on top rated accessories. Prices refresh when the timer expires.
            </p>
          </div>

          {/* Countdown timer display */}
          <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm self-start md:self-auto">
            <Clock className="w-5 h-5 text-[#E53935] animate-pulse" />
            <div className="flex items-center gap-1.5 text-center">
              <div className="bg-[#123B72] text-white px-2.5 py-1.5 rounded-xl min-w-[36px]">
                <span className="font-mono text-sm font-bold">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="block text-[8px] uppercase tracking-wider text-blue-200">
                  Hrs
                </span>
              </div>
              <span className="font-bold text-slate-400">:</span>
              <div className="bg-[#123B72] text-white px-2.5 py-1.5 rounded-xl min-w-[36px]">
                <span className="font-mono text-sm font-bold">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="block text-[8px] uppercase tracking-wider text-blue-200">
                  Min
                </span>
              </div>
              <span className="font-bold text-slate-400">:</span>
              <div className="bg-[#E53935] text-white px-2.5 py-1.5 rounded-xl min-w-[36px]">
                <span className="font-mono text-sm font-bold">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="block text-[8px] uppercase tracking-wider text-red-200">
                  Sec
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA link */}
        <div className="mt-10 text-center">
          <Link
            to="/shop?tag=sale"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-sm font-bold text-[#123B72] hover:text-[#2563EB] hover:border-[#2563EB] shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <span>View All Flash Sale Deals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
