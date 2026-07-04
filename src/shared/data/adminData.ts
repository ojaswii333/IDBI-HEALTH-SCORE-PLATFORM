// Admin/Officer-facing mock data — includes ML internals
import type { MSMEProfile, ModelMetrics, SHAPFeature, FraudAlert, AuditLog, SystemService } from '../types';

const sectors = ['Manufacturing','Retail','Wholesale','Agri-Business','Textiles','Healthcare','Logistics','Food Services','IT Services','Construction'] as const;
const cities = ['Mumbai','Delhi','Bangalore','Pune','Ahmedabad','Hyderabad','Chennai','Kolkata','Jaipur','Lucknow'];
const states = ['Maharashtra','Delhi','Karnataka','Maharashtra','Gujarat','Telangana','Tamil Nadu','West Bengal','Rajasthan','Uttar Pradesh'];
const names = ['Raj Industries','Priya Textiles','Kumar Manufacturing','Sharma Traders','Patel Agro','Singh Logistics','Mehta Healthcare','Gupta Retail','Verma Construction','Anil Foods','Lakshmi Exports','Bharat Electronics','Sunrise Foods','Metro Wholesale','Green Earth Agri','TechServ Solutions','Royal Caterers','Fast Track Courier','Diamond Textiles','Shakti Construction','Ambika Trading','Nirmala Pharma','Sai Electronics','Pioneer Steel','Anand Polymers','Blue Star Marine','Crystal Ceramics','Durga Mills','Eastern Spice','Fortune Packaging','Global Fibers','Harmony Crafts','Indus Chemicals','Jupiter Auto','Kiran Polymers','Liberty Foods','Magna Tools','Naveen Plastics','Omega Dyes','Pacific Marine','Quest Rubber','Regal Papers','Star Metals','Teja Fabrics','Unity Glass','Vimal Oils','Weston Pumps','Xavier Tech','Yashraj Steel','Zenith Tools'];
function getRating(s: number) { if (s >= 750) return 'Excellent' as const; if (s >= 650) return 'Good' as const; if (s >= 500) return 'Moderate' as const; return 'High Risk' as const; }
function seededRand(seed: number) { const x = Math.sin(seed) * 10000; return x - Math.floor(x); }
function sRand(seed: number, min: number, max: number) { return Math.floor(seededRand(seed) * (max - min + 1)) + min; }

export function generateProfiles(count = 50): MSMEProfile[] {
  return Array.from({ length: count }, (_, i) => {
    const score = sRand(i * 7 + 1, 380, 860);
    return {
      id: `MSME${String(i + 1).padStart(4, '0')}`,
      name: names[i % names.length] + (i >= names.length ? ` ${i - names.length + 2}` : ''),
      gstin: `${sRand(i, 10, 35)}AABCR${sRand(i * 3, 1000, 9999)}A1Z${sRand(i * 5, 1, 9)}`,
      udyam: `UDYAM-${states[i % 10].substring(0, 2).toUpperCase()}-00-${sRand(i * 11, 100000, 999999)}`,
      pan: `AABCR${sRand(i * 2, 1000, 9999)}A`,
      sector: sectors[i % 10],
      city: cities[i % 10],
      state: states[i % 10],
      vintage: sRand(i * 4, 1, 18),
      employees: sRand(i * 6, 3, 250),
      annualRevenue: sRand(i * 8, 5, 800) * 100000,
      contactPerson: names[i % names.length].split(' ')[0] + ' ' + ['Kumar', 'Singh', 'Patel', 'Sharma', 'Gupta'][i % 5],
      phone: `+91 ${sRand(i * 9, 70000, 99999)} ${sRand(i * 10, 10000, 99999)}`,
      email: `contact@${names[i % names.length].toLowerCase().replace(/\s/g, '')}.com`,
      score,
      rating: getRating(score),
      status: (['Active', 'Under Review', 'Approved', 'Pending', 'Active'] as const)[i % 5],
      loanReady: score >= 600,
      lastAssessed: `2026-06-${String(sRand(i * 12, 1, 28)).padStart(2, '0')}`,
    };
  });
}

export const portfolioKPIs = {
  totalMSMEs: 247,
  activeApplications: 53,
  approvalRate: 76.4,
  avgScore: 672,
  portfolioValue: 384500000,
  monthlyGrowth: 12.3,
};

