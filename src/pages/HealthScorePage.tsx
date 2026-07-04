import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { healthSubScores } from '../data/mockData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function HealthScorePage() {
  const navigate = useNavigate();
  const finalScore = 724;
  const [displayScore, setDisplayScore] = useState(300);

  useEffect(() => {
    const duration = 2000;
    const start = 300;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(start + (finalScore - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  const getRating = (s: number) => {
    if (s >= 750) return { label: 'Excellent', color: '#10B981', bg: 'rgba(16,185,129,0.1)' };
    if (s >= 650) return { label: 'Good', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' };
    if (s >= 500) return { label: 'Moderate', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' };
    return { label: 'High Risk', color: '#EF4444', bg: 'rgba(239,68,68,0.1)' };
  };

  const rating = getRating(finalScore);
  const scorePercent = ((finalScore - 300) / 600) * 100;
  const circumference = 2 * Math.PI * 110;
  const dashOffset = circumference - (scorePercent / 100) * circumference;

  const radarData = healthSubScores.map(s => ({ subject: s.name, score: s.score, fullMark: 100 }));

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <Header title="Financial Health Score" />
        <div className="page-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <div>
              <h2 style={{ marginBottom: 8 }}>Financial Health Score</h2>
              <p>AI-generated credit score based on 156 features from alternate data</p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/health-card')}>
              Generate Health Card <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-2" style={{ marginBottom: 32 }}>
            {/* Score Gauge */}
            <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
              <div style={{ position: 'relative', width: 260, height: 260, margin: '0 auto 24px' }}>
                <svg width="260" height="260" viewBox="0 0 260 260" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="130" cy="130" r="110" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="16" />
                  <circle cx="130" cy="130" r="110" fill="none" stroke={rating.color} strokeWidth="16"
                    strokeLinecap="round" strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                </svg>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ fontSize: '3.5rem', fontWeight: 900, color: rating.color, letterSpacing: '-0.04em', lineHeight: 1 }}>
                    {displayScore}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 4 }}>out of 900</div>
                </div>
              </div>
              <span style={{
                display: 'inline-flex', padding: '8px 24px', borderRadius: 'var(--radius-full)',
                background: rating.bg, color: rating.color, fontWeight: 700, fontSize: '1rem',
                letterSpacing: '0.02em',
              }}>
                {rating.label}
              </span>

              {/* Score Range */}
              <div style={{ marginTop: 32 }}>
                <div style={{
                  height: 8, borderRadius: 4, overflow: 'hidden', position: 'relative',
                  background: 'linear-gradient(90deg, #EF4444 0%, #F59E0B 33%, #3B82F6 66%, #10B981 100%)',
                }}>
                  <div style={{
                    position: 'absolute', left: `${scorePercent}%`, top: -6,
                    width: 3, height: 20, background: 'white', borderRadius: 2,
                    transform: 'translateX(-50%)', boxShadow: '0 0 8px rgba(255,255,255,0.5)',
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>
                  <span>300</span><span>500</span><span>650</span><span>750</span><span>900</span>
                </div>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="card" style={{ padding: '32px 24px' }}>
              <h4 style={{ marginBottom: 20, textAlign: 'center' }}>Sub-Score Breakdown</h4>
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#8B95A8', fontSize: 10 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#5A6478', fontSize: 9 }} />
                  <Radar dataKey="score" stroke="#F58220" fill="#F58220" fillOpacity={0.15} strokeWidth={2} />
                  <Tooltip contentStyle={{ background: '#0F1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Loan Readiness & Sub-scores */}
          <div className="grid grid-3" style={{ marginBottom: 32 }}>
            <div className="card" style={{ textAlign: 'center', padding: 24, borderColor: 'rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.03)' }}>
              <CheckCircle2 size={32} style={{ color: '#10B981', marginBottom: 12 }} />
              <h4 style={{ marginBottom: 4, color: '#10B981' }}>Loan Ready</h4>
              <p style={{ fontSize: '0.8125rem' }}>Eligible for MSME credit facilities</p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: 24 }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 4 }}>₹24.5L</div>
              <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>Recommended Credit Limit</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Based on cash flow analysis</p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: 24 }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 4 }}>4.2%</div>
              <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>Probability of Default</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Low risk classification</p>
            </div>
          </div>

          {/* Sub-Score Grid */}
          <div className="grid grid-5">
            {healthSubScores.map((s, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '20px 12px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.score}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 8 }}>{s.name}</div>
                <div className="progress-bar">
                  <div style={{
                    height: '100%', width: `${s.score}%`, borderRadius: 'var(--radius-full)',
                    background: s.color, transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
