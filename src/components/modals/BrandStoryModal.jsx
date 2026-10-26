import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Compass, Shield, Sparkles, Check, Globe } from 'lucide-react';

const FORAGING_REGIONS = [
  {
    id: 'lapland',
    name: 'Swedish Lapland (68°N)',
    coordinates: '68.3582° N, 18.7842° E',
    terroir: 'Subarctic Taiga & Tundra',
    flora: 'Wild Arctic Chaga, Silver Birch Sap, Lingonberry leaves',
    description: 'Under 24 hours of midnight sunlight in summer and prolonged sub-zero winter dormancy, boreal flora synthesizes dense concentrations of protective secondary metabolites.',
    treaty: 'Strict 5-year cyclical rotation per harvesting zone to ensure complete vegetative regeneration.',
  },
  {
    id: 'norrbotten',
    name: 'Norrbotten Peatlands',
    coordinates: '65.8251° N, 21.6886° E',
    terroir: 'Pristine Boreal Sphagnum Bogs',
    flora: 'Arctic Cloudberry ("Nordic Gold"), Wild Bog Bilberry',
    description: 'Golden cloudberries thrive naturally in untouched peat bogs. Foraging is conducted on foot with zero mechanized machinery to preserve fragile moss ecosystems.',
    treaty: 'Hand-picked exclusively at peak brix maturity; plant root systems remain undisturbed.',
  },
  {
    id: 'dalarna',
    name: 'Dalarna Conifer Highlands',
    coordinates: '60.6036° N, 14.6186° E',
    terroir: 'Ancient Pine & Spruce Woodlands',
    flora: 'Norway Spruce Resin, Scots Pine shoots, Meadowsweet',
    description: 'Old-growth conifer stands produce restorative antimicrobial terpenes and soothing resins harvested exclusively from naturally weeping bark.',
    treaty: 'Zero living timber is ever scarred or punctured; collection follows forest warden permits.',
  },
  {
    id: 'archipelago',
    name: 'Stockholm Sea Archipelago',
    coordinates: '59.3293° N, 18.0686° E',
    terroir: 'Wind-Swept Granite Coastal Islets',
    flora: 'Wild Sea Buckthorn berries, Juniperus communis',
    description: 'Wild sea buckthorn shrubs rooted in granite fissures face harsh saline sea gales, concentrating rare Omega-7 palmitoleic acid and natural carotenes.',
    treaty: 'Harvest pauses completely during migratory seabird breeding cycles.',
  },
];

