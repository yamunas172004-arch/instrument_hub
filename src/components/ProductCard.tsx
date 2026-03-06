import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group rounded-xl bg-card border border-border/50 overflow-hidden shadow-card hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
      <Link to={`/instruments/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="p-4 space-y-2">
        <span className="text-xs font-medium text-primary uppercase tracking-wider">{product.category}</span>
        <Link to={`/instruments/${product.id}`}>
          <h3 className="font-semibold text-foreground font-[family-name:var(--font-display)] hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-gradient-gold">₹{product.price.toLocaleString('en-IN')}</span>
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-gold text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
