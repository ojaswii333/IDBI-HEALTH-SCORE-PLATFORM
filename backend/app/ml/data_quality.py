import pandera as pa
from pandera.typing import DataFrame, Series
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
import warnings

# Define the strict expected schema for MSME data
class MSMESchema(pa.SchemaModel):
    vintage_years: Series[int] = pa.Field(ge=0)
    employees: Series[int] = pa.Field(ge=1)
    annual_revenue: Series[float] = pa.Field(ge=0)
    revenue_growth_yoy: Series[float] = pa.Field(nullable=True)
    profit_margin: Series[float] = pa.Field(nullable=True)
    working_capital_ratio: Series[float] = pa.Field(nullable=True)
    debt_to_equity: Series[float] = pa.Field(ge=0, nullable=True)
    gst_filing_consistency: Series[float] = pa.Field(ge=0, le=1, nullable=True)
    upi_txn_volume_monthly: Series[int] = pa.Field(ge=0)
    digital_payment_ratio: Series[float] = pa.Field(ge=0, le=1)
    payment_delay_days_avg: Series[float] = pa.Field(ge=0) # We injected negatives, pandera will catch them
    supplier_concentration: Series[float] = pa.Field(ge=0, le=1)
    cash_flow_volatility: Series[float] = pa.Field(ge=0, le=1)
    utility_payment_irregularity: Series[float] = pa.Field(ge=0)
    
    class Config:
        coerce = True
        strict = False # Allow extra columns (e.g. target) during training

def validate_schema(df: pd.DataFrame) -> pd.DataFrame:
    """Validates dataframe against strict MSMESchema. Drops invalid rows."""
    try:
        validated_df = MSMESchema.validate(df, lazy=True)
        return validated_df
    except pa.errors.SchemaErrors as err:
        warnings.warn(f"Schema validation failed for {len(err.failure_cases)} cases. Dropping invalid rows.")
        # Drop rows with impossible values (e.g., negative payment delay)
        # Pandera failure_cases contains index of failed rows
        bad_indices = err.failure_cases['index'].dropna().unique()
        df = df.drop(index=bad_indices)
        return df

def detect_outliers(df: pd.DataFrame, contamination=0.02) -> pd.Series:
    """Uses IsolationForest to detect multivariate outliers."""
    # Only use numeric columns without NaNs for isolation forest
    num_df = df.select_dtypes(include=[np.number]).fillna(df.median(numeric_only=True))
    clf = IsolationForest(contamination=contamination, random_state=42)
    preds = clf.fit_predict(num_df)
    return preds == -1 # True if outlier

def calculate_data_quality_score(df: pd.DataFrame) -> dict:
    """Calculates comprehensive data quality metrics."""
    total_rows = len(df)
    
    # 1. Missingness
    missing_pct = df.isna().mean().mean()
    
    # 2. Duplicates
    dup_pct = df.duplicated().mean()
    
    # 3. Outliers
    outlier_pct = detect_outliers(df).mean()
    
    # Overall Score (100 = perfect)
    dq_score = max(0, 100 - (missing_pct * 100 * 2) - (dup_pct * 100 * 3) - (outlier_pct * 100 * 1.5))
    
    return {
        "dq_score": round(dq_score, 1),
        "missing_rate": round(missing_pct * 100, 2),
        "duplicate_rate": round(dup_pct * 100, 2),
        "outlier_rate": round(outlier_pct * 100, 2)
    }

def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """Runs the full data cleaning pipeline."""
    # 1. Deduplicate
    df = df.drop_duplicates().reset_index(drop=True)
    
    # 2. Schema Validation (Drops impossible values)
    df = validate_schema(df)
    
    # 3. Outlier Removal
    outlier_mask = detect_outliers(df)
    df = df[~outlier_mask].reset_index(drop=True)
    
    return df
