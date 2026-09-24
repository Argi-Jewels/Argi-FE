import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { ValuePropGrid } from '../components/home/ValuePropGrid';
import { CustomWorkflowSection } from '../components/home/CustomWorkflowSection';
import { FeaturedCollectionsSection } from '../components/home/FeaturedCollectionsSection';
import { ShieldCheck, Star, Quote } from 'lucide-react';

export const HomePage: React.FC = () => {
  const reviews = [
    {
      name: 'Aditi Deshmukh',
      city: 'Mumbai',
      quote: 'Ordered the Royal Solitaire in Rhodium silver. The brilliance and heavy feel rival platinum. The BIS hallmark and digital certificate gave me complete peace of mind.',
      rating: 5,
      piece: 'Indore Royal Solitaire Ring'
    },
    {
      name: 'Raghav & Tanya',
      city: 'Indore',
      quote: 'We used Argi Jewels’ "Design Your Piece" studio for our engagement bands. Being from Indore, we already trusted Sarafa craftsmanship, but the 3D CAD preview on WhatsApp was world-class.',
      rating: 5,
      piece: 'Bespoke Custom Band'
    },
    {
      name: 'Pooja Kashyap',
      city: 'Bengaluru',
      quote: 'Shipped to Bengaluru within 48 hours via Blue Dart Air! The anti-tarnish rhodium coating is genuine—I have been wearing the huggie hoops daily in the shower without any discoloration.',
      rating: 5,
      piece: 'Sarafa Pavé Huggie Hoops'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F7]">
      <HeroSection />
      <FeaturedCollectionsSection />
      <AboutSection />
      <ValuePropGrid />
      <CustomWorkflowSection />

      {/* Customer Reviews Section */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#E5E0DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A8823E] font-semibold block mb-2">
              Customer Testimonials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-medium">
              Loved Across 100+ Pincodes
            </h2>
            <div className="flex items-center justify-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#DFC168] text-[#DFC168]" />
              ))}
              <span className="text-xs text-stone-600 ml-2 font-medium">
                4.9 / 5 Average Customer Rating
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border border-[#E5E0DC] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-6 h-6 text-[#C5A059]/40 mb-3" />
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-4">
                    "{r.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0ECE8] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-serif font-semibold text-[#1A1A1A]">{r.name}</div>
                    <div className="text-[10px] text-stone-400">{r.city}, India</div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-[#FAF7F2] text-[#A8823E] font-medium rounded border border-[#DFC168]/30">
                    {r.piece}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Hallmarking Seal Banner */}
          <div className="mt-12 p-6 bg-white rounded-2xl border border-[#DFC168]/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#DFC168] flex items-center justify-center text-[#A8823E] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-serif font-semibold text-[#1A1A1A]">
                  Official 925 Hallmark Guarantee
                </h4>
                <p className="text-xs text-stone-500">
                  Complies with Bureau of Indian Standards (BIS) silver hallmarking regulations.
                </p>
              </div>
            </div>
            <div className="text-xs font-mono font-medium text-stone-600 bg-stone-100 px-3 py-1.5 rounded">
              BIS Standard: IS 2112:2014
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
