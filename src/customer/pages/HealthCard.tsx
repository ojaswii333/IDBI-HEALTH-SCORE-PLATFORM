import { useRef } from 'react';
import { healthScore, businessProfile } from '../../shared/data/customerData';
import { Download, QrCode, Building2, Calendar, MapPin, Hash, Award } from 'lucide-react';

export default function HealthCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const s = healthScore;
  const b = businessProfile;

  const handleDownload = async () => {
    const el = cardRef.current;
    if (!el) return;
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).default;
    const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#18181B' });
    const pdf = new jsPDF('p', 'mm', 'a4');
    const w = pdf.internal.pageSize.getWidth();
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, w, (canvas.height * w) / canvas.width);
    pdf.save(`IDBI_HealthCard_${b.gstin}.pdf`);
  };

  return (
    <div className="animate-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Financial Health Card</h1>
          <p>AI-generated credit assessment report for your business</p>
        </div>
        <button className="btn btn-primary" onClick={handleDownload}><Download size={14} /> Download PDF</button>
      </div>

      <div ref={cardRef} className="card" style={{ maxWidth: 800, margin: '0 auto', padding: 32 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 20, borderBottom: '1px solid var(--border)', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.875rem', color: 'white' }}>IB</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>IDBI Bank</div>
              <div className="text-caption">Financial Health Assessment Report</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="text-caption">Report ID</div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>FHC-2026-07-0724</div>
          </div>
        </div>

        {/* Business Info */}
        <div className="grid grid-2" style={{ marginBottom: 24 }}>
          <div>
            <h3 style={{ marginBottom: 12 }}>{b.name}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: Hash, label: 'GSTIN', value: b.gstin },
                { icon: Building2, label: 'Sector', value: b.sector },
                { icon: MapPin, label: 'Location', value: `${b.city}, ${b.state}` },
                { icon: Calendar, label: 'Vintage', value: `${b.vintage} years` },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <item.icon size={13} style={{ color: 'var(--text-muted)' }} />
                  <span className="text-caption" style={{ width: 60 }}>{item.label}</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Score */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.03em', color: s.ratingColor, lineHeight: 1 }}>{s.overall}</div>
            <div className="text-caption" style={{ marginBottom: 8 }}>out of 900</div>
            <span className="badge badge-info" style={{ padding: '4px 16px' }}>{s.rating}</span>
          </div>
        </div>

        {/* Sub-scores */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}><Award size={14} /> Component Scores</h4>
          <div className="grid grid-3" style={{ gap: 8 }}>
            {s.subScores.map((sub, i) => (
              <div key={i} style={{ padding: 12, background: 'var(--bg-app)', borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{sub.name}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: sub.color }}>{sub.score}</span>
                </div>
                <div className="progress">
                  <div className="progress-fill" style={{ width: `${sub.score}%`, background: sub.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ marginBottom: 12 }}>AI Recommendations</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Reduce supplier payment delays to within 5 days', 'Diversify supplier base — reduce top-2 concentration below 50%', 'Build a 45-day cash reserve for working capital stability', 'Increase digital payment ratio to 85%+', 'File pending ITR for FY 2024-25'].map((rec, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{i + 1}.</span> {rec}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="text-caption">Generated on {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          <QrCode size={48} style={{ color: 'var(--text-muted)' }} />
        </div>
      </div>
    </div>
  );
}
