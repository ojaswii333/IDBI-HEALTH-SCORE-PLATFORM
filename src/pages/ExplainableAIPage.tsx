
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { shapFeatures } from '../data/mockData';
import { ArrowRight, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ExplainableAIPage() {
  const navigate = useNavigate();
  const positive = shapFeatures.filter(f => f.positive);
  const negative = shapFeatures.filter(f => !f.positive);
  const allSorted = [...shapFeatures].sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <Header title="Explainable AI" />
        <div className="page-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <div>
              <h2 style={{ marginBottom: 8 }}>SHAP Explainability Dashboard</h2>
              <p>Understanding the factors behind the AI-generated credit score</p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/score')}>
              View Score <ArrowRight size={16} />
            </button>
          </div>

          {/* Explanation Card */}
          <div className="card" style={{
            marginBottom: 32, padding: 24,
            background: 'linear-gradient(135deg, rgba(245,130,32,0.04), rgba(0,131,108,0.04))',
            borderColor: 'rgba(245,130,32,0.15)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <Info size={20} style={{ color: 'var(--idbi-orange)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <h4 style={{ marginBottom: 8 }}>Why This Score?</h4>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.8 }}>
                  The AI model assigned a score of <strong style={{ color: 'var(--text-primary)' }}>724</strong> (Good) based on analysis of 156 features.
                  The strongest positive signals come from <strong style={{ color: '#10B981' }}>GST filing consistency</strong> and
                  <strong style={{ color: '#10B981' }}> monthly revenue trends</strong>.
                  The primary risk driver is <strong style={{ color: '#EF4444' }}>payment delay index</strong>,
                  which reduced the score by approximately 84 points.
                  <br /><br />
                  <strong style={{ color: 'var(--text-primary)' }}>AI Confidence: 91.3%</strong> — The model is highly confident in this assessment.
                </p>
              </div>
            </div>
          </div>

          {/* SHAP Chart */}
          <div className="card" style={{ marginBottom: 32 }}>
            <h4 style={{ marginBottom: 20 }}>Feature Impact (SHAP Values)</h4>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={allSorted} layout="vertical" margin={{ left: 180 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#5A6478', fontSize: 11 }}
                  label={{ value: 'SHAP Value (Impact on Score)', position: 'bottom', style: { fill: '#5A6478', fontSize: 11 } }} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#8B95A8', fontSize: 12 }} width={170} />
                <Tooltip contentStyle={{ background: '#0F1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }}
                  formatter={((v: number) => [`${v > 0 ? '+' : ''}${(v * 100).toFixed(1)}%`, 'Impact']) as any} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {allSorted.map((e, i) => (
                    <Cell key={i} fill={e.positive ? '#10B981' : '#EF4444'} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-2" style={{ marginBottom: 32 }}>
            {/* Positive Factors */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{
                padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <CheckCircle2 size={16} style={{ color: '#10B981' }} />
                <h4 style={{ fontSize: '0.9375rem' }}>Top Positive Factors</h4>
              </div>
              {positive.map((f, i) => (
                <div key={i} style={{
                  padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  borderBottom: i < positive.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                }}>
                  <span style={{ fontSize: '0.875rem' }}>{f.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: Math.abs(f.value) * 500, height: 6, background: '#10B981',
                      borderRadius: 3, minWidth: 20, maxWidth: 100, opacity: 0.7,
                    }} />
                    <span style={{ fontSize: '0.8125rem', color: '#10B981', fontWeight: 600, width: 48, textAlign: 'right' }}>
                      +{(f.value * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Negative Factors */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{
                padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <AlertTriangle size={16} style={{ color: '#EF4444' }} />
                <h4 style={{ fontSize: '0.9375rem' }}>Top Risk Drivers</h4>
              </div>
              {negative.map((f, i) => (
                <div key={i} style={{
                  padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  borderBottom: i < negative.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                }}>
                  <span style={{ fontSize: '0.875rem' }}>{f.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: Math.abs(f.value) * 500, height: 6, background: '#EF4444',
                      borderRadius: 3, minWidth: 20, maxWidth: 100, opacity: 0.7,
                    }} />
                    <span style={{ fontSize: '0.8125rem', color: '#EF4444', fontWeight: 600, width: 48, textAlign: 'right' }}>
                      {(f.value * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Confidence Gauge */}
          <div className="card" style={{ textAlign: 'center', padding: 32 }}>
            <h4 style={{ marginBottom: 20 }}>AI Confidence Score</h4>
            <div className="gauge-container" style={{ width: 200, height: 200, margin: '0 auto' }}>
              <svg className="gauge-svg" width="200" height="200" viewBox="0 0 200 200">
                <circle className="gauge-bg" cx="100" cy="100" r="85" strokeWidth="12" />
                <circle className="gauge-fill" cx="100" cy="100" r="85" strokeWidth="12"
                  stroke="#10B981" strokeDasharray={`${91.3 / 100 * 534} 534`} />
              </svg>
              <div className="gauge-text" style={{ color: '#10B981' }}>91.3%</div>
            </div>
            <p style={{ marginTop: 16, fontSize: '0.875rem' }}>High confidence — the model has strong certainty in its assessment</p>
          </div>
        </div>
      </div>
    </div>
  );
}
