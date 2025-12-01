from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from enum import Enum
from datetime import datetime


class OrderStatusEnum(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    PREPARING = "preparing"
    READY = "ready"
    PICKED_UP = "picked_up"
    ON_THE_WAY = "on_the_way"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"


class PaymentMethodEnum(str, Enum):
    CARD = "card"
    WALLET = "wallet"
    BANK_TRANSFER = "bank_transfer"
    CASH_ON_DELIVERY = "cash_on_delivery"


class PaymentStatusEnum(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"


class OrderItem(BaseModel):
    menu_item_id: str
    name: str
    quantity: int = Field(..., gt=0)
    price: int = Field(..., gt=0)
    special_instructions: Optional[str] = None


class DeliveryAddress(BaseModel):
    full_name: str
    phone: str
    email: EmailStr
    address: str
    city: str
    landmark: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class OrderCreate(BaseModel):
    items: List[OrderItem]
    delivery_address: DeliveryAddress
    scheduled_time: Optional[datetime] = None
    payment_method: PaymentMethodEnum
    discount_code: Optional[str] = None
    special_instructions: Optional[str] = None


class OrderUpdate(BaseModel):
    status: Optional[OrderStatusEnum] = None
    rider_id: Optional[str] = None
    rider_location: Optional[dict] = None


class Order(BaseModel):
    id: str
    order_id: str  # Human-readable order ID (e.g., CC-ABC123)
    user_id: Optional[str] = None
    items: List[OrderItem]
    subtotal: int
    delivery_fee: int
    discount: int = 0
    total: int
    status: OrderStatusEnum
    payment_status: PaymentStatusEnum
    payment_method: PaymentMethodEnum
    delivery_address: DeliveryAddress
    scheduled_time: Optional[datetime] = None
    rider_id: Optional[str] = None
    rider_location: Optional[dict] = None
    estimated_delivery: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    order: Order
    message: str


class OrdersListResponse(BaseModel):
    orders: List[Order]
    total: int
    page: int
    per_page: int

