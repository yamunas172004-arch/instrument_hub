import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Music } from 'lucide-react';
import { GoogleLogin } from "@react-oauth/google";

const floatingNotes = ['♩', '♪', '♫', '♬', '𝄞', '♩', '♪', '♫'];

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();



  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
      const data = await response.json();
      if (response.ok) {
        login(data);
        toast.success(`Welcome, ${data.name}!`);
        navigate(data.role === 'admin' ? '/admin-dashboard' : '/home');
      } else {
        toast.error(data.message || 'Google login failed');
      }
    } catch {
      toast.error('Network error. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-dark">

      {/* ── Ambient glow orbs using site's gold/warm palette ── */}
      <div
        className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'hsla(38, 90%, 55%, 0.07)', filter: 'blur(100px)', animation: 'pulseGlow 6s ease-in-out infinite' }}
      />
      <div
        className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'hsla(30, 70%, 45%, 0.08)', filter: 'blur(100px)', animation: 'pulseGlow 8s ease-in-out infinite', animationDelay: '2s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsla(38,90%,55%,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      {/* ── Fine grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(40,20%,90%) 1px, transparent 1px), linear-gradient(90deg, hsl(40,20%,90%) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* ── Floating music notes  (same as Index.tsx) ── */}
      {floatingNotes.map((note, i) => (
        <span
          key={i}
          className="absolute select-none pointer-events-none opacity-0"
          style={{
            left: `${5 + i * 12}%`,
            bottom: `${20 + (i % 4) * 10}%`,
            color: `hsl(38, 90%, ${50 + i * 3}%)`,
            animation: `floatNote ${4 + i * 0.7}s ease-in-out ${i * 0.5}s infinite`,
            fontSize: `${1.1 + (i % 3) * 0.4}rem`,
            filter: 'drop-shadow(0 0 8px hsla(38,90%,55%,0.5))',
          }}
        >
          {note}
        </span>
      ))}

      {/* ── Card ── */}
      <div className="relative z-10 w-full max-w-sm mx-4">
        {/* Glow ring behind the card */}
        <div
          className="absolute -inset-px rounded-2xl pointer-events-none"
          style={{ background: 'linear-gradient(135deg, hsla(38,90%,55%,0.25), hsla(30,70%,45%,0.1), transparent)', borderRadius: 'inherit', filter: 'blur(1px)' }}
        />

        <div className="relative rounded-2xl bg-card/80 border border-border/50 backdrop-blur-xl shadow-card p-10 flex flex-col items-center gap-7">

          {/* Logo */}
          <div className="flex flex-col items-center gap-3">
            {/* Icon with gold glow */}
            <div className="relative">
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{ background: 'hsla(38,90%,55%,0.35)', filter: 'blur(14px)', transform: 'scale(1.3)' }}
              />
              <div className="relative w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                <Music className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>

            {/* Brand name */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gradient-gold font-[family-name:var(--font-display)] tracking-wide">
                MelodyMart
              </h1>
              <p className="text-[11px] text-muted-foreground mt-1 tracking-[0.2em] uppercase">
                Instrument Hub
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            className="w-full h-px"
            style={{ background: 'linear-gradient(to right, transparent, hsl(20,10%,20%), transparent)' }}
          />

          {/* Sign-in text + Google button */}
          <div className="flex flex-col items-center gap-4 w-full">
            <p className="text-sm text-muted-foreground text-center">
              Sign in to access your store
            </p>

            <div className="w-full flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error('Google Login failed')}
                width="100%"
                theme="filled_black"
                shape="pill"
                size="large"
                text="continue_with"
              />
            </div>
          </div>

          {/* Footer */}
          <p className="text-[10px] text-muted-foreground/50 text-center leading-relaxed">
            By signing in you agree to our{' '}
            <span className="text-primary/60 hover:text-primary cursor-pointer transition-colors">Terms</span>
            {' '}&amp;{' '}
            <span className="text-primary/60 hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>.
          </p>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes floatNote {
          0%   { opacity: 0; transform: translateY(0px) rotate(-5deg); }
          15%  { opacity: 0.55; }
          50%  { opacity: 0.3;  transform: translateY(-60px) rotate(8deg); }
          85%  { opacity: 0.55; }
          100% { opacity: 0;   transform: translateY(-120px) rotate(-5deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default Login;
