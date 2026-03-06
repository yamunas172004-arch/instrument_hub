import { Link } from 'react-router-dom';
import { ArrowRight, Guitar, Piano, Drum, Music, Star, Headphones } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import heroBanner from '@/assets/hero-banner.jpg';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const featuredProducts = products.filter(p => p.featured);

const categories = [
  { name: 'Guitars', icon: Guitar, count: products.filter(p => p.category === 'Guitar').length },
  { name: 'Pianos', icon: Piano, count: products.filter(p => p.category === 'Piano').length },
  { name: 'Drums', icon: Drum, count: products.filter(p => p.category === 'Drums').length },
];

const floatingNotes = ['♩', '♪', '♫', '♬', '𝄞', '♩', '♪'];

const stats = [
  { value: '500+', label: 'Instruments' },
  { value: '50K+', label: 'Happy Musicians' },
  { value: '4.9★', label: 'Avg Rating' },
];

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* ─── Hero Section ─── */}
      <section ref={heroRef} className="relative h-[92vh] min-h-[600px] overflow-hidden">

        {/* Parallax background */}
        <img
          src={heroBanner}
          alt="Premium musical instruments"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-75 ease-out"
          style={{ transform: `scale(1.08) translateY(${scrollY * 0.25}px)` }}
        />

        {/* Layered gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

        {/* Floating animated music notes */}
        {floatingNotes.map((note, i) => (
          <span
            key={i}
            className="absolute select-none pointer-events-none text-2xl opacity-0"
            style={{
              left: `${8 + i * 13}%`,
              bottom: `${18 + (i % 3) * 12}%`,
              color: `hsl(38, 90%, ${50 + i * 4}%)`,
              animation: `floatNote ${3.5 + i * 0.6}s ease-in-out ${i * 0.4}s infinite`,
              fontSize: `${1.2 + (i % 3) * 0.5}rem`,
              filter: 'drop-shadow(0 0 8px hsl(38,90%,55%,0.6))',
            }}
          >
            {note}
          </span>
        ))}

        {/* Ambient glow blob */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, hsla(38,90%,55%,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Content */}
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center pt-12">

          {/* Badge pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm w-fit mb-6 animate-fade-in">
            <Music className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">Premium Music Store</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-5 max-w-3xl leading-[1.1] tracking-tight">
            Find Your
            <br />
            Perfect{' '}
            <span
              className="text-gradient-gold relative inline-block"
              style={{ textShadow: '0 0 60px hsla(38,90%,55%,0.3)' }}
            >
              Sound
              {/* Underline accent */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6 Q50 2 100 5 Q150 8 198 3"
                  stroke="url(#goldStroke)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="goldStroke" x1="0" y1="0" x2="200" y2="0">
                    <stop offset="0%" stopColor="hsl(38,90%,55%)" />
                    <stop offset="100%" stopColor="hsl(30,70%,45%)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
            Premium instruments for every musician. From beginner to virtuoso,
            discover quality that truly <em className="text-foreground/80 not-italic font-medium">resonates</em>.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <Link
              to="/instruments"
              id="hero-browse-btn"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:scale-105 hover:shadow-[0_8px_32px_-4px_hsla(38,90%,55%,0.5)] transition-all duration-300"
            >
              Browse Instruments
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/instruments"
              id="hero-explore-btn"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm text-foreground font-semibold hover:border-primary/40 hover:bg-card/70 transition-all duration-300"
            >
              <Headphones className="h-4 w-4 text-primary" />
              Explore Deals
            </Link>
          </div>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border/40"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <Star className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <p className="text-base font-bold text-foreground leading-none">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


      </section>

      {/* Floating note keyframe injected via style tag */}
      <style>{`
        @keyframes floatNote {
          0%   { opacity: 0; transform: translateY(0px) rotate(-5deg); }
          15%  { opacity: 0.6; }
          50%  { opacity: 0.35; transform: translateY(-55px) rotate(8deg); }
          85%  { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(-110px) rotate(-5deg); }
        }
        @keyframes animate-fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: animate-fade-in 0.7s ease forwards; }
      `}</style>

      {/* ─── Categories ─── */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-foreground mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(cat => (
            <Link
              key={cat.name}
              to={`/instruments?category=${cat.name.replace('s', '')}`}
              className="group flex items-center gap-4 p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-gold hover:-translate-y-1"
            >
              <div className="p-3 rounded-lg bg-gradient-gold shadow-gold group-hover:scale-110 transition-transform duration-300">
                <cat.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">{cat.count} products</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Featured Products ─── */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">Featured Instruments</h2>
          <Link to="/instruments" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;

