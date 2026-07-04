import { useState } from 'react';
import { healthScore } from '../../shared/data/customerData';
import { SlidersHorizontal, TrendingUp, ArrowRight } from 'lucide-react';

const factors = [
  { key: 'paymentDelay', label: 'Reduce payment delays', unit: 'days', min: 0, max: 15, default: 12, impact: 5.5 },
  { key: 'digitalPayment', label: 'Increase digital payments', unit: '%', min: 60, max: 100, default: 78, impact: 2.8 },
  { key: 'supplierDiv', label: 'Diversify suppliers', unit: '% concentration', min: 20, max: 80, default: 72, impact: 4.2, inverse: true },
  { key: 'cashReserve', label: 'Build cash reserve', unit: 'days', min: 10, max: 90, default: 22, impact: 3.1 },
  { key: 'gstFiling', label: 'GST filing timeliness', unit: 'days before deadline', min: 0, max: 15, default: 3, impact: 2.4 },
];

export default function CreditSimulator() {
  const base = healthScore.overall;
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(factors.map(f => [f.key, f.default]))
  );

  const projected = Math.min(900, Math.round(base + factors.reduce((acc, f) => {
    const v = values[f.key];
    const diff = f.inverse ? (f.default - v) : (v - f.default);
    return acc + Math.max(0, diff * f.impact);
  }, 0)));

  const improvement = projected - base;

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><SlidersHorizontal size={22} /> Credit Improvement Simulator</h1>
        <p>Adjust the sliders to see how changes in your business operations could impact your score</p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 320px' }}>
        {/* Sliders */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {factors.map(f => (
            <div key={f.key}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{f.label}</label>
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                  {values[f.key]} {f.unit}
                </span>
              </div>
              <input type="range" min={f.min} max={f.max} value={values[f.key]}
                onChange={e => setValues(prev => ({ ...prev, [f.key]: Number(e.target.value) }))}
                style={{ width: '100%', accentColor: 'var(--accent)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span className="text-caption">{f.min} {f.unit}</span>
                <span className="text-caption">{f.max} {f.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Projection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ textAlign: 'center', padding: 32 }}>
            <div className="text-overline" style={{ marginBottom: 8 }}>Current Score</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 4 }}>{base}</div>
            <span className="badge badge-info">{healthScore.rating}</span>
          </div>

          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            <ArrowRight size={20} style={{ transform: 'rotate(90deg)' }} />
          </div>

          <div className="card" style={{ textAlign: 'center', padding: 32, borderColor: improvement > 0 ? 'var(--success)' : 'var(--border)' }}>
            <div className="text-overline" style={{ marginBottom: 8 }}>Projected Score</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: improvement > 0 ? 'var(--success)' : 'var(--text-primary)', marginBottom: 4 }}>
              {projected}
            </div>
            {improvement > 0 && (
              <div className="metric-trend up" style={{ fontSize: '0.8125rem' }}>
                <TrendingUp size={14} /> +{improvement} points
              </div>
            )}
          </div>

          {improvement > 0 && (
            <div className="card" style={{ padding: 16 }}>
              <div className="text-overline" style={{ marginBottom: 8 }}>Action Plan</div>
              {factors.map(f => {
                const v = values[f.key];
                const diff = f.inverse ? (f.default - v) : (v - f.default);
                if (diff <= 0) return null;
                const pts = Math.round(diff * f.impact);
                return (
                  <div key={f.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{f.label}</span>
                    <span style={{ fontWeight: 600, color: 'var(--success)' }}>+{pts} pts</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
