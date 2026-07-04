import IDBILogo from '../../components/IDBILogo';

export default function PremiumFooter() {
  return (
    <footer style={{ background: '#000', padding: '100px 24px 40px', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 64, marginBottom: 100 }}>
          <div style={{ gridColumn: '1 / -1', '@media (minWidth: 1024px)': { gridColumn: 'span 2' } } as any}>
            <IDBILogo size={48} showText={true} />
            <p style={{ marginTop: 32, fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 400 }}>
              The definitive AI underwriting platform for India's economic backbone. Engineered for scale, security, and absolute precision.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: 24, color: 'white', fontSize: '1rem' }}>Product</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-white">Health Score</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-white">Credit Simulator</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-white">AI Advisor</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-white">API Access</a></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: 24, color: 'white', fontSize: '1rem' }}>Enterprise</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-white">Security Infrastructure</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-white">RBI Compliance</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-white">Data Privacy</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-white">Audit Reports</a></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: 24, color: 'white', fontSize: '1rem' }}>Bank</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-white">About IDBI</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-white">Careers</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-white">Investor Relations</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: 40 }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} IDBI Bank Ltd. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">Privacy Policy</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">Terms of Service</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }} className="hover:text-white">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
