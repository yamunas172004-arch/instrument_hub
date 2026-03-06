import { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import { Category } from '@/types/product';
import { toast } from 'sonner';

const categories: Category[] = ['Guitar', 'Piano', 'Drums', 'Violin', 'Keyboard'];

const Admin = () => {
  const { addProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'Guitar' as Category,
    stock: '',
    featured: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category || !formData.stock) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newProduct = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      image: formData.image || 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=600&fit=crop', // default music image
      category: formData.category,
      stock: Number(formData.stock),
      featured: formData.featured,
    };

    addProduct(newProduct);
    toast.success('Product added successfully!');
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: 'Guitar',
      stock: '',
      featured: false,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold text-foreground mb-2">Admin Panel</h1>
      <p className="text-muted-foreground mb-8">Add new instrument cards to the store</p>

      <div className="bg-card border border-border/50 rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground flex-1 border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-sm"
              placeholder="e.g. Fender Stratocaster"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground flex-1 border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-sm resize-none"
              placeholder="Enter product description..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Price (₹) *</label>
              <input
                type="number"
                name="price"
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground flex-1 border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-sm"
                placeholder="2499"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Stock *</label>
              <input
                type="number"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground flex-1 border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-sm"
                placeholder="10"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground flex-1 border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-sm"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground flex-1 border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-sm"
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 rounded border-border/50 text-primary focus:ring-primary focus:ring-offset-background bg-secondary"
            />
            <label htmlFor="featured" className="text-sm font-medium text-foreground cursor-pointer">
              Featured on Homepage
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              Add Instrument Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
