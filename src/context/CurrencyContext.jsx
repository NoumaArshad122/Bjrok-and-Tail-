import React, { createContext, useContext, useState, useEffect } from 'react';
import { REGIONS } from '../config/storeConfig';

const CurrencyContext = createContext(null);
const REGION_STORAGE_KEY = 'bjork_tall_region_pref';

export function CurrencyProvider({ children }) {
  const [regionId, setRegionId] = useState(() => {
    try {
      const saved = localStorage.getItem(REGION_STORAGE_KEY);
      return saved && REGIONS[saved] ? saved : 'US';
    } catch {
      return 'US';
    }
  });

  const activeRegion = REGIONS[regionId] || REGIONS.US;

  useEffect(() => {
    try {
      localStorage.setItem(REGION_STORAGE_KEY, regionId);
    } catch (e) {
      console.warn('Could not persist region preference', e);
    }
  }, [regionId]);

  const setRegion = (newRegionId) => {
    if (REGIONS[newRegionId]) {
      setRegionId(newRegionId);
    }
  };

  /**
   * Convert an amount in USD to the active currency value.
   * @param {number} amountUSD
   * @returns {number}
   */
  const convertAmount = (amountUSD) => {
    if (typeof amountUSD !== 'number' || isNaN(amountUSD)) return 0;
    if (activeRegion.id === 'PK') {
      return Math.round(amountUSD * activeRegion.exchangeRate);
    }
    return amountUSD;
  };

  /**
   * Format an amount in USD into a localized string for the active currency.
   * @param {number} amountUSD
   * @returns {string}
   */
  const formatPrice = (amountUSD) => {
    if (typeof amountUSD !== 'number' || isNaN(amountUSD)) {
      return activeRegion.id === 'PK' ? '₨ 0' : '$0.00';
    }

    if (activeRegion.id === 'PK') {
      const converted = Math.round(amountUSD * activeRegion.exchangeRate);
      return `₨ ${converted.toLocaleString('en-PK')}`;
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amountUSD);
  };

  /**
   * Format an already converted local numeric value (e.g. for PKR calculations).
   * @param {number} localAmount
   * @returns {string}
   */
  const formatRaw = (localAmount) => {
    if (typeof localAmount !== 'number' || isNaN(localAmount)) {
      return activeRegion.id === 'PK' ? '₨ 0' : '$0.00';
    }

    if (activeRegion.id === 'PK') {
      return `₨ ${Math.round(localAmount).toLocaleString('en-PK')}`;
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(localAmount);
  };

  const value = {
    regionId,
    activeRegion,
    setRegion,
    formatPrice,
    convertAmount,
    formatRaw,
    currencySymbol: activeRegion.currencySymbol,
    currencyCode: activeRegion.currency,
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
