import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Sparkles, Hammer, PackageCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CustomWorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      stepNumber: '01',
      title: 'Share Your Idea',
      subtitle: 'Sketches, Photos, or Pure Inspiration',
      description: 'Upload a pencil sketch, an inspirational photo from Pinterest or Instagram, or simply describe the design you have been imagining. Select your preferred jewelry category and budget bracket.',
      icon: Upload,
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
      highlights: ['Drag-and-drop reference photos', 'Any style: rings, pendants, bracelets', 'Personalized engraving options']
    },
    {
      stepNumber: '02',
      title: 'Finalize Details',
      subtitle: '3D CAD Preview & Finish Selection',
      description: 'Our digital atelier in Indore renders a photorealistic 3D CAD visualization. Choose your metal finish (Pure Rhodium Silver, 18k Yellow Gold, or Rose Gold) and verify your exact ring or wrist size.',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
      highlights: ['Free 3D digital CAD render', '1-on-1 consultation via WhatsApp', 'Complimentary ring sizing assistance']
    },
    {
      stepNumber: '03',
      title: 'Handcrafted Creation',
      subtitle: 'Master Silversmiths in Sarafa Bazar',
      description: 'Once you approve the design, our generational artisans cast the piece in solid 925 sterling silver, set hand-faceted stones with micro-prongs, and apply our signature 3-layer anti-tarnish rhodium seal.',
      icon: Hammer,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      highlights: ['Solid BIS Hallmarked 925 silver', 'Indore Sarafa hand-finished craftsmanship', 'Strict 5-point quality inspection']
    },
    {
      stepNumber: '04',
      title: 'Delivered with Joy',
      subtitle: 'Insured Unboxing Experience',
      description: 'Your custom creation arrives in a luxury velvet jewellery chest accompanied by a physical certificate of authenticity, a microfiber polishing cloth, and tamper-evident courier seal.',
      icon: PackageCheck,
      image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80',
      highlights: ['Dispatched via Blue Dart / Delhivery Express', 'Real-time tracking link to your WhatsApp', '15-Day hassle-free adjustment policy']
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-[#E5E0DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A8823E] font-semibold block mb-2">
            The Bespoke Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#083335] font-medium">
            From Your Mind to Pure 925 Silver in 4 Steps
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            No intermediaries, no astronomical gold markups. Just pure silver craftsmanship tailored to your soul.
          </p>
        </div>

        {/* 4-Step Interactive Timeline Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {steps.map((s, index) => {
            const Icon = s.icon;
            const isCurrent = activeStep === index;
            return (
              <button
                key={s.stepNumber}
                onClick={() => setActiveStep(index)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  isCurrent
                    ? 'bg-[#083335] text-white border-[#083335] shadow-lg'
                    : 'bg-[#FBF9F7] text-stone-600 border-[#E5E0DC] hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isCurrent ? 'text-[#DFC168]' : 'text-stone-400'}`}>
                    {s.stepNumber}
                  </span>
                  <Icon className={`w-4 h-4 ${isCurrent ? 'text-[#DFC168]' : 'text-stone-400'}`} />
                </div>
                <div className={`text-xs sm:text-sm font-semibold leading-snug ${isCurrent ? 'text-white' : 'text-[#083335]'}`}>
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className="bg-[#FAF7F2] rounded-2xl border border-[#E5E0DC] p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#083335]/20 text-xs font-semibold text-[#083335] uppercase tracking-wider">
                Step {steps[activeStep].stepNumber} of 04
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#083335] font-medium">
                {steps[activeStep].title}: <span className="italic text-[#A8823E]">{steps[activeStep].subtitle}</span>
              </h3>

              <p className="text-sm text-stone-600 leading-relaxed max-w-xl">
                {steps[activeStep].description}
              </p>

              <div className="space-y-2 pt-2">
                {steps[activeStep].highlights.map((h, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-stone-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#083335] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/custom-design"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#083335] text-white hover:bg-[#052224] text-xs uppercase tracking-widest font-semibold rounded-lg shadow transition-colors"
                >
                  <span>Launch Custom Order Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-xl overflow-hidden shadow-md border-2 border-white bg-stone-100">
                <img
                  src={steps[activeStep].image}
                  alt={steps[activeStep].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
