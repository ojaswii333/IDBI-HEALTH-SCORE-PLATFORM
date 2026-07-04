import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Activity, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

const backgrounds = ['/bg-1.png', '/bg-2.png', '/bg-3.png'];

// Staggered text component for premium reveal
function StaggeredText({ text, highlightWord }: { text: string, highlightWord?: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => {
        const isHighlight = highlightWord && word.includes(highlightWord);
        const cleanWord = word.replace('<br/>', '');
        return (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: word.includes('<br>') ? 0 : '0.3em' }}>
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                display: 'inline-block', 
                color: isHighlight ? 'var(--accent-secondary)' : 'inherit' 
              }}
            >
              {cleanWord}
            </motion.span>
            {word.includes('<br/>') && <br/>}
          </span>
        );
      })}
    </>
  );
}

function LiveHealthCard() {
  const [score, setScore] = useState(300);
  
  useEffect(() => {
    const dur = 2000, start = 300, end = 782, t0 = Date.now();
    const anim = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 4); // easeOutQuart
      setScore(Math.round(start + (end - start) * e));
      if (p < 1) requestAnimationFrame(anim);
    };
    // Delay start for cinematic effect
    setTimeout(() => requestAnimationFrame(anim), 800);
  }, []);

  const pct = ((score - 300) / 600) * 100;
  const circ = 2 * Math.PI * 80;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: 340,
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 24,
        padding: 32,
        boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
        position: 'relative',
        transformStyle: 'preserve-3d'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={16} color="white" />
          </div>
          <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>AI Health Score</span>
        </div>
        <div style={{ padding: '4px 10px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ADE80', borderRadius: 100, fontSize: '0.6875rem', fontWeight: 600 }}>
          Excellent
        </div>
      </div>

      <div style={{ position: 'relative', width: 180, height: 180, margin: '0 auto 32px' }}>
        <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="90" cy="90" r="80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
          <circle cx="90" cy="90" r="80" fill="none" stroke="var(--info)" strokeWidth="12"
            strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ - (pct / 100) * circ}
            style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>{score}</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>out of 900</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, padding: 16, background: 'rgba(0,0,0,0.2)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Credit Limit</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>₹24.5L</div>
        </div>
        <div style={{ flex: 1, padding: 16, background: 'rgba(0,0,0,0.2)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Default Risk</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#4ADE80' }}>Low</div>
        </div>
      </div>
      
      {/* Floating Badges */}
      <motion.div 
        animate={{ y: [0, -10, 0] }} 
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: 40, right: -40, padding: '10px 16px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 8, boxShadow: 'var(--shadow-lg)' }}
      >
        <ShieldCheck size={16} color="var(--success)" />
        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>RBI Ready</span>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
        style={{ position: 'absolute', bottom: 60, left: -50, padding: '10px 16px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 8, boxShadow: 'var(--shadow-lg)' }}
      >
        <TrendingUp size={16} color="var(--accent)" />
        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>+42 Points YoY</span>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      position: 'relative', 
      overflow: 'hidden',
      background: '#050505'
    }}>
      
      {/* Background Slideshow */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={bgIndex}
            src={backgrounds[bgIndex]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
            alt="Enterprise Banking Background"
          />
        </AnimatePresence>
        {/* Gradients to ensure text readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,5,1) 0%, rgba(5,5,5,0.4) 50%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(0, 131, 108, 0.2), transparent 40%), radial-gradient(circle at bottom left, rgba(245, 130, 32, 0.15), transparent 40%)' }} />
        
        {/* Floating Glass Orbs */}
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, -40, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: '10%', right: '15%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,131,108,0.4) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 1 }}
        />
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 50, 0], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', bottom: '20%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,130,32,0.2) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 1 }}
        />
      </div>

      <motion.div style={{ y, opacity, width: '100%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px', display: 'flex', gap: 64 }} className="landing-hero-flex">
          
          <div style={{ flex: 1, maxWidth: 600, zIndex: 10 }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, marginBottom: 32, fontSize: '0.8125rem', fontWeight: 500, backdropFilter: 'blur(10px)' }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--success)', boxShadow: '0 0 10px var(--success)' }} />
                IDBI Digital Transformation 2.0
              </div>
              <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 24, display: 'flex', flexWrap: 'wrap' }}>
                <StaggeredText text="Intelligent banking for the ambitious." highlightWord="ambitious." />
              </h1>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 48, maxWidth: 500 }}>
                A highly secure, AI-driven financial platform designed exclusively to give Indian MSMEs unprecedented visibility and access to credit.
              </p>
              
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <Link to="/login" className="btn btn-primary btn-lg" style={{ padding: '18px 36px', fontSize: '1rem', borderRadius: 12, boxShadow: '0 8px 24px rgba(245, 130, 32, 0.25)' }}>
                  Enter Platform <ArrowRight size={18} />
                </Link>
                <Link to="/login" className="btn btn-ghost btn-lg" style={{ padding: '18px 24px', fontSize: '1rem', color: 'var(--text-primary)' }}>
                  Read the manifest
                </Link>
              </div>
            </motion.div>
          </div>

          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
            <LiveHealthCard />
          </div>

        </div>
      </motion.div>
      
      {/* Abstract Background Elements */}
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '50%', background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.2))', zIndex: 1, pointerEvents: 'none' }} />
    </section>
  );
}
