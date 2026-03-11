import { Link } from 'react-router-dom';
import { ArrowRight, Guitar, Piano, Drum } from 'lucide-react';

import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero';
import { useProducts } from '@/context/ProductContext';



const Index = () => {
  const { products } = useProducts();

  const featuredProducts = products.filter(p => p.featured);

  const categories = [
    { name: 'Guitars', icon: Guitar, count: products.filter(p => p.category === 'Guitar').length },
    { name: 'Pianos', icon: Piano, count: products.filter(p => p.category === 'Piano').length },
    { name: 'Drums', icon: Drum, count: products.filter(p => p.category === 'Drums').length },
  ];

  return (
    <div>
      <Hero />

      {/* ─── Categories ─── */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-foreground mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(cat => (
            <Link
              key={cat.name}
              to={`/instruments?category=${cat.name.replace('s', '')}`}
              className="group flex items-center gap-4 p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-gold hover:-translate-y-1"
            >
              <div className="p-3 rounded-lg bg-gradient-gold shadow-gold group-hover:scale-110 transition-transform duration-300">
                <cat.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">{cat.count} products</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Featured Products ─── */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">Featured Instruments</h2>
          <Link to="/instruments" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;

