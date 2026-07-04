import { motion } from 'framer-motion';

export default function FutureOfBankingSection() {
  return (
    <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'linear-gradient(135deg, #F58220 0%, #E11D48 100%)' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Parallax background image */}
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src="/bg-2.png" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2, mixBlendMode: 'overlay' }}
          alt="IDBI Future Banking"
        />
        {/* Colorful overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(225,29,72,0.8) 0%, transparent 100%)' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1 }}
        style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 900, padding: '0 24px' }}
      >
        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 32, color: '#FFFFFF', textShadow: '0 10px 30px rgba(225,29,72,0.5)' }}>
          Welcome to the new era <br/> of institutional banking.
        </h2>
        <p style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
          Where artificial intelligence meets a century of trust.
        </p>
      </motion.div>
    </section>
  );
}
