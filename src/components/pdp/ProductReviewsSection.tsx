import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquarePlus, ThumbsUp } from 'lucide-react';
import { CustomerReview, MetalFinish, Product } from '../../types';
import { WriteReviewModal } from './WriteReviewModal';

interface ProductReviewsSectionProps {
  product: Product;
  reviews: CustomerReview[];
  onAddReview: (review: {
    productId: string;
    author: string;
    city: string;
    rating: number;
    title: string;
    content: string;
    verifiedPurchase: boolean;
    finishPurchased?: MetalFinish;
  }) => void;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({
  product,
  reviews,
  onAddReview,
}) => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});

  const toggleHelpful = (reviewId: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1,
    }));
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : product.rating.toFixed(1);

  const totalReviews = reviews.length > 0 ? reviews.length : product.reviewCount;

  // Rating breakdown counts
  const starCounts = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    const percent = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : (star === 5 ? 85 : star === 4 ? 15 : 0);
    return { star, count, percent };
  });

  return (
    <div className="mt-16 pt-12 border-t border-[#E5E0DC]">
      
      {/* Section Heading */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#083335] font-bold">
            Patron Experiences
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#083335] font-medium mt-0.5">
            Verified Customer Reviews ({totalReviews})
          </h2>
        </div>
        <button
          onClick={() => setIsWriteModalOpen(true)}
          className="px-5 py-2.5 bg-[#083335] hover:bg-[#052224] text-white text-xs uppercase tracking-wider font-bold rounded-lg flex items-center gap-2 transition-colors shadow-xs"
        >
          <MessageSquarePlus className="w-4 h-4 text-[#DFC168]" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Aggregate Score Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E5E0DC] mb-10">
        
        {/* Left Big Rating Box */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 sm:border-r border-[#E5E0DC]">
          <div className="font-serif text-5xl font-bold text-[#083335] leading-none mb-2">
            {avgRating}
          </div>
          <div className="flex items-center space-x-1 text-[#DFC168] mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(Number(avgRating)) ? 'fill-[#DFC168]' : 'text-stone-300'
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-stone-600 font-medium">
            Based on {totalReviews} certified patron purchases
          </div>
          <div className="text-[10px] text-emerald-800 font-semibold mt-2 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Verified Pure 925 Buyers
          </div>
        </div>

        {/* Middle Progress Bars */}
        <div className="md:col-span-8 flex flex-col justify-center space-y-2 text-xs">
          {starCounts.map(({ star, count, percent }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="w-12 text-stone-600 font-medium flex items-center gap-1">
                {star} <Star className="w-3 h-3 fill-[#DFC168] text-[#DFC168]" />
              </span>
              <div className="flex-1 bg-stone-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#083335] h-full rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="w-10 text-right text-stone-400 text-[11px]">{percent}%</span>
            </div>
          ))}
        </div>

      </div>

      {/* Customer Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-[#E5E0DC] p-6">
            <p className="text-stone-500 text-xs mb-3">Be the first to review {product.title}!</p>
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="px-4 py-2 border border-[#083335] text-[#083335] text-xs font-semibold rounded-lg hover:bg-stone-50"
            >
              Write First Review
            </button>
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 sm:p-6 rounded-xl border border-[#E5E0DC] shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#083335] text-[#DFC168] font-serif font-bold text-xs flex items-center justify-center">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-[#083335]">{rev.author}</span>
                      {rev.verifiedPurchase && (
                        <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Buyer
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-stone-400">
                      {rev.city} • {rev.date}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-[#DFC168]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-[#DFC168]' : 'text-stone-200'}`}
                    />
                  ))}
                </div>
              </div>

              {rev.finishPurchased && (
                <div className="text-[11px] text-stone-500">
                  Purchased: <strong className="text-[#083335]">{rev.finishPurchased}</strong>
                </div>
              )}

              <h4 className="font-serif font-bold text-sm text-[#083335]">
                {rev.title}
              </h4>

              <p className="text-xs text-stone-600 leading-relaxed">
                {rev.content}
              </p>

              <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-100">
                <button
                  onClick={() => toggleHelpful(rev.id)}
                  className="flex items-center gap-1.5 text-stone-500 hover:text-[#083335] transition-colors"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful ({helpfulCounts[rev.id] || 0})</span>
                </button>
                <span>BIS 925 Hallmark Verified</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        productId={product.id}
        productTitle={product.title}
        availableFinishes={product.finishes}
        onSubmitReview={onAddReview}
      />

    </div>
  );
};
