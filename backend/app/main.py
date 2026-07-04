from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .api import ml

app = FastAPI(
    title="IDBI MSME Intelligence API",
    description="Enterprise-grade AI backend for MSME Credit Assessment",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ml.router, prefix="/api/v1")

@app.get("/health")
def health_check():
    return {"status": "healthy", "version": "2.0.0", "service": "idbi-msme-ai-engine"}
