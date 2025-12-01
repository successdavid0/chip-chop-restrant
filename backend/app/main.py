from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.api import menu, orders, auth, payments, tracking
from app.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Starting Chip Chop API...")
    yield
    # Shutdown
    print("👋 Shutting down Chip Chop API...")


app = FastAPI(
    title="Chip Chop Food Lounge API",
    description="Backend API for Chip Chop Food Lounge - Premium dining and delivery service",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(menu.router, prefix="/api/menu", tags=["Menu"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])
app.include_router(payments.router, prefix="/api/payments", tags=["Payments"])
app.include_router(tracking.router, prefix="/api/tracking", tags=["Tracking"])


@app.get("/")
async def root():
    return {
        "message": "Welcome to Chip Chop Food Lounge API",
        "version": "1.0.0",
        "docs": "/docs",
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "chipchop-api"}

