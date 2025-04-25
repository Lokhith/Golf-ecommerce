"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CreditCard, Wallet, Landmark, Clock } from "lucide-react"
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
    <div className="container py-4 md:py-8">
      <div className="flex items-center mb-4">
        <Link href="/checkout" className="mr-3">
          <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">Payment</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-4 md:gap-8">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader className="bg-muted">
              <CardTitle className="text-lg">Payment Method</CardTitle>
              <CardDescription>Select your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="space-y-4">
                <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="card" id="card" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="card" className="flex items-center text-base font-medium cursor-pointer">
                      <CreditCard className="mr-2 h-5 w-5 text-green-600" />
                      Credit / Debit Card
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">Pay securely with your credit or debit card</p>

                    <div className="flex gap-2 mt-3">
                      <Image src="/payment-visa.svg" alt="Visa" width={40} height={25} />
                      <Image src="/payment-mastercard.svg" alt="Mastercard" width={40} height={25} />
                      <Image src="/payment-amex.svg" alt="American Express" width={40} height={25} />
                    </div>

                    {selectedPaymentMethod === "card" && (
                      <div className="mt-4 text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                        <p className="font-medium text-foreground">Note:</p>
                        <p>This is a demo. In a real implementation, Razorpay integration would be added here.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="upi" id="upi" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="upi" className="flex items-center text-base font-medium cursor-pointer">
                      <Wallet className="mr-2 h-5 w-5 text-green-600" />
                      UPI
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Pay using UPI apps like Google Pay, PhonePe, Paytm
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="netbanking" id="netbanking" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="netbanking" className="flex items-center text-base font-medium cursor-pointer">
                      <Landmark className="mr-2 h-5 w-5 text-green-600" />
                      Net Banking
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">Pay directly from your bank account</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="cod" id="cod" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="cod" className="flex items-center text-base font-medium cursor-pointer">
                      <Clock className="mr-2 h-5 w-5 text-green-600" />
                      Cash on Delivery
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">Pay when your order is delivered</p>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="rounded-lg border p-4 md:p-6 sticky top-20">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

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

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formattedTotal}</span>
              </div>
            </div>

            <Button
              className="w-full mt-6 bg-green-700 hover:bg-green-800"
              onClick={handlePayNow}
              disabled={isProcessing}
            >
              {isProcessing ? <>Processing...</> : <>Pay Now</>}
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              By completing this purchase, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
