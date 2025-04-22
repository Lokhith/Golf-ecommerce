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

// Sample top deals data
const topDeals = [
  {
    id: 2,
    name: "Titleist Pro V1 Golf Balls (Dozen)",
    originalPrice: 54.99,
    price: 54.99,
    dealPrice: 49.99,
    discount: 9,
    image: "/pristine-golf-ball-display.png",
    category: "balls",
    brand: "Titleist",
    badge: "Limited Time",
  },
  {
    id: 3,
    name: "FootJoy Pro SL Golf Shoes",
    originalPrice: 169.99,
    price: 169.99,
    dealPrice: 149.99,
    discount: 12,
    image: "/modern-golf-footwear.png",
    category: "shoes",
    brand: "FootJoy",
    badge: "Best Seller",
  },
  {
    id: 4,
    name: "Callaway Rogue ST Max Irons",
    originalPrice: 899.99,
    price: 899.99,
    dealPrice: 799.99,
    discount: 11,
    image: "/set-of-golf-irons.png",
    category: "clubs",
    brand: "Callaway",
    badge: "Hot Deal",
  },
  {
    id: 5,
    name: "Nike Dri-FIT Golf Polo",
    originalPrice: 65.0,
    price: 65.0,
    dealPrice: 55.0,
    discount: 15,
    image: "/classic-golf-polo.png",
    category: "apparels",
    brand: "Nike",
    badge: "Clearance",
  },
  {
    id: 6,
    name: "Ping Hoofer Lite Stand Bag",
    originalPrice: 249.99,
    price: 249.99,
    dealPrice: 229.99,
    discount: 8,
    image: "/colorful-golf-gear.png",
    category: "bags",
    brand: "Ping",
    badge: "Weekend Special",
  },
  {
    id: 10,
    name: "Adidas Tour360 22 Golf Shoes",
    originalPrice: 199.99,
    price: 199.99,
    dealPrice: 179.99,
    discount: 10,
    image: "/modern-golf-footwear.png",
    category: "shoes",
    brand: "Adidas",
    badge: "Flash Sale",
  },
  {
    id: 13,
    name: "Callaway Chrome Soft Golf Balls",
    originalPrice: 49.99,
    price: 49.99,
    dealPrice: 44.99,
    discount: 10,
    image: "/golf-ball-display.png",
    category: "balls",
    brand: "Callaway",
    badge: "Deal of the Day",
  },
  {
    id: 14,
    name: "Under Armour Playoff 2.0 Golf Polo",
    originalPrice: 65.0,
    price: 65.0,
    dealPrice: 59.99,
    discount: 8,
    image: "/golfer-swing-polo.png",
    category: "apparels",
    brand: "Under Armour",
    badge: "Limited Stock",
  },
]

export default function TopDealsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("discount-high")
  const [priceRange, setPriceRange] = useState([0, 100000]) // Price range in INR
  const [showFilters, setShowFilters] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(topDeals)

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...topDeals]

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
      case "discount-high":
        filtered.sort((a, b) => b.discount - a.discount)
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
        <h1 className="text-3xl font-bold">Top Deals</h1>
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
                placeholder="Search deals..."
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
                  <SelectItem value="discount-high">Highest Discount</SelectItem>
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
