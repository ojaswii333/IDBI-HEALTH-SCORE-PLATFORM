// IDBI MSME Financial Health Intelligence - Mock Data

export const sectors = ['Manufacturing','Retail','Wholesale','Agri','Textile','Healthcare','Logistics','Restaurants','Service','Construction'] as const;
export type Sector = typeof sectors[number];

export interface MSMEProfile {
  id: string; name: string; gstin: string; sector: Sector; vintage: number;
  city: string; state: string; employees: number; annualRevenue: number;
  score: number; rating: string; loanReady: boolean; status: string;
  pan: string; udyam: string; contactPerson: string; phone: string; email: string;
}

export interface FeatureItem {
  name: string; value: number | string; confidence: number; trend: 'up'|'down'|'stable';
  category: string; importance: number;
}

export interface ModelResult {
  name: string; accuracy: number; precision: number; recall: number; f1: number; roc: number;
  color: string;
}

const names = ['Raj Industries','Priya Textiles','Kumar Manufacturing','Sharma Traders','Patel Agro','Singh Logistics','Mehta Healthcare','Gupta Retail','Verma Construction','Anil Restaurants','Lakshmi Exports','Bharat Electronics','Sunrise Foods','Metro Wholesale','Green Earth Agri','TechServ Solutions','Royal Caterers','Fast Track Courier','Diamond Textiles','Shakti Constructions'];
const cities = ['Mumbai','Delhi','Bangalore','Pune','Ahmedabad','Hyderabad','Chennai','Kolkata','Jaipur','Lucknow'];
const states = ['Maharashtra','Delhi','Karnataka','Maharashtra','Gujarat','Telangana','Tamil Nadu','West Bengal','Rajasthan','Uttar Pradesh'];

function rand(min:number,max:number){return Math.floor(Math.random()*(max-min+1))+min}
function randF(min:number,max:number,d=2){return parseFloat((Math.random()*(max-min)+min).toFixed(d))}
function getRating(s:number){if(s>=750)return'Excellent';if(s>=650)return'Good';if(s>=500)return'Moderate';return'High Risk'}

export function generateProfiles(count=20):MSMEProfile[]{
  return Array.from({length:count},(_,i)=>({
    id:`MSME${String(i+1).padStart(4,'0')}`,
    name:names[i%names.length],
    gstin:`${rand(10,35)}AA${String.fromCharCode(65+i%26)}${String.fromCharCode(65+(i+3)%26)}${rand(1000,9999)}${String.fromCharCode(65+i%26)}1Z${rand(1,9)}`,
    sector:sectors[i%sectors.length],
    vintage:rand(1,15),
    city:cities[i%cities.length],
    state:states[i%states.length],
    employees:rand(5,200),
    annualRevenue:rand(10,500)*100000,
    score:rand(350,880),
    rating:'',
    loanReady:false,
    status:['Under Review','Approved','Pending','Rejected','Under Review'][i%5],
    pan:`ABCPD${rand(1000,9999)}${String.fromCharCode(65+i%26)}`,
    udyam:`UDYAM-${states[i%states.length].substring(0,2).toUpperCase()}-00-${rand(100000,999999)}`,
    contactPerson:names[i%names.length].split(' ')[0]+' '+['Kumar','Singh','Patel','Sharma','Gupta'][i%5],
    phone:`+91 ${rand(70000,99999)} ${rand(10000,99999)}`,
    email:`contact@${names[i%names.length].toLowerCase().replace(/\s/g,'')}.com`
  })).map(p=>({...p,rating:getRating(p.score),loanReady:p.score>=600}));
}

export const dataSources = [
  {id:'gst',name:'GST Returns',icon:'FileText',status:'disconnected',records:0},
  {id:'upi',name:'UPI Transactions',icon:'Smartphone',status:'disconnected',records:0},
  {id:'aa',name:'Account Aggregator',icon:'Link',status:'disconnected',records:0},
  {id:'epfo',name:'EPFO Records',icon:'Users',status:'disconnected',records:0},
  {id:'electricity',name:'Electricity Bills',icon:'Zap',status:'disconnected',records:0},
  {id:'water',name:'Water Bills',icon:'Droplets',status:'disconnected',records:0},
  {id:'internet',name:'Internet Bills',icon:'Wifi',status:'disconnected',records:0},
  {id:'mobile',name:'Mobile Bills',icon:'Phone',status:'disconnected',records:0},
  {id:'itr',name:'ITR Filing',icon:'FileCheck',status:'disconnected',records:0},
  {id:'bank',name:'Bank Statement',icon:'Landmark',status:'disconnected',records:0},
  {id:'eway',name:'E-Way Bills',icon:'Truck',status:'disconnected',records:0},
  {id:'gem',name:'GeM Portal',icon:'ShoppingBag',status:'disconnected',records:0},
  {id:'mca',name:'MCA Filings',icon:'Building2',status:'disconnected',records:0},
  {id:'csv',name:'CSV Upload',icon:'Upload',status:'disconnected',records:0},
];

