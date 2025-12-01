from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum
from datetime import datetime


class CategoryEnum(str, Enum):
    BREAKFAST = "breakfast"
    LUNCH = "lunch"
    DINNER = "dinner"
    DRINKS = "drinks"
    DESSERTS = "desserts"


class MenuItemBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: str = Field(..., max_length=500)
    price: int = Field(..., gt=0)
    category: CategoryEnum
    is_available: bool = True
    dietary_tags: List[str] = []
    spicy_level: int = Field(0, ge=0, le=5)
    calories: int = Field(0, ge=0)
    ingredients: List[str] = []
    image_url: Optional[str] = None


class MenuItemCreate(MenuItemBase):
    pass


class MenuItemUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    price: Optional[int] = Field(None, gt=0)
    category: Optional[CategoryEnum] = None
    is_available: Optional[bool] = None
    dietary_tags: Optional[List[str]] = None
    spicy_level: Optional[int] = Field(None, ge=0, le=5)
    calories: Optional[int] = Field(None, ge=0)
    ingredients: Optional[List[str]] = None
    image_url: Optional[str] = None


class MenuItem(MenuItemBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class MenuResponse(BaseModel):
    items: List[MenuItem]
    total: int
    page: int
    per_page: int

