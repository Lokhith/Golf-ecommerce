import { notFound } from "next/navigation"
import ProductList from "@/components/product-list"
import CategoryFilters from "@/components/category-filters"

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
  {
    id: 9,
    name: "Titleist TSi2 Fairway Wood",
    price: 349.99,
    dealPrice: 299.99,
    category: "clubs",
    image: "/placeholder.svg?height=300&width=300&query=golf+fairway+wood",
    brand: "Titleist",
  },
  {
    id: 10,
    name: "Adidas Tour360 22 Golf Shoes",
    price: 199.99,
    dealPrice: 179.99,
    category: "shoes",
    image: "/placeholder.svg?height=300&width=300&query=adidas+golf+shoes",
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

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Check if category exists
  if (!validCategories.includes(slug)) {
    notFound()
  }

  // Filter products by category
  const products = allProducts.filter((product) => product.category === slug)

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">{categoryNames[slug as keyof typeof categoryNames]}</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <CategoryFilters category={slug} />
        </div>

        <div className="md:col-span-3">
          <ProductList products={products} />
        </div>
      </div>
    </div>
    
  )

  
}
