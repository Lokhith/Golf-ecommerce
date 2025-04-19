"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Check } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatIndianRupees, convertUSDtoINR } from "@/lib/utils"
import { useCart } from "@/context/cart-context"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    dealPrice?: number
    category: string
    image: string
    brand?: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInCart } = useCart()
  const discount = product.dealPrice ? Math.round(((product.price - product.dealPrice) / product.price) * 100) : 0
  const router = useRouter()

  // Convert prices to INR
  const priceInINR = convertUSDtoINR(product.price)
  const dealPriceInINR = product.dealPrice ? convertUSDtoINR(product.dealPrice) : undefined

  // Update the handleAddToCart function in ProductCard to handle size requirements
  const handleAddToCart = () => {
    // Check if product is a type that requires size selection
    const requiresSize = product.category.toLowerCase() === "shoes" || product.category.toLowerCase() === "apparels"

    if (requiresSize) {
      // Redirect to product page for size selection instead of adding directly
      router.push(`/product/${product.id}`)
      return
    }

    // For products that don't require size, add directly
    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const productInCart = isInCart(product.id)

  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={
              product.image && product.image.trim() !== ""
                ? product.image
                : "/placeholder.svg?height=300&width=300&query=golf+product"
            }
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          {discount > 0 && <Badge className="absolute top-2 right-2 bg-red-500 dark:bg-red-600">{discount}% OFF</Badge>}
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium line-clamp-2 hover:text-green-700 dark:hover:text-green-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-bold text-green-700 dark:text-green-400">
            {formatIndianRupees(dealPriceInINR || priceInINR)}
          </span>
          {dealPriceInINR && (
            <span className="text-sm text-muted-foreground line-through">{formatIndianRupees(priceInINR)}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className={`w-full ${
            productInCart
              ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
              : "bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
          }`}
          onClick={handleAddToCart}
        >
          {productInCart ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
