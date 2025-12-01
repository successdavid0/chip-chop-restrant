import httpx
from app.config import settings

# Simple Supabase REST client for Python 3.14 compatibility
# For full Supabase SDK support, use Python 3.11 or 3.12

class SupabaseClient:
    """Simple Supabase client using REST API directly"""
    
    def __init__(self, url: str, key: str):
        self.url = url.rstrip('/')
        self.key = key
        self.headers = {
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }
    
    async def select(self, table: str, columns: str = "*", filters: dict = None):
        """Select data from a table"""
        url = f"{self.url}/rest/v1/{table}?select={columns}"
        if filters:
            for key, value in filters.items():
                url += f"&{key}=eq.{value}"
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=self.headers)
            response.raise_for_status()
            return response.json()
    
    async def insert(self, table: str, data: dict):
        """Insert data into a table"""
        url = f"{self.url}/rest/v1/{table}"
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=self.headers, json=data)
            response.raise_for_status()
            return response.json()
    
    async def update(self, table: str, data: dict, filters: dict):
        """Update data in a table"""
        url = f"{self.url}/rest/v1/{table}"
        for key, value in filters.items():
            url += f"?{key}=eq.{value}"
        
        async with httpx.AsyncClient() as client:
            response = await client.patch(url, headers=self.headers, json=data)
            response.raise_for_status()
            return response.json()
    
    async def delete(self, table: str, filters: dict):
        """Delete data from a table"""
        url = f"{self.url}/rest/v1/{table}"
        for key, value in filters.items():
            url += f"?{key}=eq.{value}"
        
        async with httpx.AsyncClient() as client:
            response = await client.delete(url, headers=self.headers)
            response.raise_for_status()
            return True


# Initialize client
supabase = SupabaseClient(settings.SUPABASE_URL, settings.SUPABASE_KEY)


def get_supabase_client() -> SupabaseClient:
    """Get Supabase client instance"""
    return supabase
