import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Music } from 'lucide-react';
import { toast } from 'sonner';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success('Account created successfully!');
    navigate('/login');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-2xl bg-card border border-border/50 shadow-card">
        <div className="text-center mb-8">
          <Music className="h-10 w-10 text-primary mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join MelodyMart today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Username</label>
            <input
              type="text"
              value={form.username}
              onChange={update('username')}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary text-foreground border border-border/50 focus:border-primary focus:outline-none"
              placeholder="johndoe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={update('email')}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary text-foreground border border-border/50 focus:border-primary focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={update('password')}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary text-foreground border border-border/50 focus:border-primary focus:outline-none pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={update('confirmPassword')}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary text-foreground border border-border/50 focus:border-primary focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
