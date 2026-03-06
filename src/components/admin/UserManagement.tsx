import React, { useState } from 'react';
import { User, Shield, UserX, UserCheck, MoreVertical, Search, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface UserAccount {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    status: 'Active' | 'Banned';
    joinDate: string;
}

const initialUsers: UserAccount[] = [
    { id: '1', name: 'Admin User', email: 'admin@test.com', role: 'admin', status: 'Active', joinDate: '2026-01-01' },
    { id: '2', name: 'General User', email: 'user@test.com', role: 'user', status: 'Active', joinDate: '2026-02-15' },
    { id: '3', name: 'Rahul Khanna', email: 'rahul@example.com', role: 'user', status: 'Active', joinDate: '2026-03-10' },
    { id: '4', name: 'Sneha Rao', email: 'sneha@example.com', role: 'user', status: 'Banned', joinDate: '2026-03-12' },
];

const UserManagement = () => {
    const [users, setUsers] = useState<UserAccount[]>(initialUsers);
    const [search, setSearch] = useState('');

    const toggleStatus = (id: string) => {
        setUsers(prev => prev.map(u => {
            if (u.id === id) {
                const newStatus = u.status === 'Active' ? 'Banned' : 'Active';
                toast.info(`User identity ${newStatus}`);
                return { ...u, status: newStatus as 'Active' | 'Banned' };
            }
            return u;
        }));
    };

    const changeRole = (id: string, role: 'admin' | 'user') => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
        toast.success(`Role changed to ${role}`);
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-xl font-semibold text-foreground">User Management</h2>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-secondary/50 border border-border/50 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary"
                    />
                </div>
            </div>

            <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-secondary/30 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                                <th className="px-6 py-4">Full Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-secondary/10 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="font-medium text-foreground">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground text-sm">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-3.5 h-3.5" />
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={user.role}
                                            onChange={e => changeRole(user.id, e.target.value as 'admin' | 'user')}
                                            className="bg-secondary/50 border border-border/50 rounded-lg p-1 text-xs font-semibold focus:outline-none focus:border-primary"
                                        >
                                            <option value="user">USER</option>
                                            <option value="admin">ADMIN</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tight
                      ${user.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-destructive/10 text-destructive'}
                    `}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground text-sm">{user.joinDate}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => toggleStatus(user.id)}
                                            className={`p-2 rounded-lg transition-colors
                        ${user.status === 'Active'
                                                    ? 'text-muted-foreground hover:text-destructive hover:bg-destructive/10'
                                                    : 'text-muted-foreground hover:text-green-500 hover:bg-green-500/10'
                                                }
                      `}
                                            title={user.status === 'Active' ? 'Ban User' : 'Unban User'}
                                        >
                                            {user.status === 'Active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                                        </button>
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

export default UserManagement;
