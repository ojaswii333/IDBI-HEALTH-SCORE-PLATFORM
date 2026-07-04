import { loanApplications } from '../../shared/data/customerData';
import { Plus, Eye } from 'lucide-react';

const statusBadge: Record<string, string> = { draft: 'badge-neutral', submitted: 'badge-info', under_review: 'badge-warning', approved: 'badge-success', rejected: 'badge-danger', disbursed: 'badge-success' };
const statusLabel: Record<string, string> = { draft: 'Draft', submitted: 'Submitted', under_review: 'Under Review', approved: 'Approved', rejected: 'Rejected', disbursed: 'Disbursed' };

export default function LoanApplications() {
  return (
    <div className="animate-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div><h1>Loan Applications</h1><p>Track and manage your loan applications</p></div>
        <button className="btn btn-primary"><Plus size={14} /> New Application</button>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table>
          <thead>
            <tr><th>Application ID</th><th>Type</th><th>Amount</th><th>Status</th><th>Stage</th><th>Submitted</th><th></th></tr>
          </thead>
          <tbody>
            {loanApplications.map(app => (
              <tr key={app.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{app.id}</td>
                <td>{app.type}</td>
                <td style={{ fontWeight: 600 }}>₹{(app.amount/100000).toFixed(1)}L</td>
                <td><span className={`badge ${statusBadge[app.status]}`}>{statusLabel[app.status]}</span></td>
                <td style={{ color: 'var(--text-secondary)' }}>{app.stage}</td>
                <td className="text-caption">{app.submittedAt}</td>
                <td><button className="btn btn-ghost btn-sm"><Eye size={13} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
