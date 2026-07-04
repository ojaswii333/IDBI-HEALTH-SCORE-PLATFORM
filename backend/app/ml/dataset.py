import numpy as np
import pandas as pd
import random

def generate_synthetic_msme_data(num_samples=5000, seed=42):
    """
    Generates a synthetic MSME dataset for credit risk modeling.
    Contains demographic, financial, and behavioral features.
    Target variable: 'default' (1 = default, 0 = no default)
    Injects realistic noise, missing values, and outliers.
    """
    np.random.seed(seed)
    random.seed(seed)
    
    # 1. Base Profiles
    vintage_years = np.random.gamma(shape=2.5, scale=2.0, size=num_samples).astype(int) + 1
    employees = np.random.lognormal(mean=2.5, sigma=1.2, size=num_samples).astype(int) + 2
    
    # 2. Financial Metrics
    annual_revenue = np.random.lognormal(mean=15.5, sigma=1.5, size=num_samples)
    revenue_growth_yoy = np.random.normal(loc=0.08, scale=0.15, size=num_samples)
    
    # Ratios
    profit_margin = np.random.normal(loc=0.12, scale=0.08, size=num_samples)
    working_capital_ratio = np.random.normal(loc=1.5, scale=0.8, size=num_samples)
    debt_to_equity = np.random.lognormal(mean=0.2, sigma=0.8, size=num_samples)
    
    # 3. Alternate Data (GST, UPI, Banking)
    gst_filing_consistency = np.random.beta(a=8, b=2, size=num_samples)
    upi_txn_volume_monthly = np.random.lognormal(mean=8, sigma=2, size=num_samples).astype(int)
    digital_payment_ratio = np.random.beta(a=6, b=4, size=num_samples)
    
    # 4. Behavioral / Risk signals
    payment_delay_days_avg = np.random.exponential(scale=15, size=num_samples)
    supplier_concentration = np.random.beta(a=4, b=6, size=num_samples)
    cash_flow_volatility = np.random.beta(a=2, b=5, size=num_samples)
    utility_payment_irregularity = np.random.exponential(scale=2, size=num_samples)
    
    # 5. Calculate latent risk score
    latent_risk = (
        (payment_delay_days_avg / 30) * 2.5 +
        (debt_to_equity / 2) * 1.5 -
        (profit_margin * 5) -
        (gst_filing_consistency * 2) +
        (cash_flow_volatility * 3) +
        (supplier_concentration * 1.5) -
        (digital_payment_ratio * 1.0)
    )
    
    # 6. Generate target variable (Probability of default)
    prob_default = 1 / (1 + np.exp(-(latent_risk - np.mean(latent_risk)) / np.std(latent_risk)))
    threshold = np.percentile(prob_default, 88)
    default = (prob_default >= threshold).astype(int)
    
    df = pd.DataFrame({
        'vintage_years': vintage_years,
        'employees': employees,
        'annual_revenue': annual_revenue,
        'revenue_growth_yoy': revenue_growth_yoy,
        'profit_margin': profit_margin,
        'working_capital_ratio': working_capital_ratio,
        'debt_to_equity': debt_to_equity,
        'gst_filing_consistency': gst_filing_consistency,
        'upi_txn_volume_monthly': upi_txn_volume_monthly,
        'digital_payment_ratio': digital_payment_ratio,
        'payment_delay_days_avg': payment_delay_days_avg,
        'supplier_concentration': supplier_concentration,
        'cash_flow_volatility': cash_flow_volatility,
        'utility_payment_irregularity': utility_payment_irregularity,
        'default': default
    })
    
    # 7. Inject Missing Values (MCAR & MAR)
    df.loc[df.sample(frac=0.08, random_state=42).index, 'revenue_growth_yoy'] = np.nan
    df.loc[df.sample(frac=0.05, random_state=43).index, 'working_capital_ratio'] = np.nan
    # High risk correlates with missing GST data
    mar_mask = (df['default'] == 1) & (np.random.rand(num_samples) < 0.2)
    df.loc[mar_mask, 'gst_filing_consistency'] = np.nan

    # 8. Inject Outliers
    outlier_idx = df.sample(frac=0.02, random_state=44).index
    df.loc[outlier_idx, 'annual_revenue'] *= 100
    df.loc[outlier_idx, 'debt_to_equity'] *= 50
    df.loc[outlier_idx, 'payment_delay_days_avg'] = -50  # Impossible value
    
    # 9. Inject Duplicates
    df = pd.concat([df, df.sample(frac=0.03, random_state=45)]).sample(frac=1, random_state=46).reset_index(drop=True)
    
    return df

if __name__ == "__main__":
    import os
    os.makedirs('data', exist_ok=True)
    df = generate_synthetic_msme_data()
    df.to_csv('data/msme_synthetic_data.csv', index=False)
    print(f"Generated {len(df)} records. Default rate: {df['default'].mean()*100:.2f}%")
