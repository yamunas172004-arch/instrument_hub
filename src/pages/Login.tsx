import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Music } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedWaves from '@/components/AnimatedWaves';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Login successful!');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <AnimatedWaves />
      </div>

      {/* Login Form - Centered */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-card">
        <div className="text-center mb-8">
          <Music className="h-10 w-10 text-primary mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your MelodyMart account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary/80 text-foreground border border-border/50 focus:border-primary focus:outline-none pr-10 backdrop-blur-sm"
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="rounded border-border accent-primary" />
              Remember me
            </label>
            <a href="#" className="text-primary hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:underline font-medium">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
