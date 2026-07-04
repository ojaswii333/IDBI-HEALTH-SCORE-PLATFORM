import { motion } from 'framer-motion';

const brands = ['TATA MOTORS', 'RELIANCE', 'MAHINDRA', 'INFOSYS', 'WIPRO', 'L&T', 'ADANI', 'HCL', 'BAJAJ', 'ITC'];

export default function TrustedBySection() {
  return (
    <section className="responsive-padding" style={{ background: 'var(--bg-app)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
          TRUSTED BY MODERN INDIAN ENTERPRISES
        </p>
      </div>

      <div style={{ position: 'relative', overflow: 'hidden', display: 'flex', width: '100vw' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 200, background: 'linear-gradient(to right, var(--bg-app), transparent)', zIndex: 2 }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 200, background: 'linear-gradient(to left, var(--bg-app), transparent)', zIndex: 2 }} />
        
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: 80, whiteSpace: 'nowrap', padding: '0 40px' }}
        >
          {/* Double the array for seamless infinite scroll */}
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div key={i} style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--bg-muted)', letterSpacing: '-0.02em', userSelect: 'none' }}>
              {brand}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
