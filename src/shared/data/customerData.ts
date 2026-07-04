// Customer-facing mock data — no ML internals exposed
import type { HealthScore, LoanProduct, TimelineEvent, Notification, Document, LoanApplication } from '../types';

export const businessProfile = {
  name: 'Ojas Ananya Enterprises',
  gstin: '27AABCR1234A1Z5',
  udyam: 'UDYAM-MH-00-123456',
  pan: 'AABCR1234A',
  sector: 'Manufacturing',
  city: 'Mumbai',
  state: 'Maharashtra',
  vintage: 7,
  employees: 48,
  annualRevenue: 28500000,
  contactPerson: 'Ananya Upadhyay',
  phone: '+91 98765 43210',
  email: 'ananya@ojasananya.com',
};

export const healthScore: HealthScore = {
  overall: 724,
  rating: 'Good',
  ratingColor: '#3B82F6',
  creditLimit: 2450000,
  loanEligibility: 1800000,
  probabilityOfDefault: 0.042,
  confidence: 0.913,
  subScores: [
    { name: 'Tax Compliance', score: 82, maxScore: 100, color: '#22C55E', description: 'Strong GST filing record with consistent compliance' },
    { name: 'Cash Flow Health', score: 71, maxScore: 100, color: '#3B82F6', description: 'Stable monthly inflows with moderate volatility' },
    { name: 'Revenue Growth', score: 78, maxScore: 100, color: '#8B5CF6', description: 'Consistent quarter-over-quarter growth trajectory' },
    { name: 'Liquidity', score: 65, maxScore: 100, color: '#06B6D4', description: 'Adequate working capital with room for improvement' },
    { name: 'Operations', score: 74, maxScore: 100, color: '#EAB308', description: 'Good operational efficiency with timely payments' },
    { name: 'Digital Maturity', score: 85, maxScore: 100, color: '#F58220', description: 'High digital payment adoption and automation' },
  ],
  trend: [
    { month: 'Jul 25', score: 648 }, { month: 'Aug 25', score: 655 }, { month: 'Sep 25', score: 662 },
    { month: 'Oct 25', score: 658 }, { month: 'Nov 25', score: 671 }, { month: 'Dec 25', score: 680 },
    { month: 'Jan 26', score: 689 }, { month: 'Feb 26', score: 695 }, { month: 'Mar 26', score: 702 },
    { month: 'Apr 26', score: 710 }, { month: 'May 26', score: 718 }, { month: 'Jun 26', score: 724 },
  ],
};

export const strengths = [
  { label: 'Strong tax compliance record', detail: 'Consistent on-time GST filings for 18+ months', impact: '+62 pts' },
  { label: 'Growing revenue trajectory', detail: '12% year-over-year revenue growth', impact: '+48 pts' },
  { label: 'High digital payment adoption', detail: '78% of transactions are digital (UPI, NEFT)', impact: '+35 pts' },
  { label: 'Good employee retention', detail: '92% employee retention over the past year', impact: '+28 pts' },
];

export const risks = [
  { label: 'Supplier payment delays', detail: 'Average 12 days past due on supplier invoices', impact: '-45 pts' },
  { label: 'Cash flow volatility', detail: 'Monthly cash flow fluctuates ±35%', impact: '-38 pts' },
  { label: 'High supplier concentration', detail: '72% of procurement from top 2 suppliers', impact: '-24 pts' },
];

export const loanProducts: LoanProduct[] = [
  {
    id: 'tl-001', name: 'MSME Term Loan', type: 'Term Loan',
    maxAmount: 2500000, interestRate: '10.5% - 12.0%', tenure: '12 - 60 months', eligible: true,
    requirements: [
      { label: 'Health Score ≥ 650', met: true },
      { label: 'Business vintage ≥ 3 years', met: true },
      { label: 'GST compliance verified', met: true },
      { label: 'No active defaults', met: true },
    ],
  },
  {
    id: 'wc-001', name: 'Working Capital Facility', type: 'Working Capital',
    maxAmount: 1500000, interestRate: '11.0% - 13.0%', tenure: '12 months (renewable)', eligible: true,
    requirements: [
      { label: 'Health Score ≥ 600', met: true },
      { label: 'Positive cash flow (3 months)', met: true },
      { label: 'Bank statement verified', met: true },
      { label: 'Revenue > ₹10L annually', met: true },
    ],
  },
  {
    id: 'od-001', name: 'Overdraft Facility', type: 'Overdraft',
    maxAmount: 800000, interestRate: '12.5% - 14.5%', tenure: 'On demand', eligible: false,
    requirements: [
      { label: 'Health Score ≥ 700', met: true },
      { label: 'Existing relationship ≥ 1 year', met: false },
      { label: 'Collateral documentation', met: false },
      { label: 'Clean credit history', met: true },
    ],
  },
];

