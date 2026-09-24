import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Gem, Truck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#FBF9F7] overflow-hidden border-b border-[#E5E0DC]">
      {/* Background Subtle Ambient Glow with #083335 */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#083335]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Heritage Location Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#083335]/20 text-xs shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#083335] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#083335]"></span>
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#083335]">
                Born in Sarafa Bazar, Indore
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-[11px] text-[#A8823E] font-medium">
                Pure 925 Sterling Silver
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#083335] font-medium tracking-tight leading-[1.12]">
              Pure 925 Sterling Silver, <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#A8823E]">Crafted Just for You.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-stone-600 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              From the heart of Indore to your doorstep, anywhere in India. Custom jewellery designed to hold your special memories—handcrafted in solid sterling silver with triple-layer anti-tarnish rhodium brilliance.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/custom-design"
                className="w-full sm:w-auto px-8 py-4 bg-[#083335] hover:bg-[#052224] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group border border-[#0c4346]"
              >
                <Sparkles className="w-4 h-4 text-[#DFC168] group-hover:rotate-12 transition-transform" />
                <span>Design Your Piece</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/collections"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-stone-50 text-[#083335] border border-[#083335]/30 text-xs uppercase tracking-[0.2em] font-semibold rounded-lg transition-colors text-center shadow-xs"
              >
                Explore Ready Collections
              </Link>
            </div>

            {/* Trust Micro Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#EAE5DB] max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="font-serif text-2xl font-semibold text-[#083335]">100%</div>
                <div className="text-[11px] text-stone-500 uppercase tracking-wider mt-0.5">BIS Hallmarked</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-semibold text-[#083335]">100+</div>
                <div className="text-[11px] text-stone-500 uppercase tracking-wider mt-0.5">Pincodes Served</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-semibold text-[#083335]">4.9 ★</div>
                <div className="text-[11px] text-stone-500 uppercase tracking-wider mt-0.5">Artisan Rating</div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Luxury Imagery */}
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85"
                  alt="Pure 925 Sterling Silver Solitaire Ring Argi Jewels"
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 inset-x-4 p-4 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-[#E5E0DC] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#DFC168]/40 flex items-center justify-center text-[#083335]">
                      <Gem className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-serif font-semibold text-[#083335]">
                        Indore Royal Solitaire
                      </h4>
                      <p className="text-[11px] text-[#A8823E] font-medium">Pure 925 Silver • ₹3,499</p>
                    </div>
                  </div>
                  <Link 
                    to="/product/indore-royal-solitaire-ring"
                    className="p-2 bg-[#083335] text-white rounded-lg hover:bg-[#052224] transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Floating Hallmark Tag */}
              <div className="absolute -top-4 -right-4 bg-white px-3.5 py-2.5 rounded-xl shadow-xl border border-[#E5E0DC] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#083335]" />
                <div className="text-left">
                  <div className="text-[11px] font-bold text-[#083335]">Certified 925 Purity</div>
                  <div className="text-[9px] text-stone-500">Includes Authenticity Card</div>
                </div>
              </div>

              {/* Floating Delivery Tag */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white px-3.5 py-2.5 rounded-xl shadow-xl border border-[#E5E0DC] items-center gap-2">
                <Truck className="w-5 h-5 text-[#C5A059]" />
                <div className="text-left">
                  <div className="text-[11px] font-bold text-[#083335]">PAN India Express</div>
                  <div className="text-[9px] text-stone-500">Air Insured Dispatch</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
