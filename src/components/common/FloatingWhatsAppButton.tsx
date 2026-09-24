import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const phoneNumber = '919232594228';
  const defaultMessage = encodeURIComponent(
    'Hello Argi Jewels, I would like to consult about your 925 sterling silver jewelry and custom designs.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside aria-label="WhatsApp Concierge" className="fixed bottom-20 lg:bottom-7 right-4 sm:right-6 z-40 flex items-center group">
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 mr-3 px-3.5 py-2 bg-[#083335] text-white text-xs rounded-xl shadow-xl border border-[#0c4346] animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
          <div className="text-left">
            <p className="font-semibold text-[11px] text-[#DFC168]">Sarafa Bazar Atelier</p>
            <p className="text-[11px] text-stone-200">Chat with us on WhatsApp</p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="ml-1 text-stone-400 hover:text-white transition-colors"
            title="Dismiss tip"
            aria-label="Dismiss WhatsApp tip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-white focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        title="Chat on WhatsApp (+91 92325 94228)"
        aria-label="Chat on WhatsApp with Argi Jewels at +91 92325 94228"
      >
        {/* Pulsing glow ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-pulse" />
        
        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 relative z-10 fill-current" />

        {/* Live Status Indicator Dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full z-20" />
      </a>
    </aside>
  );
};
