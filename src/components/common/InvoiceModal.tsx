import React from 'react';
import { X, Printer, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Order } from '../../types';
import { BrandLogo } from './BrandLogo';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  const invoiceNumber = `INV-ARGI-${order.id.replace(/[^0-9]/g, '').slice(-6) || '202601'}`;
  const invoiceDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const isIntraState = (order.customer.state || '').toLowerCase().includes('madhya pradesh') || 
                       (order.customer.state || '').toLowerCase().includes('mp');

  // Indian precious metals GST: 3% total (split 1.5% CGST + 1.5% SGST, or 3% IGST)
  // Our displayed product prices are inclusive of GST.
  const taxableValue = Math.round(order.totalAmount / 1.03);
  const totalTax = order.totalAmount - taxableValue;
  const cgst = isIntraState ? Math.round(totalTax / 2) : 0;
  const sgst = isIntraState ? totalTax - cgst : 0;
  const igst = !isIntraState ? totalTax : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static print:overflow-visible">
      {/* Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E5E0DC] my-auto print:border-none print:shadow-none print:rounded-none print:max-w-none print:w-full">
        
        {/* Modal Action Bar (Hidden in Print) */}
        <div className="p-4 bg-[#083335] text-white flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#DFC168]" />
            <span className="font-serif text-sm font-semibold tracking-wide">
              Official GST Tax Invoice • BIS 925 Hallmarked
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-[#DFC168] hover:bg-[#cbb05b] text-[#083335] text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Body */}
        <div id="tax-invoice-printable" className="p-6 sm:p-10 text-[#1A1A1A] font-sans text-xs print:p-4">
          
          {/* Top Bar / Category */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b-2 border-[#083335] gap-4">
            <div className="space-y-1">
              <BrandLogo size="md" />
              <p className="text-[10px] text-stone-500 tracking-wider uppercase font-medium">
                Address of Bespoke 925 Sterling Silver Jewellery
              </p>
            </div>
            <div className="text-left sm:text-right space-y-0.5">
              <span className="inline-block px-2.5 py-0.5 bg-[#FAF7F2] text-[#083335] font-serif font-bold text-sm tracking-wide rounded border border-[#DFC168]/50">
                TAX INVOICE
              </span>
              <div className="text-[11px] text-stone-500">Original for Recipient (Customer Copy)</div>
              <div className="text-[10px] text-stone-400">Pursuant to Sec 31 CGST Act 2017</div>
            </div>
          </div>

          {/* Business & Buyer Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-[#E5E0DC]">
            
            {/* Seller Column */}
            <div className="space-y-1 text-xs">
              <div className="font-bold text-[#083335] uppercase tracking-wider text-[11px]">Sold By (Supplier):</div>
              <div className="font-serif text-sm font-bold text-[#083335]">ARGI JEWELS ADDRESS PRIVATE LIMITED</div>
              <p className="text-stone-600 leading-relaxed">
                Registered Workshop: 42, Sarafa Bazar, Indore, Madhya Pradesh - 452002<br />
                Experience Concierge: Scheme No. 54, Vijay Nagar, Indore - 452010
              </p>
              <div className="pt-1 space-y-0.5 text-stone-700">
                <div><strong>GSTIN:</strong> 23AABCA1234F1ZP</div>
                <div><strong>State:</strong> Madhya Pradesh (Code: 23)</div>
                <div><strong>BIS Hallmarking Reg:</strong> HM/C-7113-925-IND</div>
                <div><strong>WhatsApp / Phone:</strong> +91 92325 94228 | care@argijewels.in</div>
              </div>
            </div>

            {/* Buyer & Invoice Meta Column */}
            <div className="space-y-2 text-xs md:pl-6 md:border-l border-[#E5E0DC]">
              <div className="bg-[#FBF9F7] p-3 rounded-lg border border-[#E5E0DC] space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-500">Invoice No:</span>
                  <span className="font-mono font-bold text-[#083335]">{invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Invoice Date:</span>
                  <span className="font-semibold">{invoiceDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Order Reference:</span>
                  <span className="font-mono font-semibold text-[#083335]">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Payment Mode:</span>
                  <span className="font-semibold text-emerald-800">{order.paymentMethod} ({order.paymentStatus})</span>
                </div>
                {order.trackingNumber && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">AWB Logistics:</span>
                    <span className="font-mono text-stone-700">{order.courierPartner || 'Blue Dart'} • {order.trackingNumber}</span>
                  </div>
                )}
              </div>

              {/* Recipient info */}
              <div className="pt-1">
                <div className="font-bold text-[#083335] uppercase tracking-wider text-[11px] mb-1">Billed & Delivered To:</div>
                <div className="font-semibold text-[#083335]">{order.customer.name}</div>
                <div className="text-stone-600 leading-relaxed">
                  {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}
                </div>
                <div className="text-stone-600">Phone: {order.customer.phone} {order.customer.email ? `• ${order.customer.email}` : ''}</div>
                <div className="text-[11px] text-stone-500 mt-0.5">Place of Supply: {order.customer.state || 'Madhya Pradesh'}</div>
              </div>

            </div>

          </div>

          {/* Precious Metals Line Items Table */}
          <div className="py-6 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#083335] text-white">
                  <th className="p-2.5 font-semibold text-center w-10">#</th>
                  <th className="p-2.5 font-semibold">Description & Purity</th>
                  <th className="p-2.5 font-semibold text-center">HSN Code</th>
                  <th className="p-2.5 font-semibold text-center">Qty</th>
                  <th className="p-2.5 font-semibold text-right">Gross Rate</th>
                  <th className="p-2.5 font-semibold text-right">Taxable Val</th>
                  <th className="p-2.5 font-semibold text-right">GST (3%)</th>
                  <th className="p-2.5 font-semibold text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E0DC] border-b border-[#E5E0DC]">
                {order.items.map((item, idx) => {
                  const itemTotal = item.price * item.quantity;
                  const itemTaxable = Math.round(itemTotal / 1.03);
                  const itemGst = itemTotal - itemTaxable;

                  return (
                    <tr key={item.id} className="hover:bg-stone-50/50">
                      <td className="p-2.5 text-center text-stone-500">{idx + 1}</td>
                      <td className="p-2.5 space-y-0.5">
                        <div className="font-serif font-medium text-[#083335] text-xs">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-stone-500 flex flex-wrap gap-2">
                          <span>Finish: <strong>{item.finish}</strong></span>
                          {item.size && <span>• Size: {item.size}</span>}
                          {item.engraving && <span className="italic text-[#A8823E]">• Custom: "{item.engraving}"</span>}
                        </div>
                        <div className="text-[10px] text-emerald-800 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> BIS 925 Hallmarked Silver (IS 2112:2014)
                        </div>
                      </td>
                      <td className="p-2.5 text-center font-mono text-stone-600">7113</td>
                      <td className="p-2.5 text-center font-semibold">{item.quantity}</td>
                      <td className="p-2.5 text-right font-mono text-stone-600">₹{item.price.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-right font-mono text-stone-600">₹{itemTaxable.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-right font-mono text-stone-500">₹{itemGst.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-right font-mono font-bold text-[#083335]">₹{itemTotal.toLocaleString('en-IN')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Calculations Summary & Stamp */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2 pb-6 border-b border-[#E5E0DC]">
            
            {/* Left Terms & Gift Note */}
            <div className="md:col-span-7 space-y-3">
              {order.isGift && (
                <div className="p-3 bg-[#FAF7EE] border border-[#DFC168]/60 rounded-lg text-xs space-y-1">
                  <div className="font-bold text-[#083335] flex items-center gap-1.5">
                    <span>✨ Complimentary Luxury Gift Packaging Included</span>
                  </div>
                  {order.giftRecipientName && (
                    <div className="text-stone-600"><strong>Gift Recipient:</strong> {order.giftRecipientName}</div>
                  )}
                  {order.giftMessage && (
                    <div className="text-stone-600 italic">"{order.giftMessage}"</div>
                  )}
                </div>
              )}

              <div className="text-[11px] text-stone-500 space-y-1">
                <div className="font-bold text-[#083335] uppercase tracking-wider text-[10px]">Certification & Warranty Terms:</div>
                <p>1. All silver articles are 100% Solid 925 Sterling Silver tested and stamped under Bureau of Indian Standards (BIS) Hallmarking Scheme.</p>
                <p>2. Protected by 3-layer anti-tarnish rhodium barrier. Comes with standard 15-day return and exchange policy.</p>
                <p>3. Precious metal jewelry goods are subject to standard 3% GST under HSN Chapter 7113.</p>
              </div>

              <div className="pt-3">
                <div className="w-48 p-3 border border-stone-300 rounded-lg bg-stone-50/50 text-center space-y-1">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-stone-400">BIS Hallmarking Seal</div>
                  <div className="text-xs font-bold text-[#083335]">ARGI • INDORE • 925</div>
                  <div className="text-[9px] text-emerald-700 font-semibold">VERIFIED PURITY CERTIFICATE</div>
                </div>
              </div>
            </div>

            {/* Right Totals Breakdown */}
            <div className="md:col-span-5 space-y-2 text-xs">
              <div className="bg-[#FBF9F7] p-4 rounded-xl border border-[#E5E0DC] space-y-2">
                <div className="flex justify-between text-stone-600">
                  <span>Net Taxable Value</span>
                  <span className="font-mono">₹{taxableValue.toLocaleString('en-IN')}</span>
                </div>

                {isIntraState ? (
                  <>
                    <div className="flex justify-between text-stone-600">
                      <span>CGST (1.5%)</span>
                      <span className="font-mono">₹{cgst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>SGST (1.5%)</span>
                      <span className="font-mono">₹{sgst.toLocaleString('en-IN')}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-stone-600">
                    <span>IGST (3.0%)</span>
                    <span className="font-mono">₹{igst.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Coupon / Promotional Discount</span>
                    <span className="font-mono">-₹{order.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600">
                  <span>Express Insured Transit</span>
                  <span className="font-mono font-medium text-emerald-800">
                    {order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#E5E0DC] flex justify-between text-sm font-bold text-[#083335]">
                  <span>Total Invoice Amount</span>
                  <span className="font-mono text-base text-[#083335]">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-[10px] text-stone-400 text-right">
                  (Inclusive of all Central & State Precious Metal Taxes)
                </div>
              </div>

              {/* Signatory */}
              <div className="pt-4 text-right space-y-1">
                <div className="text-[10px] text-stone-400">For ARGI JEWELS ADDRESS PRIVATE LIMITED</div>
                <div className="font-serif font-bold text-xs text-[#083335] pt-3">Chief Silversmith & Master Jeweler</div>
                <div className="text-[10px] text-stone-500 italic">Authorised Signatory • Sarafa Bazar, Indore</div>
              </div>

            </div>

          </div>

          {/* Footer Note */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[10px] text-stone-400 gap-2">
            <div>This is a computer-generated tax invoice and requires no physical signature under Indian IT Act.</div>
            <div className="font-mono">Argi Jewels • Reg: Indore MP 452010</div>
          </div>

        </div>

      </div>
    </div>
  );
};
