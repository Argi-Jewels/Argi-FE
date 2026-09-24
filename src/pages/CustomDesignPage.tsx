import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  Ruler, 
  ArrowRight, 
  ArrowLeft,
  MessageCircle,
  Check
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MetalFinish } from '../types';
import { RingSizeGuideModal } from '../components/pdp/RingSizeGuideModal';

export const CustomDesignPage: React.FC = () => {
  const navigate = useNavigate();
  const { submitCustomRequest, currentUser, showToast } = useStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  // Form State
  const [category, setCategory] = useState('Custom Engagement Ring');
  const [description, setDescription] = useState('');
  const [referenceImageUrl, setReferenceImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [selectedFinish, setSelectedFinish] = useState<MetalFinish>('Rhodium Silver');
  const [stonePreference, setStonePreference] = useState('Moissanite (Lab-Grown Brilliance)');
  const [size, setSize] = useState('Size 9 (Indian)');
  const [engraving, setEngraving] = useState('');

  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [city, setCity] = useState(currentUser?.city || 'Indore');
  const [budgetRange, setBudgetRange] = useState('₹6,000 - ₹12,000');
  const [consultationMethod] = useState<'WhatsApp' | 'Phone Call'>('WhatsApp');

  const categories = [
    'Custom Engagement Ring',
    'Personalized Name Necklace',
    'Heirloom Pendant / Talisman',
    'Artisan Cuff Bracelet',
    'Solitaire Eternity Band',
    'Family Crest Signet Ring',
    'Modern Silver Mangalsutra'
  ];

  const finishes: MetalFinish[] = [
    'Rhodium Silver',
    '18k Yellow Gold Plated',
    'Rose Gold Plated'
  ];

  const stones = [
    'Moissanite (Lab-Grown Brilliance)',
    'AAA+ Flawless Cubic Zirconia',
    'Natural Cultured Pearls',
    'Lab Emerald / Sapphire Accent',
    'Solid Silver Metalwork (No Stones)'
  ];

  const budgetOptions = [
    '₹3,000 - ₹6,000 (Minimalist Silver)',
    '₹6,000 - ₹12,000 (Detailed Solitaire/Pendant)',
    '₹12,000 - ₹25,000 (Heavy Statement / Multi-Stone)',
    '₹25,000+ (High Heirloom Bespoke)'
  ];

  // Handle local file upload preview
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setReferenceImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) {
      showToast('Please provide your name and phone number.', 'info');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newRequest = submitCustomRequest({
        customerName,
        phone,
        email: email || 'not-provided@argijewels.in',
        city: city || 'India',
        category,
        description: description || 'Custom bespoke design request submitted via studio wizard.',
        referenceImageUrl: referenceImageUrl || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
        selectedFinish,
        stonePreference,
        size,
        engraving: engraving || undefined,
        budgetRange,
        notes: `Consultation preference: ${consultationMethod}. Customer based in ${city}.`
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmittedId(newRequest.id);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#083335', '#D4AF37', '#FFFFFF']
        });
      } catch {}
    }, 600);
  };

  const whatsappDirectMessage = `Hello Argi Jewels Indore! I just submitted a custom jewelry request (#${submittedId || 'NEW'}).%0A%0A*Piece:* ${encodeURIComponent(category)}%0A*Finish:* ${encodeURIComponent(selectedFinish)}%0A*Size:* ${encodeURIComponent(size)}%0A*Budget:* ${encodeURIComponent(budgetRange)}%0A*Client:* ${encodeURIComponent(customerName)} (${encodeURIComponent(city)})%0A%0ACan you share the initial 3D CAD preview with me?`;

  return (
    <div className="min-h-screen bg-[#FBF9F7] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#083335]/20 text-[#083335] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#DFC168]" /> Argi Bespoke Studio • Indore
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#083335] font-medium leading-tight">
            Design Your Piece in Solid 925 Silver
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 font-light">
            Bring your dream ring, necklace, or heirloom talisman to life. Our master silversmiths craft a 3D digital model for your approval before hand-forging in Indore.
          </p>
        </div>

        {/* Wizard Step Progress Tracker */}
        {!isSubmitted && (
          <div className="mb-10">
            <div className="flex items-center justify-between relative max-w-xl mx-auto">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-stone-200 -z-0" />
              
              <div className={`flex flex-col items-center relative z-10 ${currentStep >= 1 ? 'text-[#083335]' : 'text-stone-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                  currentStep === 1 
                    ? 'bg-[#083335] text-[#DFC168] border-[#083335] scale-110 shadow-md' 
                    : currentStep > 1 
                    ? 'bg-[#25D366] text-white border-[#25D366]' 
                    : 'bg-white border-stone-300'
                }`}>
                  {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
                </div>
                <span className="text-[11px] font-bold mt-1 uppercase tracking-wider">Concept</span>
              </div>

              <div className={`flex flex-col items-center relative z-10 ${currentStep >= 2 ? 'text-[#083335]' : 'text-stone-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                  currentStep === 2 
                    ? 'bg-[#083335] text-[#DFC168] border-[#083335] scale-110 shadow-md' 
                    : currentStep > 2 
                    ? 'bg-[#25D366] text-white border-[#25D366]' 
                    : 'bg-white border-stone-300'
                }`}>
                  {currentStep > 2 ? <Check className="w-4 h-4" /> : '2'}
                </div>
                <span className="text-[11px] font-bold mt-1 uppercase tracking-wider">Specs & Size</span>
              </div>

              <div className={`flex flex-col items-center relative z-10 ${currentStep >= 3 ? 'text-[#083335]' : 'text-stone-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                  currentStep === 3 
                    ? 'bg-[#083335] text-[#DFC168] border-[#083335] scale-110 shadow-md' 
                    : 'bg-white border-stone-300'
                }`}>
                  3
                </div>
                <span className="text-[11px] font-bold mt-1 uppercase tracking-wider">Consultation</span>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Form Container */}
        <div className="bg-white rounded-2xl border border-[#E5E0DC] shadow-lg overflow-hidden p-6 sm:p-10">
          
          {isSubmitted ? (
            /* Submission Success Screen */
            <div className="text-center py-8 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#A8823E] block mb-1">
                  Bespoke Inquiry Received
                </span>
                <h2 className="font-serif text-3xl text-[#083335] font-medium">
                  We Have Received Your Custom Vision!
                </h2>
                <div className="inline-block mt-2 px-3 py-1 bg-[#FAF7F2] border border-[#083335]/20 rounded-full text-xs font-mono font-bold text-[#083335]">
                  Inquiry Reference: #{submittedId}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
                Our head silversmith in Sarafa Bazar, Indore has received your concept for a <strong>{category}</strong> in <strong>{selectedFinish}</strong>. We will prepare your initial 3D digital CAD render within 24 hours.
              </p>

              {/* Direct WhatsApp Call to Action */}
              <div className="p-6 bg-[#E8F8EE] rounded-xl border border-[#25D366]/40 max-w-md mx-auto space-y-3 text-left">
                <div className="flex items-center gap-2 text-[#0F682C] font-semibold text-xs uppercase tracking-wider">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" /> Fast-Track on WhatsApp:
                </div>
                <p className="text-xs text-[#0F682C]/90 leading-relaxed">
                  Want to immediately finalize design sketches or share additional Pinterest photos directly with the artisan?
                </p>
                <a
                  href={`https://wa.me/919232594228?text=${whatsappDirectMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp 1-on-1 Atelier Chat</span>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => navigate('/account?tab=custom')}
                  className="px-6 py-2.5 bg-[#083335] text-white text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-[#052224] transition-colors"
                >
                  Track in Customer Account
                </button>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="px-6 py-2.5 border border-[#E5E0DC] text-stone-700 text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-stone-50 transition-colors"
                >
                  Submit Another Design
                </button>
              </div>

            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              {/* STEP 1: CONCEPT & VISUALS */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#083335]">
                      Step 1: Choose Category & Share Your Idea
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Tell us what you want to create and upload any reference sketches or moodboard images.
                    </p>
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#083335] mb-2">
                      Jewellery Style
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat)}
                          className={`p-3 text-xs rounded-lg border text-left font-medium transition-all ${
                            category === cat
                              ? 'border-[#083335] bg-[#083335] text-white shadow-xs font-semibold'
                              : 'border-[#E5E0DC] bg-white text-stone-700 hover:border-stone-400'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reference Image Upload */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#083335] mb-2">
                      Reference Photo / Sketch Upload (Optional)
                    </label>
                    <div className="border-2 border-dashed border-[#E5E0DC] rounded-xl p-6 text-center hover:border-[#083335] transition-colors bg-[#FBF9F7] relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      {imagePreview ? (
                        <div className="space-y-2">
                          <img
                            src={imagePreview}
                            alt="Reference preview"
                            className="w-32 h-32 object-cover rounded-lg mx-auto border border-[#E5E0DC] shadow-sm"
                          />
                          <p className="text-xs text-emerald-700 font-semibold">Image loaded successfully! Click to change.</p>
                        </div>
                      ) : (
                        <div className="space-y-2 pointer-events-none">
                          <div className="w-12 h-12 rounded-full bg-white text-[#083335] mx-auto flex items-center justify-center border border-[#083335]/20">
                            <Upload className="w-5 h-5" />
                          </div>
                          <p className="text-xs font-semibold text-[#083335]">
                            Click or drag an image here
                          </p>
                          <p className="text-[11px] text-stone-400">
                            Pencil sketch, screenshot, or Pinterest photo (PNG, JPG)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Concept Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#083335] mb-1.5">
                      Describe Your Vision / Inspiration
                    </label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g., I want an emerald-cut ring with a delicate hidden halo and micro-pavé band. Solid 925 silver with rhodium finish. Needs to fit a 7.5 Indian ring size..."
                      className="w-full p-3 text-xs bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335] leading-relaxed"
                    />
                  </div>

                  <div className="flex justify-end pt-4 border-t border-[#E5E0DC]">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 bg-[#083335] hover:bg-[#052224] text-white text-xs uppercase tracking-widest font-bold rounded-lg flex items-center gap-2 shadow transition-colors"
                    >
                      <span>Next: Select Finish & Sizing</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

              {/* STEP 2: FINISH & SPECIFICATIONS */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#083335]">
                      Step 2: Precious Metal Finish & Sizing
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Every piece is cast in solid 925 sterling silver with your choice of protective plating.
                    </p>
                  </div>

                  {/* Silver Plating */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#083335] mb-2">
                      Plating Option: <span className="text-[#A8823E]">{selectedFinish}</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {finishes.map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setSelectedFinish(f)}
                          className={`p-3.5 rounded-lg border text-left transition-all ${
                            selectedFinish === f
                              ? 'border-[#083335] bg-[#083335] text-white shadow-xs'
                              : 'border-[#E5E0DC] bg-white text-stone-700 hover:border-stone-400'
                          }`}
                        >
                          <div className="text-xs font-bold">{f}</div>
                          <div className={`text-[10px] mt-0.5 ${selectedFinish === f ? 'text-[#DFC168]' : 'text-stone-400'}`}>
                            {f === 'Rhodium Silver' ? 'Moonlight White Platinum Look' : f === '18k Yellow Gold Plated' ? 'Rich Imperial Gold Vermeil' : 'Warm Modern Blush'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Stone Preference */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#083335] mb-2">
                      Stone Setting Preference
                    </label>
                    <div className="space-y-2">
                      {stones.map((st) => (
                        <label
                          key={st}
                          className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer text-xs transition-colors ${
                            stonePreference === st
                              ? 'border-[#083335] bg-[#FAF7F2] font-bold text-[#083335]'
                              : 'border-[#E5E0DC] text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="stonePref"
                            checked={stonePreference === st}
                            onChange={() => setStonePreference(st)}
                            className="text-[#083335] focus:ring-[#083335]"
                          />
                          <span>{st}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Size Guide and Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#083335]">
                          Estimated Size
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsSizeModalOpen(true)}
                          className="text-xs text-[#083335] hover:underline flex items-center gap-1 font-semibold"
                        >
                          <Ruler className="w-3.5 h-3.5" /> View Sizing Chart
                        </button>
                      </div>
                      <input
                        type="text"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        placeholder="e.g. Size 10 or 7 inch wrist or Neck 18 in"
                        className="w-full px-3.5 py-2 text-xs bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#083335] mb-1.5">
                        Inner Engraving Text (Optional)
                      </label>
                      <input
                        type="text"
                        maxLength={20}
                        value={engraving}
                        onChange={(e) => setEngraving(e.target.value)}
                        placeholder="e.g. Name, Date, Roman numerals"
                        className="w-full px-3.5 py-2 text-xs bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-[#E5E0DC]">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-2.5 border border-[#E5E0DC] text-stone-600 text-xs uppercase tracking-wider font-medium rounded-lg flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-3 bg-[#083335] hover:bg-[#052224] text-white text-xs uppercase tracking-widest font-bold rounded-lg flex items-center gap-2 shadow"
                    >
                      <span>Next: Contact & Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

              {/* STEP 3: CONTACT & CONSULTATION */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#083335]">
                      Step 3: Consultation & Artisan Contact
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      We will connect directly on WhatsApp to present your 3D digital CAD render and exact silver weight estimate.
                    </p>
                  </div>

                  {/* Target Budget */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#083335] mb-2">
                      Target Budget Bracket (INR)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudgetRange(b)}
                          className={`p-3 text-xs rounded-lg border text-left font-medium transition-all ${
                            budgetRange === b
                              ? 'border-[#083335] bg-[#FAF7F2] text-[#083335] font-bold ring-1 ring-[#083335]'
                              : 'border-[#E5E0DC] text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#083335] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Vikramaditya Solanki"
                        className="w-full px-3.5 py-2 text-xs bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#083335] mb-1.5">
                        WhatsApp Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98260 12345"
                        className="w-full px-3.5 py-2 text-xs bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#083335] mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. vikram@gmail.com"
                        className="w-full px-3.5 py-2 text-xs bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#083335] mb-1.5">
                        City & State
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Indore, Madhya Pradesh"
                        className="w-full px-3.5 py-2 text-xs bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
                      />
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#083335]/20 text-xs space-y-1.5">
                    <div className="font-bold text-[#083335] uppercase tracking-wider mb-2">
                      Design Summary:
                    </div>
                    <div className="text-stone-700">
                      <strong>Category:</strong> {category}
                    </div>
                    <div className="text-stone-700">
                      <strong>Finish:</strong> {selectedFinish} (Solid 925 Silver)
                    </div>
                    <div className="text-stone-700">
                      <strong>Stone:</strong> {stonePreference}
                    </div>
                    <div className="text-stone-700">
                      <strong>Estimated Size:</strong> {size}
                    </div>
                    <div className="text-stone-700">
                      <strong>Budget:</strong> {budgetRange}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-[#E5E0DC]">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-2.5 border border-[#E5E0DC] text-stone-600 text-xs uppercase tracking-wider font-medium rounded-lg flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 bg-[#083335] hover:bg-[#052224] text-white text-xs uppercase tracking-widest font-bold rounded-lg flex items-center gap-2 shadow-md transition-all border border-[#0c4346]"
                    >
                      <Sparkles className="w-4 h-4 text-[#DFC168]" />
                      <span>{isSubmitting ? 'Submitting to Atelier...' : 'Submit Bespoke Inquiry'}</span>
                    </button>
                  </div>

                </div>
              )}

            </form>
          )}

        </div>

      </div>

      {/* Sizing Modal */}
      <RingSizeGuideModal
        isOpen={isSizeModalOpen}
        onClose={() => setIsSizeModalOpen(false)}
      />
    </div>
  );
};
