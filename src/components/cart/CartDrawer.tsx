import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  ArrowRight,
  Tag,
  Check
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const finalTotal = Math.max(0, cartSubtotal - (appliedCoupon?.discountAmount || 0));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFFFF] shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#E5E0DC] flex items-center justify-between bg-[#FBF9F7]">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#083335]" />
              <h3 className="font-serif text-lg font-semibold tracking-wide text-[#083335]">
                Your Jewellery Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-[#083335] rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#FAF7F2] p-3.5 border-b border-[#E5E0DC]">
            <div className="flex items-center justify-between text-xs text-[#083335] font-medium mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#DFC168]" />
                {amountNeededForFreeShipping > 0 ? (
                  <span>Add <strong className="text-[#083335]">₹{amountNeededForFreeShipping}</strong> more for <strong>Free Express Shipping</strong></span>
                ) : (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> You've unlocked Free Insured PAN India Shipping!
                  </span>
                )}
              </span>
              <span className="text-[11px] text-stone-500 font-normal">{progressPercent}%</span>
            </div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#083335] h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#FBF9F7] flex items-center justify-center text-stone-300 mb-4 border border-[#E5E0DC]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg text-[#083335] font-medium mb-1">Your bag is empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mb-6">
                  Explore our handcrafted 925 sterling silver collections or design a custom piece.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/collections');
                  }}
                  className="px-6 py-2.5 bg-[#083335] text-white text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-[#052224] transition-colors"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex space-x-3.5 pb-4 border-b border-[#F0ECE8] last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 sm:w-22 sm:h-22 object-cover rounded-lg bg-[#F5F2EB] border border-[#E5E0DC]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-sm font-medium text-[#083335] leading-tight">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant and Customization Meta */}
                      <div className="mt-1 space-y-0.5 text-[11px] text-stone-500">
                        <div>
                          Finish: <span className="font-medium text-[#083335]">{item.finish}</span>
                        </div>
                        {item.size && (
                          <div>
                            Size: <span className="font-medium text-[#083335]">{item.size}</span>
                          </div>
                        )}
                        {item.engraving && (
                          <div className="text-[#A8823E] italic">
                            Engraved: "{item.engraving}"
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#E5E0DC] rounded-lg bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-stone-500 hover:text-[#083335] transition-colors"
                          title="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-semibold text-[#083335]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-stone-500 hover:text-[#083335] transition-colors"
                          title="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-bold text-[#083335]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Checkout Actions */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#E5E0DC] bg-[#FBF9F7] space-y-3">
              
              {/* Promo Code Applicator */}
              {!appliedCoupon ? (
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. ARGI10, INDORE)"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value);
                          setCouponError('');
                        }}
                        className="w-full pl-8 pr-2 py-1.5 text-xs uppercase bg-white border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                      />
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5 pointer-events-none" />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider bg-[#083335] text-white rounded-lg hover:bg-[#052224] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-rose-600 pl-1">{couponError}</p>
                  )}
                </form>
              ) : (
                <div className="flex items-center justify-between p-2 bg-[#FAF7EE] border border-[#DFC168]/40 rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 text-[#083335]">
                    <Tag className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-₹{appliedCoupon.discountAmount})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-stone-700 text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-[#E5E0DC]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#083335]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span>-₹{appliedCoupon.discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>PAN India Shipping</span>
                  <span className="font-medium text-emerald-700">
                    {cartSubtotal >= freeShippingThreshold ? 'FREE' : '₹150'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#083335] pt-2 border-t border-[#E5E0DC]">
                  <span>Total Payable</span>
                  <span className="text-base text-[#083335]">
                    ₹{(finalTotal + (cartSubtotal >= freeShippingThreshold ? 0 : 150)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#083335] text-white font-semibold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center space-x-2 hover:bg-[#052224] transition-colors shadow-md group border border-[#0c4346]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#DFC168]" />
                <span>100% Certified 925 Hallmark & Insured Transit Guarantee</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
