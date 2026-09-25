import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Package, 
  Sparkles, 
  Heart, 
  User, 
  LogOut, 
  Truck, 
  ShieldCheck, 
  MessageCircle,
  Smartphone,
  FileText,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/catalog/ProductCard';
import { OtpVerificationModal } from '../components/common/OtpVerificationModal';
import { InvoiceModal } from '../components/common/InvoiceModal';
import { Order } from '../types';

export const AccountPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'orders' | 'custom' | 'wishlist' | 'profile') || 'orders';
  const [activeTab, setActiveTab] = useState<'orders' | 'custom' | 'wishlist' | 'profile'>(initialTab);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  const { 
    currentUser, 
    orders, 
    customRequests, 
    products, 
    wishlist,
    showToast,
    loginUser, 
    logoutUser,
    setIsLoginModalOpen 
  } = useStore();

  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  // Demo Login States
  const [loginName, setLoginName] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginEmail, setLoginEmail] = useState('');

  const handleDemoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone) {
      showToast('Please enter your mobile phone number.', 'info');
      return;
    }
    setIsOtpModalOpen(true);
  };

  const handleOtpVerified = (verifiedPhone: string) => {
    const finalName = loginName.trim() || 'Valued Collector';
    const finalEmail = loginEmail.trim() || `client.${verifiedPhone.slice(-4)}@argijewels.in`;
    loginUser(finalName, finalEmail, `+91 ${verifiedPhone}`, 'Indore');
    showToast('Logged in successfully with verified mobile number!', 'success');
  };

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const getOrderStatusStep = (status: string) => {
    switch (status) {
      case 'Processing': return 1;
      case 'Shipped': return 2;
      case 'Delivered': return 3;
      case 'Cancelled': return 0;
      default: return 1;
    }
  };

  const getBespokeStep = (status: string) => {
    switch (status) {
      case 'New Request': return 1;
      case 'Design Confirmed': return 2;
      case 'In Crafting': return 3;
      case 'Ready for Dispatch': return 4;
      case 'Shipped': return 5;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F7] py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E0DC] shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-[#083335] border border-[#0c4346] flex items-center justify-center text-[#DFC168] font-serif text-xl font-bold">
              {currentUser ? currentUser.name.charAt(0) : 'A'}
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-[#083335] font-bold">
                Argi Jewels Personal Portal
              </div>
              <h1 className="font-serif text-2xl text-[#083335] font-medium">
                {currentUser ? currentUser.name : 'Personal Guest'}
              </h1>
              <div className="text-xs text-stone-500 mt-0.5">
                {currentUser ? `${currentUser.phone} • ${currentUser.city}` : 'Sign in to access your bespoke designs and order history'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser ? (
              <button
                onClick={logoutUser}
                className="px-4 py-2 border border-[#E5E0DC] text-stone-600 hover:text-rose-600 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-2.5 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold rounded-lg shadow-xs transition-all border border-[#DADCE0] hover:border-stone-400 flex items-center gap-2"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Sign In with Google</span>
                </button>

                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-2.5 bg-[#083335] hover:bg-[#052224] text-white text-xs uppercase tracking-wider font-semibold rounded-lg shadow-xs transition-colors border border-[#0c4346] flex items-center gap-2"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#DFC168]" />
                  <span>Login with Mobile OTP</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E5E0DC] mb-8 space-x-6 overflow-x-auto scrollbar-none text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'orders' ? 'border-[#083335] text-[#083335]' : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Ready Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('custom')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'custom' ? 'border-[#083335] text-[#083335]' : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#DFC168]" />
            <span>Bespoke Custom Requests ({customRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'wishlist' ? 'border-[#083335] text-[#083335]' : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wishlist ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'profile' ? 'border-[#083335] text-[#083335]' : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Personal Details & Addresses</span>
          </button>
        </div>

        {/* TAB 1: READY ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E5E0DC] p-12 text-center">
                <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-medium text-[#083335]">No Orders Placed Yet</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-6">
                  Explore our pure 925 sterling silver collections handcrafted in Indore.
                </p>
                <Link to="/collections" className="px-6 py-2.5 bg-[#083335] text-white text-xs uppercase tracking-widest font-semibold rounded-lg">
                  Explore Collections
                </Link>
              </div>
            ) : (
              orders.map((order) => {
                const stepIdx = getOrderStatusStep(order.status);
                return (
                  <div key={order.id} className="bg-white rounded-2xl border border-[#E5E0DC] shadow-xs overflow-hidden">
                    {/* Header */}
                    <div className="p-4 sm:p-6 bg-[#FBF9F7] border-b border-[#E5E0DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="text-stone-500">Order ID: <strong className="font-mono text-[#083335]">{order.id}</strong></div>
                        <div className="text-[11px] text-stone-400">Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                      </div>

                      <div className="flex items-center space-x-2.5">
                        <button
                          onClick={() => setSelectedInvoiceOrder(order)}
                          className="px-2.5 py-1 bg-white hover:bg-stone-50 border border-[#E5E0DC] text-[#083335] text-[11px] font-semibold rounded-lg flex items-center gap-1 transition-colors shadow-2xs cursor-pointer"
                          title="View Official GST Tax Invoice"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#DFC168]" />
                          <span>Tax Invoice</span>
                        </button>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                          order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                          order.status === 'Shipped' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status}
                        </span>
                        <div className="font-bold text-sm text-[#083335]">
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    {/* Timeline Tracker */}
                    <div className="p-4 sm:p-6 border-b border-[#F0ECE8] bg-white">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#083335] mb-4">
                        Live Tracking & Dispatch Status
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center relative">
                        
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            stepIdx >= 1 ? 'bg-[#083335] text-white' : 'bg-stone-200 text-stone-500'
                          }`}>
                            1
                          </div>
                          <span className="text-[11px] font-medium text-[#083335] mt-1.5">Hallmarked & Packed</span>
                          <span className="text-[9px] text-stone-400">Sarafa Workshop</span>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            stepIdx >= 2 ? 'bg-[#083335] text-white' : 'bg-stone-200 text-stone-500'
                          }`}>
                            2
                          </div>
                          <span className="text-[11px] font-medium text-[#083335] mt-1.5">Dispatched Air Express</span>
                          <span className="text-[9px] text-stone-400">{order.courierPartner || 'Blue Dart'}</span>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            stepIdx >= 3 ? 'bg-[#25D366] text-white' : 'bg-stone-200 text-stone-500'
                          }`}>
                            3
                          </div>
                          <span className="text-[11px] font-medium text-[#083335] mt-1.5">Delivered to Doorstep</span>
                          <span className="text-[9px] text-stone-400">{order.customer.city}</span>
                        </div>

                      </div>

                      {order.trackingNumber && (
                        <div className="mt-4 pt-3 border-t border-[#F0ECE8] flex flex-wrap items-center justify-between text-xs text-stone-600 gap-2">
                          <div className="flex items-center gap-1.5">
                            <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                            <span>Courier Partner: <strong>{order.courierPartner}</strong></span>
                            <span className="font-mono text-[11px] bg-stone-100 px-2 py-0.5 rounded ml-1 font-bold">
                              AWB: {order.trackingNumber}
                            </span>
                          </div>
                          <a
                            href={`https://wa.me/919232594228?text=Hello%20Argi%20Jewels,%20checking%20status%20for%20order%20${order.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#0F682C] font-semibold flex items-center gap-1 hover:underline"
                          >
                            <MessageCircle className="w-3 h-3 text-[#25D366]" /> Inquire on WhatsApp
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Order Items */}
                    <div className="p-4 sm:p-6 space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-3">
                            <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-lg border border-[#E5E0DC]" />
                            <div>
                              <h4 className="font-serif font-medium text-[#083335]">{item.title}</h4>
                              <div className="text-[11px] text-stone-500">
                                {item.finish} {item.size && `• Size ${item.size}`} {item.engraving && `• Engraved: "${item.engraving}"`}
                              </div>
                              <div className="text-[10px] text-stone-400 mt-0.5">Quantity: {item.quantity}</div>
                            </div>
                          </div>
                          <div className="text-right font-bold text-[#083335]">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Address footer */}
                    <div className="p-4 bg-[#FBF9F7] border-t border-[#E5E0DC] text-xs text-stone-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div>
                        Shipping To: <strong className="text-[#083335]">{order.customer.name}</strong>, {order.customer.address}, {order.customer.city} ({order.customer.pincode})
                      </div>
                      <div className="flex items-center gap-1 text-[#083335] font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#DFC168]" /> 100% Certified 925 Hallmark Enclosed
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 2: BESPOKE CUSTOM REQUESTS */}
        {activeTab === 'custom' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-medium text-[#083335]">
                  Your Custom Design Submissions
                </h3>
                <p className="text-xs text-stone-500">
                  Track 3D CAD modeling, silversmith casting, and dispatch status in real-time.
                </p>
              </div>
              <Link
                to="/custom-design"
                className="px-4 py-2 bg-[#083335] text-white text-xs uppercase tracking-wider font-bold rounded-lg shadow-xs hover:bg-[#052224] transition-colors border border-[#0c4346]"
              >
                + New Bespoke Request
              </Link>
            </div>

            {customRequests.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E5E0DC] p-12 text-center">
                <Sparkles className="w-12 h-12 text-[#DFC168] mx-auto mb-3" />
                <h3 className="font-serif text-lg font-medium text-[#083335]">No Custom Requests Yet</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-6">
                  Have a dream ring or pendant in mind? Upload your sketch or reference photo to start.
                </p>
                <Link to="/custom-design" className="px-6 py-2.5 bg-[#083335] text-white text-xs uppercase tracking-widest font-semibold rounded-lg">
                  Design Your Piece
                </Link>
              </div>
            ) : (
              customRequests.map((req) => {
                const bespokeStep = getBespokeStep(req.status);
                return (
                  <div key={req.id} className="bg-white rounded-2xl border border-[#E5E0DC] shadow-xs overflow-hidden">
                    <div className="p-4 sm:p-6 bg-[#FAF7F2] border-b border-[#E5E0DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-sm text-[#083335]">{req.category}</span>
                          <span className="text-stone-300">•</span>
                          <span className="font-mono text-stone-500">#{req.id}</span>
                        </div>
                        <div className="text-[11px] text-stone-400">
                          Submitted on {new Date(req.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                          req.status === 'Shipped' ? 'bg-emerald-100 text-emerald-800' :
                          req.status === 'In Crafting' ? 'bg-purple-100 text-purple-800' :
                          req.status === 'Design Confirmed' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                    </div>

                    {/* Step Progress */}
                    <div className="p-4 sm:p-6 border-b border-[#F0ECE8]">
                      <div className="grid grid-cols-4 gap-2 text-center text-xs">
                        <div className={`p-2 rounded-lg ${bespokeStep >= 1 ? 'bg-[#083335] text-white' : 'bg-stone-100 text-stone-400'}`}>
                          <div className="font-bold text-[11px]">1. New Request</div>
                        </div>
                        <div className={`p-2 rounded-lg ${bespokeStep >= 2 ? 'bg-[#083335] text-white' : 'bg-stone-100 text-stone-400'}`}>
                          <div className="font-bold text-[11px]">2. CAD Confirmed</div>
                        </div>
                        <div className={`p-2 rounded-lg ${bespokeStep >= 3 ? 'bg-[#083335] text-white' : 'bg-stone-100 text-stone-400'}`}>
                          <div className="font-bold text-[11px]">3. In Crafting</div>
                        </div>
                        <div className={`p-2 rounded-lg ${bespokeStep >= 5 ? 'bg-[#25D366] text-white' : 'bg-stone-100 text-stone-400'}`}>
                          <div className="font-bold text-[11px]">4. Shipped</div>
                        </div>
                      </div>
                    </div>

                    {/* Request Details */}
                    <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                      <div className="md:col-span-2 space-y-2.5">
                        <p className="text-stone-700 leading-relaxed italic bg-[#FBF9F7] p-3 rounded-lg border border-[#E5E0DC]">
                          "{req.description}"
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-stone-600">
                          <div><strong>Plating Finish:</strong> {req.selectedFinish}</div>
                          <div><strong>Stone Setting:</strong> {req.stonePreference}</div>
                          <div><strong>Size Estimate:</strong> {req.size || 'Standard'}</div>
                          <div><strong>Target Budget:</strong> {req.budgetRange}</div>
                          {req.engraving && <div className="col-span-2"><strong>Custom Engraving:</strong> "{req.engraving}"</div>}
                        </div>

                        {req.notes && (
                          <div className="p-2.5 bg-amber-50/60 border border-amber-200/60 rounded-lg text-amber-900 text-[11px]">
                            <strong>Address Note:</strong> {req.notes}
                          </div>
                        )}
                      </div>

                      {/* Photo / Sketch Preview & WhatsApp Trigger */}
                      <div className="space-y-3 flex flex-col items-center justify-between">
                        {req.referenceImageUrl ? (
                          <div className="w-full aspect-square max-w-[160px] rounded-xl overflow-hidden border border-[#E5E0DC] bg-stone-50">
                            <img src={req.referenceImageUrl} alt="Concept" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-full aspect-square max-w-[160px] rounded-xl border border-dashed border-[#E5E0DC] flex items-center justify-center text-stone-400 text-[11px]">
                            No image uploaded
                          </div>
                        )}

                        <a
                          href={`https://wa.me/919232594228?text=Hi%20Argi%20Jewels,%20checking%20status%20for%20custom%20inquiry%20${req.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-center rounded-lg font-bold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Chat with Karigar</span>
                        </a>
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 3: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-medium text-[#083335]">
                  Saved Jewels ({wishlistedProducts.length})
                </h3>
                <p className="text-xs text-stone-500">
                  Your curated favorite 925 sterling silver designs.
                </p>
              </div>
            </div>

            {wishlistedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E5E0DC] p-12 text-center">
                <Heart className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-medium text-[#083335]">Your Wishlist is Empty</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-6">
                  Save pieces you love while browsing to purchase or compare later.
                </p>
                <Link to="/collections" className="px-6 py-2.5 bg-[#083335] text-white text-xs uppercase tracking-widest font-semibold rounded-lg">
                  Explore Collections
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {wishlistedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PERSONAL PROFILE & ADDRESSES */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E0DC] shadow-xs space-y-6">
            <h3 className="font-serif text-lg font-medium text-[#083335]">
              Personal Profile & PAN India Shipping Details
            </h3>

            {currentUser ? (
              <div className="space-y-6 text-xs text-stone-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#FBF9F7] rounded-xl border border-[#E5E0DC]">
                    <div className="font-bold text-[#083335] uppercase tracking-wider mb-1">Full Name</div>
                    <div className="font-serif text-base font-bold text-[#083335]">{currentUser.name}</div>
                  </div>
                  <div className="p-4 bg-[#FBF9F7] rounded-xl border border-[#E5E0DC]">
                    <div className="font-bold text-[#083335] uppercase tracking-wider mb-1">Phone Number</div>
                    <div className="font-mono text-base font-bold text-[#083335]">{currentUser.phone}</div>
                  </div>
                  <div className="p-4 bg-[#FBF9F7] rounded-xl border border-[#E5E0DC]">
                    <div className="font-bold text-[#083335] uppercase tracking-wider mb-1">Email</div>
                    <div className="text-sm font-semibold text-[#083335]">{currentUser.email}</div>
                  </div>
                  <div className="p-4 bg-[#FBF9F7] rounded-xl border border-[#E5E0DC]">
                    <div className="font-bold text-[#083335] uppercase tracking-wider mb-1">Home City</div>
                    <div className="text-sm font-semibold text-[#083335]">{currentUser.city}, India</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold uppercase tracking-wider text-[#083335] mb-3">
                    Default PAN India Delivery Address
                  </h4>
                  <div className="p-4 rounded-xl border border-[#083335]/30 bg-[#FAF7F2] flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="font-serif font-bold text-sm text-[#083335]">{currentUser.name}</div>
                      <div>{currentUser.addresses[0]?.street}</div>
                      <div>{currentUser.addresses[0]?.city}, {currentUser.addresses[0]?.state} - <strong>{currentUser.addresses[0]?.pincode}</strong></div>
                      <div className="text-emerald-700 font-semibold pt-1">Primary Courier Destination (1-2 Day Indore Delivery)</div>
                    </div>
                    <span className="px-2.5 py-0.5 bg-[#083335] text-white text-[10px] uppercase font-bold rounded">
                      Default
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-md space-y-4 text-xs">
                <p className="text-stone-600">Choose your preferred sign-in method:</p>

                {/* Google Sign-In Button */}
                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="w-full py-3.5 px-4 bg-white hover:bg-stone-50 active:bg-stone-100 text-[#1f1f1f] font-semibold text-xs rounded-xl border border-[#DADCE0] hover:border-stone-400 shadow-sm flex items-center justify-center gap-3 transition-all duration-200 transform active:scale-98"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span className="tracking-wide text-[13px]">Continue with Google Account</span>
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-[#E5E0DC]" />
                  <span className="flex-shrink mx-3 text-[10px] uppercase font-bold tracking-[0.16em] text-stone-400">
                    or sign in with mobile otp
                  </span>
                  <div className="flex-grow border-t border-[#E5E0DC]" />
                </div>

                <form onSubmit={handleDemoLogin} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    placeholder="Ananya Sharma"
                    className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Mobile Phone (for OTP / WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    placeholder="+91 98260 12345"
                    className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="ananya.s@gmail.com"
                    className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#083335] text-white uppercase tracking-widest font-bold rounded-lg hover:bg-[#052224] border border-[#0c4346] flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4 text-[#DFC168]" />
                  <span>Verify Mobile & Sign In (YourBulkSMS)</span>
                </button>
              </form>
            </div>
          )}

          </div>
        )}

        {/* YourBulkSMS Mobile OTP Verification Modal */}
        <OtpVerificationModal
          isOpen={isOtpModalOpen}
          onClose={() => setIsOtpModalOpen(false)}
          initialPhone={loginPhone}
          onVerified={handleOtpVerified}
          title="Sign In to Argi Jewels"
          subtitle="We will send a 6-digit OTP to verify your mobile number via YourBulkSMS."
        />

        {/* Official GST Tax Invoice Modal */}
        <InvoiceModal
          isOpen={Boolean(selectedInvoiceOrder)}
          onClose={() => setSelectedInvoiceOrder(null)}
          order={selectedInvoiceOrder}
        />

      </div>
    </div>
  );
};
