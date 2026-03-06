import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Music, User, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/instruments', label: 'Instruments' },
  { to: '/cart', label: 'Cart' },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Music className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold font-[family-name:var(--font-display)] text-gradient-gold">
              MelodyMart
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-gold text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link
              to="/login"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <User className="h-4 w-4" />
              Login
            </Link>
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-border/50 bg-background px-4 py-4 space-y-3">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm font-medium transition-colors ${
                  location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-muted-foreground"
            >
              Login / Sign Up
            </Link>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Music className="h-5 w-5 text-primary" />
                <span className="font-bold font-[family-name:var(--font-display)] text-gradient-gold">MelodyMart</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Premium musical instruments for passionate musicians. Quality sound starts here.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Quick Links</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/instruments" className="block hover:text-primary transition-colors">Instruments</Link>
                <Link to="/cart" className="block hover:text-primary transition-colors">Cart</Link>
                <Link to="/login" className="block hover:text-primary transition-colors">Account</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>rajgilbert101@gmail.com</p>
                <p>+91 6381840232</p>
                <p>C/4 Jasmine Block, Police Quatars, Marshing Pettai, Beemanagar, Tamil Nadu, India</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
            © 2026 MelodyMart. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
