import { motion } from 'framer-motion';
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
    <section style={{ padding: '160px 24px', background: 'var(--bg-app)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 60 }}>
          Frequently asked questions.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border)' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px 0', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'none', textAlign: 'left' }}
                className="card-interactive"
              >
                <span style={{ fontSize: '1.25rem', fontWeight: 500 }}>{faq.q}</span>
                {openIndex === i ? <Minus size={24} color="var(--text-secondary)" /> : <Plus size={24} color="var(--text-secondary)" />}
              </button>
              
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ paddingBottom: 32, fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {faq.a}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
