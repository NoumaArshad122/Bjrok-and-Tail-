import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { STORE_CONFIG } from '../config/storeConfig';

const BotanicalCartContext = createContext(null);
const CART_STORAGE_KEY = 'nordic_botanical_bag_v2';

export function BotanicalCartProvider({ children, onTriggerToast }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      // Clear legacy preloaded item from v1 if present
      localStorage.removeItem('nordic_botanical_bag_v1');
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [badgeBump, setBadgeBump] = useState(false);
  const [flyingParticle, setFlyingParticle] = useState(null);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cartItems]);

  const triggerBadgeBump = () => {
    setBadgeBump(true);
    setTimeout(() => setBadgeBump(false), 450);
  };

  /**
   * Adds an item to the botanical bag.
   * Supports flying token animation coordinates.
   */
  const addToBag = (product, quantity = 1, startCoords = null) => {
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

    // Trigger flying particle animation if coordinates supplied
    if (startCoords) {
      setFlyingParticle({
        id: Date.now(),
        startX: startCoords.x,
        startY: startCoords.y,
        image: (product.images && product.images[0]) || '',
      });
      setTimeout(() => {
        setFlyingParticle(null);
        triggerBadgeBump();
      }, 600);
    } else {
      triggerBadgeBump();
    }

    if (onTriggerToast) {
      onTriggerToast(`Added "${product.title}" to your botanical bag.`, 'success');
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
  };

  // Calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalItemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Free shipping ($75 threshold)
  const isFreeShipping = subtotal >= STORE_CONFIG.freeShippingThreshold;
  const amountNeededForFreeShipping = Math.max(0, STORE_CONFIG.freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / STORE_CONFIG.freeShippingThreshold) * 100)
  );
  const shippingFee = cartItems.length === 0 ? 0 : isFreeShipping ? 0 : STORE_CONFIG.standardShippingFee;

  // Complimentary Gift ($100 threshold)
  const isGiftUnlocked = subtotal >= STORE_CONFIG.complimentaryGiftThreshold;
  const amountNeededForGift = Math.max(0, STORE_CONFIG.complimentaryGiftThreshold - subtotal);
  const giftProgress = Math.min(
    100,
    Math.round((subtotal / STORE_CONFIG.complimentaryGiftThreshold) * 100)
  );

  const total = subtotal + shippingFee;

  return (
    <BotanicalCartContext.Provider
      value={{
        cartItems,
        totalItemCount,
        subtotal,
        shippingFee,
        total,
        isFreeShipping,
        freeShippingProgress,
        amountNeededForFreeShipping,
        isGiftUnlocked,
        giftProgress,
        amountNeededForGift,
        complimentaryGift: STORE_CONFIG.complimentaryGift,
        badgeBump,
        flyingParticle,
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
