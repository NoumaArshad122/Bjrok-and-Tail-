import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Leaf,
} from 'lucide-react';
import { BOTANICAL_CATEGORIES } from '../data/categories';
import { BOTANICAL_PRODUCTS } from '../data/botanicalProducts';
import BotanicalProductCard from '../components/product/BotanicalProductCard';
import FeaturedHeroSlider from '../components/home/FeaturedHeroSlider';
import { STORE_CONFIG } from '../config/storeConfig';
import { useBotanicalCart } from '../context/BotanicalCartContext';
import { useCurrency } from '../context/CurrencyContext';

export default function BotanicalHomePage({ onOpenStory }) {
  const { addToBag } = useBotanicalCart();
  const { formatPrice } = useCurrency();
  const heroProduct = BOTANICAL_PRODUCTS.find((p) => p.heroHighlight) || BOTANICAL_PRODUCTS[0];
  const curatedProducts = BOTANICAL_PRODUCTS.slice(0, 8);

  const handleHeroAdd = () => {
    addToBag(heroProduct, 1);
  };

  return (
    <div className="pb-28 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 lg:space-y-16 animate-in fade-in duration-300">
      {/* ========================================================= */}
      {/* 1. ATMOSPHERIC NORDIC FOREST EDITORIAL HERO (NO NESTED SLIDER) */}
      {/* ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative overflow-hidden rounded-[2.2rem] sm:rounded-[2.8rem] border border-[#1A3326]/20 shadow-2xl bg-[#07130B]"
      >
        {/* Background Image Layer with Luxury Dark Forest Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&auto=format&fit=crop&q=85"
            alt="Swedish Lapland Conifer Forest"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Multi-layered directional gradient overlays for pristine contrast and Nordic ambiance */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#061109]/95 via-[#0A1A0F]/85 to-[#061109]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061109] via-[#061109]/50 to-black/35" />
          {/* Subtle amber sunbeam & aurora auras */}
          <div className="absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-[#C26747]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 left-1/4 w-96 h-96 rounded-full bg-[#7D9678]/15 blur-3xl pointer-events-none" />
        </div>

        {/* Content Container (Elevated Z-Index) */}
        <div className="relative z-10 px-6 py-9 sm:p-12 lg:p-16 flex flex-col justify-between space-y-7 sm:space-y-8">
          {/* Top Micro-Badge Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10.5px] uppercase font-bold tracking-[0.18em] text-[#E8DCC8] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#E8C5A8] animate-pulse" />
              <span>Swedish Lapland • 68°N Latitude</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-[#E8C5A8]">
              <span className="hidden sm:inline">Arctic Harvest</span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15">
                Batch 2026 Ready
              </span>
            </div>
          </div>

          {/* Central Editorial Typographic Statement */}
          <div className="space-y-4 max-w-3xl">
            <h1 className="font-botanical text-[2.4rem] sm:text-5xl lg:text-7xl font-semibold text-[#FBF9F5] tracking-tight leading-[1.04] drop-shadow-sm">
              Subarctic Botanical{' '}
              <span className="italic font-light text-[#E8C5A8]">Calm</span>
            </h1>

            <p className="text-xs sm:text-base lg:text-lg text-[#DCD4C7] leading-relaxed max-w-2xl font-sans font-light">
              Hand-harvested wildcraft elixirs, soothing conifer resin balms, and slow-crafted forest teas from Swedish Lapland (68°N). Compounded in small batches and cold-chain dispatched worldwide in biophotonic Miron violet glass.
            </p>

            {/* Signature Wild Harvest Botanical Notes Pills */}
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-widest text-[#E8C5A8]/85 font-bold block mb-2 font-mono">
                Signature Lapland Terroirs:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-[#FBF9F5] flex items-center gap-1.5 shadow-2xs">
                  <span>🌲</span>
                  <span className="font-medium">Scots Pine Resin</span>
                  <span className="text-[10px] text-[#E8C5A8] hidden sm:inline">(Pinus sylvestris)</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-[#FBF9F5] flex items-center gap-1.5 shadow-2xs">
                  <span>🍄</span>
                  <span className="font-medium">Arctic Wild Chaga</span>
                  <span className="text-[10px] text-[#E8C5A8] hidden sm:inline">(Inonotus obliquus)</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-[#FBF9F5] flex items-center gap-1.5 shadow-2xs">
                  <span>🌿</span>
                  <span className="font-medium">White Birch Sap</span>
                  <span className="text-[10px] text-[#E8C5A8] hidden sm:inline">(Betula pendula)</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-[#FBF9F5] flex items-center gap-1.5 shadow-2xs">
                  <span>🟠</span>
                  <span className="font-medium">Peatland Cloudberry</span>
                  <span className="text-[10px] text-[#E8C5A8] hidden sm:inline">(Rubus chamaemorus)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tactical Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <Link
              to="/series"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 rounded-full bg-[#C26747] hover:bg-[#A85335] text-white text-xs sm:text-sm font-semibold transition-all duration-300 shadow-xl shadow-[#C26747]/30 hover:shadow-2xl hover:shadow-[#C26747]/40 cursor-pointer"
            >
              <span>Explore All Series</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/series?category=elixirs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-[#FBF9F5] text-xs sm:text-sm font-medium transition-all duration-300 shadow-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#E8C5A8]" />
              <span>Seasonal Drops</span>
            </Link>

            {onOpenStory && (
              <button
                type="button"
                onClick={() => onOpenStory('values')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-full bg-transparent hover:bg-white/5 border border-white/15 text-[#E8DCC8] hover:text-white text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer"
              >
                <span>The Lapland Story</span>
              </button>
            )}
          </div>

          {/* Integrated Frosted Trust Footer Strip */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-3 text-[11.5px] text-[#DCD4C7] font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C26747] shrink-0" />
              <span>68°N Arctic Lapland Harvest</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7D9678] shrink-0" />
              <span>Zero-Depletion Harvesting</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <span>Miron Violet Biophotonic Glass</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>Cold-Chain Transit Dispatched</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Category Shortcuts Grid */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
        className="space-y-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-[#7D9678]" />
            <h2 className="font-botanical text-xl lg:text-2xl font-semibold text-[#1A3326]">
              Explore by Botanical Craft
            </h2>
          </div>
          <Link
            to="/series"
            className="text-xs font-semibold text-[#C26747] hover:underline flex items-center gap-1"
          >
            <span>View All Formulations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 lg:gap-5">
          {BOTANICAL_CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
            <Link
              key={cat.id}
              to={`/series?category=${cat.slug}`}
              className="group p-5 rounded-2xl bg-[#FBF9F5] border border-[#EBE6DC] hover:border-[#1A3326]/40 transition-all duration-300 flex flex-col items-center text-center shadow-xs hover:shadow-md"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 border border-[#EBE6DC] group-hover:border-[#1A3326] transition-all bg-white mb-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-106 transition-transform duration-500"
                />
              </div>
              <h3 className="font-botanical text-base font-semibold text-[#1A3326] group-hover:text-[#C26747] transition-colors">
                {cat.name}
              </h3>
              <span className="text-[10px] text-[#7D9678] italic font-serif mt-0.5">
                {cat.swedishName}
              </span>
              <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase mt-1">
                {cat.count} Formulations
              </span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* 2B. Seasonal Harvest Extractions Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#7D9678] font-mono">
              Live Formulary Showcase
            </span>
            <h2 className="font-botanical text-xl lg:text-2xl font-semibold text-[#1A3326]">
              Seasonal Harvest Extractions
            </h2>
          </div>
          <Link
            to="/series"
            className="text-xs font-semibold text-[#C26747] hover:underline flex items-center gap-1"
          >
            <span>Browse Full Dispensary</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <FeaturedHeroSlider />
      </motion.div>

      {/* 3. Featured Hero Specimen Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative rounded-3xl overflow-hidden bg-[#1A3326] text-[#FBF9F5] shadow-xl p-6 sm:p-10 lg:p-12 border border-[#2B4E3C]"
      >
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
                  {formatPrice(heroProduct.price)}
                </span>
                {heroProduct.compareAtPrice && (
                  <span className="text-sm text-[#DCE4DA]/60 line-through">
                    {formatPrice(heroProduct.compareAtPrice)}
                  </span>
                )}
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={handleHeroAdd}
                className="px-6 py-3 rounded-full bg-[#C26747] hover:bg-[#A95335] text-white text-xs font-semibold shadow-lg shadow-black/20 flex items-center gap-2 cursor-pointer transition-colors"
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

          {/* Right Column: Artwork Frame */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <Link
              to={`/product/${heroProduct.slug}`}
              className="relative group block aspect-square w-64 sm:w-80 lg:w-96 rounded-2xl overflow-hidden ring-1 ring-white/15"
            >
              <img
                src={heroProduct.images[0]}
                alt={heroProduct.title}
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A3326]/75 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-xs text-[#F4F1EA]">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#DCE4DA]/80 font-medium block">
                    Harvest Series 01
                  </span>
                  <span className="font-botanical text-sm font-semibold text-white">
                    {heroProduct.title}
                  </span>
                </div>
                <span className="text-[9.5px] uppercase tracking-wider font-semibold text-[#1A3326] bg-[#FBF9F5]/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-xs">
                  Dispensary Reserve
                </span>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* 4. Curated Formulations Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
        className="space-y-6"
      >
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.16em] font-medium text-[#7D9678]">
              Small-Batch Dispensary
            </span>
            <h2 className="font-botanical text-2xl sm:text-4xl font-semibold text-[#1A3326] mt-0.5">
              The Curated Collection
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Hand-harvested botanicals with proven phytonutrient density and calm aromatics.
            </p>
          </div>
          <Link
            to="/series"
            className="text-xs sm:text-sm font-semibold text-[#C26747] hover:underline flex items-center gap-1"
          >
            <span>View All ({BOTANICAL_PRODUCTS.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {curatedProducts.map((product) => (
            <BotanicalProductCard key={product.id} product={product} />
          ))}
        </div>
      </motion.div>

      {/* 5. Dispensary Pillars of Excellence */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-y border-[#EBE6DC]">
        <div className="space-y-2.5">
          <span className="text-[11px] font-mono text-[#7D9678] tracking-widest block font-medium">
            01 / HARVEST
          </span>
          <h4 className="font-botanical text-lg font-semibold text-[#1A3326]">
            Zero-Harm Wildcraft
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Hand-gathered with traditional scythes in Swedish Lapland, honoring strict subarctic non-depletion forestry treaties.
          </p>
        </div>

        <div className="space-y-2.5">
          <span className="text-[11px] font-mono text-[#C26747] tracking-widest block font-medium">
            02 / BOTANY
          </span>
          <h4 className="font-botanical text-lg font-semibold text-[#1A3326]">
            Midnight Sun Energy
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Arctic plants adapt to 24-hour continuous summer daylight, synthesizing concentrated bioflavonoids and antioxidant resins.
          </p>
        </div>

        <div className="space-y-2.5">
          <span className="text-[11px] font-mono text-[#1A3326] tracking-widest block font-medium">
            03 / PRESERVATION
          </span>
          <h4 className="font-botanical text-lg font-semibold text-[#1A3326]">
            Miron Violet Glass
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Biophotonic violet apothecary glass acts as a natural energetic filter, protecting living plant essences from oxidative decay.
          </p>
        </div>

        <div className="space-y-2.5">
          <span className="text-[11px] font-mono text-[#7D9678] tracking-widest block font-medium">
            04 / ECOLOGY
          </span>
          <h4 className="font-botanical text-lg font-semibold text-[#1A3326]">
            Carbon-Neutral Transit
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Fully climate positive logistics, offset through verified peatland rewilding reserves across northern Scandinavia.
          </p>
        </div>
      </div>

      {/* 6. Brand Story Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative rounded-3xl p-8 sm:p-12 bg-[#1A3326] text-[#FBF9F5] overflow-hidden border border-[#2B4E3C] shadow-xl"
      >
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

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 justify-start lg:justify-end">
            <Link
              to="/series"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#C26747] hover:bg-[#A95335] text-white text-xs font-bold transition-colors shadow-md cursor-pointer"
            >
              <span>Explore The Full Series</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {onOpenStory && (
              <button
                type="button"
                onClick={() => onOpenStory('map')}
                className="text-xs text-[#DCE4DA] hover:text-white underline underline-offset-4 cursor-pointer"
              >
                Inspect Foraging Reserves Map →
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
