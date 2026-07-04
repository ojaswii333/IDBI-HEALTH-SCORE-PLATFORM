import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  { num: '01', title: 'Seamless Registration', desc: 'Authenticate via Udyam or GSTIN. No massive physical paperwork required.' },
  { num: '02', title: 'Data Synthesis', desc: 'Connect ERPs and Bank Accounts. We extract raw data with absolute privacy.' },
  { num: '03', title: 'AI Processing', desc: 'Our ML pipeline cleans, imputes, and engineers 40+ financial features instantly.' },
  { num: '04', title: 'Intelligence Card', desc: 'View your real-time Financial Health Score and dynamic loan eligibility.' }
];

export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} style={{ padding: '120px 24px', background: '#050505', position: 'relative' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 100 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>The Assessment Pipeline</h2>
        </div>

        <div style={{ position: 'relative', paddingLeft: 40, '@media (minWidth: 768px)': { paddingLeft: 80 } } as any}>
          {/* Animated SVG Line */}
          <div style={{ position: 'absolute', left: 24, top: 20, bottom: 20, width: 2, background: 'var(--border)' }}>
            <motion.div style={{ width: '100%', height: lineHeight, background: 'var(--accent)', originY: 0 }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'relative' }}
              >
                {/* Node indicator */}
                <div style={{ position: 'absolute', left: -46, top: 4, width: 12, height: 12, borderRadius: 6, background: 'var(--bg-app)', border: '2px solid var(--accent)', zIndex: 2 }} />
                
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>{step.num}</div>
                <h3 style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 16 }}>{step.title}</h3>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 500 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
