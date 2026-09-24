import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sparkles, Gem, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MobileBottomBar: React.FC = () => {
  const location = useLocation();
  const { cartCount, wishlist, setIsCartOpen } = useStore();

  const isCurrent = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E5E0DC] lg:hidden py-1 px-2 safe-area-pb">
      <div className="grid grid-cols-5 items-center justify-around text-[10px]">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center py-1 transition-colors ${
            isCurrent('/') && location.pathname === '/' ? 'text-[#083335] font-bold' : 'text-stone-600'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </Link>

        {/* Collections */}
        <Link
          to="/collections"
          className={`flex flex-col items-center py-1 transition-colors ${
            isCurrent('/collections') ? 'text-[#083335] font-bold' : 'text-stone-600'
          }`}
        >
          <Gem className="w-5 h-5 mb-0.5" />
          <span>Shop</span>
        </Link>

        {/* Bespoke "Design" Highlight */}
        <Link
          to="/custom-design"
          className="flex flex-col items-center -mt-3 group"
        >
          <div className="w-11 h-11 rounded-full bg-[#083335] text-[#DFC168] flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-[#DFC168]" />
          </div>
          <span className="text-[10px] font-bold text-[#083335] mt-0.5">Bespoke</span>
        </Link>

        {/* Wishlist */}
        <Link
          to="/account?tab=wishlist"
          className={`flex flex-col items-center py-1 relative transition-colors ${
            location.search.includes('wishlist') ? 'text-[#083335] font-bold' : 'text-stone-600'
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5 mb-0.5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#C5A059] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </div>
          <span>Wishlist</span>
        </Link>

        {/* Cart Drawer Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center py-1 relative text-stone-600 hover:text-[#083335]"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#083335] text-[#FBF9F7] text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>
      </div>
    </nav>
  );
};
