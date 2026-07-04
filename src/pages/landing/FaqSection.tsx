import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: "How secure is my financial data?", a: "Extremely secure. We use AES-256 encryption at rest and TLS 1.3 in transit. We strictly follow RBI data localization and data privacy guidelines. Your data is processed within isolated enclaves and raw statements are purged immediately after feature extraction." },
  { q: "How long does the AI analysis take?", a: "The IDBI MSME Intelligence engine can process, standardize, and score up to 10,000 pages of bank statements and 5 years of ITR/GST data in less than 45 seconds." },
  { q: "Is this platform officially tied to IDBI Bank?", a: "Yes, this is the flagship AI underwriting platform developed exclusively for IDBI Bank's institutional MSME lending division." },
  { q: "Can I dispute the AI's Health Score?", a: "Yes. Because our models are fully explainable, you will receive a transparent breakdown of exactly which factors influenced your score. You can request a manual underwriter review directly through the platform." }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="responsive-padding" style={{ position: 'relative' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 60, color: 'var(--text-primary)' }}>
          Frequently asked questions.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {faqs.map((faq, i) => (
            <div key={i} className="card card-interactive" style={{ overflow: 'hidden', padding: 0 }}>
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', textAlign: 'left' }}
              >
                <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>{faq.q}</span>
                {openIndex === i ? <Minus size={20} color="var(--accent)" /> : <Plus size={20} color="var(--text-muted)" />}
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ padding: '0 24px 24px', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
