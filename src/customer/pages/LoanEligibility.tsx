import { loanProducts } from '../../shared/data/customerData';
import { CheckCircle2, XCircle, ArrowRight, BadgeCheck, Banknote, Percent, Clock } from 'lucide-react';

export default function LoanEligibility() {
  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>Loan Eligibility</h1>
        <p>Credit products available based on your financial health assessment</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {loanProducts.map(product => (
          <div key={product.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex' }}>
              {/* Product Info */}
              <div style={{ flex: 1, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <h3>{product.name}</h3>
                  {product.eligible ? (
                    <span className="badge badge-success"><CheckCircle2 size={10} /> Eligible</span>
                  ) : (
                    <span className="badge badge-danger"><XCircle size={10} /> Not Eligible</span>
                  )}
                </div>

                <div className="grid grid-4" style={{ gap: 20, marginBottom: 16 }}>
                  {[
                    { icon: Banknote, label: 'Max Amount', value: `₹${(product.maxAmount / 100000).toFixed(1)}L` },
                    { icon: Percent, label: 'Interest Rate', value: product.interestRate },
                    { icon: Clock, label: 'Tenure', value: product.tenure },
                    { icon: BadgeCheck, label: 'Type', value: product.type },
                  ].map((m, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                        <m.icon size={12} style={{ color: 'var(--text-muted)' }} />
                        <span className="text-caption">{m.label}</span>
                      </div>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Requirements */}
                <div>
                  <div className="text-overline" style={{ marginBottom: 8 }}>Requirements</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {product.requirements.map((req, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px',
                        borderRadius: 6, background: req.met ? 'var(--success-muted)' : 'var(--danger-muted)',
                        fontSize: '0.75rem', fontWeight: 500, color: req.met ? 'var(--success)' : 'var(--danger)',
                      }}>
                        {req.met ? <CheckCircle2 size={11} /> : <XCircle size={11} />} {req.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              {product.eligible && (
                <div style={{ width: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid var(--border)', background: 'var(--bg-app)' }}>
                  <button className="btn btn-primary">Apply Now <ArrowRight size={14} /></button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
