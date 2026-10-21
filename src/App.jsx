import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { BotanicalCartProvider, useBotanicalCart } from './context/BotanicalCartContext';
import { BotanicalWishlistProvider } from './context/BotanicalWishlistContext';

import BotanicalHeader from './components/layout/BotanicalHeader';
import BotanicalFooter from './components/layout/BotanicalFooter';
import BottomNav from './components/layout/BottomNav';
import BotanicalToast from './components/ui/BotanicalToast';
import FlyingParticle from './components/ui/FlyingParticle';

import BotanicalHomePage from './pages/BotanicalHomePage';
import BotanicalSeriesPage from './pages/BotanicalSeriesPage';
import BotanicalProductDetailPage from './pages/BotanicalProductDetailPage';
import BotanicalBagPage from './pages/BotanicalBagPage';
import BotanicalWishlistPage from './pages/BotanicalWishlistPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Inner App with access to Cart Context for Flying Particle
function AppContent({ toast, setToast }) {
  const { flyingParticle } = useBotanicalCart();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#222E25] font-sans selection:bg-[#C26747] selection:text-white flex flex-col justify-between relative overflow-x-clip">
      {/* Subtle organic light drift across page header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-gradient-to-b from-[#7D9678]/15 via-[#C26747]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Botanical Header with Desktop Navigation */}
      <BotanicalHeader />

      {/* Main Screen Router with Soft Nordic Transitions */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<BotanicalHomePage />} />
              <Route path="/series" element={<BotanicalSeriesPage />} />
              <Route path="/product/:slug" element={<BotanicalProductDetailPage />} />
              <Route path="/bag" element={<BotanicalBagPage />} />
              <Route path="/wishlist" element={<BotanicalWishlistPage />} />
              <Route path="*" element={<BotanicalHomePage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Botanical Footer on Desktop and Mobile */}
      <BotanicalFooter />

      {/* Flying Particle Token Animation */}
      <FlyingParticle particle={flyingParticle} />

      {/* Polite Live Region Botanical Toast */}
      <BotanicalToast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

      {/* Floating Pill-Shaped Bottom Navigation on Mobile */}
      <BottomNav />
    </div>
  );
}

export default function App() {
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  return (
    <Router>
      <ScrollToTop />
      <BotanicalWishlistProvider onTriggerToast={triggerToast}>
        <BotanicalCartProvider onTriggerToast={triggerToast}>
          <AppContent toast={toast} setToast={setToast} />
        </BotanicalCartProvider>
      </BotanicalWishlistProvider>
    </Router>
  );
}