export function generateFeatures():FeatureItem[]{
  const cats:{[k:string]:string[]}={
    'GST & Tax':['GST Filing Consistency','Average Monthly GST','GST Compliance Rate','Late Filing Frequency','GST Revision Count','Input Credit Utilization','GSTR-1 vs GSTR-3B Match','Nil Return Frequency','HSN Code Diversity','Interstate Transaction Ratio','GST Refund Claims','Composition Scheme Flag','E-Invoice Adoption','GST Turnover Growth','Tax Liability Ratio'],
    'Revenue & Cash Flow':['Monthly Revenue Trend','Revenue Volatility','Cash Flow Stability','Operating Cash Ratio','Net Cash Position','Revenue Concentration','Seasonal Revenue Index','MoM Growth Rate','QoQ Growth Rate','YoY Growth Rate','Peak Revenue Month','Revenue Predictability','Cash Conversion Cycle','Days Sales Outstanding','Days Payable Outstanding','Working Capital Ratio','Current Ratio','Quick Ratio','Cash Reserve Days','Revenue per Employee'],
    'UPI & Digital':['UPI Transaction Count','Average Ticket Size','UPI Volume Growth','QR Code Payments','Digital Payment Ratio','Merchant Settlement Speed','Peak Transaction Hour','Weekend Activity Index','Recurring Payment Count','Failed Transaction Rate','Refund Rate','Digital Wallet Usage','POS Terminal Activity','Online Sales Ratio','Mobile Banking Usage'],
    'Supplier & Customer':['Supplier Concentration','Customer Concentration','Top Customer Revenue Share','Supplier Payment Timeliness','New Customer Acquisition','Customer Retention Rate','Supplier Diversity Score','Customer Geography Spread','Order Frequency','Average Order Value','Credit Period Utilized','Return Rate','Repeat Customer Ratio','B2B vs B2C Ratio','Contract Customer Share'],
    'Employee & HR':['Salary Consistency','Employee Retention Rate','Salary Growth Rate','EPF Compliance','ESI Compliance','Employee Count Trend','Avg Salary Level','Payroll Regularity','Bonus Payments','Contractor Ratio'],
    'Utility Behaviour':['Power Consumption Trend','Water Consumption Pattern','Electricity Payment Discipline','Water Bill Regularity','Internet Bill Consistency','Mobile Bill Payments','Utility Cost Ratio','Power Usage Seasonality','Green Energy Adoption','Smart Meter Data'],
    'Working Capital':['Avg Inventory Cycle','Inventory Turnover','Receivables Turnover','Payables Turnover','Working Capital Gap','Stock Holding Period','Debtor Collection Period','Creditor Payment Period','Cash Gap Days','Overdue Invoice Ratio','Invoice Realization Rate','Payment Delay Index','Credit Utilization','Overdraft Usage','Fund Utilization'],
    'Compliance':['Overall Compliance Score','ROC Filing Status','Annual Return Filing','Board Meeting Compliance','Statutory Audit Status','TDS Compliance','PF Compliance Rate','GST Compliance','Income Tax Compliance','Labor Law Compliance'],
    'Risk & Fraud':['Fraud Indicator Score','Identity Consistency','Geographical Risk','Business Category Risk','Transaction Anomaly Score','Circular Trading Flag','Shell Company Indicators','Benford Law Deviation','Duplicate Invoice Detection','Unusual Hour Transactions','Rapid Address Changes','Director Network Risk','Related Party Transactions','Cash Intensity Ratio','Sudden Volume Spike'],
    'Industry & Benchmark':['Industry Percentile','Peer Revenue Comparison','Sector Growth Alignment','Market Position Score','Business Stability Index','Digital Adoption vs Peers','Compliance vs Industry','Profitability vs Sector','Employee Productivity Rank','Innovation Index']
  };
  const features:FeatureItem[]=[];
  Object.entries(cats).forEach(([cat,names])=>{
    names.forEach(name=>{
      features.push({
        name,category:cat,
        value:randF(0.1,99.9),
        confidence:randF(0.7,0.99),
        trend:(['up','down','stable'] as const)[rand(0,2)],
        importance:randF(0,1)
      });
    });
  });
  return features.sort((a,b)=>b.importance-a.importance);
}