export const timelineEvents: TimelineEvent[] = [
  { id: 'te-1', date: '2026-06-28', title: 'Score increased to 724', description: 'Improved cash flow stability and on-time supplier payments contributed to a 6-point increase.', type: 'score_change', scoreChange: 6 },
  { id: 'te-2', date: '2026-06-15', title: 'Crossed 700 milestone', description: 'Your financial health score crossed the 700 mark, unlocking additional credit facilities.', type: 'milestone' },
  { id: 'te-3', date: '2026-06-10', title: 'GST returns verified', description: 'GSTR-3B filing for May 2026 has been verified and is compliant.', type: 'document' },
  { id: 'te-4', date: '2026-05-22', title: 'Term loan application submitted', description: 'Application for ₹18L term loan is under review by the credit team.', type: 'application' },
  { id: 'te-5', date: '2026-05-15', title: 'AI advisory: Diversify suppliers', description: 'Reducing supplier concentration below 50% could improve your score by 15-25 points.', type: 'advisory' },
  { id: 'te-6', date: '2026-05-01', title: 'Score increased to 718', description: 'Digital payment adoption and revenue growth drove a 8-point improvement.', type: 'score_change', scoreChange: 8 },
  { id: 'te-7', date: '2026-04-15', title: 'Bank statement connected', description: 'HDFC Bank statement for the last 12 months has been linked and verified.', type: 'document' },
  { id: 'te-8', date: '2026-04-01', title: 'Score increased to 710', description: 'Consistent GST filing and employee retention improvements.', type: 'score_change', scoreChange: 8 },
];

export const notifications: Notification[] = [
  { id: 'n-1', title: 'Score Updated', message: 'Your financial health score has been updated to 724 (+6 points).', type: 'score', read: false, date: '2026-06-28' },
  { id: 'n-2', title: 'Document Expiring', message: 'Your Udyam Registration certificate expires in 30 days. Please renew.', type: 'document', read: false, date: '2026-06-25' },
  { id: 'n-3', title: 'Application Update', message: 'Your term loan application has moved to officer review stage.', type: 'application', read: true, date: '2026-06-20' },
  { id: 'n-4', title: 'AI Insight', message: 'Reducing payment delays by 5 days could improve your score by ~20 points.', type: 'advisory', read: true, date: '2026-06-15' },
  { id: 'n-5', title: 'Milestone Reached', message: 'Congratulations! Your score crossed the 700 mark.', type: 'score', read: true, date: '2026-06-15' },
];

export const documents: Document[] = [
  { id: 'd-1', name: 'GST Registration Certificate', category: 'Tax', status: 'verified', uploadedAt: '2026-03-12', size: '245 KB' },
  { id: 'd-2', name: 'GSTR-3B (May 2026)', category: 'Tax', status: 'verified', uploadedAt: '2026-06-10', size: '128 KB' },
  { id: 'd-3', name: 'Udyam Registration', category: 'Registration', status: 'verified', uploadedAt: '2026-01-15', size: '312 KB' },
  { id: 'd-4', name: 'PAN Card', category: 'Registration', status: 'verified', uploadedAt: '2026-01-15', size: '89 KB' },
  { id: 'd-5', name: 'Bank Statement (12M)', category: 'Financial', status: 'verified', uploadedAt: '2026-04-15', size: '1.2 MB' },
  { id: 'd-6', name: 'ITR (FY 2024-25)', category: 'Tax', status: 'pending', uploadedAt: '2026-05-20', size: '456 KB' },
  { id: 'd-7', name: 'Balance Sheet (2025)', category: 'Financial', status: 'pending', uploadedAt: '2026-06-01', size: '890 KB' },
  { id: 'd-8', name: 'Factory License', category: 'Compliance', status: 'expired', uploadedAt: '2025-07-10', size: '234 KB' },
];

