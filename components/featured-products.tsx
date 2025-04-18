import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { formatIndianRupees, convertUSDtoINR } from "@/lib/utils"

// Sample featured products data
const featuredProducts = [
  {
    id: 1,
    name: "TaylorMade Stealth Driver",
    price: 499.99,
    category: "Clubs",
    image: "/golfer-swing.png",
    link: "/product/1",
  },
  {
    id: 4,
    name: "Callaway Rogue ST Max Irons",
    price: 799.99,
    category: "Clubs",
    image: "/set-of-golf-irons.png",
    link: "/product/4",
  },
  {
    id: 9,
    name: "Titleist TSi2 Fairway Wood",
    price: 299.99,
    category: "Clubs",
    image: "/fairway-wood-closeup.png",
    link: "/product/9",
  },
  {
    id: 3,
    name: "FootJoy Pro SL Golf Shoes",
    price: 149.99,
    category: "Shoes",
    image: "/modern-golf-footwear.png",
    link: "/product/3",
  },
  {
    id: 10,
    name: "Adidas Tour360 22 Golf Shoes",
    price: 179.99,
    category: "Shoes",
    image: "/modern-golf-footwear.png",
    link: "/product/10",
  },
  {
    id: 11,
    name: "Scotty Cameron Special Select Newport 2 Putter",
    price: 379.99,
    category: "Clubs",
    image: "/classic-blade-putter.png",
    link: "/product/11",
  },
]

export default function FeaturedProducts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
          <p className="text-muted-foreground mt-1">Handpicked selection of premium golf equipment</p>
        </div>
        <Link href="/featured">
          <Button variant="outline" className="gap-2 group">
            View All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <Link key={product.id} href={product.link}>
            <Card className="overflow-hidden h-full transition-all hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 group">
              <CardContent className="p-0">
                <div className="aspect-square relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Image
                    src={
                      product.image && product.image.trim() !== ""
                        ? product.image
                        : "/placeholder.svg?height=400&width=400&query=golf+equipment"
                    }
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform">
                    <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                      View Product
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-green-700 dark:text-green-500 font-medium mb-1">{product.category}</div>
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="font-bold text-lg mt-2">{formatIndianRupees(convertUSDtoINR(product.price))}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
