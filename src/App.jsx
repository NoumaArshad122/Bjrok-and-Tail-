import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { CurrencyProvider } from './context/CurrencyContext';
import { BotanicalCartProvider } from './context/BotanicalCartContext';
import { BotanicalWishlistProvider } from './context/BotanicalWishlistContext';

import BotanicalHeader from './components/layout/BotanicalHeader';
import BotanicalFooter from './components/layout/BotanicalFooter';
import BottomNav from './components/layout/BottomNav';
import BotanicalToast from './components/ui/BotanicalToast';
import CartDrawer from './components/cart/CartDrawer';
import BotanicalPaymentModal from './components/checkout/BotanicalPaymentModal';

import LiveSearchModal from './components/modals/LiveSearchModal';
import BrandStoryModal from './components/modals/BrandStoryModal';
import ShippingPolicyModal from './components/modals/ShippingPolicyModal';
import ContactModal from './components/modals/ContactModal';
import OrderTrackingModal from './components/modals/OrderTrackingModal';

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

function AppContent({ toast, setToast }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Modals state
  const [isLiveSearchOpen, setIsLiveSearchOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [storyTab, setStoryTab] = useState('map');
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingInitialId, setTrackingInitialId] = useState('');

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K / /)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsLiveSearchOpen((prev) => !prev);
      }
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        setIsLiveSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenStory = (tab = 'map') => {
    setStoryTab(tab);
    setIsStoryOpen(true);
  };

  const handleOpenTracking = (orderId = '') => {
    setTrackingInitialId(orderId);
    setIsTrackingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#222E25] font-sans selection:bg-[#C26747] selection:text-white flex flex-col justify-between relative overflow-x-clip">
      {/* Top Header */}
      <BotanicalHeader
        onOpenLiveSearch={() => setIsLiveSearchOpen(true)}
        onOpenTracking={() => handleOpenTracking()}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenStory={handleOpenStory}
        onOpenShipping={() => setIsShippingOpen(true)}
      />

      {/* Main Pages */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<BotanicalHomePage onOpenStory={handleOpenStory} />} />
              <Route path="/series" element={<BotanicalSeriesPage />} />
              <Route path="/product/:slug" element={<BotanicalProductDetailPage />} />
              <Route path="/bag" element={<BotanicalBagPage onOpenTracking={handleOpenTracking} />} />
              <Route path="/wishlist" element={<BotanicalWishlistPage />} />
              <Route path="*" element={<BotanicalHomePage onOpenStory={handleOpenStory} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <BotanicalFooter
        onOpenStory={handleOpenStory}
        onOpenShipping={() => setIsShippingOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenTracking={() => handleOpenTracking()}
      />

      {/* Slide-over Mini-Cart Drawer */}
      <CartDrawer onProceedToCheckout={() => navigate('/bag')} />

      {/* Interactive Global Modals */}
      <LiveSearchModal
        isOpen={isLiveSearchOpen}
        onClose={() => setIsLiveSearchOpen(false)}
      />

      <BrandStoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
        initialTab={storyTab}
      />

      <ShippingPolicyModal
        isOpen={isShippingOpen}
        onClose={() => setIsShippingOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialOrderId={trackingInitialId}
      />

      {/* Global Toast */}
      <BotanicalToast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

      {/* Floating Bottom Nav for Mobile */}
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
      <CurrencyProvider>
        <BotanicalWishlistProvider onTriggerToast={triggerToast}>
          <BotanicalCartProvider onTriggerToast={triggerToast}>
            <AppContent toast={toast} setToast={setToast} />
          </BotanicalCartProvider>
        </BotanicalWishlistProvider>
      </CurrencyProvider>
    </Router>
  );
}
