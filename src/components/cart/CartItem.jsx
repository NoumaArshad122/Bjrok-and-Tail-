import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../lib/formatCurrency';

export default function CartItem({ item, onUpdateQuantity, onRemove, onCloseDrawer }) {
  const isMin = item.quantity <= 1;
  const isMax = item.quantity >= (item.stock || 20);

  return (
    <div className="flex gap-4 py-4 border-b border-slate-100 last:border-0 group">
      {/* Thumbnail */}
      <Link
        to={`/product/${item.slug}`}
        onClick={onCloseDrawer}
        className="w-20 h-20 rounded-xl overflow-hidden bg-slate-50 border border-slate-200/80 shrink-0"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              to={`/product/${item.slug}`}
              onClick={onCloseDrawer}
              className="font-semibold text-sm text-[#123B72] hover:text-[#2563EB] line-clamp-1 transition-colors"
            >
              {item.title}
            </Link>
            <button
              type="button"
              onClick={() => onRemove(item.key)}
              aria-label="Remove item"
              className="text-slate-400 hover:text-[#E53935] p-1 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {item.variant && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="w-2.5 h-2.5 rounded-full border border-slate-300"
                style={{ backgroundColor: item.variant.color }}
              />
              <span className="text-xs text-slate-500">{item.variant.name}</span>
            </div>
          )}
        </div>

        {/* Quantity Controls & Line Total */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
            <button
              type="button"
              disabled={isMin}
              onClick={() => onUpdateQuantity(item.key, item.quantity - 1)}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-xs font-bold text-slate-800">
              {item.quantity}
            </span>
            <button
              type="button"
              disabled={isMax}
              onClick={() => onUpdateQuantity(item.key, item.quantity + 1)}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-right">
            <span className="text-sm font-extrabold text-[#123B72]">
              {formatCurrency(item.price * item.quantity)}
            </span>
            {item.quantity > 1 && (
              <span className="block text-[10px] text-slate-400">
                {formatCurrency(item.price)} each
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
