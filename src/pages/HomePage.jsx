import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import CategoryTiles from '../components/home/CategoryTiles';
import FlashSale from '../components/home/FlashSale';
import PromoBanner from '../components/home/PromoBanner';
import ProductCarousel from '../components/home/ProductCarousel';
import { PRODUCTS } from '../data/products';
import { Star, ShieldCheck, Award, Sparkles } from 'lucide-react';

export default function HomePage() {
  const trendingProducts = PRODUCTS.filter((p) => p.tags.includes('trending') || p.tags.includes('featured'));
  const bestSellers = PRODUCTS.filter((p) => p.tags.includes('bestseller') || p.rating >= 4.8);

  return (
    <div className="space-y-4">
      {/* Hero Showcase Carousel */}
      <HeroSlider />

      {/* Categories Department Tiles */}
      <CategoryTiles />

      {/* Limited-time Flash Sale Deals with Countdown */}
      <FlashSale />

      {/* Promotional Banners */}
      <PromoBanner />

      {/* Trending Products Carousel */}
      <ProductCarousel
        title="Trending This Week"
        subtitle="The most-saved gear across audio, wearables, and workspace design"
        products={trendingProducts}
      />

      {/* Customer Testimonial Social Proof Section */}
      <section className="py-16 bg-[#F5F8FC] border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-[#2563EB] mb-3">
              <Award className="w-3.5 h-3.5" />
              Verified Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B72]">
              Loved by 50,000+ Creators & Engineers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Discover what our global community has to say about build quality, acoustic precision, and speed of delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'The Aura Studio Wireless Pro completely replaced my studio monitors. The hybrid noise-cancellation makes coding in coffee shops pure bliss.',
                author: 'Elena Rostova',
                role: 'Senior Staff Engineer, London',
                rating: 5,
                product: 'Aura Studio Wireless Pro',
              },
              {
                quote: 'The Orbit Lumina desk bar transformed my work setup. Zero glare, tactile wireless rotary controller, and flawless industrial design.',
                author: 'Marcus Vance',
                role: 'Product Designer, San Francisco',
                rating: 5,
                product: 'Orbit Lumina Desk Bar',
              },
              {
                quote: 'Battery life on the Horizon Chrono Ultra is unbelievable. I ran a 50k ultra marathon and tracked dual-GPS without dropping below 80%.',
                author: 'Devon Takahashi',
                role: 'Endurance Athlete, Tokyo',
                rating: 5,
                product: 'Horizon Chrono Smartwatch Ultra',
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                    "{review.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#123B72]">{review.author}</h4>
                    <p className="text-[10px] text-slate-400">{review.role}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Grid */}
      <ProductCarousel
        title="Best Sellers in 2026"
        subtitle="Consistently highest-rated products by verified community members"
        products={bestSellers}
      />
    </div>
  );
}
