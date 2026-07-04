import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Database, Zap, FileSearch } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Data Ingestion',
    desc: 'Securely connect Udyam, GSTIN, and Bank Statements via account aggregators. Zero physical paperwork.',
    icon: Database
  },
  {
    id: '02',
    title: 'AI Analysis',
    desc: 'Our ensemble models extract thousands of features, impute missing data, and calculate a dynamic health score.',
    icon: Zap
  },
  {
    id: '03',
    title: 'Instant Credit',
    desc: 'Receive immediate, explainable underwriting decisions with full RBI compliance and transparent SHAP values.',
    icon: FileSearch
  }
];

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} style={{ position: 'relative', height: '300vh', background: 'linear-gradient(180deg, #020617 0%, #0891B2 100%)', color: 'white' }}>
      
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div className="responsive-flex" style={{ maxWidth: 1400, margin: '0 auto', width: '100%', padding: '0 24px' }}>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 24, color: 'white' }}>
              Redefining the <br/> underwriting pipeline.
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', maxWidth: 400 }}>
              The IDBI MSME Intelligence platform automatically extracts, standardizes, and scores multi-modal financial data.
            </p>
          </div>

          <div style={{ flex: 1, position: 'relative', height: '60vh', display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: 'rgba(255,255,255,0.1)' }}>
              <motion.div style={{ width: '100%', height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), background: '#22D3EE', originY: 0 }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 60, paddingLeft: 40, width: '100%' }}>
              {steps.map((step, i) => {
                const stepStart = i * 0.33;
                const stepEnd = (i + 1) * 0.33;
                
                const opacity = useTransform(scrollYProgress, 
                  [Math.max(0, stepStart - 0.1), stepStart, stepEnd, Math.min(1, stepEnd + 0.1)], 
                  [0.2, 1, 1, 0.2]
                );
                const x = useTransform(scrollYProgress, 
                  [Math.max(0, stepStart - 0.1), stepStart], 
                  [20, 0]
                );

                return (
                  <motion.div key={i} style={{ opacity, x, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: -46, top: 0, width: 14, height: 14, borderRadius: 7, background: '#020617', border: '2px solid #22D3EE', zIndex: 2 }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#22D3EE', fontFamily: 'var(--font-mono)' }}>{step.id}</div>
                      <step.icon size={24} color="white" />
                    </div>
                    <h3 style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 16, color: 'white' }}>{step.title}</h3>
                    <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
