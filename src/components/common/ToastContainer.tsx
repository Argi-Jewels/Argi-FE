import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, Info, Sparkles, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-lg shadow-xl border backdrop-blur-md transition-all animate-slideDown ${
            toast.type === 'gold'
              ? 'bg-[#1A1A1A] text-white border-[#C5A059]'
              : toast.type === 'success'
              ? 'bg-[#1A1A1A] text-white border-[#25D366]'
              : 'bg-[#FFFFFF] text-[#1A1A1A] border-[#E5E0DC]'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            {toast.type === 'gold' && <Sparkles className="w-4 h-4 text-[#DFC168] shrink-0" />}
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-stone-500 shrink-0" />}
            <p className="text-xs font-medium leading-snug">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-stone-400 hover:text-stone-200 ml-2 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
