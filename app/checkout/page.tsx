"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, MapPin, ShoppingBag, CreditCard, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useCart } from "@/context/cart-context"
import { toast } from "@/hooks/use-toast"
import AddressForm from "@/components/checkout/address-form"

// Address type definition
interface Address {
  id: string
  name: string
  mobile: string
  pincode: string
  locality: string
  address: string
  city: string
  state: string
  landmark?: string
  alternatePhone?: string
  addressType: "home" | "work"
  isDefault?: boolean
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, formattedSubtotal, formattedTax, formattedShipping, formattedTotal } = useCart()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [showAddressForm, setShowAddressForm] = useState(false)

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (user) {
      setIsLoggedIn(true)
      setCurrentUser(JSON.parse(user))

      // Load saved addresses from localStorage
      const savedAddresses = localStorage.getItem(`addresses_${JSON.parse(user).id}`)
      if (savedAddresses) {
        const parsedAddresses = JSON.parse(savedAddresses)
        setAddresses(parsedAddresses)

        // Select default address if available
        const defaultAddress = parsedAddresses.find((addr: Address) => addr.isDefault)
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id)
        } else if (parsedAddresses.length > 0) {
          setSelectedAddressId(parsedAddresses[0].id)
        }
      }
    } else {
      // Redirect to login if not logged in
      router.push("/account/login?redirect=checkout")
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

  const handleAddAddress = (newAddress: Omit<Address, "id">) => {
    const addressId = Date.now().toString()
    const addressWithId = {
      ...newAddress,
      id: addressId,
      isDefault: addresses.length === 0, // Make first address default
    }

    const updatedAddresses = [...addresses, addressWithId]
    setAddresses(updatedAddresses)
    setSelectedAddressId(addressId)
    setShowAddressForm(false)

    // Save to localStorage
    if (currentUser) {
      localStorage.setItem(`addresses_${currentUser.id}`, JSON.stringify(updatedAddresses))
    }

    toast({
      title: "Address added",
      description: "Your delivery address has been saved.",
    })
  }

  const handleSetDefaultAddress = (addressId: string) => {
    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === addressId,
    }))

    setAddresses(updatedAddresses)

    // Save to localStorage
    if (currentUser) {
      localStorage.setItem(`addresses_${currentUser.id}`, JSON.stringify(updatedAddresses))
    }
  }

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      toast({
        title: "No address selected",
        description: "Please select a delivery address to continue.",
        variant: "destructive",
      })
      return
    }

    // Redirect to payment page
    router.push("/checkout/payment")
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
            <div className="flex-1 h-1 bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center">
                <CreditCard className="h-5 w-5" />
              </div>
              <span className="text-sm mt-2 text-gray-500 dark:text-gray-400">Payment</span>
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
              2
            </div>
            <span className="text-xs font-medium">Address</span>
          </div>
          <div className="w-16 h-1 bg-gray-300 dark:bg-gray-700"></div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-xs mr-2">
              3
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Payment</span>
          </div>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <Link href="/cart" className="mr-3">
          <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl md:text-2xl font-bold">Delivery Address</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-4 md:gap-8">
        <div className="md:col-span-2">
          <Card className="mb-6 border-green-100 dark:border-green-900 shadow-sm">
            <CardHeader className="bg-green-50 dark:bg-green-900/30 pb-3">
              <CardTitle className="text-base md:text-lg flex items-center text-green-800 dark:text-green-300">
                <MapPin className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                Select Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {addresses.length > 0 && !showAddressForm ? (
                <RadioGroup
                  value={selectedAddressId || undefined}
                  onValueChange={setSelectedAddressId}
                  className="space-y-3"
                >
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`flex p-3 rounded-lg transition-colors ${
                        selectedAddressId === address.id
                          ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <RadioGroupItem value={address.id} id={`address-${address.id}`} className="mt-1" />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center flex-wrap gap-2">
                          <Label htmlFor={`address-${address.id}`} className="font-medium">
                            {address.name}
                          </Label>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                            {address.addressType === "home" ? "Home" : "Work"}
                          </span>
                          {address.isDefault && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {address.address}, {address.locality}, {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-sm mt-1">Mobile: {address.mobile}</p>
                        <div className="mt-2 flex gap-4">
                          {!address.isDefault && (
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-green-600"
                              onClick={() => handleSetDefaultAddress(address.id)}
                            >
                              Set as default
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              ) : null}

              {showAddressForm ? (
                <AddressForm onSubmit={handleAddAddress} onCancel={() => setShowAddressForm(false)} />
              ) : (
                <Button
                  variant="outline"
                  className="mt-4 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                  onClick={() => setShowAddressForm(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Address
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="mb-6 md:mb-0 border-green-100 dark:border-green-900 shadow-sm">
            <CardHeader className="bg-green-50 dark:bg-green-900/30 pb-3">
              <CardTitle className="text-base md:text-lg text-green-800 dark:text-green-300">Order Summary</CardTitle>
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
            <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-300">Price Details</h3>

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
              onClick={handlePlaceOrder}
              disabled={!selectedAddressId && addresses.length > 0}
            >
              Proceed to Payment
            </Button>

            <div className="mt-4 bg-green-50 dark:bg-green-900/20 rounded-md p-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-2">
                  <p className="text-xs text-green-800 dark:text-green-300">Your order is eligible for FREE Delivery</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-center text-muted-foreground mt-4">
              By placing your order, you agree to our Terms of Service and Privacy Policy
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
          onClick={handlePlaceOrder}
          disabled={!selectedAddressId && addresses.length > 0}
        >
          Proceed to Payment
        </Button>
      </div>

      {/* Add padding at the bottom to account for the sticky bar */}
      <div className="h-24 md:h-0"></div>
    </div>
  )
}
