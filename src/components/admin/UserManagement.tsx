import React, { useState, useEffect } from 'react';
import { User, Shield, UserX, UserCheck, MoreVertical, Search, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

interface UserAccount {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    status?: 'Active' | 'Banned';
    profileImage?: string;
    createdAt: string;
}

const UserManagement = () => {
    const { user, updateRole } = useAuth();
    const [users, setUsers] = useState<UserAccount[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users', {
                    headers: {
                        'Authorization': `Bearer ${user?.token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setUsers(data.map((u: any) => ({ ...u, status: 'Active' })));
                } else {
                    toast.error(data.message || 'Failed to fetch users');
                }
            } catch (error) {
                toast.error('Network error while fetching users');
            } finally {
                setLoading(false);
            }
        };

        if (user?.token) {
            fetchUsers();
        }
    }, [user]);

    const changeRole = async (email: string, role: 'admin' | 'user') => {
        const success = await updateRole(email, role);
        if (success) {
            setUsers(prev => prev.map(u => u.email === email ? { ...u, role } : u));
            toast.success(`Role changed to ${role} for ${email}`);
        } else {
            toast.error('Failed to change role');
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div className="p-8 text-muted-foreground text-center">Loading users...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-xl font-semibold text-foreground">User Management</h2>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search users by name/email..."
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
                                <th className="px-6 py-4">Email / Login ID</th>
                                <th className="px-6 py-4">Role Permission</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Joined Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {filteredUsers.map(u => (
                                <tr key={u._id} className="hover:bg-secondary/10 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {u.profileImage ? (
                                                <img src={u.profileImage} alt={u.name} className="w-8 h-8 rounded-full object-cover shadow-sm bg-secondary" />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <User className="w-4 h-4 text-primary" />
                                                </div>
                                            )}
                                            <span className="font-medium text-foreground">{u.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground text-sm">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-3.5 h-3.5" />
                                            {u.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={u.role}
                                            onChange={e => changeRole(u.email, e.target.value as 'admin' | 'user')}
                                            disabled={u.email === user?.email}
                                            className="bg-secondary/50 border border-border/50 rounded-lg p-1 text-xs font-semibold focus:outline-none focus:border-primary disabled:opacity-50"
                                        >
                                            <option value="user">USER</option>
                                            <option value="admin">ADMIN</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tight bg-green-500/10 text-green-500">
                                            {u.status || 'Active'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground text-sm">
                                        {new Date(u.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                        No users found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
