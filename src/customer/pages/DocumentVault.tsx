import { documents } from '../../shared/data/customerData';
import { Upload, FileText, Download, CheckCircle2, Clock, AlertTriangle, XCircle } from 'lucide-react';

const statusConfig: Record<string, { icon: typeof CheckCircle2; badge: string; label: string }> = {
  verified: { icon: CheckCircle2, badge: 'badge-success', label: 'Verified' },
  pending: { icon: Clock, badge: 'badge-warning', label: 'Pending' },
  expired: { icon: AlertTriangle, badge: 'badge-danger', label: 'Expired' },
  rejected: { icon: XCircle, badge: 'badge-danger', label: 'Rejected' },
};

const categories = [...new Set(documents.map(d => d.category))];

export default function DocumentVault() {
  return (
    <div className="animate-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div><h1>Secure Document Vault</h1><p>Upload and manage your business documents</p></div>
        <button className="btn btn-primary"><Upload size={14} /> Upload Document</button>
      </div>

      {categories.map(cat => (
        <div key={cat} style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 12, color: 'var(--text-secondary)' }}>{cat}</h3>
          <div className="grid grid-3">
            {documents.filter(d => d.category === cat).map(doc => {
              const s = statusConfig[doc.status];
              return (
                <div key={doc.id} className="card card-interactive" style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <FileText size={16} style={{ color: 'var(--text-muted)' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 500, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className={`badge ${s.badge}`}><s.icon size={9} /> {s.label}</span>
                        <span className="text-caption">{doc.size}</span>
                      </div>
                      <div className="text-caption" style={{ marginTop: 4 }}>Uploaded {doc.uploadedAt}</div>
                    </div>
                    <button className="btn btn-ghost btn-icon btn-sm"><Download size={13} /></button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
