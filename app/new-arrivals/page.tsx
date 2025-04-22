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

// Sample new arrivals data
const newArrivals = [
  {
    id: 15,
    name: "Cobra KING Forged Tec Irons",
    price: 1199.99,
    dealPrice: 1099.99,
    image: "/cobra-forged-irons-closeup.png",
    category: "clubs",
    brand: "Cobra",
    isNew: true,
  },
  {
    id: 16,
    name: "Mizuno JPX921 Forged Irons",
    price: 1299.99,
    dealPrice: 1199.99,
    image: "/mizuno-jpx921-irons-display.png",
    category: "clubs",
    brand: "Mizuno",
    isNew: true,
  },
  {
    id: 17,
    name: "ECCO BIOM H4 Golf Shoes",
    price: 199.99,
    dealPrice: 179.99,
    image: "/stylish-golfer-swing.png",
    category: "shoes",
    brand: "ECCO",
    isNew: true,
  },
  {
    id: 19,
    name: "Callaway Apex Pro Irons",
    price: 1399.99,
    dealPrice: 1299.99,
    image: "/apex-pro-irons-closeup.png",
    category: "clubs",
    brand: "Callaway",
    isNew: true,
  },
  {
    id: 20,
    name: "TaylorMade TP5x Golf Balls",
    price: 49.99,
    dealPrice: 44.99,
    image: "/tp5x-golf-balls-dozen.png",
    category: "balls",
    brand: "TaylorMade",
    isNew: true,
  },
]

export default function NewArrivalsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("newest")
  const [priceRange, setPriceRange] = useState([0, 150000]) // Price range in INR
  const [showFilters, setShowFilters] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(newArrivals)

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...newArrivals]

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
      case "newest":
        // For demo purposes, we'll keep the original order as "newest"
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
        <h1 className="text-3xl font-bold">New Arrivals</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <div className={`md:w-1/4 space-y-6 ${showFilters ? "block" : "hidden md:block"}`}>
          <div className="rounded-lg border p-4">
            <h2 className="font-semibold mb-4">Price Range</h2>
            <Slider
              defaultValue={[0, 150000]}
              max={150000}
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
                placeholder="Search new arrivals..."
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
                  <SelectItem value="newest">Newest First</SelectItem>
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
