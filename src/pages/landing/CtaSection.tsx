import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

export default function CtaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={containerRef} style={{ padding: '200px 24px', background: '#050505', position: 'relative', overflow: 'hidden' }}>
      
      {/* Cinematic Glowing Background Core */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(0, 131, 108, 0.15) 0%, transparent 60%)', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(245, 130, 32, 0.1) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <motion.div 
        style={{ scale, opacity, maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}
      >
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 32 }}>
          Deploy the future <br/>of your business.
        </h2>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px', lineHeight: 1.6 }}>
          Join the thousands of modern Indian MSMEs scaling their operations using IDBI's sovereign AI architecture.
        </p>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center' }}>
          <Link to="/login" className="btn btn-primary" style={{ padding: '24px 48px', fontSize: '1.125rem', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600, background: 'white', color: 'black', boxShadow: '0 20px 40px rgba(255,255,255,0.1)' }}>
            Start Assessment <ArrowRight size={20} />
          </Link>
          <Link to="/login" style={{ padding: '24px 32px', fontSize: '1.125rem', fontWeight: 600, color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            Talk to an Expert
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
