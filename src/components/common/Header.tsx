import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Sparkles, 
  User, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronRight,
  PhoneCall
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from './BrandLogo';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    cartCount, 
    wishlist, 
    setIsCartOpen, 
    currentUser,
    setIsLoginModalOpen 
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'All Jewelry', path: '/collections' },
    { label: 'Rings', path: '/collections?category=Rings' },
    { label: 'Necklaces', path: '/collections?category=Necklaces' },
    { label: 'Bracelets', path: '/collections?category=Bracelets' },
    { label: 'Earrings', path: '/collections?category=Earrings' },
    { label: 'Personalized', path: '/collections?category=Personalized' },
    { label: 'Design Your Piece', path: '/custom-design', highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E5E0DC] transition-all">
      {/* Luxury Announcement Bar in #083335 Signature Emerald Teal */}
      <div className="bg-[#083335] text-[#FBF9F7] px-4 py-2 text-xs tracking-wider flex items-center justify-between border-b border-[#0c4346]">
        <div className="hidden md:flex items-center space-x-4 text-[11px] text-[#DFC168]">
          <span className="flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#DFC168]" /> 100% Certified 925 Sterling Silver
          </span>
          <span className="text-[#125559]">•</span>
          <span className="text-white/80">Handcrafted in Sarafa Bazar, Indore</span>
        </div>
        
        <div className="mx-auto md:mx-0 text-center text-[11px] font-medium tracking-wide">
          ✨ <span className="text-[#DFC168] font-semibold">PAN India Free Express Delivery</span> on orders above ₹1,999
        </div>

        <div className="hidden lg:flex items-center space-x-3 text-[11px]">
          <a 
            href="https://wa.me/919232594228?text=Hello%20Argi%20Jewels,%20I%20would%20like%20to%20consult%20about%20custom%20jewellery." 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-[#DFC168] text-white/90 transition-colors"
          >
            <PhoneCall className="w-3 h-3 text-[#25D366]" /> WhatsApp Styling Concierge
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#083335] hover:text-[#C5A059] transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 ml-1 text-[#083335] hover:text-[#C5A059] transition-colors focus:outline-none"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo Component */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <Link to="/" className="inline-block group text-left">
              <BrandLogo variant="dark" size="md" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-[13px] tracking-widest uppercase font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-all duration-200 relative py-1 ${
                  location.pathname + location.search === link.path
                    ? 'text-[#083335] font-bold'
                    : 'text-stone-700 hover:text-[#083335]'
                } ${link.highlight ? 'text-[#083335] flex items-center gap-1 font-bold' : ''}`}
              >
                {link.highlight && <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />}
                {link.label}
                {location.pathname + location.search === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#083335]" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Desktop Search Trigger */}
            <div className="relative hidden md:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search rings, pendants, 925 silver..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64 pl-9 pr-3 py-1.5 text-xs bg-[#FBF9F7] border border-[#E5E0DC] rounded-full focus:outline-none focus:border-[#083335] focus:w-72 transition-all placeholder:text-stone-400"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2 pointer-events-none" />
              </form>
            </div>

            {/* Account Link or Sign In Popup Trigger */}
            {currentUser ? (
              <Link 
                to="/account" 
                className="p-1.5 text-[#083335] hover:text-[#C5A059] transition-colors relative flex items-center gap-2"
                title={`Account: ${currentUser.name}`}
              >
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-7 h-7 rounded-full object-cover border border-[#083335]" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#083335] text-[#DFC168] flex items-center justify-center text-xs font-bold font-serif">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                <span className="hidden xl:inline text-xs font-medium text-stone-700 max-w-[90px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
              </Link>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="p-2 text-[#083335] hover:text-[#C5A059] transition-colors relative flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                title="Sign In with Google or Mobile OTP"
                aria-label="Open Sign In"
              >
                <User className="w-4 h-4" />
                <span className="hidden xl:inline">Sign In</span>
              </button>
            )}

            {/* Wishlist Link */}
            <Link 
              to="/account?tab=wishlist" 
              className="p-2 text-[#083335] hover:text-[#C5A059] transition-colors relative"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C5A059] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-[#083335] hover:text-[#C5A059] transition-colors relative group"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#083335] text-[#FBF9F7] text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {isSearchOpen && (
          <div className="py-3 px-1 md:hidden border-t border-[#E5E0DC]">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search pure 925 sterling silver..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-9 pr-3 py-2 text-sm bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E0DC] bg-[#FFFFFF] shadow-xl animate-fadeIn">
          <div className="px-4 pt-3 pb-6 space-y-2">
            <div className="pb-3 mb-2 border-b border-[#F0ECE8]">
              <div className="text-xs uppercase tracking-widest text-stone-400 mb-2">Collections</div>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-2.5 text-sm tracking-wide ${
                    link.highlight ? 'text-[#083335] font-bold' : 'text-stone-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.highlight && <Sparkles className="w-4 h-4 text-[#D4AF37]" />}
                    {link.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-300" />
                </Link>
              ))}
            </div>

            <div className="pt-2 space-y-2">
              {currentUser ? (
                <Link
                  to="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 text-sm text-[#083335] font-semibold"
                >
                  <span>My Account ({currentUser.name})</span>
                  <User className="w-4 h-4 text-[#083335]" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between py-2 text-sm text-[#083335] font-semibold text-left"
                >
                  <span>Sign In (Google / Mobile)</span>
                  <User className="w-4 h-4 text-stone-400" />
                </button>
              )}
              <Link
                to="/custom-design"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-2.5 text-center text-xs uppercase tracking-widest font-semibold bg-[#083335] text-white rounded hover:bg-[#052224] transition-colors"
              >
                Bespoke Design Studio
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
