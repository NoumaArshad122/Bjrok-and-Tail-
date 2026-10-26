import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  Gift,
  Truck,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import { useBotanicalCart } from '../../context/BotanicalCartContext';
import { useCurrency } from '../../context/CurrencyContext';

export default function CartDrawer({ onProceedToCheckout }) {
  const {
    cartItems,
    totalItemCount,
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
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromBag,
  } = useBotanicalCart();

  const { formatRaw, activeRegion } = useCurrency();
  const navigate = useNavigate();

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

  const handleGoToCheckout = () => {
    closeCartDrawer();
    if (onProceedToCheckout) {
      onProceedToCheckout();
    } else {
      navigate('/bag');
    }
  };

  const handleGoToBag = () => {
    closeCartDrawer();
    navigate('/bag');
  };

  if (!isCartDrawerOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeCartDrawer}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          aria-hidden="true"
        />

        {/* Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-screen max-w-md bg-[#FBF9F5] border-l border-[#EBE6DC] shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 bg-white border-b border-[#EBE6DC] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#1A3326] text-white flex items-center justify-center font-bold text-sm">
                  {totalItemCount}
                </div>
                <div>
                  <h3 className="font-botanical text-lg font-bold text-[#1A3326] leading-none">
                    Your Apothecary Bag
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#7D9678] block mt-1">
                    {activeRegion.label}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={closeCartDrawer}
                aria-label="Close bag drawer"
                className="p-2 rounded-full hover:bg-[#EFF4EE] text-slate-500 hover:text-[#1A3326] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Threshold Progress Banners */}
            {cartItems.length > 0 && (
              <div className="bg-[#EFF4EE] p-3.5 px-6 border-b border-[#DCE4DA] space-y-2 text-xs">
                {/* Free Shipping Progress */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-medium">
                    <span className="flex items-center gap-1.5 text-[#1A3326]">
                      <Truck className="w-3.5 h-3.5 text-[#7D9678]" />
                      {isFreeShipping ? (
                        <strong className="text-emerald-800">Complimentary Transit Unlocked</strong>
                      ) : (
                        <span>
                          Add <strong>{formatRaw(amountNeededForFreeShipping)}</strong> for Free Transit
                        </span>
                      )}
                    </span>
                    <span className="font-bold text-[#7D9678]">{freeShippingProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-[#DCE4DA]">
                    <div
                      className="h-full bg-[#1A3326] transition-all duration-500 rounded-full"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Complimentary Gift Progress */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between font-medium">
                    <span className="flex items-center gap-1.5 text-[#1A3326]">
                      <Gift className="w-3.5 h-3.5 text-[#C26747]" />
                      {isGiftUnlocked ? (
                        <strong className="text-[#C26747]">Cloudberry Lip Balm Gift Unlocked!</strong>
                      ) : (
                        <span>
                          Add <strong>{formatRaw(amountNeededForGift)}</strong> for Free Harvest Gift
                        </span>
                      )}
                    </span>
                    <span className="font-bold text-[#C26747]">{giftProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-[#DCE4DA]">
                    <div
                      className="h-full bg-[#C26747] transition-all duration-500 rounded-full"
                      style={{ width: `${giftProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Scrollable Item List */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#EFF4EE] text-[#7D9678] flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-botanical text-xl font-bold text-[#1A3326]">
                      Your Bag is Vacant
                    </h4>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                      Explore our hand-harvested Nordic elixirs, balms, and wild tea infusions.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      closeCartDrawer();
                      navigate('/series');
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Explore Curated Series
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {cartItems.map((item) => {
                      const itemPrice = activeRegion.id === 'PK'
                        ? Math.round(item.price * activeRegion.exchangeRate)
                        : item.price;

                      return (
                        <div
                          key={item.id}
                          className="p-3 rounded-2xl bg-white border border-[#EBE6DC] flex gap-3 items-center justify-between"
                        >
                          <img
                            src={item.image}
                            alt=""
                            className="w-16 h-16 rounded-xl object-cover border border-[#EBE6DC] shrink-0"
                          />

                          <div className="flex-1 min-w-0 pr-2">
                            <h4 className="font-botanical text-sm font-bold text-[#1A3326] truncate">
                              {item.title}
                            </h4>
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              {item.size} • {formatRaw(itemPrice)} each
                            </span>

                            {/* Stepper */}
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex items-center border border-[#EBE6DC] rounded-full bg-[#FBF9F5] overflow-hidden h-6">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-2 h-full text-slate-500 hover:text-black cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 text-xs font-bold text-[#1A3326]">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-2 h-full text-slate-500 hover:text-black cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFromBag(item.id)}
                                aria-label="Remove item"
                                className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-bold text-sm text-[#1A3326] block">
                              {formatRaw(itemPrice * item.quantity)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Complimentary Gift Display Card when unlocked */}
                  {isGiftUnlocked && (
                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center gap-3">
                      <img
                        src={complimentaryGift.image}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover border border-amber-300/80 shrink-0"
                      />
                      <div className="flex-1 min-w-0 text-xs">
                        <div className="flex items-center gap-1 text-[#C26747] font-bold">
                          <Gift className="w-3.5 h-3.5" />
                          <span>Complimentary Solstice Gift</span>
                        </div>
                        <h5 className="font-bold text-[#1A3326] truncate">
                          {complimentaryGift.name}
                        </h5>
                        <span className="text-[10px] text-slate-500">
                          {complimentaryGift.volume} • Free
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Promo Code Input */}
                  <div className="pt-2">
                    {appliedPromo ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <div className="flex items-center gap-2">
                          <Tag className="w-3.5 h-3.5 text-emerald-700" />
                          <span className="font-bold">{appliedPromo.code}</span>
                          <span className="text-[11px] text-emerald-700">({appliedPromo.description})</span>
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
                            placeholder="Promo code (NORDIC10, FREESHIP)..."
                            className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#EBE6DC] text-xs uppercase placeholder-slate-400 focus:outline-none focus:border-[#C26747]"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-xl bg-[#1A3326] hover:bg-[#C26747] text-white text-xs font-semibold transition-colors cursor-pointer"
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
                </>
              )}
            </div>

            {/* Footer Checkout Summary */}
            {cartItems.length > 0 && (
              <div className="p-5 sm:p-6 bg-white border-t border-[#EBE6DC] space-y-3">
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#1A3326]">{formatRaw(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Promotional Discount</span>
                      <span>-{formatRaw(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Dispensary Transit</span>
                    <span>
                      {shippingFee === 0 ? (
                        <strong className="text-emerald-700">Complimentary</strong>
                      ) : (
                        formatRaw(shippingFee)
                      )}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#EBE6DC] flex justify-between text-sm font-bold text-[#1A3326]">
                    <span>Estimated Total</span>
                    <span className="text-[#C26747] text-base">{formatRaw(total)}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={handleGoToCheckout}
                    className="w-full py-3.5 rounded-full bg-[#C26747] hover:bg-[#1A3326] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleGoToBag}
                    className="w-full py-2.5 rounded-full bg-white hover:bg-[#EFF4EE] border border-[#EBE6DC] text-slate-700 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Review Full Bag & Order Notes
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 text-center pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7D9678]" />
                  <span>Cold-chain temperature guarantee • 256-bit encrypted</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
