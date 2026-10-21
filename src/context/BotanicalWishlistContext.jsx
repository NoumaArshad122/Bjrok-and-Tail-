import React, { createContext, useContext, useEffect, useState } from 'react';

const BotanicalWishlistContext = createContext(null);
const WISHLIST_STORAGE_KEY = 'nordic_botanical_wishlist_v1';

export function BotanicalWishlistProvider({ children, onTriggerToast }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Could not save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const toggleWishlist = (product) => {
    let added = false;
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        added = false;
        return prev.filter((item) => item.id !== product.id);
      } else {
        added = true;
        return [...prev, product];
      }
    });

    if (onTriggerToast) {
      onTriggerToast(
        added
          ? `Saved "${product.title}" to your sacred collection.`
          : `Removed "${product.title}" from saved items.`,
        added ? 'success' : 'info'
      );
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <BotanicalWishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </BotanicalWishlistContext.Provider>
  );
}

export function useBotanicalWishlist() {
  const context = useContext(BotanicalWishlistContext);
  if (!context) {
    throw new Error('useBotanicalWishlist must be used within a BotanicalWishlistProvider');
  }
  return context;
}
