from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
import json
import os
import time

from ..ml.inference import engine
from ..ml.explain import explain_prediction

router = APIRouter(prefix="/ml", tags=["Machine Learning"])
ARTIFACTS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'artifacts')

class MSMEFeatures(BaseModel):
    # Using open schema to allow flexible inference mapping
    vintage_years: Optional[int] = Field(None, ge=0)
    employees: Optional[int] = Field(None, ge=1)
    annual_revenue: Optional[float] = Field(None, ge=0)
    revenue_growth_yoy: Optional[float] = None
    profit_margin: Optional[float] = None
    working_capital_ratio: Optional[float] = None
    debt_to_equity: Optional[float] = Field(None, ge=0)
    gst_filing_consistency: Optional[float] = Field(None, ge=0, le=1)
    upi_txn_volume_monthly: Optional[int] = Field(None, ge=0)
    digital_payment_ratio: Optional[float] = Field(None, ge=0, le=1)
    payment_delay_days_avg: Optional[float] = None
    supplier_concentration: Optional[float] = Field(None, ge=0, le=1)
    cash_flow_volatility: Optional[float] = Field(None, ge=0, le=1)
    utility_payment_irregularity: Optional[float] = Field(None, ge=0)
    
    class Config:
        extra = "allow" # Gracefully accept unseen columns

class PredictionResponse(BaseModel):
    probability_of_default: float
    credit_score: int
    rating: str
    is_eligible: bool
    confidence_score: float
    model_version: str
    explanation: Optional[Dict[str, Any]] = None

@router.post("/predict", response_model=PredictionResponse)
async def predict_risk(features: MSMEFeatures, explain: bool = False):
    """
    Robust Inference Endpoint.
    Automatically handles missing columns, extra columns, and outputs confidence scoring.
    """
    features_dict = features.model_dump(exclude_unset=True)
    
    # Robust Inference Engine
    result = engine.predict(features_dict)
    
    explanation = None
    if explain:
        explanation = explain_prediction(features_dict)
        
    return PredictionResponse(
        **result,
        explanation=explanation
    )

@router.get("/model-card")
async def get_model_card():
    """
    Returns the comprehensive benchmarking metrics for the active production model.
    """
    card_path = os.path.join(ARTIFACTS_DIR, 'model_card.json')
    if os.path.exists(card_path):
        with open(card_path, 'r') as f:
            return json.load(f)
    
    # Mock fallback
    return {
        "version": "v1.0.0-mock",
        "best_model": "LightGBM",
        "benchmarks": [
            {"model": "LightGBM", "accuracy": 0.931, "roc_auc": 0.974, "latency_ms": 2.4}
        ]
    }

def run_retraining_task():
    from ..ml.train_advanced import train_and_benchmark
    train_and_benchmark()
    # Reload engine after training
    engine.load_model()

@router.post("/retrain")
async def trigger_retraining(background_tasks: BackgroundTasks):
    """
    Triggers the ML pipeline to retrain on fresh data in the background.
    """
    background_tasks.add_task(run_retraining_task)
    return {"status": "accepted", "message": "Retraining pipeline triggered in the background."}
