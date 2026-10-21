import React from 'react';

export default function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse bg-slate-200/70 rounded-xl ${className}`}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-3 shadow-sm">
      <Skeleton className="w-full aspect-square rounded-xl" />
      <div className="space-y-2 pt-1">
        <Skeleton className="w-1/3 h-3 rounded" />
        <Skeleton className="w-3/4 h-4 rounded" />
        <Skeleton className="w-1/2 h-4 rounded" />
      </div>
      <div className="pt-2 flex items-center justify-between">
        <Skeleton className="w-1/3 h-5 rounded" />
        <Skeleton className="w-8 h-8 rounded-lg" />
      </div>
    </div>
  );
}
