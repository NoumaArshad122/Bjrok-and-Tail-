import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="py-24 text-center max-w-md mx-auto px-4 space-y-5">
      <div className="w-16 h-16 rounded-3xl bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto">
        <Compass className="w-8 h-8" />
      </div>
      <div>
        <span className="text-4xl font-black text-[#123B72]">404</span>
        <h1 className="text-xl font-bold text-slate-800 mt-1">Page Not Found</h1>
        <p className="text-xs text-slate-500 mt-2">
          The page you're looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>
      </div>
      <Link to="/">
        <Button variant="primary">Return to Homepage</Button>
      </Link>
    </div>
  );
}
