import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  QrCode, 
  Building2, 
  Banknote, 
  CheckCircle2, 
  MapPin, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  MessageCircle,
  Smartphone,
  FileText,
  Gift,
  Tag,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { lookupPincode } from '../data/pincodes';
import { Order, PaymentMethod } from '../types';
import { BrandLogo } from '../components/common/BrandLogo';
import { OtpVerificationModal } from '../components/common/OtpVerificationModal';
import { InvoiceModal } from '../components/common/InvoiceModal';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    appliedCoupon, 
    applyCoupon,
    removeCoupon,
    freeShippingThreshold, 
    createOrder,
    currentUser,
    showToast 
  } = useStore();

  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  // Gift Packaging Option
  const [isGift, setIsGift] = useState(false);
  const [giftRecipientName, setGiftRecipientName] = useState('');
  const [giftMessage, setGiftMessage] = useState('');

  // Inline Coupon Input
  const [checkoutCouponCode, setCheckoutCouponCode] = useState('');
  const [checkoutCouponError, setCheckoutCouponError] = useState('');

  // Address fields
  const [name, setName] = useState(currentUser?.name || 'Ananya Sharma');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98260 12345');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(true);
  const [email, setEmail] = useState(currentUser?.email || 'ananya.s@gmail.com');
  const [address, setAddress] = useState(
    currentUser?.addresses?.[0]?.street || 'Flat 402, Royal Palms, Scheme No. 54, Vijay Nagar'
  );
  const [pincode, setPincode] = useState('452010');
  const [city, setCity] = useState('Indore');
  const [state, setState] = useState('Madhya Pradesh');
  const [pincodeMessage, setPincodeMessage] = useState('Verified: Express delivery available in Indore (1 Day)');

  // Shipping Speed
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [upiId, setUpiId] = useState('ananya@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8812');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('782');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle PIN Code Auto-Lookup
  const handlePincodeChange = (pin: string) => {
    setPincode(pin);
    if (pin.length === 6) {
      const loc = lookupPincode(pin);
      if (loc) {
        setCity(loc.city);
        setState(loc.state);
        setPincodeMessage(`Verified: Serviceable by Blue Dart Air (${loc.deliveryDays} business days)`);
      } else {
        setPincodeMessage('Standard PAN India courier delivery available');
      }
    } else {
      setPincodeMessage('');
    }
  };

  const shippingFee = cartSubtotal >= freeShippingThreshold || shippingMethod === 'standard' 
    ? (cartSubtotal >= freeShippingThreshold ? 0 : 150)
    : 250; // Express air upgrade

  const discountAmount = appliedCoupon?.discountAmount || 0;
  const finalPayable = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !pincode) {
      showToast('Please complete all shipping address fields.', 'info');
      return;
    }
    setStep('payment');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const newOrder = createOrder({
        items: cart,
        subtotal: cartSubtotal,
        discount: discountAmount,
        shippingFee,
        totalAmount: finalPayable,
        status: 'Processing',
        customer: {
          name,
          phone,
          email,
          address,
          city,
          state,
          pincode,
        },
        paymentMethod,
        paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
        courierPartner: 'Blue Dart Express',
        trackingNumber: `BLUEDART-IND-${Math.floor(100000 + Math.random() * 900000)}`,
        isGift,
        giftRecipientName: isGift && giftRecipientName.trim() ? giftRecipientName.trim() : undefined,
        giftMessage: isGift && giftMessage.trim() ? giftMessage.trim() : undefined,
      });

      setCreatedOrder(newOrder);
      setIsProcessing(false);
      setStep('success');

      // Celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#083335', '#D4AF37', '#DFC168']
        });
      } catch {}
    }, 1200);
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-[#FBF9F7] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl text-[#083335] mb-2">Your Bag is Empty</h2>
        <p className="text-xs text-stone-500 mb-6">Add pieces to your bag before proceeding to checkout.</p>
        <Link to="/collections" className="px-6 py-3 bg-[#083335] text-white text-xs uppercase tracking-widest font-semibold rounded-lg">
          Browse Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F7] py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header with BrandLogo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block group">
            <BrandLogo size="lg" />
          </Link>
        </div>

        {step === 'success' && createdOrder ? (
          /* Order Confirmation Screen */
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#E5E0DC] shadow-xl p-6 sm:p-10 space-y-8 animate-fadeIn">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#A8823E] block">
                Payment Confirmed
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#083335] font-medium">
                Thank You For Your Order!
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Your bespoke 925 sterling silver order is now in our Sarafa Bazar workshop for quality inspection and hallmarking.
              </p>
            </div>

            {/* Tracking & Courier Strip */}
            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#083335]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Order Reference</div>
                <div className="text-base font-bold font-mono text-[#083335]">{createdOrder.id}</div>
              </div>
              <div className="sm:border-l border-stone-300 sm:pl-4">
                <div className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Assigned Courier</div>
                <div className="text-xs font-semibold text-[#083335] flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#DFC168]" />
                  <span>{createdOrder.courierPartner}</span>
                </div>
              </div>
              <div className="sm:border-l border-stone-300 sm:pl-4">
                <div className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">AWB Tracking Number</div>
                <div className="text-xs font-mono font-bold text-emerald-700">{createdOrder.trackingNumber}</div>
              </div>
            </div>

            {/* Digital Certificate of Authenticity Preview */}
            <div className="p-5 rounded-xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#FDFBF7] to-white relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-28 h-28 bg-[#083335]/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-start justify-between border-b border-[#EAE5DB] pb-3 mb-3">
                <div>
                  <div className="font-serif text-sm font-bold tracking-wider text-[#083335]">
                    CERTIFICATE OF AUTHENTICITY & PURITY
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-[#A8823E]">
                    Argi Jewels Address • Sarafa Bazar, Indore
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                This document certifies that order <strong>{createdOrder.id}</strong> has been handcrafted in <strong>Solid 925 Sterling Silver</strong> (92.5% pure silver alloyed with copper for structural durability). Plated with triple-layer anti-tarnish rhodium barrier. BIS Hallmarked pursuant to IS 2112:2014.
              </p>

              <div className="mt-4 pt-3 border-t border-[#EAE5DB] flex items-center justify-between text-[11px] text-stone-500">
                <span>Certified By: Chief Silversmith, Indore Address</span>
                <span className="font-mono">Security Stamp: BIS-925-INDORE-VERIFIED</span>
              </div>
            </div>

            {/* Order Items Breakdown */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#083335] mb-3">
                Items in This Package
              </h4>
              <div className="divide-y divide-stone-200 border border-[#E5E0DC] rounded-xl overflow-hidden">
                {createdOrder.items.map((item) => (
                  <div key={item.id} className="p-3.5 flex items-center justify-between bg-white text-xs">
                    <div className="flex items-center space-x-3">
                      <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-lg border border-[#E5E0DC]" />
                      <div>
                        <div className="font-serif font-medium text-[#083335]">{item.title}</div>
                        <div className="text-[11px] text-stone-500">
                          {item.finish} {item.size && `• Size: ${item.size}`} {item.engraving && `• Engraved: "${item.engraving}"`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right font-bold text-[#083335]">
                      Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct WhatsApp Updates Link */}
            <div className="p-4 bg-[#E8F8EE] rounded-xl border border-[#25D366]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0" />
                <div className="text-xs text-[#0F682C]">
                  <strong>Receive real-time courier updates on WhatsApp:</strong> We will notify you when Blue Dart picks up your parcel.
                </div>
              </div>
              <a
                href={`https://wa.me/919232594228?text=Hi%20Argi%20Jewels,%20please%20send%20me%20live%20updates%20for%20order%20${createdOrder.id}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-lg shadow transition-colors whitespace-nowrap"
              >
                Enable WhatsApp Tracking
              </a>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsInvoiceModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-[#083335] text-[#083335] text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-[#083335] hover:text-white transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#DFC168]" />
                <span>View & Print Tax Invoice</span>
              </button>
              <Link
                to="/account"
                className="w-full sm:w-auto px-6 py-3 bg-[#083335] text-white text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-[#052224] transition-colors border border-[#0c4346] text-center"
              >
                Go To My Account & Tracking
              </Link>
              <Link
                to="/collections"
                className="w-full sm:w-auto px-6 py-3 border border-[#E5E0DC] text-[#083335] text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-stone-50 transition-colors text-center"
              >
                Continue Shopping
              </Link>
            </div>

          </div>
        ) : (
          /* Multi-Step Checkout Flow */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Checkout Steps */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step Tabs Indicator */}
              <div className="flex items-center space-x-4 border-b border-[#E5E0DC] pb-3 text-xs uppercase tracking-wider font-semibold">
                <button
                  onClick={() => setStep('address')}
                  className={`flex items-center gap-2 pb-1 ${
                    step === 'address' ? 'text-[#083335] border-b-2 border-[#083335] font-bold' : 'text-stone-400'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>1. PAN India Address</span>
                </button>
                <span className="text-stone-300">/</span>
                <span
                  className={`flex items-center gap-2 pb-1 ${
                    step === 'payment' ? 'text-[#083335] border-b-2 border-[#083335] font-bold' : 'text-stone-400'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>2. Secure Payment</span>
                </span>
              </div>

              {step === 'address' && (
                <form onSubmit={handleProceedToPayment} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E0DC] shadow-sm space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg font-medium text-[#083335]">
                      Shipping Address & PIN Code Lookup
                    </h3>
                    <span className="text-[11px] text-[#083335] font-semibold flex items-center gap-1">
                      <Truck className="w-3 h-3 text-[#DFC168]" /> PAN India Air Express
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-medium text-stone-700">Mobile Phone (for delivery SMS) *</label>
                        {isPhoneVerified ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setIsOtpModalOpen(true)}
                            className="text-[10px] font-bold text-[#083335] hover:underline flex items-center gap-1"
                          >
                            <Smartphone className="w-3 h-3 text-[#DFC168]" /> Verify with OTP
                          </button>
                        )}
                      </div>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setIsPhoneVerified(false);
                        }}
                        placeholder="e.g. 98260 12345"
                        className="w-full px-3 py-2 text-xs bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Street Address / House / Flat No. *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">PIN Code (6 Digits) *</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => handlePincodeChange(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-mono font-semibold bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">City *</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">State *</label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                      />
                    </div>
                  </div>

                  {pincodeMessage && (
                    <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {pincodeMessage}
                    </p>
                  )}

                  {/* Delivery Speed Selector */}
                  <div className="pt-3 border-t border-[#F0ECE8]">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#083335] mb-2">
                      Delivery Speed Option
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label
                        className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between text-xs ${
                          shippingMethod === 'standard' ? 'border-[#083335] bg-[#FAF7F2] ring-1 ring-[#083335]' : 'border-[#E5E0DC]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={shippingMethod === 'standard'}
                            onChange={() => setShippingMethod('standard')}
                          />
                          <div>
                            <div className="font-semibold text-[#083335]">Standard Insured Air</div>
                            <div className="text-[10px] text-stone-500">2-4 Business Days</div>
                          </div>
                        </div>
                        <span className="font-semibold text-emerald-700">
                          {cartSubtotal >= freeShippingThreshold ? 'FREE' : '₹150'}
                        </span>
                      </label>

                      <label
                        className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between text-xs ${
                          shippingMethod === 'express' ? 'border-[#083335] bg-[#FAF7F2] ring-1 ring-[#083335]' : 'border-[#E5E0DC]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={shippingMethod === 'express'}
                            onChange={() => setShippingMethod('express')}
                          />
                          <div>
                            <div className="font-semibold text-[#083335]">Priority Express VIP Air</div>
                            <div className="text-[10px] text-stone-500">Next Day Indore / 24-48h Metros</div>
                          </div>
                        </div>
                        <span className="font-semibold text-[#083335]">₹250</span>
                      </label>
                    </div>
                  </div>

                  {/* Complimentary Luxury Gift Packaging & Card Option */}
                  <div className="pt-4 border-t border-[#F0ECE8] space-y-3">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isGift}
                        onChange={(e) => setIsGift(e.target.checked)}
                        className="rounded border-stone-300 text-[#083335] focus:ring-[#083335] w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-[#083335] flex items-center gap-1.5">
                        <Gift className="w-4 h-4 text-[#DFC168]" />
                        This order is a gift (Complimentary signature gift wrap & handwritten note)
                      </span>
                    </label>

                    {isGift && (
                      <div className="p-4 bg-[#FAF7EE] border border-[#DFC168]/40 rounded-xl space-y-3 text-xs animate-fadeIn">
                        <div>
                          <label className="block font-medium text-stone-700 mb-1">Gift Recipient's Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Diya Sharma"
                            value={giftRecipientName}
                            onChange={(e) => setGiftRecipientName(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                          />
                        </div>
                        <div>
                          <label className="block font-medium text-stone-700 mb-1">Personalized Message on Gold-Embossed Card</label>
                          <textarea
                            rows={2}
                            placeholder="e.g. Happy 5th Anniversary! May your shine never fade."
                            value={giftMessage}
                            onChange={(e) => setGiftMessage(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                          />
                          <p className="text-[10px] text-stone-500 mt-1">Our calligrapher will handwrite this inside our sealed greeting card.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-[#083335] hover:bg-[#052224] text-white text-xs uppercase tracking-widest font-bold rounded-lg flex items-center gap-2 shadow transition-colors border border-[#0c4346]"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              )}

              {step === 'payment' && (
                <form onSubmit={handlePlaceOrder} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E0DC] shadow-sm space-y-5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg font-medium text-[#083335]">
                      Select Payment Method
                    </h3>
                    <span className="text-[11px] text-stone-500 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-600" /> 256-Bit Encrypted
                    </span>
                  </div>

                  {/* Payment Method Selector Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('UPI')}
                      className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'UPI' ? 'border-[#083335] bg-[#083335] text-white shadow-xs' : 'border-[#E5E0DC] hover:border-stone-400 text-stone-700'
                      }`}
                    >
                      <QrCode className="w-5 h-5" />
                      <span>Instant UPI</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Card')}
                      className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'Card' ? 'border-[#083335] bg-[#083335] text-white shadow-xs' : 'border-[#E5E0DC] hover:border-stone-400 text-stone-700'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Cards</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('NetBanking')}
                      className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'NetBanking' ? 'border-[#083335] bg-[#083335] text-white shadow-xs' : 'border-[#E5E0DC] hover:border-stone-400 text-stone-700'
                      }`}
                    >
                      <Building2 className="w-5 h-5" />
                      <span>Net Banking</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Cash on Delivery')}
                      className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'Cash on Delivery' ? 'border-[#083335] bg-[#083335] text-white shadow-xs' : 'border-[#E5E0DC] hover:border-stone-400 text-stone-700'
                      }`}
                    >
                      <Banknote className="w-5 h-5" />
                      <span>Cash on Delivery</span>
                    </button>
                  </div>

                  {/* Payment Details Container */}
                  <div className="p-4 bg-[#FBF9F7] rounded-xl border border-[#E5E0DC]">
                    {paymentMethod === 'UPI' && (
                      <div className="space-y-3">
                        <div className="text-xs font-semibold text-[#083335] flex items-center justify-between">
                          <span>Pay via any UPI App:</span>
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Zero Surcharges
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-xs">
                          <span className="px-2.5 py-1 bg-white border border-[#E5E0DC] rounded-lg font-medium">Google Pay</span>
                          <span className="px-2.5 py-1 bg-white border border-[#E5E0DC] rounded-lg font-medium">PhonePe</span>
                          <span className="px-2.5 py-1 bg-white border border-[#E5E0DC] rounded-lg font-medium">Paytm</span>
                          <span className="px-2.5 py-1 bg-white border border-[#E5E0DC] rounded-lg font-medium">BHIM</span>
                        </div>

                        <div>
                          <label className="block text-xs text-stone-600 mb-1">Enter UPI ID / VPA</label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="e.g. yourname@oksbi"
                            className="w-full px-3 py-2 text-xs bg-white border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'Card' && (
                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block text-stone-600 mb-1">Card Number (RuPay / Visa / MasterCard)</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4532 0000 0000 0000"
                            className="w-full px-3 py-2 bg-white border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-stone-600 mb-1">Expiry (MM/YY)</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="12/28"
                              className="w-full px-3 py-2 bg-white border border-[#E5E0DC] rounded-lg focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-600 mb-1">CVV</label>
                            <input
                              type="password"
                              maxLength={4}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="123"
                              className="w-full px-3 py-2 bg-white border border-[#E5E0DC] rounded-lg focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'NetBanking' && (
                      <div className="space-y-2 text-xs">
                        <label className="block text-stone-600">Select Indian Bank</label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-[#E5E0DC] rounded-lg text-xs"
                        >
                          <option>HDFC Bank</option>
                          <option>ICICI Bank</option>
                          <option>State Bank of India (SBI)</option>
                          <option>Axis Bank</option>
                          <option>Kotak Mahindra Bank</option>
                          <option>Punjab National Bank</option>
                        </select>
                      </div>
                    )}

                    {paymentMethod === 'Cash on Delivery' && (
                      <div className="text-xs text-stone-600 space-y-1">
                        <p className="font-bold text-[#083335]">Cash on Delivery Available</p>
                        <p>Pay cash or scan courier QR upon receiving your sealed tamper-proof luxury box.</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between pt-4 border-t border-[#E5E0DC]">
                    <button
                      type="button"
                      onClick={() => setStep('address')}
                      className="px-4 py-2.5 border border-[#E5E0DC] text-xs font-medium rounded-lg text-stone-600"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 inline mr-1" /> Back
                    </button>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="px-8 py-3.5 bg-[#083335] hover:bg-[#052224] text-white text-xs uppercase tracking-widest font-bold rounded-lg flex items-center gap-2 shadow-md border border-[#0c4346]"
                    >
                      <Sparkles className="w-4 h-4 text-[#DFC168]" />
                      <span>{isProcessing ? 'Securing Transaction...' : `Pay ₹${finalPayable.toLocaleString('en-IN')}`}</span>
                    </button>
                  </div>

                </form>
              )}

            </div>

            {/* Right Order Summary Column */}
            <div className="lg:col-span-5">
              <div className="bg-white p-6 rounded-2xl border border-[#E5E0DC] shadow-sm space-y-5 sticky top-28">
                
                <h3 className="font-serif text-base font-semibold text-[#083335] pb-3 border-b border-[#E5E0DC]">
                  Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
                </h3>

                {/* Items preview */}
                <div className="max-h-60 overflow-y-auto divide-y divide-[#F0ECE8] pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-lg border border-[#E5E0DC]" />
                        <div>
                          <h5 className="font-serif font-medium text-[#083335] line-clamp-1">{item.title}</h5>
                          <div className="text-[10px] text-stone-500">
                            {item.finish} {item.size && `• Size ${item.size}`}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-[#083335]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <div className="text-[10px] text-stone-400">Qty: {item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input on Checkout */}
                {!appliedCoupon ? (
                  <div className="pt-3 border-t border-[#E5E0DC] space-y-1">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!checkoutCouponCode.trim()) return;
                        const res = applyCoupon(checkoutCouponCode);
                        if (!res.success) {
                          setCheckoutCouponError(res.message);
                        } else {
                          setCheckoutCouponError('');
                          setCheckoutCouponCode('');
                        }
                      }}
                      className="flex gap-2"
                    >
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Have a coupon? (e.g. ARGI10)"
                          value={checkoutCouponCode}
                          onChange={(e) => {
                            setCheckoutCouponCode(e.target.value);
                            setCheckoutCouponError('');
                          }}
                          className="w-full pl-8 pr-2 py-1.5 text-xs uppercase bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                        />
                        <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5 pointer-events-none" />
                      </div>
                      <button
                        type="submit"
                        className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-[#083335] text-white rounded-lg hover:bg-[#052224] transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                    {checkoutCouponError && (
                      <p className="text-[11px] text-rose-600 pl-1">{checkoutCouponError}</p>
                    )}
                  </div>
                ) : (
                  <div className="pt-3 border-t border-[#E5E0DC]">
                    <div className="flex items-center justify-between p-2 bg-[#FAF7EE] border border-[#DFC168]/40 rounded-lg text-xs">
                      <div className="flex items-center gap-1.5 text-[#083335]">
                        <Tag className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-₹{discountAmount})</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-stone-400 hover:text-stone-700 text-xs underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}

                {/* Price Calculation */}
                <div className="pt-3 border-t border-[#E5E0DC] space-y-2 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#083335]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Coupon Discount ({appliedCoupon.code})</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>PAN India Express Delivery</span>
                    <span className="font-medium text-emerald-700">
                      {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#083335] pt-3 border-t border-[#E5E0DC]">
                    <span>Total Amount</span>
                    <span className="text-base text-[#083335]">
                      ₹{finalPayable.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#083335]/20 text-[11px] text-stone-600 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#083335]">
                    <ShieldCheck className="w-4 h-4 text-[#DFC168]" />
                    <span>Pure 925 Hallmark Guarantee Included</span>
                  </div>
                  <p className="text-[10px] text-stone-500">
                    Complimentary velvet presentation box & micro-suede polishing cloth included with every order.
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* YourBulkSMS Mobile OTP Verification Modal */}
        <OtpVerificationModal
          isOpen={isOtpModalOpen}
          onClose={() => setIsOtpModalOpen(false)}
          initialPhone={phone}
          onVerified={(verified) => {
            setPhone(`+91 ${verified}`);
            setIsPhoneVerified(true);
            showToast('Mobile verified successfully via YourBulkSMS!', 'success');
          }}
          title="Verify Delivery Mobile"
          subtitle="Confirm your mobile number via YourBulkSMS for Blue Dart Air delivery tracking."
        />

        {/* Official GST Tax Invoice Modal */}
        <InvoiceModal
          isOpen={isInvoiceModalOpen}
          onClose={() => setIsInvoiceModalOpen(false)}
          order={createdOrder}
        />

      </div>
    </div>
  );
};
