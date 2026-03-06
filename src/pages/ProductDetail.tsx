import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, ArrowLeft, Package } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
        <Link to="/instruments" className="text-primary hover:underline">Back to Instruments</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/instruments" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to Instruments
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square rounded-xl overflow-hidden bg-card border border-border/50">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-6">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">{product.category}</span>
          <h1 className="text-4xl font-bold text-foreground">{product.name}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </div>

          <p className="text-4xl font-bold text-gradient-gold">₹{product.price.toLocaleString('en-IN')}</p>

          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-gold text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
