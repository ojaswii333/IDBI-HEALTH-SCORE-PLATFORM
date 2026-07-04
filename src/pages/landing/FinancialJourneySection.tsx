import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import IDBILogo from '../../components/IDBILogo';

export default function FinancialJourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="responsive-padding" style={{ background: 'var(--bg-surface)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', marginBottom: 100 }}>
        <IDBILogo size={48} showText={false} />
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 32 }}>
          The path to credit <br/>is no longer blind.
        </h2>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative', paddingLeft: 40 }}>
        <div style={{ position: 'absolute', left: 24, top: 0, bottom: 0, width: 2, background: 'var(--bg-elevated)' }}>
          <motion.div style={{ width: '100%', height: lineHeight, background: 'var(--accent)', originY: 0 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 120 }}>
          {[
            { step: '01', title: 'Connect Accounts', desc: 'Securely link your current accounts via the Account Aggregator network.' },
            { step: '02', title: 'Extract Intelligence', desc: 'Our ML pipeline identifies cash flow consistency, vendor relationships, and recurring revenue.' },
            { step: '03', title: 'Generate Health Card', desc: 'Instantly view your MSME Financial Health Score, fully explained and transparent.' },
            { step: '04', title: 'Access Capital', desc: 'Unlock pre-approved working capital limits based exclusively on your actual operational health.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              style={{ position: 'relative', background: 'var(--bg-app)', padding: 32, borderRadius: 24, border: '1px solid var(--border)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}
            >
              <div style={{ position: 'absolute', left: -46 - 32, top: 40, width: 14, height: 14, borderRadius: 7, background: 'var(--bg-app)', border: '2px solid var(--accent)' }} />
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>Phase {item.step}</div>
              <h3 style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 16 }}>{item.title}</h3>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
