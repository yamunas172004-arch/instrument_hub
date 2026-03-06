import { useState } from 'react';
import { UserCircle, ShoppingBag, Heart, ShoppingCart, History, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const [activeMenu, setActiveMenu] = useState('My Profile');

    const menuOptions = [
        { title: 'My Profile', icon: UserCircle },
        { title: 'My Orders', icon: ShoppingBag },
        { title: 'Wishlist', icon: Heart },
        { title: 'Cart', icon: ShoppingCart },
        { title: 'Order History', icon: History },
    ];

    return (
        <div className="min-h-screen bg-gradient-dark py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold text-foreground mb-8">User Panel</h1>

                <div className="flex flex-col md:flex-row gap-8">

                    {/* Dashboard Navigation */}
                    <div className="w-full md:w-64 shrink-0">
                        <div className="bg-card/80 backdrop-blur-xl border border-border/50 shadow-card rounded-2xl overflow-hidden sticky top-24">
                            <nav className="flex flex-col py-2">
                                {menuOptions.map((menu) => {
                                    const Icon = menu.icon;
                                    return (
                                        <button
                                            key={menu.title}
                                            onClick={() => setActiveMenu(menu.title)}
                                            className={`flex items-center gap-3 px-6 py-4 text-left font-medium transition-colors w-full
                        ${activeMenu === menu.title
                                                    ? 'bg-primary/10 text-primary border-r-4 border-primary'
                                                    : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground border-r-4 border-transparent'
                                                }
                      `}
                                        >
                                            <Icon className="w-5 h-5" />
                                            {menu.title}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Detailed Content Window */}
                    <div className="flex-1">
                        <div className="bg-card/80 backdrop-blur-xl border border-border/50 shadow-card rounded-2xl p-6 md:p-10 min-h-[400px]">
                            <h2 className="text-2xl font-semibold text-foreground border-b border-border/50 pb-4 mb-6">{activeMenu}</h2>

                            <div className="flex flex-col items-center justify-center p-12 text-center h-full">
                                {activeMenu === 'My Profile' && (
                                    <div className="space-y-4 max-w-sm w-full">
                                        <p className="text-muted-foreground mb-6">Manage your account details seamlessly.</p>
                                        <Link to="/profile" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 w-full transition-all">
                                            <UserCircle className="w-5 h-5" /> Go To Profile Page
                                        </Link>
                                    </div>
                                )}

                                {activeMenu === 'My Orders' && (
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <ShoppingBag className="w-8 h-8 text-primary" />
                                        </div>
                                        <p className="font-medium text-foreground">You have 1 active order</p>
                                        <p className="text-sm text-muted-foreground mt-2">Order #ML-9982 - Processing</p>
                                    </div>
                                )}

                                {activeMenu === 'Wishlist' && (
                                    <div className="text-center">
                                        <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                                        <p className="text-muted-foreground">Your wishlist is currently empty.</p>
                                        <Link to="/instruments" className="text-primary hover:underline mt-2 block text-sm">Browse Instruments</Link>
                                    </div>
                                )}

                                {activeMenu === 'Cart' && (
                                    <div className="text-center">
                                        <ShoppingCart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                                        <p className="text-muted-foreground">View your active shopping session.</p>
                                        <Link to="/cart" className="inline-block mt-4 px-6 py-2 bg-secondary text-foreground hover:text-primary rounded-md border border-border transition-colors">Go to Cart</Link>
                                    </div>
                                )}

                                {activeMenu === 'Order History' && (
                                    <div className="w-full text-left">
                                        <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg mb-3">
                                            <div>
                                                <p className="font-medium text-foreground">Yamaha Acoustic Guitar</p>
                                                <p className="text-xs text-muted-foreground">Delivered on Jan 14, 2026</p>
                                            </div>
                                            <div className="flex items-center gap-1 text-green-500 font-semibold text-sm">
                                                <Check className="w-4 h-4" /> Delivered
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
