import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, ShoppingBag, Users, BarChart3, Menu, X, History } from 'lucide-react';
import ProductManagement from '@/components/admin/ProductManagement';
import OrderManagement from '@/components/admin/OrderManagement';
import UserManagement from '@/components/admin/UserManagement';
import LoginHistory from './LoginHistory';

const AdminDashboard = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'Overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const handleTabChange = (name: string) => {
        setActiveTab(name);
        setSearchParams({ tab: name });
        if (window.innerWidth < 768) setIsSidebarOpen(false);
    };

    const menuItems = [
        { name: 'Overview', icon: LayoutDashboard },
        { name: 'Instruments', icon: PlusCircle },
        { name: 'Manage Orders', icon: ShoppingBag },
    ];

    return (
        <div className="min-h-screen bg-gradient-dark flex flex-col md:flex-row relative">
            {/* Mobile Sidebar Toggle */}
            <div className="md:hidden p-4 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-[73px] z-40">
                <h2 className="font-bold text-lg text-foreground">Dashboard Console</h2>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-foreground">
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
        fixed md:sticky top-[137px] md:top-[73px] left-0 h-[calc(100vh-137px)] md:h-[calc(100vh-73px)] w-64
        bg-card/95 backdrop-blur-xl border-r border-border/50 shadow-card z-30 flex flex-col
      `}>
                <div className="p-6 hidden md:block border-b border-border/30">
                    <h2 className="text-xl font-bold font-[family-name:var(--font-display)] text-gradient-gold">Dashboard Console</h2>
                    <p className="text-xs text-muted-foreground mt-1">Management Console</p>
                </div>
                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="space-y-1.5 px-3">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => handleTabChange(item.name)}
                                    className={` w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${activeTab === item.name
                                            ? 'bg-primary/20 text-primary'
                                            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                        }
                  `}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.name}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-8 w-full max-w-full overflow-x-hidden pt-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">{activeTab}</h1>
                    <p className="text-muted-foreground mt-1">Manage and monitor your store's operations smoothly.</p>
                </div>

                {/* Dashboard Sections */}
                <div className="space-y-6">
                    {activeTab === 'Overview' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="bg-card/80 border border-border/50 p-6 rounded-xl shadow-sm">
                                <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Sales</h3>
                                <p className="text-3xl font-bold text-foreground">$45,231.89</p>
                                <span className="text-green-500 text-xs font-semibold flex items-center mt-2">+20.1% from last month</span>
                            </div>
                            <div className="bg-card/80 border border-border/50 p-6 rounded-xl shadow-sm">
                                <h3 className="text-sm font-medium text-muted-foreground mb-2">Active Users</h3>
                                <p className="text-3xl font-bold text-foreground">+2350</p>
                                <span className="text-green-500 text-xs font-semibold flex items-center mt-2">+180 new today</span>
                            </div>
                            <div className="bg-card/80 border border-border/50 p-6 rounded-xl shadow-sm">
                                <h3 className="text-sm font-medium text-muted-foreground mb-2">Pending Orders</h3>
                                <p className="text-3xl font-bold text-foreground">12</p>
                                <span className="text-muted-foreground text-xs font-medium flex items-center mt-2">Requires processing</span>
                            </div>
                            <div className="lg:col-span-3 bg-secondary/30 border border-border/50 p-8 rounded-xl h-64 flex items-center justify-center mt-4">
                                <p className="text-muted-foreground text-center italic">Advanced analytics charts will be displayed here in a later update.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Instruments' && <ProductManagement />}
                    {activeTab === 'Manage Orders' && <OrderManagement />}
                    {activeTab === 'Manage Users' && <UserManagement />}
                    {activeTab === 'Login History' && <LoginHistory />}

                    {activeTab === 'Sales Statistics' && (
                        <div className="bg-secondary/30 border border-border/50 p-12 rounded-xl flex flex-col items-center justify-center text-center">
                            <BarChart3 className="w-16 h-16 text-muted-foreground/30 mb-4" />
                            <h3 className="text-xl font-semibold text-foreground mb-2">Sales Analytics</h3>
                            <p className="text-muted-foreground max-w-sm">Deep dive into your store's sales performance and customer buying patterns.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