export const modelResults:ModelResult[]=[
  {name:'XGBoost',accuracy:0.924,precision:0.918,recall:0.931,f1:0.924,roc:0.967,color:'#F58220'},
  {name:'LightGBM',accuracy:0.919,precision:0.912,recall:0.927,f1:0.919,roc:0.963,color:'#00836C'},
  {name:'Random Forest',accuracy:0.897,precision:0.891,recall:0.904,f1:0.897,roc:0.948,color:'#3B82F6'},
  {name:'CatBoost',accuracy:0.921,precision:0.915,recall:0.928,f1:0.921,roc:0.965,color:'#8B5CF6'},
  {name:'Voting Ensemble',accuracy:0.938,precision:0.933,recall:0.944,f1:0.938,roc:0.978,color:'#EC4899'},
];

export const rocData = Array.from({length:100},(_,i)=>{
  const x=i/100;
  return {
    fpr:x,
    xgboost:Math.min(1,Math.pow(x,0.3)*0.97),
    lightgbm:Math.min(1,Math.pow(x,0.32)*0.96),
    rf:Math.min(1,Math.pow(x,0.38)*0.95),
    catboost:Math.min(1,Math.pow(x,0.31)*0.965),
    ensemble:Math.min(1,Math.pow(x,0.28)*0.98),
    random:x
  };
});

export const shapFeatures = [
  {name:'GST Filing Consistency',value:0.18,positive:true},
  {name:'Monthly Revenue Trend',value:0.15,positive:true},
  {name:'UPI Transaction Volume',value:0.12,positive:true},
  {name:'Cash Flow Stability',value:0.11,positive:true},
  {name:'Employee Retention',value:0.09,positive:true},
  {name:'Digital Payment Ratio',value:0.08,positive:true},
  {name:'Compliance Score',value:0.07,positive:true},
  {name:'Customer Retention Rate',value:0.06,positive:true},
  {name:'Supplier Diversity',value:0.05,positive:true},
  {name:'Working Capital Ratio',value:0.04,positive:true},
  {name:'Payment Delay Index',value:-0.14,positive:false},
  {name:'Cash Flow Volatility',value:-0.11,positive:false},
  {name:'High Supplier Concentration',value:-0.09,positive:false},
  {name:'Low Invoice Realization',value:-0.08,positive:false},
  {name:'Irregular Utility Payments',value:-0.07,positive:false},
  {name:'Seasonal Revenue Dependency',value:-0.06,positive:false},
  {name:'Low Digital Adoption',value:-0.05,positive:false},
  {name:'High Cash Intensity',value:-0.04,positive:false},
  {name:'Transaction Anomalies',value:-0.03,positive:false},
  {name:'Geographic Risk',value:-0.02,positive:false},
];

export const healthSubScores = [
  {name:'Compliance',score:82,max:100,icon:'Shield',color:'#10B981'},
  {name:'Cash Flow',score:71,max:100,icon:'TrendingUp',color:'#3B82F6'},
  {name:'Growth',score:78,max:100,icon:'BarChart3',color:'#8B5CF6'},
  {name:'Liquidity',score:65,max:100,icon:'Droplets',color:'#06B6D4'},
  {name:'Operations',score:74,max:100,icon:'Settings',color:'#F59E0B'},
  {name:'Employee Health',score:88,max:100,icon:'Users',color:'#EC4899'},
  {name:'Utility Behaviour',score:69,max:100,icon:'Zap',color:'#F58220'},
  {name:'Digital Behaviour',score:85,max:100,icon:'Smartphone',color:'#00836C'},
  {name:'Industry Rank',score:72,max:100,icon:'Award',color:'#6366F1'},
  {name:'Peer Ranking',score:67,max:100,icon:'GitBranch',color:'#14B8A6'},
];

