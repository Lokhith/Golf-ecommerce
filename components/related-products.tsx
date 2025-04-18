import ProductCard from "@/components/product-card"

// Sample product data
const allProducts = [
  {
    id: 1,
    name: "TaylorMade Stealth Driver",
    price: 599.99,
    dealPrice: 499.99,
    category: "clubs",
    image: "/golfer-swing.png",
  },
  {
    id: 2,
    name: "Titleist Pro V1 Golf Balls (Dozen)",
    price: 54.99,
    dealPrice: 49.99,
    category: "balls",
    image: "/pristine-golf-ball-display.png",
  },
  {
    id: 3,
    name: "FootJoy Pro SL Golf Shoes",
    price: 169.99,
    dealPrice: 149.99,
    category: "shoes",
    image: "/modern-golf-footwear.png",
  },
  {
    id: 4,
    name: "Callaway Rogue ST Max Irons",
    price: 899.99,
    dealPrice: 799.99,
    category: "clubs",
    image: "/set-of-golf-irons.png",
  },
  {
    id: 5,
    name: "Nike Dri-FIT Golf Polo",
    price: 65.0,
    dealPrice: 55.0,
    category: "apparels",
    image: "/classic-golf-polo.png",
  },
  {
    id: 9,
    name: "Titleist TSi2 Fairway Wood",
    price: 349.99,
    dealPrice: 299.99,
    category: "clubs",
    image: "/placeholder.svg?height=300&width=300&query=golf+fairway+wood",
  },
  {
    id: 10,
    name: "Adidas Tour360 22 Golf Shoes",
    price: 199.99,
    dealPrice: 179.99,
    category: "shoes",
    image: "/placeholder.svg?height=300&width=300&query=adidas+golf+shoes",
  },
]

interface RelatedProductsProps {
  category: string
  currentProductId: string
}

export default function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  // Filter products by category and exclude current product
  // Convert currentProductId to number for comparison with product.id
  const relatedProducts = allProducts
    .filter((product) => product.category === category && product.id.toString() !== currentProductId)
    .slice(0, 4)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
