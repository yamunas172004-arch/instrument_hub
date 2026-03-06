import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

interface UserData {
    username: string;
    email: string;
}

const UserProfile = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve user data from localStorage defined in the Entry step
        const storedUser = localStorage.getItem('entryUser');
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        } else {
            // Redirect to entry login if not found
            navigate('/', { replace: true });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('entryUser');
        toast.success('Logged out successfully');
        navigate('/', { replace: true });
    };

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-dark">
                <p className="text-muted-foreground">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-full max-w-md p-8 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-card flex flex-col items-center">

                {/* User Avatar Representation */}
                <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6 shadow-md border border-border/50">
                    <User className="w-12 h-12 text-primary" />
                </div>

                <h1 className="text-2xl font-bold text-foreground mb-1">{userData.username}</h1>
                <p className="text-sm text-muted-foreground mb-6">{userData.email}</p>

                {/* Status indicator */}
                <div className="w-full bg-secondary/50 rounded-lg p-4 mb-8 border border-border/30">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">Account Status</span>
                        <div className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Active
                        </div>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-destructive/10 text-destructive font-semibold hover:bg-destructive/20 transition-colors border border-destructive/20"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
