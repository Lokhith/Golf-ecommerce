"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, MapPin } from "lucide-react"
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
    <div className="container py-4 md:py-8">
      <div className="flex items-center mb-4">
        <Link href="/cart" className="mr-3">
          <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-4 md:gap-8">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader className="bg-muted">
              <CardTitle className="text-lg flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-green-600" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {addresses.length > 0 && !showAddressForm ? (
                <RadioGroup
                  value={selectedAddressId || undefined}
                  onValueChange={setSelectedAddressId}
                  className="space-y-4"
                >
                  {addresses.map((address) => (
                    <div key={address.id} className="flex">
                      <RadioGroupItem value={address.id} id={`address-${address.id}`} className="mt-1" />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center">
                          <Label htmlFor={`address-${address.id}`} className="font-medium">
                            {address.name}
                          </Label>
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-muted">
                            {address.addressType === "home" ? "Home" : "Work"}
                          </span>
                          {address.isDefault && (
                            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
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
                <Button variant="outline" className="mt-4" onClick={() => setShowAddressForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Address
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-muted">
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size || ""}`} className="flex justify-between">
                    <div className="flex-1">
                      <p className="font-medium">
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
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="rounded-lg border p-4 md:p-6 sticky top-20">
            <h3 className="text-lg font-semibold mb-4">Price Details</h3>

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
              onClick={handlePlaceOrder}
              disabled={!selectedAddressId && addresses.length > 0}
            >
              Place Order
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              By placing your order, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
