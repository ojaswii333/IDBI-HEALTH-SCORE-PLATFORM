import { motion } from 'framer-motion';

export default function FutureOfBankingSection() {
  return (
    <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Parallax background image */}
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src="/bg-2.png" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt="IDBI Future Banking"
        />
        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,1) 100%)' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1 }}
        style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 900, padding: '0 24px' }}
      >
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 32 }}>
          Welcome to the new era <br/> of institutional banking.
        </h2>
        <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
          Where artificial intelligence meets a century of trust.
        </p>
      </motion.div>
    </section>
  );
}
