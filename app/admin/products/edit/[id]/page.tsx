"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { productData } from "@/lib/product-data"

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

const brands = [
  "TaylorMade",
  "Callaway",
  "Titleist",
  "Ping",
  "Cobra",
  "Mizuno",
  "Nike",
  "Adidas",
  "FootJoy",
  "Under Armour",
  "Puma",
  "Cleveland",
  "Srixon",
  "Wilson",
  "Odyssey",
  "Scotty Cameron",
  "Bridgestone",
]

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params

  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedBrand, setSelectedBrand] = useState<string>("")
  const [hasSizes, setHasSizes] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  useEffect(() => {
    // Find product by ID
    const foundProduct = productData.find((p) => p.id.toString() === id)

    if (foundProduct) {
      setProduct(foundProduct)
      setImages(foundProduct.images ? [foundProduct.image] : [])
      setSelectedCategory(foundProduct.category.toLowerCase())
      setSelectedBrand(foundProduct.brand.toLowerCase())
      setHasSizes(foundProduct.category.toLowerCase() === "apparels" || foundProduct.category.toLowerCase() === "shoes")
    }

    setLoading(false)
  }, [id])

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
    setSaving(true)

    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      router.push("/admin/products")
    }, 1500)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-muted-foreground">Loading product data...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="text-muted-foreground mb-4">The product you are looking for does not exist.</p>
        <Link href="/admin/products">
          <Button>Return to Products</Button>
        </Link>
      </div>
    )
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
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
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
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Edit the basic details about your product.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">
                    Product Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="name" defaultValue={product.name} required />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="description">
                      Description <span className="text-red-500">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[200px] text-xs">
                            Provide a detailed description of your product including features and benefits.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Textarea
                    id="description"
                    defaultValue={product.description || ""}
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="category">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select value={selectedCategory} onValueChange={handleCategoryChange} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="brand">
                      Brand <span className="text-red-500">*</span>
                    </Label>
                    <Select value={selectedBrand} onValueChange={setSelectedBrand} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand} value={brand.toLowerCase()}>
                            {brand}
                          </SelectItem>
                        ))}
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="features">Features (one per line)</Label>
                  <Textarea
                    id="features"
                    defaultValue={product.features ? product.features.join("\n") : ""}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.push("/admin/products")}>
                  Cancel
                </Button>
                <Button type="button" onClick={() => setActiveTab("images")}>
                  Next: Images
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Update the product images. The first image will be the main product image.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label>Product Images</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative aspect-square rounded-md overflow-hidden border group">
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
                      <label className="flex flex-col items-center justify-center aspect-square rounded-md border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col items-center justify-center p-4 text-center">
                          <Upload className="h-8 w-8 mb-2 text-gray-400" />
                          <p className="text-sm font-medium text-gray-700">Upload Image</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                        </div>
                        <Input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} multiple />
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setActiveTab("basic")}>
                  Previous
                </Button>
                <Button type="button" onClick={() => setActiveTab("pricing")}>
                  Next: Pricing
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Inventory</CardTitle>
                <CardDescription>Update your product pricing and manage inventory.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="price">
                      Regular Price ($) <span className="text-red-500">*</span>
                    </Label>
                    <Input id="price" type="number" min="0" step="0.01" defaultValue={product.price} required />
                  </div>

                  <div className="grid gap-3">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="dealPrice">Sale Price ($)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px] text-xs">Leave empty if the product is not on sale.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input id="dealPrice" type="number" min="0" step="0.01" defaultValue={product.dealPrice || ""} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="stock">
                      Stock Quantity <span className="text-red-500">*</span>
                    </Label>
                    <Input id="stock" type="number" min="0" defaultValue={product.stock || 0} required />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                    <Input id="sku" defaultValue={product.sku || ""} />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="active" defaultChecked={product.active !== false} />
                  <Label htmlFor="active">Active (visible in store)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="featured" defaultChecked={product.featured === true} />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setActiveTab("images")}>
                  Previous
                </Button>
                <Button type="button" onClick={() => setActiveTab("attributes")}>
                  Next: Attributes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="attributes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Attributes</CardTitle>
                <CardDescription>Update additional attributes like sizes, colors, or specifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {hasSizes && (
                  <div className="space-y-3">
                    <Label>Available Sizes</Label>
                    {selectedCategory === "shoes" ? (
                      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                        {["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"].map((size) => (
                          <div key={size} className="flex items-center space-x-2">
                            <Checkbox id={`size-${size}`} defaultChecked={product.sizes?.includes(size)} />
                            <Label htmlFor={`size-${size}`} className="text-sm">
                              {size}
                            </Label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {["XS", "S", "M", "L", "XL", "XXL", "3XL"].map((size) => (
                          <div key={size} className="flex items-center space-x-2">
                            <Checkbox id={`size-${size}`} defaultChecked={product.sizes?.includes(size)} />
                            <Label htmlFor={`size-${size}`} className="text-sm">
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
                    <Label>Specifications</Label>
                    <Button type="button" variant="outline" size="sm" className="h-8">
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Add Specification
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {product.specifications ? (
                      Object.entries(product.specifications).map(([key, value], index) => (
                        <div key={index} className="grid grid-cols-2 gap-2">
                          <Input defaultValue={key} />
                          <Input defaultValue={value as string} />
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="Name (e.g., Weight)" />
                          <Input placeholder="Value (e.g., 300g)" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="Name (e.g., Material)" />
                          <Input placeholder="Value (e.g., Titanium)" />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="meta-title">Meta Title (SEO)</Label>
                  <Input
                    id="meta-title"
                    defaultValue={product.metaTitle || ""}
                    placeholder="Meta title for search engines"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="meta-description">Meta Description (SEO)</Label>
                  <Textarea
                    id="meta-description"
                    defaultValue={product.metaDescription || ""}
                    placeholder="Meta description for search engines"
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setActiveTab("pricing")}>
                  Previous
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={saving}>
                  {saving ? "Saving..." : "Update Product"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}
