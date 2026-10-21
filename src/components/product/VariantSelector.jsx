import React from 'react';
import { Check } from 'lucide-react';

export default function VariantSelector({
  variants = [],
  selectedVariant,
  onSelectVariant,
}) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Color / Edition:
        </span>
        <span className="text-xs font-semibold text-[#123B72]">
          {selectedVariant ? selectedVariant.name : 'Select option'}
        </span>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap">
        {variants.map((v) => {
          const isSelected = selectedVariant && selectedVariant.id === v.id;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelectVariant(v)}
              className={`group relative flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#2563EB] bg-blue-50/50 text-[#123B72] ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
              }`}
            >
              <span
                className="w-4 h-4 rounded-full border border-slate-300 shadow-sm flex items-center justify-center shrink-0"
                style={{ backgroundColor: v.color }}
              >
                {isSelected && (
                  <Check
                    className={`w-2.5 h-2.5 ${
                      v.color === '#f8fafc' || v.color === '#e2e8f0'
                        ? 'text-slate-900'
                        : 'text-white'
                    }`}
                  />
                )}
              </span>
              <span>{v.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
