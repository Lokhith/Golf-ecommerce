"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import ProductList from "@/components/product-list"

// Sample product data
const allProducts = [
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
    id: 2,
    name: "Titleist Pro V1 Golf Balls (Dozen)",
    price: 54.99,
    dealPrice: 49.99,
    category: "balls",
    image: "/pristine-golf-ball-display.png",
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
    id: 4,
    name: "Callaway Rogue ST Max Irons",
    price: 899.99,
    dealPrice: 799.99,
    category: "clubs",
    image: "/set-of-golf-irons.png",
    brand: "Callaway",
  },
  {
    id: 5,
    name: "Nike Dri-FIT Golf Polo",
    price: 65.0,
    dealPrice: 55.0,
    category: "apparels",
    image: "/classic-golf-polo.png",
    brand: "Nike",
  },
  {
    id: 6,
    name: "Ping Hoofer Lite Stand Bag",
    price: 249.99,
    dealPrice: 229.99,
    category: "bags",
    image: "/placeholder.svg?height=300&width=300&query=golf+bag",
    brand: "Ping",
  },
  {
    id: 7,
    name: "Golf Pride MCC Plus4 Grip",
    price: 11.99,
    dealPrice: 9.99,
    category: "grips",
    image: "/placeholder.svg?height=300&width=300&query=golf+grip",
    brand: "Golf Pride",
  },
  {
    id: 8,
    name: "Clicgear 4.0 Push Cart",
    price: 259.99,
    dealPrice: 239.99,
    category: "trolleys",
    image: "/placeholder.svg?height=300&width=300&query=golf+push+cart",
    brand: "Clicgear",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(query)
  const [searchResults, setSearchResults] = useState<any[]>([])

  useEffect(() => {
    if (query) {
      const results = allProducts.filter((product) => {
        const searchLower = query.toLowerCase()
        return (
          product.name.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
        )
      })
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-8 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button type="submit" className="bg-green-700 hover:bg-green-800">
          Search
        </Button>
      </form>

      {query ? (
        <>
          <h2 className="text-xl font-semibold mb-6">
            {searchResults.length === 0
              ? "No results found"
              : `Found ${searchResults.length} result${searchResults.length === 1 ? "" : "s"} for "${query}"`}
          </h2>

          {searchResults.length > 0 && <ProductList products={searchResults} />}
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Enter a search term</h2>
          <p className="text-muted-foreground">Search for products by name, brand, or category.</p>
        </div>
      )}
    </div>
  )
}
