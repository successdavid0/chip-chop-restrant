import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: 'breakfast' | 'lunch' | 'dinner' | 'drinks' | 'desserts'
  is_available: boolean
  dietary_tags: string[]
  spicy_level: number
  calories: number
  ingredients: string[]
  created_at: string
}

export interface Order {
  id: string
  order_id: string
  user_id: string | null
  items: OrderItem[]
  subtotal: number
  delivery_fee: number
  discount: number
  total: number
  status: OrderStatus
  delivery_address: string
  delivery_lat: number
  delivery_lng: number
  scheduled_time: string | null
  rider_id: string | null
  rider_location: { lat: number; lng: number } | null
  created_at: string
  updated_at: string
}

export interface OrderItem {
  menu_item_id: string
  name: string
  quantity: number
  price: number
  special_instructions?: string
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'picked_up'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled'

export interface Rider {
  id: string
  name: string
  phone: string
  photo_url: string
  rating: number
  current_location: { lat: number; lng: number }
}

export interface Promotion {
  id: string
  title: string
  description: string
  image_url: string
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  code: string
  min_order_value: number
  valid_from: string
  valid_until: string
  is_active: boolean
}

