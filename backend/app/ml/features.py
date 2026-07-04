import pandas as pd
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, RobustScaler
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer

class AdvancedFeatureEngineer(BaseEstimator, TransformerMixin):
    """
    Custom transformer to generate advanced financial features.
    """
    def fit(self, X, y=None):
        return self
        
    def transform(self, X):
        X_out = X.copy()
        
        # Safe division helper
        def safe_div(a, b):
            return np.where(b == 0, 0, a / b)
            
        # 1. Financial Leverage & Liquidity Interactions
        if 'debt_to_equity' in X.columns and 'working_capital_ratio' in X.columns:
            X_out['risk_index_financial'] = X['debt_to_equity'] / (X['working_capital_ratio'] + 1e-5)
            
        # 2. Revenue Efficiency
        if 'annual_revenue' in X.columns and 'employees' in X.columns:
            X_out['revenue_per_employee'] = safe_div(X['annual_revenue'], X['employees'])
            
        # 3. Behavioral Risk Composite
        behavioral_cols = ['payment_delay_days_avg', 'cash_flow_volatility', 'utility_payment_irregularity']
        if all(col in X.columns for col in behavioral_cols):
            # Normalize internally for the composite
            X_out['composite_behavioral_risk'] = (
                X['payment_delay_days_avg'] * 0.5 + 
                X['cash_flow_volatility'] * 100 * 0.3 + 
                X['utility_payment_irregularity'] * 10 * 0.2
            )
            
        # 4. Digital Footprint
        if 'digital_payment_ratio' in X.columns and 'upi_txn_volume_monthly' in X.columns:
            X_out['digital_maturity_score'] = X['digital_payment_ratio'] * np.log1p(X['upi_txn_volume_monthly'])
            
        return X_out

class FallbackColumnMapper(BaseEstimator, TransformerMixin):
    """
    Ensures that incoming data matches the expected training columns.
    Fills missing columns with NaN (which imputers will handle) and drops extra columns.
    """
    def __init__(self, expected_columns):
        self.expected_columns = expected_columns
        
    def fit(self, X, y=None):
        return self
        
    def transform(self, X):
        X_out = pd.DataFrame(index=X.index)
        for col in self.expected_columns:
            if col in X.columns:
                X_out[col] = X[col]
            else:
                X_out[col] = np.nan
        return X_out[self.expected_columns]

def build_feature_pipeline(expected_columns=None):
    """
    Builds the complete sklearn pipeline for feature processing.
    """
    steps = []
    
    if expected_columns is not None:
        steps.append(('mapper', FallbackColumnMapper(expected_columns)))
        
    steps.extend([
        ('engineer', AdvancedFeatureEngineer()),
        # Using IterativeImputer would be better but SimpleImputer is safer for production latency
        ('imputer', SimpleImputer(strategy='median')), 
        # RobustScaler handles remaining outliers better than StandardScaler
        ('scaler', RobustScaler())
    ])
    
    return Pipeline(steps)
