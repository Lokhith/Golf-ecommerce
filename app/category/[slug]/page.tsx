"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import ProductList from "@/components/product-list"
import CategoryFilters from "@/components/category-filters"
import { convertUSDtoINR } from "@/lib/utils"

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
    image: "/colorful-golf-gear.png",
    brand: "Ping",
  },
  {
    id: 7,
    name: "Golf Pride MCC Plus4 Grip",
    price: 11.99,
    dealPrice: 9.99,
    category: "grips",
    image: "/golfer-interlock-grip.png",
    brand: "Golf Pride",
  },
  {
    id: 8,
    name: "Clicgear 4.0 Push Cart",
    price: 259.99,
    dealPrice: 239.99,
    category: "trolleys",
    image: "/golfer-push-cart.png",
    brand: "Clicgear",
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
    id: 10,
    name: "Adidas Tour360 22 Golf Shoes",
    price: 199.99,
    dealPrice: 179.99,
    category: "shoes",
    image: "/modern-golf-footwear.png",
    brand: "Adidas",
  },
]

// Valid categories
const validCategories = ["balls", "clubs", "shoes", "apparels", "daily-needs", "grips", "trolleys", "training", "bags"]

// Category name mapping for display
const categoryNames = {
  balls: "Golf Balls",
  clubs: "Golf Clubs",
  shoes: "Golf Shoes",
  apparels: "Golf Apparel",
  "daily-needs": "Daily Needs",
  grips: "Golf Grips",
  trolleys: "Golf Trolleys",
  training: "Training Aids",
  bags: "Golf Bags",
}

// Define the Product type
interface Product {
  id: number
  name: string
  price: number
  dealPrice?: number
  category: string
  image: string
  brand: string
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Check if category exists
  if (!validCategories.includes(slug)) {
    notFound()
  }

  // State for filtered products with proper typing
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [priceRange, setPriceRange] = useState([0, 100000]) // Price range in INR
  const [sortOption, setSortOption] = useState("featured")
  const [discountFilter, setDiscountFilter] = useState<string[]>([])

  // Initialize products on mount and when slug changes
  useEffect(() => {
    // Get products for this category
    const categoryProducts = allProducts.filter((product) => product.category === slug)
    setFilteredProducts(categoryProducts)
  }, [slug])

  // Apply filters and sorting when filter criteria change
  useEffect(() => {
    // Get products for this category again to start fresh
    const categoryProducts = allProducts.filter((product) => product.category === slug)

    // Apply price range filter (in INR)
    let result = categoryProducts.filter((product) => {
      const priceInINR = convertUSDtoINR(product.dealPrice || product.price)
      return priceInINR >= priceRange[0] && priceInINR <= priceRange[1]
    })

    // Apply discount filter
    if (discountFilter.length > 0) {
      result = result.filter((product) => {
        if (!product.dealPrice) return false

        const discountPercent = Math.round(((product.price - product.dealPrice) / product.price) * 100)

        return discountFilter.some((filter) => {
          const minDiscount = Number.parseInt(filter, 10)
          return discountPercent >= minDiscount
        })
      })
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => (a.dealPrice || a.price) - (b.dealPrice || b.price))
        break
      case "price-high":
        result.sort((a, b) => (b.dealPrice || b.price) - (a.dealPrice || a.price))
        break
      case "newest":
        // In a real app, you would sort by date added
        // Here we'll just keep the original order
        break
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "featured":
      default:
        // Keep default order
        break
    }

    setFilteredProducts(result)
  }, [slug, priceRange, sortOption, discountFilter])

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">{categoryNames[slug as keyof typeof categoryNames]}</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <CategoryFilters
            category={slug}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortOption={sortOption}
            setSortOption={setSortOption}
            discountFilter={discountFilter}
            setDiscountFilter={setDiscountFilter}
          />
        </div>

        <div className="md:col-span-3">
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  )
}
