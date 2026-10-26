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
  Printer,
  Tag,
  PackageCheck,
} from 'lucide-react';
import { useBotanicalCart } from '../context/BotanicalCartContext';
import { useCurrency } from '../context/CurrencyContext';
import BotanicalPaymentModal from '../components/checkout/BotanicalPaymentModal';

export default function BotanicalBagPage({ onOpenTracking }) {
  const {
    cartItems,
    subtotal,
    shippingFee,
    discountAmount,
    total,
    isFreeShipping,
    freeShippingProgress,
    amountNeededForFreeShipping,
    isGiftUnlocked,
    giftProgress,
    amountNeededForGift,
    complimentaryGift,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    updateQuantity,
    removeFromBag,
    clearBag,
  } = useBotanicalCart();

  const { formatRaw, activeRegion } = useCurrency();
  const navigate = useNavigate();

  // Checkout State
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Promo Code State
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const handleOrderSuccess = (orderData) => {
    setCompletedOrder(orderData);
    setOrderComplete(true);
    setIsCheckingOut(false);
    clearBag();
  };

  // Order Complete Receipt View
  if (orderComplete && completedOrder) {
    const isCod = completedOrder.method === 'cod';

    return (
      <div className="pb-28 lg:pb-16 max-w-2xl mx-auto px-4 py-10 animate-in fade-in duration-300">
        <div className="bg-[#FBF9F5] p-6 sm:p-10 rounded-[2.5rem] border border-[#EBE6DC] shadow-xl text-center space-y-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1A3326] text-[#FBF9F5] flex items-center justify-center mx-auto shadow-md ring-8 ring-[#1A3326]/10">
            <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.2]" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#7D9678]">
              {isCod ? 'Dispensary Booking Confirmed' : 'Payment Verified & Dispatched'}
            </span>
            <h1 className="font-botanical text-2xl sm:text-4xl font-bold text-[#1A3326]">
              Tack Så Mycket, {completedOrder.shipping.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your wildcrafted Nordic formulations have been allocated in our cold store and queued for expedited carbon-neutral dispatch.
            </p>
          </div>

          {/* Official Invoice Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#EFF4EE] border border-[#DCE4DA] text-left text-xs space-y-4 shadow-inner">
            {/* Order Ref & Payment Method Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DCE4DA]">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">
                  Dispensary Order Reference
                </span>
                <span className="font-mono font-bold text-base text-[#1A3326] tracking-wide">
                  {completedOrder.orderId}
                </span>
              </div>
              <div className="sm:text-right">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">
                  Settlement Channel
                </span>
                <span
                  className={`inline-flex items-center gap-1 font-semibold px-2.5 py-0.5 rounded-full text-[11px] mt-0.5 ${
                    isCod
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{completedOrder.paymentSummary}</span>
                </span>
              </div>
            </div>

            {/* Recipient and Shipping Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-0.5">
                  Delivery Destination
                </span>
                <p className="font-medium text-[#1A3326]">
                  {completedOrder.shipping.address}
                </p>
                <p className="text-slate-500">
                  {completedOrder.shipping.city}
                </p>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-0.5">
                  Courier Service & ETA
                </span>
                <p className="font-medium text-[#1A3326]">
                  {completedOrder.courier}
                </p>
                <p className="text-slate-500 truncate">
                  Tracking: {completedOrder.trackingNumber} ({completedOrder.estimatedDelivery})
                </p>
              </div>
            </div>

            {/* Purchased Items List */}
            {completedOrder.items && completedOrder.items.length > 0 && (
              <div className="pt-3 border-t border-[#DCE4DA] space-y-2.5">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">
                  Prescription Formulations ({completedOrder.items.length})
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {completedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 p-2 rounded-xl bg-white/70 border border-[#DCE4DA]/80"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {item.image && (
                          <img
                            src={item.image}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover border border-[#DCE4DA] shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-[#1A3326] truncate leading-tight">
                            {item.title}
                          </p>
                          <span className="text-[10px] text-slate-500 block">
                            Qty: {item.quantity} {item.size ? `• ${item.size}` : ''}
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-[#1A3326] shrink-0">
                        {formatRaw(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Total Financial Summary */}
            <div className="pt-3 border-t border-[#DCE4DA] space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatRaw(completedOrder.subtotal)}</span>
              </div>

              {completedOrder.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Promotional Discount</span>
                  <span>-{formatRaw(completedOrder.discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Carbon-Neutral Delivery</span>
                <span>
                  {completedOrder.shippingFee === 0
                    ? 'Complimentary'
                    : formatRaw(completedOrder.shippingFee)}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-[#1A3326] pt-1.5 border-t border-[#DCE4DA]">
                <span>
                  Total Amount {isCod ? '(Payable in Cash on Handover)' : '(Authorized & Settled)'}
                </span>
                <span className="text-[#C26747] text-base">
                  {formatRaw(completedOrder.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full sm:w-1/3 py-3.5 rounded-full bg-white hover:bg-[#EFF4EE] border border-[#EBE6DC] text-[#1A3326] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#7D9678]" />
              <span>Print Receipt</span>
            </button>

            {onOpenTracking && (
              <button
                type="button"
                onClick={() => onOpenTracking(completedOrder.orderId)}
                className="w-full sm:w-1/3 py-3.5 rounded-full bg-[#EFF4EE] hover:bg-[#DCE4DA] text-[#1A3326] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <PackageCheck className="w-4 h-4 text-[#7D9678]" />
                <span>Track Parcel</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setOrderComplete(false);
                setCompletedOrder(null);
                navigate('/series');
              }}
              className="w-full sm:w-1/3 py-3.5 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Explore Series</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty Bag View
  if (cartItems.length === 0) {
    return (
      <div className="pb-28 lg:pb-16 max-w-2xl mx-auto px-4 py-12 animate-in fade-in duration-300">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#1A3326]/20 shadow-2xl bg-[#09150D] p-8 sm:p-12 text-center space-y-6">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1920&auto=format&fit=crop&q=85"
              alt="Nordic Forest"
              className="w-full h-full object-cover object-center transform scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07130B]/95 via-[#0D1F13]/90 to-[#07130B]/80" />
            <div className="absolute -top-20 right-1/4 w-72 h-72 rounded-full bg-[#C26747]/15 blur-3xl pointer-events-none" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E8C5A8] flex items-center justify-center mx-auto shadow-lg">
              <ShoppingBag className="w-10 h-10 stroke-[1.6]" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10.5px] uppercase font-bold tracking-[0.16em] text-[#E8DCC8]">
                Dispensary Staging Vacant
              </span>
              <h1 className="font-botanical text-3xl sm:text-4xl font-bold text-[#FBF9F5]">
                Your Botanical Bag is Vacant
              </h1>
              <p className="text-xs sm:text-sm text-[#DCD4C7] max-w-sm mx-auto leading-relaxed">
                You haven't allocated any wildcraft elixirs, soothing balms, or forest teas yet. Discover our latest seasonal Lapland extractions.
              </p>
            </div>

            <Link
              to="/series"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C26747] hover:bg-[#A85335] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#C26747]/30 transition-all cursor-pointer"
            >
              <span>Explore Curated Series</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-28 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      {/* ========================================================= */}
      {/* ATMOSPHERIC NORDIC FOREST BAG HERO BANNER                 */}
      {/* ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-[#1A3326]/20 shadow-2xl bg-[#09150D]"
      >
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1920&auto=format&fit=crop&q=85"
            alt="Misty Conifer Forest"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07130B]/95 via-[#0D1F13]/85 to-[#07130B]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07130B] via-[#07130B]/40 to-black/30" />
          <div className="absolute -top-20 right-1/4 w-80 h-80 rounded-full bg-[#C26747]/15 blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-6 sm:p-8 lg:p-10 space-y-6">
          {/* Frosted Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-[#E8DCC8] font-medium">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#FBF9F5] font-semibold">Your Dispensary Bag</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10.5px] uppercase font-bold tracking-[0.16em] text-[#E8DCC8] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8C5A8] animate-pulse" />
                <span>Dispensary Transit Hub • {activeRegion.label}</span>
              </div>
              <h1 className="font-botanical text-3xl sm:text-5xl font-bold text-[#FBF9F5] tracking-tight drop-shadow-sm">
                Your Botanical Bag
              </h1>
              <p className="text-xs sm:text-sm text-[#DCD4C7] max-w-xl">
                {cartItems.length} {cartItems.length === 1 ? 'specimen' : 'specimens'} allocated for temperature-regulated cold-chain transit staging.
              </p>
            </div>

            <button
              type="button"
              onClick={clearBag}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs text-[#E8C5A8] hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
            >
              Clear Bag
            </button>
          </div>

          {/* Provenance Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none text-[11px] pt-1">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#E8DCC8] shrink-0">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Carbon-Neutral Global Courier Dispatch</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#E8DCC8] shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7D9678]" />
              <span>Biophotonic Miron Glass Insulation</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Line Items & Free Shipping Meter */}
        <div className="lg:col-span-7 space-y-4">
          {/* Free Shipping Alert Box */}
          <div className="p-4 rounded-2xl bg-[#EFF4EE] border border-[#DCE4DA] flex items-center justify-between text-xs text-[#1A3326]">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#7D9678] shrink-0" />
              {isFreeShipping ? (
                <span className="font-medium text-[#1A3326]">
                  ✓ Unlocked: <strong>Complimentary Carbon-Neutral Transit</strong>.
                </span>
              ) : (
                <span>
                  Add <strong>{formatRaw(amountNeededForFreeShipping)}</strong> more for complimentary delivery.
                </span>
              )}
            </div>
            <span className="font-semibold text-[#7D9678]">{freeShippingProgress}%</span>
          </div>

          {/* Cart Items List */}
          <div className="space-y-3">
            <AnimatePresence>
              {cartItems.map((item) => {
                const itemPrice = activeRegion.id === 'PK'
                  ? Math.round(item.price * activeRegion.exchangeRate)
                  : item.price;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#EBE6DC] flex gap-4 items-center transition-all shadow-xs"
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
                          {formatRaw(itemPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Summary & Promo Code */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
          {/* Complimentary Gift Progress Card */}
          <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#EBE6DC] space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C26747]/15 text-[#C26747] flex items-center justify-center shrink-0 mt-0.5">
                <Gift className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold text-[#1A3326]">
                    Solstice Gift Tier
                  </span>
                  <span className="text-xs font-semibold text-[#C26747]">
                    {giftProgress}%
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  {isGiftUnlocked ? (
                    <span className="text-[#1A3326] font-medium flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#C26747]" />
                      Unlocked: {complimentaryGift.name}
                    </span>
                  ) : (
                    <span>
                      Add <strong>{formatRaw(amountNeededForGift)}</strong> more to receive a complimentary {complimentaryGift.name}.
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="w-full bg-[#EBE6DC] h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#7D9678] to-[#C26747] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${giftProgress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Promo Code Input */}
          <div className="p-5 rounded-2xl bg-white border border-[#EBE6DC] space-y-3">
            <span className="text-[11px] uppercase font-bold text-[#7D9678] tracking-widest block">
              Promotional Voucher
            </span>
            {appliedPromo ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-700" />
                  <div>
                    <span className="font-bold block leading-tight">{appliedPromo.code}</span>
                    <span className="text-[10px] text-emerald-700">{appliedPromo.description}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removePromoCode}
                  className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter code (NORDIC10, FREESHIP)..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#EBE6DC] text-xs uppercase placeholder-slate-400 focus:outline-none focus:border-[#C26747]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#1A3326] hover:bg-[#C26747] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <span className="text-[10px] text-rose-600 font-medium block">
                    {promoError}
                  </span>
                )}
              </form>
            )}
          </div>

          {/* Bag Summary Box */}
          <div className="p-6 rounded-2xl bg-[#FBF9F5] border border-[#EBE6DC] space-y-4">
            <h2 className="font-botanical text-xl font-semibold text-[#1A3326] pb-3 border-b border-[#EBE6DC]">
              Summary & Valuation
            </h2>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-semibold text-[#1A3326]">{formatRaw(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Promotional Discount</span>
                  <span>-{formatRaw(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Carbon-Neutral Transit ({activeRegion.defaultCourier.split('(')[0].trim()})</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-700">Complimentary</strong>
                  ) : (
                    formatRaw(shippingFee)
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-[#EBE6DC] flex justify-between text-base font-bold text-[#1A3326]">
                <span>Total Amount</span>
                <span className="text-[#C26747] text-xl">{formatRaw(total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-4 rounded-full bg-[#C26747] hover:bg-[#1A3326] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#C26747]/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>Proceed to Dispensary Checkout</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 text-center pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7D9678]" />
              <span>SSL Protected • Verified Cold-Chain Handover</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Checkout Modal */}
      <BotanicalPaymentModal
        isOpen={isCheckingOut}
        onClose={() => setIsCheckingOut(false)}
        total={total}
        subtotal={subtotal}
        discountAmount={discountAmount}
        shippingFee={shippingFee}
        isFreeShipping={isFreeShipping}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}
