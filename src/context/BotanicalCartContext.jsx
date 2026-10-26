import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { STORE_CONFIG, PROMO_CODES } from '../config/storeConfig';
import { useCurrency } from './CurrencyContext';

const BotanicalCartContext = createContext(null);
const CART_STORAGE_KEY = 'bjork_tall_cart_v3';
const PROMO_STORAGE_KEY = 'bjork_tall_applied_promo';

export function BotanicalCartProvider({ children, onTriggerToast }) {
  const { activeRegion, convertAmount } = useCurrency();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState(() => {
    try {
      const saved = localStorage.getItem(PROMO_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [badgeBump, setBadgeBump] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not save cart to storage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(appliedPromo));
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Could not save promo to storage', e);
    }
  }, [appliedPromo]);

  const triggerBadgeBump = () => {
    setBadgeBump(true);
    setTimeout(() => setBadgeBump(false), 450);
  };

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  /**
   * Adds an item to the cart and opens the slide-over drawer smoothly.
   */
  const addToBag = (product, quantity = 1, _ignoredCoords = null, shouldOpenDrawer = true) => {
    const maxStock = product.stock || 20;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        const existing = prevItems[existingIndex];
        const newQty = Math.min(existing.quantity + quantity, maxStock);
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
        };
        return updated;
      } else {
        const newItem = {
          id: product.id,
          slug: product.slug,
          title: product.title,
          botanicalName: product.botanicalName,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          image: (product.images && product.images[0]) || '',
          size: product.size || '',
          quantity: Math.min(quantity, maxStock),
          stock: maxStock,
          category: product.category,
        };
        return [newItem, ...prevItems];
      }
    });

    triggerBadgeBump();

    if (shouldOpenDrawer) {
      setIsCartDrawerOpen(true);
    }

    if (onTriggerToast) {
      onTriggerToast(`Added "${product.title}" to your apothecary bag.`, 'success');
    }
  };

  const updateQuantity = (itemId, quantity) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === itemId) {
            const validQty = Math.max(1, Math.min(quantity, item.stock));
            return { ...item, quantity: validQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromBag = (itemId) => {
    const removedItem = cartItems.find((i) => i.id === itemId);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    if (onTriggerToast && removedItem) {
      onTriggerToast(`Removed "${removedItem.title}" from your bag.`, 'info');
    }
  };

  const clearBag = () => {
    setCartItems([]);
    setAppliedPromo(null);
  };

  // Base USD calculations
  const subtotalUSD = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalItemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Dynamic regional conversion
  const isPK = activeRegion.id === 'PK';
  const subtotal = isPK ? Math.round(subtotalUSD * activeRegion.exchangeRate) : subtotalUSD;

  // Free shipping threshold based on region
  const freeShippingThreshold = activeRegion.freeShippingThreshold;
  const isFreeShipping = subtotal >= freeShippingThreshold || appliedPromo?.code === 'FREESHIP';
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // Gift threshold
  const giftThreshold = activeRegion.giftThreshold;
  const isGiftUnlocked = subtotal >= giftThreshold;
  const amountNeededForGift = Math.max(0, giftThreshold - subtotal);
  const giftProgress = Math.min(100, Math.round((subtotal / giftThreshold) * 100));

  // Shipping fee
  const shippingFee = cartItems.length === 0 ? 0 : isFreeShipping ? 0 : activeRegion.standardShippingFee;

  // Promo code discounts
  const discountAmount = useMemo(() => {
    if (!appliedPromo || cartItems.length === 0) return 0;
    if (appliedPromo.type === 'percentage') {
      return Math.round((subtotal * appliedPromo.value) / 100);
    }
    if (appliedPromo.type === 'fixed') {
      return isPK ? appliedPromo.valuePKR : appliedPromo.valueUSD;
    }
    return 0;
  }, [appliedPromo, subtotal, cartItems.length, isPK]);

  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    const promo = PROMO_CODES[clean];
    if (!promo) {
      return { success: false, message: 'Invalid promotional code.' };
    }

    if (promo.code === 'HARVEST25') {
      const minReq = isPK ? promo.minSubtotalPKR : promo.minSubtotalUSD;
      if (subtotal < minReq) {
        return {
          success: false,
          message: `Code requires a minimum subtotal of ${isPK ? `₨ ${minReq.toLocaleString()}` : `$${minReq}`}.`,
        };
      }
    }

    setAppliedPromo(promo);
    if (onTriggerToast) {
      onTriggerToast(`Promotional code "${clean}" applied successfully.`, 'success');
    }
    return { success: true, message: `Promo applied: ${promo.description}` };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    if (onTriggerToast) {
      onTriggerToast('Promotional code removed.', 'info');
    }
  };

  return (
    <BotanicalCartContext.Provider
      value={{
        cartItems,
        totalItemCount,
        subtotalUSD,
        subtotal,
        shippingFee,
        discountAmount,
        total,
        isFreeShipping,
        freeShippingProgress,
        amountNeededForFreeShipping,
        isGiftUnlocked,
        giftProgress,
        amountNeededForGift,
        complimentaryGift: STORE_CONFIG.complimentaryGift,
        badgeBump,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        addToBag,
        updateQuantity,
        removeFromBag,
        clearBag,
      }}
    >
      {children}
    </BotanicalCartContext.Provider>
  );
}

export function useBotanicalCart() {
  const context = useContext(BotanicalCartContext);
  if (!context) {
    throw new Error('useBotanicalCart must be used within a BotanicalCartProvider');
  }
  return context;
}
