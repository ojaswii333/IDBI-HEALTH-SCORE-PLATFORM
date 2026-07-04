import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX - innerWidth / 2);
      mouseY.set(e.clientY - innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const rotateY = useTransform(mouseX, [-800, 800], [-10, 10]);
  const rotateX = useTransform(mouseY, [-400, 400], [10, -10]);

  return (
    <section style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      position: 'relative', 
      overflow: 'hidden',
      background: 'transparent'
    }}>
      <div className="responsive-padding" style={{ width: '100%', maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div className="landing-hero-flex" style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
          
          {/* Left Text Block */}
          <div style={{ flex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
              <div style={{ display: 'inline-block', padding: '8px 16px', background: 'var(--bg-elevated)', borderRadius: 100, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 24, border: '1px solid var(--border)' }}>
                Next-Generation MSME Banking
              </div>
              
              <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 32, color: 'var(--text-primary)' }}>
                Intelligence <br/>
                <span style={{ color: 'var(--text-muted)' }}>that scales </span>
                India.
              </h1>
              
              <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 48, maxWidth: 500, fontWeight: 400 }}>
                A highly secure, AI-driven financial platform designed exclusively to give Indian MSMEs unprecedented visibility and access to institutional credit.
              </p>
              
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <Link to="/login" className="btn btn-primary" style={{ padding: '18px 36px', fontSize: '1rem', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, boxShadow: '0 10px 20px rgba(0, 131, 108, 0.2)' }}>
                  Start Assessment <ArrowRight size={18} />
                </Link>
                <Link to="/login" className="btn btn-secondary" style={{ padding: '18px 32px', fontSize: '1rem', fontWeight: 600, borderRadius: 100, display: 'flex', alignItems: 'center', gap: 8 }}>
                  View Architecture
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right 3D Image Block */}
          <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <motion.div 
              style={{ rotateX, rotateY, perspective: 1000 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <img 
                src="/3d-bank.png" 
                alt="3D Bank Infrastructure" 
                style={{ 
                  width: '100%', 
                  maxWidth: 600, 
                  height: 'auto', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.15))'
                }} 
              />
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
