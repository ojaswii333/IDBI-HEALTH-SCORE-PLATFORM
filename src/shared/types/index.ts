// Shared TypeScript types for the IDBI MSME Platform

export type UserRole = 'customer' | 'officer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface MSMEProfile {
  id: string;
  name: string;
  gstin: string;
  udyam: string;
  pan: string;
  sector: string;
  city: string;
  state: string;
  vintage: number;
  employees: number;
  annualRevenue: number;
  contactPerson: string;
  phone: string;
  email: string;
  score: number;
  rating: 'Excellent' | 'Good' | 'Moderate' | 'High Risk';
  status: 'Active' | 'Under Review' | 'Approved' | 'Rejected' | 'Pending';
  loanReady: boolean;
  lastAssessed: string;
}

export interface HealthScore {
  overall: number;
  rating: string;
  ratingColor: string;
  creditLimit: number;
  loanEligibility: number;
  probabilityOfDefault: number;
  confidence: number;
  subScores: SubScore[];
  trend: { month: string; score: number }[];
}

export interface SubScore {
  name: string;
  score: number;
  maxScore: number;
  color: string;
  description: string;
}

export interface LoanProduct {
  id: string;
  name: string;
  type: string;
  maxAmount: number;
  interestRate: string;
  tenure: string;
  eligible: boolean;
  requirements: { label: string; met: boolean }[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'score_change' | 'milestone' | 'document' | 'application' | 'advisory';
  scoreChange?: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'score' | 'document' | 'application' | 'advisory' | 'system';
  read: boolean;
  date: string;
}

export interface Document {
  id: string;
  name: string;
  category: string;
  status: 'verified' | 'pending' | 'expired' | 'rejected';
  uploadedAt: string;
  size: string;
}

export interface LoanApplication {
  id: string;
  type: string;
  amount: number;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'disbursed';
  submittedAt: string;
  stage: string;
  officerNotes?: string;
}

// Admin types
export interface ModelMetrics {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  rocAuc: number;
  prAuc: number;
  latencyMs: number;
  color: string;
  isActive: boolean;
}

export interface SHAPFeature {
  name: string;
  value: number;
  category: string;
}

export interface FraudAlert {
  id: string;
  business: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  date: string;
  status: 'open' | 'investigating' | 'resolved';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  target: string;
  ip: string;
}

export interface SystemService {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  latency: number;
}
