from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum
from datetime import datetime


class DiscountTypeEnum(str, Enum):
    PERCENTAGE = "percentage"
    FIXED = "fixed"


class PromotionBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: str = Field(..., max_length=500)
    code: str = Field(..., min_length=3, max_length=20)
    discount_type: DiscountTypeEnum
    discount_value: int = Field(..., gt=0)
    min_order_value: int = Field(0, ge=0)
    max_uses: Optional[int] = None
    is_active: bool = True
    valid_from: datetime
    valid_until: datetime
    image_url: Optional[str] = None


class PromotionCreate(PromotionBase):
    pass


class PromotionUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    discount_value: Optional[int] = Field(None, gt=0)
    min_order_value: Optional[int] = Field(None, ge=0)
    is_active: Optional[bool] = None
    valid_until: Optional[datetime] = None


class Promotion(PromotionBase):
    id: str
    current_uses: int = 0
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ValidatePromoResponse(BaseModel):
    valid: bool
    message: str
    discount_amount: Optional[int] = None
    discount_type: Optional[DiscountTypeEnum] = None

