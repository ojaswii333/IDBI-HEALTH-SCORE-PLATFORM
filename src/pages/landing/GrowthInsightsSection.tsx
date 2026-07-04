import { motion } from 'framer-motion';

export default function GrowthInsightsSection() {
  return (
    <section className="responsive-padding" style={{ background: 'linear-gradient(135deg, #F9FAFB 0%, #FDF4FF 50%, #E0E7FF 100%)', borderTop: '1px solid rgba(255,255,255,0.8)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 24, color: '#0F172A' }}>
          Don't just track growth. <br/><span style={{ color: '#E11D48' }}>Predict it.</span>
        </h2>
        <p style={{ fontSize: '1.25rem', color: '#475569', maxWidth: 600, margin: '0 auto 80px', lineHeight: 1.6 }}>
          Transform your raw financial history into accurate future cashflow projections and valuation trajectories.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {[
            { title: 'Credit Simulator', desc: 'See how paying off a vendor 10 days early affects your IDBI Health Score.' },
            { title: 'Peer Benchmarking', desc: 'Compare your operating margins against thousands of similar MSMEs in your sector securely.' },
            { title: 'Automated Covenants', desc: 'Get alerted before you breach any loan covenants, keeping your credit lines safe.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ 
                position: 'relative',
                padding: '40px 32px', 
                background: 'rgba(255, 255, 255, 0.6)', 
                backdropFilter: 'blur(16px)',
                borderRadius: 24, 
                border: '1px solid rgba(255,255,255,0.8)',
                textAlign: 'left',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: 'rgba(15, 23, 42, 0.05)', marginBottom: 24, lineHeight: 1 }}>0{i+1}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 16, color: '#0F172A' }}>{item.title}</h3>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
