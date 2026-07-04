import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { ingestionLogs } from '../data/mockData';
import { ArrowRight, Database, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';

export default function DataIngestionPage() {
  const navigate = useNavigate();
  const [visibleLogs, setVisibleLogs] = useState<typeof ingestionLogs>([]);
  const [stats, setStats] = useState({ records: 0, duplicates: 0, missing: 0, features: 0, quality: 0 });
  const [stage, setStage] = useState(0);
  const [done, setDone] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ingestionLogs.forEach((log, i) => {
      setTimeout(() => {
        setVisibleLogs(prev => [...prev, log]);
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
        if (i <= 3) setStage(1);
        else if (i <= 8) { setStage(2); setStats(s => ({ ...s, records: 15303, duplicates: 23 })); }
        else if (i <= 12) { setStage(3); setStats(s => ({ ...s, missing: 47 })); }
        else { setStage(4); setStats(s => ({ ...s, features: 156, quality: 94.7 })); }
        if (i === ingestionLogs.length - 1) setDone(true);
      }, i * 600);
    });
  }, []);

  const stages = [
    { name: 'Raw Data Fetch', icon: Database },
    { name: 'Duplicate Detection', icon: AlertTriangle },
    { name: 'Normalize & Clean', icon: CheckCircle2 },
    { name: 'Feature Engineering', icon: Sparkles },
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <Header title="Data Ingestion Engine" />
        <div className="page-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <div>
              <h2 style={{ marginBottom: 8 }}>Data Ingestion Pipeline</h2>
              <p>Real-time data processing, cleaning, and feature engineering</p>
            </div>
            {done && (
              <button className="btn btn-primary" onClick={() => navigate('/features')}>
                View Features <ArrowRight size={16} />
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-5" style={{ marginBottom: 32 }}>
            {[
              { label: 'Records Processed', value: stats.records.toLocaleString(), color: '#3B82F6' },
              { label: 'Duplicates Found', value: stats.duplicates, color: '#F59E0B' },
              { label: 'Missing Imputed', value: stats.missing, color: '#8B5CF6' },
              { label: 'Features Generated', value: stats.features, color: '#10B981' },
              { label: 'Data Quality', value: stats.quality ? `${stats.quality}%` : '—', color: '#F58220' },
            ].map((s, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '20px 16px' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: s.color, letterSpacing: '-0.02em' }}>
                  {s.value || '—'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 500, marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Pipeline stages */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
            {stages.map((s, i) => (
              <div key={i} style={{
                flex: 1, padding: '16px 20px', borderRadius: 'var(--radius-md)',
                background: stage > i ? 'rgba(16,185,129,0.08)' : stage === i ? 'rgba(245,130,32,0.08)' : 'var(--bg-card)',
                border: `1px solid ${stage > i ? 'rgba(16,185,129,0.2)' : stage === i ? 'rgba(245,130,32,0.2)' : 'var(--border-subtle)'}`,
                display: 'flex', alignItems: 'center', gap: 12, transition: 'all 400ms',
              }}>
                <s.icon size={18} style={{
                  color: stage > i ? '#10B981' : stage === i ? '#F58220' : 'var(--text-tertiary)'
                }} />
                <div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: stage >= i ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>
                    {s.name}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: stage > i ? '#10B981' : stage === i ? '#F58220' : 'var(--text-tertiary)' }}>
                    {stage > i ? 'Complete' : stage === i ? 'Processing...' : 'Pending'}
                  </div>
                </div>
                {stage === i && (
                  <div style={{
                    marginLeft: 'auto', width: 16, height: 16,
                    border: '2px solid var(--idbi-orange)', borderTopColor: 'transparent',
                    borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Terminal */}
          <div className="terminal" ref={logRef} style={{ maxHeight: 450 }}>
            <div style={{ padding: '0 0 8px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 12, display: 'flex', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
              <span style={{ marginLeft: 12, fontSize: '0.75rem', color: '#5A6478' }}>IDBI Data Engine v1.0</span>
            </div>
            {visibleLogs.map((log, i) => (
              <div key={i} className={`terminal-line ${log.type}`} style={{ animation: 'fadeIn 0.3s ease' }}>
                <span style={{ color: '#5A6478', marginRight: 12 }}>[{log.time}]</span>
                <span className="prefix">{'>'}</span>
                {log.msg}
              </div>
            ))}
            {!done && (
              <div className="terminal-line" style={{ animation: 'pulse 1s ease-in-out infinite' }}>
                <span className="prefix">{'>'}</span> Processing
                <span style={{ animation: 'blink 1s step-end infinite' }}>_</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
