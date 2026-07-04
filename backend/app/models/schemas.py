from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

class MSMEFeatures(BaseModel):
    vintage_years: int = Field(..., ge=1)
    employees: int = Field(..., ge=1)
    annual_revenue: float = Field(..., ge=0)
    revenue_growth_yoy: Optional[float] = None
    profit_margin: float
    working_capital_ratio: Optional[float] = None
    debt_to_equity: float = Field(..., ge=0)
    gst_filing_consistency: float = Field(..., ge=0, le=1)
    upi_txn_volume_monthly: int = Field(..., ge=0)
    digital_payment_ratio: float = Field(..., ge=0, le=1)
    payment_delay_days_avg: float = Field(..., ge=0)
    supplier_concentration: float = Field(..., ge=0, le=1)
    cash_flow_volatility: float = Field(..., ge=0, le=1)
    utility_payment_irregularity: float = Field(..., ge=0)

class PredictionResponse(BaseModel):
    probability_of_default: float
    credit_score: int
    rating: str
    is_eligible: bool
    explanation: Optional[Dict[str, Any]] = None

class ModelMetricsResponse(BaseModel):
    accuracy: float
    precision: float
    recall: float
    f1: float
    roc_auc: float
    latency_ms: float
