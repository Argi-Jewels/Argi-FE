import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  FileText, 
  Lock, 
  Award, 
  CheckCircle2, 
  ChevronRight,
  PhoneCall,
  Mail,
  MapPin
} from 'lucide-react';

interface PolicyPageProps {
  forcedTab?: string;
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ forcedTab }) => {
  const { policyType } = useParams<{ policyType?: string }>();
  const [activeTab, setActiveTab] = useState<string>(forcedTab || policyType || 'shipping');

  useEffect(() => {
    if (forcedTab) {
      setActiveTab(forcedTab);
    } else if (policyType) {
      setActiveTab(policyType);
    }
    window.scrollTo(0, 0);
  }, [policyType, forcedTab]);

  const tabs = [
    { id: 'shipping', label: 'PAN India Shipping', icon: Truck },
    { id: 'returns', label: '15-Day Returns & Exchange', icon: RotateCcw },
    { id: 'hallmarking', label: 'BIS 925 Hallmarking Guide', icon: Award },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'privacy', label: 'Privacy & DLT Policy', icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F7] py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-stone-500 mb-6 flex items-center space-x-2">
          <Link to="/" className="hover:text-[#083335]">Home</Link>
          <span>/</span>
          <span className="text-[#083335] font-semibold capitalize">Policies & Trust</span>
          <span>/</span>
          <span className="text-[#A8823E] font-medium capitalize">{activeTab}</span>
        </nav>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#083335]/10 text-[#083335] text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#083335]" /> Consumer Trust & Standards
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#083335] font-medium">
            Customer Assurance & Policies
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Clear, transparent guidelines designed to protect your investment in fine 925 sterling silver jewelry.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center border-b border-[#E5E0DC] mb-10 overflow-x-auto scrollbar-none gap-2 sm:gap-4 pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#083335] text-white shadow-sm'
                    : 'bg-white text-stone-600 hover:text-[#083335] border border-[#E5E0DC]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#DFC168]' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#E5E0DC] shadow-sm max-w-4xl mx-auto text-xs sm:text-sm text-stone-700 leading-relaxed space-y-8">
          
          {/* TAB 1: SHIPPING & DELIVERY */}
          {activeTab === 'shipping' && (
            <div className="space-y-6">
              <div className="border-b border-[#E5E0DC] pb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8823E]">Logistics Standard</span>
                <h2 className="font-serif text-2xl text-[#083335] font-semibold mt-1">
                  PAN India Insured Express Shipping Policy
                </h2>
                <p className="text-xs text-stone-500 mt-1">Last revised: September 2026 • Compliant with Indian E-Commerce Rules</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5E0DC]">
                <div>
                  <div className="text-xs font-bold text-[#083335] uppercase">Indore Local</div>
                  <div className="text-lg font-serif font-bold text-[#083335] mt-0.5">Same / Next Day</div>
                  <div className="text-[11px] text-stone-500">Hand-delivered from Sarafa Atelier</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#083335] uppercase">Metro Cities</div>
                  <div className="text-lg font-serif font-bold text-[#083335] mt-0.5">2 - 3 Business Days</div>
                  <div className="text-[11px] text-stone-500">Priority Blue Dart Air Transit</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#083335] uppercase">Rest of India</div>
                  <div className="text-lg font-serif font-bold text-[#083335] mt-0.5">3 - 5 Business Days</div>
                  <div className="text-[11px] text-stone-500">Delhivery Air & DTDC Express</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#083335]">1. Free Shipping Threshold</h3>
                <p>
                  Argi Jewels provides <strong>Complimentary Insured Air Shipping</strong> across India for all prepaid orders above <strong>₹1,999</strong>. For orders below ₹1,999, a nominal standard express shipping fee of ₹150 is applied at checkout.
                </p>

                <h3 className="text-base font-bold text-[#083335]">2. 100% In-Transit Insurance</h3>
                <p>
                  Every silver shipment leaves our Indore workshop under full commercial transit insurance. In the rare event of damage, theft, or package loss during air courier transit, Argi Jewels guarantees an immediate replacement or a 100% refund without deduction.
                </p>

                <h3 className="text-base font-bold text-[#083335]">3. Tamper-Evident Luxury Packaging</h3>
                <p>
                  All jewellery pieces are sealed inside airtight anti-tarnish zip pouches, encased in our velvet jewellery chest, and enclosed within an exterior tamper-evident courier poly-mailer with a unique security hologram barcode. If the outer courier seal appears broken upon delivery, please refuse delivery and notify our WhatsApp Concierge (+91 92325 94228) immediately.
                </p>

                <h3 className="text-base font-bold text-[#083335]">4. Live SMS & WhatsApp Tracking</h3>
                <p>
                  As soon as your parcel is scanned at the logistics hub, an automated SMS notification (via YourBulkSMS) and an interactive WhatsApp tracking message are dispatched with your live Air Waybill (AWB) link.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: 15-DAY RETURN & EXCHANGE */}
          {activeTab === 'returns' && (
            <div className="space-y-6">
              <div className="border-b border-[#E5E0DC] pb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8823E]">Peace of Mind Guarantee</span>
                <h2 className="font-serif text-2xl text-[#083335] font-semibold mt-1">
                  15-Day Easy Exchange & Return Policy
                </h2>
                <p className="text-xs text-stone-500 mt-1">Risk-free shopping with complimentary doorstep reverse pickup</p>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wide">Complimentary Ring Sizing & Exchange</h4>
                  <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
                    Ring not fitting quite right? We provide one complimentary size adjustment or exchange within 15 days of receiving your order with free pickup from your address.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#083335]">1. Return Eligibility Window</h3>
                <p>
                  You may request a return or exchange within <strong>15 calendar days</strong> from the date of package delivery. To be eligible for a refund:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-600">
                  <li>The jewelry item must be unworn, undamaged, and in original pristine condition.</li>
                  <li>The attached security tag and the physical <strong>BIS 925 Certificate of Authenticity</strong> card must remain intact.</li>
                  <li>The piece must be packed inside the original Argi Jewels velvet box and anti-tarnish pouch.</li>
                </ul>

                <h3 className="text-base font-bold text-[#083335]">2. Non-Returnable Customized Items</h3>
                <p>
                  Pieces customized with permanent laser engraving, monogram initial engravings, or made-to-order bespoke atelier requests (created under customer CAD approval) are non-returnable, but remain covered under our <strong>Lifetime Cleaning & Anti-Tarnish Warranty</strong>.
                </p>

                <h3 className="text-base font-bold text-[#083335]">3. Doorstep Pickup & Refund Timeline</h3>
                <p>
                  Once initiated from your <Link to="/account" className="text-[#083335] font-semibold underline">Customer Account</Link> or via WhatsApp (+91 92325 94228), our courier partner Blue Dart will schedule a secure doorstep pickup. Refunds are processed back to your original payment method (Bank Account, UPI, or Card) within 48 hours of quality inspection at our Indore atelier.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: BIS 925 HALLMARKING GUIDE */}
          {activeTab === 'hallmarking' && (
            <div className="space-y-6">
              <div className="border-b border-[#E5E0DC] pb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8823E]">Official Purity Standards</span>
                <h2 className="font-serif text-2xl text-[#083335] font-semibold mt-1">
                  BIS 925 Sterling Silver Hallmarking & Authenticity Guide
                </h2>
                <p className="text-xs text-stone-500 mt-1">Complies with Bureau of Indian Standards (BIS) standard IS 2112:2014</p>
              </div>

              <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#DFC168]/40 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#083335] text-[#DFC168] flex items-center justify-center font-serif font-bold text-xl">
                    925
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#083335]">What Does 925 Sterling Silver Mean?</h3>
                    <p className="text-xs text-stone-600">
                      Pure fine silver (99.9%) is too malleable for durable fine jewelry. 925 Sterling Silver consists of <strong>92.5% pure elemental silver</strong> alloyed with 7.5% hardening metals to guarantee lifetime structural integrity.
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E5E0DC] pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#083335] mb-3">
                    The 3 Mandatory BIS Hallmarks Stamped on Every Argi Jewels Creation:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-[#E5E0DC]">
                      <div className="font-bold text-[#083335]">1. BIS Triangular Logo</div>
                      <p className="text-stone-500 mt-1 text-[11px]">Official mark of the Bureau of Indian Standards certifying purity verification.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-[#E5E0DC]">
                      <div className="font-bold text-[#083335]">2. Purity Mark (925)</div>
                      <p className="text-stone-500 mt-1 text-[11px]">Assayed silver fineness of 925 parts per thousand.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-[#E5E0DC]">
                      <div className="font-bold text-[#083335]">3. Jeweler / AHC Mark</div>
                      <p className="text-stone-500 mt-1 text-[11px]">Identification stamp of Argi Jewels and our certified Assaying Hallmarking Centre.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#083335]">Triple-Layer Anti-Tarnish Rhodium Dipping</h3>
                <p>
                  Untreated silver naturally oxidizes when exposed to ambient sulfur and moisture. Every Argi Jewels piece undergoes an electro-chemical immersion in liquid <strong>Rhodium</strong> (a noble metal from the platinum family worth more than gold). This creates a mirror-bright moonlight sheen that prevents tarnishing, is 100% hypoallergenic, and nickel-free.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div className="border-b border-[#E5E0DC] pb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8823E]">Legal Governance</span>
                <h2 className="font-serif text-2xl text-[#083335] font-semibold mt-1">
                  Terms of Service & Commercial Agreement
                </h2>
                <p className="text-xs text-stone-500 mt-1">Jurisdiction: Indore, Madhya Pradesh, India</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#083335]">1. Overview & Brand Representation</h3>
                <p>
                  This website is operated by <strong>Argi Jewels</strong>, based in Indore, Madhya Pradesh. By accessing our platform or purchasing any jewellery item, you agree to be bound by these Terms of Service. All prices are listed in Indian Rupees (INR) and are inclusive of standard 3% GST on precious metals.
                </p>

                <h3 className="text-base font-bold text-[#083335]">2. Product Authenticity & Hallmarking Representation</h3>
                <p>
                  Argi Jewels warrants that every silver product sold on this storefront is manufactured with genuine 925 sterling silver hallmarked in accordance with Bureau of Indian Standards (BIS) norms. Each purchase includes a stamped Certificate of Authenticity specifying gross weight, purity grade, and hallmarking details.
                </p>

                <h3 className="text-base font-bold text-[#083335]">3. Pricing & Order Confirmation</h3>
                <p>
                  While we strive for absolute accuracy in bullion weight calculations, in the event of a technological listing discrepancy or price error, Argi Jewels reserves the right to cancel or adjust the order before dispatch with immediate full refund to the customer.
                </p>

                <h3 className="text-base font-bold text-[#083335]">4. Dispute Resolution & Jurisdiction</h3>
                <p>
                  Any dispute, claim, or controversy arising out of or relating to your use of this storefront or purchase of jewellery shall be subject to the exclusive jurisdiction of the competent courts located in <strong>Indore, Madhya Pradesh, India</strong>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: PRIVACY POLICY & DLT SMS */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="border-b border-[#E5E0DC] pb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8823E]">Data Protection</span>
                <h2 className="font-serif text-2xl text-[#083335] font-semibold mt-1">
                  Privacy Policy & TRAI / DLT SMS Communications
                </h2>
                <p className="text-xs text-stone-500 mt-1">Last revised: September 2026</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#083335]">1. Personal Information We Collect</h3>
                <p>
                  We collect customer names, shipping addresses, phone numbers, and email addresses strictly for fulfilling orders, processing insured Blue Dart courier deliveries, and sending essential transactional OTP verifications via our registered YourBulkSMS gateway.
                </p>

                <h3 className="text-base font-bold text-[#083335]">2. Payment Card & UPI Security</h3>
                <p>
                  Argi Jewels does not store, process, or view credit/debit card numbers or UPI PINs on our servers. All transactions are securely processed through RBI-approved, PCI-DSS Level 1 compliant payment gateways via 256-bit SSL encryption.
                </p>

                <h3 className="text-base font-bold text-[#083335]">3. TRAI / DLT SMS Policy</h3>
                <p>
                  In compliance with the Telecom Regulatory Authority of India (TRAI) Distributed Ledger Technology (DLT) regulations, mobile OTPs and order status SMS messages are dispatched strictly via registered headers and pre-approved DLT templates. We do not spam or share your mobile number with third-party telemarketers.
                </p>
              </div>
            </div>
          )}

          {/* Concierge Support Footer Bar */}
          <div className="mt-10 pt-6 border-t border-[#E5E0DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-stone-500">
              Need personal assistance or have a policy question?
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919232594228?text=Hello%20Argi%20Jewels,%20I%20have%20a%20question%20regarding%20your%20policies."
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>WhatsApp: +91 92325 94228</span>
              </a>
              <Link
                to="/contact"
                className="px-3.5 py-2 bg-[#083335] hover:bg-[#052224] text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#DFC168]" />
                <span>Contact Atelier</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
