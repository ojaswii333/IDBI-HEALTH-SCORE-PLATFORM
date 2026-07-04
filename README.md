# IDBI MSME Financial Health Intelligence Platform

An enterprise-grade, dual-portal AI credit assessment SaaS built for IDBI Bank. This platform abstracts traditional financial statements into an AI-driven, actionable MSME Health Score, providing distinct interfaces for both business customers and bank officers.

## Architecture Highlights

1. **Dual-Portal System:**
   - **Customer Portal (`/customer`):** A business-friendly dashboard for MSMEs to view their health score, eligibility, insights, and converse with an AI advisor.
   - **Admin Console (`/admin`):** A sophisticated workspace for bank officers featuring underwriting tools, explainable AI (SHAP), drift detection, and model monitoring.
2. **Premium Design System:**
   - Custom CSS architecture inspired by industry leaders (Stripe, Linear, Apple).
   - Fluid typography, 8pt spatial system, and clean data visualizations using Recharts.
3. **Robust Backend:**
   - Modular FastAPI architecture with dedicated routers for `ml`, `customer`, and `admin` logic.
   - Synthetic data engine mirroring real-world MSME behavioral patterns.
   - Ready for Optuna-driven hyperparameter tuning on top tree-based models (LightGBM, XGBoost, CatBoost).

## Tech Stack
- **Frontend:** React 19, TypeScript, Vite, Recharts, Lucide React
- **Backend:** Python 3.11, FastAPI, Uvicorn
- **Machine Learning:** LightGBM, XGBoost, Scikit-Learn, SHAP, Optuna
- **Deployment:** Docker, Docker Compose, Nginx

## Getting Started

### Option 1: Docker (Recommended)
You can launch the entire stack (Frontend, Backend API, PostgreSQL, Redis) using Docker Compose:
```bash
docker-compose up --build
```
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`

### Option 2: Local Development
**Frontend:**
```bash
npm install
npm run dev
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## User Roles (Demo)
Select the role on the login screen to access the respective portal:
- **MSME Customer:** Redirects to `/customer/dashboard`
- **Bank Officer / Admin:** Redirects to `/admin/dashboard`
