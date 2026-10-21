import React from 'react';
import { formatCurrency } from '../../lib/formatCurrency';

export default function Price({
  price,
  compareAtPrice,
  size = 'md',
  className = '',
}) {
  const isSale = compareAtPrice && compareAtPrice > price;

  const sizeClasses = {
    sm: { current: 'text-sm font-bold', compare: 'text-xs' },
    md: { current: 'text-base font-extrabold text-[#123B72]', compare: 'text-xs' },
    lg: { current: 'text-2xl font-extrabold text-[#123B72]', compare: 'text-base' },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`flex items-baseline gap-2 flex-wrap ${className}`}>
      <span className={`${currentSize.current} text-[#123B72]`}>
        {formatCurrency(price)}
      </span>
      {isSale && (
        <span className={`${currentSize.compare} text-slate-400 line-through font-normal`}>
          {formatCurrency(compareAtPrice)}
        </span>
      )}
    </div>
  );
}