export const copilotResponses:{[k:string]:string} = {
  'Why is the score low?': `Based on the AI analysis, the score is impacted by several factors:\n\n1. **Payment Delay Index** (Impact: -14%) - Late payments to suppliers averaging 12 days past due\n2. **Cash Flow Volatility** (Impact: -11%) - Monthly cash flow fluctuations of ±35%\n3. **High Supplier Concentration** (Impact: -9%) - 78% procurement from just 2 suppliers\n4. **Low Invoice Realization** (Impact: -8%) - Only 72% of invoices collected within 30 days\n\n**Recommendation:** Focus on reducing payment delays and diversifying suppliers to see a 50-80 point improvement within 3 months.`,
  'How to improve score?': `Here are actionable steps to improve the Financial Health Score:\n\n📈 **Quick Wins (1-2 months):**\n- Clear overdue invoices and maintain <5 day payment delays\n- Increase digital payment adoption to >60%\n- File GST returns before the 11th of each month\n\n🔄 **Medium Term (3-6 months):**\n- Diversify supplier base (target: no single supplier >30%)\n- Build 45-day cash reserve\n- Automate invoice collection\n\n🎯 **Long Term (6-12 months):**\n- Reduce seasonal revenue dependency\n- Invest in digital infrastructure\n- Improve employee retention programs\n\n**Expected Impact:** +80-120 points over 6 months`,
  'How to increase loan eligibility?': `To increase loan eligibility, focus on these key areas:\n\n💰 **Current Eligibility:** ₹18.5 Lakhs\n🎯 **Potential Eligibility:** ₹35-45 Lakhs\n\n**Steps to increase:**\n1. Maintain consistent revenue for 3+ months (current gap: ₹2.3L variance)\n2. Reduce existing credit utilization from 78% to below 50%\n3. Clear all overdue utility payments\n4. File pending ITR for FY 2024-25\n5. Add 2-3 new customer contracts\n6. Maintain EPFO compliance for all employees\n\n**Timeline:** 4-6 months to see significant improvement`,
  'Which factor affected score most?': `Top factors affecting the score (ranked by SHAP importance):\n\n🟢 **Positive Factors:**\n| Factor | Impact | Score |\n|--------|--------|-------|\n| GST Filing Consistency | +18% | 92/100 |\n| Monthly Revenue Trend | +15% | 85/100 |\n| UPI Transaction Volume | +12% | 78/100 |\n\n🔴 **Negative Factors:**\n| Factor | Impact | Score |\n|--------|--------|-------|\n| Payment Delay Index | -14% | 34/100 |\n| Cash Flow Volatility | -11% | 42/100 |\n| Supplier Concentration | -9% | 38/100 |\n\nThe **Payment Delay Index** is the single biggest drag on your score.`,
  'Generate business insights': `📊 **AI-Generated Business Insights**\n\n**Revenue Pattern:**\nYour business shows strong Q3 performance (Jul-Sep) with 23% higher revenue. Consider building inventory and credit lines before this period.\n\n**Digital Maturity:**\nDigital payment adoption is at 85th percentile for your sector. This is a strong positive signal for lenders.\n\n**Risk Alerts:**\n⚠️ Customer concentration risk: Top 3 customers = 67% revenue\n⚠️ Working capital cycle increased from 45 to 62 days\n\n**Opportunities:**\n✅ Eligible for CGTMSE guarantee (score > 600)\n✅ GeM registration can unlock government contracts\n✅ EPFO compliance qualifies for PMEGP benefits\n\n**Peer Comparison:**\nYou rank in the 72nd percentile among ${sectors[0]} MSMEs in your region.`
};

