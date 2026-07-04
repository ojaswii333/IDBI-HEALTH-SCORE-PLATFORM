import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { modelResults, rocData } from '../data/mockData';
import { ArrowRight, Trophy, CheckCircle2 } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

export default function AIModelsPage() {
  const navigate = useNavigate();
  const [activeModel, setActiveModel] = useState('Voting Ensemble');

  const radarData = ['Accuracy', 'Precision', 'Recall', 'F1', 'ROC-AUC'].map(metric => {
    const key = metric.toLowerCase().replace('-', '').replace(' ', '') as string;
    const entry: Record<string, any> = { metric };
    modelResults.forEach(m => {
      const k2 = key === 'rocauc' ? 'roc' : key;
      entry[m.name] = ((m as any)[k2] * 100);
    });
    return entry;
  });

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <Header title="AI Models Benchmark" />
        <div className="page-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <div>
              <h2 style={{ marginBottom: 8 }}>Model Performance Benchmark</h2>
              <p>Comparing ensemble ML models trained on synthetic MSME credit data</p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/explainable')}>
              Explainable AI <ArrowRight size={16} />
            </button>
          </div>

          {/* Model Cards */}
          <div className="grid grid-5" style={{ marginBottom: 32 }}>
            {modelResults.map((m, i) => (
              <div key={i} className="card" onClick={() => setActiveModel(m.name)} style={{
                cursor: 'pointer', textAlign: 'center', padding: '20px 16px',
                borderColor: activeModel === m.name ? `${m.color}40` : undefined,
                background: activeModel === m.name ? `${m.color}08` : undefined,
                position: 'relative',
              }}>
                {m.name === 'Voting Ensemble' && (
                  <Trophy size={14} style={{ position: 'absolute', top: 12, right: 12, color: '#F59E0B' }} />
                )}
                {activeModel === m.name && (
                  <CheckCircle2 size={14} style={{ position: 'absolute', top: 12, left: 12, color: m.color }} />
                )}
                <div style={{
                  width: 40, height: 40, borderRadius: 10, margin: '0 auto 12px',
                  background: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: m.color }} />
                </div>
                <h4 style={{ fontSize: '0.8125rem', marginBottom: 8 }}>{m.name}</h4>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: m.color, letterSpacing: '-0.02em' }}>
                  {(m.accuracy * 100).toFixed(1)}%
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Accuracy</div>
              </div>
            ))}
          </div>

          {/* Benchmark Table */}
          <div className="card" style={{ marginBottom: 32, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
              <h4>Benchmark Comparison</h4>
            </div>
            <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
              <table>
                <thead>
                  <tr>
                    <th>Model</th><th>Accuracy</th><th>Precision</th><th>Recall</th><th>F1 Score</th><th>ROC-AUC</th>
                  </tr>
                </thead>
                <tbody>
                  {modelResults.map((m, i) => (
                    <tr key={i} style={{ background: m.name === activeModel ? `${m.color}06` : undefined }}>
                      <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: m.color }} />
                        {m.name}
                      </td>
                      <td>{(m.accuracy*100).toFixed(1)}%</td>
                      <td>{(m.precision*100).toFixed(1)}%</td>
                      <td>{(m.recall*100).toFixed(1)}%</td>
                      <td>{(m.f1*100).toFixed(1)}%</td>
                      <td style={{ fontWeight: 600, color: m.color }}>{(m.roc*100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-2" style={{ marginBottom: 32 }}>
            {/* ROC Curves */}
            <div className="card">
              <h4 style={{ marginBottom: 20 }}>ROC Curves</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={rocData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="fpr" label={{ value: 'False Positive Rate', position: 'bottom', style: { fill: '#5A6478', fontSize: 11 } }} tick={{ fill: '#5A6478', fontSize: 10 }} />
                  <YAxis label={{ value: 'True Positive Rate', angle: -90, position: 'left', style: { fill: '#5A6478', fontSize: 11 } }} tick={{ fill: '#5A6478', fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: '#0F1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="random" stroke="#333" strokeDasharray="5 5" dot={false} name="Random" />
                  {modelResults.map(m => (
                    <Line key={m.name} type="monotone" dataKey={m.name.toLowerCase().replace(/\s/g, '')} stroke={m.color} dot={false} strokeWidth={2} name={m.name} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Radar */}
            <div className="card">
              <h4 style={{ marginBottom: 20 }}>Multi-Metric Comparison</h4>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#8B95A8', fontSize: 11 }} />
                  <PolarRadiusAxis domain={[85, 100]} tick={{ fill: '#5A6478', fontSize: 9 }} />
                  {modelResults.map(m => (
                    <Radar key={m.name} name={m.name} dataKey={m.name} stroke={m.color} fill={m.color} fillOpacity={0.08} strokeWidth={2} />
                  ))}
                  <Tooltip contentStyle={{ background: '#0F1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
