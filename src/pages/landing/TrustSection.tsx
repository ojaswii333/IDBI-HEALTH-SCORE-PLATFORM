import { motion } from 'framer-motion';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import IDBILogo from '../../components/IDBILogo';

export default function TrustSection() {
  return (
    <section style={{ padding: '160px 24px', background: 'var(--bg-app)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderRadius: 40, background: 'var(--success-muted)', marginBottom: 32 }}
          >
            <ShieldCheck size={40} color="var(--success)" />
          </motion.div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 24 }}>
            Bank-grade Security. <br/>Regulatory Compliant.
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: 700, margin: '0 auto', lineHeight: 1.6 }}>
            The IDBI MSME Platform is built strictly on RBI guidelines. Our infrastructure ensures zero data leakage and full auditability.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, marginBottom: 120 }}>
          {[
            { icon: Lock, title: '256-bit AES Encryption', desc: 'All financial data is encrypted at rest and in transit. Your business intelligence is exclusively yours.' },
            { icon: CheckCircle2, title: 'SHAP Explainability', desc: 'Every AI decision is fully interpretable. We provide mathematical transparency for every credit score modification.' },
            { icon: IDBILogo, title: 'IDBI Infrastructure', desc: 'Hosted securely within IDBI Bank\'s private cloud architecture, ensuring maximum uptime and data sovereignty.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ padding: 32, background: 'var(--bg-surface)', borderRadius: 24, border: '1px solid var(--border)', textAlign: 'center' }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                {i === 2 ? <IDBILogo size={40} showText={false} /> : <item.icon size={32} color="var(--text-primary)" />}
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 16 }}>{item.title}</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ maxWidth: 900, margin: '0 auto', padding: '60px 40px', background: 'var(--bg-elevated)', borderRadius: 32, border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.4, marginBottom: 32 }}>
              "The IDBI AI Platform processed our alternate data and increased our credit limit by ₹15L in minutes. We avoided weeks of paperwork and immediately expanded our manufacturing unit."
            </p>
            <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>Rajesh Kumar</div>
            <div style={{ color: 'var(--text-secondary)' }}>Founder, Raj Industries Pvt. Ltd. (Pune)</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
