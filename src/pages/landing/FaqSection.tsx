import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: "How is the MSME Financial Health Score calculated?", a: "Our proprietary AI engine synthesizes data from your GST returns, bank statements (via Account Aggregator), and bureau records using a LightGBM ensemble model to generate a dynamic score." },
  { q: "Is my business data secure?", a: "Absolutely. We employ 256-bit AES encryption. Data is processed entirely within IDBI Bank's secure sovereign cloud infrastructure and is never sold or shared." },
  { q: "Do I need to submit physical paperwork?", a: "No. The entire process is completely digital. By connecting your digital data sources, we eliminate the need for physical balance sheets and manual audits." },
  { q: "How fast can I get a credit limit approved?", a: "Once your data sources are connected, the AI engine processes your profile in real-time, often providing a pre-approved credit limit indication within seconds." }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="responsive-padding" style={{ background: 'linear-gradient(135deg, #FF7E5F 0%, #FEB47B 100%)', position: 'relative' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 60, color: '#FFFFFF' }}>
          Frequently asked questions.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.8)', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px', background: 'none', border: 'none', color: '#431407', cursor: 'pointer', textAlign: 'left' }}
                className="card-interactive"
              >
                <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>{faq.q}</span>
                {openIndex === i ? <Minus size={24} color="#9A3412" /> : <Plus size={24} color="#9A3412" />}
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ padding: '0 32px 32px', color: '#9A3412', fontSize: '1.125rem', lineHeight: 1.6 }}>
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
