import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FEATURED_SLIDES = [
  {
    id: 'nordic-1',
    slug: 'arctic-birch-chaga-elixir',
    title: 'Arctic Birch & Chaga Restorative Elixir',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=1200&auto=format&fit=crop&q=85',
  },
  {
    id: 'nordic-2',
    slug: 'cloudberry-forest-rescue-balm',
    title: 'Wild Cloudberry Rescue & Barrier Balm',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&auto=format&fit=crop&q=85',
  },
  {
    id: 'nordic-3',
    slug: 'sea-buckthorn-radiant-facial-nectar',
    title: 'Sea Buckthorn Radiant Facial Nectar',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=1200&auto=format&fit=crop&q=85',
  },
  {
    id: 'nordic-4',
    slug: 'pine-needle-chamomile-calming-tea',
    title: 'Scots Pine & Meadow Chamomile Calming Infusion',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1200&auto=format&fit=crop&q=85',
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 1.02,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.98,
  }),
};

export default function FeaturedHeroSlider() {
  const [[page, direction], setPage] = useState([0, 1]);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex = ((page % FEATURED_SLIDES.length) + FEATURED_SLIDES.length) % FEATURED_SLIDES.length;
  const currentSlide = FEATURED_SLIDES[currentIndex];

  const paginate = React.useCallback((newDirection) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  const jumpToSlide = (idx) => {
    const dir = idx > currentIndex ? 1 : -1;
    setPage([idx, dir]);
  };

  // Auto-slide cycle with calm luxury pacing
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, paginate]);

  return (
    <div
      className="group relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[5/4] rounded-[2rem] overflow-hidden border border-[#EBE6DC] shadow-2xl shadow-[#1A3326]/10 bg-[#EFF4EE]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient warm atmospheric glow behind image */}
      <div className="absolute -inset-1 bg-gradient-to-tr from-[#C26747]/15 via-[#7D9678]/10 to-transparent blur-xl pointer-events-none -z-10" />

      {/* Main Sliding Picture Showcase */}
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
              opacity: { duration: 0.5, ease: 'easeInOut' },
              scale: { duration: 0.5, ease: 'easeOut' },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Link
              to={`/product/${currentSlide.slug}`}
              className="block w-full h-full cursor-pointer select-none"
              title={`View ${currentSlide.title}`}
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle luxury vignette to anchor picture */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5 pointer-events-none" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subtle minimalist hover navigation arrows */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          paginate(-1);
        }}
        aria-label="Previous slide"
        className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-[#1A3326]/90 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-md"
      >
        <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          paginate(1);
        }}
        aria-label="Next slide"
        className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 hover:bg-[#1A3326]/90 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-md"
      >
        <ChevronRight className="w-5 h-5 stroke-[2.2]" />
      </button>

      {/* Sleek Minimalist Luxury Progress Indicator Dashes */}
      <div className="absolute bottom-4 inset-x-0 z-20 flex items-center justify-center gap-2 pointer-events-auto">
        {FEATURED_SLIDES.map((slide, idx) => {
          const isActive = currentIndex === idx;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => jumpToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'w-9 bg-white shadow-sm'
                  : 'w-4 bg-white/40 hover:bg-white/70'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
