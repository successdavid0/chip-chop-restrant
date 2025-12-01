from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.config import settings
import httpx
import uuid

router = APIRouter()


class InitializePaymentRequest(BaseModel):
    order_id: str
    email: str
    amount: int  # Amount in kobo/cents
    callback_url: Optional[str] = None


class InitializePaymentResponse(BaseModel):
    authorization_url: str
    access_code: str
    reference: str


class VerifyPaymentResponse(BaseModel):
    status: str
    message: str
    reference: str
    amount: int
    paid_at: Optional[str] = None


@router.post("/initialize", response_model=InitializePaymentResponse)
async def initialize_payment(request: InitializePaymentRequest):
    """
    Initialize a Paystack payment
    """
    reference = f"chipchop_{uuid.uuid4().hex[:12]}"
    
    # In production, make actual Paystack API call
    # For now, return mock response
    if not settings.PAYSTACK_SECRET_KEY:
        return InitializePaymentResponse(
            authorization_url=f"https://checkout.paystack.com/mock/{reference}",
            access_code=f"access_{reference}",
            reference=reference,
        )
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.paystack.co/transaction/initialize",
            headers={
                "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "email": request.email,
                "amount": request.amount,
                "reference": reference,
                "callback_url": request.callback_url,
                "metadata": {
                    "order_id": request.order_id,
                },
            },
        )
        
        if response.status_code != 200:
            raise HTTPException(
                status_code=400,
                detail="Failed to initialize payment"
            )
        
        data = response.json()
        
        if not data.get("status"):
            raise HTTPException(
                status_code=400,
                detail=data.get("message", "Payment initialization failed")
            )
        
        return InitializePaymentResponse(
            authorization_url=data["data"]["authorization_url"],
            access_code=data["data"]["access_code"],
            reference=data["data"]["reference"],
        )


@router.get("/verify/{reference}", response_model=VerifyPaymentResponse)
async def verify_payment(reference: str):
    """
    Verify a Paystack payment
    """
    # In production, make actual Paystack API call
    if not settings.PAYSTACK_SECRET_KEY:
        return VerifyPaymentResponse(
            status="success",
            message="Payment verified (mock)",
            reference=reference,
            amount=10000,
            paid_at="2024-01-01T12:00:00Z",
        )
    
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://api.paystack.co/transaction/verify/{reference}",
            headers={
                "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
            },
        )
        
        if response.status_code != 200:
            raise HTTPException(
                status_code=400,
                detail="Failed to verify payment"
            )
        
        data = response.json()
        
        if not data.get("status"):
            raise HTTPException(
                status_code=400,
                detail=data.get("message", "Payment verification failed")
            )
        
        payment_data = data["data"]
        
        return VerifyPaymentResponse(
            status=payment_data["status"],
            message=data["message"],
            reference=payment_data["reference"],
            amount=payment_data["amount"],
            paid_at=payment_data.get("paid_at"),
        )


@router.post("/webhook")
async def payment_webhook(payload: dict):
    """
    Handle Paystack webhooks
    """
    event = payload.get("event")
    data = payload.get("data", {})
    
    if event == "charge.success":
        # Update order payment status
        reference = data.get("reference")
        # TODO: Find order by payment reference and update status
        print(f"Payment successful: {reference}")
    
    return {"status": "ok"}

