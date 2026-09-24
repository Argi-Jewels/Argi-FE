import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-[#E5E0DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Side */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-3/4 rounded-xl overflow-hidden shadow-md bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
                    alt="Silversmith craftsmanship"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E5E0DC] text-center">
                  <span className="font-serif text-2xl font-bold text-[#083335] block">Sarafa Bazar</span>
                  <span className="text-[11px] uppercase tracking-wider text-stone-500">Central India's Silver Hub</span>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="p-4 bg-[#083335] text-white rounded-xl shadow-md text-left border border-[#0c4346]">
                  <Sparkles className="w-5 h-5 text-[#DFC168] mb-2" />
                  <div className="text-xs font-serif font-medium leading-tight text-white/95">
                    "Every curve in 925 silver is hand-filed to perfection."
                  </div>
                  <div className="text-[10px] text-[#DFC168] mt-2 font-mono uppercase tracking-wider">
                    — Master Karigar Jagdish
                  </div>
                </div>

                <div className="aspect-3/4 rounded-xl overflow-hidden shadow-md bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1611591475825-9610f4384a2c?auto=format&fit=crop&w=800&q=80"
                    alt="Fine jewelry polishing in silver"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Story Side */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#083335]/20 text-[#083335] text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-[#083335]" /> Handcrafted Elegance, Delivered PAN India
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#083335] font-medium leading-tight">
              A Legacy of Malwa Silversmithing, Reimagined for Modern Life.
            </h2>

            <p className="text-sm text-stone-600 leading-relaxed">
              Nestled in the historic jewelry corridors of Indore, **Argi Jewels** was founded on a simple, resolute principle: genuine luxury shouldn't be reserved for special occasions or exorbitant gold markups. 
            </p>

            <p className="text-sm text-stone-600 leading-relaxed">
              We work exclusively with <strong>certified 925 sterling silver</strong>—nature’s most luminous precious metal. Every creation is fortified with our proprietary 3-layer anti-tarnish rhodium barrier, ensuring your pieces stay sparkling through daily commutes, monsoon rains, and celebratory nights out.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-[#083335] mt-0.5 shrink-0" />
                <span className="text-xs text-[#083335] font-medium">100% Solid 925 Hallmark Purity</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-[#083335] mt-0.5 shrink-0" />
                <span className="text-xs text-[#083335] font-medium">Nickel-Free & Hypoallergenic</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-[#083335] mt-0.5 shrink-0" />
                <span className="text-xs text-[#083335] font-medium">3D CAD Model Before Casting</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 text-[#083335] mt-0.5 shrink-0" />
                <span className="text-xs text-[#083335] font-medium">Direct WhatsApp Consultation</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/custom-design"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#083335] hover:text-[#052224] pb-1 border-b-2 border-[#083335] transition-all"
              >
                <span>Read more about our bespoke atelier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
