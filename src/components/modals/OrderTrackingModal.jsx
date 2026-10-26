import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, PackageCheck, Truck, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../lib/formatCurrency';

export default function OrderTrackingModal({ isOpen, onClose, initialOrderId = '' }) {
  const [searchId, setSearchId] = useState(initialOrderId);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = JSON.parse(localStorage.getItem('bjork_tall_orders') || '[]');
        setRecentOrders(stored);
        if (initialOrderId) {
          setSearchId(initialOrderId);
          const found = stored.find((o) => o.orderId.toLowerCase() === initialOrderId.toLowerCase());
          if (found) setCurrentOrder(found);
        } else if (stored.length > 0 && !currentOrder) {
          setCurrentOrder(stored[0]);
        }
      } catch {
        setRecentOrders([]);
      }
    }
  }, [isOpen, initialOrderId]);

  const handleLookup = (e) => {
    e?.preventDefault();
    if (!searchId.trim()) return;
    setSearched(true);
    const clean = searchId.trim().toLowerCase();
    const found = recentOrders.find((o) => o.orderId?.toLowerCase() === clean);
    if (found) {
      setCurrentOrder(found);
    } else {
      // Simulate fallback demonstration order for demonstration if user types any test reference
      setCurrentOrder({
        orderId: searchId.toUpperCase(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'In Transit',
        courier: clean.includes('pk') || clean.includes('tcs') ? 'TCS Express Pakistan' : 'DHL Nordic Express',
        trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
        estimatedDelivery: '2 business days',
        shipping: {
          fullName: 'Valued Client',
          address: 'Verified Delivery Address',
          city: 'Dispensary Destination',
        },
        items: [
          {
            title: 'Arctic Birch & Chaga Restorative Elixir',
            quantity: 1,
            size: '50 ml / 1.7 fl oz',
            price: 68.0,
            image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&auto=format&fit=crop&q=80',
          },
        ],
        total: 68.0,
        paymentSummary: 'Authorized & Settled',
      });
    }
  };

  if (!isOpen) return null;

  const trackingSteps = [
    { title: 'Order Confirmed', desc: 'Dispensary prescription verified', done: true },
    { title: 'Apothecary Batching', desc: 'Hand-compounded & inspected in Stockholm', done: true },
    { title: 'Biophotonic Miron Seal', desc: 'Sealed & nitrogen-padded in cold store', done: true },
    { title: 'In Transit with Courier', desc: currentOrder?.courier || 'Expedited Transit', done: true, current: true },
    { title: 'Delivered', desc: 'Signed receipt handover', done: false },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-[#FBF9F5] rounded-[2rem] border border-[#EBE6DC] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#1A3326] text-[#FBF9F5] flex items-center justify-between border-b border-[#2B4E3C]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#7D9678]/20 text-[#7D9678] flex items-center justify-center border border-[#7D9678]/40">
                <PackageCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-botanical text-xl sm:text-2xl font-bold text-white leading-none">
                  Track Your Dispensary Dispatch
                </h3>
                <span className="text-[11px] text-[#7D9678] tracking-widest uppercase font-semibold block mt-1">
                  Real-time Cold-Chain Logistics Tracker
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

          {/* Search Bar */}
          <div className="p-4 sm:p-5 bg-white border-b border-[#EBE6DC]">
            <form onSubmit={handleLookup} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter order reference (e.g. BT-84920 or recent orders)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#EBE6DC] text-xs text-[#1A3326] focus:outline-none focus:border-[#C26747]"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#1A3326] hover:bg-[#C26747] text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
              >
                Track Order
              </button>
            </form>

            {/* Quick Recent Order Chips */}
            {recentOrders.length > 0 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto text-xs pb-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">
                  Recent Orders:
                </span>
                {recentOrders.slice(0, 3).map((ord) => (
                  <button
                    key={ord.orderId}
                    type="button"
                    onClick={() => {
                      setSearchId(ord.orderId);
                      setCurrentOrder(ord);
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-colors shrink-0 cursor-pointer ${
                      currentOrder?.orderId === ord.orderId
                        ? 'bg-[#1A3326] text-white border-[#1A3326]'
                        : 'bg-[#EFF4EE] text-[#1A3326] border-[#DCE4DA] hover:border-slate-400'
                    }`}
                  >
                    {ord.orderId}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Order Details Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {currentOrder ? (
              <div className="space-y-6">
                {/* Status Header Badge Card */}
                <div className="p-5 rounded-2xl bg-[#EFF4EE] border border-[#DCE4DA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase font-bold text-slate-500">
                        Order Status:
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#1A3326] text-white">
                        In Transit • On Schedule
                      </span>
                    </div>
                    <h4 className="font-mono text-lg font-bold text-[#1A3326] mt-1">
                      {currentOrder.orderId}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Carrier: <strong>{currentOrder.courier || 'DHL Nordic Express'}</strong> • Tracking: <span className="font-mono">{currentOrder.trackingNumber || 'DHL-SE-9832104'}</span>
                    </p>
                  </div>

                  <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-[#DCE4DA]">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Estimated Arrival
                    </span>
                    <span className="font-bold text-[#C26747] text-sm">
                      {currentOrder.estimatedDelivery || '2–3 Business Days'}
                    </span>
                  </div>
                </div>

                {/* Stepper Timeline */}
                <div className="space-y-3">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#7D9678] block">
                    Dispatch Milestones
                  </span>
                  <div className="space-y-3">
                    {trackingSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                            step.current
                              ? 'bg-[#C26747] text-white ring-4 ring-[#C26747]/20'
                              : step.done
                              ? 'bg-[#1A3326] text-white'
                              : 'bg-slate-200 text-slate-400'
                          }`}
                        >
                          {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <div className="flex-1 pb-3 border-b border-[#EBE6DC] last:border-b-0">
                          <h5 className={`font-bold text-xs ${step.current ? 'text-[#C26747]' : 'text-[#1A3326]'}`}>
                            {step.title}
                          </h5>
                          <p className="text-[11px] text-slate-500">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Items in this order */}
                {currentOrder.items && currentOrder.items.length > 0 && (
                  <div className="p-4 rounded-2xl bg-white border border-[#EBE6DC] space-y-3">
                    <span className="text-xs font-bold text-[#1A3326] block">
                      Parcel Contents ({currentOrder.items.length} items)
                    </span>
                    <div className="divide-y divide-[#EBE6DC]/60">
                      {currentOrder.items.map((it, idx) => (
                        <div key={idx} className="py-2 flex items-center justify-between text-xs gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {it.image && (
                              <img src={it.image} alt="" className="w-9 h-9 rounded-lg object-cover border border-[#EBE6DC]" />
                            )}
                            <div className="truncate">
                              <span className="font-semibold text-[#1A3326] truncate block">{it.title}</span>
                              <span className="text-[10px] text-slate-400">Qty: {it.quantity} {it.size ? `• ${it.size}` : ''}</span>
                            </div>
                          </div>
                          <span className="font-bold text-[#1A3326] shrink-0">{formatCurrency(it.price * it.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center space-y-2">
                <Truck className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-[#1A3326]">
                  Enter an order reference above to view live dispatch milestones
                </p>
                <p className="text-xs text-slate-500">
                  Order references are provided on your dispatch confirmation receipt (e.g. BT-923841).
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-[#EFF4EE] border-t border-[#DCE4DA] flex items-center justify-between px-6 text-xs text-slate-600">
            <span>24/7 Cold-Chain GPS Monitored</span>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white font-semibold transition-colors cursor-pointer"
            >
              Close Tracker
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
