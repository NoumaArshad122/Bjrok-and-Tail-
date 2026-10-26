import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck, ShieldCheck, RotateCcw, PackageCheck, Globe } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export default function ShippingPolicyModal({ isOpen, onClose }) {
  const { activeRegion, formatPrice } = useCurrency();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-[#FBF9F5] rounded-[2rem] border border-[#EBE6DC] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[88vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#1A3326] text-[#FBF9F5] flex items-center justify-between border-b border-[#2B4E3C]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#7D9678]/20 text-[#7D9678] flex items-center justify-center border border-[#7D9678]/40">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-botanical text-xl sm:text-2xl font-bold text-white leading-none">
                  Client Care & Shipping Policies
                </h3>
                <span className="text-[11px] text-[#7D9678] tracking-widest uppercase font-semibold block mt-1">
                  Global & Regional Delivery Guarantees
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-[#DCE4DA] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-slate-700">
            {/* Free Shipping Banner */}
            <div className="p-4 rounded-2xl bg-[#EFF4EE] border border-[#DCE4DA] flex items-center gap-3">
              <PackageCheck className="w-5 h-5 text-[#C26747] shrink-0" />
              <div className="space-y-0.5">
                <span className="font-bold text-[#1A3326] text-sm block">
                  Complimentary Transit on Orders over {formatPrice(activeRegion.freeShippingThreshold / (activeRegion.id === 'PK' ? activeRegion.exchangeRate : 1))}
                </span>
                <p className="text-slate-600">
                  Carbon-neutral expedited transit is automatically applied at checkout when your subtotal meets the threshold.
                </p>
              </div>
            </div>

            {/* Delivery Channels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#EBE6DC] space-y-2">
                <div className="flex items-center gap-2 text-[#1A3326] font-bold text-sm">
                  <Globe className="w-4 h-4 text-[#7D9678]" />
                  <span>International Orders (US, EU, UK, Global)</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Fulfilled via <strong>DHL Nordic Express</strong> directly from our central dispensary warehouse in Stockholm.
                </p>
                <ul className="list-disc pl-4 space-y-1 text-slate-500">
                  <li>Transit window: 3–5 business days</li>
                  <li>Full biophotonic temperature insulation</li>
                  <li>Pre-cleared customs; no surprise import duties</li>
                  <li>Real-time tracking link with SMS delivery alerts</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#EBE6DC] space-y-2">
                <div className="flex items-center gap-2 text-[#1A3326] font-bold text-sm">
                  <span className="text-base">🇵🇰</span>
                  <span>Pakistan Flagship Orders</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Fulfilled via <strong>TCS & Leopards Express</strong> from our regional temperature-controlled dispensary reserve.
                </p>
                <ul className="list-disc pl-4 space-y-1 text-slate-500">
                  <li>Karachi, Lahore, Islamabad: 24–48 hours</li>
                  <li>Other major cities: 2–3 business days</li>
                  <li>Cash on Delivery (COD) supported nationwide</li>
                  <li>Instant payment via JazzCash, EasyPaisa, NayaPay & Card</li>
                </ul>
              </div>
            </div>

            {/* Packaging and 30-day guarantee */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#EBE6DC] space-y-2">
                <div className="flex items-center gap-2 text-[#1A3326] font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#C26747]" />
                  <span>30-Day Freshness Guarantee</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  If any botanical elixir or balm does not meet your expectations, return it within 30 days of arrival for a full refund or exchange. We provide complimentary return shipping labels.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#EBE6DC] space-y-2">
                <div className="flex items-center gap-2 text-[#1A3326] font-bold text-sm">
                  <RotateCcw className="w-4 h-4 text-[#7D9678]" />
                  <span>Zero-Plastic Biodegradable Packaging</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Every parcel is cushioned in compostable spruce wood pulp and post-consumer Scandinavian paperboard, sealed with water-activated organic gummed linen tape.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-[#EFF4EE] border-t border-[#DCE4DA] flex items-center justify-end px-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white font-semibold transition-colors cursor-pointer"
            >
              Close Policy
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
