"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { formatIndianRupees, convertUSDtoINR } from "@/lib/utils"

// Sample cart items
const initialCartItems = [
  {
    id: 1,
    name: "TaylorMade Stealth Driver",
    price: 499.99,
    image: "/golfer-swing.png",
    quantity: 1,
  },
  {
    id: 2,
    name: "Titleist Pro V1 Golf Balls (Dozen)",
    price: 49.99,
    image: "/pristine-golf-ball-display.png",
    quantity: 2,
  },
  {
    id: 3,
    name: "FootJoy Pro SL Golf Shoes",
    price: 149.99,
    image: "/modern-golf-footwear.png",
    quantity: 1,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 10.0 : 0
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax

  // Convert to INR
  const subtotalINR = convertUSDtoINR(subtotal)
  const shippingINR = convertUSDtoINR(shipping)
  const taxINR = convertUSDtoINR(tax)
  const totalINR = convertUSDtoINR(total)

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/">
            <Button className="bg-green-700 hover:bg-green-800">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="rounded-lg border overflow-hidden">
              <div className="bg-muted px-6 py-4">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <h3 className="font-medium">Product</h3>
                  </div>
                  <div className="col-span-2 text-center">
                    <h3 className="font-medium">Price</h3>
                  </div>
                  <div className="col-span-2 text-center">
                    <h3 className="font-medium">Quantity</h3>
                  </div>
                  <div className="col-span-2 text-right">
                    <h3 className="font-medium">Total</h3>
                  </div>
                </div>
              </div>

              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0 text-red-500 hover:text-red-700"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              <span className="text-xs">Remove</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 text-center">{formatIndianRupees(convertUSDtoINR(item.price))}</div>
                      <div className="col-span-2">
                        <div className="flex items-center justify-center border rounded-md max-w-[120px] mx-auto">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="col-span-2 text-right font-medium">
                        {formatIndianRupees(convertUSDtoINR(item.price * item.quantity))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
              <Link href="/">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
              <Button
                variant="outline"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => setCartItems([])}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          <div>
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatIndianRupees(subtotalINR)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatIndianRupees(shippingINR)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatIndianRupees(taxINR)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatIndianRupees(totalINR)}</span>
                </div>
              </div>

              <Button className="w-full mt-6 bg-green-700 hover:bg-green-800">Proceed to Checkout</Button>

              <div className="mt-6">
                <h4 className="font-medium mb-2">Have a coupon?</h4>
                <div className="flex gap-2">
                  <Input placeholder="Enter coupon code" />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
