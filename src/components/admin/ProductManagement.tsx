import React, { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import { Product, Category } from '@/types/product';
import { Plus, Edit, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

const categories: Category[] = ['Guitar', 'Piano', 'Drums', 'Violin', 'Keyboard'];

const ProductManagement = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);

    const handleEdit = (product: Product) => {
        setCurrentProduct(product);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setCurrentProduct({
            name: '',
            description: '',
            price: 0,
            category: 'Guitar',
            stock: 0,
            image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=600&h=600&fit=crop'
        });
        setIsEditing(true);
    };

    const handleSave = () => {
        if (!currentProduct?.name || !currentProduct?.price) {
            toast.error('Please fill in required fields');
            return;
        }

        if (currentProduct.id) {
            updateProduct(currentProduct.id, currentProduct);
            toast.success('Product updated successfully');
        } else {
            addProduct(currentProduct as Omit<Product, 'id'>);
            toast.success('Product added successfully');
        }
        setIsEditing(false);
        setCurrentProduct(null);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this instrument?')) {
            deleteProduct(id);
            toast.success('Product deleted');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-foreground">Instrument Inventory</h2>
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                    <Plus className="w-4 h-4" /> Add New Instrument
                </button>
            </div>

            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                    <div className="bg-card border border-border/50 p-6 rounded-2xl w-full max-w-2xl shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-foreground">
                                {currentProduct?.id ? 'Edit Instrument' : 'Add New Instrument'}
                            </h3>
                            <button onClick={() => setIsEditing(false)} className="text-muted-foreground hover:text-foreground">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={currentProduct?.name || ''}
                                        onChange={e => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                        className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-1">Category</label>
                                    <select
                                        value={currentProduct?.category || 'Guitar'}
                                        onChange={e => setCurrentProduct({ ...currentProduct, category: e.target.value as Category })}
                                        className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                                    >
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-muted-foreground mb-1">Price ($)</label>
                                        <input
                                            type="number"
                                            value={currentProduct?.price || 0}
                                            onChange={e => setCurrentProduct({ ...currentProduct, price: Number(e.target.value) })}
                                            className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-muted-foreground mb-1">Stock</label>
                                        <input
                                            type="number"
                                            value={currentProduct?.stock || 0}
                                            onChange={e => setCurrentProduct({ ...currentProduct, stock: Number(e.target.value) })}
                                            className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
                                    <textarea
                                        value={currentProduct?.description || ''}
                                        onChange={e => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                        className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-1">Image URL</label>
                                    <input
                                        type="text"
                                        value={currentProduct?.image || ''}
                                        onChange={e => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                                        className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={handleSave}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-gold text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                            >
                                <Save className="w-5 h-5" /> Save Instrument
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-secondary/30 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                                <th className="px-6 py-4">Instrument</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {products.map(product => (
                                <tr key={product.id} className="hover:bg-secondary/10 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-secondary/50 overflow-hidden flex items-center justify-center shrink-0">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <ImageIcon className="w-5 h-5 text-muted-foreground" />
                                                )}
                                            </div>
                                            <span className="font-medium text-foreground">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary uppercase">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-foreground">${product.price.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={product.stock < 5 ? 'text-destructive font-semibold' : 'text-muted-foreground'}>
                                            {product.stock} units
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductManagement;
