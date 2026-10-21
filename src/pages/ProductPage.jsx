import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductGallery from '../components/product/ProductGallery';
import VariantSelector from '../components/product/VariantSelector';
import Price from '../components/product/Price';
import SaleBadge from '../components/product/SaleBadge';
import ProductCarousel from '../components/home/ProductCarousel';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  ChevronRight,
  Check,
  Share2,
} from 'lucide-react';

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = PRODUCTS.find((p) => p.slug === slug);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  if (!product) {
    return (
      <div className="py-24 text-center max-w-md mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-[#123B72]">Product Not Found</h2>
        <p className="text-xs text-slate-500">
          The item you are searching for might have been discontinued or moved.
        </p>
        <Button variant="primary" onClick={() => navigate('/shop')}>
          Browse All Products
        </Button>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const maxStock = product.stock || 20;

  const handleAddToCart = () => {
    setIsAdded(true);
    addToCart(product, selectedVariant, quantity);
    setTimeout(() => setIsAdded(false), 1200);
  };

  // Find related items in same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="py-8 bg-white min-h-screen space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium flex-wrap">
          <Link to="/" className="hover:text-[#2563EB] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/shop" className="hover:text-[#2563EB] transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            to={`/shop?category=${product.category}`}
            className="hover:text-[#2563EB] transition-colors capitalize"
          >
            {product.categoryName || product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-xs">
            {product.title}
          </span>
        </nav>

        {/* Product Hero Layout: Gallery + Purchasing Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          {/* Right Column: Details & Purchasing Controls */}
          <div className="lg:col-span-5 space-y-6">
            {/* Category, Rating, Stock */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold uppercase tracking-wider text-[#2563EB]">
                  {product.categoryName || product.category}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                    product.stock > 0
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B72] tracking-tight leading-snug">
                {product.title}
              </h1>

              {/* Rating review row */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-slate-800">{product.rating}</span>
                <span className="text-slate-400">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Pricing Area with Sale Badge */}
            <div className="p-4 rounded-2xl bg-[#F5F8FC] border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  Retail Price
                </span>
                <Price price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />
              </div>
              <SaleBadge price={product.price} compareAtPrice={product.compareAtPrice} />
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Variants Selector */}
            {product.variants && (
              <VariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onSelectVariant={setSelectedVariant}
              />
            )}

            {/* Quantity Stepper & Add to Cart Action */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Quantity
              </span>

              <div className="flex items-center gap-4">
                {/* Quantity Box */}
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50 h-12">
                  <button
                    type="button"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 h-full text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    disabled={quantity >= maxStock}
                    onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))}
                    className="px-3.5 h-full text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <Button
                  variant="primary"
                  size="lg"
                  disabled={product.stock <= 0}
                  onClick={handleAddToCart}
                  className="flex-1 h-12 gap-2 text-sm"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Shopping Cart</span>
                    </>
                  )}
                </Button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={`h-12 w-12 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    inWishlist
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${inWishlist ? 'fill-rose-500 stroke-rose-500' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Delivery & Assurance Strip */}
            <div className="pt-4 border-t border-slate-200 space-y-2.5">
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <Truck className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>
                  <strong>Free Express Shipping:</strong> Orders over $150 qualify for next-day dispatch.
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <RotateCcw className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  <strong>30-Day Guarantee:</strong> If it's not perfect, return for a full refund.
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Official Warranty:</strong> 2-year manufacturer coverage included.
                </span>
              </div>
            </div>

            {/* Product Specifications Table */}
            {product.specs && (
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#123B72] mb-3">
                  Technical Specifications
                </h4>
                <div className="divide-y divide-slate-100 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="py-2 flex justify-between gap-4">
                      <span className="capitalize text-slate-500 font-medium">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="text-slate-800 font-semibold text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-100">
          <ProductCarousel
            title="Customers Also Purchased"
            subtitle="Frequently paired items in this category"
            products={relatedProducts}
          />
        </div>
      )}
    </div>
  );
}
