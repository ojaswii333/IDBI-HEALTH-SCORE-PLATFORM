import { modelVersions } from '../../shared/data/adminData';
import { RefreshCw, CheckCircle2, Archive } from 'lucide-react';
import { useState } from 'react';

export default function RetrainingCenter() {
  const [training, setTraining] = useState(false);
  const [progress, setProgress] = useState(0);

  const startTraining = () => {
    setTraining(true); setProgress(0);
    const iv = setInterval(() => {
      setProgress(p => { if (p >= 100) { clearInterval(iv); setTraining(false); return 100; } return p + 2; });
    }, 100);
  };

  return (
    <div className="animate-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div><h1>Retraining Center</h1><p>Manage model versions and trigger retraining</p></div>
        <button className="btn btn-primary" onClick={startTraining} disabled={training}>
          <RefreshCw size={14} /> {training ? 'Training...' : 'Trigger Retraining'}
        </button>
      </div>
      {training && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Training in progress</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>{progress}%</span>
          </div>
          <div className="progress" style={{ height: 6 }}><div className="progress-fill" style={{ width: `${progress}%`, background: 'var(--accent)' }} /></div>
        </div>
      )}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table>
          <thead><tr><th>Version</th><th>Model</th><th>Accuracy</th><th>ROC-AUC</th><th>Deployed</th><th>Status</th></tr></thead>
          <tbody>
            {modelVersions.map(v => (
              <tr key={v.version}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{v.version}</td>
                <td>{v.model}</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{(v.accuracy*100).toFixed(1)}%</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{(v.rocAuc*100).toFixed(1)}%</td>
                <td className="text-caption">{v.deployedAt}</td>
                <td>{v.status === 'active' ? <span className="badge badge-success"><CheckCircle2 size={9} /> Active</span> : <span className="badge badge-neutral"><Archive size={9} /> Archived</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
