import React from 'react';
import { X, HelpCircle, Ruler, CheckCircle } from 'lucide-react';

interface RingSizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RingSizeGuideModal: React.FC<RingSizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sizeChart = [
    { indianSize: '6', diameterMm: '14.5', circumferenceMm: '45.5' },
    { indianSize: '7', diameterMm: '14.9', circumferenceMm: '46.8' },
    { indianSize: '8', diameterMm: '15.3', circumferenceMm: '48.0' },
    { indianSize: '9', diameterMm: '15.6', circumferenceMm: '49.0' },
    { indianSize: '10', diameterMm: '16.0', circumferenceMm: '50.3' },
    { indianSize: '11', diameterMm: '16.3', circumferenceMm: '51.2' },
    { indianSize: '12', diameterMm: '16.7', circumferenceMm: '52.5' },
    { indianSize: '13', diameterMm: '17.0', circumferenceMm: '53.4' },
    { indianSize: '14', diameterMm: '17.3', circumferenceMm: '54.4' },
    { indianSize: '15', diameterMm: '17.7', circumferenceMm: '55.6' },
    { indianSize: '16', diameterMm: '18.1', circumferenceMm: '56.9' },
    { indianSize: '17', diameterMm: '18.4', circumferenceMm: '57.8' },
    { indianSize: '18', diameterMm: '18.8', circumferenceMm: '59.1' },
    { indianSize: '20', diameterMm: '19.4', circumferenceMm: '61.0' },
    { indianSize: '22', diameterMm: '20.1', circumferenceMm: '63.2' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-lg max-w-xl w-full p-6 shadow-2xl z-10 animate-fadeIn my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-[#A8823E]">
          <Ruler className="w-5 h-5" />
          <h3 className="font-serif text-xl font-medium text-[#1A1A1A]">
            Argi Jewels Indian Ring Sizing Guide
          </h3>
        </div>
        <p className="text-xs text-stone-500 mb-6">
          Find your exact Indian standard ring size for a snug and comfortable bespoke fit.
        </p>

        {/* 3 Step Instructions */}
        <div className="bg-[#FAF7F2] p-4 rounded-md border border-[#E5E0DC] mb-6 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
            How to Measure at Home (The Paper Strip Method):
          </h4>
          <ol className="space-y-2 text-xs text-stone-600 list-decimal list-inside leading-relaxed">
            <li>Cut a strip of paper approximately 10cm long and 1cm wide.</li>
            <li>Wrap the paper snug around the base of your intended finger and mark where the ends meet with a pen.</li>
            <li>Lay the paper flat against a metric ruler and measure the length in millimeters to find your <strong>Circumference</strong>. Match with the chart below.</li>
          </ol>
        </div>

        {/* Conversion Table */}
        <div className="overflow-x-auto border border-[#E5E0DC] rounded-md max-h-64 overflow-y-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FBF9F7] text-stone-600 uppercase text-[10px] tracking-wider border-b border-[#E5E0DC] sticky top-0">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Indian Standard Size</th>
                <th className="px-4 py-2.5 font-semibold">Inner Diameter (mm)</th>
                <th className="px-4 py-2.5 font-semibold">Finger Circumference (mm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0ECE8]">
              {sizeChart.map((row) => (
                <tr key={row.indianSize} className="hover:bg-amber-50/40">
                  <td className="px-4 py-2 font-medium text-[#1A1A1A]">Size {row.indianSize}</td>
                  <td className="px-4 py-2 text-stone-600">{row.diameterMm} mm</td>
                  <td className="px-4 py-2 text-stone-600">{row.circumferenceMm} mm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 p-3 bg-emerald-50 border border-emerald-200 rounded flex items-center gap-2 text-xs text-emerald-800">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>Still unsure? Choose your closest estimate. Argi Jewels provides complimentary one-time resizing within 15 days!</span>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-medium rounded hover:bg-[#333]"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