export const officerDashboardData = {
  totalApplications: 247,
  approved: 156,
  rejected: 38,
  pending: 53,
  avgScore: 672,
  sectorDistribution: sectors.map(s=>({name:s,value:rand(15,45)})),
  riskHeatmap: sectors.slice(0,6).map(s=>({
    sector:s,
    excellent:rand(5,20),good:rand(10,25),moderate:rand(5,15),highRisk:rand(2,10)
  })),
  approvalFunnel:[
    {stage:'Applications',value:247},
    {stage:'Data Connected',value:218},
    {stage:'AI Scored',value:205},
    {stage:'Officer Review',value:178},
    {stage:'Approved',value:156},
  ],
  fraudAlerts:[
    {id:'FA001',business:'XYZ Traders',type:'Circular Trading',severity:'high',date:'2026-07-01'},
    {id:'FA002',business:'ABC Exports',type:'Duplicate Invoices',severity:'medium',date:'2026-07-02'},
    {id:'FA003',business:'PQR Logistics',type:'Shell Company Link',severity:'high',date:'2026-07-03'},
  ],
  stateDistribution:[
    {state:'Maharashtra',count:52},{state:'Gujarat',count:38},{state:'Karnataka',count:31},
    {state:'Tamil Nadu',count:28},{state:'Delhi',count:25},{state:'Rajasthan',count:22},
    {state:'UP',count:19},{state:'Telangana',count:16},{state:'WB',count:9},{state:'Others',count:7}
  ],
  recentActivity:[
    {time:'2 min ago',action:'Application MSME0012 approved by Officer Kapoor',type:'success'},
    {time:'15 min ago',action:'Fraud alert triggered for XYZ Traders',type:'danger'},
    {time:'32 min ago',action:'New application from Kumar Manufacturing',type:'info'},
    {time:'1 hr ago',action:'Score override: MSME0008 adjusted from 520 to 580',type:'warning'},
    {time:'2 hr ago',action:'Bulk data sync completed for 23 accounts',type:'info'},
  ]
};

export const adminDashboardData = {
  users:{total:34,officers:12,msme:20,admins:2},
  apiMetrics:{totalCalls:15847,avgLatency:142,errorRate:0.3,uptime:99.97},
  modelMetrics: Array.from({length:30},(_,i)=>({
    day:`Jun ${i+1}`,accuracy:randF(0.92,0.95),drift:randF(0,0.05),requests:rand(400,700)
  })),
  systemHealth:{cpu:rand(25,65),memory:rand(40,75),disk:rand(30,60),gpu:rand(10,45)},
  logs:[
    {ts:'18:24:01',level:'INFO',msg:'Model prediction completed in 142ms',source:'ml-engine'},
    {ts:'18:23:55',level:'INFO',msg:'Data ingestion pipeline started for MSME0023',source:'data-engine'},
    {ts:'18:23:48',level:'WARN',msg:'Redis cache miss rate above threshold (12%)',source:'cache'},
    {ts:'18:23:30',level:'INFO',msg:'JWT token refreshed for officer_kapoor',source:'auth'},
    {ts:'18:23:15',level:'ERROR',msg:'EPFO API timeout after 30s - retrying',source:'data-source'},
    {ts:'18:22:58',level:'INFO',msg:'Health card PDF generated for MSME0019',source:'pdf-engine'},
  ]
};

export const ingestionLogs = [
  {time:'00:00.000',msg:'Initializing data ingestion pipeline...',type:'info' as const},
  {time:'00:00.124',msg:'Connecting to GST data source...',type:'info' as const},
  {time:'00:00.892',msg:'✓ GST data fetched: 2,847 records',type:'success' as const},
  {time:'00:01.203',msg:'Connecting to UPI transaction history...',type:'info' as const},
  {time:'00:02.156',msg:'✓ UPI data fetched: 12,456 transactions',type:'success' as const},
  {time:'00:02.890',msg:'Connecting to Bank Statement API...',type:'info' as const},
  {time:'00:03.672',msg:'✓ Bank statements fetched: 36 months',type:'success' as const},
  {time:'00:04.100',msg:'Running duplicate detection...',type:'info' as const},
  {time:'00:04.567',msg:'⚠ Found 23 duplicate entries - removing',type:'warning' as const},
  {time:'00:05.234',msg:'Normalizing date formats across sources...',type:'info' as const},
  {time:'00:05.890',msg:'✓ Date normalization complete',type:'success' as const},
  {time:'00:06.123',msg:'Handling missing values (strategy: interpolation)...',type:'info' as const},
  {time:'00:06.789',msg:'⚠ 47 missing values imputed',type:'warning' as const},
  {time:'00:07.234',msg:'Running feature engineering pipeline...',type:'info' as const},
  {time:'00:08.456',msg:'✓ Generated 156 features from raw data',type:'success' as const},
  {time:'00:09.012',msg:'Data quality score: 94.7%',type:'success' as const},
  {time:'00:09.500',msg:'✓ Pipeline complete. Ready for AI analysis.',type:'success' as const},
];
