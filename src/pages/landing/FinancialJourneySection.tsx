import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import IDBILogo from '../../components/IDBILogo';

export default function FinancialJourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="responsive-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', marginBottom: 100, position: 'relative', zIndex: 2 }}>
        <IDBILogo size={48} showText={false} />
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 32, color: 'var(--text-primary)' }}>
          The path to credit <br/>is no longer blind.
        </h2>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'var(--border)', transform: 'translateX(-50%)', display: 'none', '@media (minWidth: 768px)': { display: 'block' } } as any}>
          <motion.div style={{ width: '100%', height: lineHeight, background: 'var(--accent)' }} />
        </div>

        <div className="responsive-flex" style={{ flexDirection: 'column', gap: 60 }}>
          {[
            { step: 1, title: 'Upload Documents', desc: 'Securely transfer your statements and returns into the IDBI enclave.' },
            { step: 2, title: 'AI Standardization', desc: 'Our engine cleanses and standardizes your multi-modal financial data.' },
            { step: 3, title: 'Health Scoring', desc: 'Receive your definitive IDBI Health Score and eligibility report.' },
            { step: 4, title: 'Instant Disbursement', desc: 'Eligible profiles are fast-tracked for immediate credit disbursement.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="card"
              style={{ position: 'relative' }}
            >
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>Phase {item.step}</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 16, color: 'var(--text-primary)' }}>{item.title}</h3>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
