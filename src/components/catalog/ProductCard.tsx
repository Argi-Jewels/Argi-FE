import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Sparkles } from 'lucide-react';
import { Product, MetalFinish } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const isWishlisted = isInWishlist(product.id);
  const [selectedFinish, setSelectedFinish] = useState<MetalFinish>(product.finishes[0]);
  const [isHovered, setIsHovered] = useState(false);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      finish: selectedFinish,
      size: product.sizes ? product.sizes[0] : undefined,
      quantity: 1,
    });
  };

  const getFinishColorDot = (finish: MetalFinish) => {
    switch (finish) {
      case 'Rhodium Silver':
        return 'bg-gradient-to-tr from-slate-200 to-slate-400 border-slate-300';
      case '18k Yellow Gold Plated':
        return 'bg-gradient-to-tr from-amber-200 to-amber-500 border-amber-400';
      case 'Rose Gold Plated':
        return 'bg-gradient-to-tr from-rose-200 to-rose-400 border-rose-300';
    }
  };

  return (
    <div 
      className="group relative bg-white border border-[#E5E0DC] rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:border-[#083335]/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges Overlay */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
        {product.isBestseller && (
          <span className="bg-[#083335] text-[#DFC168] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs border border-[#0c4346]">
            Bestseller
          </span>
        )}
        {product.isNew && (
          <span className="bg-[#C5A059] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
            New Arrival
          </span>
        )}
        <span className="bg-white/90 backdrop-blur-xs text-[#083335] border border-[#E5E0DC] text-[9px] font-semibold tracking-tight px-1.5 py-0.5 rounded flex items-center gap-0.5">
          <Sparkles className="w-2.5 h-2.5 text-[#C5A059]" /> 925 Hallmark
        </span>
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
          isWishlisted
            ? 'bg-rose-50 text-rose-600 shadow-sm'
            : 'bg-white/80 text-stone-600 hover:bg-white hover:text-rose-600 shadow-xs'
        }`}
        title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
      >
        <Heart className={`w-4 h-4 transition-transform ${isWishlisted ? 'fill-rose-600 scale-110' : ''}`} />
      </button>

      {/* Product Image Container (4:5 Luxury Portrait Ratio) */}
      <Link to={`/product/${product.slug || product.id}`} className="block relative aspect-4/5 overflow-hidden bg-[#FBF9F7]">
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
        />

        {/* Quick View Hover Button */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-[#083335] text-[11px] font-semibold tracking-wider uppercase rounded shadow flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          )}
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2 px-3 bg-[#083335] hover:bg-[#052224] text-white text-[11px] font-bold tracking-wider uppercase rounded shadow flex items-center justify-center gap-1 transition-colors border border-[#0c4346]"
          >
            <span>Add +</span>
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metal Finish Selector Dots */}
          <div className="flex items-center space-x-1.5 mb-2">
            {product.finishes.map((finish) => (
              <button
                key={finish}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedFinish(finish);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${getFinishColorDot(finish)} ${
                  selectedFinish === finish ? 'ring-2 ring-offset-1 ring-[#083335] scale-110' : 'opacity-80'
                }`}
                title={finish}
              />
            ))}
            <span className="text-[10px] text-stone-400 pl-1 font-light truncate">
              {selectedFinish}
            </span>
          </div>

          {/* Product Category & Title */}
          <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-semibold">
            {product.category}
          </span>
          
          <h3 className="font-serif text-sm font-medium text-[#083335] group-hover:text-[#125559] transition-colors line-clamp-1 mt-0.5">
            <Link to={`/product/${product.slug || product.id}`}>
              {product.title}
            </Link>
          </h3>
        </div>

        {/* Pricing & Rating */}
        <div className="mt-3 pt-2.5 border-t border-[#F0ECE8] flex items-baseline justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-sm sm:text-base font-bold text-[#083335]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xs text-stone-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] font-semibold text-emerald-700">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          <div className="text-[11px] text-stone-500 flex items-center gap-0.5">
            <span className="text-[#DFC168]">★</span>
            <span>{product.rating}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
