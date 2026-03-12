import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Music, User, Menu, X, LogOut, ShieldCheck, ChevronDown, History, Package, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/instruments', label: 'Instruments' },
  { to: '/dashboard', label: 'Dashboard' },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleNavLinks = navLinks;


  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/75 backdrop-blur-2xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16 gap-8">

            {/* ── Left: Logo ── */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-gold shadow-gold transition-transform group-hover:scale-110">
                <Music className="h-4.5 w-4.5 text-primary-foreground" />
                <span className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-lg font-bold font-[family-name:var(--font-display)] text-gradient-gold tracking-wide hidden sm:block">
                MelodyMart
              </span>
            </Link>

            {/* ── Center: Nav Links ── */}
            <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
              {visibleNavLinks.map(link => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                      }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right: Cart + Dashboard ── */}
            <div className="flex items-center gap-3 ml-auto">

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all duration-200"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-gradient-gold text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center shadow-gold">
                    {totalItems}
                  </span>
                )}
              </Link>

              <Link
                to="/dashboard"
                className="hidden sm:inline-flex items-center justify-center rounded-xl bg-secondary/40 border border-border/50 px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-secondary/60"
              >
                Dashboard
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-xl text-foreground hover:bg-secondary/60 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Nav ── */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-2xl">
            {/* Mobile Nav Links */}
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {visibleNavLinks.map(link => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors
                      ${isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1">{children}</main>

      {/* ── Footer ── */}
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
                <Link to="/dashboard" className="block hover:text-primary transition-colors">Dashboard</Link>
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
