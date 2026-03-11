import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Music, User, Menu, X, LogOut, ShieldCheck, ChevronDown, History, Package } from 'lucide-react';
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
  { to: '/home', label: 'Home' },
  { to: '/instruments', label: 'Instruments' },
  { to: '/admin-dashboard', label: 'Dashboard', adminOnly: true },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auth state
  const entryUserStr = localStorage.getItem('entryUser');
  const isLoggedIn = !!entryUserStr;
  let userData: any = null;
  if (isLoggedIn) {
    try { userData = JSON.parse(entryUserStr!); } catch { }
  }
  const isAdmin = userData?.role === 'admin';

  const visibleNavLinks = navLinks.filter(link =>
    !link.adminOnly || (link.adminOnly && isAdmin && isLoggedIn)
  );

  const handleLogout = () => {
    localStorage.removeItem('entryUser');
    window.location.href = '/';
  };

  const noLayoutRoutes = ['/', '/login', '/signup'];
  if (noLayoutRoutes.includes(location.pathname)) {
    return <main className="min-h-screen flex flex-col">{children}</main>;
  }


  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/75 backdrop-blur-2xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16 gap-8">

            {/* ── Left: Logo ── */}
            <Link to="/home" className="flex items-center gap-2.5 shrink-0 group">
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

            {/* ── Right: Cart + Profile ── */}
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

              {/* Profile Dropdown OR Login */}
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-2xl border border-border/50 bg-secondary/30 hover:bg-secondary/60 hover:border-border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 group"
                    >
                      {/* Avatar */}
                      <div className="relative h-8 w-8 rounded-xl overflow-hidden shrink-0 ring-2 ring-primary/0 group-hover:ring-primary/30 transition-all">
                        <img src="/avatar-placeholder.png" alt="Avatar" className="h-full w-full object-cover" />
                        {/* Online dot */}
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
                      </div>
                      {/* Name */}
                      <span className="hidden sm:block text-sm font-medium text-foreground max-w-[90px] truncate">
                        {userData?.name?.split(' ')[0] || 'Account'}
                      </span>
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className="w-64 p-0 bg-card/95 border-border/50 backdrop-blur-2xl shadow-2xl rounded-2xl overflow-hidden"
                    align="end"
                    sideOffset={8}
                  >
                    {/* User Header */}
                    <div className="p-4 bg-gradient-to-b from-primary/5 to-transparent border-b border-border/40">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                          <img src="/avatar-placeholder.png" alt="Avatar" className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {userData?.name || userData?.username || 'User'}
                          </p>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">{userData?.email}</p>
                          <div className="mt-1.5">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide
                              ${isAdmin
                                ? 'bg-amber-500/15 text-amber-500 border border-amber-500/20'
                                : 'bg-green-500/15 text-green-500 border border-green-500/20'
                              }`}
                            >
                              {isAdmin ? <ShieldCheck className="h-2.5 w-2.5" /> : <User className="h-2.5 w-2.5" />}
                              {userData?.role || 'user'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <DropdownMenuItem asChild>
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-foreground hover:bg-secondary/60 focus:bg-secondary/60 transition-colors"
                        >
                          <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">My Profile</p>
                            <p className="text-xs text-muted-foreground">Account settings</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link
                          to="/cart"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-foreground hover:bg-secondary/60 focus:bg-secondary/60 transition-colors"
                        >
                          <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                            <Package className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">My Orders</p>
                            <p className="text-xs text-muted-foreground">Track your purchases</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>

                      {/* Admin Section */}
                      {isAdmin && (
                        <>
                          <div className="my-2 mx-1 h-px bg-border/50" />
                          <div className="px-3 py-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                              Admin Panel
                            </p>
                          </div>

                          <DropdownMenuItem asChild>
                            <Link
                              to="/admin/users"
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-foreground hover:bg-amber-500/10 focus:bg-amber-500/10 transition-colors"
                            >
                              <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                                <ShieldCheck className="h-4 w-4 text-amber-500" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">User Management</p>
                                <p className="text-xs text-muted-foreground">Manage roles & access</p>
                              </div>
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem asChild>
                            <Link
                              to="/login-history"
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-foreground hover:bg-secondary/60 focus:bg-secondary/60 transition-colors"
                            >
                              <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                                <History className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">Login History</p>
                                <p className="text-xs text-muted-foreground">View recent activity</p>
                              </div>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                    </div>

                    {/* Logout */}
                    <div className="p-2 border-t border-border/40">
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-destructive hover:bg-destructive/10 focus:bg-destructive/10 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                          <LogOut className="h-4 w-4 text-destructive" />
                        </div>
                        <p className="text-sm font-medium">Sign Out</p>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:inline-flex items-center justify-center rounded-xl bg-gradient-gold px-5 py-2 text-sm font-semibold text-primary-foreground shadow-gold transition-all hover:scale-105 active:scale-95"
                >
                  Sign In
                </Link>
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

            {/* Mobile User Section */}
            {isLoggedIn ? (
              <div className="container mx-auto px-4 pb-4">
                <div className="rounded-2xl border border-border/40 bg-secondary/20 overflow-hidden">
                  {/* User Header */}
                  <div className="flex items-center gap-3 p-4 border-b border-border/30">
                    <div className="h-11 w-11 rounded-xl overflow-hidden shrink-0">
                      <img src="/avatar-placeholder.png" alt="Avatar" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{userData?.name || 'User'}</p>
                      <p className="text-xs text-muted-foreground truncate">{userData?.email}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase
                      ${isAdmin ? 'bg-amber-500/15 text-amber-500' : 'bg-green-500/15 text-green-500'}`}>
                      {userData?.role}
                    </span>
                  </div>

                  {/* Mobile Menu Items */}
                  <div className="p-2">
                    {[
                      { to: '/profile', icon: User, label: 'My Profile' },
                      { to: '/cart', icon: Package, label: 'My Orders' },
                      ...(isAdmin ? [
                        { to: '/admin/users', icon: ShieldCheck, label: 'User Management' },
                        { to: '/login-history', icon: History, label: 'Login History' },
                      ] : []),
                    ].map(item => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-3 rounded-xl text-foreground hover:bg-secondary/60 transition-colors"
                      >
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors mt-1"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm font-medium">Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="container mx-auto px-4 pb-4">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full rounded-xl bg-gradient-gold px-6 py-3 text-sm font-bold text-primary-foreground shadow-gold"
                >
                  Sign In to Your Account
                </Link>
              </div>
            )}
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
