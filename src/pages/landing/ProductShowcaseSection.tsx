import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Activity, ShieldAlert, Zap } from 'lucide-react';

export default function ProductShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={containerRef} style={{ padding: '160px 24px', background: 'var(--bg-app)', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ textAlign: 'center', marginBottom: 120 }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 24 }}>
          A dashboard that <br/> thinks for you.
        </h2>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto' }}>
          Stop wrestling with messy spreadsheets. Our platform synthesizes your raw data into a beautiful, actionable intelligence hub.
        </p>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 40, alignItems: 'center' }}>
        
        {/* Left Column - Floating Mockups */}
        <div style={{ position: 'relative', height: 600, display: 'flex', gap: 24, justifyContent: 'center' }}>
          <motion.div style={{ y: y1, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ width: 280, height: 320, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 24, padding: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Activity size={20} color="#4ADE80" />
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Revenue Velocity</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 20 }}>+24.8%</div>
              {/* Fake chart */}
              <div style={{ display: 'flex', gap: 8, height: 80, alignItems: 'flex-end' }}>
                {[40, 70, 45, 90, 60, 100].map((h, i) => (
                  <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} style={{ flex: 1, background: 'var(--accent)', borderRadius: 4 }} />
                ))}
              </div>
            </div>
            
            <div style={{ width: 280, height: 200, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 24, padding: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 16 }}>Missing Data Imputation</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <Zap size={16} color="var(--accent)" />
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>GST Returns Estimated</span>
              </div>
              <div style={{ height: 4, background: 'var(--bg-elevated)', borderRadius: 2, overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} viewport={{ once: true }} transition={{ duration: 1 }} style={{ height: '100%', background: 'var(--accent)' }} />
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: y2, display: 'flex', flexDirection: 'column', gap: 24, marginTop: 80 }}>
            <div style={{ width: 280, height: 260, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 24, padding: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
               <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <ShieldAlert size={20} color="#EF4444" />
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 8 }}>Anomaly Detection</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#EF4444', marginBottom: 12 }}>2 Irregular Transactions</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Isolation Forest model flagged unusual vendor payouts in Q3.</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Text */}
        <div style={{ padding: '0 24px' }}>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 24 }}>Everything you need, <br/>nothing you don't.</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 8 }}>Interactive Intelligence</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Click into any metric to see exactly how our AI calculated it using SHAP values.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 8 }}>Real-time Sync</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Connect your accounts once. We automatically pull and analyze new transactions nightly.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 8 }}>Bank-grade Security</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Hosted on IDBI's sovereign cloud infrastructure. Your data never leaves the encrypted perimeter.</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
