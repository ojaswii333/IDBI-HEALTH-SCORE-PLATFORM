import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { staggerContainer, staggerItem } from '../../shared/animations';
import { businessProfile } from '../../shared/data/customerData';

export default function IntelligenceReport() {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate">
      <motion.div variants={staggerItem} className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="text-h1">Financial Intelligence Report</h1>
          <p>Comprehensive AI analysis of {businessProfile.name}</p>
        </div>
        <button className="btn btn-secondary">
          <Download size={16} /> Download Full PDF
        </button>
      </motion.div>

      <motion.div variants={staggerItem} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: 32, background: 'var(--accent-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <FileText size={32} color="var(--accent)" />
        </div>
        <h3 className="text-h3" style={{ marginBottom: 12 }}>Report Generation in Progress</h3>
        <p className="text-body" style={{ maxWidth: 400 }}>
          Our AI is currently analyzing your latest transaction data and tax filings to generate a comprehensive 15-page intelligence report.
        </p>
      </motion.div>
    </motion.div>
  );
}
