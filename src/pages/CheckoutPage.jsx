import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/formatCurrency';
import Button from '../components/ui/Button';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, subtotal, discountAmount, shippingFee, total, clearCart } = useCart();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    email: 'alex.rivera@example.com',
    firstName: 'Alex',
    lastName: 'Rivera',
    address: '742 Evergreen Terrace',
    apartment: 'Suite 4B',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
  });

  const [deliveryMethod, setDeliveryMethod] = useState('standard'); // standard or express
  const [paymentMethod, setPaymentMethod] = useState('card'); // card, paypal, apple
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errors, setErrors] = useState({});

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="py-24 text-center max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-[#123B72]">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500">
          Add items to your cart before proceeding to checkout.
        </p>
        <Button variant="primary" onClick={() => navigate('/shop')}>
          Browse Products
        </Button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.email) errs.email = 'Email address is required';
    if (!formData.firstName) errs.firstName = 'First name is required';
    if (!formData.lastName) errs.lastName = 'Last name is required';
    if (!formData.address) errs.address = 'Street address is required';
    if (!formData.city) errs.city = 'City is required';
    if (!formData.zip) errs.zip = 'Postal code is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderComplete(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {}

      clearCart();
    }, 1200);
  };

  // Order Success Modal / View
  if (orderComplete) {
    return (
      <div className="py-16 bg-[#F5F8FC] min-h-screen">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                Payment Confirmed
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B72] mt-1">
                Thank You for Your Order!
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                We've sent a detailed receipt and tracking confirmation link to{' '}
                <strong className="text-slate-800">{formData.email}</strong>.
              </p>
            </div>

            {/* Order Details Card */}
            <div className="bg-[#F5F8FC] p-4 rounded-2xl border border-slate-200/80 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Order Number:</span>
                <span className="font-mono font-bold text-[#123B72]">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Estimated Delivery:</span>
                <span className="font-semibold text-slate-800">
                  {deliveryMethod === 'express' ? '1–2 Business Days' : '3–5 Business Days'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Shipping Address:</span>
                <span className="font-semibold text-slate-800 text-right">
                  {formData.address}, {formData.city}, {formData.state} {formData.zip}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const shippingCost = deliveryMethod === 'express' ? 14.99 : shippingFee;
  const finalTotal = subtotal - discountAmount + shippingCost;

  return (
    <div className="py-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B72]">
            Secure Checkout
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete your order with encrypted payment and verified fast dispatch.
          </p>
        </div>

        {/* 2-Column Layout */}
        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Contact, Shipping, Delivery, Payment */}
            <div className="lg:col-span-7 space-y-8">
              {/* Test Mode Prototype Banner */}
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>
                  <strong>Prototype Checkout:</strong> Live test mode active. No actual charges will be incurred.
                </span>
              </div>

              {/* 1. Contact Information */}
              <div className="space-y-4">
                <h2 className="text-base font-bold text-[#123B72] pb-2 border-b border-slate-100">
                  1. Contact Information
                </h2>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#2563EB]"
                  />
                  {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* 2. Shipping Address */}
              <div className="space-y-4">
                <h2 className="text-base font-bold text-[#123B72] pb-2 border-b border-slate-100">
                  2. Shipping Address
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      First Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#2563EB]"
                    />
                    {errors.firstName && <p className="text-[11px] text-rose-500 mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Last Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#2563EB]"
                    />
                    {errors.lastName && <p className="text-[11px] text-rose-500 mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Street Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#2563EB]"
                  />
                  {errors.address && <p className="text-[11px] text-rose-500 mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      City <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Postal Code <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Delivery Method */}
              <div className="space-y-4">
                <h2 className="text-base font-bold text-[#123B72] pb-2 border-b border-slate-100">
                  3. Delivery Method
                </h2>
                <div className="space-y-2">
                  <label
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      deliveryMethod === 'standard'
                        ? 'border-[#2563EB] bg-blue-50/40 ring-1 ring-[#2563EB]'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'standard'}
                        onChange={() => setDeliveryMethod('standard')}
                        className="text-[#2563EB] focus:ring-[#2563EB]"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">
                          Standard Tracked Courier (3–5 Days)
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Free on orders over $150
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-800">
                      {shippingFee === 0 ? 'FREE' : formatCurrency(shippingFee)}
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      deliveryMethod === 'express'
                        ? 'border-[#2563EB] bg-blue-50/40 ring-1 ring-[#2563EB]'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'express'}
                        onChange={() => setDeliveryMethod('express')}
                        className="text-[#2563EB] focus:ring-[#2563EB]"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">
                          Priority Air Express (1–2 Days)
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Guaranteed morning delivery
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-800">$14.99</span>
                  </label>
                </div>
              </div>

              {/* 4. Payment Method */}
              <div className="space-y-4">
                <h2 className="text-base font-bold text-[#123B72] pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span>4. Payment Method</span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                    <Lock className="w-3.5 h-3.5" />
                    256-Bit SSL Encrypted
                  </span>
                </h2>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'paypal', label: 'PayPal', icon: ShieldCheck },
                    { id: 'apple', label: 'Apple Pay', icon: Sparkles },
                  ].map((p) => {
                    const Icon = p.icon;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPaymentMethod(p.id)}
                        className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          paymentMethod === p.id
                            ? 'border-[#2563EB] bg-blue-50/50 text-[#123B72] ring-1 ring-[#2563EB]'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-[#2563EB]" />
                        <span>{p.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Card Fields Mockup */}
                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-2xl bg-[#F5F8FC] border border-slate-200 space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        readOnly
                        value="•••• •••• •••• 4242 (Test Card)"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          readOnly
                          value="12 / 28"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          readOnly
                          value="888"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary Preview */}
            <div className="lg:col-span-5 bg-[#F5F8FC] p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6 sticky top-24">
              <h2 className="text-base font-bold text-[#123B72] pb-3 border-b border-slate-200">
                Order Items ({cartItems.length})
              </h2>

              {/* Items List Thumbnail */}
              <div className="divide-y divide-slate-200/60 max-h-64 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.key} className="py-3 flex items-center gap-3 text-xs">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 truncate">{item.title}</h4>
                      {item.variant && (
                        <p className="text-[11px] text-slate-500">{item.variant.name}</p>
                      )}
                      <p className="text-slate-500 text-[11px]">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-[#123B72]">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing Totals */}
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
                  <span>{shippingCost === 0 ? <strong className="text-emerald-600">FREE</strong> : formatCurrency(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#123B72] pt-3 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span>{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <Button
                variant="primary"
                size="lg"
                type="submit"
                loading={isSubmitting}
                className="w-full flex items-center justify-center gap-2"
              >
                <span>Complete Purchase ({formatCurrency(finalTotal)})</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>30-Day Money Back Guarantee & 2-Year Warranty</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
