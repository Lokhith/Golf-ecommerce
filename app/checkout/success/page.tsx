"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Package, ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function OrderSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    if (!orderId) {
      router.push("/")
      return
    }

    // Get order from localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const foundOrder = orders.find((o: any) => o.id === orderId)

    if (foundOrder) {
      setOrder(foundOrder)
    } else {
      router.push("/")
    }
  }, [orderId, router])

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

  // Expected delivery date (7 days from order)
  const deliveryDate = new Date(orderDate)
  deliveryDate.setDate(deliveryDate.getDate() + 7)
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-700 mb-4">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-muted-foreground">Thank you for your purchase. Your order has been confirmed.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="bg-muted">
            <CardTitle className="text-lg">Order Details</CardTitle>
            <CardDescription>Order ID: {order.id}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Order Date</p>
                  <p className="text-sm text-muted-foreground">{formattedDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Payment Method</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Order Status</p>
                  <p className="text-sm text-green-600 font-medium">Confirmed</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Expected Delivery</p>
                  <p className="text-sm text-muted-foreground">{formattedDeliveryDate}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3">Items in your order</h3>
                <div className="space-y-3">
                  {order.items.map((item: any) => (
                    <div key={`${item.id}-${item.size || ""}`} className="flex justify-between">
                      <div>
                        <p>
                          {item.name} {item.size ? `(${item.size})` : ""}
                        </p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">
                        ₹{Math.round((item.dealPrice || item.price) * item.quantity * 83).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{Math.round(order.total).toLocaleString("en-IN")}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 items-stretch pt-0">
            <p className="text-sm text-muted-foreground mb-2">
              A confirmation email has been sent to your registered email address.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex-1" asChild>
                <Link href="/account/orders">
                  <Package className="mr-2 h-4 w-4" />
                  View All Orders
                </Link>
              </Button>
              <Button className="flex-1 bg-green-700 hover:bg-green-800" asChild>
                <Link href="/">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Need help with your order?</p>
          <Link
            href="/contact"
            className="text-sm text-green-600 hover:text-green-700 font-medium inline-flex items-center"
          >
            Contact Customer Support
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
