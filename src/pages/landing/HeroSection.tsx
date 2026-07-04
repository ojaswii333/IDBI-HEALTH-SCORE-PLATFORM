import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Activity, LineChart, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

function LiveHealthCard() {
  const [score, setScore] = useState(300);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  useEffect(() => {
    const dur = 2500, start = 300, end = 842, t0 = Date.now();
    const anim = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 4);
      setScore(Math.round(start + (end - start) * e));
      if (p < 1) requestAnimationFrame(anim);
    };
    setTimeout(() => requestAnimationFrame(anim), 1000);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100, rotateX: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: 420,
        background: 'rgba(24, 24, 27, 0.6)',
        backdropFilter: 'blur(40px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 32,
        padding: 40,
        boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
        position: 'relative',
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        perspective: 1200
      }}
    >
      <div style={{ position: 'absolute', inset: -20, background: 'radial-gradient(circle at 50% 0%, rgba(0, 131, 108, 0.15), transparent 70%)', borderRadius: 'inherit', pointerEvents: 'none' }} />
      
      <div style={{ position: 'relative', zIndex: 2, transform: 'translateZ(30px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--bg-elevated)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BrainCircuit size={20} color="var(--accent)" />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '1rem', letterSpacing: '-0.01em' }}>Intelligence Engine</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Live Assessment</div>
            </div>
          </div>
          <div style={{ padding: '6px 12px', background: 'rgba(34, 197, 94, 0.1)', color: '#4ADE80', borderRadius: 100, fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: '#4ADE80', boxShadow: '0 0 8px #4ADE80' }} />
            Processing
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Dynamic Health Score</div>
          <div style={{ fontSize: '5rem', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.5) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {score}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ padding: 20, background: 'rgba(0,0,0,0.3)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.03)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}><LineChart size={14}/> Pre-approved Limit</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>₹45.5L</div>
          </div>
          <div style={{ padding: 20, background: 'rgba(0,0,0,0.3)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.03)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}><Activity size={14}/> Default Probability</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#4ADE80' }}>1.2%</div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} 
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: -20, right: -40, padding: '12px 20px', background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', transform: 'translateZ(60px)' }}
      >
        <ShieldCheck size={18} color="var(--success)" />
        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>RBI Compliant</span>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      position: 'relative', 
      overflow: 'hidden',
      background: '#000'
    }}>
      
      {/* Cinematic Tech Grid Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div style={{ 
          position: 'absolute', inset: 0, 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          backgroundPosition: 'center center',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
        }} />
        
        {/* Massive blurred IDBI color orbs */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: '10%', right: '20%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,131,108,0.15) 0%, transparent 70%)', filter: 'blur(80px)', transformOrigin: 'center center' }}
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.5, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', bottom: '-10%', left: '10%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,130,32,0.1) 0%, transparent 70%)', filter: 'blur(100px)', transformOrigin: 'center center' }}
        />
      </div>

      <motion.div style={{ y, opacity, width: '100%', position: 'relative', zIndex: 10, paddingTop: 80 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', display: 'flex', flexDirection: 'column', gap: 64, '@media (minWidth: 1024px)': { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' } } as any} className="landing-hero-flex">
          
          <div style={{ flex: 1, maxWidth: 650, zIndex: 10 }}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, marginBottom: 40, fontSize: '0.875rem', fontWeight: 500 }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--success)', boxShadow: '0 0 12px var(--success)' }} />
                The Future of MSME Underwriting
              </div>
              
              <h1 style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 32 }}>
                Intelligence <br/>
                <span style={{ color: 'var(--text-secondary)' }}>that scales </span>
                India.
              </h1>
              
              <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 48, maxWidth: 500, fontWeight: 400 }}>
                A highly secure, AI-driven financial platform designed exclusively to give Indian MSMEs unprecedented visibility and access to institutional credit.
              </p>
              
              <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                <Link to="/login" className="btn btn-primary" style={{ padding: '20px 40px', fontSize: '1rem', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, background: 'white', color: 'black' }}>
                  Start Assessment <ArrowRight size={18} />
                </Link>
                <Link to="/login" style={{ padding: '20px 32px', fontSize: '1rem', fontWeight: 600, color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                  View Architecture
                </Link>
              </div>
            </motion.div>
          </div>

          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
            <LiveHealthCard />
          </div>

        </div>
      </motion.div>
    </section>
  );
}
