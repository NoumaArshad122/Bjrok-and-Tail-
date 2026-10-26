import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, CheckCircle2 } from 'lucide-react';
import { saveProductReview } from '../../data/mockReviews';

export default function WriteReviewModal({ isOpen, onClose, product, onReviewSubmitted }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [ritual, setRitual] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (author && title && comment) {
      const newReview = {
        id: `rev-${Date.now()}`,
        author: author.trim(),
        location: location.trim() || 'Verified Client',
        verified: true,
        rating,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        title: title.trim(),
        comment: comment.trim(),
        ritual: ritual.trim() || 'Daily botanical ritual',
        helpful: 1,
      };

      saveProductReview(product.id, newReview);
      setSubmitted(true);
      if (onReviewSubmitted) {
        onReviewSubmitted(newReview);
      }
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setAuthor('');
    setTitle('');
    setComment('');
    setRitual('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="fixed inset-0" onClick={handleClose} aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-[#FBF9F5] rounded-[2rem] border border-[#EBE6DC] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#1A3326] text-[#FBF9F5] flex items-center justify-between border-b border-[#2B4E3C]">
            <div>
              <h3 className="font-botanical text-xl font-bold text-white leading-none">
                Submit Client Appraisal
              </h3>
              <span className="text-[11px] text-[#7D9678] tracking-widest uppercase font-semibold block mt-1">
                {product.title}
              </span>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-white/10 text-[#DCE4DA] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#7D9678]">
                    Appraisal Published
                  </span>
                  <h4 className="font-botanical text-2xl font-bold text-[#1A3326]">
                    Tack Så Mycket, {author}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Your formulation experience has been permanently recorded in the dispensary archive to guide fellow patrons.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  Return to Formulation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Star Rating Selector */}
                <div>
                  <label className="text-[11px] font-bold text-[#1A3326] uppercase tracking-wider block mb-1.5">
                    Your Formulation Rating
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 cursor-pointer transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            (hoverRating || rating) >= star
                              ? 'text-[#C26747] fill-[#C26747]'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 font-semibold text-[#1A3326]">
                      {rating} out of 5 stars
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-[#1A3326] uppercase tracking-wider block mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Linnea Holm"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#EBE6DC] text-xs text-[#1A3326] focus:outline-none focus:border-[#C26747]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#1A3326] uppercase tracking-wider block mb-1">
                      City, Country
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Stockholm, Sweden"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#EBE6DC] text-xs text-[#1A3326] focus:outline-none focus:border-[#C26747]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#1A3326] uppercase tracking-wider block mb-1">
                    Headline / Summary of Experience
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Visible barrier restoration within 10 days"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#EBE6DC] text-xs text-[#1A3326] focus:outline-none focus:border-[#C26747]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#1A3326] uppercase tracking-wider block mb-1">
                    Personal Ritual / Application Method
                  </label>
                  <input
                    type="text"
                    value={ritual}
                    onChange={(e) => setRitual(e.target.value)}
                    placeholder="e.g. 4 drops pressed into cheekbones after morning mist"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#EBE6DC] text-xs text-[#1A3326] focus:outline-none focus:border-[#C26747]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#1A3326] uppercase tracking-wider block mb-1">
                    Detailed Formulation Review
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe aroma, texture, absorption, and results on your skin..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#EBE6DC] text-xs text-[#1A3326] focus:outline-none focus:border-[#C26747] resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-2.5 rounded-full border border-[#EBE6DC] text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white font-semibold shadow-md transition-colors cursor-pointer"
                  >
                    Publish Verified Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