export default function BrandStoryModal({ isOpen, onClose, initialTab = 'map' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedRegion, setSelectedRegion] = useState(FORAGING_REGIONS[0]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-[#FBF9F5] rounded-[2rem] border border-[#EBE6DC] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#1A3326] text-[#FBF9F5] flex items-center justify-between border-b border-[#2B4E3C]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C26747] text-white flex items-center justify-center font-botanical font-bold text-lg">
                B
              </div>
              <div>
                <h3 className="font-botanical text-xl sm:text-2xl font-bold text-white leading-none">
                  Apothecary Heritage & Science
                </h3>
                <span className="text-[11px] text-[#7D9678] tracking-widest uppercase font-semibold block mt-1">
                  Stockholm • Tromsø Dispensary Archive
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

          {/* Nav Tabs */}
          <div className="flex border-b border-[#EBE6DC] bg-white px-6 gap-6 text-xs font-semibold">
            {[
              { id: 'map', label: 'Wildcraft Foraging Map', icon: Compass },
              { id: 'glass', label: 'Biophotonic Miron Glass', icon: Sparkles },
              { id: 'treaty', label: 'Zero-Depletion Treaties', icon: Shield },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3.5 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                    isActive
                      ? 'border-[#C26747] text-[#1A3326]'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C26747]' : ''}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {activeTab === 'map' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#7D9678]">
                    Geographic Provenance & Terroir
                  </span>
                  <h4 className="font-botanical text-2xl font-bold text-[#1A3326]">
                    Ethical Subarctic Foraging Reserves
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                    Every formulation is anchored in precise wild coordinates across Scandinavia. Select a harvesting region below to inspect terroir, native botanicals, and seasonal treaties.
                  </p>
                </div>

                {/* Region Selector Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {FORAGING_REGIONS.map((reg) => {
                    const isSelected = selectedRegion.id === reg.id;
                    return (
                      <button
                        key={reg.id}
                        type="button"
                        onClick={() => setSelectedRegion(reg)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1A3326] text-white border-[#1A3326] shadow-md'
                            : 'bg-white text-slate-700 border-[#EBE6DC] hover:border-slate-400'
                        }`}
                      >
                        <MapPin className={`w-3.5 h-3.5 mb-1 ${isSelected ? 'text-[#C26747]' : 'text-[#7D9678]'}`} />
                        <h5 className="font-bold text-xs leading-snug">{reg.name}</h5>
                        <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-[#7D9678]' : 'text-slate-400'}`}>
                          {reg.coordinates.split(',')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Region Detailed Card */}
                <div className="p-6 rounded-3xl bg-[#EFF4EE] border border-[#DCE4DA] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DCE4DA]">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#7D9678] tracking-widest">
                        Selected Terroir
                      </span>
                      <h5 className="font-botanical text-xl font-bold text-[#1A3326]">
                        {selectedRegion.name}
                      </h5>
                    </div>
                    <span className="font-mono text-xs text-[#1A3326] bg-white px-3 py-1 rounded-full border border-[#DCE4DA] self-start sm:self-auto font-medium">
                      {selectedRegion.coordinates}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                    <div>
                      <strong className="text-[#1A3326] block mb-1">Ecosystem & Climate Dynamics:</strong>
                      <p className="leading-relaxed text-slate-600">{selectedRegion.description}</p>
                    </div>

                    <div>
                      <strong className="text-[#1A3326] block mb-1">Key Botanical Extractions:</strong>
                      <p className="leading-relaxed text-slate-600">{selectedRegion.flora}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#DCE4DA] flex items-start gap-2.5 text-xs text-[#1A3326]">
                    <Shield className="w-4 h-4 text-[#C26747] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Harvesting Treaty:</strong>
                      <span className="ml-1 text-slate-600">{selectedRegion.treaty}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'glass' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#7D9678]">
                    Photobiology & Preservation
                  </span>
                  <h4 className="font-botanical text-2xl font-bold text-[#1A3326]">
                    The Science of Miron Violet Glass
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                    Standard amber and clear bottles expose delicate wild phytonutrients to photo-oxidation, degrading essential fatty acids and volatile terpenes within weeks.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-5 rounded-2xl bg-white border border-[#EBE6DC] space-y-2">
                    <span className="text-lg">☀️</span>
                    <h5 className="font-bold text-[#1A3326]">Blocks Destructive Visible Light</h5>
                    <p className="text-slate-600 leading-relaxed">
                      Miron glass blocks the entire spectrum of visible light (except violet), preventing molecular degradation of living plant actives.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-[#EBE6DC] space-y-2">
                    <span className="text-lg">🔮</span>
                    <h5 className="font-bold text-[#1A3326]">Permits Beneficial Infrared & UVA</h5>
                    <p className="text-slate-600 leading-relaxed">
                      Selective transmittance of gentle violet and infrared frequencies acts as a natural bio-preservative, maintaining bio-resonance without synthetic parabens.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-[#EBE6DC] space-y-2">
                    <span className="text-lg">♻️</span>
                    <h5 className="font-bold text-[#1A3326]">Infinite Recyclability</h5>
                    <p className="text-slate-600 leading-relaxed">
                      Manufactured in certified clean glassworks in Europe using 100% natural quartz, mineral silica, and soda. Fully reusable for generations.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'treaty' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#7D9678]">
                    Ethical Harvesting Protocols
                  </span>
                  <h4 className="font-botanical text-2xl font-bold text-[#1A3326]">
                    Our Zero-Depletion Treaties
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                    We adhere to the historic Nordic principle of <em>Allemansrätten</em> (The Right of Public Access), elevated by commercial ethical guardrails.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  {[
                    {
                      title: 'The 1-in-5 Sap & Resin Protocol',
                      desc: 'Birch sap tapping and weeping spruce resin collection never exceeds 10% of total yield and is restricted to once every five years per stand.',
                    },
                    {
                      title: 'Root Integrity Guarantee',
                      desc: 'All lichens, wild herbs, and berries are gathered without damaging underlying root beds or moss carpets.',
                    },
                    {
                      title: 'Climate Positive Dispatch',
                      desc: 'For every harvest season, we fund the preservation of 100 hectares of old-growth subarctic taiga via certified northern European land trusts.',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white border border-[#EBE6DC] flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#1A3326] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-[#1A3326] mb-0.5">{item.title}</h5>
                        <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-[#EFF4EE] border-t border-[#DCE4DA] flex items-center justify-between text-xs text-slate-600 px-6">
            <span>Verified Dispensary Archive • Est. 2024</span>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-[#1A3326] hover:bg-[#C26747] text-white font-semibold transition-colors cursor-pointer"
            >
              Return to Dispensary
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
