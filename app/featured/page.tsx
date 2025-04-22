"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react"
import ProductList from "@/components/product-list"
import { formatIndianRupees } from "@/lib/utils"

// Sample featured products data
const featuredProducts = [
  {
    id: 1,
    name: "TaylorMade Stealth Driver",
    price: 599.99,
    dealPrice: 499.99,
    category: "clubs",
    image: "/golfer-swing.png",
    brand: "TaylorMade",
  },
  {
    id: 4,
    name: "Callaway Rogue ST Max Irons",
    price: 899.99,
    dealPrice: 799.99,
    category: "clubs",
    image: "/set-of-golf-irons.png",
    brand: "Callaway",
  },
  {
    id: 9,
    name: "Titleist TSi2 Fairway Wood",
    price: 349.99,
    dealPrice: 299.99,
    category: "clubs",
    image: "/fairway-wood-closeup.png",
    brand: "Titleist",
  },
  {
    id: 3,
    name: "FootJoy Pro SL Golf Shoes",
    price: 169.99,
    dealPrice: 149.99,
    category: "shoes",
    image: "/modern-golf-footwear.png",
    brand: "FootJoy",
  },
  {
    id: 10,
    name: "Adidas Tour360 22 Golf Shoes",
    price: 199.99,
    dealPrice: 179.99,
    category: "shoes",
    image: "/modern-golf-footwear.png",
    brand: "Adidas",
  },
  {
    id: 11,
    name: "Scotty Cameron Special Select Newport 2 Putter",
    price: 399.99,
    dealPrice: 379.99,
    category: "clubs",
    image: "/classic-blade-putter.png",
    brand: "Titleist",
  },
]

export default function FeaturedPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 100000]) // Price range in INR
  const [showFilters, setShowFilters] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(featuredProducts)

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...featuredProducts]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    // Apply price filter (convert USD to INR for comparison)
    filtered = filtered.filter((product) => {
      const priceInINR = Math.round((product.dealPrice || product.price) * 83)
      return priceInINR >= priceRange[0] && priceInINR <= priceRange[1]
    })

    // Apply sorting
    switch (sortOption) {
      case "featured":
        // For demo purposes, we'll keep the original order as "featured"
        break
      case "price-low":
        filtered.sort((a, b) => (a.dealPrice || a.price) - (b.dealPrice || b.price))
        break
      case "price-high":
        filtered.sort((a, b) => (b.dealPrice || b.price) - (a.dealPrice || a.price))
        break
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }, [searchQuery, sortOption, priceRange])

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Featured Products</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <div className={`md:w-1/4 space-y-6 ${showFilters ? "block" : "hidden md:block"}`}>
          <div className="rounded-lg border p-4">
            <h2 className="font-semibold mb-4">Price Range</h2>
            <Slider
              defaultValue={[0, 100000]}
              max={100000}
              step={1000}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-6"
            />
            <div className="flex items-center justify-between text-sm">
              <span>{formatIndianRupees(priceRange[0])}</span>
              <span>{formatIndianRupees(priceRange[1])}</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:w-3/4">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search featured products..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="md:hidden" onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A-Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  )
}
