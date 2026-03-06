import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Music, User, Menu, X, LogOut, ShieldCheck, ChevronDown, History } from 'lucide-react';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navLinks = [
  { to: '/home', label: 'Home' },
  { to: '/instruments', label: 'Instruments' },
  { to: '/cart', label: 'Cart' },
  { to: '/admin-dashboard', label: 'Admin Panel' },
  { to: '/user-dashboard', label: 'User Panel' },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Check if user is logged in
  const entryUserStr = localStorage.getItem('entryUser');
  const isLoggedIn = !!entryUserStr;
  let userData: any = null;
  if (isLoggedIn) {
    try {
      userData = JSON.parse(entryUserStr);
    } catch (e) { }
  }

  // Load login history
  const historyStr = localStorage.getItem('loginHistory');
  const allHistory = historyStr ? JSON.parse(historyStr) : [];
  const displayHistory = userData?.role === 'admin' ? allHistory : allHistory.filter((log: any) => log.email === userData?.email);

  // Hide admin link for normal users
  const visibleNavLinks = navLinks.filter(link => {
    if (link.to === '/admin-dashboard' && userData?.role !== 'admin') {
      return false;
    }
    if (link.to === '/user-dashboard' && userData?.role !== 'user') {
      return false;
    }
    if ((link.to === '/admin-dashboard' || link.to === '/user-dashboard') && !isLoggedIn) {
      return false;
    }
    return true;
  });

  if (location.pathname === '/') {
    return <main className="min-h-screen flex flex-col">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/home" className="flex items-center gap-2">
            <Music className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold font-[family-name:var(--font-display)] text-gradient-gold">
              MelodyMart
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {visibleNavLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn && userData && userData.role === 'admin' && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-none">
                  Login Details <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[360px] bg-card/95 border-border/50 backdrop-blur-xl mt-2 p-2 shadow-card" align="end">
                  <DropdownMenuLabel className="font-normal px-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-foreground">{userData.username}</p>
                      <p className="text-xs leading-none text-muted-foreground mt-1">{userData.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border/50" />

                  {/* Small Login History Table inside Dropdown */}
                  <div className="px-2 py-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Recent Logins</p>
                    <div className="max-h-[160px] overflow-y-auto pr-1 select-none">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-secondary/30 text-muted-foreground sticky top-0">
                          <tr>
                            <th className="py-1 px-2 font-medium">User</th>
                            <th className="py-1 px-2 font-medium">Role</th>
                            <th className="py-1 px-2 font-medium">Time</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                          {displayHistory.map((log: any, idx: number) => (
                            <tr key={idx} className="hover:bg-secondary/20 transition-colors">
                              <td className="py-2 px-2 text-foreground truncate max-w-[100px]" title={log.email}>{log.username}</td>
                              <td className="py-2 px-2 text-muted-foreground capitalize">{log.role}</td>
                              <td className="py-2 px-2 text-muted-foreground whitespace-nowrap">{log.loginTime}</td>
                            </tr>
                          ))}
                          {displayHistory.length === 0 && (
                            <tr>
                              <td colSpan={3} className="py-2 px-2 text-center text-muted-foreground italic">No recent logins.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <DropdownMenuSeparator className="bg-border/50" />

                  <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/10 hover:bg-primary/10 text-foreground transition-colors px-3 py-2 rounded-md">
                    <Link to="/login-history" className="flex items-center">
                      <History className="mr-2 h-4 w-4" /> View Full Login History
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/10 hover:bg-primary/10 text-foreground transition-colors px-3 py-2 rounded-md mt-1">
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" /> View Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      localStorage.removeItem('entryUser');
                      window.location.href = '/';
                    }}
                    className="cursor-pointer focus:bg-destructive/10 hover:bg-destructive/10 text-destructive focus:text-destructive transition-colors px-3 py-2 rounded-md mt-1"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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

            {isLoggedIn && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      localStorage.removeItem('entryUser');
                      window.location.href = '/';
                    }}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors hidden md:block"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-card border-border/50 text-foreground">
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            )}
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
            {visibleNavLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm font-medium transition-colors ${location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Dropdown Replacement equivalent - Admin Only */}
            {isLoggedIn && userData && userData.role === 'admin' && (
              <div className="border-t border-border/50 pt-3 mt-3">
                <div className="flex items-center gap-2 px-2 pb-2 text-foreground font-medium text-sm">
                  Login Details
                </div>
                <div className="px-2 py-2 mb-2 text-sm bg-secondary/50 rounded-lg border border-border/30">
                  <p className="text-foreground font-medium">{userData.username}</p>
                  <p className="text-muted-foreground text-xs">{userData.email}</p>
                  <div className="flex justify-between mt-3 text-muted-foreground text-xs font-semibold mb-3">
                    <span>Role: <span className="text-foreground capitalize">{userData.role === 'admin' ? 'Admin' : 'User'}</span></span>
                    <span className="flex items-center gap-1 text-green-500">
                      <ShieldCheck className="w-3 h-3" /> Active
                    </span>
                  </div>
                  {/* Recent Mobile Logins */}
                  <div className="mt-2 border-t border-border/30 pt-2">
                    <p className="text-[10px] text-muted-foreground uppercase mb-1">Recent Logins (Top 3)</p>
                    <div className="space-y-1">
                      {displayHistory.slice(0, 3).map((log: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-xs items-center bg-background/50 p-1 rounded">
                          <span className="truncate text-foreground max-w-[80px]" title={log.username}>{log.username}</span>
                          <span className="text-muted-foreground">{log.loginTime}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Link
                  to="/login-history"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-left px-2 py-2 flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <History className="h-4 w-4" /> View Full History
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-left px-2 py-2 flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <User className="h-4 w-4" /> View Profile
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('entryUser');
                    window.location.href = '/';
                  }}
                  className="w-full text-left px-2 py-2 flex items-center gap-2 text-sm font-medium text-destructive transition-colors"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            )}

            {!isLoggedIn && (
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-muted-foreground pt-3 border-t border-border/50"
              >
                Login / Sign Up
              </Link>
            )}
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
