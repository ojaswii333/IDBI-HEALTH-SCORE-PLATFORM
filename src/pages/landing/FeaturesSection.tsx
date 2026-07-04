import { motion } from 'framer-motion';
import { DatabaseZap, Target, GitMerge, FileCheck } from 'lucide-react';

const capabilities = [
  {
    icon: DatabaseZap,
    title: 'Alternate Data Processing',
    desc: 'Connect GST, UPI, and bank statements. Our engine synthesizes unstructured data into actionable financial metrics instantly.'
  },
  {
    icon: Target,
    title: 'Precision Underwriting',
    desc: 'Powered by an ensemble of LightGBM and XGBoost, achieving 94% accuracy in predicting true creditworthiness.'
  },
  {
    icon: GitMerge,
    title: 'Graceful Degradation',
    desc: 'Missing ITR? No problem. The system automatically imputes missing variables without crashing the assessment.'
  },
  {
    icon: FileCheck,
    title: 'Regulatory Explainability',
    desc: 'Every automated decision generates a SHAP-based explanation, ensuring complete compliance with RBI guidelines.'
  }
];

export default function FeaturesSection() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section style={{ padding: '160px 24px', background: 'var(--bg-app)', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 700, marginBottom: 80 }}
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 24 }}>
            Engineered for <br/>Enterprise Scale.
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            We've discarded traditional spreadsheet underwriting. IDBI's new architecture processes millions of data points in real-time, providing instantaneous, unbiased financial health assessments.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {capabilities.map((cap, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="card spotlight-card"
              onMouseMove={handleMouseMove}
              style={{ 
                padding: 40, 
                background: 'var(--bg-surface)', 
                border: '1px solid var(--border)', 
                borderRadius: 24,
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--bg-elevated)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
                  <cap.icon size={28} color="var(--text-primary)" />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 16, letterSpacing: '-0.02em' }}>{cap.title}</h3>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{cap.desc}</p>
              </div>
              
              {/* Subtle hover gradient */}
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 100% 100%, rgba(245,130,32,0.05), transparent 60%)', opacity: 0, transition: 'opacity 0.3s ease', pointerEvents: 'none' }} className="feature-hover-gradient" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
