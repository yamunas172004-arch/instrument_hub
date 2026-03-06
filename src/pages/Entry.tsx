import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedWaves from '@/components/AnimatedWaves';

const Entry = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // If the user already logged in previously, automatically redirect them to the homepage
        const savedUser = localStorage.getItem('entryUser');
        if (savedUser) {
            navigate('/home', { replace: true });
        }
    }, [navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !email) {
            toast.error('Please enter both username and email');
            return;
        }

        // Define role based on email containing 'admin'
        const role = email.toLowerCase().includes('admin') ? 'admin' : 'user';

        // Save user info in localStorage
        const userInfo = { username, email, role };
        localStorage.setItem('entryUser', JSON.stringify(userInfo));

        // Save to login history
        const now = new Date();
        const loginTime = now.toISOString().replace('T', ' ').substring(0, 16); // e.g., 2026-03-06 18:00
        const loginRecord = {
            username,
            email,
            role,
            loginTime,
            status: "Active"
        };

        const existingHistoryStr = localStorage.getItem('loginHistory');
        const loginHistory = existingHistoryStr ? JSON.parse(existingHistoryStr) : [];
        loginHistory.unshift(loginRecord); // Add to the top
        localStorage.setItem('loginHistory', JSON.stringify(loginHistory));

        toast.success(`Welcome, ${username}!`);
        navigate('/home', { replace: true });
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-dark">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <AnimatedWaves />
            </div>

            {/* Login Form - Centered */}
            <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-card">
                <div className="text-center mb-8">
                    <Music className="h-10 w-10 text-primary mx-auto mb-3" />
                    <h1 className="text-3xl font-bold text-foreground">MelodyMart</h1>
                    <p className="text-sm text-muted-foreground mt-1">Please log in to enter the store</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-secondary/80 text-foreground border border-border/50 focus:border-primary focus:outline-none backdrop-blur-sm"
                            placeholder="e.g. musiclover99"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-secondary/80 text-foreground border border-border/50 focus:border-primary focus:outline-none backdrop-blur-sm"
                            placeholder="you@example.com"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-6 py-3 mt-4 rounded-lg bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                    >
                        Continue to Store
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Entry;
