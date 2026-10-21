import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  Gift,
  Truck,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ChevronRight,
} from 'lucide-react';
import { useBotanicalCart } from '../context/BotanicalCartContext';
import { formatCurrency } from '../../src/lib/formatCurrency';
import { STORE_CONFIG } from '../config/storeConfig';
import confetti from 'canvas-confetti';

export default function BotanicalBagPage() {
  const {
    cartItems,
    subtotal,
    shippingFee,
    total,
    isFreeShipping,
    freeShippingProgress,
    amountNeededForFreeShipping,
    isGiftUnlocked,
    giftProgress,
    amountNeededForGift,
    complimentaryGift,
    updateQuantity,
    removeFromBag,
    clearBag,
  } = useBotanicalCart();

  const navigate = useNavigate();

  // Checkout Prototype State
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [checkoutForm, setCheckoutForm] = useState({
    name: 'Astrid Lind',
    email: 'astrid.nordic@tundra.se',
    address: 'Kungsgatan 14, Apt 3B',
    city: 'Stockholm',
    postalCode: '111 43',
    country: 'Sweden',
  });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = 'BOT-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderComplete(true);
      setIsCheckingOut(false);

      try {
        confetti({
          particleCount: 90,
          spread: 65,
          origin: { y: 0.6 },
          colors: ['#1A3326', '#C26747', '#7D9678', '#FBF9F5'],
        });
      } catch (err) {}

      clearBag();
    }, 1100);
  };

  // Order Complete View
  if (orderComplete) {
    return (
      <div className="pb-28 lg:pb-16 max-w-xl mx-auto px-4 py-12 animate-in fade-in duration-300">
        <div className="bg-[#FBF9F5] p-8 sm:p-10 rounded-3xl border border-[#EBE6DC] shadow-2xl text-center space-y-6">
          <div className="w-18 h-18 rounded-full bg-[#1A3326] text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7D9678]">
              Nordic Wildcraft Order Confirmed
            </span>
            <h1 className="font-botanical text-3xl sm:text-4xl font-bold text-[#1A3326]">
              Tack Så Mycket, {checkoutForm.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
              Your botanical formulations are now being packed in natural linen and dispatched with carbon-neutral transit.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#EFF4EE] border border-[#DCE4DA] text-left text-xs space-y-2.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Order Reference:</span>
              <span className="font-mono font-bold text-[#1A3326]">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Destination:</span>
              <span className="font-medium text-[#1A3326] text-right">
                {checkoutForm.address}, {checkoutForm.city}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Transit Footprint:</span>
              <span className="font-semibold text-[#7D9678]">100% Carbon-Neutral Offset</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setOrderComplete(false);
              navigate('/series');
            }}
            className="w-full py-3.5 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Explore More Botanicals
          </button>
        </div>
      </div>
    );
  }

  // Empty Bag View
  if (cartItems.length === 0) {
    return (
      <div className="pb-28 lg:pb-16 max-w-xl mx-auto px-4 py-20 text-center space-y-5 animate-in fade-in duration-300">
        <div className="w-20 h-20 rounded-full bg-[#EFF4EE] text-[#7D9678] flex items-center justify-center mx-auto shadow-sm">
          <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
        </div>
        <div className="space-y-1">
          <span className="text-xs uppercase font-bold tracking-widest text-[#7D9678]">
            Dispensary Bag
          </span>
          <h1 className="font-botanical text-3xl font-bold text-[#1A3326]">
            Your Bag is Quiet
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            You haven't gathered any Nordic elixirs, balms, or forest teas yet. Discover our latest wildcraft harvests.
          </p>
        </div>
        <Link
          to="/series"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
        >
          <span>Explore Curated Series</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-28 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      {/* Breadcrumbs */}
      <nav className="pt-4 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Link to="/" className="hover:text-[#1A3326] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[#1A3326] font-semibold">Your Botanical Bag</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#EBE6DC]">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#7D9678]">
            {STORE_CONFIG.defaultShopperName}’s Harvest Bag
          </span>
          <h1 className="font-botanical text-3xl sm:text-5xl font-bold text-[#1A3326] tracking-tight mt-1">
            Your Botanical Bag
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} prepared for wildcraft shipment
          </p>
        </div>

        <button
          type="button"
          onClick={clearBag}
          className="text-xs text-[#C26747] hover:underline font-semibold cursor-pointer self-start sm:self-auto"
        >
          Clear All Items
        </button>
      </div>

      {/* 2-Column Split on Laptop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Line Items & Free Shipping Meter */}
        <div className="lg:col-span-7 space-y-4">
          {/* Free Shipping Alert Box */}
          <div className="p-4 rounded-3xl bg-[#EFF4EE] border border-[#DCE4DA] flex items-center justify-between text-xs text-[#1A3326]">
            <div className="flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-[#7D9678] shrink-0" />
              {isFreeShipping ? (
                <span className="font-semibold text-[#1A3326]">
                  ✓ Unlocked: <strong>Free Carbon-Neutral Nordic Transit</strong>.
                </span>
              ) : (
                <span>
                  Add <strong>{formatCurrency(amountNeededForFreeShipping)}</strong> more for free carbon-neutral shipping.
                </span>
              )}
            </div>
            <span className="font-bold text-[#7D9678]">{freeShippingProgress}%</span>
          </div>

          {/* Cart Items List */}
          <div className="space-y-3">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="p-4 rounded-3xl bg-[#FBF9F5] border border-[#EBE6DC] flex gap-4 items-center shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Thumbnail */}
                  <Link
                    to={`/product/${item.slug || ''}`}
                    className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden bg-[#EFF4EE] shrink-0 border border-[#EBE6DC]"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-botanical text-base sm:text-lg font-bold text-[#1A3326] leading-snug line-clamp-1">
                          <Link to={`/product/${item.slug || ''}`}>{item.title}</Link>
                        </h3>
                        <p className="text-xs font-serif italic text-slate-500 line-clamp-1">
                          {item.botanicalName}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromBag(item.id)}
                        aria-label={`Remove ${item.title}`}
                        className="text-slate-400 hover:text-[#C26747] p-1.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#EBE6DC] rounded-full overflow-hidden bg-white h-9">
                        <button
                          type="button"
                          disabled={item.quantity <= 1}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 h-full text-slate-500 hover:text-[#1A3326] disabled:opacity-30 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-[#1A3326]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          disabled={item.quantity >= item.stock}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 h-full text-slate-500 hover:text-[#1A3326] disabled:opacity-30 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-base font-bold text-[#1A3326]">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Gift Progress & Order Summary (Sticky on Laptop) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
          {/* Complimentary Gift Progress Card ($100 Threshold) */}
          <div className="p-5 rounded-3xl bg-[#FBF9F5] border border-[#EBE6DC] shadow-sm space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#C26747]/15 text-[#C26747] flex items-center justify-center shrink-0 mt-0.5">
                <Gift className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-[#1A3326]">
                    Complimentary Gift Ritual
                  </span>
                  <span className="text-xs font-bold text-[#C26747]">
                    {giftProgress}%
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  {isGiftUnlocked ? (
                    <span className="text-[#1A3326] font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#C26747]" />
                      Unlocked: {complimentaryGift.name} ({formatCurrency(complimentaryGift.value)})
                    </span>
                  ) : (
                    <span>
                      Add <strong>{formatCurrency(amountNeededForGift)}</strong> more to receive a complimentary {complimentaryGift.name}.
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="w-full bg-[#EBE6DC] h-2.5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#7D9678] to-[#C26747] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${giftProgress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Bag Summary Box */}
          <div className="p-6 rounded-3xl bg-[#FBF9F5] border border-[#EBE6DC] shadow-sm space-y-4">
            <h2 className="font-botanical text-xl font-bold text-[#1A3326] pb-3 border-b border-[#EBE6DC]">
              Valuation & Summary
            </h2>

            <div className="space-y-2 text-xs sm:text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Botanical Subtotal</span>
                <span className="font-semibold text-[#1A3326]">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Carbon-Neutral Shipping</span>
                <span>
                  {isFreeShipping ? (
                    <strong className="text-[#7D9678] font-bold">Complimentary</strong>
                  ) : (
                    formatCurrency(shippingFee)
                  )}
                </span>
              </div>
              {isGiftUnlocked && (
                <div className="flex justify-between text-[#C26747]">
                  <span>Complimentary Cloudberry Lip Balm</span>
                  <span className="font-semibold">FREE</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-[#1A3326] pt-3 border-t border-[#EBE6DC]">
                <span>Total Amount</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-4 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white text-xs sm:text-sm font-semibold shadow-xl shadow-[#1A3326]/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Lock className="w-4 h-4 text-[#7D9678]" />
              <span>Proceed to Checkout • {formatCurrency(total)}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#7D9678]" />
              <span>Certified 256-bit Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Flow Modal */}
      <AnimatePresence>
        {isCheckingOut && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full max-w-lg bg-[#FBF9F5] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EBE6DC] max-h-[90vh] overflow-y-auto space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#EBE6DC]">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#7D9678]">
                    Verified Nordic Gateway
                  </span>
                  <h3 className="font-botanical text-2xl font-bold text-[#1A3326]">
                    Complete Your Harvest Order
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-slate-400 hover:text-[#1A3326] p-1.5 text-xs font-semibold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={checkoutForm.name}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE6DC] bg-white text-[#1A3326]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={checkoutForm.email}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE6DC] bg-white text-[#1A3326]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Delivery Address</label>
                  <input
                    type="text"
                    required
                    value={checkoutForm.address}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE6DC] bg-white text-[#1A3326]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={checkoutForm.city}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE6DC] bg-white text-[#1A3326]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={checkoutForm.postalCode}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, postalCode: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE6DC] bg-white text-[#1A3326]"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#EFF4EE] border border-[#DCE4DA] flex items-center gap-2.5 text-xs text-[#1A3326]">
                  <ShieldCheck className="w-4 h-4 text-[#7D9678] shrink-0" />
                  <span>
                    Test mode active: No actual credit card charge incurred.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#C26747] hover:bg-[#1A3326] text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Preparing Harvest Package...</span>
                  ) : (
                    <span>Confirm Harvest Order ({formatCurrency(total)})</span>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
