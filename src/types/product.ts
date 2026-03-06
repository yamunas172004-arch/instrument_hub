export type Category = 'Guitar' | 'Piano' | 'Drums' | 'Violin' | 'Keyboard';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  stock: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
