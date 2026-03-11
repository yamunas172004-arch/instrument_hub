import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
  loginProvider: string;
  profileImage?: string;
  createdAt: string;
}

const UserManagement = () => {
  const { user, updateRole } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
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
          setUsers(data);
        } else {
          toast.error(data.message || 'Failed to fetch users');
        }
      } catch (error) {
        toast.error('Network error');
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchUsers();
    }
  }, [user]);

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    const success = await updateRole(userId, newRole);
    if (success) {
      setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
      toast.success('User role updated successfully');
    } else {
      toast.error('Failed to update role');
    }
  };

  if (loading) return <div className="p-8 text-center text-muted-foreground">Loading users...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground font-[family-name:var(--font-display)] text-gradient-gold">User Management</h1>
          <p className="text-muted-foreground mt-2">Manage all registered accounts and their access levels.</p>
        </div>
        <div className="bg-secondary/50 px-4 py-2 rounded-full border border-border/50">
          <span className="text-sm font-medium text-foreground">{users.length} Users Total</span>
        </div>
      </div>

      <div className="bg-card/80 backdrop-blur-xl border border-border/50 shadow-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-secondary/50 text-muted-foreground border-b border-border/50">
                <th className="py-4 px-6 font-medium text-xs uppercase tracking-wider">User</th>
                <th className="py-4 px-6 font-medium text-xs uppercase tracking-wider">Provider</th>
                <th className="py-4 px-6 font-medium text-xs uppercase tracking-wider">Role</th>
                <th className="py-4 px-6 font-medium text-xs uppercase tracking-wider">Joined</th>
                <th className="py-4 px-6 font-medium text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-secondary/20 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden border border-border/50">
                        <img src="/avatar-placeholder.png" alt={u.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${u.loginProvider === 'google' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'}`}>
                      {u.loginProvider}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${u.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-muted-foreground">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleUpdate(u._id, e.target.value)}
                      disabled={u._id === user?.id}
                      className="bg-card text-foreground border border-border/50 rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 appearance-none cursor-pointer"
                    >
                      <option value="user">Assign User</option>
                      <option value="admin">Assign Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground">
                    No users found in the system.
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
