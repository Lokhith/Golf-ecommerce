"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Package, ArrowRight, Home, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface OrderItem {
  id: number
  name: string
  price: number
  dealPrice?: number
  quantity: number
  image?: string
  size?: string
}

interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  paymentMethod: string
  status: string
  date: string
}

export default function OrderSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!orderId) {
      router.push("/")
      return
    }

    // Fetch order from localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const foundOrder = orders.find((o: Order) => o.id === orderId)

    if (foundOrder) {
      setOrder(foundOrder)
    } else {
      router.push("/")
    }

    setIsLoading(false)
  }, [orderId, router])

  if (isLoading) {
    return (
      <div className="container py-12 flex justify-center">
        <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!order) {
    return null
  }

  // Format date
  const orderDate = new Date(order.date)
  const formattedDate = orderDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  // Calculate estimated delivery date (7 days from order)
  const deliveryDate = new Date(orderDate)
  deliveryDate.setDate(deliveryDate.getDate() + 7)
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="container max-w-4xl py-6 md:py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
          <CheckCircle className="h-8 w-8 text-green-700 dark:text-green-400" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-muted-foreground">Thank you for your purchase. Your order has been confirmed.</p>
      </div>

      <div className="grid gap-6">
        <Card className="border-green-100 dark:border-green-900 shadow-sm overflow-hidden">
          <div className="bg-green-50 dark:bg-green-900/30 p-4 md:p-6 border-b border-green-100 dark:border-green-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-green-800 dark:text-green-300">Order #{order.id}</h2>
                <p className="text-sm text-muted-foreground">Placed on {formattedDate}</p>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-md shadow-sm">
                <Package className="h-5 w-5 text-green-600 dark:text-green-400" />
                <div>
                  <p className="text-sm font-medium">Estimated Delivery</p>
                  <p className="text-xs text-muted-foreground">{formattedDeliveryDate}</p>
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-3">Order Items</h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={`${item.id}-${item.size || ""}`}
                      className="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-gray-800"
                    >
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-md flex-shrink-0 relative overflow-hidden">
                        {item.image && (
                          <div className="absolute inset-0">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {item.name} {item.size ? `(${item.size})` : ""}
                        </p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-sm">
                        ₹{Math.round((item.dealPrice || item.price) * item.quantity * 83).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-medium mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items Total</span>
                    <span>₹{Math.round(order.total * 0.85).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>₹{Math.round(order.total * 0.05).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>₹{Math.round(order.total * 0.1).toLocaleString("en-IN")}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Order Total</span>
                    <span className="text-green-700 dark:text-green-400">₹{order.total.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-medium mb-3">Payment Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span className="capitalize">{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Status</span>
                    <span className="text-green-700 dark:text-green-400">Completed</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">Your order is confirmed</p>
                  <p className="text-xs text-green-700/70 dark:text-green-400/70 mt-1">
                    We'll send you a shipping confirmation email once your order ships.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <Link href="/account/orders">
            <Button variant="outline" className="w-full sm:w-auto border-green-200 dark:border-green-800">
              <Package className="mr-2 h-4 w-4" />
              View All Orders
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full sm:w-auto bg-green-700 hover:bg-green-800">
              <Home className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-12 bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recommended For You</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Link href="/category/clubs" key={i} className="group">
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm transition-all group-hover:shadow-md">
                <div className="aspect-square relative bg-gray-100 dark:bg-gray-700">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <ShoppingBag className="h-8 w-8 opacity-20" />
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-sm truncate">Recommended Product {i}</h4>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">₹12,999</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link href="/category/clubs">
            <Button variant="link" className="text-green-700 dark:text-green-400">
              View More Products <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
