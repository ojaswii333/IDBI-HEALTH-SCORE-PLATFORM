import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { generateFeatures } from '../data/mockData';
import { Search, ArrowRight, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronRight } from 'lucide-react';

const features = generateFeatures();
const categories = [...new Set(features.map(f => f.category))];

export default function FeatureExtractionPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set(categories));

  const filtered = useMemo(() => {
    if (!search) return features;
    return features.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const toggle = (cat: string) => {
    setExpanded(prev => {
      const n = new Set(prev);
      n.has(cat) ? n.delete(cat) : n.add(cat);
      return n;
    });
  };

  const TrendIcon = ({ t }: { t: string }) => {
    if (t === 'up') return <TrendingUp size={14} style={{ color: '#10B981' }} />;
    if (t === 'down') return <TrendingDown size={14} style={{ color: '#EF4444' }} />;
    return <Minus size={14} style={{ color: '#5A6478' }} />;
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <Header title="AI Feature Extraction" />
        <div className="page-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <div>
              <h2 style={{ marginBottom: 8 }}>
                AI-Extracted Features <span className="badge badge-orange" style={{ marginLeft: 8 }}>{features.length} Features</span>
              </h2>
              <p>Machine learning features extracted from alternate data sources</p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/models')}>
              Run Models <ArrowRight size={16} />
            </button>
          </div>

          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px',
            background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)', marginBottom: 24, width: 360,
          }}>
            <Search size={16} style={{ color: 'var(--text-tertiary)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search features..." style={{
                background: 'none', border: 'none', outline: 'none',
                color: 'var(--text-primary)', fontSize: '0.875rem',
                fontFamily: 'var(--font-family)', width: '100%',
              }} />
          </div>

          {/* Categories */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {categories.map(cat => {
              const catFeatures = filtered.filter(f => f.category === cat);
              if (catFeatures.length === 0) return null;
              const isExpanded = expanded.has(cat);
              return (
                <div key={cat} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <button onClick={() => toggle(cat)} style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-primary)', fontFamily: 'var(--font-family)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      <h4 style={{ fontSize: '0.9375rem' }}>{cat}</h4>
                      <span className="badge badge-info">{catFeatures.length}</span>
                    </div>
                  </button>
                  {isExpanded && (
                    <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
                      {catFeatures.map((f, i) => (
                        <div key={i} style={{
                          display: 'grid', gridTemplateColumns: '1fr 100px 80px 60px 120px',
                          alignItems: 'center', padding: '10px 20px', gap: 12,
                          borderBottom: i < catFeatures.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                          fontSize: '0.8125rem',
                        }}>
                          <span style={{ fontWeight: 500 }}>{f.name}</span>
                          <span style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                            {typeof f.value === 'number' ? f.value.toFixed(2) : f.value}
                          </span>
                          <span style={{ color: f.confidence > 0.9 ? '#10B981' : f.confidence > 0.8 ? '#F59E0B' : '#EF4444' }}>
                            {(f.confidence * 100).toFixed(0)}%
                          </span>
                          <TrendIcon t={f.trend} />
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{
                              flex: 1, height: 4, background: 'var(--border-subtle)',
                              borderRadius: 2, overflow: 'hidden',
                            }}>
                              <div style={{
                                width: `${f.importance * 100}%`, height: '100%',
                                background: f.importance > 0.7 ? '#F58220' : f.importance > 0.4 ? '#3B82F6' : 'var(--text-tertiary)',
                                borderRadius: 2,
                              }} />
                            </div>
                            <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', width: 28 }}>
                              {(f.importance * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
