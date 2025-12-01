import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { MenuItem } from '@/lib/supabase'

export interface CartItem {
  id: string
  menuItem: MenuItem
  quantity: number
  specialInstructions?: string
}

interface CartState {
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  discount: number
  discountCode: string | null
  total: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { menuItem: MenuItem; quantity?: number; specialInstructions?: string } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'UPDATE_INSTRUCTIONS'; payload: { id: string; instructions: string } }
  | { type: 'APPLY_DISCOUNT'; payload: { code: string; amount: number } }
  | { type: 'REMOVE_DISCOUNT' }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState }

interface CartContextType extends CartState {
  addItem: (menuItem: MenuItem, quantity?: number, specialInstructions?: string) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  updateInstructions: (id: string, instructions: string) => void
  applyDiscount: (code: string, amount: number) => void
  removeDiscount: () => void
  clearCart: () => void
  itemCount: number
}

const DELIVERY_FEE = 1500 // ₦1,500 delivery fee

const calculateTotals = (items: CartItem[], discount: number, deliveryFee: number) => {
  const subtotal = items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0)
  const total = Math.max(0, subtotal + deliveryFee - discount)
  return { subtotal, total }
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { menuItem, quantity = 1, specialInstructions } = action.payload
      const existingIndex = state.items.findIndex(item => item.menuItem.id === menuItem.id)

      let newItems: CartItem[]
      if (existingIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        const newItem: CartItem = {
          id: `${menuItem.id}-${Date.now()}`,
          menuItem,
          quantity,
          specialInstructions,
        }
        newItems = [...state.items, newItem]
      }

      const { subtotal, total } = calculateTotals(newItems, state.discount, state.deliveryFee)
      return { ...state, items: newItems, subtotal, total }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.id)
      const deliveryFee = newItems.length > 0 ? DELIVERY_FEE : 0
      const { subtotal, total } = calculateTotals(newItems, state.discount, deliveryFee)
      return { ...state, items: newItems, subtotal, total, deliveryFee }
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload
      if (quantity < 1) return state

      const newItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
      const { subtotal, total } = calculateTotals(newItems, state.discount, state.deliveryFee)
      return { ...state, items: newItems, subtotal, total }
    }

    case 'UPDATE_INSTRUCTIONS': {
      const { id, instructions } = action.payload
      const newItems = state.items.map(item =>
        item.id === id ? { ...item, specialInstructions: instructions } : item
      )
      return { ...state, items: newItems }
    }

    case 'APPLY_DISCOUNT':
      const { subtotal: s, total: t } = calculateTotals(state.items, action.payload.amount, state.deliveryFee)
      return {
        ...state,
        discount: action.payload.amount,
        discountCode: action.payload.code,
        subtotal: s,
        total: t,
      }

    case 'REMOVE_DISCOUNT': {
      const { subtotal, total } = calculateTotals(state.items, 0, state.deliveryFee)
      return { ...state, discount: 0, discountCode: null, subtotal, total }
    }

    case 'CLEAR_CART':
      return {
        items: [],
        subtotal: 0,
        deliveryFee: 0,
        discount: 0,
        discountCode: null,
        total: 0,
      }

    case 'LOAD_CART':
      return action.payload

    default:
      return state
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const initialState: CartState = {
  items: [],
  subtotal: 0,
  deliveryFee: 0,
  discount: 0,
  discountCode: null,
  total: 0,
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('chipchop-cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: parsedCart })
      } catch (e) {
        console.error('Failed to load cart from localStorage:', e)
      }
    }
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('chipchop-cart', JSON.stringify(state))
  }, [state])

  const addItem = (menuItem: MenuItem, quantity = 1, specialInstructions?: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { menuItem, quantity, specialInstructions } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const updateInstructions = (id: string, instructions: string) => {
    dispatch({ type: 'UPDATE_INSTRUCTIONS', payload: { id, instructions } })
  }

  const applyDiscount = (code: string, amount: number) => {
    dispatch({ type: 'APPLY_DISCOUNT', payload: { code, amount } })
  }

  const removeDiscount = () => {
    dispatch({ type: 'REMOVE_DISCOUNT' })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        updateInstructions,
        applyDiscount,
        removeDiscount,
        clearCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

