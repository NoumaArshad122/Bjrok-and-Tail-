import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'aura_store_cart_v1';
export const FREE_SHIPPING_THRESHOLD = 150.0;
export const STANDARD_SHIPPING_FEE = 9.99;

const VALID_COUPONS = {
  SAVE10: { code: 'SAVE10', discountPercent: 10, description: '10% off entire order' },
  AUDIO40: { code: 'AUDIO40', discountPercent: 15, description: '15% tech seasonal discount' },
  FREESHIP: { code: 'FREESHIP', freeShipping: true, description: 'Free shipping on any order' },
};

export function CartProvider({ children, onTriggerToast }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  /**
   * Adds an item to the cart respecting variant and stock limits.
   */
  const addToCart = (product, selectedVariant = null, quantity = 1) => {
    const variantId = selectedVariant ? selectedVariant.id : 'default';
    const itemKey = `${product.id}__${variantId}`;
    const maxStock = product.stock || 20;

    let addedItemTitle = product.title;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.key === itemKey);

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
          key: itemKey,
          productId: product.id,
          slug: product.slug,
          title: product.title,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          image: (product.images && product.images[0]) || '',
          variant: selectedVariant,
          quantity: Math.min(quantity, maxStock),
          stock: maxStock,
          category: product.category,
        };
        return [newItem, ...prevItems];
      }
    });

    if (onTriggerToast) {
      onTriggerToast(`Added "${addedItemTitle}" to your shopping cart!`, 'success');
    }

    // Auto open drawer to provide responsive cart feedback
    openDrawer();
  };

  const updateQuantity = (itemKey, quantity) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.key === itemKey) {
            const validQuantity = Math.max(1, Math.min(quantity, item.stock));
            return { ...item, quantity: validQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (itemKey) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.key !== itemKey));
    if (onTriggerToast) {
      onTriggerToast('Item removed from cart', 'info');
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    const normalized = (code || '').trim().toUpperCase();
    if (!normalized) {
      setCouponError('Please enter a coupon code.');
      return false;
    }
    const matched = VALID_COUPONS[normalized];
    if (matched) {
      setCoupon(matched);
      setCouponError('');
      if (onTriggerToast) {
        onTriggerToast(`Promo code "${normalized}" applied!`, 'success');
      }
      return true;
    } else {
      setCouponError('Invalid coupon code. Try "SAVE10" or "AUDIO40".');
      return false;
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponError('');
    if (onTriggerToast) {
      onTriggerToast('Coupon removed', 'info');
    }
  };

  // Calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!coupon || !coupon.discountPercent) return 0;
    return (subtotal * coupon.discountPercent) / 100;
  }, [subtotal, coupon]);

  const isEligibleForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || (coupon && coupon.freeShipping);

  const shippingFee = useMemo(() => {
    if (cartItems.length === 0) return 0;
    return isEligibleForFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  }, [cartItems, isEligibleForFreeShipping]);

  const total = useMemo(() => {
    if (cartItems.length === 0) return 0;
    return Math.max(0, subtotal - discountAmount + shippingFee);
  }, [subtotal, discountAmount, shippingFee]);

  const totalCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const freeShippingProgress = useMemo(() => {
    if (subtotal >= FREE_SHIPPING_THRESHOLD) return 100;
    return Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  }, [subtotal]);

  const amountNeededForFreeShipping = useMemo(() => {
    return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  }, [subtotal]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCount,
        subtotal,
        discountAmount,
        shippingFee,
        total,
        freeShippingProgress,
        amountNeededForFreeShipping,
        isEligibleForFreeShipping,
        coupon,
        couponError,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
