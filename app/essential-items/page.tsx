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

// Sample essential items data
const essentialItems = [
  {
    id: 2,
    name: "Titleist Pro V1 Golf Balls (Dozen)",
    price: 54.99,
    dealPrice: 49.99,
    image: "/pristine-golf-ball-display.png",
    category: "balls",
    brand: "Titleist",
  },
  {
    id: 7,
    name: "Golf Pride MCC Plus4 Grip",
    price: 11.99,
    dealPrice: 9.99,
    image: "/golfer-interlock-grip.png",
    category: "grips",
    brand: "Golf Pride",
  },
  {
    id: 5,
    name: "Nike Dri-FIT Golf Polo",
    price: 65.0,
    dealPrice: 55.0,
    image: "/classic-golf-polo.png",
    category: "apparels",
    brand: "Nike",
  },
  {
    id: 6,
    name: "Ping Hoofer Lite Stand Bag",
    price: 249.99,
    dealPrice: 229.99,
    image: "/colorful-golf-gear.png",
    category: "bags",
    brand: "Ping",
  },
  {
    id: 3,
    name: "FootJoy Pro SL Golf Shoes",
    price: 169.99,
    dealPrice: 149.99,
    image: "/modern-golf-footwear.png",
    category: "shoes",
    brand: "FootJoy",
  },
  {
    id: 12,
    name: "Bushnell Pro XE Rangefinder",
    price: 549.99,
    dealPrice: 499.99,
    image: "/golfer-using-rangefinder.png",
    category: "accessories",
    brand: "Bushnell",
  },
  {
    id: 13,
    name: "Callaway Chrome Soft Golf Balls",
    price: 49.99,
    dealPrice: 44.99,
    image: "/golf-ball-display.png",
    category: "balls",
    brand: "Callaway",
  },
  {
    id: 18,
    name: "Titleist Players 4 Stand Bag",
    price: 219.99,
    dealPrice: 199.99,
    image: "/titleist-golf-bag-studio.png",
    category: "bags",
    brand: "Titleist",
  },
]

export default function EssentialItemsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("popular")
  const [priceRange, setPriceRange] = useState([0, 50000]) // Price range in INR
  const [showFilters, setShowFilters] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(essentialItems)

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...essentialItems]

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
      case "popular":
        // For demo purposes, we'll keep the original order as "popular"
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
        <h1 className="text-3xl font-bold">Essential Items</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <div className={`md:w-1/4 space-y-6 ${showFilters ? "block" : "hidden md:block"}`}>
          <div className="rounded-lg border p-4">
            <h2 className="font-semibold mb-4">Price Range</h2>
            <Slider
              defaultValue={[0, 50000]}
              max={50000}
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
                placeholder="Search essential items..."
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
                  <SelectItem value="popular">Most Popular</SelectItem>
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
