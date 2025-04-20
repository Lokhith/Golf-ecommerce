"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2, Calendar, Tag, Percent } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Sample products for selection
const products = [
  { id: 1, name: "TaylorMade Stealth Driver", category: "Clubs" },
  { id: 2, name: "Titleist Pro V1 Golf Balls (Dozen)", category: "Balls" },
  { id: 3, name: "FootJoy Pro SL Golf Shoes", category: "Shoes" },
  { id: 4, name: "Callaway Rogue ST Max Irons", category: "Clubs" },
  { id: 5, name: "Nike Dri-FIT Golf Polo", category: "Apparels" },
  { id: 6, name: "Ping Hoofer Lite Stand Bag", category: "Bags" },
  { id: 7, name: "Golf Pride MCC Plus4 Grip", category: "Grips" },
  { id: 8, name: "Clicgear 4.0 Push Cart", category: "Trolleys" },
]

// Sample categories
const categories = [
  { value: "balls", label: "Balls" },
  { value: "clubs", label: "Clubs" },
  { value: "shoes", label: "Shoes" },
  { value: "apparels", label: "Apparels" },
  { value: "bags", label: "Bags" },
  { value: "grips", label: "Grips" },
  { value: "trolleys", label: "Trolleys" },
  { value: "training", label: "Training Aids" },
  { value: "accessories", label: "Accessories" },
]

export default function AddCouponPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [discountType, setDiscountType] = useState("percentage")
  const [applicableTo, setApplicableTo] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      router.push("/admin/coupons")
    }, 1500)
  }

  const handleProductSelection = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/coupons">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:border-gray-600"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight dark:text-gray-200">Create Coupon</h1>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-gray-200">Coupon Details</CardTitle>
          <CardDescription className="dark:text-gray-400">Create a new coupon code for your customers.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="code" className="dark:text-gray-300">
                  Coupon Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="code"
                  placeholder="e.g., SUMMER20"
                  className="uppercase dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                  required
                />
                <p className="text-xs text-muted-foreground dark:text-gray-400">
                  Use uppercase letters and numbers. No spaces or special characters.
                </p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="description" className="dark:text-gray-300">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="e.g., 20% off for summer sale"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label className="dark:text-gray-300">
                  Discount Type <span className="text-red-500">*</span>
                </Label>
                <RadioGroup value={discountType} onValueChange={setDiscountType} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="percentage" id="percentage" />
                    <Label htmlFor="percentage" className="flex items-center dark:text-gray-300">
                      <Percent className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      Percentage Discount
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="fixed" />
                    <Label htmlFor="fixed" className="flex items-center dark:text-gray-300">
                      <Tag className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                      Fixed Amount Discount
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="free_shipping" id="free_shipping" />
                    <Label htmlFor="free_shipping" className="flex items-center dark:text-gray-300">
                      <Tag className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                      Free Shipping
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {discountType !== "free_shipping" && (
                <div className="grid gap-3">
                  <Label htmlFor="discount" className="dark:text-gray-300">
                    Discount Value <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center">
                    <Input
                      id="discount"
                      type="number"
                      min="0"
                      step={discountType === "percentage" ? "1" : "0.01"}
                      placeholder={discountType === "percentage" ? "e.g., 20" : "e.g., 10.00"}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                      required
                    />
                    <div className="ml-2 text-muted-foreground dark:text-gray-400">
                      {discountType === "percentage" ? "%" : "$"}
                    </div>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="startDate" className="dark:text-gray-300">
                    Start Date <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                      id="startDate"
                      type="date"
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="endDate" className="dark:text-gray-300">
                    End Date <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                      id="endDate"
                      type="date"
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="usageLimit" className="dark:text-gray-300">
                    Usage Limit
                  </Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    min="0"
                    placeholder="e.g., 100 (leave empty for unlimited)"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="minOrderAmount" className="dark:text-gray-300">
                    Minimum Order Amount
                  </Label>
                  <Input
                    id="minOrderAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g., 50.00 (leave empty for no minimum)"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <Label className="dark:text-gray-300">
                  Applicable To <span className="text-red-500">*</span>
                </Label>
                <RadioGroup value={applicableTo} onValueChange={setApplicableTo} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className="dark:text-gray-300">
                      All Products
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="category" id="category" />
                    <Label htmlFor="category" className="dark:text-gray-300">
                      Specific Category
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="products" id="products" />
                    <Label htmlFor="products" className="dark:text-gray-300">
                      Specific Products
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {applicableTo === "category" && (
                <div className="grid gap-3">
                  <Label htmlFor="category" className="dark:text-gray-300">
                    Select Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      {categories.map((category) => (
                        <SelectItem
                          key={category.value}
                          value={category.value}
                          className="dark:text-gray-200 dark:focus:bg-gray-700"
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {applicableTo === "products" && (
                <div className="grid gap-3">
                  <Label className="dark:text-gray-300">
                    Select Products <span className="text-red-500">*</span>
                  </Label>
                  <div className="border rounded-md p-4 max-h-60 overflow-y-auto dark:border-gray-600">
                    <div className="space-y-2">
                      {products.map((product) => (
                        <div key={product.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`product-${product.id}`}
                            checked={selectedProducts.includes(product.id)}
                            onCheckedChange={() => handleProductSelection(product.id)}
                          />
                          <Label htmlFor={`product-${product.id}`} className="dark:text-gray-300">
                            {product.name}{" "}
                            <span className="text-xs text-muted-foreground dark:text-gray-400">
                              ({product.category})
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">
                    Selected {selectedProducts.length} of {products.length} products
                  </p>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch id="active" defaultChecked />
                <Label htmlFor="active" className="dark:text-gray-300">
                  Active (coupon can be used)
                </Label>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/coupons")}
                className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:border-gray-600"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Coupon"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
