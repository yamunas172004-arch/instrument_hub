import React, { useState } from 'react';
import { Package, MoreVertical, CheckCircle, Clock, Truck, XCircle, Search } from 'lucide-react';

interface Order {
    id: string;
    customer: string;
    email: string;
    date: string;
    total: number;
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
    items: number;
}

const initialOrders: Order[] = [
    { id: 'ORD-2023-01', customer: 'Rohit Sharma', email: 'rohit@example.com', date: '2026-03-01', total: 1299, status: 'Delivered', items: 1 },
    { id: 'ORD-2023-02', customer: 'Priya Patel', email: 'priya@example.com', date: '2026-03-02', total: 2499, status: 'Shipped', items: 1 },
    { id: 'ORD-2023-03', customer: 'Amit Kumar', email: 'amit@example.com', date: '2026-03-04', total: 3200, status: 'Pending', items: 2 },
    { id: 'ORD-2023-04', customer: 'Anjali Gupta', email: 'anjali@example.com', date: '2026-03-05', total: 899, status: 'Pending', items: 1 },
];

const OrderManagement = () => {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [filter, setFilter] = useState('');

    const filteredOrders = orders.filter(o =>
        o.customer.toLowerCase().includes(filter.toLowerCase()) ||
        o.id.toLowerCase().includes(filter.toLowerCase())
    );

    const getStatusIcon = (status: Order['status']) => {
        switch (status) {
            case 'Delivered': return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'Shipped': return <Truck className="w-4 h-4 text-primary" />;
            case 'Pending': return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'Cancelled': return <XCircle className="w-4 h-4 text-destructive" />;
        }
    };

    const updateStatus = (id: string, status: Order['status']) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-xl font-semibold text-foreground">Order Management</h2>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        className="w-full bg-secondary/50 border border-border/50 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary"
                    />
                </div>
            </div>

            <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-secondary/30 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {filteredOrders.map(order => (
                                <tr key={order.id} className="hover:bg-secondary/10 transition-colors">
                                    <td className="px-6 py-4 font-medium text-foreground">{order.id}</td>
                                    <td className="px-6 py-4 text-foreground">
                                        <div>{order.customer}</div>
                                        <div className="text-xs text-muted-foreground">{order.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                                    <td className="px-6 py-4 font-semibold text-foreground">${order.total.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            {getStatusIcon(order.status)}
                                            <span className="text-foreground">{order.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <select
                                            value={order.status}
                                            onChange={e => updateStatus(order.id, e.target.value as Order['status'])}
                                            className="bg-secondary/50 border border-border/50 rounded-lg px-2 py-1 text-xs font-medium focus:outline-none focus:border-primary"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
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

export default OrderManagement;