export const loanApplications: LoanApplication[] = [
  { id: 'LA-2026-001', type: 'Term Loan', amount: 1800000, status: 'under_review', submittedAt: '2026-05-22', stage: 'Officer Review', officerNotes: 'Strong revenue growth. Awaiting ITR verification.' },
  { id: 'LA-2026-002', type: 'Working Capital', amount: 800000, status: 'approved', submittedAt: '2026-03-10', stage: 'Disbursed' },
  { id: 'LA-2025-003', type: 'Term Loan', amount: 500000, status: 'disbursed', submittedAt: '2025-11-05', stage: 'Complete' },
];

export const advisorResponses: Record<string, string> = {
  'How can I improve my score?': 'Based on your financial profile, here are the top actions to improve your health score:\n\n**Quick Wins (1-2 months):**\n1. Clear overdue supplier invoices — currently averaging 12 days late\n2. File GST returns before the 11th of each month\n3. Increase digital payment ratio above 80%\n\n**Medium Term (3-6 months):**\n1. Add 2-3 new suppliers to reduce concentration below 50%\n2. Build a 45-day cash reserve\n3. Automate invoice collection\n\n**Expected Impact:** +60 to +90 points over 6 months.',
  'Am I eligible for a loan?': 'Yes! Based on your current financial health score of **724**, you are eligible for:\n\n| Product | Max Amount | Rate |\n|---------|-----------|------|\n| Term Loan | ₹25.0L | 10.5-12.0% |\n| Working Capital | ₹15.0L | 11.0-13.0% |\n\nThe **Overdraft Facility** requires an existing banking relationship of 1+ year, which you haven\'t met yet.\n\nWould you like to start a loan application?',
  'What are my business strengths?': 'Your business shows several strong signals:\n\n1. **Tax Compliance (82/100)** — Consistent on-time GST filings for 18+ months puts you in the top 15% of MSMEs\n2. **Digital Maturity (85/100)** — 78% digital payment adoption is well above the industry average of 45%\n3. **Revenue Growth (78/100)** — 12% YoY growth outperforms the manufacturing sector average of 8%\n4. **Employee Retention (92%)** — Very strong compared to the sector average of 74%\n\nThese factors contribute positively to your creditworthiness assessment.',
  'Why did my score change?': 'Your score increased from **718** to **724** (+6 points) on June 28, 2026.\n\n**Positive factors:**\n- Improved supplier payment timeliness (avg delay reduced from 15 to 12 days)\n- Cash flow stability improved by 8% month-over-month\n- Continued digital payment consistency\n\n**Still impacting negatively:**\n- Supplier concentration remains high at 72%\n- Cash flow volatility is ±35% (target: below ±20%)',
};

export const insightsData = {
  revenue: [
    { month: 'Jan', value: 2100000 }, { month: 'Feb', value: 2250000 }, { month: 'Mar', value: 2400000 },
    { month: 'Apr', value: 2180000 }, { month: 'May', value: 2520000 }, { month: 'Jun', value: 2850000 },
  ],
  cashFlow: [
    { month: 'Jan', inflow: 2100000, outflow: 1850000 }, { month: 'Feb', inflow: 2250000, outflow: 1920000 },
    { month: 'Mar', inflow: 2400000, outflow: 2050000 }, { month: 'Apr', inflow: 2180000, outflow: 2100000 },
    { month: 'May', inflow: 2520000, outflow: 2150000 }, { month: 'Jun', inflow: 2850000, outflow: 2300000 },
  ],
  expenses: [
    { name: 'Raw Materials', value: 45 }, { name: 'Salaries', value: 22 }, { name: 'Utilities', value: 8 },
    { name: 'Logistics', value: 10 }, { name: 'Rent', value: 7 }, { name: 'Other', value: 8 },
  ],
  peerComparison: [
    { metric: 'Revenue Growth', you: 78, industry: 62 }, { metric: 'Digital Payments', you: 85, industry: 52 },
    { metric: 'Tax Compliance', you: 82, industry: 68 }, { metric: 'Cash Flow', you: 71, industry: 58 },
    { metric: 'Liquidity', you: 65, industry: 55 },
  ],
};

export const connectedSources = [
  { name: 'GST Returns', status: 'connected', lastSync: '2 hours ago', records: 2847 },
  { name: 'UPI Transactions', status: 'connected', lastSync: '1 hour ago', records: 12456 },
  { name: 'Bank Statement', status: 'connected', lastSync: '6 hours ago', records: 4320 },
  { name: 'EPFO Records', status: 'connected', lastSync: '1 day ago', records: 576 },
  { name: 'Electricity Bills', status: 'connected', lastSync: '3 days ago', records: 84 },
  { name: 'ITR Filing', status: 'pending', lastSync: 'Never', records: 0 },
];
