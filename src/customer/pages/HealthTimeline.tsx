import { timelineEvents } from '../../shared/data/customerData';
import { TrendingUp, Award, FileText, FileCheck, Sparkles } from 'lucide-react';

const typeIcons = { score_change: TrendingUp, milestone: Award, document: FileText, application: FileCheck, advisory: Sparkles };
const typeColors = { score_change: '#3B82F6', milestone: '#22C55E', document: '#8B5CF6', application: '#F58220', advisory: '#06B6D4' };

export default function HealthTimeline() {
  return (
    <div className="animate-in">
      <div className="page-header"><h1>Financial Health Timeline</h1><p>Track how your financial health has evolved over time</p></div>
      <div style={{ maxWidth: 680, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 15, top: 0, bottom: 0, width: 1, background: 'var(--border)' }} />
        {timelineEvents.map((ev, i) => {
          const Icon = typeIcons[ev.type];
          const color = typeColors[ev.type];
          return (
            <div key={ev.id} className="animate-in" style={{ display: 'flex', gap: 16, marginBottom: 24, animationDelay: `${i * 0.05}s` }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                <Icon size={14} style={{ color }} />
              </div>
              <div className="card" style={{ flex: 1, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <h4 style={{ fontSize: '0.875rem' }}>{ev.title}</h4>
                  {ev.scoreChange && (
                    <span className={`metric-trend ${ev.scoreChange > 0 ? 'up' : 'down'}`}>
                      <TrendingUp size={12} /> {ev.scoreChange > 0 ? '+' : ''}{ev.scoreChange}
                    </span>
                  )}
                </div>
                <p className="text-caption">{ev.description}</p>
                <div className="text-caption" style={{ marginTop: 8, fontSize: '0.6875rem' }}>{ev.date}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
