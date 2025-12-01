from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from typing import Optional, Dict
from datetime import datetime
import asyncio
import json

router = APIRouter()

# Active WebSocket connections for real-time tracking
active_connections: Dict[str, WebSocket] = {}


class RiderLocation(BaseModel):
    order_id: str
    latitude: float
    longitude: float
    heading: Optional[float] = None
    speed: Optional[float] = None
    timestamp: datetime = datetime.now()


class TrackingUpdate(BaseModel):
    order_id: str
    status: str
    rider_location: Optional[RiderLocation] = None
    estimated_arrival: Optional[str] = None
    message: Optional[str] = None


# Mock rider data
MOCK_RIDERS = {
    "rider-1": {
        "id": "rider-1",
        "name": "Emeka Johnson",
        "phone": "+2348012345678",
        "photo_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
        "rating": 4.9,
        "deliveries": 500,
    }
}


@router.get("/{order_id}")
async def get_tracking_info(order_id: str):
    """
    Get current tracking information for an order
    """
    # Mock tracking data
    return {
        "order_id": order_id,
        "status": "on_the_way",
        "rider": MOCK_RIDERS.get("rider-1"),
        "rider_location": {
            "latitude": 6.4541,
            "longitude": 3.3947,
        },
        "estimated_arrival": "15 minutes",
        "delivery_address": "123 Victoria Island, Lagos",
        "status_history": [
            {"status": "confirmed", "timestamp": "2024-01-01T10:00:00Z"},
            {"status": "preparing", "timestamp": "2024-01-01T10:05:00Z"},
            {"status": "ready", "timestamp": "2024-01-01T10:25:00Z"},
            {"status": "picked_up", "timestamp": "2024-01-01T10:30:00Z"},
            {"status": "on_the_way", "timestamp": "2024-01-01T10:32:00Z"},
        ],
    }


@router.websocket("/ws/{order_id}")
async def tracking_websocket(websocket: WebSocket, order_id: str):
    """
    WebSocket endpoint for real-time order tracking
    """
    await websocket.accept()
    active_connections[order_id] = websocket
    
    try:
        # Send initial tracking data
        await websocket.send_json({
            "type": "initial",
            "order_id": order_id,
            "status": "on_the_way",
            "rider": MOCK_RIDERS.get("rider-1"),
            "estimated_arrival": "15 minutes",
        })
        
        # Simulate real-time updates (in production, these would come from rider app)
        while True:
            # Wait for incoming messages or send periodic updates
            try:
                data = await asyncio.wait_for(websocket.receive_text(), timeout=5.0)
                # Handle any incoming messages from client
                message = json.loads(data)
                if message.get("type") == "ping":
                    await websocket.send_json({"type": "pong"})
            except asyncio.TimeoutError:
                # Send location update
                await websocket.send_json({
                    "type": "location_update",
                    "order_id": order_id,
                    "rider_location": {
                        "latitude": 6.4541 + (0.001 * (datetime.now().second % 10)),
                        "longitude": 3.3947 + (0.001 * (datetime.now().second % 10)),
                    },
                    "estimated_arrival": f"{15 - (datetime.now().minute % 15)} minutes",
                })
    except WebSocketDisconnect:
        if order_id in active_connections:
            del active_connections[order_id]


@router.post("/rider/location")
async def update_rider_location(location: RiderLocation):
    """
    Update rider location (called from rider app)
    """
    # Broadcast to connected client
    if location.order_id in active_connections:
        websocket = active_connections[location.order_id]
        try:
            await websocket.send_json({
                "type": "location_update",
                "order_id": location.order_id,
                "rider_location": {
                    "latitude": location.latitude,
                    "longitude": location.longitude,
                    "heading": location.heading,
                    "speed": location.speed,
                },
                "timestamp": location.timestamp.isoformat(),
            })
        except Exception:
            pass
    
    return {"status": "ok"}


@router.get("/rider/{rider_id}")
async def get_rider_info(rider_id: str):
    """
    Get rider information
    """
    rider = MOCK_RIDERS.get(rider_id)
    if not rider:
        raise HTTPException(status_code=404, detail="Rider not found")
    return rider

