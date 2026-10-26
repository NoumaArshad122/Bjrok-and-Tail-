import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  Smartphone,
  Wallet,
  CheckCircle2,
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export default function BotanicalPaymentModal({
  isOpen,
  onClose,
  total,
  subtotal,
  shippingFee,
  discountAmount,
  _isFreeShipping,
  cartItems,
  onOrderSuccess,
}) {
  const { activeRegion, formatRaw, regionId } = useCurrency();
  const isPK = regionId === 'PK';

  // Default payment channel based on region
  const [selectedMethod, setSelectedMethod] = useState(isPK ? 'cod' : 'card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState('');

  // Shipping Form
  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryNotes: '',
  });

  // Payment Form
  const [paymentForm, setPaymentForm] = useState({
    // Digital Wallets
    mobileNumber: '',
    cnic: '',
    digitalTag: '',
    // Card
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleValidation = () => {
    const errs = {};

    if (!shippingForm.fullName.trim() || shippingForm.fullName.trim().length < 3) {
      errs.fullName = 'Please enter your full name (minimum 3 characters)';
    }

    if (!shippingForm.email.trim() || !validateEmail(shippingForm.email)) {
      errs.email = 'Please enter a valid email address';
    }

    const cleanPhone = shippingForm.phone.replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 7) {
      errs.phone = 'Please enter a valid contact phone number';
    }

    if (!shippingForm.address.trim() || shippingForm.address.trim().length < 6) {
      errs.address = 'Please enter a complete delivery address';
    }

    if (!shippingForm.city.trim()) {
      errs.city = 'Please enter your destination city';
    }

    // Payment validation
    if (selectedMethod === 'card') {
      const cleanCard = paymentForm.cardNumber.replace(/\s/g, '');
      if (cleanCard.length < 15 || cleanCard.length > 19) {
        errs.cardNumber = 'Please enter a valid 16-digit card number';
      }
      if (!paymentForm.cardName.trim()) {
        errs.cardName = 'Name on card is required';
      }
      if (!/^\d{2}\/\d{2}$/.test(paymentForm.cardExpiry)) {
        errs.cardExpiry = 'Format: MM/YY';
      }
      if (!/^\d{3,4}$/.test(paymentForm.cardCvv)) {
        errs.cardCvv = 'CVV must be 3 or 4 digits';
      }
    }

    if (['jazzcash', 'easypaisa'].includes(selectedMethod)) {
      const cleanMob = paymentForm.mobileNumber.replace(/[\s-]/g, '');
      if (cleanMob.length < 10) {
        errs.mobileNumber = 'Enter a valid registered mobile account number';
      }
    }

    if (selectedMethod === 'nayapay') {
      if (!paymentForm.digitalTag.trim()) {
        errs.digitalTag = 'Please enter your NayaPay/SadaPay Nayatag or mobile number';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;

    setIsSubmitting(true);
    setSubmitStep('Verifying cold-chain inventory reservation...');
    await new Promise((r) => setTimeout(r, 600));

    setSubmitStep('Securing biophotonic packaging batch...');
    await new Promise((r) => setTimeout(r, 650));

    setSubmitStep('Authorizing dispatch token...');
    await new Promise((r) => setTimeout(r, 600));

    const prefix = isPK ? 'BT-PK' : 'BT-GL';
    const orderRef = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;

    const methodLabels = {
      cod: isPK ? 'Cash on Delivery (TCS Express)' : 'Cash on Delivery (Global Handover)',
      card: 'Debit / Credit Card (Visa/Mastercard 256-Bit)',
      apple_pay: 'Apple Pay Express Biometric',
      google_pay: 'Google Pay 1-Click',
      paypal: 'PayPal Verified Transfer',
      jazzcash: `JazzCash Mobile Account (${paymentForm.mobileNumber || 'Registered'})`,
      easypaisa: `EasyPaisa Direct Account (${paymentForm.mobileNumber || 'Registered'})`,
      nayapay: `NayaPay/SadaPay Tag (${paymentForm.digitalTag || 'Linked'})`,
      raast: 'Raast Instant State Bank Settlement',
    };

    const completedOrderData = {
      orderId: orderRef,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'Order Confirmed • Formulating in Södermalm Lab',
      courier: activeRegion.defaultCourier,
      trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      estimatedDelivery: isPK ? '2–3 business days' : '3–5 business days (DHL Express)',
      method: selectedMethod,
      paymentSummary: methodLabels[selectedMethod] || 'Authorized & Dispatched',
      subtotal,
      discountAmount: discountAmount || 0,
      shippingFee,
      total,
      currency: activeRegion.currency,
      currencySymbol: activeRegion.currencySymbol,
      shipping: { ...shippingForm },
      items: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        size: item.size,
        price: isPK ? Math.round(item.price * activeRegion.exchangeRate) : item.price,
        quantity: item.quantity,
        image: item.image,
      })),
    };

    // Save to persistent storage
    try {
      const stored = JSON.parse(localStorage.getItem('bjork_tall_orders') || '[]');
      stored.unshift(completedOrderData);
      localStorage.setItem('bjork_tall_orders', JSON.stringify(stored));
    } catch (err) {
      console.warn('Could not persist order to storage', err);
    }

    setIsSubmitting(false);
    onOrderSuccess(completedOrderData);
  };

  // Payment Options based on Region
  const availableMethods = isPK
    ? [
        { id: 'cod', name: 'Cash on Delivery', sub: 'Pay in cash upon courier handover', icon: Truck },
        { id: 'card', name: 'Debit / Credit Card', sub: 'Visa, Mastercard & UnionPay', icon: CreditCard },
        { id: 'jazzcash', name: 'JazzCash Wallet', sub: 'Instant mobile account payment', icon: Smartphone },
        { id: 'easypaisa', name: 'EasyPaisa Wallet', sub: 'Direct mobile wallet transfer', icon: Wallet },
        { id: 'nayapay', name: 'NayaPay / SadaPay', sub: 'Instant payment via tag or mobile', icon: Smartphone },
      ]
    : [
        { id: 'card', name: 'Credit / Debit Card', sub: 'Visa, Mastercard, Amex (Stripe 256-bit)', icon: CreditCard },
        { id: 'apple_pay', name: 'Apple Pay / Google Pay', sub: '1-click biometric authorization', icon: Smartphone },
        { id: 'paypal', name: 'PayPal Express', sub: 'Safe, buyer-protected transfer', icon: Wallet },
        { id: 'cod', name: 'Cash on Delivery', sub: 'Available for selected international routes', icon: Truck },
      ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-3xl bg-[#FBF9F5] rounded-[2rem] border border-[#EBE6DC] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#1A3326] text-[#FBF9F5] flex items-center justify-between border-b border-[#2B4E3C]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C26747] text-white flex items-center justify-center font-botanical font-bold text-lg">
                B
              </div>
              <div>
                <h3 className="font-botanical text-xl font-bold text-white leading-none">
                  Secure Dispensary Checkout
                </h3>
                <span className="text-[11px] text-[#7D9678] tracking-widest uppercase font-semibold block mt-1">
                  {activeRegion.label} • 256-Bit Encrypted Transfer
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="p-2 rounded-full hover:bg-white/10 text-[#DCE4DA] hover:text-white transition-colors cursor-pointer disabled:opacity-40"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Checkout Body */}
          <form onSubmit={handleSubmitOrder} className="overflow-y-auto p-6 sm:p-8 space-y-6 text-xs">
            {/* Step 1: Destination Address */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-[#EBE6DC]">
                <h4 className="font-botanical text-base font-bold text-[#1A3326]">
                  1. Delivery Destination & Contact
                </h4>
                <span className="text-[10px] text-slate-400 uppercase font-bold">
                  Cold-Chain Parcel Dispatch
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold text-[#1A3326] uppercase tracking-wider block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={shippingForm.fullName}
                    onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                    placeholder="e.g. Linnea Berg"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EBE6DC] text-[#1A3326] focus:outline-none focus:border-[#C26747]"
                  />
                  {errors.fullName && <span className="text-[10px] text-rose-600 block mt-0.5">{errors.fullName}</span>}
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#1A3326] uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={shippingForm.email}
                    onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EBE6DC] text-[#1A3326] focus:outline-none focus:border-[#C26747]"
                  />
                  {errors.email && <span className="text-[10px] text-rose-600 block mt-0.5">{errors.email}</span>}
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#1A3326] uppercase tracking-wider block mb-1">
                    Contact Mobile Number
                  </label>
                  <input
                    type="text"
                    value={shippingForm.phone}
                    onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                    placeholder={activeRegion.phonePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EBE6DC] text-[#1A3326] focus:outline-none focus:border-[#C26747]"
                  />
                  {errors.phone && <span className="text-[10px] text-rose-600 block mt-0.5">{errors.phone}</span>}
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#1A3326] uppercase tracking-wider block mb-1">
                    City & Region
                  </label>
                  <input
                    type="text"
                    value={shippingForm.city}
                    onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                    placeholder={isPK ? 'e.g. Karachi / Lahore / Islamabad' : 'e.g. Stockholm / New York / London'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EBE6DC] text-[#1A3326] focus:outline-none focus:border-[#C26747]"
                  />
                  {errors.city && <span className="text-[10px] text-rose-600 block mt-0.5">{errors.city}</span>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-[#1A3326] uppercase tracking-wider block mb-1">
                    Street Address & Apartment
                  </label>
                  <input
                    type="text"
                    value={shippingForm.address}
                    onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                    placeholder="House / Flat / Street address"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EBE6DC] text-[#1A3326] focus:outline-none focus:border-[#C26747]"
                  />
                  {errors.address && <span className="text-[10px] text-rose-600 block mt-0.5">{errors.address}</span>}
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between pb-1 border-b border-[#EBE6DC]">
                <h4 className="font-botanical text-base font-bold text-[#1A3326]">
                  2. Payment & Settlement Channel
                </h4>
                <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  SSL Certified
                </span>
              </div>

              {/* Method Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableMethods.map((meth) => {
                  const Icon = meth.icon;
                  const isSelected = selectedMethod === meth.id;

                  return (
                    <button
                      key={meth.id}
                      type="button"
                      onClick={() => setSelectedMethod(meth.id)}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-[#1A3326] text-white border-[#1A3326] shadow-sm'
                          : 'bg-white text-slate-700 border-[#EBE6DC] hover:border-slate-400'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-white/15 text-white' : 'bg-[#EFF4EE] text-[#1A3326]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-xs block leading-tight">{meth.name}</span>
                        <span
                          className={`text-[10px] block mt-0.5 truncate ${
                            isSelected ? 'text-[#DCE4DA]' : 'text-slate-400'
                          }`}
                        >
                          {meth.sub}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Payment Specific Input Fields */}
              <div className="p-4 rounded-2xl bg-white border border-[#EBE6DC] mt-3">
                {selectedMethod === 'card' && (
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold text-[#1A3326] block">
                      Cardholder Credentials (Stripe 256-Bit SSL)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          maxLength={19}
                          value={paymentForm.cardNumber}
                          onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                          placeholder="Card Number (4000 1234 5678 9010)"
                          className="w-full px-3.5 py-2 rounded-xl bg-[#FBF9F5] border border-[#EBE6DC] text-xs font-mono"
                        />
                        {errors.cardNumber && <span className="text-[10px] text-rose-600 block mt-0.5">{errors.cardNumber}</span>}
                      </div>

                      <div>
                        <input
                          type="text"
                          value={paymentForm.cardName}
                          onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                          placeholder="Name on Card"
                          className="w-full px-3.5 py-2 rounded-xl bg-[#FBF9F5] border border-[#EBE6DC] text-xs"
                        />
                        {errors.cardName && <span className="text-[10px] text-rose-600 block mt-0.5">{errors.cardName}</span>}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <input
                            type="text"
                            maxLength={5}
                            value={paymentForm.cardExpiry}
                            onChange={(e) => setPaymentForm({ ...paymentForm, cardExpiry: e.target.value })}
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 rounded-xl bg-[#FBF9F5] border border-[#EBE6DC] text-xs font-mono text-center"
                          />
                          {errors.cardExpiry && <span className="text-[9px] text-rose-600 block mt-0.5">{errors.cardExpiry}</span>}
                        </div>
                        <div>
                          <input
                            type="password"
                            maxLength={4}
                            value={paymentForm.cardCvv}
                            onChange={(e) => setPaymentForm({ ...paymentForm, cardCvv: e.target.value })}
                            placeholder="CVV"
                            className="w-full px-3 py-2 rounded-xl bg-[#FBF9F5] border border-[#EBE6DC] text-xs font-mono text-center"
                          />
                          {errors.cardCvv && <span className="text-[9px] text-rose-600 block mt-0.5">{errors.cardCvv}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {['jazzcash', 'easypaisa'].includes(selectedMethod) && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-[#1A3326] block">
                      {selectedMethod === 'jazzcash' ? 'JazzCash Mobile Account' : 'EasyPaisa Wallet'} Details
                    </span>
                    <input
                      type="text"
                      value={paymentForm.mobileNumber}
                      onChange={(e) => setPaymentForm({ ...paymentForm, mobileNumber: e.target.value })}
                      placeholder="Enter registered mobile number (e.g. 0300 1234567)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#EBE6DC] text-xs"
                    />
                    {errors.mobileNumber && <span className="text-[10px] text-rose-600 block">{errors.mobileNumber}</span>}
                    <p className="text-[10px] text-slate-500">
                      You will receive an in-app authorization prompt or USSD flash notification on your phone to confirm payment.
                    </p>
                  </div>
                )}

                {selectedMethod === 'nayapay' && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-[#1A3326] block">
                      NayaPay / SadaPay Tag
                    </span>
                    <input
                      type="text"
                      value={paymentForm.digitalTag}
                      onChange={(e) => setPaymentForm({ ...paymentForm, digitalTag: e.target.value })}
                      placeholder="e.g. @username or registered mobile number"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#EBE6DC] text-xs"
                    />
                    {errors.digitalTag && <span className="text-[10px] text-rose-600 block">{errors.digitalTag}</span>}
                  </div>
                )}

                {selectedMethod === 'cod' && (
                  <div className="flex items-start gap-2.5 text-xs text-slate-600">
                    <Truck className="w-4 h-4 text-[#C26747] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1A3326] block font-semibold">Cash on Delivery Handover:</strong>
                      <span>
                        Please inspect the temperature-sealed biophotonic parcel before handing exact cash to the courier representative.
                      </span>
                    </div>
                  </div>
                )}

                {['apple_pay', 'paypal'].includes(selectedMethod) && (
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Instant 1-Click Biometric Settlement linked to your default address and wallet.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-4 rounded-2xl bg-[#EFF4EE] border border-[#DCE4DA] space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>{formatRaw(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Promotional Savings</span>
                  <span>-{formatRaw(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>{activeRegion.defaultCourier}</span>
                <span>
                  {shippingFee === 0 ? <strong className="text-emerald-700">Complimentary</strong> : formatRaw(shippingFee)}
                </span>
              </div>

              <div className="pt-2 border-t border-[#DCE4DA] flex justify-between text-sm font-bold text-[#1A3326]">
                <span>Total Amount Due</span>
                <span className="text-[#C26747] text-base font-bold">{formatRaw(total)}</span>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="space-y-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">{submitStep || 'Processing Authorization...'}</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm & Authorize Order • {formatRaw(total)}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7D9678]" />
                <span>30-Day Freshness Guarantee • Clean Carbon-Neutral Dispatch</span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
