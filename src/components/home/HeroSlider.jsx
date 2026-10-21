import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../../data/banners';
import Button from '../ui/Button';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = HERO_SLIDES[currentSlide];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#F5F8FC] to-white py-12 lg:py-20 border-b border-slate-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center min-h-[480px]">
          {/* Text Content Area */}
          <div className="lg:col-span-7 space-y-6 z-10 animate-in fade-in slide-in-from-left duration-500">
            {/* Tagline & Badge */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100/80 text-[#2563EB] border border-blue-200">
                <Sparkles className="w-3.5 h-3.5" />
                {slide.tagline}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E53935] text-white shadow-sm shadow-red-500/25">
                {slide.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#123B72] tracking-tight leading-[1.1]">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
              {slide.description}
            </p>

            {/* Pricing highlights */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl sm:text-4xl font-black text-[#123B72]">
                ${slide.price}
              </span>
              {slide.compareAtPrice && (
                <span className="text-base text-slate-400 line-through">
                  ${slide.compareAtPrice}
                </span>
              )}
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                In Stock & Ready to Ship
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-3 flex-wrap">
              <Link to={slide.ctaLink}>
                <Button variant="primary" size="lg" className="gap-2">
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to={slide.secondaryCtaLink}>
                <Button variant="secondary" size="lg">
                  {slide.secondaryCtaText}
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Showcase Area */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient blur behind image */}
            <div className="absolute w-72 h-72 rounded-full bg-blue-400/20 blur-3xl -z-10" />

            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/15 border-4 border-white group">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

              {/* Floating review chip */}
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800">
                  Rated 4.9/5 by 300+ Verified Buyers
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Controls: Arrows & Indicators */}
        <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-200/60">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx
                    ? 'w-8 bg-[#2563EB]'
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#2563EB] hover:border-[#2563EB] transition-colors cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#2563EB] hover:border-[#2563EB] transition-colors cursor-pointer shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