export const scoreDistribution = [
  { range: '300-400', count: 8 }, { range: '400-500', count: 18 }, { range: '500-600', count: 42 },
  { range: '600-700', count: 78 }, { range: '700-800', count: 72 }, { range: '800-900', count: 29 },
];

export const sectorBreakdown = sectors.map((s, i) => ({ name: s, count: sRand(i * 13, 12, 48), avgScore: sRand(i * 14, 580, 760) }));

export const stateDistribution = [
  { state: 'Maharashtra', count: 52 }, { state: 'Gujarat', count: 38 }, { state: 'Karnataka', count: 31 },
  { state: 'Tamil Nadu', count: 28 }, { state: 'Delhi', count: 25 }, { state: 'Rajasthan', count: 22 },
  { state: 'Uttar Pradesh', count: 19 }, { state: 'Telangana', count: 16 }, { state: 'West Bengal', count: 9 }, { state: 'Others', count: 7 },
];

export const approvalFunnel = [
  { stage: 'Applications Received', value: 247 }, { stage: 'Data Connected', value: 218 },
  { stage: 'AI Scored', value: 205 }, { stage: 'Officer Review', value: 178 },
  { stage: 'Approved', value: 156 }, { stage: 'Disbursed', value: 134 },
];

export const modelBenchmarks: ModelMetrics[] = [
  { name: 'Logistic Regression', accuracy: 0.871, precision: 0.864, recall: 0.883, f1: 0.873, rocAuc: 0.921, prAuc: 0.897, latencyMs: 2.1, color: '#71717A', isActive: false },
  { name: 'Random Forest', accuracy: 0.904, precision: 0.897, recall: 0.912, f1: 0.904, rocAuc: 0.953, prAuc: 0.934, latencyMs: 8.4, color: '#3B82F6', isActive: false },
  { name: 'XGBoost', accuracy: 0.928, precision: 0.921, recall: 0.936, f1: 0.928, rocAuc: 0.971, prAuc: 0.958, latencyMs: 5.2, color: '#F58220', isActive: false },
  { name: 'CatBoost', accuracy: 0.925, precision: 0.918, recall: 0.933, f1: 0.925, rocAuc: 0.968, prAuc: 0.955, latencyMs: 6.8, color: '#8B5CF6', isActive: false },
  { name: 'LightGBM', accuracy: 0.931, precision: 0.926, recall: 0.938, f1: 0.932, rocAuc: 0.974, prAuc: 0.962, latencyMs: 3.9, color: '#22C55E', isActive: true },
];

export const shapFeatures: SHAPFeature[] = [
  { name: 'GST Filing Consistency', value: 0.182, category: 'Tax' },
  { name: 'Monthly Revenue Trend', value: 0.154, category: 'Revenue' },
  { name: 'UPI Transaction Volume', value: 0.123, category: 'Digital' },
  { name: 'Cash Flow Stability', value: 0.108, category: 'Cash Flow' },
  { name: 'Employee Retention Rate', value: 0.094, category: 'HR' },
  { name: 'Digital Payment Ratio', value: 0.081, category: 'Digital' },
  { name: 'Working Capital Ratio', value: 0.067, category: 'Capital' },
  { name: 'Payment Delay Index', value: -0.142, category: 'Risk' },
  { name: 'Cash Flow Volatility', value: -0.113, category: 'Risk' },
  { name: 'Supplier Concentration', value: -0.091, category: 'Risk' },
  { name: 'Invoice Realization Rate', value: -0.076, category: 'Revenue' },
  { name: 'Utility Payment Irregularity', value: -0.068, category: 'Risk' },
];

