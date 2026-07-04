import os
import joblib
import shap
import pandas as pd
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARTIFACTS_DIR = os.path.join(BASE_DIR, 'artifacts')

def get_explainer():
    """Loads the production pipeline and initializes the SHAP explainer."""
    model_path = os.path.join(ARTIFACTS_DIR, 'production_pipeline.pkl')
    if not os.path.exists(model_path):
        return None, None, None
        
    pipeline = joblib.load(model_path)
    
    # Extract the base estimator from the CalibratedClassifierCV
    # CalibratedClassifierCV has an attribute `calibrated_classifiers_` after fitting
    calibrated_clf = pipeline['classifier']
    if hasattr(calibrated_clf, 'calibrated_classifiers_'):
        # Just use the first base estimator for SHAP explanations (an approximation)
        base_estimator = calibrated_clf.calibrated_classifiers_[0].estimator
    else:
        base_estimator = calibrated_clf
        
    explainer = shap.TreeExplainer(base_estimator)
    return explainer, pipeline['preprocessing'], pipeline['feature_names']

def explain_prediction(features_dict: dict):
    """
    Computes SHAP values for a single prediction.
    """
    explainer, preprocess_pipe, feature_names = get_explainer()
    if not explainer:
        return mock_explanation()
        
    df = pd.DataFrame([features_dict])
    X_processed = preprocess_pipe.transform(df)
    
    shap_values = explainer.shap_values(X_processed)
    
    if isinstance(shap_values, list):
        shap_vals = shap_values[1][0]
    else:
        shap_vals = shap_values[0]
        
    base_value = explainer.expected_value
    if isinstance(base_value, (list, np.ndarray)):
        base_value = base_value[-1]
        
    contributions = []
    for i, name in enumerate(feature_names):
        contributions.append({
            'feature': name,
            'value': float(shap_vals[i])
        })
        
    contributions.sort(key=lambda x: abs(x['value']), reverse=True)
    return {
        'base_value': float(base_value),
        'contributions': contributions
    }

def mock_explanation():
    return {
        'base_value': -2.1,
        'contributions': [
            {'feature': 'gst_filing_consistency', 'value': -0.45},
            {'feature': 'payment_delay_days_avg', 'value': 0.82},
            {'feature': 'debt_to_equity', 'value': 0.31},
            {'feature': 'profit_margin', 'value': -0.22},
        ]
    }
