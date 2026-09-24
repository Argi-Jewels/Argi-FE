import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  PhoneCall, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      showToast('Please fill in all required fields.', 'info');
      return;
    }

    setIsSubmitted(true);
    showToast('Your message has been received by our Indore atelier!', 'gold');
  };

  const whatsappInquiryText = encodeURIComponent(
    `Hello Argi Jewels! My name is ${name || 'Customer'}. Regarding: ${subject} - ${message}`
  );

  return (
    <div className="min-h-screen bg-[#FBF9F7] py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-stone-500 mb-6 flex items-center space-x-2">
          <Link to="/" className="hover:text-[#083335]">Home</Link>
          <span>/</span>
          <span className="text-[#083335] font-semibold">Contact & Atelier</span>
        </nav>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#083335]/10 text-[#083335] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#DFC168]" /> Central India Silversmithing
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#083335] font-medium">
            Contact Argi Jewels Atelier
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
            Whether you have questions about our 925 sterling silver purity, need ring sizing advice, or wish to commission a bespoke design, our master artisans in Indore are here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards & Location Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Priority Card */}
            <div className="p-6 bg-[#E8F8EE] rounded-3xl border border-[#25D366]/40 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-[#0F682C] font-bold text-xs uppercase tracking-wider">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>Fastest Response: WhatsApp</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#083335]">
                1-on-1 WhatsApp Concierge
              </h3>
              <p className="text-xs text-[#0F682C]/90 leading-relaxed">
                Connect directly with our head jeweler in Sarafa Bazar to share inspiration photos, inspect hallmarked pieces live on video, or track your custom order.
              </p>
              <a
                href="https://wa.me/919232594228?text=Hello%20Argi%20Jewels,%20I%20am%20reaching%20out%20for%20assistance%20with%20silver%20jewellery."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 92325 94228)</span>
              </a>
            </div>

            {/* Atelier Addresses */}
            <div className="p-6 bg-white rounded-3xl border border-[#E5E0DC] shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#083335] flex items-center justify-center border border-[#E5E0DC] shrink-0">
                  <MapPin className="w-5 h-5 text-[#DFC168]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#083335] uppercase tracking-wider">
                    Sarafa Heritage Workshop
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Main Sarafa Bazar, Bada Sarafa, Indore, Madhya Pradesh 452002
                  </p>
                  <p className="text-[11px] text-stone-400 mt-0.5">Generational Casting & Hallmarking</p>
                </div>
              </div>

              <div className="border-t border-[#F0ECE8] pt-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#083335] flex items-center justify-center border border-[#E5E0DC] shrink-0">
                  <MapPin className="w-5 h-5 text-[#DFC168]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#083335] uppercase tracking-wider">
                    Vijay Nagar Design Studio & Dispatch
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Scheme No. 54, Vijay Nagar, Indore, Madhya Pradesh 452010
                  </p>
                  <p className="text-[11px] text-stone-400 mt-0.5">3D CAD Modeling & Insured Courier Hub</p>
                </div>
              </div>

              <div className="border-t border-[#F0ECE8] pt-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#083335] flex items-center justify-center border border-[#E5E0DC] shrink-0">
                  <Clock className="w-5 h-5 text-[#083335]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#083335] uppercase tracking-wider">
                    Concierge Hours
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Monday to Saturday: 10:00 AM – 8:00 PM IST
                  </p>
                  <p className="text-[11px] text-stone-400">Sunday: Closed for artisan rest</p>
                </div>
              </div>

              <div className="border-t border-[#F0ECE8] pt-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#083335] flex items-center justify-center border border-[#E5E0DC] shrink-0">
                  <Mail className="w-5 h-5 text-[#083335]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#083335] uppercase tracking-wider">
                    Email Desk
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">care@argijewels.in</p>
                  <p className="text-[11px] text-stone-400">Responses within 4-6 business hours</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E0DC] shadow-sm">
              
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#083335]">
                    Message Dispatched to Indore Atelier!
                  </h3>
                  <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{name}</strong>. Our concierge silversmith will review your inquiry and get back to you via WhatsApp / Phone at <strong>+91 {phone}</strong> shortly.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/919232594228?text=${whatsappInquiryText}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Forward to WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 border border-[#E5E0DC] text-stone-600 text-xs font-medium rounded-lg hover:bg-stone-50"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A8823E]">Get in Touch</span>
                    <h2 className="font-serif text-2xl font-bold text-[#083335] mt-0.5">
                      Send a Message to Our Silversmiths
                    </h2>
                    <p className="text-xs text-stone-500 mt-1">
                      Have a query about sizing, anti-tarnish rhodium coating, or bulk gifting? We are here for you.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Radhika Mandloi"
                        className="w-full px-3.5 py-2.5 bg-[#FBF9F7] border border-[#E5E0DC] rounded-xl text-xs focus:border-[#083335] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Mobile Number (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98260 12345"
                        className="w-full px-3.5 py-2.5 bg-[#FBF9F7] border border-[#E5E0DC] rounded-xl text-xs focus:border-[#083335] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="radhika@gmail.com"
                        className="w-full px-3.5 py-2.5 bg-[#FBF9F7] border border-[#E5E0DC] rounded-xl text-xs focus:border-[#083335] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Inquiry Topic
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FBF9F7] border border-[#E5E0DC] rounded-xl text-xs focus:border-[#083335] focus:outline-none"
                      >
                        <option value="Product Inquiry">Product & Stock Inquiry</option>
                        <option value="Bespoke Design">Bespoke / Custom Jewelry</option>
                        <option value="Ring Sizing Assistance">Ring Sizing Assistance</option>
                        <option value="Order Tracking">Order & Blue Dart Tracking</option>
                        <option value="Bulk / Corporate Gifting">Corporate / Bulk Silver Gifting</option>
                        <option value="Returns & Exchanges">15-Day Return / Exchange</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Your Message or Custom Inquiry Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what piece you are looking for, desired dimensions, or specific questions..."
                      className="w-full px-3.5 py-2.5 bg-[#FBF9F7] border border-[#E5E0DC] rounded-xl text-xs focus:border-[#083335] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#083335] hover:bg-[#052224] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-md border border-[#0c4346]"
                  >
                    <Send className="w-4 h-4 text-[#DFC168]" />
                    <span>Send Inquiry to Atelier</span>
                  </button>

                  <div className="pt-2 text-center text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#083335]" />
                    <span>Certified 925 Sterling Silver • Sarafa Bazar, Indore</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
