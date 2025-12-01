from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.models.menu import MenuItem, MenuItemCreate, MenuItemUpdate, MenuResponse, CategoryEnum
from app.services.supabase_client import supabase
from datetime import datetime
import uuid

router = APIRouter()


# Sample menu data (in production, this would come from Supabase)
MENU_ITEMS = [
    {
        "id": "breakfast-1",
        "name": "Golden Sunrise Platter",
        "description": "Fluffy scrambled eggs, crispy bacon, golden hash browns, and buttered toast with our signature honey drizzle",
        "price": 4500,
        "image_url": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800",
        "category": "breakfast",
        "is_available": True,
        "dietary_tags": [],
        "spicy_level": 0,
        "calories": 650,
        "ingredients": ["Eggs", "Bacon", "Potatoes", "Toast", "Honey"],
        "created_at": datetime.now().isoformat(),
    },
    {
        "id": "lunch-1",
        "name": "Jollof Rice Royale",
        "description": "Smoky Nigerian jollof rice with tender grilled chicken, plantain, and coleslaw",
        "price": 5500,
        "image_url": "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800",
        "category": "lunch",
        "is_available": True,
        "dietary_tags": ["halal"],
        "spicy_level": 2,
        "calories": 720,
        "ingredients": ["Rice", "Tomatoes", "Chicken", "Plantain", "Spices"],
        "created_at": datetime.now().isoformat(),
    },
    {
        "id": "dinner-1",
        "name": "Ribeye Steak Premium",
        "description": "300g prime ribeye steak cooked to perfection with garlic butter, mashed potatoes, and seasonal vegetables",
        "price": 15000,
        "image_url": "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800",
        "category": "dinner",
        "is_available": True,
        "dietary_tags": [],
        "spicy_level": 0,
        "calories": 850,
        "ingredients": ["Ribeye", "Butter", "Potatoes", "Vegetables", "Garlic"],
        "created_at": datetime.now().isoformat(),
    },
]


@router.get("/", response_model=MenuResponse)
async def get_menu(
    category: Optional[CategoryEnum] = None,
    dietary_tags: Optional[List[str]] = Query(None),
    search: Optional[str] = None,
    is_available: Optional[bool] = None,
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
):
    """
    Get all menu items with optional filtering
    """
    items = MENU_ITEMS.copy()
    
    # Apply filters
    if category:
        items = [item for item in items if item["category"] == category.value]
    
    if dietary_tags:
        items = [
            item for item in items 
            if any(tag in item["dietary_tags"] for tag in dietary_tags)
        ]
    
    if search:
        search_lower = search.lower()
        items = [
            item for item in items 
            if search_lower in item["name"].lower() 
            or search_lower in item["description"].lower()
        ]
    
    if is_available is not None:
        items = [item for item in items if item["is_available"] == is_available]
    
    # Pagination
    total = len(items)
    start = (page - 1) * per_page
    end = start + per_page
    items = items[start:end]
    
    return MenuResponse(
        items=items,
        total=total,
        page=page,
        per_page=per_page,
    )


@router.get("/{item_id}", response_model=MenuItem)
async def get_menu_item(item_id: str):
    """
    Get a specific menu item by ID
    """
    for item in MENU_ITEMS:
        if item["id"] == item_id:
            return item
    
    raise HTTPException(status_code=404, detail="Menu item not found")


@router.post("/", response_model=MenuItem)
async def create_menu_item(item: MenuItemCreate):
    """
    Create a new menu item (admin only)
    """
    new_item = {
        "id": str(uuid.uuid4()),
        **item.model_dump(),
        "created_at": datetime.now().isoformat(),
    }
    MENU_ITEMS.append(new_item)
    return new_item


@router.patch("/{item_id}", response_model=MenuItem)
async def update_menu_item(item_id: str, item_update: MenuItemUpdate):
    """
    Update a menu item (admin only)
    """
    for i, item in enumerate(MENU_ITEMS):
        if item["id"] == item_id:
            update_data = item_update.model_dump(exclude_unset=True)
            MENU_ITEMS[i] = {**item, **update_data, "updated_at": datetime.now().isoformat()}
            return MENU_ITEMS[i]
    
    raise HTTPException(status_code=404, detail="Menu item not found")


@router.delete("/{item_id}")
async def delete_menu_item(item_id: str):
    """
    Delete a menu item (admin only)
    """
    for i, item in enumerate(MENU_ITEMS):
        if item["id"] == item_id:
            MENU_ITEMS.pop(i)
            return {"message": "Menu item deleted successfully"}
    
    raise HTTPException(status_code=404, detail="Menu item not found")


@router.get("/categories/list")
async def get_categories():
    """
    Get all available categories
    """
    return [
        {"id": "all", "name": "All", "icon": "🍽️"},
        {"id": "breakfast", "name": "Breakfast", "icon": "🌅"},
        {"id": "lunch", "name": "Lunch", "icon": "☀️"},
        {"id": "dinner", "name": "Dinner", "icon": "🌙"},
        {"id": "drinks", "name": "Drinks", "icon": "🍹"},
        {"id": "desserts", "name": "Desserts", "icon": "🍰"},
    ]

