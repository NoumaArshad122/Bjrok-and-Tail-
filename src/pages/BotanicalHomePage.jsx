import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Leaf,
  Sun,
  ShieldCheck,
  Compass,
  Star,
  Check,
  Feather,
} from 'lucide-react';
import { BOTANICAL_CATEGORIES } from '../data/categories';
import { BOTANICAL_PRODUCTS } from '../data/botanicalProducts';
import BotanicalProductCard from '../components/product/BotanicalProductCard';
import FeaturedHeroSlider from '../components/home/FeaturedHeroSlider';
import { STORE_CONFIG } from '../config/storeConfig';
import { formatCurrency } from '../lib/formatCurrency';
import { useBotanicalCart } from '../context/BotanicalCartContext';

export default function BotanicalHomePage() {
  const { addToBag } = useBotanicalCart();
  const heroProduct = BOTANICAL_PRODUCTS.find((p) => p.heroHighlight) || BOTANICAL_PRODUCTS[0];
  const curatedProducts = BOTANICAL_PRODUCTS.slice(0, 8);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'God morgon';
    if (hour < 18) return 'God dag';
    return 'God kväll';
  };

  const handleHeroAdd = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const startCoords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    addToBag(heroProduct, 1, startCoords);
  };

  return (
    <div className="pb-28 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-16 animate-in fade-in duration-300">
      {/* 1. Personal Greeting & Featured Slider Hero Grid */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="pt-4 lg:pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#EBE6DC] pb-8 lg:pb-12"
      >
        {/* Left Column: Greeting & Narrative */}
        <div className="lg:col-span-6 xl:col-span-7 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7D9678] animate-ping" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[#7D9678]">
              {getGreeting()}, {STORE_CONFIG.defaultShopperName} • Arctic Harvest 2026
            </span>
          </div>
          <h1 className="font-botanical text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1A3326] tracking-tight leading-tight">
            Nordic Botanical Calm
          </h1>
          <p className="text-xs sm:text-base text-slate-600 max-w-xl leading-relaxed">
            Hand-harvested wildcraft elixirs, soothing resin balms, and slow-crafted forest teas from the Swedish Taiga.
          </p>

          <div className="flex items-center gap-3 pt-2 flex-wrap">
            <Link
              to="/series"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white text-xs sm:text-sm font-semibold shadow-md transition-colors"
            >
              <span>Explore All Series</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/series?category=elixirs"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#EFF4EE] border border-[#EBE6DC] text-[#1A3326] hover:text-[#C26747] text-xs sm:text-sm font-semibold transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#C26747]" />
              <span>Seasonal Elixirs</span>
            </Link>
          </div>

          {/* Quick dispensary highlights */}
          <div className="pt-3 flex items-center gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C26747]" />
              <span>Wildcrafted in Lapland (68°N)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7D9678]" />
              <span>Zero-Harm Foraging</span>
            </div>
          </div>
        </div>

        {/* Right Column: Animated Picture Slider of 3-4 Featured Items */}
        <div className="lg:col-span-6 xl:col-span-5">
          <FeaturedHeroSlider />
        </div>
      </motion.div>

      {/* 2. Category Shortcuts Grid */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-[#7D9678]" />
            <h2 className="font-botanical text-xl lg:text-2xl font-bold text-[#1A3326]">
              Explore by Botanical Craft
            </h2>
          </div>
          <Link
            to="/series"
            className="text-xs font-bold text-[#C26747] hover:underline flex items-center gap-1"
          >
            <span>View All Departments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Responsive Grid on Laptop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 lg:gap-5">
          {BOTANICAL_CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
            <Link
              key={cat.id}
              to={`/series?category=${cat.slug}`}
              className="group p-4 rounded-3xl bg-[#FBF9F5] border border-[#EBE6DC] hover:border-[#C26747] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 border-2 border-[#EBE6DC] group-hover:border-[#C26747] transition-all bg-white mb-3 shadow-inner">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-botanical text-base font-bold text-[#1A3326] group-hover:text-[#C26747] transition-colors">
                {cat.name}
              </h3>
              <span className="text-[10px] text-[#7D9678] italic font-serif mt-0.5">
                {cat.swedishName}
              </span>
              <span className="text-[11px] font-medium text-slate-500 mt-1">
                {cat.count} Formulations
              </span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* 3. Featured Hero Card (2-Column on Laptop) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative rounded-3xl overflow-hidden bg-[#1A3326] text-[#FBF9F5] shadow-2xl p-6 sm:p-10 lg:p-12 border border-[#2B4E3C]"
      >
        {/* Ambient drifting sunlight layers */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#C26747]/20 blur-3xl animate-ambient-drift pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-[#7D9678]/25 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Story & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md text-[#F4F1EA] border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-[#E8C5A8]" />
                Featured Seasonal Harvest
              </span>
              <span className="text-xs font-serif italic text-[#DCE4DA]">
                {heroProduct.provenance}
              </span>
            </div>

            <div>
              <p className="text-xs sm:text-sm font-serif italic text-[#DCE4DA] tracking-wide mb-1">
                {heroProduct.botanicalName}
              </p>
              <h2 className="font-botanical text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                {heroProduct.title}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#DCE4DA] leading-relaxed max-w-xl">
              {heroProduct.description}
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#7D9678] block">
                  Harvest Period
                </span>
                <span className="font-semibold text-white">{heroProduct.harvestSeason}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#7D9678] block">
                  Volume / Net Wt.
                </span>
                <span className="font-semibold text-white">{heroProduct.size}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase font-bold text-[#7D9678] block">
                  Batch Availability
                </span>
                <span className="font-semibold text-emerald-400">
                  {heroProduct.stock} bottles remaining
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2 flex-wrap">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-white">
                  {formatCurrency(heroProduct.price)}
                </span>
                {heroProduct.compareAtPrice && (
                  <span className="text-sm text-[#DCE4DA]/60 line-through">
                    {formatCurrency(heroProduct.compareAtPrice)}
                  </span>
                )}
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={handleHeroAdd}
                className="px-6 py-3 rounded-full bg-[#C26747] hover:bg-[#1A3326] text-white text-xs font-semibold shadow-lg shadow-black/20 flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>Add to Bag</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <Link
                to={`/product/${heroProduct.slug}`}
                className="text-xs font-medium text-[#DCE4DA] hover:text-white underline underline-offset-4"
              >
                View Formulation Ritual →
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Artwork Frame */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <Link
              to={`/product/${heroProduct.slug}`}
              className="relative group block aspect-square w-64 sm:w-80 lg:w-96 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/10"
            >
              <img
                src={heroProduct.images[0]}
                alt={heroProduct.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-5 left-5 right-5 bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#DCE4DA] block uppercase tracking-wider font-semibold">
                    Customer Evaluation
                  </span>
                  <div className="flex items-center gap-1 text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-300 stroke-amber-300" />
                    <span className="text-xs font-bold text-white">4.9 / 5.0</span>
                    <span className="text-[10px] text-[#DCE4DA]">(142 verified)</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#E8C5A8] bg-white/10 px-2.5 py-1 rounded-full">
                  100% Wildcraft
                </span>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* 4. Curated Botanicals Grid (4 Columns on Laptop) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
        className="space-y-6"
      >
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#7D9678]">
              Small-Batch Dispensary
            </span>
            <h2 className="font-botanical text-2xl sm:text-4xl font-bold text-[#1A3326] mt-0.5">
              The Curated Collection
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Hand-harvested botanicals with proven phytonutrient density and calm aromatics.
            </p>
          </div>
          <Link
            to="/series"
            className="text-xs sm:text-sm font-bold text-[#C26747] hover:underline flex items-center gap-1"
          >
            <span>View All ({BOTANICAL_PRODUCTS.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Columns Grid on Laptop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {curatedProducts.map((product) => (
            <BotanicalProductCard key={product.id} product={product} />
          ))}
        </div>
      </motion.div>

      {/* 5. Dispensary Pillars of Excellence (Laptop Feature) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-y border-[#EBE6DC]">
        <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#EBE6DC] space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#EFF4EE] text-[#7D9678] flex items-center justify-center">
            <Feather className="w-5 h-5" />
          </div>
          <h4 className="font-botanical text-base font-bold text-[#1A3326]">
            Zero-Harm Wildcraft
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Hand-gathered with traditional scythes, honoring strict non-depletion forestry treaties.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#EBE6DC] space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#EFF4EE] text-[#C26747] flex items-center justify-center">
            <Sun className="w-5 h-5" />
          </div>
          <h4 className="font-botanical text-base font-bold text-[#1A3326]">
            Midnight Sun Energy
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Arctic plants adapt to 24-hour summer daylight, producing rich carotenes and protective flavonoids.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#EBE6DC] space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#EFF4EE] text-[#1A3326] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-botanical text-base font-bold text-[#1A3326]">
            Miron Violet Glass
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ancient biophotonic violet glass protects delicate living plant essences from degradation.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#EBE6DC] space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#EFF4EE] text-[#7D9678] flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h4 className="font-botanical text-base font-bold text-[#1A3326]">
            Carbon-Neutral Transit
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Offset through verified rewilding reserves across northern Scandinavia and Finland.
          </p>
        </div>
      </div>

      {/* 6. Brand Story Banner with Sunrise Glow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative rounded-3xl p-8 sm:p-12 bg-[#1A3326] text-[#FBF9F5] overflow-hidden border border-[#2B4E3C] shadow-xl"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-[#C26747]/30 via-[#E8C5A8]/15 to-transparent blur-3xl animate-sunrise-pulse pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#7D9678]">
              The Taiga Ethos & Origin
            </span>
            <h3 className="font-botanical text-2xl sm:text-4xl font-bold text-white leading-snug">
              Born from the Stillness of the Arctic Tundra
            </h3>
            <p className="text-xs sm:text-sm text-[#DCE4DA] leading-relaxed max-w-2xl">
              We founded BJÖRK & TALL to revive the ancient apothecary knowledge of northern Scandinavia. Each elixir, balm, and tea is an authentic piece of the quiet subarctic wilderness, hand-crafted to restore balance to modern life.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <Link
              to="/series"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#C26747] hover:bg-[#1A3326] text-white text-xs font-bold transition-colors shadow-md cursor-pointer"
            >
              <span>Explore The Full Series</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
