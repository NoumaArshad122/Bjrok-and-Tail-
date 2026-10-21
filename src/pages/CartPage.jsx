import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import Button from '../components/ui/Button';
import { formatCurrency } from '../lib/formatCurrency';
import {
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Truck,
  ShieldCheck,
  Tag,
  ChevronRight,
} from 'lucide-react';

export default function CartPage() {
  const {
    cartItems,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    freeShippingProgress,
    amountNeededForFreeShipping,
    isEligibleForFreeShipping,
    coupon,
    couponError,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-20 max-w-xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B72]">
            Your Shopping Cart is Empty
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            You haven't added any products to your cart yet. Explore our curated catalog to find elevated workspace essentials and studio sound gear.
          </p>
        </div>
        <Button variant="primary" size="lg" onClick={() => navigate('/shop')}>
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#2563EB] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">Shopping Cart</span>
        </nav>

        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#123B72]">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Review your items, apply promo codes, and proceed to checkout.
            </p>
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-[#E53935] hover:underline font-semibold cursor-pointer self-start sm:self-auto"
          >
            Clear All Items
          </button>
        </div>

        {/* Free Shipping Alert Box */}
        <div className="bg-[#F5F8FC] p-4 sm:p-5 rounded-2xl border border-slate-200/80">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-700 mb-2">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#2563EB]" />
              {isEligibleForFreeShipping ? (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  Congratulations! You've unlocked FREE Express Shipping.
                </span>
              ) : (
                <span>
                  Add <strong>{formatCurrency(amountNeededForFreeShipping)}</strong> more to your order for Free Shipping!
                </span>
              )}
            </div>
            <span className="text-xs font-bold text-[#2563EB]">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#2563EB] to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* 2-Column Layout: Cart Items List + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="divide-y divide-slate-100">
              {cartItems.map((item) => (
                <CartItem
                  key={item.key}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/shop"
                className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1"
              >
                <span>← Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 bg-[#F5F8FC] p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5 sticky top-24">
            <h2 className="text-base font-bold text-[#123B72] pb-3 border-b border-slate-200">
              Order Summary
            </h2>

            {/* Promo Code Input */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Discount Code
              </span>
              {coupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    <span>
                      <strong>{coupon.code}</strong> applied ({coupon.description})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter code (e.g. SAVE10)"
                    className="flex-1 px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#2563EB]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-[#E53935] mt-1.5">{couponError}</p>
              )}
            </div>

            {/* Line items calculation */}
            <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#E53935]">
                  <span>Discount</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-600 font-bold">FREE</strong>
                  ) : (
                    formatCurrency(shippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#123B72] pt-3 border-t border-slate-200">
                <span>Estimated Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => navigate('/checkout')}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe & Secure 256-Bit SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
