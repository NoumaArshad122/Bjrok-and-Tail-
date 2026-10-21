import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Feather, Compass, ShieldCheck, Mail, ArrowRight, Check } from 'lucide-react';
import { STORE_CONFIG } from '../../config/storeConfig';

export default function BotanicalFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1A3326] text-[#FBF9F5] pt-16 pb-28 lg:pb-16 border-t border-[#254736] mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C26747] text-white flex items-center justify-center font-botanical font-bold text-xl shadow-sm">
                B
              </div>
              <div>
                <span className="font-botanical text-2xl font-bold tracking-tight text-white block leading-none">
                  {STORE_CONFIG.brandName}
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#7D9678] block font-semibold mt-0.5">
                  Stockholm • Tromsø Dispensary
                </span>
              </div>
            </div>

            <p className="text-xs text-[#DCE4DA] max-w-sm leading-relaxed">
              Hand-harvested botanical elixirs, soothing resin salves, and forest teas. Crafted in harmony with the wild subarctic taiga and northern winter stillness.
            </p>

            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#7D9678] block mb-2">
                Join the Solstice Circle
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#EFF4EE]/10 border border-[#7D9678]/30 text-xs text-emerald-300">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Welcome to the Solstice Circle. Check your inbox for your harvest gift.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email for private drops..."
                    className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/15 text-xs text-white placeholder-[#DCE4DA]/50 focus:outline-none focus:border-[#C26747]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-[#C26747] hover:bg-[#1A3326] text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            <div>
              <h4 className="font-botanical text-base font-bold text-white mb-3">
                Dispensary
              </h4>
              <ul className="space-y-2 text-[#DCE4DA]">
                <li>
                  <Link to="/series?category=elixirs" className="hover:text-white transition-colors">
                    Chaga & Birch Elixirs
                  </Link>
                </li>
                <li>
                  <Link to="/series?category=teas" className="hover:text-white transition-colors">
                    Forest Needle Teas
                  </Link>
                </li>
                <li>
                  <Link to="/series?category=balms" className="hover:text-white transition-colors">
                    Spruce Resin Balms
                  </Link>
                </li>
                <li>
                  <Link to="/series?category=oils" className="hover:text-white transition-colors">
                    Arctic Seed Oils
                  </Link>
                </li>
                <li>
                  <Link to="/series?category=candles" className="hover:text-white transition-colors">
                    Rapeseed Wax Candles
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-botanical text-base font-bold text-white mb-3">
                Philosophy
              </h4>
              <ul className="space-y-2 text-[#DCE4DA]">
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    Wildcraft Foraging Map
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    Miron Glass Science
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    Zero-Depletion Treaties
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    Carbon-Neutral Offset
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-botanical text-base font-bold text-white mb-3">
                Client Care
              </h4>
              <ul className="space-y-2 text-[#DCE4DA]">
                <li>
                  <Link to="/bag" className="hover:text-white transition-colors">
                    Your Botanical Bag
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="hover:text-white transition-colors">
                    Saved Formulations
                  </Link>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    Complimentary Shipping
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    Apothecary Inquiries
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#254736] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7D9678]">
          <p>© {new Date().getFullYear()} {STORE_CONFIG.brandName} Apothecary AB. Handcrafted in Sweden.</p>
          <div className="flex items-center gap-4 text-[11px] text-[#DCE4DA]">
            <span>100% Wildcrafted</span>
            <span>•</span>
            <span>Zero Synthetic Additives</span>
            <span>•</span>
            <span>Nordic Climate Positive</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
