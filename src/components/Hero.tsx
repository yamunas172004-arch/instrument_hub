import { Link } from 'react-router-dom';
import { ArrowRight, Music, Star, Headphones, Play, TrendingUp } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import heroBanner from '@/assets/hero-banner.jpg';

/* ─── Data ─────────────────────────────────────────────── */
const NOTES = ['♩', '♪', '♫', '♬', '𝄞', '♭', '♮'];

const STATS = [
  { value: '500+',  label: 'Instruments',      icon: Music },
  { value: '50K+',  label: 'Happy Musicians',  icon: TrendingUp },
  { value: '4.9★',  label: 'Avg Rating',       icon: Star },
];

/* Waveform bar heights – decorative only */
const BARS = [0.4, 0.7, 0.5, 0.9, 0.6, 1.0, 0.75, 0.55, 0.8, 0.45, 0.65, 0.9, 0.5, 0.7, 0.4];

/* ─── Component ─────────────────────────────────────────── */
const Hero = () => {
  const [scrollY, setScrollY]   = useState(0);
  const [mounted, setMounted]   = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /* mount trigger for staggered entrance */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  /* parallax */
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="hero-root relative h-[96vh] min-h-[640px] overflow-hidden"
      >

        {/* ── 1. Cinematic Background ──────────────────────── */}
        <img
          src={heroBanner}
          alt="Premium musical instruments"
          className="hero-bg absolute inset-0 w-full h-full object-cover"
          style={{ transform: `scale(1.1) translateY(${scrollY * 0.22}px)` }}
        />

        {/* Film-grain noise overlay */}
        <div className="hero-grain absolute inset-0 pointer-events-none" />

        {/* Rich multi-layer gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t  from-background via-background/65 to-background/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r  from-background/90 via-background/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/40 pointer-events-none" />

        {/* ── 2. Ambient Glow Orbs ─────────────────────────── */}
        <div
          className="hero-orb absolute pointer-events-none"
          style={{
            top: '20%', left: '5%',
            width: 520, height: 320,
            background: 'radial-gradient(ellipse, hsla(38,90%,55%,0.13) 0%, transparent 72%)',
            filter: 'blur(50px)',
            animation: 'orbPulse 6s ease-in-out infinite',
          }}
        />
        <div
          className="hero-orb absolute pointer-events-none"
          style={{
            bottom: '15%', right: '8%',
            width: 360, height: 240,
            background: 'radial-gradient(ellipse, hsla(30,70%,45%,0.10) 0%, transparent 70%)',
            filter: 'blur(40px)',
            animation: 'orbPulse 8s ease-in-out 2s infinite',
          }}
        />

        {/* ── 3. Floating Music Notes ──────────────────────── */}
        {NOTES.map((note, i) => (
          <span
            key={i}
            className="absolute select-none pointer-events-none"
            style={{
              left: `${6 + i * 13}%`,
              bottom: `${16 + (i % 4) * 10}%`,
              color: `hsl(38, 90%, ${48 + i * 5}%)`,
              fontSize: `${1.1 + (i % 3) * 0.55}rem`,
              opacity: 0,
              filter: `drop-shadow(0 0 10px hsla(38,90%,55%,0.55))`,
              animation: `floatNote ${4 + i * 0.55}s ease-in-out ${i * 0.45}s infinite`,
            }}
          >
            {note}
          </span>
        ))}

        {/* ── 4. Waveform Visualizer ───────────────────────── */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-[3px] px-8 pointer-events-none"
          style={{ height: 90, opacity: 0.18 }}
        >
          {BARS.map((h, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: '100%',
                maxWidth: 14,
                height: `${h * 100}%`,
                background: `hsl(38, 90%, ${50 + i * 2}%)`,
                animation: `waveBar ${1.2 + (i % 5) * 0.3}s ease-in-out ${i * 0.1}s infinite alternate`,
              }}
            />
          ))}
        </div>

        {/* ── 5. Hero Content ──────────────────────────────── */}
        <div className="relative container mx-auto px-6 h-[96vh] flex flex-col justify-center">

          {/* Badge */}
          <div
            className="hero-stagger inline-flex items-center gap-2.5 px-4 py-2 rounded-full
              border border-primary/40 bg-primary/10 backdrop-blur-md w-fit mb-7"
            style={{ transitionDelay: '0ms', opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(18px)' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <Music className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-bold text-primary tracking-[0.18em] uppercase">
              Premium Music Store
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-stagger text-5xl sm:text-6xl md:text-[82px] font-bold text-foreground
              mb-6 max-w-[820px] leading-[1.02] tracking-[-0.02em]"
            style={{
              fontFamily: 'var(--font-display)',
              transitionDelay: '80ms',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(22px)',
            }}
          >
            Find Your
            <br />
            Perfect{' '}
            <span className="hero-gold-word relative inline-block">
              Sound
              {/* Animated underline */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 280 10"
                fill="none"
              >
                <path
                  d="M2 7 Q70 2 140 6 Q210 10 278 4"
                  stroke="url(#gStroke)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="hero-underline-path"
                />
                <defs>
                  <linearGradient id="gStroke" x1="0" y1="0" x2="280" y2="0">
                    <stop offset="0%"   stopColor="hsl(38,90%,65%)" />
                    <stop offset="100%" stopColor="hsl(30,70%,45%)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="hero-stagger text-lg md:text-xl text-muted-foreground max-w-[520px] mb-10 leading-[1.7]"
            style={{ transitionDelay: '160ms', opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)' }}
          >
            Premium instruments for every musician — from curious beginner to seasoned virtuoso.
            Discover quality that truly{' '}
            <em className="not-italic font-semibold text-foreground/85">resonates.</em>
          </p>

          {/* CTA Buttons */}
          <div
            className="hero-stagger flex flex-wrap items-center gap-4 mb-14"
            style={{ transitionDelay: '240ms', opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(18px)' }}
          >
            {/* Primary CTA */}
            <Link
              to="/instruments"
              id="hero-browse-btn"
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl
                bg-gradient-gold text-primary-foreground font-bold text-sm
                shadow-gold overflow-hidden
                hover:scale-[1.04] hover:shadow-[0_10px_40px_-6px_hsla(38,90%,55%,0.55)]
                active:scale-[0.98] transition-all duration-300"
            >
              {/* Shimmer */}
              <span className="hero-shimmer" />
              Browse Instruments
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>

            {/* Secondary CTA */}
            <Link
              to="/instruments"
              id="hero-explore-btn"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl
                border border-border/50 bg-card/30 backdrop-blur-md
                text-foreground font-semibold text-sm
                hover:border-primary/50 hover:bg-card/55 hover:scale-[1.02]
                active:scale-[0.98] transition-all duration-300"
            >
              <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15">
                <Headphones className="h-3.5 w-3.5 text-primary" />
              </span>
              Explore Deals
            </Link>

            {/* Play button (decorative) */}
            <button
              aria-label="Watch video"
              className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground
                transition-colors duration-200 text-sm font-medium"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full
                border border-border/60 bg-card/40 backdrop-blur-sm
                group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-300">
                <Play className="h-3.5 w-3.5 text-primary fill-primary ml-0.5" />
              </span>
              Watch Story
            </button>
          </div>

          {/* Stat Cards */}
          <div
            className="hero-stagger flex flex-wrap gap-3"
            style={{ transitionDelay: '320ms', opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(16px)' }}
          >
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="hero-stat-card group flex items-center gap-3 px-5 py-3.5 rounded-2xl
                    bg-card/40 backdrop-blur-md border border-border/40
                    hover:border-primary/35 hover:bg-card/60
                    hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15 shrink-0
                    group-hover:bg-primary/25 transition-colors duration-300">
                    <Icon className="h-4 w-4 text-primary" />
                  </span>
                  <div>
                    <p className="text-base font-extrabold text-foreground leading-none tracking-tight">
                      {s.value}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">{s.label}</p>
                  </div>
                </div>
              );
            })}

            {/* Trusted-by micro-strip */}
            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl
              border border-border/30 bg-card/25 backdrop-blur-md self-center">
              <div className="flex -space-x-2">
                {['#c8a84b', '#b87333', '#d4a017', '#8b6914'].map((c, i) => (
                  <span
                    key={i}
                    className="h-7 w-7 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold"
                    style={{ background: c, color: '#0a0604' }}
                  >
                    {['J','M','A','R'][i]}
                  </span>
                ))}
              </div>
              <span className="text-[11px] text-muted-foreground font-medium pl-1">
                Loved by <span className="text-foreground font-bold">50,000+</span> artists
              </span>
            </div>
          </div>
        </div>

        {/* ── 6. Bottom Fade ───────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* ══════════════════════════════════════════════════════
          KEYFRAMES + COMPONENT STYLES
      ══════════════════════════════════════════════════════ */}
      <style>{`

        /* Smooth parallax image */
        .hero-bg {
          will-change: transform;
          transition: transform 0.06s linear;
        }

        /* Film-grain noise */
        .hero-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          opacity: 0.03;
          mix-blend-mode: overlay;
        }

        /* Entrance animation helper */
        .hero-stagger {
          transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1),
                      transform 0.65s cubic-bezier(0.16,1,0.3,1);
        }

        /* Gold headline word */
        .hero-gold-word {
          background: linear-gradient(135deg, hsl(38,90%,68%), hsl(30,70%,50%));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 48px hsla(38,90%,55%,0.28));
        }

        /* Animated SVG underline draw-in */
        .hero-underline-path {
          stroke-dasharray: 320;
          stroke-dashoffset: 320;
          animation: drawLine 1.1s cubic-bezier(0.16,1,0.3,1) 0.55s forwards;
        }

        /* Primary button shimmer sweep */
        .hero-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%);
          background-size: 200% 100%;
          animation: shimmerSweep 2.8s ease-in-out infinite;
        }

        /* ── Keyframes ─────────────────────────── */
        @keyframes floatNote {
          0%   { opacity: 0;    transform: translateY(0)    rotate(-6deg);  }
          12%  { opacity: 0.55; }
          50%  { opacity: 0.3;  transform: translateY(-60px) rotate(9deg);  }
          88%  { opacity: 0.55; }
          100% { opacity: 0;    transform: translateY(-120px) rotate(-6deg); }
        }

        @keyframes orbPulse {
          0%,100% { transform: scale(1) translate(0,0); opacity: 1; }
          50%      { transform: scale(1.12) translate(8px,-8px); opacity: 0.75; }
        }

        @keyframes waveBar {
          from { transform: scaleY(0.55); }
          to   { transform: scaleY(1); }
        }

        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }

        @keyframes shimmerSweep {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
};

export default Hero;
