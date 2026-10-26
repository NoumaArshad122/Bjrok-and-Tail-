import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: 'consultation',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      const generated = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generated);
      setSubmitted(true);
      // Persist inquiry
      try {
        const key = 'bjork_tall_inquiries';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.unshift({
          id: generated,
          ...form,
          date: new Date().toISOString(),
        });
        localStorage.setItem(key, JSON.stringify(existing));
      } catch (err) {
        console.warn('Could not save inquiry', err);
      }
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm({ name: '', email: '', topic: 'consultation', message: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-[2rem] border border-[#EBE6DC] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#1A3326] text-[#FBF9F5] flex items-center justify-between border-b border-[#2B4E3C]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C26747] text-white flex items-center justify-center font-botanical font-bold text-lg">
                B
              </div>
              <div>
                <h3 className="font-botanical text-xl sm:text-2xl font-bold text-white leading-none">
                  Apothecary Inquiries & Consultations
                </h3>
                <span className="text-[11px] text-[#7D9678] tracking-widest uppercase font-semibold block mt-1">
                  Dispensary Team • Direct Correspondence
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
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#7D9678]">
                    Inquiry Received
                  </span>
                  <h4 className="font-botanical text-2xl font-bold text-[#1A3326]">
                    Tack Så Mycket, {form.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Your inquiry has been routed to our botanical formulation team. A specialist will reply to{' '}
                    <strong className="text-[#1A3326]">{form.email}</strong> within 12 hours.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#EFF4EE] border border-[#DCE4DA] max-w-xs mx-auto text-xs font-mono font-bold text-[#1A3326]">
                  Reference Ticket: {ticketId}
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-white border border-[#EBE6DC] space-y-1">
                    <Mail className="w-4 h-4 text-[#7D9678]" />
                    <span className="font-bold text-[#1A3326] block">Direct Email</span>
                    <span className="text-slate-500 text-[11px]">apothecary@bjorktall.com</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-[#EBE6DC] space-y-1">
                    <Clock className="w-4 h-4 text-[#7D9678]" />
                    <span className="font-bold text-[#1A3326] block">Operating Hours</span>
                    <span className="text-slate-500 text-[11px]">Mon–Sat: 09:00–18:00 CET</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-[#EBE6DC] space-y-1">
                    <MapPin className="w-4 h-4 text-[#7D9678]" />
                    <span className="font-bold text-[#1A3326] block">Dispensary Lab</span>
                    <span className="text-slate-500 text-[11px]">Södermalm, Stockholm</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-[#1A3326] uppercase tracking-wider block mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Astrid Berg"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#EBE6DC] text-xs text-[#1A3326] focus:outline-none focus:border-[#C26747]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#1A3326] uppercase tracking-wider block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="astrid@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#EBE6DC] text-xs text-[#1A3326] focus:outline-none focus:border-[#C26747]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#1A3326] uppercase tracking-wider block mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#EBE6DC] text-xs text-[#1A3326] focus:outline-none focus:border-[#C26747]"
                    >
                      <option value="consultation">Botanical Skin Consultation & Pairing</option>
                      <option value="order">Order Tracking & Fulfillment Inquiry</option>
                      <option value="harvest">Wildcraft Harvesting & Ingredient Sourcing</option>
                      <option value="wholesale">Luxury Retail & Stockist Partnerships</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#1A3326] uppercase tracking-wider block mb-1">
                      Message & Details
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share your skin profile, inquiry details, or order reference..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#EBE6DC] text-xs text-[#1A3326] focus:outline-none focus:border-[#C26747] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white font-semibold text-xs flex items-center gap-2 shadow-md transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Botanical Inquiry</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
