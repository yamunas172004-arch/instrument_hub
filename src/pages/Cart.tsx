import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Start adding some instruments!</p>
        <Link to="/instruments" className="px-6 py-3 rounded-lg bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
          Browse Instruments
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 p-4 rounded-xl bg-card border border-border/50">
              <img src={product.image} alt={product.name} className="w-24 h-24 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
                <p className="text-lg font-bold text-gradient-gold mt-1">₹{product.price.toLocaleString('en-IN')}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeFromCart(product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1 rounded bg-secondary hover:bg-secondary/80 transition-colors">
                    <Minus className="h-3.5 w-3.5 text-foreground" />
                  </button>
                  <span className="text-sm font-medium text-foreground w-6 text-center">{quantity}</span>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1 rounded bg-secondary hover:bg-secondary/80 transition-colors">
                    <Plus className="h-3.5 w-3.5 text-foreground" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="p-6 rounded-xl bg-card border border-border/50 h-fit sticky top-24">
          <h2 className="text-xl font-bold text-foreground mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-muted-foreground">
                <span>{product.name} × {quantity}</span>
                <span>₹{(product.price * quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border/50 mt-4 pt-4 flex justify-between items-center">
            <span className="font-semibold text-foreground">Total</span>
            <span className="text-2xl font-bold text-gradient-gold">₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>
          <Link
            to="/checkout"
            className="mt-6 block text-center px-6 py-3 rounded-lg bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
