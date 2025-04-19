"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { formatIndianRupees, convertUSDtoINR } from "@/lib/utils"

// Define the cart item type
export interface CartItem {
  id: number
  name: string
  price: number
  dealPrice?: number
  quantity: number
  image: string
  category: string
  brand?: string
  size?: string // Add size property
}

// Define the cart context type
interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  removeItem: (id: number, size?: string) => void
  updateQuantity: (id: number, quantity: number, size?: string) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
  subtotalINR: number
  formattedSubtotal: string
  tax: number
  taxINR: number
  formattedTax: string
  shipping: number
  shippingINR: number
  formattedShipping: string
  total: number
  totalINR: number
  formattedTotal: string
  isInCart: (id: number) => boolean
}

// Create the cart context
const CartContext = createContext<CartContextType | undefined>(undefined)

// Create a provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
        setItems([])
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  // Update the addItem function to accept size
  const addItem = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id && i.size === item.size)

      if (existingItem) {
        // Update quantity if item with same size already exists
        return prevItems.map((i) =>
          i.id === item.id && i.size === item.size ? { ...i, quantity: i.quantity + quantity } : i,
        )
      } else {
        // Add new item
        return [...prevItems, { ...item, quantity }]
      }
    })
  }

  // Remove an item from the cart
  const removeItem = (id: number, size?: string) => {
    setItems((prevItems) => {
      // If size is provided, remove only the specific size variant
      if (size) {
        return prevItems.filter((item) => !(item.id === id && item.size === size))
      }
      // Otherwise remove all variants of the product (backward compatibility)
      return prevItems.filter((item) => item.id !== id)
    })
  }

  // Update item quantity
  const updateQuantity = (id: number, quantity: number, size?: string) => {
    if (quantity < 1) return

    setItems((prevItems) =>
      prevItems.map((item) => {
        // If size is provided, match both id and size
        if (size && item.size) {
          return item.id === id && item.size === size ? { ...item, quantity } : item
        }
        // Otherwise just match by id (for backward compatibility)
        return item.id === id ? { ...item, quantity } : item
      }),
    )
  }

  // Clear the entire cart
  const clearCart = () => {
    setItems([])
  }

  // Check if an item is in the cart
  const isInCart = (id: number) => {
    return items.some((item) => item.id === id)
  }

  // Calculate cart totals
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.dealPrice || item.price
    return sum + itemPrice * item.quantity
  }, 0)

  const subtotalINR = convertUSDtoINR(subtotal)
  const formattedSubtotal = formatIndianRupees(subtotalINR)

  // Calculate tax (7%)
  const tax = subtotal * 0.07
  const taxINR = convertUSDtoINR(tax)
  const formattedTax = formatIndianRupees(taxINR)

  // Calculate shipping (free over $100, otherwise $10)
  const shipping = subtotal > 100 ? 0 : 10
  const shippingINR = convertUSDtoINR(shipping)
  const formattedShipping = formatIndianRupees(shippingINR)

  // Calculate total
  const total = subtotal + tax + shipping
  const totalINR = convertUSDtoINR(total)
  const formattedTotal = formatIndianRupees(totalINR)

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    subtotalINR,
    formattedSubtotal,
    tax,
    taxINR,
    formattedTax,
    shipping,
    shippingINR,
    formattedShipping,
    total,
    totalINR,
    formattedTotal,
    isInCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Create a hook to use the cart context
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
