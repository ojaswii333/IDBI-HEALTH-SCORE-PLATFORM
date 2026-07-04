import { useRef } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { healthSubScores } from '../data/mockData';
import { Download, QrCode, Building2, Calendar, MapPin, Hash, FileText, Award } from 'lucide-react';

export default function HealthCardPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const score = 724;
  const rating = 'Good';
  const ratingColor = '#3B82F6';
  const scorePercent = ((score - 300) / 600) * 100;

  const handleDownload = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;
      if (!cardRef.current) return;
      const canvas = await html2canvas(cardRef.current, { scale: 2, backgroundColor: '#0A1128' });
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('IDBI_MSME_Health_Card.pdf');
    } catch (e) { alert('PDF download initiated. In production, this generates a full report.'); }
  };

  const recommendations = [
    'Reduce payment delays to suppliers — target <5 days for a 40+ point improvement',
    'Diversify supplier base — reduce top supplier dependency below 30%',
    'Increase digital payment adoption — target >70% transaction via UPI/NEFT',
    'Build 45-day cash reserve to improve liquidity score by 15 points',
    'File GST returns consistently before the 11th for compliance boost',
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <Header title="Financial Health Card" />
        <div className="page-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <div>
              <h2 style={{ marginBottom: 8 }}>MSME Financial Health Card</h2>
              <p>Professional credit assessment report with AI-generated insights</p>
            </div>
            <button className="btn btn-primary" onClick={handleDownload}>
              <Download size={16} /> Download PDF
            </button>
          </div>

          <div ref={cardRef} style={{ maxWidth: 900, margin: '0 auto' }}>
            {/* Card Header */}
            <div className="card" style={{
              padding: 0, overflow: 'hidden', marginBottom: 2,
              borderRadius: '16px 16px 0 0', borderBottom: 'none',
            }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(245,130,32,0.1), rgba(0,131,108,0.1))',
                padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, background: 'var(--idbi-gradient)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, fontSize: '1.125rem', color: 'white',
                  }}>IB</div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>IDBI Bank</h3>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      MSME Financial Health Card
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Report ID</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>FHC-2026-07-0724</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 2 }}>
                    Generated: July 3, 2026
                  </div>
                </div>
              </div>
            </div>

            {/* Business Info + Score */}
            <div className="card" style={{ padding: 0, marginBottom: 2, borderRadius: 0 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ padding: 24, borderRight: '1px solid var(--border-subtle)' }}>
                  <h4 style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>
                    Business Information
                  </h4>
                  {[
                    { icon: Building2, label: 'Business Name', value: 'Raj Industries Pvt. Ltd.' },
                    { icon: Hash, label: 'GSTIN', value: '27AABCR1234A1Z5' },
                    { icon: FileText, label: 'Udyam', value: 'UDYAM-MH-00-123456' },
                    { icon: Award, label: 'Sector', value: 'Manufacturing' },
                    { icon: Calendar, label: 'Vintage', value: '7 Years' },
                    { icon: MapPin, label: 'Location', value: 'Mumbai, Maharashtra' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: '0.8125rem' }}>
                      <item.icon size={14} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-tertiary)', minWidth: 110 }}>{item.label}:</span>
                      <span style={{ fontWeight: 500 }}>{item.value}</span>
                    </div>
                  ))}
                </div>

                <div style={{ padding: 24, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
                    Financial Health Score
                  </div>
                  <div style={{ fontSize: '4rem', fontWeight: 900, color: ratingColor, lineHeight: 1, letterSpacing: '-0.04em' }}>
                    {score}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', margin: '4px 0 12px' }}>out of 900</div>
                  <span style={{
                    padding: '6px 20px', borderRadius: 'var(--radius-full)',
                    background: `${ratingColor}15`, color: ratingColor,
                    fontWeight: 700, fontSize: '0.875rem',
                  }}>{rating}</span>

                  <div style={{ width: '80%', marginTop: 20 }}>
                    <div style={{
                      height: 8, borderRadius: 4,
                      background: 'linear-gradient(90deg, #EF4444, #F59E0B, #3B82F6, #10B981)',
                      position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute', left: `${scorePercent}%`, top: -4,
                        width: 4, height: 16, background: 'white', borderRadius: 2,
                        transform: 'translateX(-50%)', boxShadow: '0 0 6px white',
                      }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginTop: 6 }}>
                      <span>300</span><span>900</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-scores */}
            <div className="card" style={{ padding: 24, marginBottom: 2, borderRadius: 0 }}>
              <h4 style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>
                Component Scores
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
                {healthSubScores.map((s, i) => (
                  <div key={i} style={{
                    textAlign: 'center', padding: '16px 8px',
                    background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                  }}>
                    <div style={{ fontSize: '1.375rem', fontWeight: 800, color: s.color }}>{s.score}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginTop: 2 }}>{s.name}</div>
                    <div style={{ height: 3, borderRadius: 2, background: 'var(--border-subtle)', marginTop: 8 }}>
                      <div style={{ height: '100%', width: `${s.score}%`, borderRadius: 2, background: s.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="card" style={{ padding: 24, marginBottom: 2, borderRadius: 0 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div>
                  <h4 style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>
                    Credit Recommendations
                  </h4>
                  {[
                    { label: 'Credit Limit', value: '₹24.5 Lakhs' },
                    { label: 'Loan Amount', value: '₹18.0 Lakhs' },
                    { label: 'EMI Capacity', value: '₹42,000/month' },
                    { label: 'Probability of Default', value: '4.2%' },
                    { label: 'Loan Readiness', value: 'Ready' },
                  ].map((r, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.8125rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{r.label}</span>
                      <span style={{ fontWeight: 600 }}>{r.value}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>
                    AI Recommendations
                  </h4>
                  {recommendations.map((r, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: '0.8125rem' }}>
                      <span style={{ color: 'var(--idbi-orange)', fontWeight: 600, flexShrink: 0 }}>{i + 1}.</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer with QR */}
            <div className="card" style={{
              padding: '20px 32px', borderRadius: '0 0 16px 16px', marginBottom: 0,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'linear-gradient(135deg, rgba(245,130,32,0.04), rgba(0,131,108,0.04))',
            }}>
              <div>
                <h4 style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                  Officer Notes
                </h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', maxWidth: 500 }}>
                  Applicant demonstrates strong GST compliance and revenue growth. Recommend approval with standard collateral requirements. Payment discipline needs monitoring.
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 80, height: 80, background: 'white', borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 8,
                }}>
                  <QrCode size={56} style={{ color: '#0A1128' }} />
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginTop: 4 }}>Verify Report</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
