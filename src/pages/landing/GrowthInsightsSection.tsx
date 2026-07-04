import { motion } from 'framer-motion';

export default function GrowthInsightsSection() {
  return (
    <section className="responsive-padding" style={{ background: 'var(--bg-app)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 24 }}>
          Don't just track growth. <br/><span style={{ color: 'var(--accent-secondary)' }}>Predict it.</span>
        </h2>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 80px' }}>
          Our LightGBM ensemble doesn't just evaluate the past; it simulates your future credit eligibility based on multiple business decisions.
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
              className="spotlight-card"
              style={{
                padding: 40,
                background: 'var(--bg-app)',
                border: '1px solid var(--border)',
                borderRadius: 24,
                textAlign: 'left',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
              }}
            >
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--bg-muted)', marginBottom: 24, lineHeight: 1 }}>0{i+1}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 16 }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
