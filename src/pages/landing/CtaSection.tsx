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
    <section ref={containerRef} className="responsive-padding" style={{ background: 'linear-gradient(135deg, #4C1D95 0%, #E11D48 100%)', position: 'relative', overflow: 'hidden', color: 'white' }}>
      
      {/* Light Mode Glowing Background Core */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(0, 131, 108, 0.15) 0%, transparent 60%)', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(245, 130, 32, 0.1) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <motion.div 
        style={{ scale, opacity, maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}
      >
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 24, color: 'white' }}>
          The standard for <br/> <span style={{ color: 'rgba(255,255,255,0.7)' }}>modern</span> underwriting.
        </h2>
        <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px', lineHeight: 1.6 }}>
          Join the thousands of modern Indian MSMEs scaling their operations using IDBI's sovereign AI architecture.
        </p>
        <div className="responsive-flex" style={{ justifyContent: 'center' }}>
          <Link to="/login" className="btn btn-primary" style={{ padding: '24px 48px', fontSize: '1.125rem', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600, background: '#FFFFFF', color: '#4C1D95', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
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
