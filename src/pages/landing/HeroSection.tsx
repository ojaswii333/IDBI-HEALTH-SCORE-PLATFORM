import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit } from 'lucide-react';

// Isometric 3D Mockup
function IsometricDashboard() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Inverse rotation for isometric feel
  const rotateX = useTransform(mouseY, [-300, 300], [20, 40]);
  const rotateY = useTransform(mouseX, [-300, 300], [-30, -10]);
  const rotateZ = useTransform(mouseX, [-300, 300], [5, 15]);

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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        maxWidth: 500,
        aspectRatio: '4/3',
        position: 'relative',
        perspective: 2000,
        margin: '0 auto'
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          borderRadius: 24,
          boxShadow: '0 50px 100px -20px rgba(0,0,0,0.15), 0 30px 60px -30px rgba(0,131,108,0.15)',
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
          rotateZ,
          display: 'flex',
          flexDirection: 'column',
          padding: 24
        }}
      >
        {/* Fake UI Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, transform: 'translateZ(20px)' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: '#EF4444' }} />
            <div style={{ width: 12, height: 12, borderRadius: 6, background: '#F59E0B' }} />
            <div style={{ width: 12, height: 12, borderRadius: 6, background: '#10B981' }} />
          </div>
          <div style={{ padding: '4px 12px', background: 'var(--bg-elevated)', borderRadius: 100, fontSize: '0.625rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            idbi-intelligence.app
          </div>
        </div>

        {/* Fake UI Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, transform: 'translateZ(40px)' }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1, background: 'var(--bg-surface)', borderRadius: 16, padding: 16, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', marginBottom: 4 }}>Health Score</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)' }}>842</div>
            </div>
            <div style={{ flex: 1, background: 'var(--bg-surface)', borderRadius: 16, padding: 16, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', marginBottom: 4 }}>Credit Limit</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹45.5L</div>
            </div>
          </div>
          
          <div style={{ flex: 2, background: 'var(--bg-surface)', borderRadius: 16, padding: 16, border: '1px solid var(--border)', display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            {[40, 70, 45, 90, 60, 100, 80, 50].map((h, i) => (
              <motion.div 
                key={i} 
                initial={{ height: 0 }} 
                animate={{ height: `${h}%` }} 
                transition={{ duration: 1, delay: 1 + (i * 0.1) }} 
                style={{ flex: 1, background: i === 5 ? 'var(--accent)' : 'var(--bg-muted)', borderRadius: 4 }} 
              />
            ))}
          </div>
        </div>
        
        {/* Floating Abstract Element */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: -30, right: -40, padding: '16px', background: 'white', border: '1px solid var(--border)', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', transform: 'translateZ(80px)' }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(0, 131, 108, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BrainCircuit size={20} color="var(--accent)" />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>AI Analysis</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>Complete</div>
          </div>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      position: 'relative', 
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #09090B 0%, #00836C 50%, #4C1D95 100%)'
    }}>
      
      {/* Dynamic Light Overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div style={{ 
          position: 'absolute', inset: 0, 
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
        }} />
      </div>

      <motion.div style={{ y, opacity, width: '100%', position: 'relative', zIndex: 10, paddingTop: 100 }}>
        <div className="responsive-flex" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
          
          <div style={{ flex: 1, maxWidth: 650, zIndex: 10 }}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 100, marginBottom: 40, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--success)', boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)' }} />
                Premium Platinum UI
              </div>
              
              <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 32, color: '#FFFFFF' }}>
                Intelligence <br/>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>that scales </span>
                India.
              </h1>
              
              <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, marginBottom: 48, maxWidth: 500, fontWeight: 400 }}>
                A highly secure, AI-driven financial platform designed exclusively to give Indian MSMEs unprecedented visibility and access to institutional credit.
              </p>
              
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <Link to="/login" className="btn btn-primary" style={{ padding: '18px 36px', fontSize: '1rem', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, background: '#FFFFFF', color: '#09090B', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                  Start Assessment <ArrowRight size={18} />
                </Link>
                <Link to="/login" style={{ padding: '18px 32px', fontSize: '1rem', fontWeight: 600, color: '#FFFFFF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 100, backdropFilter: 'blur(10px)' }}>
                  View Architecture
                </Link>
              </div>
            </motion.div>
          </div>

          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10, width: '100%' }}>
            <IsometricDashboard />
          </div>

        </div>
      </motion.div>
    </section>
  );
}
