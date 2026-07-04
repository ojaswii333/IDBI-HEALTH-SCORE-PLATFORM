import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export default function SecuritySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <section ref={containerRef} className="responsive-padding" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Lock Icon Graphic */}
      <motion.div 
        style={{ position: 'absolute', top: '50%', left: '50%', x: '-50%', y: '-50%', opacity: 0.02, pointerEvents: 'none', color: 'var(--text-primary)' }}
      >
        <Lock size={800} />
      </motion.div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <motion.div style={{ scale, opacity, textAlign: 'center', marginBottom: 80 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 20, background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', marginBottom: 24 }}>
            <ShieldCheck size={32} color="#4ADE80" />
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 24 }}>
            Institutional-grade <br/>security & compliance.
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto' }}>
            We treat your data with the exact same security protocols as IDBI Bank's core banking systems.
          </p>
        </motion.div>

        <div className="responsive-grid-3">
          {[
            { icon: Lock, title: '256-bit Encryption', desc: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256.' },
            { icon: Eye, title: 'Zero Data Retention', desc: 'We only extract required features. We do not store raw bank statements after analysis.' },
            { icon: FileText, title: 'RBI Framework', desc: 'Fully compliant with RBI guidelines on digital lending and explainable AI.' }
          ].map((item, i) => (
            <div key={i} style={{ padding: 32, background: 'var(--bg-app)', borderRadius: 24, border: '1px solid var(--border)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              <item.icon size={28} color="var(--accent)" style={{ marginBottom: 24 }} />
              <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 12 }}>{item.title}</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
