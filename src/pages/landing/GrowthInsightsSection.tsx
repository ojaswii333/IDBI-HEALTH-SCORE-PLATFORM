import { motion } from 'framer-motion';

export default function GrowthInsightsSection() {
  return (
    <section className="responsive-padding" style={{ borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 24, color: 'var(--text-primary)' }}>
          Don't just track growth. <br/><span style={{ color: 'var(--accent-secondary)' }}>Predict it.</span>
        </h2>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 80px', lineHeight: 1.6 }}>
          Transform your raw financial history into accurate future cashflow projections and valuation trajectories.
        </p>

        <div className="responsive-grid-3">
          {[
            { title: 'Liquidity Forecasting', desc: 'Anticipate cashflow bottlenecks 6 months before they happen.' },
            { title: 'Scenario Analysis', desc: 'Simulate how taking a new loan will affect your DSCR.' },
            { title: 'Industry Benchmarking', desc: 'Compare your margins against top-performing peers in your exact vertical.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card"
              style={{ textAlign: 'left', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--bg-muted)', marginBottom: 24, lineHeight: 1 }}>0{i+1}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
