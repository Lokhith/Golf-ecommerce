import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatIndianRupees, convertUSDtoINR } from "@/lib/utils"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    dealPrice?: number
    category: string
    image: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.dealPrice ? Math.round(((product.price - product.dealPrice) / product.price) * 100) : 0

  // Convert prices to INR
  const priceInINR = convertUSDtoINR(product.price)
  const dealPriceInINR = product.dealPrice ? convertUSDtoINR(product.dealPrice) : undefined

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
        <Button className="w-full bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
