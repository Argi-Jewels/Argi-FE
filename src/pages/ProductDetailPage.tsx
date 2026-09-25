import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Heart, 
  Share2, 
  Truck, 
  RotateCcw, 
  Ruler, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  MessageCircle,
  CheckCircle2,
  Star,
  Plus,
  Minus
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MetalFinish } from '../types';
import { RingSizeGuideModal } from '../components/pdp/RingSizeGuideModal';
import { ProductReviewsSection } from '../components/pdp/ProductReviewsSection';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    getProductBySlugOrId, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    showToast,
    addReview,
    getProductReviews 
  } = useStore();

  const product = getProductBySlugOrId(id || '');

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState<MetalFinish>(
    product?.finishes[0] || 'Rhodium Silver'
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes ? product.sizes[0] : ''
  );
  const [engravingText, setEngravingText] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  
  // Accordions
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    details: true,
    care: false,
    shipping: false,
    reviews: false,
  });

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#FBF9F7]">
        <h2 className="font-serif text-2xl text-[#083335] mb-2">Jewelry piece not found</h2>
        <p className="text-xs text-stone-500 mb-6">The requested piece may have been moved or updated.</p>
        <Link to="/collections" className="px-6 py-2.5 bg-[#083335] text-white text-xs uppercase tracking-widest rounded-lg">
          Back to Collections
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const reviews = getProductReviews(product.id);

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      finish: selectedFinish,
      size: selectedSize || undefined,
      engraving: engravingText.trim() || undefined,
      quantity,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out ${product.title} in pure 925 sterling silver from Argi Jewels!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard.', 'info');
    }
  };

  const whatsappInquiryUrl = `https://wa.me/919232594228?text=${encodeURIComponent(
    `Hello Argi Jewels, I am inquiring about "${product.title}" (SKU: ${product.sku}) in ${selectedFinish}. Can you share more details or custom sizing?`
  )}`;

  return (
    <div className="min-h-screen bg-[#FFFFFF] py-8 sm:py-12 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="text-xs text-stone-500 mb-6 flex items-center space-x-2">
          <Link to="/" className="hover:text-[#083335]">Home</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-[#083335]">Collections</Link>
          <span>/</span>
          <Link to={`/collections?category=${product.category}`} className="hover:text-[#083335]">{product.category}</Link>
          <span>/</span>
          <span className="text-[#083335] font-semibold truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Gallery Column */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-20 shrink-0">
                {product.images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === index 
                        ? 'border-[#083335] shadow-sm' 
                        : 'border-[#E5E0DC] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.title} view ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Active High-Resolution Visual */}
            <div className="flex-1 relative aspect-4/5 rounded-2xl overflow-hidden bg-[#FBF9F7] border border-[#E5E0DC] shadow-sm group">
              <img
                src={product.images[activeImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110 cursor-crosshair"
              />

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <span className="bg-white/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-[#083335] rounded-lg shadow-xs border border-[#E5E0DC] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#DFC168]" /> 100% Certified 925
                </span>
                {product.isBestseller && (
                  <span className="bg-[#083335] text-[#DFC168] px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-lg shadow-xs border border-[#0c4346]">
                    Sarafa Bestseller
                  </span>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-sm ${
                    isWishlisted ? 'bg-rose-50 text-rose-600' : 'bg-white/90 text-stone-700 hover:text-rose-600'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-700 hover:text-[#083335] transition-colors shadow-sm"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* Details & Customization Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#A8823E]">
                  {product.category} • {product.weight || 'Solid 925 Silver'}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  SKU: {product.sku}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl text-[#083335] font-medium mt-1 leading-snug">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-[#DFC168]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#DFC168]" />
                  ))}
                </div>
                <span className="text-xs text-stone-600 font-medium">
                  {product.rating} ({product.reviewCount} verified customer reviews)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5E0DC] flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-[#083335]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Inclusive of all taxes & BIS Hallmarking fees. Free PAN India delivery.
                </p>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                  ● In Stock (Only {product.stockCount} left)
                </span>
              </div>
            </div>

            {/* Finish Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#083335]">
                  Select Silver Plating: <span className="text-[#A8823E] font-medium">{selectedFinish}</span>
                </label>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.finishes.map((finish: MetalFinish) => (
                  <button
                    key={finish}
                    onClick={() => setSelectedFinish(finish)}
                    className={`py-2.5 px-3 rounded-lg border text-xs font-semibold text-center transition-all ${
                      selectedFinish === finish
                        ? 'border-[#083335] bg-[#083335] text-white shadow-xs'
                        : 'border-[#E5E0DC] text-stone-700 hover:border-stone-400 bg-white'
                    }`}
                  >
                    {finish}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector with Size Guide modal trigger */}
            {product.sizes && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#083335]">
                    Indian Size: <span className="text-[#A8823E] font-medium">Size {selectedSize}</span>
                  </label>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-[#083335] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Ruler className="w-3.5 h-3.5" /> Ring Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz: string) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[42px] h-10 px-2 rounded-lg border text-xs font-medium flex items-center justify-center transition-all ${
                        selectedSize === sz
                          ? 'border-[#083335] bg-[#083335] text-white shadow-xs font-bold'
                          : 'border-[#E5E0DC] text-stone-700 hover:border-stone-400 bg-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Optional Laser Engraving */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#083335] mb-1.5">
                Complimentary Inner Laser Engraving (Optional)
              </label>
              <input
                type="text"
                maxLength={18}
                placeholder="e.g., Initials, coordinates, date (max 18 chars)"
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
              />
              <span className="text-[10px] text-stone-400 mt-1 block">
                Precision diamond-laser engraved by our Sarafa craftsmen before dispatch.
              </span>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-[#E5E0DC] rounded-lg bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-stone-500 hover:text-[#083335]"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-semibold text-[#083335]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-stone-500 hover:text-[#083335]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-white border-2 border-[#083335] text-[#083335] hover:bg-[#083335] hover:text-white text-xs uppercase tracking-widest font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#DFC168]" />
                  <span>Add to Bag</span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-[#083335] hover:bg-[#052224] text-white text-xs uppercase tracking-[0.2em] font-bold rounded-lg shadow-md transition-colors border border-[#0c4346]"
              >
                Buy Now with 1-Click
              </button>
            </div>

            {/* Direct WhatsApp Consultation */}
            <div className="pt-2">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-[#E8F8EE] border border-[#25D366]/40 text-[#0F682C] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#D5F3DF] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Ask Indore Address on WhatsApp about this piece</span>
              </a>
            </div>

            {/* Trust Assurance Strip */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E5E0DC] text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#083335]" />
                <span>Free Insured PAN India Air Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#083335]" />
                <span>15-Day Complimentary Resizing</span>
              </div>
            </div>

            {/* Product Accordions */}
            <div className="border-t border-[#E5E0DC] pt-4 divide-y divide-[#E5E0DC] text-xs">
              
              {/* Accordion 1: Details & Dimensions */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-[#083335]"
                >
                  <span>Specifications & Craftsmanship</span>
                  {openAccordions.details ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.details && (
                  <div className="mt-3 space-y-2 text-stone-600 leading-relaxed">
                    <p>{product.description}</p>
                    <ul className="space-y-1.5 pt-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#083335]" />
                        <strong>Base Metal:</strong> Pure 925 Sterling Silver (BIS Hallmarked)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#083335]" />
                        <strong>Plating:</strong> Triple-layer protective anti-tarnish rhodium
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#083335]" />
                        <strong>Hypoallergenic:</strong> 100% Nickel-free & Lead-free
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#083335]" />
                        <strong>Origin:</strong> Handcrafted in Sarafa Bazar, Indore, India
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Care Instructions */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-[#083335]"
                >
                  <span>Silver Care & Anti-Tarnish Preservation</span>
                  {openAccordions.care ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.care && (
                  <div className="mt-3 space-y-2 text-stone-600 leading-relaxed">
                    <p>Every Argi Jewels piece is dipped in an anti-tarnish rhodium bath. To maintain everlasting moonlight luster:</p>
                    <ul className="list-disc list-inside space-y-1 pl-1">
                      <li>Avoid spraying harsh alcohol perfumes, hairsprays, or chlorine pool water directly on the silver.</li>
                      <li>Store in the complimentary airtight zip pouch and velvet box provided when not in use.</li>
                      <li>Buff gently with the included micro-suede polishing cloth to remove daily skin oils.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping & Returns */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-[#083335]"
                >
                  <span>PAN India Shipping & Authenticity Card</span>
                  {openAccordions.shipping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.shipping && (
                  <div className="mt-3 space-y-2 text-stone-600 leading-relaxed">
                    <p>
                      Dispatched from our Indore address within 24-48 hours. Shipped via insured air express with Blue Dart & Delhivery. Real-time tracking link sent to your SMS & WhatsApp.
                    </p>
                    <p>
                      Each order arrives with our stamped <strong>925 Certificate of Authenticity</strong> detailing weight, purity, and artisan hallmarking code.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Customer Reviews & Ratings Section */}
        <ProductReviewsSection
          product={product}
          reviews={reviews}
          onAddReview={addReview}
        />

      </div>

      {/* Floating Sticky Mobile Bar (Mobile Only) */}
      <div className="fixed bottom-14 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E5E0DC] p-3 shadow-lg lg:hidden flex items-center justify-between gap-3">
        <div>
          <div className="text-xs text-stone-500 font-medium">Price</div>
          <div className="text-base font-bold text-[#083335]">
            ₹{product.price.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2.5 bg-white border-2 border-[#083335] text-[#083335] text-[11px] uppercase tracking-wider font-bold rounded-lg"
          >
            Add +
          </button>
          <button
            onClick={handleBuyNow}
            className="px-5 py-2.5 bg-[#083335] text-white text-[11px] uppercase tracking-wider font-bold rounded-lg shadow"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Sizing Modal */}
      <RingSizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
};
