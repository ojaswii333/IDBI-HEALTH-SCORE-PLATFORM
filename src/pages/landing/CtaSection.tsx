import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import IDBILogo from '../../components/IDBILogo';

export default function CtaSection() {
  return (
    <>
      <section style={{ padding: '160px 24px', background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        {/* Soft background glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'radial-gradient(ellipse, rgba(0, 131, 108, 0.15), transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <motion.div 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}
        >
          <h2 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 32 }}>
            Empower your business <br/>with intelligent capital.
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px' }}>
            Join thousands of modern Indian MSMEs scaling their operations using IDBI's alternate data platform.
          </p>
          <Link to="/login" className="btn btn-primary btn-lg" style={{ padding: '20px 40px', fontSize: '1.125rem', borderRadius: 100, boxShadow: '0 8px 32px rgba(245, 130, 32, 0.3)' }}>
            Start your assessment <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      <footer style={{ background: '#000', padding: '80px 24px 40px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 64, marginBottom: 80 }}>
            <div>
              <IDBILogo size={40} />
              <p style={{ marginTop: 24, fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                The definitive AI underwriting platform for India's economic backbone.
              </p>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: 24, color: 'white' }}>Platform</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Credit Simulator</a></li>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Health Score</a></li>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>AI Advisor</a></li>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Security</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: 24, color: 'white' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>About IDBI Bank</a></li>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Contact Us</a></li>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: 24, color: 'white' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Terms of Service</a></li>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: 32 }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              © 2026 IDBI Bank Ltd. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
