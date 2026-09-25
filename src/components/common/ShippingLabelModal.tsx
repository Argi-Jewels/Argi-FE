import React from 'react';
import { X, Printer, ShieldCheck, AlertCircle, Package } from 'lucide-react';
import { Order } from '../../types';

interface ShippingLabelModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export const ShippingLabelModal: React.FC<ShippingLabelModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  if (!isOpen || !order) return null;

  const awb = order.trackingNumber || `BLUEDART-IND-${order.id.replace(/[^0-9]/g, '').slice(-6) || '982601'}`;
  const courier = order.courierPartner || 'Blue Dart Express';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-300 overflow-hidden my-auto print:border-none print:shadow-none print:max-w-none print:w-full">
        
        {/* Action Header (Hidden on Print) */}
        <div className="p-4 bg-[#083335] text-white flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-[#DFC168]" />
            <span className="font-serif text-sm font-semibold tracking-wide">
              Thermal Shipping Label (4" × 6")
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#DFC168] hover:bg-[#cfb25a] text-[#083335] text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Label</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4" x 6" Thermal Label Body */}
        <div id="thermal-label-content" className="p-6 text-black font-sans text-xs bg-white space-y-4 print:p-2">
          
          {/* Top Carrier Header */}
          <div className="border-2 border-black p-2 flex items-center justify-between">
            <div>
              <div className="text-sm font-black tracking-wider uppercase">{courier}</div>
              <div className="text-[10px] font-bold tracking-widest text-stone-600">AIR PRIORITY CARGO • SECURED</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-black px-2 py-0.5 border border-black uppercase">
                {order.paymentStatus === 'Paid' ? 'PREPAID' : 'COD'}
              </div>
              <div className="text-[10px] font-bold">WT: 0.12 KG</div>
            </div>
          </div>

          {/* Barcode Strip */}
          <div className="border-b-2 border-black pb-3 text-center space-y-1">
            <div className="text-[9px] uppercase font-bold tracking-widest text-stone-600">Air Waybill Consignment Number</div>
            
            {/* SVG Simulated Standard Code 128 Barcode */}
            <div className="py-1 flex justify-center">
              <svg className="w-72 h-14" viewBox="0 0 288 60">
                {/* Visual Barcode Pattern */}
                <rect x="0" y="0" width="4" height="60" fill="black" />
                <rect x="6" y="0" width="2" height="60" fill="black" />
                <rect x="10" y="0" width="6" height="60" fill="black" />
                <rect x="18" y="0" width="4" height="60" fill="black" />
                <rect x="26" y="0" width="2" height="60" fill="black" />
                <rect x="30" y="0" width="8" height="60" fill="black" />
                <rect x="42" y="0" width="4" height="60" fill="black" />
                <rect x="48" y="0" width="2" height="60" fill="black" />
                <rect x="54" y="0" width="6" height="60" fill="black" />
                <rect x="64" y="0" width="4" height="60" fill="black" />
                <rect x="72" y="0" width="2" height="60" fill="black" />
                <rect x="78" y="0" width="8" height="60" fill="black" />
                <rect x="90" y="0" width="4" height="60" fill="black" />
                <rect x="96" y="0" width="2" height="60" fill="black" />
                <rect x="102" y="0" width="6" height="60" fill="black" />
                <rect x="112" y="0" width="4" height="60" fill="black" />
                <rect x="120" y="0" width="2" height="60" fill="black" />
                <rect x="128" y="0" width="6" height="60" fill="black" />
                <rect x="138" y="0" width="4" height="60" fill="black" />
                <rect x="146" y="0" width="8" height="60" fill="black" />
                <rect x="158" y="0" width="4" height="60" fill="black" />
                <rect x="166" y="0" width="2" height="60" fill="black" />
                <rect x="172" y="0" width="6" height="60" fill="black" />
                <rect x="182" y="0" width="4" height="60" fill="black" />
                <rect x="190" y="0" width="8" height="60" fill="black" />
                <rect x="202" y="0" width="4" height="60" fill="black" />
                <rect x="210" y="0" width="2" height="60" fill="black" />
                <rect x="216" y="0" width="6" height="60" fill="black" />
                <rect x="226" y="0" width="4" height="60" fill="black" />
                <rect x="234" y="0" width="2" height="60" fill="black" />
                <rect x="240" y="0" width="8" height="60" fill="black" />
                <rect x="252" y="0" width="4" height="60" fill="black" />
                <rect x="260" y="0" width="2" height="60" fill="black" />
                <rect x="266" y="0" width="6" height="60" fill="black" />
                <rect x="276" y="0" width="4" height="60" fill="black" />
                <rect x="284" y="0" width="4" height="60" fill="black" />
              </svg>
            </div>

            <div className="font-mono text-base font-black tracking-widest">{awb}</div>
          </div>

          {/* Destination Box (Big Pincode & Address) */}
          <div className="border-2 border-black p-3 space-y-1.5">
            <div className="flex justify-between items-center border-b border-black pb-1 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider">SHIP TO (CONSIGNEE):</span>
              <span className="text-base font-black font-mono">PIN: {order.customer.pincode}</span>
            </div>
            
            <div className="text-sm font-black">{order.customer.name}</div>
            <div className="text-xs font-semibold leading-relaxed">
              {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}
            </div>
            <div className="font-bold text-xs pt-0.5">
              Contact: {order.customer.phone}
            </div>
          </div>

          {/* Shipper Details */}
          <div className="border border-black p-2 text-[11px] space-y-0.5">
            <div className="text-[9px] font-black uppercase tracking-wider">SHIPPED BY (ORIGIN RETURN ADDRESS):</div>
            <div className="font-bold">ARGI JEWELS ADDRESS PRIVATE LIMITED</div>
            <div>42, Sarafa Bazar, Indore, Madhya Pradesh - 452002</div>
            <div>Support / Concierge: +91 92325 94228 | care@argijewels.in</div>
            <div>GSTIN: 23AABCA1234F1ZP | State Code: 23 (MP)</div>
          </div>

          {/* Package Details & Instructions */}
          <div className="grid grid-cols-2 gap-2 text-[10px] border border-black p-2">
            <div>
              <div><strong>Order ID:</strong> {order.id}</div>
              <div><strong>Items:</strong> {order.items.length} Pure 925 Silver Piece(s)</div>
              <div><strong>HSN Code:</strong> 7113 (Silver Jewellery)</div>
            </div>
            <div className="text-right">
              <div><strong>Declared Val:</strong> ₹{order.totalAmount}</div>
              <div><strong>BIS Standard:</strong> IS 2112:2014</div>
              <div><strong>Insurance:</strong> Full Transit Cover</div>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="border-2 border-black p-2 bg-stone-100 text-center space-y-0.5">
            <div className="text-[11px] font-black uppercase tracking-wider">
              ⚠️ HIGH VALUE TAMPER-PROOF SECURITY POUCH ⚠️
            </div>
            <div className="text-[9px] font-bold">
              DO NOT DELIVER IF PACKAGING TAPE IS BROKEN OR OPENED. OPEN BOX OTP REQUIRED.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
