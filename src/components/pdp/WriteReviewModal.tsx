import React, { useState } from 'react';
import { X, Star, ShieldCheck } from 'lucide-react';
import { MetalFinish } from '../../types';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productTitle: string;
  availableFinishes: MetalFinish[];
  onSubmitReview: (review: {
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

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  productId,
  productTitle,
  availableFinishes,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [finishPurchased, setFinishPurchased] = useState<MetalFinish>(availableFinishes[0] || 'Rhodium Silver');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitReview({
        productId,
        author: author.trim(),
        city: city.trim() || 'Indore, MP',
        rating,
        title: title.trim(),
        content: content.trim(),
        verifiedPurchase: true,
        finishPurchased,
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5E0DC] overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="p-5 bg-[#FAF7F2] border-b border-[#E5E0DC] flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#083335] font-bold">
              Customer Feedback
            </div>
            <h3 className="font-serif text-lg font-bold text-[#083335]">
              Write a Review for {productTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-[#083335] rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Star Rating Selector */}
          <div>
            <label className="block font-bold text-stone-700 mb-1.5 uppercase tracking-wider text-[11px]">
              Overall Purity & Craftsmanship Rating *
            </label>
            <div className="flex items-center space-x-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-[#DFC168] hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      (hoverRating || rating) >= star ? 'fill-[#DFC168] text-[#DFC168]' : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 font-bold text-[#083335] text-sm">
                {hoverRating || rating} / 5
              </span>
            </div>
          </div>

          {/* Author Name and Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-stone-700 mb-1">Your Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Radhika Sharma"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
              />
            </div>
            <div>
              <label className="block font-medium text-stone-700 mb-1">City / Region *</label>
              <input
                type="text"
                placeholder="e.g. Indore, MP"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
              />
            </div>
          </div>

          {/* Finish Selected */}
          <div>
            <label className="block font-medium text-stone-700 mb-1">Metal Finish Purchased</label>
            <select
              value={finishPurchased}
              onChange={(e) => setFinishPurchased(e.target.value as MetalFinish)}
              className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg text-xs"
            >
              {availableFinishes.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Review Headline */}
          <div>
            <label className="block font-medium text-stone-700 mb-1">Review Headline *</label>
            <input
              type="text"
              required
              placeholder="e.g. Absolutely radiant silver, zero tarnishing!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
            />
          </div>

          {/* Review Content */}
          <div>
            <label className="block font-medium text-stone-700 mb-1">Your Detailed Experience *</label>
            <textarea
              rows={4}
              required
              placeholder="Share how the jewellery looks, the weight, shine, packaging, and everyday comfort..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
            />
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Reviews are published with a <strong>Verified Patron</strong> trust seal.</span>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end gap-3 pt-3 border-t border-[#E5E0DC]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-600 hover:text-stone-800 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#083335] hover:bg-[#052224] text-white text-xs uppercase tracking-wider font-bold rounded-lg transition-colors shadow-xs"
            >
              {isSubmitting ? 'Publishing...' : 'Submit Verified Review'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
