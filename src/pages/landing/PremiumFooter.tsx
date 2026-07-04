import { Lock } from 'lucide-react';
import IDBILogo from '../../components/IDBILogo';

export default function PremiumFooter() {
  return (
    <footer className="responsive-padding" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        
        <div className="responsive-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 60, marginBottom: 80 }}>
          
          <div style={{ gridColumn: '1 / -1', '@media (minWidth: 1024px)': { gridColumn: 'span 2' } } as any}>
            <div style={{ marginBottom: 24 }}><IDBILogo size={32} /></div>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 300, marginBottom: 24 }}>
              The flagship institutional AI underwriting engine designed for modern Indian MSMEs.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              <Lock size={20} color="var(--success)" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Secured by IDBI Cloud Enclave</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 24 }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {['Cashflow Intelligence', 'Alternative Data Scoring', 'GST Reconciliation', 'Fraud Detection'].map(link => (
                <a key={link} href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9375rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>{link}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 24 }}>Legal & Privacy</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {['Terms of Service', 'Privacy Policy', 'Data Residency', 'RBI Guidelines'].map(link => (
                <a key={link} href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9375rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>{link}</a>
              ))}
            </div>
          </div>

        </div>

        <div style={{ paddingTop: 32, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 24, '@media (minWidth: 768px)': { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } } as any}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} IDBI Bank Ltd. All rights reserved. Not an actual product.
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>Security</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>System Status</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
