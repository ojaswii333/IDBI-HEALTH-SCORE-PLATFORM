import os
import joblib
import pandas as pd
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARTIFACTS_DIR = os.path.join(BASE_DIR, 'artifacts')

class InferenceEngine:
    def __init__(self):
        self.pipeline = None
        self.load_model()
        
    def load_model(self):
        model_path = os.path.join(ARTIFACTS_DIR, 'production_pipeline.pkl')
        if os.path.exists(model_path):
            self.pipeline = joblib.load(model_path)
            
    def predict(self, features_dict: dict):
        """
        Runs robust inference on the input features.
        Handles missing columns, calculates default probability, and computes an inference confidence score.
        """
        if not self.pipeline:
            return self.mock_predict()
            
        df = pd.DataFrame([features_dict])
        
        # 1. Preprocessing (FallbackColumnMapper handles missing features automatically)
        preprocess_pipe = self.pipeline['preprocessing']
        X_processed = preprocess_pipe.transform(df)
        
        # 2. Prediction using CalibratedClassifierCV
        classifier = self.pipeline['classifier']
        
        # Calibrated classifier returns probability distribution
        prob = float(classifier.predict_proba(X_processed)[0, 1])
        
        # 3. Inference Confidence (Entropy-based)
        # If prob is near 0.5, confidence is low. If near 0 or 1, confidence is high.
        entropy = - (prob * np.log2(prob + 1e-9) + (1 - prob) * np.log2(1 - prob + 1e-9))
        confidence = max(0, min(100, (1 - entropy) * 100))
        
        # 4. Map probability to health score
        score = int(900 - (prob * 600))
        score = max(300, min(900, score))
        
        return {
            "probability_of_default": prob,
            "credit_score": score,
            "rating": 'Excellent' if score >= 750 else 'Good' if score >= 650 else 'Moderate' if score >= 500 else 'High Risk',
            "is_eligible": score >= 600,
            "confidence_score": round(confidence, 1),
            "model_version": self.pipeline['version']
        }
        
    def mock_predict(self):
        return {
            "probability_of_default": 0.08,
            "credit_score": 724,
            "rating": "Good",
            "is_eligible": True,
            "confidence_score": 92.5,
            "model_version": "v1.0.0-mock"
        }

engine = InferenceEngine()