export const globalFeatureImportance = [
  { name: 'GST Filing Consistency', importance: 0.142, category: 'Tax & Compliance' },
  { name: 'Monthly Revenue Trend', importance: 0.128, category: 'Revenue & Cash Flow' },
  { name: 'Payment Delay Index', importance: 0.118, category: 'Risk & Fraud' },
  { name: 'UPI Transaction Volume', importance: 0.098, category: 'UPI & Digital' },
  { name: 'Cash Flow Stability', importance: 0.092, category: 'Revenue & Cash Flow' },
  { name: 'Employee Retention Rate', importance: 0.084, category: 'Employee & HR' },
  { name: 'Supplier Concentration', importance: 0.076, category: 'Supplier & Customer' },
  { name: 'Working Capital Ratio', importance: 0.068, category: 'Working Capital' },
  { name: 'Digital Payment Ratio', importance: 0.062, category: 'UPI & Digital' },
  { name: 'Cash Flow Volatility', importance: 0.058, category: 'Revenue & Cash Flow' },
  { name: 'Customer Retention Rate', importance: 0.052, category: 'Supplier & Customer' },
  { name: 'Utility Payment Regularity', importance: 0.046, category: 'Utility Behaviour' },
  { name: 'Industry Percentile', importance: 0.038, category: 'Industry' },
  { name: 'Compliance Score', importance: 0.034, category: 'Tax & Compliance' },
  { name: 'Inventory Turnover', importance: 0.028, category: 'Working Capital' },
];

export const modelAccuracyTrend = Array.from({ length: 30 }, (_, i) => ({
  day: `Jun ${i + 1}`,
  accuracy: 0.925 + seededRand(i * 17) * 0.02,
  drift: seededRand(i * 23) * 0.04,
  requests: Math.floor(420 + seededRand(i * 29) * 280),
}));

export const fraudAlerts: FraudAlert[] = [
  { id: 'FA-001', business: 'XYZ Traders', type: 'Circular Trading Pattern', severity: 'critical', date: '2026-07-01', status: 'open' },
  { id: 'FA-002', business: 'ABC Exports', type: 'Duplicate Invoice Detection', severity: 'high', date: '2026-07-02', status: 'investigating' },
  { id: 'FA-003', business: 'PQR Logistics', type: 'Shell Company Indicators', severity: 'critical', date: '2026-07-03', status: 'open' },
  { id: 'FA-004', business: 'MNO Services', type: 'Unusual Transaction Patterns', severity: 'medium', date: '2026-06-28', status: 'investigating' },
  { id: 'FA-005', business: 'DEF Manufacturing', type: 'Benford Law Deviation', severity: 'low', date: '2026-06-25', status: 'resolved' },
];

export const auditLogs: AuditLog[] = [
  { id: 'AL-001', timestamp: '2026-07-03 18:24:01', user: 'Rajesh Kapoor', role: 'Officer', action: 'Approved application', target: 'MSME0012', ip: '192.168.1.45' },
  { id: 'AL-002', timestamp: '2026-07-03 18:15:32', user: 'System', role: 'System', action: 'Model prediction', target: 'MSME0023', ip: '10.0.0.1' },
  { id: 'AL-003', timestamp: '2026-07-03 17:58:14', user: 'Anita Desai', role: 'Officer', action: 'Rejected application', target: 'MSME0019', ip: '192.168.1.52' },
  { id: 'AL-004', timestamp: '2026-07-03 17:42:08', user: 'Admin', role: 'Admin', action: 'Triggered retraining', target: 'ML Pipeline', ip: '192.168.1.10' },
  { id: 'AL-005', timestamp: '2026-07-03 17:30:00', user: 'System', role: 'System', action: 'Data sync completed', target: '23 accounts', ip: '10.0.0.1' },
  { id: 'AL-006', timestamp: '2026-07-03 16:45:21', user: 'Rajesh Kapoor', role: 'Officer', action: 'Score override', target: 'MSME0008', ip: '192.168.1.45' },
  { id: 'AL-007', timestamp: '2026-07-03 16:12:55', user: 'System', role: 'System', action: 'Fraud alert triggered', target: 'MSME0031', ip: '10.0.0.1' },
  { id: 'AL-008', timestamp: '2026-07-03 15:58:33', user: 'Priya Mehta', role: 'Officer', action: 'Viewed profile', target: 'MSME0015', ip: '192.168.1.48' },
];

export const riskHeatmap = sectors.slice(0, 8).map((sector, i) => ({
  sector,
  excellent: sRand(i * 15, 5, 20),
  good: sRand(i * 16, 10, 30),
  moderate: sRand(i * 17, 5, 18),
  highRisk: sRand(i * 18, 2, 12),
}));

