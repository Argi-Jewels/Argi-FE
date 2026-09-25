import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  RotateCcw, 
  Sparkles, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Award
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#083335] text-[#FBF9F7] pt-16 pb-20 lg:pb-12 border-t border-[#0c4346]">
      
      {/* Top Value Banner / Trust Micro-Copy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#0c4346]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <Link to="/hallmarking" className="flex items-start space-x-4 group hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-[#052224] flex items-center justify-center text-[#DFC168] border border-[#0c4346] shrink-0 group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-semibold tracking-wide text-white group-hover:text-[#DFC168] transition-colors">100% Certified 925 Silver</h4>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                Every jewel is BIS hallmarked with authenticity cards verifying purity & ethical sourcing.
              </p>
            </div>
          </Link>

          <Link to="/policies/shipping" className="flex items-start space-x-4 group hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-[#052224] flex items-center justify-center text-[#DFC168] border border-[#0c4346] shrink-0 group-hover:scale-105 transition-transform">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-semibold tracking-wide text-white group-hover:text-[#DFC168] transition-colors">PAN India Insured Transit</h4>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                Dispatched with Blue Dart & Delhivery in tamper-proof luxury packaging right to your door.
              </p>
            </div>
          </Link>

          <Link to="/custom-design" className="flex items-start space-x-4 group hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-[#052224] flex items-center justify-center text-[#DFC168] border border-[#0c4346] shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-semibold tracking-wide text-white group-hover:text-[#DFC168] transition-colors">Sarafa Master Artisans</h4>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                Crafted in the legendary jewellery quarter of Indore with triple rhodium anti-tarnish coating.
              </p>
            </div>
          </Link>

          <Link to="/policies/returns" className="flex items-start space-x-4 group hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-[#052224] flex items-center justify-center text-[#DFC168] border border-[#0c4346] shrink-0 group-hover:scale-105 transition-transform">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-semibold tracking-wide text-white group-hover:text-[#DFC168] transition-colors">15-Day Easy Exchange</h4>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                Hassle-free size adjustments, ring resizing, and lifetime cleaning support.
              </p>
            </div>
          </Link>

        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Indore Heritage */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block group">
              <BrandLogo variant="light" size="lg" />
            </Link>
            
            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              Argi Jewels bridges centuries of master silversmithing heritage from Indore’s historical Sarafa Bazar with modern minimal aesthetics. Every piece is crafted in pure 925 sterling silver, dipped in protective rhodium or 18k gold vermeil to preserve your most cherished moments.
            </p>

            <div className="pt-2 space-y-2 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#DFC168]" />
                <span>Address: Sarafa Bazar & Scheme 54, Vijay Nagar, Indore, MP 452010</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Concierge: <a href="https://wa.me/919232594228?text=Hello%20Argi%20Jewels,%20I%20would%20like%20to%20consult%20about%20custom%20jewellery." target="_blank" rel="noreferrer" className="text-white hover:underline font-medium">+91 92325 94228</a> (10 AM – 8 PM IST)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#DFC168]" />
                <span>Concierge: care@argijewels.in</span>
              </div>
            </div>
          </div>

          {/* Ready Collections */}
          <div>
            <h5 className="text-xs font-semibold tracking-widest uppercase text-[#DFC168] mb-4">
              Collections
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li><Link to="/collections?category=Rings" className="hover:text-white transition-colors">Solitaire & Eternity Rings</Link></li>
              <li><Link to="/collections?category=Necklaces" className="hover:text-white transition-colors">Pendants & Choker Chains</Link></li>
              <li><Link to="/collections?category=Bracelets" className="hover:text-white transition-colors">Celestial Tennis Bracelets</Link></li>
              <li><Link to="/collections?category=Earrings" className="hover:text-white transition-colors">Micro-Pavé Huggie Hoops</Link></li>
              <li><Link to="/collections?category=Personalized" className="hover:text-white transition-colors">Custom Name Necklaces</Link></li>
              <li><Link to="/collections?category=Engagement" className="hover:text-white transition-colors">925 Silver Engagement Rings</Link></li>
            </ul>
          </div>

          {/* Bespoke & Client Services */}
          <div>
            <h5 className="text-xs font-semibold tracking-widest uppercase text-[#DFC168] mb-4">
              Client Services
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li><Link to="/custom-design" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium text-[#DFC168]"><Sparkles className="w-3 h-3" /> Design Your Piece</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">Track Order & Tracking ID</Link></li>
              <li><Link to="/policies/shipping" className="hover:text-white transition-colors">PAN India Shipping Policy</Link></li>
              <li><Link to="/policies/returns" className="hover:text-white transition-colors">15-Day Return & Exchange</Link></li>
              <li><Link to="/hallmarking" className="hover:text-white transition-colors">BIS 925 Hallmarking Guide</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Indore Address</Link></li>
            </ul>
          </div>

          {/* PAN India Dispatch & Payment Badges */}
          <div>
            <h5 className="text-xs font-semibold tracking-widest uppercase text-[#DFC168] mb-4">
              PAN India Delivery
            </h5>
            <p className="text-xs text-stone-300 leading-relaxed mb-3">
              Insured courier partners reaching 100+ pincodes across India:
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] text-stone-200 font-medium">
              <span className="px-2 py-1 bg-[#052224] border border-[#0c4346] rounded">Blue Dart Express</span>
              <span className="px-2 py-1 bg-[#052224] border border-[#0c4346] rounded">Delhivery Air</span>
              <span className="px-2 py-1 bg-[#052224] border border-[#0c4346] rounded">DTDC Priority</span>
              <span className="px-2 py-1 bg-[#052224] border border-[#0c4346] rounded">Speed Post</span>
            </div>

            <div className="mt-6 pt-4 border-t border-[#0c4346]">
              <div className="text-[11px] text-stone-300 font-medium mb-2">Accepted Secure Payments:</div>
              <div className="flex flex-wrap gap-1.5 text-[10px] text-[#DFC168]">
                <span className="px-2 py-0.5 bg-[#052224] border border-[#0c4346] rounded">UPI (GPay / PhonePe)</span>
                <span className="px-2 py-0.5 bg-[#052224] border border-[#0c4346] rounded">RuPay / Visa / MC</span>
                <span className="px-2 py-0.5 bg-[#052224] border border-[#0c4346] rounded">NetBanking</span>
                <span className="px-2 py-0.5 bg-[#052224] border border-[#0c4346] rounded">Cash on Delivery</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#0c4346] flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400">
        <p>© {new Date().getFullYear()} Argi Jewels Pvt. Ltd. All Rights Reserved. Pure 925 Sterling Silver from Indore, India.</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 sm:mt-0 text-[11px]">
          <Link to="/policies/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link to="/policies/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <span>•</span>
          <Link to="/policies/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link>
          <span>•</span>
          <Link to="/hallmarking" className="hover:text-[#DFC168] transition-colors">BIS 925 License #IS-2112:2014</Link>
        </div>
      </div>
    </footer>
  );
};
