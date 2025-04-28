"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Minus, Plus, ShoppingCart, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import { toast } from "@/hooks/use-toast"

export default function CartPage() {
  const router = useRouter()
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    formattedSubtotal,
    formattedTax,
    formattedShipping,
    formattedTotal,
  } = useCart()

  const [couponCode, setCouponCode] = useState("")

  const handleRemoveItem = (id: number, name: string, size?: string) => {
    removeItem(id, size)
    toast({
      title: "Item removed",
      description: `${name} has been removed from your cart.`,
    })
  }

  const handleClearCart = () => {
    clearCart()
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    })
  }

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return

    toast({
      title: "Invalid coupon",
      description: "The coupon code you entered is invalid or expired.",
      variant: "destructive",
    })
    setCouponCode("")
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  return (
    <div className="container px-3 sm:px-4 py-4 md:py-8 max-w-5xl mx-auto">
      <div className="flex items-center mb-4">
        <Link href="/" className="mr-3">
          <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl md:text-2xl font-bold">Shopping Cart</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8 md:py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/">
            <Button className="bg-green-700 hover:bg-green-800 shadow-sm hover:shadow-md transition-all">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-3 md:gap-8">
          <div className="md:col-span-2">
            <div className="rounded-lg border border-green-100 dark:border-green-900 overflow-hidden shadow-sm">
              <div className="bg-green-50 dark:bg-green-900/30 px-4 py-3 md:px-6 md:py-4">
                <div className="grid grid-cols-12 gap-2 md:gap-4">
                  <div className="col-span-6">
                    <h3 className="font-medium text-sm md:text-base text-green-800 dark:text-green-300">Product</h3>
                  </div>
                  <div className="col-span-2 text-center hidden md:block">
                    <h3 className="font-medium text-green-800 dark:text-green-300">Price</h3>
                  </div>
                  <div className="col-span-3 md:col-span-2 text-center">
                    <h3 className="font-medium text-sm md:text-base text-green-800 dark:text-green-300">Quantity</h3>
                  </div>
                  <div className="col-span-3 md:col-span-2 text-right">
                    <h3 className="font-medium text-sm md:text-base text-green-800 dark:text-green-300">Total</h3>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-green-100 dark:divide-green-900">
                {items.map((item) => {
                  const itemPrice = item.dealPrice || item.price
                  const itemTotal = itemPrice * item.quantity
                  const itemTotalINR = Math.round(itemTotal * 83)

                  return (
                    <div
                      key={item.id}
                      className="p-3 md:p-6 hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-colors"
                    >
                      <div className="grid grid-cols-12 gap-2 md:gap-4 items-center">
                        <div className="col-span-6">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-md overflow-hidden border border-green-100 dark:border-green-900 shadow-sm">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm md:text-base line-clamp-2">{item.name}</h4>
                              <div className="md:hidden text-xs text-muted-foreground mt-1">
                                ₹{Math.round((item.dealPrice || item.price) * 83).toLocaleString("en-IN")}
                              </div>
                              {/* Display size if available */}
                              {item.size && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  Size: <span className="font-medium">{item.size}</span>
                                </div>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 text-red-500 hover:text-red-700 text-xs mt-1"
                                onClick={() => handleRemoveItem(item.id, item.name, item.size)}
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                <span>Remove</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2 text-center hidden md:block">
                          ₹{Math.round((item.dealPrice || item.price) * 83).toLocaleString("en-IN")}
                        </div>
                        <div className="col-span-3 md:col-span-2">
                          <div className="flex items-center justify-center border rounded-md max-w-[100px] mx-auto border-green-200 dark:border-green-800">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 md:h-8 md:w-8 rounded-none text-green-700 dark:text-green-400"
                              onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 md:w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 md:h-8 md:w-8 rounded-none text-green-700 dark:text-green-400"
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="col-span-3 md:col-span-2 text-right font-medium">
                          ₹{itemTotalINR.toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-4 md:mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full md:w-auto border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/10 w-full md:w-auto border-red-200 dark:border-red-900"
                onClick={handleClearCart}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          <div>
            <div className="rounded-lg border border-green-100 dark:border-green-900 p-3 md:p-5 sticky top-20 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-300">Order Summary</h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                  <span>{formattedSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formattedShipping}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formattedTax}</span>
                </div>

                <Separator className="my-1" />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-green-700 dark:text-green-400">{formattedTotal}</span>
                </div>
              </div>

              <Button
                className="w-full mt-5 bg-green-700 hover:bg-green-800 text-white shadow-md transition-all hover:shadow-lg"
                onClick={handleCheckout}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Proceed to Checkout
              </Button>

              <div className="mt-4 bg-green-50 dark:bg-green-900/20 rounded-md p-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <ShoppingBag className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-2">
                    <p className="text-xs text-green-800 dark:text-green-300">
                      Your order is eligible for FREE Delivery
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-2 text-sm">Have a coupon?</h4>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="text-sm focus-visible:ring-green-300"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleApplyCoupon}
                    className="border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Mobile sticky checkout bar */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-green-100 dark:border-green-900 p-3 md:hidden z-40 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Total:</span>
            <span className="text-lg font-bold text-green-700 dark:text-green-400">{formattedTotal}</span>
          </div>
          <Button className="w-full bg-green-700 hover:bg-green-800 text-white shadow-md" onClick={handleCheckout}>
            <ShoppingBag className="h-4 w-4 mr-2" />
            Proceed to Checkout
          </Button>
        </div>
      )}

      {/* Add padding at the bottom to account for the sticky bar */}
      {items.length > 0 && <div className="h-20 md:h-0"></div>}
    </div>
  )
}
