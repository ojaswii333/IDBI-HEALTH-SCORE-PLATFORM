import os
import joblib
import pandas as pd
import numpy as np
import optuna
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import roc_auc_score, accuracy_score, precision_score, recall_score, f1_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier
import warnings
warnings.filterwarnings('ignore')

# Set up paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARTIFACTS_DIR = os.path.join(BASE_DIR, 'artifacts')
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

def load_data():
    data_path = os.path.join(BASE_DIR, 'ml', 'data', 'msme_synthetic_data.csv')
    if not os.path.exists(data_path):
        from .dataset import generate_synthetic_msme_data
        df = generate_synthetic_msme_data()
    else:
        df = pd.read_csv(data_path)
    
    X = df.drop('default', axis=1)
    y = df['default']
    return X, y

def build_pipeline(classifier):
    return Pipeline([
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler()),
        ('classifier', classifier)
    ])

def tune_lightgbm(X_train, y_train, n_trials=20):
    def objective(trial):
        params = {
            'n_estimators': trial.suggest_int('n_estimators', 50, 300),
            'learning_rate': trial.suggest_float('learning_rate', 1e-3, 0.1, log=True),
            'max_depth': trial.suggest_int('max_depth', 3, 9),
            'min_child_samples': trial.suggest_int('min_child_samples', 10, 100),
            'subsample': trial.suggest_float('subsample', 0.6, 1.0),
            'colsample_bytree': trial.suggest_float('colsample_bytree', 0.6, 1.0),
            'random_state': 42
        }
        clf = LGBMClassifier(**params, verbose=-1)
        pipe = build_pipeline(clf)
        score = cross_val_score(pipe, X_train, y_train, cv=5, scoring='roc_auc').mean()
        return score
        
    study = optuna.create_study(direction='maximize')
    study.optimize(objective, n_trials=n_trials, show_progress_bar=False)
    
    best_clf = LGBMClassifier(**study.best_params, random_state=42, verbose=-1)
    return build_pipeline(best_clf)

def train_and_evaluate():
    print("Loading data...")
    X, y = load_data()
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    print("Tuning LightGBM Model with Optuna...")
    best_pipe = tune_lightgbm(X_train, y_train, n_trials=10) # 10 trials for demonstration
    
    print("Training final model...")
    best_pipe.fit(X_train, y_train)
    
    print("Evaluating...")
    y_pred = best_pipe.predict(X_test)
    y_prob = best_pipe.predict_proba(X_test)[:, 1]
    
    metrics = {
        'accuracy': accuracy_score(y_test, y_pred),
        'precision': precision_score(y_test, y_pred),
        'recall': recall_score(y_test, y_pred),
        'f1': f1_score(y_test, y_pred),
        'roc_auc': roc_auc_score(y_test, y_prob)
    }
    
    for k, v in metrics.items():
        print(f"{k}: {v:.4f}")
        
    print("Saving model artifacts...")
    joblib.dump(best_pipe, os.path.join(ARTIFACTS_DIR, 'model_lightgbm_v2.pkl'))
    joblib.dump(list(X.columns), os.path.join(ARTIFACTS_DIR, 'feature_names.pkl'))
    
    return metrics

if __name__ == "__main__":
    train_and_evaluate()
