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
  AlertCircle,
  ArrowRight,
  Sparkles,
  Info,
  Check,
} from 'lucide-react';
import { formatCurrency } from '../../lib/formatCurrency';

export default function BotanicalPaymentModal({
  isOpen,
  onClose,
  total,
  subtotal,
  shippingFee,
  isFreeShipping,
  cartItems,
  onOrderSuccess,
}) {
  const [selectedMethod, setSelectedMethod] = useState('cod'); // 'cod' | 'jazzcash' | 'easypaisa' | 'nayapay' | 'card'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState('');

  // Shipping & Contact State
  const [shippingForm, setShippingForm] = useState({
    fullName: 'Astrid Lind',
    email: 'astrid.nordic@tundra.se',
    phone: '03001234567',
    address: 'Gulberg III, Street 7, Block B',
    city: 'Lahore',
    postalCode: '54000',
    deliveryNotes: '',
  });

  // Payment Specific State
  const [paymentForm, setPaymentForm] = useState({
    // JazzCash
    jazzMobile: '03011234567',
    jazzCnic: '123456',

    // EasyPaisa
    easypaisaMobile: '03451234567',
    easypaisaName: 'Astrid Lind',

    // NayaPay / SadaPay
    digitalProvider: 'nayapay', // 'nayapay' | 'sadapay'
    digitalTagOrMobile: '@astrid_nordic',

    // Card
    cardNumber: '4242 4242 4242 4242',
    cardName: 'ASTRID LIND',
    cardExpiry: '12/28',
    cardCvv: '888',
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  // Validation Helpers
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePakPhone = (phone) => /^(03\d{9}|\+923\d{9})$/.test(phone.replace(/[\s-]/g, ''));
  const validateExpiry = (exp) => {
    if (!/^\d{2}\/\d{2}$/.test(exp)) return false;
    const [month, year] = exp.split('/').map(Number);
    if (month < 1 || month > 12) return false;
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    return true;
  };

  const handleValidation = () => {
    const errs = {};

    // 1. Validate Shipping Details
    if (!shippingForm.fullName.trim() || shippingForm.fullName.trim().length < 3) {
      errs.fullName = 'Please enter your full name (at least 3 characters)';
    }

    if (!shippingForm.email.trim() || !validateEmail(shippingForm.email)) {
      errs.email = 'Please enter a valid email address';
    }

    const cleanPhone = shippingForm.phone.replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid contact phone number';
    }

    if (!shippingForm.address.trim() || shippingForm.address.trim().length < 5) {
      errs.address = 'Please enter a complete delivery address';
    }

    if (!shippingForm.city.trim()) {
      errs.city = 'Please enter your city';
    }

    if (!shippingForm.postalCode.trim() || shippingForm.postalCode.trim().length < 3) {
      errs.postalCode = 'Please enter postal code';
    }

    // 2. Validate Payment Specific Fields
    if (selectedMethod === 'jazzcash') {
      const jPhone = paymentForm.jazzMobile.replace(/[\s-]/g, '');
      if (!validatePakPhone(jPhone)) {
        errs.jazzMobile = 'Enter a valid 11-digit JazzCash account number (e.g. 03001234567)';
      }
      if (!/^\d{6}$/.test(paymentForm.jazzCnic.trim())) {
        errs.jazzCnic = 'Enter the last 6 digits of your registered CNIC';
      }
    } else if (selectedMethod === 'easypaisa') {
      const ePhone = paymentForm.easypaisaMobile.replace(/[\s-]/g, '');
      if (!validatePakPhone(ePhone)) {
        errs.easypaisaMobile = 'Enter a valid 11-digit EasyPaisa mobile number';
      }
      if (!paymentForm.easypaisaName.trim() || paymentForm.easypaisaName.trim().length < 3) {
        errs.easypaisaName = 'Enter the verified account holder name';
      }
    } else if (selectedMethod === 'nayapay') {
      const val = paymentForm.digitalTagOrMobile.trim();
      const isTag = val.startsWith('@') && val.length >= 3;
      const isMobile = validatePakPhone(val);
      if (!isTag && !isMobile) {
        errs.digitalTagOrMobile = 'Enter a valid Nayatag/Sadatag (e.g. @name) or 11-digit mobile';
      }
    } else if (selectedMethod === 'card') {
      const rawCard = paymentForm.cardNumber.replace(/\s/g, '');
      if (!/^\d{16}$/.test(rawCard)) {
        errs.cardNumber = 'Enter a valid 16-digit debit/credit card number';
      }
      if (!paymentForm.cardName.trim() || paymentForm.cardName.trim().length < 3) {
        errs.cardName = 'Enter cardholder name as printed on card';
      }
      if (!validateExpiry(paymentForm.cardExpiry)) {
        errs.cardExpiry = 'Enter valid expiry (MM/YY)';
      }
      if (!/^\d{3,4}$/.test(paymentForm.cardCvv.trim())) {
        errs.cardCvv = 'Enter 3 or 4 digit CVV';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!handleValidation()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStep('Securing payment protocol...');

    // Simulation of secure multi-step verification
    setTimeout(() => {
      if (selectedMethod === 'cod') {
        setSubmitStep('Generating COD consignment booking...');
      } else if (selectedMethod === 'jazzcash') {
        setSubmitStep('Connecting to JazzCash Gateway & dispatching MPIN prompt...');
      } else if (selectedMethod === 'easypaisa') {
        setSubmitStep('Verifying EasyPaisa Account balance & authorization...');
      } else if (selectedMethod === 'nayapay') {
        setSubmitStep(`Sending instant push authorization to ${paymentForm.digitalProvider === 'nayapay' ? 'NayaPay' : 'SadaPay'} app...`);
      } else {
        setSubmitStep('Authorizing 256-bit encrypted card charge...');
      }
    }, 700);

    setTimeout(() => {
      setSubmitStep('Order successfully confirmed!');
      setIsSubmitting(false);

      const generatedId = 'BOT-PK-' + Math.floor(100000 + Math.random() * 900000);

      // Construct payment metadata
      let paymentSummary = '';
      if (selectedMethod === 'cod') {
        paymentSummary = 'Cash on Delivery (Pay upon doorstep arrival)';
      } else if (selectedMethod === 'jazzcash') {
        paymentSummary = `JazzCash Account (${paymentForm.jazzMobile.slice(0, 4)}***${paymentForm.jazzMobile.slice(-3)})`;
      } else if (selectedMethod === 'easypaisa') {
        paymentSummary = `EasyPaisa Account (${paymentForm.easypaisaMobile.slice(0, 4)}***${paymentForm.easypaisaMobile.slice(-3)})`;
      } else if (selectedMethod === 'nayapay') {
        paymentSummary = `${paymentForm.digitalProvider === 'nayapay' ? 'NayaPay' : 'SadaPay'} (${paymentForm.digitalTagOrMobile})`;
      } else {
        paymentSummary = `Credit/Debit Card (Ending in ***${paymentForm.cardNumber.replace(/\s/g, '').slice(-4)})`;
      }

      onOrderSuccess({
        orderId: generatedId,
        method: selectedMethod,
        paymentSummary,
        shipping: shippingForm,
        total,
        subtotal,
        shippingFee,
        items: cartItems,
      });
    }, 1700);
  };

  // Card input formatters
  const handleCardNumberChange = (val) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const parts = raw.match(/[\s\S]{1,4}/g) || [];
    setPaymentForm((prev) => ({ ...prev, cardNumber: parts.join(' ') }));
    if (errors.cardNumber) setErrors((prev) => ({ ...prev, cardNumber: null }));
  };

  const handleExpiryChange = (val) => {
    let clean = val.replace(/\D/g, '').slice(0, 4);
    if (clean.length >= 3) {
      clean = clean.slice(0, 2) + '/' + clean.slice(2);
    }
    setPaymentForm((prev) => ({ ...prev, cardExpiry: clean }));
    if (errors.cardExpiry) setErrors((prev) => ({ ...prev, cardExpiry: null }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 10 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="w-full max-w-2xl bg-[#FBF9F5] rounded-[2rem] border border-[#EBE6DC] shadow-2xl overflow-hidden my-6"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#EBE6DC] flex items-center justify-between bg-white/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7D9678] animate-ping" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#7D9678]">
                Verified Dispensary Gateway
              </span>
            </div>
            <h2 className="font-botanical text-xl sm:text-2xl font-bold text-[#1A3326] mt-0.5">
              Secure Checkout & Payment
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout modal"
            className="p-2 rounded-full hover:bg-[#EBE6DC] text-slate-500 hover:text-[#1A3326] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-6 text-xs max-h-[78vh] overflow-y-auto">
          {/* Section 1: Delivery Information */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-botanical text-base font-bold text-[#1A3326] flex items-center gap-1.5">
                <span>1. Shipping Destination & Contact</span>
              </h3>
              <span className="text-[10px] text-slate-500 font-medium">All fields required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Full Name */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  value={shippingForm.fullName}
                  onChange={(e) => {
                    setShippingForm({ ...shippingForm, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: null });
                  }}
                  placeholder="e.g. Astrid Lind"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-[#1A3326] transition-all focus:outline-none ${
                    errors.fullName
                      ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                      : 'border-[#EBE6DC] focus:border-[#C26747]'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Email Address (Receipt & Tracking) *
                </label>
                <input
                  type="email"
                  value={shippingForm.email}
                  onChange={(e) => {
                    setShippingForm({ ...shippingForm, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                  placeholder="name@example.com"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-[#1A3326] transition-all focus:outline-none ${
                    errors.email
                      ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                      : 'border-[#EBE6DC] focus:border-[#C26747]'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Mobile Number (Delivery & OTP) *
                </label>
                <input
                  type="tel"
                  value={shippingForm.phone}
                  onChange={(e) => {
                    setShippingForm({ ...shippingForm, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: null });
                  }}
                  placeholder="03001234567"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-[#1A3326] transition-all focus:outline-none ${
                    errors.phone
                      ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                      : 'border-[#EBE6DC] focus:border-[#C26747]'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">City / Region *</label>
                <input
                  type="text"
                  value={shippingForm.city}
                  onChange={(e) => {
                    setShippingForm({ ...shippingForm, city: e.target.value });
                    if (errors.city) setErrors({ ...errors, city: null });
                  }}
                  placeholder="e.g. Lahore / Karachi / Islamabad"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-[#1A3326] transition-all focus:outline-none ${
                    errors.city
                      ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                      : 'border-[#EBE6DC] focus:border-[#C26747]'
                  }`}
                />
                {errors.city && (
                  <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.city}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Street Address & House / Flat No. *
              </label>
              <input
                type="text"
                value={shippingForm.address}
                onChange={(e) => {
                  setShippingForm({ ...shippingForm, address: e.target.value });
                  if (errors.address) setErrors({ ...errors, address: null });
                }}
                placeholder="House 14, Street 7, Block B, Society"
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-[#1A3326] transition-all focus:outline-none ${
                  errors.address
                    ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                    : 'border-[#EBE6DC] focus:border-[#C26747]'
                }`}
              />
              {errors.address && (
                <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.address}</span>
                </p>
              )}
            </div>

            {/* Postal Code & Notes Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Postal Code *</label>
                <input
                  type="text"
                  value={shippingForm.postalCode}
                  onChange={(e) => {
                    setShippingForm({ ...shippingForm, postalCode: e.target.value });
                    if (errors.postalCode) setErrors({ ...errors, postalCode: null });
                  }}
                  placeholder="54000"
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-[#1A3326] transition-all focus:outline-none ${
                    errors.postalCode
                      ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                      : 'border-[#EBE6DC] focus:border-[#C26747]'
                  }`}
                />
                {errors.postalCode && (
                  <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.postalCode}</span>
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">
                  Courier Special Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={shippingForm.deliveryNotes}
                  onChange={(e) =>
                    setShippingForm({ ...shippingForm, deliveryNotes: e.target.value })
                  }
                  placeholder="e.g. Call before arrival, leave with security"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE6DC] bg-white text-[#1A3326] focus:outline-none focus:border-[#C26747]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Method Selection */}
          <div className="space-y-3.5 pt-3 border-t border-[#EBE6DC]">
            <div className="flex items-center justify-between">
              <h3 className="font-botanical text-base font-bold text-[#1A3326]">
                2. Select Verified Payment Channel
              </h3>
              <span className="text-[10px] text-[#7D9678] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>256-bit Secure Gateway</span>
              </span>
            </div>

            {/* Payment Method Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
              {/* Option 1: Cash on Delivery (COD) */}
              <button
                type="button"
                onClick={() => {
                  setSelectedMethod('cod');
                  setErrors({});
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedMethod === 'cod'
                    ? 'border-[#C26747] bg-[#C26747]/10 ring-2 ring-[#C26747]/20 shadow-sm'
                    : 'border-[#EBE6DC] bg-white hover:border-[#7D9678]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-[#EFF4EE] text-[#1A3326] flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                  {selectedMethod === 'cod' && (
                    <span className="w-4 h-4 rounded-full bg-[#C26747] text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div>
                  <span className="font-bold text-[#1A3326] block leading-snug">
                    Cash on Delivery
                  </span>
                  <span className="text-[10px] text-slate-500">Pay at Door</span>
                </div>
              </button>

              {/* Option 2: JazzCash */}
              <button
                type="button"
                onClick={() => {
                  setSelectedMethod('jazzcash');
                  setErrors({});
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedMethod === 'jazzcash'
                    ? 'border-[#D32F2F] bg-red-50/60 ring-2 ring-red-400/20 shadow-sm'
                    : 'border-[#EBE6DC] bg-white hover:border-[#D32F2F]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-red-100 text-[#D32F2F] flex items-center justify-center font-black text-xs">
                    JC
                  </div>
                  {selectedMethod === 'jazzcash' && (
                    <span className="w-4 h-4 rounded-full bg-[#D32F2F] text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div>
                  <span className="font-bold text-[#1A3326] block leading-snug">
                    JazzCash
                  </span>
                  <span className="text-[10px] text-slate-500">Mobile Wallet</span>
                </div>
              </button>

              {/* Option 3: EasyPaisa */}
              <button
                type="button"
                onClick={() => {
                  setSelectedMethod('easypaisa');
                  setErrors({});
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedMethod === 'easypaisa'
                    ? 'border-[#00A859] bg-emerald-50/60 ring-2 ring-emerald-400/20 shadow-sm'
                    : 'border-[#EBE6DC] bg-white hover:border-[#00A859]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#00A859] flex items-center justify-center font-black text-xs">
                    EP
                  </div>
                  {selectedMethod === 'easypaisa' && (
                    <span className="w-4 h-4 rounded-full bg-[#00A859] text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div>
                  <span className="font-bold text-[#1A3326] block leading-snug">
                    EasyPaisa
                  </span>
                  <span className="text-[10px] text-slate-500">Telenor Wallet</span>
                </div>
              </button>

              {/* Option 4: NayaPay / SadaPay */}
              <button
                type="button"
                onClick={() => {
                  setSelectedMethod('nayapay');
                  setErrors({});
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedMethod === 'nayapay'
                    ? 'border-[#00838F] bg-cyan-50/60 ring-2 ring-cyan-400/20 shadow-sm'
                    : 'border-[#EBE6DC] bg-white hover:border-[#00838F]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-100 text-[#00838F] flex items-center justify-center font-black text-xs">
                    NP
                  </div>
                  {selectedMethod === 'nayapay' && (
                    <span className="w-4 h-4 rounded-full bg-[#00838F] text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div>
                  <span className="font-bold text-[#1A3326] block leading-snug">
                    NayaPay / Sada
                  </span>
                  <span className="text-[10px] text-slate-500">Digital Acc</span>
                </div>
              </button>

              {/* Option 5: Card */}
              <button
                type="button"
                onClick={() => {
                  setSelectedMethod('card');
                  setErrors({});
                }}
                className={`col-span-2 sm:col-span-1 p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedMethod === 'card'
                    ? 'border-[#1A3326] bg-[#1A3326]/5 ring-2 ring-[#1A3326]/20 shadow-sm'
                    : 'border-[#EBE6DC] bg-white hover:border-[#1A3326]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-[#EFF4EE] text-[#1A3326] flex items-center justify-center">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  {selectedMethod === 'card' && (
                    <span className="w-4 h-4 rounded-full bg-[#1A3326] text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div>
                  <span className="font-bold text-[#1A3326] block leading-snug">
                    Credit / Debit
                  </span>
                  <span className="text-[10px] text-slate-500">Visa • Master</span>
                </div>
              </button>
            </div>

            {/* Dynamic Payment Specific Fields Panel */}
            <div className="p-4 sm:p-5 rounded-2xl border border-[#EBE6DC] bg-white shadow-sm space-y-3">
              {/* 1. COD Panel */}
              {selectedMethod === 'cod' && (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 text-amber-900">
                    <Truck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-xs text-amber-900">
                        Cash on Delivery Policy
                      </p>
                      <p className="text-[11px] text-amber-800 leading-relaxed mt-0.5">
                        Please keep the exact amount (<strong>{formatCurrency(total)}</strong>) ready in cash. Our verified courier will provide an official dispensary receipt upon handover.
                      </p>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>No advance payment needed. Free carbon-neutral transit insured.</span>
                  </div>
                </div>
              )}

              {/* 2. JazzCash Panel */}
              {selectedMethod === 'jazzcash' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-semibold text-[#D32F2F] flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5" />
                      JazzCash Mobile Account Checkout
                    </span>
                    <span className="text-[10px] bg-red-100 text-[#D32F2F] px-2 py-0.5 rounded-full font-bold">
                      Direct MPIN
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Registered JazzCash Mobile *
                      </label>
                      <input
                        type="tel"
                        value={paymentForm.jazzMobile}
                        onChange={(e) => {
                          setPaymentForm({ ...paymentForm, jazzMobile: e.target.value });
                          if (errors.jazzMobile) setErrors({ ...errors, jazzMobile: null });
                        }}
                        placeholder="03001234567"
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-[#1A3326] focus:outline-none ${
                          errors.jazzMobile
                            ? 'border-rose-400 ring-1 ring-rose-200'
                            : 'border-[#EBE6DC] focus:border-[#D32F2F]'
                        }`}
                      />
                      {errors.jazzMobile && (
                        <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.jazzMobile}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        CNIC Last 6 Digits (Security Check) *
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={paymentForm.jazzCnic}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                          setPaymentForm({ ...paymentForm, jazzCnic: val });
                          if (errors.jazzCnic) setErrors({ ...errors, jazzCnic: null });
                        }}
                        placeholder="e.g. 543210"
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-[#1A3326] focus:outline-none ${
                          errors.jazzCnic
                            ? 'border-rose-400 ring-1 ring-rose-200'
                            : 'border-[#EBE6DC] focus:border-[#D32F2F]'
                        }`}
                      />
                      {errors.jazzCnic && (
                        <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.jazzCnic}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-red-50/70 border border-red-200/60 text-[11px] text-red-900 flex items-start gap-2">
                    <Info className="w-4 h-4 text-[#D32F2F] shrink-0 mt-0.5" />
                    <span>
                      After clicking confirm, an authorization prompt will appear on your phone screen. Please enter your 4-digit JazzCash MPIN to approve <strong>{formatCurrency(total)}</strong>.
                    </span>
                  </div>
                </div>
              )}

              {/* 3. EasyPaisa Panel */}
              {selectedMethod === 'easypaisa' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-semibold text-[#00A859] flex items-center gap-1.5">
                      <Wallet className="w-3.5 h-3.5" />
                      EasyPaisa Mobile Account Checkout
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-[#00A859] px-2 py-0.5 rounded-full font-bold">
                      App & USSD
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        EasyPaisa Account Number *
                      </label>
                      <input
                        type="tel"
                        value={paymentForm.easypaisaMobile}
                        onChange={(e) => {
                          setPaymentForm({ ...paymentForm, easypaisaMobile: e.target.value });
                          if (errors.easypaisaMobile)
                            setErrors({ ...errors, easypaisaMobile: null });
                        }}
                        placeholder="03451234567"
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-[#1A3326] focus:outline-none ${
                          errors.easypaisaMobile
                            ? 'border-rose-400 ring-1 ring-rose-200'
                            : 'border-[#EBE6DC] focus:border-[#00A859]'
                        }`}
                      />
                      {errors.easypaisaMobile && (
                        <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.easypaisaMobile}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Account Holder Name *
                      </label>
                      <input
                        type="text"
                        value={paymentForm.easypaisaName}
                        onChange={(e) => {
                          setPaymentForm({ ...paymentForm, easypaisaName: e.target.value });
                          if (errors.easypaisaName)
                            setErrors({ ...errors, easypaisaName: null });
                        }}
                        placeholder="Full Name as in EasyPaisa"
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-[#1A3326] focus:outline-none ${
                          errors.easypaisaName
                            ? 'border-rose-400 ring-1 ring-rose-200'
                            : 'border-[#EBE6DC] focus:border-[#00A859]'
                        }`}
                      />
                      {errors.easypaisaName && (
                        <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.easypaisaName}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-[11px] text-emerald-900 flex items-start gap-2">
                    <Info className="w-4 h-4 text-[#00A859] shrink-0 mt-0.5" />
                    <span>
                      Please unlock your EasyPaisa app or approve the incoming USSD popup request for <strong>{formatCurrency(total)}</strong>.
                    </span>
                  </div>
                </div>
              )}

              {/* 4. NayaPay / SadaPay Panel */}
              {selectedMethod === 'nayapay' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-semibold text-[#00838F] flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5" />
                      Digital Wallet Authorization
                    </span>
                    {/* Toggle Provider */}
                    <div className="flex items-center gap-1 p-0.5 rounded-full bg-[#EFF4EE] border border-[#EBE6DC]">
                      <button
                        type="button"
                        onClick={() =>
                          setPaymentForm({
                            ...paymentForm,
                            digitalProvider: 'nayapay',
                            digitalTagOrMobile: '@astrid_nordic',
                          })
                        }
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                          paymentForm.digitalProvider === 'nayapay'
                            ? 'bg-[#00838F] text-white shadow-sm'
                            : 'text-slate-600 hover:text-[#00838F]'
                        }`}
                      >
                        NayaPay
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setPaymentForm({
                            ...paymentForm,
                            digitalProvider: 'sadapay',
                            digitalTagOrMobile: '@astrid_sada',
                          })
                        }
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                          paymentForm.digitalProvider === 'sadapay'
                            ? 'bg-[#FF5A5F] text-white shadow-sm'
                            : 'text-slate-600 hover:text-[#FF5A5F]'
                        }`}
                      >
                        SadaPay
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {paymentForm.digitalProvider === 'nayapay' ? 'Nayatag' : 'Sadatag'} or Registered Mobile *
                    </label>
                    <input
                      type="text"
                      value={paymentForm.digitalTagOrMobile}
                      onChange={(e) => {
                        setPaymentForm({ ...paymentForm, digitalTagOrMobile: e.target.value });
                        if (errors.digitalTagOrMobile)
                          setErrors({ ...errors, digitalTagOrMobile: null });
                      }}
                      placeholder={paymentForm.digitalProvider === 'nayapay' ? '@username or 03001234567' : '@sadatag or 03001234567'}
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-[#1A3326] focus:outline-none ${
                        errors.digitalTagOrMobile
                          ? 'border-rose-400 ring-1 ring-rose-200'
                          : 'border-[#EBE6DC] focus:border-[#00838F]'
                      }`}
                    />
                    {errors.digitalTagOrMobile && (
                      <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.digitalTagOrMobile}</span>
                      </p>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-50/70 border border-cyan-200/60 text-[11px] text-cyan-950 flex items-start gap-2">
                    <Info className="w-4 h-4 text-[#00838F] shrink-0 mt-0.5" />
                    <span>
                      An instant in-app payment request will be sent to your {paymentForm.digitalProvider === 'nayapay' ? 'NayaPay' : 'SadaPay'} account. Simply tap "Approve" inside your app.
                    </span>
                  </div>
                </div>
              )}

              {/* 5. Card Panel */}
              {selectedMethod === 'card' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-semibold text-[#1A3326] flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-[#C26747]" />
                      256-Bit Encrypted Card Terminal
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Visa • Mastercard • PayPak
                    </span>
                  </div>

                  {/* Card Number */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      16-Digit Card Number *
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      value={paymentForm.cardNumber}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-[#1A3326] font-mono focus:outline-none ${
                        errors.cardNumber
                          ? 'border-rose-400 ring-1 ring-rose-200'
                          : 'border-[#EBE6DC] focus:border-[#C26747]'
                      }`}
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.cardNumber}</span>
                      </p>
                    )}
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      value={paymentForm.cardName}
                      onChange={(e) => {
                        setPaymentForm({ ...paymentForm, cardName: e.target.value.toUpperCase() });
                        if (errors.cardName) setErrors({ ...errors, cardName: null });
                      }}
                      placeholder="ASTRID LIND"
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-[#1A3326] tracking-wide focus:outline-none ${
                        errors.cardName
                          ? 'border-rose-400 ring-1 ring-rose-200'
                          : 'border-[#EBE6DC] focus:border-[#C26747]'
                      }`}
                    />
                    {errors.cardName && (
                      <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.cardName}</span>
                      </p>
                    )}
                  </div>

                  {/* Expiry & CVV */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Expiration (MM/YY) *
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={paymentForm.cardExpiry}
                        onChange={(e) => handleExpiryChange(e.target.value)}
                        placeholder="MM/YY"
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-[#1A3326] font-mono focus:outline-none ${
                          errors.cardExpiry
                            ? 'border-rose-400 ring-1 ring-rose-200'
                            : 'border-[#EBE6DC] focus:border-[#C26747]'
                        }`}
                      />
                      {errors.cardExpiry && (
                        <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.cardExpiry}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Security Code (CVV) *
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={paymentForm.cardCvv}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                          setPaymentForm({ ...paymentForm, cardCvv: val });
                          if (errors.cardCvv) setErrors({ ...errors, cardCvv: null });
                        }}
                        placeholder="•••"
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-[#1A3326] font-mono focus:outline-none ${
                          errors.cardCvv
                            ? 'border-rose-400 ring-1 ring-rose-200'
                            : 'border-[#EBE6DC] focus:border-[#C26747]'
                        }`}
                      />
                      {errors.cardCvv && (
                        <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.cardCvv}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Order Cost Breakdown Preview */}
          <div className="p-4 rounded-2xl bg-[#EFF4EE] border border-[#DCE4DA] space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Botanical Formulations Subtotal</span>
              <span className="font-semibold text-[#1A3326]">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Carbon-Neutral Transit</span>
              <span>
                {isFreeShipping ? (
                  <strong className="text-[#7D9678] font-bold">Complimentary (Over $75)</strong>
                ) : (
                  formatCurrency(shippingFee)
                )}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#1A3326] pt-2 border-t border-[#DCE4DA]">
              <span>Grand Total Due</span>
              <span className="text-[#C26747]">{formatCurrency(total)}</span>
            </div>
          </div>

          {/* Verification / Security Badge */}
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#7D9678]" />
              <span>TLS 1.3 End-to-End Encrypted</span>
            </div>
            <span>Lapland Dispensary Standard</span>
          </div>

          {/* Submit Action Button with Status Emitter */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-full bg-[#C26747] hover:bg-[#1A3326] text-white font-semibold text-xs sm:text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{submitStep || 'Processing Payment...'}</span>
              </div>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {selectedMethod === 'cod'
                    ? `Confirm Cash on Delivery Order • ${formatCurrency(total)}`
                    : `Pay & Place Order • ${formatCurrency(total)}`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
