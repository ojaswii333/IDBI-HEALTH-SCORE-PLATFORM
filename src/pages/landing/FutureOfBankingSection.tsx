import { motion } from 'framer-motion';

export default function FutureOfBankingSection() {
  return (
    <section className="responsive-padding" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1 }}
        style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 900, padding: '0 24px' }}
      >
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 32, color: 'var(--text-primary)' }}>
          Welcome to the new era <br/> of institutional banking.
        </h2>
        <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
          Where artificial intelligence meets a century of trust.
        </p>
      </motion.div>
    </section>
  );
}
