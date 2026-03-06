import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', zip: '' });

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.city || !form.zip) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Order placed successfully! 🎉');
    clearCart();
    navigate('/');
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-foreground mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-foreground mb-4">Shipping Information</h2>
        </div>

        {[
          { label: 'Full Name', field: 'name', span: true },
          { label: 'Email', field: 'email', span: true },
          { label: 'Address', field: 'address', span: true },
          { label: 'City', field: 'city', span: false },
          { label: 'ZIP Code', field: 'zip', span: false },
        ].map(({ label, field, span }) => (
          <div key={field} className={span ? 'md:col-span-2' : ''}>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">{label}</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              value={form[field as keyof typeof form]}
              onChange={update(field)}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary text-foreground border border-border/50 focus:border-primary focus:outline-none"
            />
          </div>
        ))}

        <div className="md:col-span-2 mt-4 p-6 rounded-xl bg-card border border-border/50">
          <h3 className="font-semibold text-foreground mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between">
                <span>{product.name} × {quantity}</span>
                <span>₹{(product.price * quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border/50 mt-3 pt-3 flex justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-bold text-gradient-gold text-xl">₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg bg-gradient-gold text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
