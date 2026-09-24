import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../catalog/ProductCard';
import { QuickViewModal } from '../catalog/QuickViewModal';
import { Product } from '../../types';

export const FeaturedCollectionsSection: React.FC = () => {
  const { products } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories = ['All', 'Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Personalized'];

  const filteredProducts = products
    .filter(p => p.status === 'Active')
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
    .slice(0, 8);

  return (
    <section className="py-20 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E5E0DC] gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#A8823E] font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Curated In Indore
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#083335] font-medium">
              Ready-to-Wear Silver Masterpieces
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-full transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#083335] text-white font-semibold shadow-xs'
                    : 'bg-[#FBF9F7] text-stone-600 hover:bg-stone-100 border border-[#E5E0DC]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-[#083335] text-[#083335] hover:text-white border-2 border-[#083335] text-xs uppercase tracking-[0.2em] font-bold rounded-lg shadow-xs hover:shadow transition-all group"
          >
            <span>Explore Full 925 Collection ({products.length} Designs)</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};