export const systemServices: SystemService[] = [
  { name: 'FastAPI Server', status: 'healthy', uptime: '99.97%', latency: 12 },
  { name: 'PostgreSQL', status: 'healthy', uptime: '99.99%', latency: 3 },
  { name: 'Redis Cache', status: 'healthy', uptime: '99.95%', latency: 1 },
  { name: 'ML Inference Engine', status: 'healthy', uptime: '99.91%', latency: 142 },
  { name: 'SHAP Explainer', status: 'healthy', uptime: '99.88%', latency: 890 },
  { name: 'Data Sync Worker', status: 'degraded', uptime: '98.2%', latency: 245 },
];

export const systemHealth = { cpu: 42, memory: 61, disk: 38, gpu: 24 };

export const apiMetrics = {
  totalCalls: 15847, avgLatency: 142, errorRate: 0.31, uptime: 99.97,
  endpoints: [
    { path: '/api/v1/ml/predict', calls: 4280, avgMs: 145, errors: 12 },
    { path: '/api/v1/customer/score', calls: 3560, avgMs: 89, errors: 5 },
    { path: '/api/v1/ml/explain', calls: 2140, avgMs: 892, errors: 8 },
    { path: '/api/v1/admin/customers', calls: 1890, avgMs: 45, errors: 2 },
    { path: '/api/v1/auth/login', calls: 1240, avgMs: 32, errors: 18 },
  ],
};

export const modelVersions = [
  { version: 'v2.3.1', model: 'LightGBM', accuracy: 0.931, rocAuc: 0.974, deployedAt: '2026-06-15', status: 'active' as const },
  { version: 'v2.2.0', model: 'LightGBM', accuracy: 0.928, rocAuc: 0.971, deployedAt: '2026-05-01', status: 'archived' as const },
  { version: 'v2.1.0', model: 'XGBoost', accuracy: 0.924, rocAuc: 0.967, deployedAt: '2026-03-15', status: 'archived' as const },
  { version: 'v2.0.0', model: 'XGBoost', accuracy: 0.918, rocAuc: 0.961, deployedAt: '2026-01-20', status: 'archived' as const },
];

export const dataQualitySources = [
  { source: 'GST Returns', completeness: 96.2, freshness: 'Fresh', lastSync: '2 hrs ago', records: 2847, status: 'healthy' as const },
  { source: 'UPI Transactions', completeness: 99.1, freshness: 'Fresh', lastSync: '1 hr ago', records: 12456, status: 'healthy' as const },
  { source: 'Bank Statements', completeness: 94.8, freshness: 'Fresh', lastSync: '6 hrs ago', records: 4320, status: 'healthy' as const },
  { source: 'EPFO Records', completeness: 88.4, freshness: 'Stale', lastSync: '3 days ago', records: 576, status: 'warning' as const },
  { source: 'Electricity Bills', completeness: 91.2, freshness: 'Fresh', lastSync: '1 day ago', records: 84, status: 'healthy' as const },
  { source: 'ITR Filing', completeness: 72.3, freshness: 'Stale', lastSync: '15 days ago', records: 198, status: 'error' as const },
];

export const recentActivity = [
  { time: '2 min ago', action: 'Application MSME0012 approved by Officer Kapoor', type: 'success' as const },
  { time: '15 min ago', action: 'Fraud alert triggered for XYZ Traders — circular trading pattern detected', type: 'danger' as const },
  { time: '32 min ago', action: 'New application received from Kumar Manufacturing', type: 'info' as const },
  { time: '1 hr ago', action: 'Score override: MSME0008 adjusted from 520 to 580 with justification', type: 'warning' as const },
  { time: '2 hr ago', action: 'Bulk data sync completed for 23 accounts', type: 'info' as const },
  { time: '3 hr ago', action: 'Model retraining completed — v2.3.1 deployed', type: 'success' as const },
];

export const rocCurveData = Array.from({ length: 50 }, (_, i) => {
  const fpr = i / 50;
  return {
    fpr, random: fpr,
    logistic: Math.min(1, Math.pow(fpr, 0.42) * 0.95),
    rf: Math.min(1, Math.pow(fpr, 0.35) * 0.96),
    xgboost: Math.min(1, Math.pow(fpr, 0.30) * 0.97),
    catboost: Math.min(1, Math.pow(fpr, 0.31) * 0.97),
    lightgbm: Math.min(1, Math.pow(fpr, 0.28) * 0.98),
  };
});
