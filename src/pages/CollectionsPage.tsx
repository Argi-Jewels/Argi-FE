import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Filter, 
  X, 
  Sparkles, 
  SlidersHorizontal,
  Search,
  RotateCcw
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/catalog/ProductCard';
import { QuickViewModal } from '../components/catalog/QuickViewModal';
import { Product, MetalFinish } from '../types';

export const CollectionsPage: React.FC = () => {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'All'
  );
  const [selectedFinish, setSelectedFinish] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<string>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('search') || ''
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync category param if URL changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get('search');
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  const categories = ['All', 'Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Personalized', 'Engagement'];
  const finishes = ['All', 'Rhodium Silver', '18k Yellow Gold Plated', 'Rose Gold Plated'];
  const occasions = ['All', 'Everyday Luxury', 'Bridal & Festive', 'Office Minimalist', 'Special Gifting'];
  const priceOptions = [
    { label: 'All Prices', value: 'All' },
    { label: 'Under ₹2,500', value: 'under-2500' },
    { label: '₹2,500 - ₹4,000', value: '2500-4000' },
    { label: 'Above ₹4,000', value: 'above-4000' },
  ];

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedFinish('All');
    setPriceRange('All');
    setSelectedOccasion('All');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters = 
    selectedCategory !== 'All' || 
    selectedFinish !== 'All' || 
    priceRange !== 'All' || 
    selectedOccasion !== 'All' || 
    searchQuery.trim() !== '';

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.status === 'Active')
      .filter((p) => {
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        if (selectedFinish !== 'All' && !p.finishes.includes(selectedFinish as MetalFinish)) return false;
        if (selectedOccasion !== 'All' && p.occasion !== selectedOccasion) return false;

        if (priceRange === 'under-2500' && p.price >= 2500) return false;
        if (priceRange === '2500-4000' && (p.price < 2500 || p.price > 4000)) return false;
        if (priceRange === 'above-4000' && p.price <= 4000) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = p.title.toLowerCase().includes(q);
          const matchesDesc = p.description.toLowerCase().includes(q);
          const matchesCategory = p.category.toLowerCase().includes(q);
          const matchesSku = p.sku.toLowerCase().includes(q);
          if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesSku) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [products, selectedCategory, selectedFinish, priceRange, selectedOccasion, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#FBF9F7] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="text-xs uppercase tracking-widest text-[#083335] font-semibold mb-1">
            Argi Address • Certified 925 Sterling Silver
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#083335] font-medium">
            {selectedCategory === 'All' ? 'Ready Collections' : `${selectedCategory} Collection`}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl font-light">
            Hand-finished in Indore’s jewelry district. Protected by anti-tarnish rhodium barrier with lifetime purity guarantee.
          </p>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-[#E5E0DC] shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Filter by title, stones, style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg focus:outline-none focus:border-[#083335]"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle & Sort Dropdown */}
          <div className="flex items-center justify-between w-full md:w-auto space-x-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 text-xs font-medium border border-[#E5E0DC] rounded-lg bg-[#FBF9F7] text-[#083335]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters && '• Active'}</span>
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-stone-500 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-medium bg-[#FBF9F7] border border-[#E5E0DC] rounded-lg px-3 py-2 text-[#083335] focus:outline-none focus:border-[#083335]"
              >
                <option value="featured">Recommended & Bestsellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>

        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white p-5 rounded-xl border border-[#E5E0DC] shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE8]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#083335]">
                  <Filter className="w-3.5 h-3.5 text-[#083335]" />
                  <span>Refine Catalog</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-[#083335] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#083335] mb-3">
                  Jewellery Category
                </h4>
                <div className="space-y-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-between ${
                        selectedCategory === cat
                          ? 'bg-[#083335] text-white font-semibold shadow-xs'
                          : 'text-stone-600 hover:bg-[#FBF9F7]'
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && <Sparkles className="w-3 h-3 text-[#DFC168]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metal Finish / Plating Filter */}
              <div className="pt-4 border-t border-[#F0ECE8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#083335] mb-3">
                  Silver Finish & Plating
                </h4>
                <div className="space-y-1.5">
                  {finishes.map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFinish(f)}
                      className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors ${
                        selectedFinish === f
                          ? 'bg-[#083335] text-white font-semibold shadow-xs'
                          : 'text-stone-600 hover:bg-[#FBF9F7]'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="pt-4 border-t border-[#F0ECE8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#083335] mb-3">
                  Price Range
                </h4>
                <div className="space-y-1.5">
                  {priceOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setPriceRange(opt.value)}
                      className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors ${
                        priceRange === opt.value
                          ? 'bg-[#083335] text-white font-semibold shadow-xs'
                          : 'text-stone-600 hover:bg-[#FBF9F7]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasion Filter */}
              <div className="pt-4 border-t border-[#F0ECE8]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#083335] mb-3">
                  Occasion
                </h4>
                <div className="space-y-1.5">
                  {occasions.map((occ) => (
                    <button
                      key={occ}
                      onClick={() => setSelectedOccasion(occ)}
                      className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors ${
                        selectedOccasion === occ
                          ? 'bg-[#083335] text-white font-semibold shadow-xs'
                          : 'text-stone-600 hover:bg-[#FBF9F7]'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Product Results Column */}
          <main className="lg:col-span-9">
            {/* Results Header Count */}
            <div className="flex items-center justify-between mb-4 text-xs text-stone-500">
              <span>Showing <strong>{filteredProducts.length}</strong> handcrafted pieces</span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[#083335] font-semibold hover:underline"
                >
                  Clear active filters
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E5E0DC] p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#083335] mx-auto flex items-center justify-center mb-4 border border-[#083335]/20">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-[#083335] font-medium mb-1">
                  No matching jewelry found
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
                  Try adjusting your filters or search query. You can also custom-craft any design through our Bespoke Studio.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={resetFilters}
                    className="px-5 py-2.5 bg-stone-100 text-[#083335] text-xs font-medium rounded-lg hover:bg-stone-200"
                  >
                    Reset Filters
                  </button>
                  <a
                    href="/custom-design"
                    className="px-5 py-2.5 bg-[#083335] text-white text-xs font-bold rounded-lg hover:bg-[#052224]"
                  >
                    Design Custom Piece
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filters Slide-over Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white shadow-2xl flex flex-col p-5 overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E0DC]">
                <div className="text-sm font-serif font-bold text-[#083335]">Filters</div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 py-4 flex-1">
                {/* Mobile Categories */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#083335] mb-2">
                    Category
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCategory(c)}
                        className={`text-xs p-2 rounded-lg border text-left ${
                          selectedCategory === c
                            ? 'bg-[#083335] text-white border-[#083335] font-semibold'
                            : 'border-[#E5E0DC] text-stone-700'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Finishes */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#083335] mb-2">
                    Plating Finish
                  </h4>
                  <div className="space-y-1">
                    {finishes.map((f) => (
                      <button
                        key={f}
                        onClick={() => setSelectedFinish(f)}
                        className={`w-full text-left text-xs p-2 rounded-lg border ${
                          selectedFinish === f
                            ? 'bg-[#083335] text-white border-[#083335] font-semibold'
                            : 'border-[#E5E0DC] text-stone-700'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Price */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#083335] mb-2">
                    Price
                  </h4>
                  <div className="space-y-1">
                    {priceOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setPriceRange(opt.value)}
                        className={`w-full text-left text-xs p-2 rounded-lg border ${
                          priceRange === opt.value
                            ? 'bg-[#083335] text-white border-[#083335] font-semibold'
                            : 'border-[#E5E0DC] text-stone-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E0DC] flex gap-2">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-2.5 border border-[#E5E0DC] text-xs font-medium rounded-lg"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-2.5 bg-[#083335] text-white text-xs font-bold rounded-lg"
                >
                  Apply Filters
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
