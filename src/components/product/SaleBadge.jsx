import React from 'react';
import { calculateDiscount } from '../../lib/formatCurrency';

export default function SaleBadge({ price, compareAtPrice, className = '' }) {
  const discount = calculateDiscount(price, compareAtPrice);

  if (discount <= 0) return null;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#E53935] text-white shadow-sm shadow-red-500/25 ${className}`}
    >
      -{discount}% OFF
    </span>
  );
}
