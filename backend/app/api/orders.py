from fastapi import APIRouter, HTTPException, Depends, Query
from typing import Optional
from app.models.order import (
    Order, OrderCreate, OrderUpdate, OrderResponse, 
    OrdersListResponse, OrderStatusEnum, PaymentStatusEnum
)
from app.config import settings
from datetime import datetime, timedelta
import uuid
import random
import string

router = APIRouter()

# In-memory orders storage (in production, use Supabase)
ORDERS = {}


def generate_order_id() -> str:
    """Generate a human-readable order ID"""
    timestamp = datetime.now().strftime("%Y%m%d")
    random_part = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"CC-{timestamp}-{random_part}"


def calculate_delivery_fee(subtotal: int) -> int:
    """Calculate delivery fee based on order value"""
    if subtotal >= settings.FREE_DELIVERY_THRESHOLD:
        return 0
    return settings.DELIVERY_FEE


@router.post("/", response_model=OrderResponse)
async def create_order(order_data: OrderCreate):
    """
    Create a new order
    """
    # Calculate totals
    subtotal = sum(item.price * item.quantity for item in order_data.items)
    delivery_fee = calculate_delivery_fee(subtotal)
    discount = 0  # TODO: Apply promo code
    total = subtotal + delivery_fee - discount
    
    order_id = generate_order_id()
    db_id = str(uuid.uuid4())
    
    # Calculate estimated delivery time
    estimated_delivery = datetime.now() + timedelta(minutes=45)
    if order_data.scheduled_time:
        estimated_delivery = order_data.scheduled_time
    
    order = Order(
        id=db_id,
        order_id=order_id,
        user_id=None,  # TODO: Get from auth
        items=order_data.items,
        subtotal=subtotal,
        delivery_fee=delivery_fee,
        discount=discount,
        total=total,
        status=OrderStatusEnum.PENDING,
        payment_status=PaymentStatusEnum.PENDING,
        payment_method=order_data.payment_method,
        delivery_address=order_data.delivery_address,
        scheduled_time=order_data.scheduled_time,
        estimated_delivery=estimated_delivery,
        created_at=datetime.now(),
    )
    
    ORDERS[db_id] = order.model_dump()
    
    return OrderResponse(
        order=order,
        message="Order created successfully. Please proceed to payment."
    )


@router.get("/", response_model=OrdersListResponse)
async def get_orders(
    status: Optional[OrderStatusEnum] = None,
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=50),
):
    """
    Get all orders with optional filtering
    """
    orders = list(ORDERS.values())
    
    if status:
        orders = [o for o in orders if o["status"] == status.value]
    
    # Sort by created_at descending
    orders.sort(key=lambda x: x["created_at"], reverse=True)
    
    total = len(orders)
    start = (page - 1) * per_page
    end = start + per_page
    orders = orders[start:end]
    
    return OrdersListResponse(
        orders=orders,
        total=total,
        page=page,
        per_page=per_page,
    )


@router.get("/{order_id}", response_model=Order)
async def get_order(order_id: str):
    """
    Get a specific order by ID or order_id
    """
    # Try to find by db ID first
    if order_id in ORDERS:
        return ORDERS[order_id]
    
    # Try to find by human-readable order_id
    for order in ORDERS.values():
        if order["order_id"] == order_id:
            return order
    
    raise HTTPException(status_code=404, detail="Order not found")


@router.patch("/{order_id}", response_model=Order)
async def update_order(order_id: str, order_update: OrderUpdate):
    """
    Update order status (for kitchen/delivery staff)
    """
    order = None
    db_id = None
    
    if order_id in ORDERS:
        order = ORDERS[order_id]
        db_id = order_id
    else:
        for oid, o in ORDERS.items():
            if o["order_id"] == order_id:
                order = o
                db_id = oid
                break
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    update_data = order_update.model_dump(exclude_unset=True)
    ORDERS[db_id] = {**order, **update_data, "updated_at": datetime.now().isoformat()}
    
    return ORDERS[db_id]


@router.post("/{order_id}/cancel")
async def cancel_order(order_id: str):
    """
    Cancel an order
    """
    order = None
    db_id = None
    
    if order_id in ORDERS:
        order = ORDERS[order_id]
        db_id = order_id
    else:
        for oid, o in ORDERS.items():
            if o["order_id"] == order_id:
                order = o
                db_id = oid
                break
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Check if order can be cancelled
    if order["status"] in [OrderStatusEnum.ON_THE_WAY.value, OrderStatusEnum.DELIVERED.value]:
        raise HTTPException(
            status_code=400, 
            detail="Cannot cancel order that is already on the way or delivered"
        )
    
    ORDERS[db_id]["status"] = OrderStatusEnum.CANCELLED.value
    ORDERS[db_id]["updated_at"] = datetime.now().isoformat()
    
    return {"message": "Order cancelled successfully"}

