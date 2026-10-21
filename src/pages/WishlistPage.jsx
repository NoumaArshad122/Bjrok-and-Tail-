import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/ui/Button';
import { Heart, ShoppingBag, Trash2, ChevronRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, clearWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => {
      const defaultVariant = product.variants && product.variants.length > 0 ? product.variants[0] : null;
      addToCart(product, defaultVariant, 1);
    });
    clearWishlist();
  };

  return (
    <div className="py-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#2563EB] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">Wishlist</span>
        </nav>

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#123B72]">
              Your Saved Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {wishlist.length} {wishlist.length === 1 ? 'product' : 'products'} saved for later
            </p>
          </div>

          {wishlist.length > 0 && (
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={clearWishlist}
                className="text-slate-500 hover:text-rose-600"
              >
                Clear Wishlist
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleMoveAllToCart}
                className="flex items-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Cart</span>
              </Button>
            </div>
          )}
        </div>

        {/* Wishlist Grid */}
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 max-w-md mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-[#123B72]">Your Wishlist is Empty</h2>
            <p className="text-xs text-slate-500">
              Save your favorite items so you don't lose track of drops, seasonal sales, or limited editions.
            </p>
            <Button variant="primary" onClick={() => navigate('/shop')}>
              Explore Catalog
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
