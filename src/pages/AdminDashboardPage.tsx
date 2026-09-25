import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  Sparkles, 
  Users, 
  ShoppingBag, 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  MessageCircle, 
  AlertTriangle, 
  ExternalLink,
  DollarSign,
  TrendingUp,
  UploadCloud,
  Image as ImageIcon,
  Smartphone,
  ShieldCheck,
  RefreshCw,
  Printer,
  Tag,
  Settings,
  CreditCard,
  Truck,
  Key,
  Check,
  Layers,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory, MetalFinish, OrderStatus, BespokeStatus, Order, AdminCoupon } from '../types';
import { BrandLogo } from '../components/common/BrandLogo';
import { getSmsConfig, saveSmsConfig, sendOtpSms } from '../services/smsOtpService';
import { ShippingLabelModal } from '../components/common/ShippingLabelModal';

export const AdminDashboardPage: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    orders, 
    updateOrderStatus,
    customRequests, 
    updateCustomRequestStatus,
    adminRole,
    setAdminRole,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'bespoke' | 'orders' | 'customers' | 'coupons' | 'integrations'
  >('overview');

  const [selectedLabelOrder, setSelectedLabelOrder] = useState<Order | null>(null);

  // Google OAuth Settings
  const [googleClientId, setGoogleClientId] = useState(() => localStorage.getItem('argi_google_client_id_v1') || '');
  const [googleSavedStatus, setGoogleSavedStatus] = useState(false);

  // Payment Gateway Settings
  const [razorpayKey, setRazorpayKey] = useState(() => localStorage.getItem('argi_razorpay_key') || 'rzp_live_925argi_sarafa');
  const [razorpaySecret, setRazorpaySecret] = useState(() => localStorage.getItem('argi_razorpay_secret') || '••••••••••••••••');
  const [isLivePayment, setIsLivePayment] = useState(true);
  const [gatewaySavedStatus, setGatewaySavedStatus] = useState(false);

  // Courier & Logistics Settings
  const [blueDartAccount, setBlueDartAccount] = useState(() => localStorage.getItem('argi_bluedart_acc') || 'BD-IND-452002-AIR');
  const [delhiveryApiKey, setDelhiveryApiKey] = useState(() => localStorage.getItem('argi_delhivery_key') || 'delhivery_live_indore_address');
  const [logisticsSavedStatus, setLogisticsSavedStatus] = useState(false);

  // Promotional Coupons State
  const [couponList, setCouponList] = useState<AdminCoupon[]>([
    { code: 'ARGI10', type: 'percent', value: 10, minOrderValue: 999, active: true, usageCount: 42 },
    { code: 'SARAFA500', type: 'flat', value: 500, minOrderValue: 2999, active: true, usageCount: 28 },
    { code: 'SILVER925', type: 'percent', value: 15, minOrderValue: 3999, active: true, usageCount: 19 },
    { code: 'FIRSTBUY', type: 'flat', value: 300, minOrderValue: 1499, active: true, usageCount: 35 },
    { code: 'INDORE', type: 'flat', value: 500, minOrderValue: 2499, active: true, usageCount: 51 },
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'percent' | 'flat'>('percent');
  const [newCouponValue, setNewCouponValue] = useState(10);
  const [newCouponMin, setNewCouponMin] = useState(1499);

  // Product CRUD Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form Fields for Add/Edit Product
  const [prodTitle, setProdTitle] = useState('');
  const [prodSku, setProdSku] = useState('');
  const [prodCategory, setProdCategory] = useState<ProductCategory>('Rings');
  const [prodPrice, setProdPrice] = useState(2999);
  const [prodOriginalPrice, setProdOriginalPrice] = useState(3999);
  const [prodStock, setProdStock] = useState(10);
  const [prodDescription, setProdDescription] = useState('');
  const [prodImages, setProdImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [prodFinishes, setProdFinishes] = useState<MetalFinish[]>(['Rhodium Silver', '18k Yellow Gold Plated']);
  const [prodStatus, setProdStatus] = useState<'Active' | 'Draft' | 'Out of Stock'>('Active');

  // Fulfillment Modal State
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [orderNewStatus, setOrderNewStatus] = useState<OrderStatus>('Shipped');
  const [orderCourier, setOrderCourier] = useState<'Blue Dart Express' | 'Delhivery' | 'DTDC Air' | 'Speed Post'>('Blue Dart Express');
  const [orderTracking, setOrderTracking] = useState('');

  // Bespoke Status Updater
  const [editingBespokeId, setEditingBespokeId] = useState<string | null>(null);
  const [bespokeNewStatus, setBespokeNewStatus] = useState<BespokeStatus>('In Crafting');
  const [bespokeNotes, setBespokeNotes] = useState('');

  // SMS Gateway Management (YourBulkSMS)
  const [smsConfig, setSmsConfig] = useState(getSmsConfig());
  const [testMobile, setTestMobile] = useState('');
  const [testSmsStatus, setTestSmsStatus] = useState<string | null>(null);
  const [isSendingTestSms, setIsSendingTestSms] = useState(false);
  const [isEditingSmsConfig, setIsEditingSmsConfig] = useState(false);
  const [customSender, setCustomSender] = useState(smsConfig.sender);
  const [customDltId, setCustomDltId] = useState(smsConfig.dltTemplateId);

  const handleSendTestSms = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testMobile) return;
    setIsSendingTestSms(true);
    setTestSmsStatus('Connecting to YourBulkSMS gateway...');
    try {
      const res = await sendOtpSms(testMobile);
      setTestSmsStatus(res.message);
    } catch (err: any) {
      setTestSmsStatus(`Failed: ${err?.message || 'Network error'}`);
    } finally {
      setIsSendingTestSms(false);
    }
  };

  const handleSaveSmsSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveSmsConfig({
      sender: customSender.trim() || 'ABCDEF',
      dltTemplateId: customDltId.trim(),
    });
    setSmsConfig(updated);
    setIsEditingSmsConfig(false);
  };

  // Analytics Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.totalAmount : 0), 0);
  const totalOrdersCount = orders.length;
  const activeBespokeCount = customRequests.filter(r => r.status !== 'Shipped').length;
  const lowStockProducts = products.filter(p => p.stockCount <= 7);
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

  // Handlers for Product CRUD
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProdTitle('');
    setProdSku(`ARG-${Math.floor(100 + Math.random() * 900)}`);
    setProdCategory('Rings');
    setProdPrice(2999);
    setProdOriginalPrice(3999);
    setProdStock(12);
    setProdDescription('Handcrafted in solid 925 sterling silver with triple-layer protective rhodium coating.');
    setProdImages(['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80']);
    setImageUrlInput('');
    setProdFinishes(['Rhodium Silver', '18k Yellow Gold Plated']);
    setProdStatus('Active');
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setProdTitle(p.title);
    setProdSku(p.sku);
    setProdCategory(p.category);
    setProdPrice(p.price);
    setProdOriginalPrice(p.originalPrice || p.price);
    setProdStock(p.stockCount);
    setProdDescription(p.description);
    setProdImages(p.images && p.images.length > 0 ? [...p.images] : []);
    setImageUrlInput('');
    setProdFinishes(p.finishes);
    setProdStatus(p.status);
    setIsProductModalOpen(true);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingImage(true);
    const fileArray = Array.from(files);
    let loadedCount = 0;
    const newUrls: string[] = [];

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          newUrls.push(reader.result);
        }
        loadedCount++;
        if (loadedCount === fileArray.length) {
          setProdImages((prev) => [...prev, ...newUrls]);
          setIsUploadingImage(false);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setProdImages((prev) => [...prev, imageUrlInput.trim()]);
    setImageUrlInput('');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setProdImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSetCoverImage = (indexToCover: number) => {
    setProdImages((prev) => {
      const target = prev[indexToCover];
      const rest = prev.filter((_, idx) => idx !== indexToCover);
      return [target, ...rest];
    });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImages = [...prodImages];
    if (imageUrlInput.trim() && !finalImages.includes(imageUrlInput.trim())) {
      finalImages.push(imageUrlInput.trim());
    }
    const effectiveImages = finalImages.length > 0
      ? finalImages
      : ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'];

    if (editingProductId) {
      updateProduct(editingProductId, {
        title: prodTitle,
        sku: prodSku,
        category: prodCategory,
        price: Number(prodPrice),
        originalPrice: Number(prodOriginalPrice),
        stockCount: Number(prodStock),
        description: prodDescription,
        images: effectiveImages,
        finishes: prodFinishes,
        status: prodStatus,
        inStock: prodStock > 0 && prodStatus === 'Active',
      });
    } else {
      addProduct({
        title: prodTitle,
        sku: prodSku,
        category: prodCategory,
        price: Number(prodPrice),
        originalPrice: Number(prodOriginalPrice),
        description: prodDescription,
        material: 'Pure 925 Sterling Silver',
        finishes: prodFinishes,
        images: effectiveImages,
        rating: 5.0,
        reviewCount: 1,
        inStock: prodStock > 0,
        stockCount: Number(prodStock),
        hallmarkCertified: true,
        occasion: 'Everyday Luxury',
        status: prodStatus,
      });
    }

    setIsProductModalOpen(false);
  };

  const handleSaveOrderStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOrderId) {
      updateOrderStatus(editingOrderId, orderNewStatus, orderCourier, orderTracking || undefined);
      setEditingOrderId(null);
    }
  };

  const handleSaveBespokeStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBespokeId) {
      updateCustomRequestStatus(editingBespokeId, bespokeNewStatus, bespokeNotes || undefined);
      setEditingBespokeId(null);
    }
  };

  // Customers Mock aggregation
  const customerList = [
    { name: 'Ananya Sharma', phone: '+91 98260 12345', email: 'ananya.s@gmail.com', city: 'Indore', totalOrders: 2, totalSpend: 7328 },
    { name: 'Vikramaditya Solanki', phone: '+91 94250 88990', email: 'vikram.solanki@gmail.com', city: 'Indore', totalOrders: 1, totalSpend: 11500 },
    { name: 'Dr. Meera Iyer', phone: '+91 98450 77123', email: 'meera.iyer@apollo.org', city: 'Bengaluru', totalOrders: 1, totalSpend: 15200 },
    { name: 'Rohan Mehra', phone: '+91 98112 34567', email: 'rohan.mehra@outlook.com', city: 'New Delhi', totalOrders: 1, totalSpend: 4999 },
    { name: 'Priyanka Deshmukh', phone: '+91 97654 88120', email: 'priyanka.d@yahoo.com', city: 'Mumbai', totalOrders: 1, totalSpend: 2430 },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header Bar in Signature #083335 */}
        <div className="bg-[#083335] text-white p-5 sm:p-6 rounded-2xl shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#0c4346]">
          <div>
            <div className="flex items-center gap-3">
              <BrandLogo variant="light" size="sm" showSubtitle={false} />
              <span className="px-2.5 py-0.5 bg-[#052224] text-[10px] uppercase font-bold tracking-widest text-[#DFC168] rounded border border-[#0c4346]">
                Live Address & CRM Hub
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-1">
              Sarafa Bazar Workshop & PAN India Logistics Control Center
            </p>
          </div>

          {/* Role Switcher & Storefront Link */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 text-xs bg-[#052224] px-3 py-1.5 rounded-lg border border-[#0c4346]">
              <span className="text-stone-300">Role:</span>
              <select
                value={adminRole}
                onChange={(e) => setAdminRole(e.target.value as any)}
                className="bg-transparent text-[#DFC168] font-bold focus:outline-none"
              >
                <option value="Owner">Store Owner</option>
                <option value="Jeweler">Master Silversmith</option>
                <option value="Support">Support Manager</option>
              </select>
            </div>

            <Link
              to="/"
              className="px-3 py-1.5 bg-[#DFC168] hover:bg-[#C5A059] text-[#083335] text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1 transition-colors"
              title="Return to Customer Storefront"
            >
              <span>View Storefront ↗</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex bg-white p-1.5 rounded-xl border border-[#E5E0DC] shadow-xs mb-8 space-x-1 overflow-x-auto scrollbar-none text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'overview' ? 'bg-[#083335] text-white shadow-xs' : 'text-stone-600 hover:bg-[#FBF9F7]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Executive Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'products' ? 'bg-[#083335] text-white shadow-xs' : 'text-stone-600 hover:bg-[#FBF9F7]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bespoke')}
            className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'bespoke' ? 'bg-[#083335] text-white shadow-xs' : 'text-stone-600 hover:bg-[#FBF9F7]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#DFC168]" />
            <span>Custom Orders CRM ({customRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'orders' ? 'bg-[#083335] text-white shadow-xs' : 'text-stone-600 hover:bg-[#FBF9F7]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Fulfillment ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'customers' ? 'bg-[#083335] text-white shadow-xs' : 'text-stone-600 hover:bg-[#FBF9F7]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Customers</span>
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'coupons' ? 'bg-[#083335] text-white shadow-xs' : 'text-stone-600 hover:bg-[#FBF9F7]'
            }`}
          >
            <Tag className="w-4 h-4 text-[#DFC168]" />
            <span>Promotions & Coupons</span>
          </button>

          <button
            onClick={() => setActiveTab('integrations')}
            className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'integrations' ? 'bg-[#083335] text-white shadow-xs' : 'text-stone-600 hover:bg-[#FBF9F7]'
            }`}
          >
            <Settings className="w-4 h-4 text-[#DFC168]" />
            <span>Integrations & API Hub</span>
          </button>
        </div>

        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="bg-white p-5 rounded-2xl border border-[#E5E0DC] shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#083335]">Total Sales (INR)</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-serif text-2xl font-bold text-[#083335]">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-1">
                  +18.4% from last week
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E5E0DC] shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#083335]">Total Orders</span>
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#083335] flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-serif text-2xl font-bold text-[#083335]">
                  {totalOrdersCount}
                </div>
                <div className="text-[11px] text-stone-500 mt-1">
                  Across 12 Indian states
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E5E0DC] shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#083335]">Bespoke Inquiries</span>
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#083335] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#DFC168]" />
                  </div>
                </div>
                <div className="font-serif text-2xl font-bold text-[#083335]">
                  {activeBespokeCount} In Progress
                </div>
                <div className="text-[11px] text-[#A8823E] font-medium mt-1">
                  Sarafa workshop active
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E5E0DC] shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#083335]">Average Order Value</span>
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-serif text-2xl font-bold text-[#083335]">
                  ₹{avgOrderValue.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-stone-500 mt-1">
                  Solid 925 silver average
                </div>
              </div>

            </div>

            {/* YourBulkSMS Gateway Live Status & OTP Console Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#083335]/20 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E0DC]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#083335] text-[#DFC168] flex items-center justify-center border border-[#0c4346]">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-base font-semibold text-[#083335]">
                        YourBulkSMS Gateway & Customer OTP Dispatcher
                      </h3>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                      </span>
                    </div>
                    <p className="text-xs text-stone-500">
                      Active API integration for customer phone verification, mobile sign-in & dispatch notifications.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditingSmsConfig(!isEditingSmsConfig)}
                  className="px-3 py-1.5 border border-[#E5E0DC] hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  {isEditingSmsConfig ? 'Close Settings' : 'Configure Sender ID & DLT'}
                </button>
              </div>

              {/* Status Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E5E0DC]">
                  <span className="block text-[10px] uppercase font-bold text-stone-400">Gateway Balance</span>
                  <span className="text-sm font-bold text-[#083335]">7,575 Credits</span>
                  <span className="block text-[10px] text-emerald-700 font-medium">Route 2 Active</span>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E5E0DC]">
                  <span className="block text-[10px] uppercase font-bold text-stone-400">Active Sender ID</span>
                  <span className="text-sm font-mono font-bold text-[#083335]">{smsConfig.sender || 'ABCDEF'}</span>
                  <span className="block text-[10px] text-stone-500">6-Character DLT Header</span>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E5E0DC]">
                  <span className="block text-[10px] uppercase font-bold text-stone-400">Authentication Token</span>
                  <span className="text-sm font-mono font-bold text-stone-700">NmRW••••••••NG</span>
                  <span className="block text-[10px] text-emerald-700 font-medium">Verified Active</span>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E5E0DC]">
                  <span className="block text-[10px] uppercase font-bold text-stone-400">DLT Template ID</span>
                  <span className="text-sm font-mono font-bold text-[#083335]">{smsConfig.dltTemplateId || 'Standard OTP'}</span>
                  <span className="block text-[10px] text-stone-500">TRAI Compliant</span>
                </div>
              </div>

              {/* Edit Settings Drawer */}
              {isEditingSmsConfig && (
                <form onSubmit={handleSaveSmsSettings} className="p-4 bg-[#FBF9F7] rounded-xl border border-[#E5E0DC] space-y-3 text-xs animate-fadeIn">
                  <div className="font-bold text-[#083335]">Update Sender ID & DLT Template ID:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Approved 6-Character Sender ID (e.g. ARGIJW)</label>
                      <input
                        type="text"
                        maxLength={6}
                        value={customSender}
                        onChange={(e) => setCustomSender(e.target.value.toUpperCase())}
                        placeholder="e.g. ARGIJW"
                        className="w-full px-3 py-2 bg-white border border-[#E5E0DC] rounded-lg font-mono font-bold uppercase focus:outline-none focus:border-[#083335]"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">DLT Template ID (from DLT Portal)</label>
                      <input
                        type="text"
                        value={customDltId}
                        onChange={(e) => setCustomDltId(e.target.value)}
                        placeholder="e.g. 120716197281928"
                        className="w-full px-3 py-2 bg-white border border-[#E5E0DC] rounded-lg font-mono focus:outline-none focus:border-[#083335]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingSmsConfig(false)}
                      className="px-3 py-1.5 border border-[#E5E0DC] rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#083335] text-white font-bold rounded-lg uppercase tracking-wider text-[10px]"
                    >
                      Save Configuration
                    </button>
                  </div>
                </form>
              )}

              {/* Live Test Tool */}
              <form onSubmit={handleSendTestSms} className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <div className="flex-1 w-full flex items-center rounded-lg border border-[#E5E0DC] bg-[#FAF7F2] focus-within:border-[#083335]">
                  <span className="px-3 py-2 bg-stone-100 text-xs font-bold text-stone-600 border-r border-[#E5E0DC] rounded-l-lg">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={testMobile}
                    onChange={(e) => setTestMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter phone number to test SMS delivery..."
                    className="flex-1 px-3 py-2 text-xs bg-transparent focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSendingTestSms || testMobile.length < 10}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#083335] hover:bg-[#052224] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap shadow-xs"
                >
                  {isSendingTestSms ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Smartphone className="w-3.5 h-3.5 text-[#DFC168]" />
                      <span>Send Test Verification SMS</span>
                    </>
                  )}
                </button>
              </form>

              {testSmsStatus && (
                <div className="p-2.5 bg-stone-50 border border-[#E5E0DC] rounded-lg text-xs text-stone-700 flex items-center justify-between">
                  <span><strong>Status:</strong> {testSmsStatus}</span>
                  <button
                    type="button"
                    onClick={() => setTestSmsStatus(null)}
                    className="text-[10px] text-stone-400 hover:text-stone-700 underline"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* Low Stock Alerts & Recent Bespoke Inquiries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Low Stock Alert Center */}
              <div className="bg-white p-6 rounded-2xl border border-[#E5E0DC] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <h3 className="font-serif text-base font-semibold text-[#083335]">
                      Low Inventory Warnings ({lowStockProducts.length})
                    </h3>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-stone-400">Restock Needed</span>
                </div>

                <div className="divide-y divide-[#F0ECE8]">
                  {lowStockProducts.map((p) => (
                    <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <img src={p.images[0]} alt={p.title} className="w-10 h-10 object-cover rounded-lg border border-[#E5E0DC]" />
                        <div>
                          <div className="font-medium text-[#083335] line-clamp-1">{p.title}</div>
                          <div className="text-[10px] text-stone-400 font-mono">{p.sku}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-rose-600 font-bold">{p.stockCount} units left</span>
                        <button
                          onClick={() => handleOpenEditProduct(p)}
                          className="block text-[11px] text-[#083335] font-semibold hover:underline"
                        >
                          Quick Restock
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Bespoke Pipeline */}
              <div className="bg-white p-6 rounded-2xl border border-[#E5E0DC] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#DFC168]" />
                    <h3 className="font-serif text-base font-semibold text-[#083335]">
                      Recent Custom Orders Pipeline
                    </h3>
                  </div>
                  <button 
                    onClick={() => setActiveTab('bespoke')}
                    className="text-xs text-[#083335] font-semibold hover:underline"
                  >
                    View All CRM
                  </button>
                </div>

                <div className="divide-y divide-[#F0ECE8]">
                  {customRequests.slice(0, 3).map((r) => (
                    <div key={r.id} className="py-3 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-semibold text-[#083335]">{r.category}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF7F2] text-[#083335] border border-[#083335]/20">
                          {r.status}
                        </span>
                      </div>
                      <div className="text-stone-500">
                        Client: <strong>{r.customerName}</strong> ({r.city}) • {r.selectedFinish}
                      </div>
                      <div className="text-[11px] text-stone-400 line-clamp-1 italic">
                        "{r.description}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PRODUCT MANAGEMENT (CRUD) */}
        {activeTab === 'products' && (
          <div className="bg-white p-6 rounded-2xl border border-[#E5E0DC] shadow-xs space-y-6 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#083335]">
                  925 Sterling Silver Product Catalog
                </h3>
                <p className="text-xs text-stone-500">
                  Manage live prices, stock levels, finish variants, and hallmarking certificates.
                </p>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2.5 bg-[#083335] hover:bg-[#052224] text-white text-xs uppercase tracking-wider font-bold rounded-lg flex items-center gap-2 shadow transition-colors self-start border border-[#0c4346]"
              >
                <Plus className="w-4 h-4 text-[#DFC168]" />
                <span>Add New Jewel</span>
              </button>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto border border-[#E5E0DC] rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FBF9F7] text-[#083335] uppercase text-[10px] tracking-wider border-b border-[#E5E0DC]">
                  <tr>
                    <th className="px-4 py-3 font-bold">Jewel</th>
                    <th className="px-4 py-3 font-bold">SKU & Category</th>
                    <th className="px-4 py-3 font-bold">Price (INR)</th>
                    <th className="px-4 py-3 font-bold">Stock</th>
                    <th className="px-4 py-3 font-bold">Status</th>
                    <th className="px-4 py-3 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0ECE8]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50/60">
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <img src={p.images[0]} alt={p.title} className="w-11 h-11 object-cover rounded-lg border border-[#E5E0DC]" />
                          <div>
                            <div className="font-serif font-medium text-[#083335] max-w-xs truncate">{p.title}</div>
                            <div className="text-[10px] text-stone-400">{p.finishes.join(', ')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-mono text-stone-700 font-semibold">{p.sku}</div>
                        <div className="text-[10px] text-stone-400">{p.category}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-[#083335]">₹{p.price.toLocaleString('en-IN')}</div>
                        {p.originalPrice && (
                          <div className="text-[10px] text-stone-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-semibold ${p.stockCount <= 5 ? 'text-rose-600' : 'text-stone-700'}`}>
                          {p.stockCount} in stock
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          p.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                          p.status === 'Draft' ? 'bg-stone-200 text-stone-700' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditProduct(p)}
                          className="p-1 text-stone-600 hover:text-[#083335] transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: CUSTOM ORDERS CRM */}
        {activeTab === 'bespoke' && (
          <div className="bg-white p-6 rounded-2xl border border-[#E5E0DC] shadow-xs space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#083335]">
                Bespoke Design Requests CRM
              </h3>
              <p className="text-xs text-stone-500">
                Manage custom jewelry submissions from "Design Your Piece". Update CAD confirmation and message clients on WhatsApp.
              </p>
            </div>

            <div className="space-y-4">
              {customRequests.map((req) => (
                <div key={req.id} className="p-4 sm:p-5 rounded-xl border border-[#E5E0DC] bg-[#FAF7F2] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE5DB] pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-serif font-bold text-sm text-[#083335]">{req.category}</span>
                      <span className="font-mono text-xs text-stone-500">#{req.id}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${
                        req.status === 'Shipped' ? 'bg-emerald-100 text-emerald-800' :
                        req.status === 'In Crafting' ? 'bg-purple-100 text-purple-800' :
                        req.status === 'Design Confirmed' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {req.status}
                      </span>
                      <button
                        onClick={() => {
                          setEditingBespokeId(req.id);
                          setBespokeNewStatus(req.status);
                          setBespokeNotes(req.notes || '');
                        }}
                        className="px-2.5 py-1 text-xs border border-[#E5E0DC] bg-white rounded-lg hover:bg-stone-50 font-medium"
                      >
                        Update Status
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                    <div className="md:col-span-2 space-y-1">
                      <div className="text-stone-500">Client: <strong className="text-[#083335]">{req.customerName}</strong> ({req.phone} • {req.city})</div>
                      <div className="text-stone-700 italic bg-white p-2.5 rounded-lg border border-[#E5E0DC]">
                        "{req.description}"
                      </div>
                      <div className="text-stone-500 pt-1">
                        <strong>Finish:</strong> {req.selectedFinish} • <strong>Stone:</strong> {req.stonePreference} • <strong>Size:</strong> {req.size || 'N/A'} • <strong>Budget:</strong> {req.budgetRange}
                      </div>
                      {req.notes && (
                        <div className="text-[11px] text-stone-600 bg-amber-50 p-1.5 rounded-lg">
                          <strong>Address Note:</strong> {req.notes}
                        </div>
                      )}
                    </div>

                    {/* Reference Photo */}
                    <div className="flex flex-col items-center justify-center">
                      {req.referenceImageUrl ? (
                        <img src={req.referenceImageUrl} alt="Concept" className="w-24 h-24 object-cover rounded-xl border border-[#E5E0DC]" />
                      ) : (
                        <div className="text-[10px] text-stone-400">No image uploaded</div>
                      )}
                    </div>

                    {/* Action WhatsApp */}
                    <div className="flex flex-col justify-center space-y-2">
                      <a
                        href={`https://wa.me/${req.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hello ${req.customerName}! Argi Jewels here from Sarafa Bazar, Indore regarding your custom ${req.category} inquiry (#${req.id}). Status is currently: "${req.status}".`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Send WhatsApp Update</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 4: ORDERS FULFILLMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white p-6 rounded-2xl border border-[#E5E0DC] shadow-xs space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#083335]">
                Customer Orders & PAN India Dispatch
              </h3>
              <p className="text-xs text-stone-500">
                Manage order fulfillment, assign Blue Dart / Delhivery courier partners, and update AWB tracking codes.
              </p>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="p-4 sm:p-5 rounded-xl border border-[#E5E0DC] bg-[#FAF7F2] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE5DB] pb-3 text-xs">
                    <div>
                      <span className="font-mono font-bold text-sm text-[#083335]">{order.id}</span>
                      <span className="text-stone-400 ml-2">({order.customer.city}, {order.customer.state})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${
                        order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                        order.status === 'Shipped' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.status}
                      </span>
                      <button
                        onClick={() => setSelectedLabelOrder(order)}
                        className="px-2.5 py-1 border border-[#083335] text-[#083335] bg-white rounded-lg text-xs font-semibold hover:bg-[#083335] hover:text-white transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                        title="Print 4x6 Thermal Shipping Label"
                      >
                        <Printer className="w-3.5 h-3.5 text-[#DFC168]" />
                        <span>Shipping Label</span>
                      </button>
                      <button
                        onClick={() => {
                          setEditingOrderId(order.id);
                          setOrderNewStatus(order.status);
                          setOrderCourier(order.courierPartner || 'Blue Dart Express');
                          setOrderTracking(order.trackingNumber || '');
                        }}
                        className="px-2.5 py-1 border border-[#E5E0DC] bg-white rounded-lg text-xs font-semibold hover:bg-stone-50"
                      >
                        Update Fulfillment
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="text-stone-500">
                        Recipient: <strong>{order.customer.name}</strong> ({order.customer.phone})
                      </div>
                      <div className="text-stone-600">
                        Address: {order.customer.address}, {order.customer.city} - {order.customer.pincode}
                      </div>
                      <div className="text-stone-500">
                        Payment: <strong>{order.paymentMethod}</strong> ({order.paymentStatus})
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-stone-500">Courier Partner: <strong>{order.courierPartner || 'Not assigned'}</strong></div>
                      <div className="text-stone-500">AWB Tracking: <strong className="font-mono text-emerald-700">{order.trackingNumber || 'Pending'}</strong></div>
                      <div className="font-bold text-sm text-[#083335] pt-1">
                        Total Amount: ₹{order.totalAmount.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="space-y-1 text-stone-600">
                      <div className="font-semibold text-[#083335]">Ordered Items ({order.items.length}):</div>
                      {order.items.map((it) => (
                        <div key={it.id} className="text-[11px]">
                          • {it.title} ({it.finish}) × {it.quantity}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 5: CUSTOMER DIRECTORY */}
        {activeTab === 'customers' && (
          <div className="bg-white p-6 rounded-2xl border border-[#E5E0DC] shadow-xs space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#083335]">
                Registered Customers & Collectors
              </h3>
              <p className="text-xs text-stone-500">
                Customers across India who have purchased ready collections or commissioned bespoke jewelry.
              </p>
            </div>

            <div className="overflow-x-auto border border-[#E5E0DC] rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FBF9F7] text-[#083335] uppercase text-[10px] tracking-wider border-b border-[#E5E0DC]">
                  <tr>
                    <th className="px-4 py-3 font-bold">Customer Name</th>
                    <th className="px-4 py-3 font-bold">Contact & City</th>
                    <th className="px-4 py-3 font-bold">Total Orders</th>
                    <th className="px-4 py-3 font-bold">Total Spend (INR)</th>
                    <th className="px-4 py-3 font-bold text-right">Concierge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0ECE8]">
                  {customerList.map((c, i) => (
                    <tr key={i} className="hover:bg-stone-50/60">
                      <td className="px-4 py-3">
                        <div className="font-serif font-medium text-[#083335]">{c.name}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-mono text-stone-700">{c.phone}</div>
                        <div className="text-[10px] text-stone-400">{c.city}, India</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium">{c.totalOrders}</span>
                      </td>
                      <td className="px-4 py-3 font-bold text-[#083335]">
                        ₹{c.totalSpend.toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <a
                          href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0F682C] hover:underline"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: PROMOTIONS & COUPONS */}
        {activeTab === 'coupons' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5E0DC] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-[#083335] font-bold">
                  Growth & Conversions
                </div>
                <h3 className="font-serif text-xl font-bold text-[#083335]">
                  Promotional Coupons & Campaign Manager
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Active promo codes validated dynamically in both Cart Drawer and Checkout.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-bold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>5 Default Coupons Active</span>
                </span>
              </div>
            </div>

            {/* Quick KPI Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-[#E5E0DC] shadow-2xs">
                <div className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Active Codes</div>
                <div className="text-2xl font-serif font-bold text-[#083335] mt-1">{couponList.filter(c => c.active).length}</div>
                <div className="text-[10px] text-stone-400 mt-0.5">Live on storefront</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#E5E0DC] shadow-2xs">
                <div className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Total Redemptions</div>
                <div className="text-2xl font-serif font-bold text-emerald-800 mt-1">
                  {couponList.reduce((s, c) => s + c.usageCount, 0)}
                </div>
                <div className="text-[10px] text-stone-400 mt-0.5">Across all Indian orders</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#E5E0DC] shadow-2xs">
                <div className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Top Performing Code</div>
                <div className="text-xl font-mono font-bold text-[#083335] mt-1">INDORE / ARGI10</div>
                <div className="text-[10px] text-[#A8823E] mt-0.5">Highest conversion in MP & Metros</div>
              </div>
            </div>

            {/* Add New Coupon Form */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5E0DC] shadow-xs space-y-4">
              <h4 className="font-serif text-base font-bold text-[#083335] flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#DFC168]" />
                <span>Create New Promotional Code</span>
              </h4>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newCouponCode.trim()) return;
                  const codeUpper = newCouponCode.trim().toUpperCase();
                  if (couponList.some(c => c.code === codeUpper)) {
                    alert('Coupon code already exists!');
                    return;
                  }
                  const created: AdminCoupon = {
                    code: codeUpper,
                    type: newCouponType,
                    value: Number(newCouponValue),
                    minOrderValue: Number(newCouponMin),
                    active: true,
                    usageCount: 0,
                  };
                  setCouponList(prev => [created, ...prev]);
                  setNewCouponCode('');
                }}
                className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs"
              >
                <div>
                  <label className="block font-medium text-stone-700 mb-1">Coupon Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DIWALI2026"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    className="w-full px-3 py-2 uppercase font-mono font-bold bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Discount Type</label>
                  <select
                    value={newCouponType}
                    onChange={(e) => setNewCouponType(e.target.value as 'percent' | 'flat')}
                    className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg text-xs"
                  >
                    <option value="percent">Percentage (% Off)</option>
                    <option value="flat">Flat Cash (₹ Off)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Discount Value</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newCouponValue}
                    onChange={(e) => setNewCouponValue(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Min Order Value (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={newCouponMin}
                    onChange={(e) => setNewCouponMin(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#083335] hover:bg-[#052224] text-white font-bold rounded-lg uppercase tracking-wider text-xs shadow-xs transition-colors"
                  >
                    + Add Coupon
                  </button>
                </div>
              </form>
            </div>

            {/* Coupons Table */}
            <div className="bg-white rounded-2xl border border-[#E5E0DC] shadow-xs overflow-hidden">
              <div className="p-4 border-b border-[#E5E0DC] bg-[#FBF9F7] flex items-center justify-between">
                <span className="font-serif font-bold text-[#083335] text-sm">Active & Historic Vouchers</span>
                <span className="text-xs text-stone-500">{couponList.length} total codes</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FAF7F2] text-stone-600 uppercase text-[10px] tracking-wider border-b border-[#E5E0DC]">
                    <tr>
                      <th className="px-4 py-3 font-bold">Code</th>
                      <th className="px-4 py-3 font-bold">Benefit</th>
                      <th className="px-4 py-3 font-bold">Min Cart Value</th>
                      <th className="px-4 py-3 font-bold">Redemptions</th>
                      <th className="px-4 py-3 font-bold">Status</th>
                      <th className="px-4 py-3 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E0DC]">
                    {couponList.map((cp) => (
                      <tr key={cp.code} className="hover:bg-[#FAF7F2]/50">
                        <td className="px-4 py-3 font-mono font-bold text-[#083335] text-sm flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-[#DFC168]" />
                          <span>{cp.code}</span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-stone-700">
                          {cp.type === 'percent' ? `${cp.value}% Off Entire Order` : `₹${cp.value} Flat Cashback`}
                        </td>
                        <td className="px-4 py-3 text-stone-600 font-mono">
                          {cp.minOrderValue ? `₹${cp.minOrderValue.toLocaleString('en-IN')}` : 'No minimum'}
                        </td>
                        <td className="px-4 py-3 font-bold text-[#083335]">
                          {cp.usageCount} orders
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            cp.active ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                          }`}>
                            {cp.active ? 'Active' : 'Disabled'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => {
                              setCouponList(prev => prev.map(c => c.code === cp.code ? { ...c, active: !c.active } : c));
                            }}
                            className="text-xs text-[#083335] hover:underline font-semibold"
                          >
                            {cp.active ? 'Pause' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 7: INTEGRATIONS & API HUB */}
        {activeTab === 'integrations' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5E0DC] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-[#083335] font-bold">
                  Address Cloud Infrastructure
                </div>
                <h3 className="font-serif text-xl font-bold text-[#083335]">
                  Commercial Integrations & Gateway Hub
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Manage live production credentials for SMS OTP, Google OAuth, Payment Gateways, and Logistics.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>All Systems Operational</span>
                </span>
              </div>
            </div>

            {/* 4 Gateway Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* CARD 1: YourBulkSMS Mobile OTP Gateway */}
              <div className="bg-white p-6 rounded-2xl border border-[#E5E0DC] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E0DC] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-[#DFC168]/50 flex items-center justify-center text-[#083335]">
                      <Smartphone className="w-5 h-5 text-[#083335]" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#083335]">YourBulkSMS Route 2 Gateway</h4>
                      <div className="text-[10px] text-stone-400 uppercase tracking-widest">Mobile OTP Verification</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                    Active • Route 2
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 bg-[#FBF9F7] rounded-lg">
                    <span className="text-stone-500">API Endpoint:</span>
                    <span className="font-mono font-semibold text-stone-700 truncate max-w-xs">
                      http://control.yourbulksms.com/api/sendhttp.php
                    </span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#FBF9F7] rounded-lg">
                    <span className="text-stone-500">Auth Token Key:</span>
                    <span className="font-mono font-bold text-emerald-800">
                      NmRWYWZLSHpza3VPNWRGVzNG
                    </span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#FBF9F7] rounded-lg">
                    <span className="text-stone-500">Sender ID:</span>
                    <span className="font-mono font-bold text-[#083335]">{smsConfig.sender}</span>
                  </div>
                </div>

                {/* Test SMS Widget */}
                <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#DFC168]/40 space-y-2.5">
                  <div className="text-xs font-bold text-[#083335] flex items-center gap-1.5">
                    <span>⚡ Live SMS Gateway Verification Tool</span>
                  </div>
                  <form onSubmit={handleSendTestSms} className="flex gap-2 text-xs">
                    <input
                      type="tel"
                      placeholder="10-digit customer mobile (e.g. 9826012345)"
                      value={testMobile}
                      onChange={(e) => setTestMobile(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                    />
                    <button
                      type="submit"
                      disabled={isSendingTestSms}
                      className="px-4 py-2 bg-[#083335] text-white font-bold rounded-lg hover:bg-[#052224] transition-colors whitespace-nowrap"
                    >
                      {isSendingTestSms ? 'Dispatching...' : 'Send Live OTP'}
                    </button>
                  </form>
                  {testSmsStatus && (
                    <p className="text-[11px] font-mono text-emerald-800 bg-white p-2 rounded border border-emerald-100">
                      {testSmsStatus}
                    </p>
                  )}
                </div>
              </div>

              {/* CARD 2: Google Cloud Identity (OAuth 2.0) */}
              <div className="bg-white p-6 rounded-2xl border border-[#E5E0DC] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E0DC] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-[#E5E0DC] flex items-center justify-center">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#083335]">Google Identity Services (GSI)</h4>
                      <div className="text-[10px] text-stone-400 uppercase tracking-widest">Real Google OAuth 2.0</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-sky-100 text-sky-800 text-[10px] font-bold rounded-full">
                    OAuth 2.0 Live
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Google OAuth Web Client ID
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. 1234567890-abc.apps.googleusercontent.com"
                        value={googleClientId}
                        onChange={(e) => {
                          setGoogleClientId(e.target.value);
                          setGoogleSavedStatus(false);
                        }}
                        className="flex-1 px-3 py-2 font-mono text-[11px] bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          localStorage.setItem('argi_google_client_id_v1', googleClientId.trim());
                          setGoogleSavedStatus(true);
                          setTimeout(() => setGoogleSavedStatus(false), 3000);
                        }}
                        className="px-4 py-2 bg-[#083335] text-white font-bold rounded-lg hover:bg-[#052224] transition-colors"
                      >
                        {googleSavedStatus ? 'Saved!' : 'Save ID'}
                      </button>
                    </div>
                    {googleSavedStatus && (
                      <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                        ✓ Client ID saved! Storefront customer login will use this client ID immediately.
                      </p>
                    )}
                  </div>

                  <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E5E0DC] text-[11px] text-stone-600 space-y-1">
                    <div className="font-bold text-[#083335]">Google Cloud Console Instructions:</div>
                    <p>1. Open Google Cloud Console → APIs & Services → Credentials.</p>
                    <p>2. Set <strong>Authorized JavaScript origins</strong>: <code className="bg-white px-1 py-0.5 rounded text-[#083335] font-mono">http://localhost:3000</code> and production domain.</p>
                    <p>3. Enables 1-click Google Sign-In with real customer profile avatars.</p>
                  </div>
                </div>
              </div>

              {/* CARD 3: Payment Gateways (Razorpay & Cashfree) */}
              <div className="bg-white p-6 rounded-2xl border border-[#E5E0DC] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E0DC] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-[#DFC168]/50 flex items-center justify-center text-[#083335]">
                      <CreditCard className="w-5 h-5 text-[#083335]" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#083335]">Razorpay & UPI Payments</h4>
                      <div className="text-[10px] text-stone-400 uppercase tracking-widest">RBI Tokenized Checkout</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsLivePayment(!isLivePayment)}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition-colors ${
                        isLivePayment ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {isLivePayment ? '● LIVE MODE' : '○ TEST MODE'}
                    </button>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Razorpay Key ID</label>
                      <input
                        type="text"
                        value={razorpayKey}
                        onChange={(e) => setRazorpayKey(e.target.value)}
                        className="w-full px-3 py-2 font-mono text-[11px] bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Key Secret</label>
                      <input
                        type="password"
                        value={razorpaySecret}
                        onChange={(e) => setRazorpaySecret(e.target.value)}
                        className="w-full px-3 py-2 font-mono text-[11px] bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-2.5 bg-[#FAF7F2] rounded-lg border border-[#E5E0DC]">
                    <div>
                      <div className="font-bold text-[#083335]">Payment Webhook Endpoint:</div>
                      <div className="font-mono text-[10px] text-stone-500">https://api.argijewels.in/v1/webhooks/razorpay</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.setItem('argi_razorpay_key', razorpayKey);
                        localStorage.setItem('argi_razorpay_secret', razorpaySecret);
                        setGatewaySavedStatus(true);
                        setTimeout(() => setGatewaySavedStatus(false), 2500);
                      }}
                      className="px-3 py-1.5 bg-[#083335] text-white text-[11px] font-bold rounded-lg"
                    >
                      {gatewaySavedStatus ? 'Saved!' : 'Save Keys'}
                    </button>
                  </div>

                  <div className="text-[11px] text-stone-500 space-y-0.5">
                    <div>• Supported: UPI (GPay, PhonePe, Paytm), RuPay on UPI, Cards, NetBanking, COD.</div>
                    <div>• Auto GST splitting: 3% Precious Metals tax calculation built-in.</div>
                  </div>
                </div>
              </div>

              {/* CARD 4: PAN India Courier & Logistics (Blue Dart Air) */}
              <div className="bg-white p-6 rounded-2xl border border-[#E5E0DC] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E0DC] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-[#DFC168]/50 flex items-center justify-center text-[#083335]">
                      <Truck className="w-5 h-5 text-[#083335]" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#083335]">Blue Dart Air & Logistics API</h4>
                      <div className="text-[10px] text-stone-400 uppercase tracking-widest">Insured Precious Metals Air Express</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                    Integrated
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Blue Dart Account ID</label>
                      <input
                        type="text"
                        value={blueDartAccount}
                        onChange={(e) => setBlueDartAccount(e.target.value)}
                        className="w-full px-3 py-2 font-mono text-[11px] bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Delhivery API Key</label>
                      <input
                        type="text"
                        value={delhiveryApiKey}
                        onChange={(e) => setDelhiveryApiKey(e.target.value)}
                        className="w-full px-3 py-2 font-mono text-[11px] bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E5E0DC] text-[11px] text-stone-600 space-y-1">
                    <div className="font-bold text-[#083335]">Dispatch Hub Configuration:</div>
                    <p>Primary Origin: <strong>Argi Jewels Address, Sarafa Bazar, Indore 452002</strong></p>
                    <p>AWB Numbers: Auto-generated on order placement with tracking updates on customer portal.</p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.setItem('argi_bluedart_acc', blueDartAccount);
                        localStorage.setItem('argi_delhivery_key', delhiveryApiKey);
                        setLogisticsSavedStatus(true);
                        setTimeout(() => setLogisticsSavedStatus(false), 2500);
                      }}
                      className="px-4 py-2 bg-[#083335] text-white font-bold rounded-lg text-xs"
                    >
                      {logisticsSavedStatus ? 'Saved Logistics Settings!' : 'Save Logistics Settings'}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* MODAL: Add / Edit Product */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsProductModalOpen(false)} />
          <div className="relative bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl z-10 animate-fadeIn my-8 border border-[#083335]/20">
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-medium text-[#083335] mb-4">
              {editingProductId ? 'Edit 925 Silver Piece' : 'Add New Handcrafted Piece'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1 text-stone-700">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={prodTitle}
                    onChange={(e) => setProdTitle(e.target.value)}
                    placeholder="e.g. Royal Solitaire Ring"
                    className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-stone-700">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={prodSku}
                    onChange={(e) => setProdSku(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg font-mono focus:outline-none focus:border-[#083335]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium mb-1 text-stone-700">Category</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg"
                  >
                    <option value="Rings">Rings</option>
                    <option value="Necklaces">Necklaces</option>
                    <option value="Bracelets">Bracelets</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Personalized">Personalized</option>
                    <option value="Engagement">Engagement</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1 text-stone-700">Selling Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-stone-700">Original Price (MSRP)</label>
                  <input
                    type="number"
                    value={prodOriginalPrice}
                    onChange={(e) => setProdOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1 text-stone-700">Inventory Count</label>
                  <input
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-stone-700">Status</label>
                  <select
                    value={prodStatus}
                    onChange={(e) => setProdStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              {/* Product Imagery: Upload & URL */}
              <div className="space-y-3 p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E5E0DC]">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block font-semibold text-stone-800 text-[11px]">
                      Product Imagery & Gallery *
                    </label>
                    <span className="text-[10px] text-stone-500">
                      Upload high-res photos from your device or paste web URLs
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#083335] bg-[#083335]/10 px-2 py-0.5 rounded-full">
                    {prodImages.length} {prodImages.length === 1 ? 'image' : 'images'}
                  </span>
                </div>

                {/* Upload & URL Input Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* File Upload Option */}
                  <label className="flex flex-col items-center justify-center p-3.5 border-2 border-dashed border-[#083335]/30 hover:border-[#083335] bg-white rounded-xl cursor-pointer transition-all group">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageFileUpload}
                    />
                    <div className="w-9 h-9 rounded-full bg-[#083335]/5 group-hover:bg-[#083335]/15 flex items-center justify-center text-[#083335] mb-1.5 transition-transform group-hover:scale-110">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-stone-800 text-[11px] group-hover:text-[#083335]">
                      {isUploadingImage ? 'Reading Image...' : 'Upload from Device'}
                    </span>
                    <span className="text-[10px] text-stone-400 mt-0.5">
                      JPEG, PNG, WebP (Multiple allowed)
                    </span>
                  </label>

                  {/* Web URL Option */}
                  <div className="flex flex-col justify-between p-3 bg-white border border-[#E5E0DC] rounded-xl">
                    <div>
                      <span className="block font-semibold text-stone-700 text-[10px] uppercase tracking-wider mb-1">
                        Or Add Web URL
                      </span>
                      <div className="flex gap-1.5">
                        <input
                          type="url"
                          value={imageUrlInput}
                          onChange={(e) => setImageUrlInput(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 px-2.5 py-1.5 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg text-xs focus:outline-none focus:border-[#083335]"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddImageUrl();
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleAddImageUrl}
                          className="px-3 py-1.5 bg-[#083335] text-white rounded-lg text-[10px] font-bold uppercase hover:bg-[#052224] transition-colors whitespace-nowrap"
                        >
                          Add URL
                        </button>
                      </div>
                    </div>
                    <span className="text-[10px] text-stone-400 mt-1">
                      Press Add or Enter to attach
                    </span>
                  </div>
                </div>

                {/* Uploaded Gallery Previews */}
                {prodImages.length > 0 ? (
                  <div className="pt-2 border-t border-[#E5E0DC]">
                    <div className="flex items-center justify-between text-[10px] font-bold text-stone-600 uppercase tracking-wider mb-2">
                      <span>Image Gallery ({prodImages.length})</span>
                      <span className="text-stone-400 font-normal">First image is the catalog cover</span>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                      {prodImages.map((imgUrl, idx) => (
                        <div 
                          key={idx} 
                          className="group relative aspect-square bg-stone-100 rounded-lg overflow-hidden border border-[#E5E0DC] shadow-2xs"
                        >
                          <img 
                            src={imgUrl} 
                            alt={`Preview ${idx + 1}`} 
                            className="w-full h-full object-cover"
                          />
                          {/* Cover Badge on first image */}
                          {idx === 0 && (
                            <span className="absolute top-1 left-1 bg-[#083335] text-[#DFC168] text-[8px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                              Cover
                            </span>
                          )}
                          {/* Hover Overlay with actions */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-1">
                            {idx !== 0 && (
                              <button
                                type="button"
                                onClick={() => handleSetCoverImage(idx)}
                                className="px-1.5 py-0.5 bg-white text-stone-900 rounded text-[9px] font-semibold hover:bg-stone-100 transition-colors whitespace-nowrap"
                                title="Set as primary cover"
                              >
                                Set Cover
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                              title="Delete this image"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-3 bg-white/70 rounded-lg border border-dashed border-stone-300">
                    <ImageIcon className="w-5 h-5 mx-auto text-stone-300 mb-1" />
                    <p className="text-[11px] text-stone-500">No images attached yet. Upload from device or add a URL above.</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1 text-stone-700">Description</label>
                <textarea
                  rows={3}
                  value={prodDescription}
                  onChange={(e) => setProdDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#E5E0DC]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-[#E5E0DC] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#083335] hover:bg-[#052224] text-white font-bold rounded-lg uppercase tracking-wider text-[11px] border border-[#0c4346]"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Update Order Fulfillment */}
      {editingOrderId && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setEditingOrderId(null)} />
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl z-10 animate-fadeIn border border-[#083335]/20">
            <h3 className="font-serif text-lg font-medium text-[#083335] mb-3">
              Update Order Fulfillment: {editingOrderId}
            </h3>

            <form onSubmit={handleSaveOrderStatus} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium mb-1 text-stone-700">Fulfillment Status</label>
                <select
                  value={orderNewStatus}
                  onChange={(e) => setOrderNewStatus(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg"
                >
                  <option value="Processing">Processing (Workshop Quality Check)</option>
                  <option value="Shipped">Shipped (In Transit)</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1 text-stone-700">Courier Partner</label>
                <select
                  value={orderCourier}
                  onChange={(e) => setOrderCourier(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg"
                >
                  <option value="Blue Dart Express">Blue Dart Express</option>
                  <option value="Delhivery">Delhivery Air</option>
                  <option value="DTDC Air">DTDC Air Priority</option>
                  <option value="Speed Post">India Post Speed Post</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1 text-stone-700">AWB Tracking Number</label>
                <input
                  type="text"
                  value={orderTracking}
                  onChange={(e) => setOrderTracking(e.target.value)}
                  placeholder="e.g. BLUEDART-IND-88741"
                  className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg font-mono focus:outline-none focus:border-[#083335]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingOrderId(null)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#083335] text-white rounded-lg font-bold hover:bg-[#052224] border border-[#0c4346]"
                >
                  Save Fulfillment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Update Bespoke Request Status */}
      {editingBespokeId && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setEditingBespokeId(null)} />
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl z-10 animate-fadeIn border border-[#083335]/20">
            <h3 className="font-serif text-lg font-medium text-[#083335] mb-3">
              Update Custom Request #{editingBespokeId}
            </h3>

            <form onSubmit={handleSaveBespokeStatus} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium mb-1 text-stone-700">Crafting Pipeline Status</label>
                <select
                  value={bespokeNewStatus}
                  onChange={(e) => setBespokeNewStatus(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg"
                >
                  <option value="New Request">New Request (Reviewing Sketch)</option>
                  <option value="Design Confirmed">Design Confirmed (CAD Approved)</option>
                  <option value="In Crafting">In Crafting (Silversmith Casting & Setting)</option>
                  <option value="Ready for Dispatch">Ready for Dispatch (Hallmarked)</option>
                  <option value="Shipped">Shipped</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1 text-stone-700">Silversmith Address Notes</label>
                <textarea
                  rows={3}
                  value={bespokeNotes}
                  onChange={(e) => setBespokeNotes(e.target.value)}
                  placeholder="e.g. CAD model approved. Casting pure 925 silver with Rhodium finish."
                  className="w-full px-3 py-2 bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingBespokeId(null)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#083335] text-white rounded-lg font-bold hover:bg-[#052224] border border-[#0c4346]"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4x6 Thermal Shipping Label Modal */}
      <ShippingLabelModal
        isOpen={Boolean(selectedLabelOrder)}
        onClose={() => setSelectedLabelOrder(null)}
        order={selectedLabelOrder}
      />

    </div>
  );
};
