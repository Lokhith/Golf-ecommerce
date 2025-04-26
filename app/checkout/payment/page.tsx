"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CreditCard, Wallet, Landmark, Clock, ShoppingBag, MapPin, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useCart } from "@/context/cart-context"
import { toast } from "@/hooks/use-toast"

export default function PaymentPage() {
  const router = useRouter()
  const { items, formattedSubtotal, formattedTax, formattedShipping, formattedTotal, clearCart } = useCart()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("card")
  const [isProcessing, setIsProcessing] = useState(false)

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (user) {
      setIsLoggedIn(true)
      setCurrentUser(JSON.parse(user))
    } else {
      // Redirect to login if not logged in
      router.push("/account/login?redirect=checkout/payment")
    }
  }, [router])

  // Check if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add items to your cart before proceeding to checkout.",
      })
      router.push("/cart")
    }
  }, [items, router])

  const handlePayNow = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      // Create order in localStorage
      const orderId = `ORD${Date.now()}`
      const order = {
        id: orderId,
        userId: currentUser?.id,
        items: items,
        total: items.reduce((sum, item) => sum + (item.dealPrice || item.price) * item.quantity * 83, 0),
        paymentMethod: selectedPaymentMethod,
        status: "confirmed",
        date: new Date().toISOString(),
      }

      // Get existing orders
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      localStorage.setItem("orders", JSON.stringify([...existingOrders, order]))

      // Clear cart
      clearCart()

      // Redirect to success page
      router.push(`/checkout/success?orderId=${orderId}`)
    }, 2000)
  }

  if (!isLoggedIn) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container max-w-5xl py-4 md:py-8">
      {/* Checkout Progress Indicator */}
      <div className="mb-6 hidden md:block">
        <div className="flex items-center justify-center">
          <div className="flex items-center w-full max-w-3xl">
            <div className="flex-1 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className="text-sm mt-2 font-medium">Cart</span>
            </div>
            <div className="flex-1 h-1 bg-green-700"></div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center">
                <MapPin className="h-5 w-5" />
              </div>
              <span className="text-sm mt-2 font-medium">Address</span>
            </div>
            <div className="flex-1 h-1 bg-green-700"></div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center">
                <CreditCard className="h-5 w-5" />
              </div>
              <span className="text-sm mt-2 font-medium">Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Progress Indicator */}
      <div className="mb-4 md:hidden">
        <div className="flex items-center justify-between px-2 py-3 bg-muted rounded-lg">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-green-700 text-white flex items-center justify-center text-xs mr-2">
              <Check className="h-3 w-3" />
            </div>
            <span className="text-xs">Cart</span>
          </div>
          <div className="w-16 h-1 bg-green-700"></div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-green-700 text-white flex items-center justify-center text-xs mr-2">
              <Check className="h-3 w-3" />
            </div>
            <span className="text-xs">Address</span>
          </div>
          <div className="w-16 h-1 bg-green-700"></div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-green-700 text-white flex items-center justify-center text-xs mr-2">
              3
            </div>
            <span className="text-xs font-medium">Payment</span>
          </div>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <Link href="/checkout" className="mr-3">
          <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl md:text-2xl font-bold">Payment Method</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-4 md:gap-8">
        <div className="md:col-span-2">
          <Card className="mb-6 border-green-100 dark:border-green-900 shadow-sm">
            <CardHeader className="bg-green-50 dark:bg-green-900/30 pb-3">
              <CardTitle className="text-base md:text-lg text-green-800 dark:text-green-300">Payment Options</CardTitle>
              <CardDescription>Select your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="space-y-3">
                <div
                  className={`flex items-start space-x-3 border rounded-lg p-4 transition-colors ${selectedPaymentMethod === "card" ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : "hover:bg-muted/50"}`}
                >
                  <RadioGroupItem value="card" id="card" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="card" className="flex items-center text-base font-medium cursor-pointer">
                      <CreditCard className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                      Credit / Debit Card
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">Pay securely with your credit or debit card</p>

                    <div className="flex gap-2 mt-3">
                      <Image src="/payment-visa.svg" alt="Visa" width={40} height={25} className="rounded-md" />
                      <Image
                        src="/payment-mastercard.svg"
                        alt="Mastercard"
                        width={40}
                        height={25}
                        className="rounded-md"
                      />
                      <Image
                        src="/payment-amex.svg"
                        alt="American Express"
                        width={40}
                        height={25}
                        className="rounded-md"
                      />
                    </div>

                    {selectedPaymentMethod === "card" && (
                      <div className="mt-4 text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                        <p className="font-medium text-foreground">Note:</p>
                        <p>This is a demo. In a real implementation, Razorpay integration would be added here.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`flex items-start space-x-3 border rounded-lg p-4 transition-colors ${selectedPaymentMethod === "upi" ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : "hover:bg-muted/50"}`}
                >
                  <RadioGroupItem value="upi" id="upi" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="upi" className="flex items-center text-base font-medium cursor-pointer">
                      <Wallet className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                      UPI
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Pay using UPI apps like Google Pay, PhonePe, Paytm
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start space-x-3 border rounded-lg p-4 transition-colors ${selectedPaymentMethod === "netbanking" ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : "hover:bg-muted/50"}`}
                >
                  <RadioGroupItem value="netbanking" id="netbanking" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="netbanking" className="flex items-center text-base font-medium cursor-pointer">
                      <Landmark className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                      Net Banking
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">Pay directly from your bank account</p>
                  </div>
                </div>

                <div
                  className={`flex items-start space-x-3 border rounded-lg p-4 transition-colors ${selectedPaymentMethod === "cod" ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : "hover:bg-muted/50"}`}
                >
                  <RadioGroupItem value="cod" id="cod" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="cod" className="flex items-center text-base font-medium cursor-pointer">
                      <Clock className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                      Cash on Delivery
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">Pay when your order is delivered</p>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="mb-6 md:mb-0 border-green-100 dark:border-green-900 shadow-sm">
            <CardHeader className="bg-green-50 dark:bg-green-900/30 pb-3">
              <CardTitle className="text-base md:text-lg text-green-800 dark:text-green-300">Order Items</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {items.map((item) => (
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
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="rounded-lg border border-green-100 dark:border-green-900 p-4 md:p-5 sticky top-20 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-300">Order Summary</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
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
              onClick={handlePayNow}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                "Pay Now"
              )}
            </Button>

            <div className="mt-4 bg-green-50 dark:bg-green-900/20 rounded-md p-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-2">
                  <p className="text-xs text-green-800 dark:text-green-300">100% secure payments</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-center text-muted-foreground mt-4">
              By completing this purchase, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>

      {/* Mobile sticky checkout bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-green-100 dark:border-green-900 p-4 md:hidden z-40 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Total:</span>
          <span className="text-lg font-bold text-green-700 dark:text-green-400">{formattedTotal}</span>
        </div>
        <Button
          className="w-full bg-green-700 hover:bg-green-800 text-white shadow-md"
          onClick={handlePayNow}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing...
            </div>
          ) : (
            "Pay Now"
          )}
        </Button>
      </div>

      {/* Add padding at the bottom to account for the sticky bar */}
      <div className="h-24 md:h-0"></div>
    </div>
  )
}
