import React, { useState } from 'react';
import { Award, Compass, Truck, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ValuePropGrid: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);

  const valueProps = [
    {
      icon: Award,
      title: 'Authentic 925 Silver',
      subtitle: 'BIS Hallmarked Purity',
      description: 'Never plated brass or nickel alloys. Pure 92.5% sterling silver certified with an official BIS hallmark stamp and physical authenticity certificate card included in every box.',
      badge: 'Certified Genuine',
      linkText: 'Learn about purity',
      linkUrl: '/collections'
    },
    {
      icon: Compass,
      title: 'Bespoke Craftsmanship',
      subtitle: '3D CAD & Master Silversmiths',
      description: 'Your ideas brought to reality. Our Indore karigars create a photorealistic 3D CAD render for your WhatsApp approval before casting, stone-setting, and hand-polishing.',
      badge: 'Made-To-Order',
      linkText: 'Start custom order',
      linkUrl: '/custom-design'
    },
    {
      icon: Truck,
      title: 'PAN India Express Shipping',
      subtitle: 'Insured Air Delivery to 100+ Pincodes',
      description: 'From Vijay Nagar Indore to any corner of India. Shipped with premier partners Blue Dart and Delhivery in sealed, tamper-evident velvet unboxing packages.',
      badge: 'Free on ₹1,999+',
      linkText: 'Check delivery times',
      linkUrl: '/checkout'
    },
    {
      icon: MessageCircle,
      title: '1-on-1 WhatsApp Consultation',
      subtitle: 'Direct Artisan Concierge',
      description: 'Have a sizing question or need ring guidance? Chat directly with our Indore design team on WhatsApp. Share photos, ask for sizing advice, and inspect stone quality live.',
      badge: 'Instant Support',
      linkText: 'Chat on WhatsApp',
      linkUrl: 'https://wa.me/919232594228?text=Hi%20Argi%20Jewels,%20I%20would%20like%20a%20jewelry%20consultation.'
    }
  ];

  return (
    <section className="py-20 bg-[#FBF9F7] border-b border-[#E5E0DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A8823E] font-semibold block mb-2">
            The Argi Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#083335] font-medium">
            Why Discerning Customers Choose Argi Jewels
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 font-light">
            Rooted in heritage, engineered for everyday modern wear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((prop, idx) => {
            const Icon = prop.icon;
            const isSelected = activeCard === idx;
            return (
              <div
                key={prop.title}
                onMouseEnter={() => setActiveCard(idx)}
                className={`relative bg-white rounded-xl p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#083335] shadow-xl -translate-y-1 ring-1 ring-[#083335]'
                    : 'border-[#E5E0DC] shadow-xs hover:border-stone-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#083335] text-[#DFC168]' : 'bg-[#FAF7F2] text-[#083335]'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                      {prop.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-[#083335] mb-1">
                    {prop.title}
                  </h3>
                  <div className="text-[11px] font-medium text-[#A8823E] uppercase tracking-wider mb-3">
                    {prop.subtitle}
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {prop.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-[#F0ECE8]">
                  {prop.linkUrl.startsWith('http') ? (
                    <a
                      href={prop.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#083335] hover:text-[#052224] gap-1 transition-colors"
                    >
                      <span>{prop.linkText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      to={prop.linkUrl}
                      className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#083335] hover:text-[#052224] gap-1 transition-colors"
                    >
                      <span>{prop.linkText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
