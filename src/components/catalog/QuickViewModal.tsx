import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Product, MetalFinish } from '../../types';
import { useStore } from '../../context/StoreContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState<MetalFinish>(
    product ? product.finishes[0] : 'Rhodium Silver'
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes ? product.sizes[0] : ''
  );

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[selectedImageIndex] || product.images[0],
      finish: selectedFinish,
      size: selectedSize || undefined,
      quantity: 1,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden z-10 animate-fadeIn border border-[#083335]/20">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 text-stone-400 hover:text-[#083335] bg-white/80 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Column */}
          <div className="bg-[#FBF9F7] p-5 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-[#E5E0DC]">
            <div className="w-full aspect-square overflow-hidden rounded-xl bg-white border border-[#E5E0DC] mb-3">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx ? 'border-[#083335] scale-105' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] uppercase tracking-widest text-[#083335] font-bold">
                  {product.category}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-[10px] text-stone-500 font-mono">
                  {product.sku}
                </span>
              </div>

              <h2 className="font-serif text-xl font-medium text-[#083335] leading-snug">
                {product.title}
              </h2>

              {/* Price & Rating */}
              <div className="mt-3 flex items-baseline space-x-3">
                <span className="text-2xl font-bold text-[#083335]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-stone-500 flex items-center gap-1">
                  <span className="text-[#DFC168]">★</span>
                  <span>{product.rating} ({product.reviewCount})</span>
                </span>
              </div>

              <p className="text-xs text-stone-600 mt-3 leading-relaxed line-clamp-3">
                {product.description}
              </p>

              {/* Finish Selector */}
              <div className="mt-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#083335] mb-1.5">
                  Finish: <span className="font-bold text-[#A8823E]">{selectedFinish}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.finishes.map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFinish(f)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                        selectedFinish === f
                          ? 'border-[#083335] bg-[#083335] text-white font-medium shadow-xs'
                          : 'border-[#E5E0DC] text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ring / Wrist Sizes */}
              {product.sizes && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#083335]">
                      Select Size (Indian Size)
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`w-9 h-9 text-xs rounded-lg border flex items-center justify-center font-medium transition-all ${
                          selectedSize === sz
                            ? 'border-[#083335] bg-[#083335] text-white'
                            : 'border-[#E5E0DC] text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust Badge */}
              <div className="mt-5 p-2.5 bg-[#FAF7F2] border border-[#083335]/20 rounded-lg flex items-center gap-2 text-xs text-[#083335]">
                <ShieldCheck className="w-4 h-4 text-[#DFC168] shrink-0" />
                <span className="font-medium">100% Certified 925 Hallmark & Insured PAN India Dispatch</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-[#E5E0DC] space-y-2.5">
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-[#083335] hover:bg-[#052224] text-white text-xs uppercase tracking-widest font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors border border-[#0c4346]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#DFC168]" />
                  <span>Add to Bag</span>
                </button>
                
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 border rounded-lg transition-colors ${
                    isWishlisted 
                      ? 'border-rose-300 bg-rose-50 text-rose-600' 
                      : 'border-[#E5E0DC] text-stone-600 hover:border-stone-400'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              <Link
                to={`/product/${product.slug || product.id}`}
                onClick={onClose}
                className="w-full text-center py-1.5 text-xs text-stone-500 hover:text-[#083335] flex items-center justify-center gap-1 transition-colors font-medium"
              >
                <span>View Full Product Page & Sizing Guide</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
