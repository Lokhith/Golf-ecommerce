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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, X, Plus, Info, Loader2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

export default function AddProductPage() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [hasSizes, setHasSizes] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    // Only show sizes for apparel and shoes
    setHasSizes(value === "apparels" || value === "shoes")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      router.push("/admin/products")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight dark:text-gray-200">Add New Product</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TabsContent value="basic" className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-gray-200">Basic Information</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Enter the basic details about your product.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-3">
                  <Label htmlFor="name" className="dark:text-gray-300">
                    Product Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    required
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                  />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="description" className="dark:text-gray-300">
                      Description <span className="text-red-500">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground dark:text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                          <p className="w-[200px] text-xs">
                            Provide a detailed description of your product including features and benefits.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Textarea
                    id="description"
                    placeholder="Enter product description"
                    className="min-h-[150px] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="category" className="dark:text-gray-300">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={selectedCategory} onValueChange={handleCategoryChange} required>
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

                <div className="grid gap-3">
                  <Label htmlFor="features" className="dark:text-gray-300">
                    Features (one per line)
                  </Label>
                  <Textarea
                    id="features"
                    placeholder="Enter product features, one per line"
                    className="min-h-[100px] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => router.push("/admin/products")}
                  className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:border-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => setActiveTab("images")}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                >
                  Next: Images
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-gray-200">Product Images</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Upload high-quality images of your product. The first image will be the main product image.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label className="dark:text-gray-300">Product Images</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-square rounded-md overflow-hidden border dark:border-gray-600 group"
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove image</span>
                          </Button>
                          {index === 0 && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 text-center">
                              Main Image
                            </div>
                          )}
                        </div>
                      ))}
                      <label className="flex flex-col items-center justify-center aspect-square rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex flex-col items-center justify-center p-4 text-center">
                          <Upload className="h-8 w-8 mb-2 text-gray-400" />
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload Image</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                        </div>
                        <Input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} multiple />
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setActiveTab("basic")}
                  className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:border-gray-600"
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  onClick={() => setActiveTab("pricing")}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                >
                  Next: Pricing
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-gray-200">Pricing & Inventory</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Set your product pricing and manage inventory.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="price" className="dark:text-gray-300">
                      Regular Price (₹) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0"
                      required
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                    />
                  </div>

                  <div className="grid gap-3">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="dealPrice" className="dark:text-gray-300">
                        Sale Price (₹)
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground dark:text-gray-500" />
                          </TooltipTrigger>
                          <TooltipContent className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                            <p className="w-[200px] text-xs">Leave empty if the product is not on sale.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="dealPrice"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="stock" className="dark:text-gray-300">
                      Stock Quantity <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      placeholder="0"
                      required
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="sku" className="dark:text-gray-300">
                      SKU (Stock Keeping Unit)
                    </Label>
                    <Input
                      id="sku"
                      placeholder="Enter SKU"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="active" defaultChecked />
                  <Label htmlFor="active" className="dark:text-gray-300">
                    Active (visible in store)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="featured" />
                  <Label htmlFor="featured" className="dark:text-gray-300">
                    Featured Product
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setActiveTab("images")}
                  className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:border-gray-600"
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  onClick={() => setActiveTab("attributes")}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                >
                  Next: Attributes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="attributes" className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-gray-200">Product Attributes</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Add additional attributes like sizes or specifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {hasSizes && (
                  <div className="space-y-3">
                    <Label className="dark:text-gray-300">Available Sizes</Label>
                    {selectedCategory === "shoes" ? (
                      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                        {["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"].map((size) => (
                          <div key={size} className="flex items-center space-x-2">
                            <Checkbox id={`size-${size}`} />
                            <Label htmlFor={`size-${size}`} className="text-sm dark:text-gray-300">
                              {size}
                            </Label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {["XS", "S", "M", "L", "XL", "XXL", "3XL"].map((size) => (
                          <div key={size} className="flex items-center space-x-2">
                            <Checkbox id={`size-${size}`} />
                            <Label htmlFor={`size-${size}`} className="text-sm dark:text-gray-300">
                              {size}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="dark:text-gray-300">Specifications</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:border-gray-600"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Add Specification
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Name (e.g., Weight)"
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                      />
                      <Input
                        placeholder="Value (e.g., 300g)"
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Name (e.g., Material)"
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                      />
                      <Input
                        placeholder="Value (e.g., Titanium)"
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="meta-title" className="dark:text-gray-300">
                    Meta Title (SEO)
                  </Label>
                  <Input
                    id="meta-title"
                    placeholder="Meta title for search engines"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="meta-description" className="dark:text-gray-300">
                    Meta Description (SEO)
                  </Label>
                  <Textarea
                    id="meta-description"
                    placeholder="Meta description for search engines"
                    className="min-h-[80px] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setActiveTab("pricing")}
                  className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:border-gray-600"
                >
                  Previous
                </Button>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Product"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}
