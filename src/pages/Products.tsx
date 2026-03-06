import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { Category } from '@/types/product';

const categories: (Category | 'All')[] = ['All', 'Guitar', 'Piano', 'Drums', 'Violin', 'Keyboard'];

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState<string>(initialCat);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-2">All Instruments</h1>
      <p className="text-muted-foreground mb-8">Discover our curated collection of premium instruments</p>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-gold text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search instruments..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="ml-auto px-4 py-2 rounded-lg bg-secondary text-foreground border border-border/50 focus:border-primary focus:outline-none text-sm w-full md:w-64"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">No instruments found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
