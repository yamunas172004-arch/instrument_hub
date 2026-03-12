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
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestUser, setGuestUser] = useState(() => {
    const saved = localStorage.getItem('melody_guest_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [formData, setFormData] = useState({ name: '', email: '', role: 'user' });

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('melody_guest_user', JSON.stringify(formData));
    setGuestUser(formData);
    setIsModalOpen(false);
  };

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

              {guestUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="hidden sm:flex items-center gap-2 group px-4 py-2 rounded-xl bg-secondary/40 border border-border/50 hover:bg-secondary/60 transition-all outline-none">
                      <div className="flex flex-col items-end leading-none">
                        <span className="text-sm font-bold text-foreground">{guestUser.name}</span>
                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-tight">{guestUser.role}</span>
                      </div>
                      <div className="h-8 w-8 rounded-lg bg-gradient-gold flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-xl border-border/50 rounded-xl p-2 shadow-2xl">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border/50 my-1" />
                    <DropdownMenuItem
                      onClick={() => {
                        localStorage.removeItem('melody_guest_user');
                        setGuestUser(null);
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm font-medium">Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="hidden sm:inline-flex items-center justify-center rounded-xl bg-gradient-gold px-5 py-2 text-sm font-bold text-primary-foreground shadow-gold transition-all hover:scale-105 active:scale-95"
                >
                  Sign In
                </button>
              )}

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
              
              <div className="mt-4 pt-4 border-t border-border/20">
                {guestUser ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/30">
                      <div className="h-10 w-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                        <User className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{guestUser.name}</p>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase">{guestUser.role}</p>
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-secondary/60 transition-colors"
                    >
                      Dashboard Console
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem('melody_guest_user');
                        setGuestUser(null);
                        setMobileOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setMobileOpen(false);
                    }}
                    className="w-full flex items-center justify-center rounded-xl bg-gradient-gold px-6 py-3 text-sm font-bold text-primary-foreground shadow-gold"
                  >
                    Sign In
                  </button>
                )}
              </div>
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
                {guestUser && <Link to="/dashboard" className="block hover:text-primary transition-colors">Dashboard</Link>}
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
      {/* ── Sign In Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-foreground">Sign In</h3>
              <p className="text-sm text-muted-foreground mt-1">Enter your details to access your dashboard.</p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Name</label>
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Email</label>
                <input
                  required
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                >
                  <option value="user" className="bg-card">User</option>
                  <option value="admin" className="bg-card">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-4 bg-gradient-gold text-primary-foreground font-bold rounded-xl shadow-gold hover:opacity-90 transition-opacity"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
