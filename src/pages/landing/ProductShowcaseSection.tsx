import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Cpu, FileText, TrendingUp } from 'lucide-react';

export default function ProductShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="responsive-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ textAlign: 'center', marginBottom: 80 }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 24, color: 'var(--text-primary)' }}>
          Engineered for <br/> absolute precision.
        </h2>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
          Experience a suite of AI products built to eliminate manual errors and deliver instantaneous underwriting decisions.
        </p>
      </div>

      <div className="responsive-grid-2" style={{ maxWidth: 1400, margin: '0 auto', alignItems: 'center' }}>
        
        {/* Left: 3D Image */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <motion.div style={{ y: y1 }}>
            <img 
              src="/3d-analytics.png" 
              alt="3D Analytics Dashboard" 
              style={{ width: '100%', maxWidth: 500, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))' }} 
            />
          </motion.div>
        </div>

        {/* Right: Material UI Features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, '@media (minWidth: 1024px)': { paddingLeft: 60 } } as any}>
          {[
            { icon: FileText, title: 'Intelligent Statement Parsing', desc: 'Instantly reads 100s of bank statement formats, parsing millions of rows in seconds without manual intervention.' },
            { icon: TrendingUp, title: 'Behavioral Cashflow Modeling', desc: 'Goes beyond static numbers. Analyzes seasonal dips, recurring obligations, and hidden liabilities.' },
            { icon: Cpu, title: 'Explainable AI Scoring', desc: 'Generates a highly accurate IDBI Health Score. Unlike black-box models, every decision is fully traceable.' }
          ].map((feature, i) => (
            <div key={i} className="card card-interactive" style={{ display: 'flex', gap: 20, padding: 24 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <feature.icon size={24} color="var(--accent)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>{feature.title}</h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
