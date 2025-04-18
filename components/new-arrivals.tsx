import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

// Sample new arrivals data
const newArrivals = [
  {
    id: 15,
    name: "Cobra KING Forged Tec Irons",
    price: 1099.99,
    image: "/placeholder.svg?height=300&width=300&query=cobra+forged+irons",
    link: "/product/15",
    category: "Clubs",
    isNew: true,
  },
  {
    id: 16,
    name: "Mizuno JPX921 Forged Irons",
    price: 1199.99,
    image: "/placeholder.svg?height=300&width=300&query=mizuno+jpx921+irons",
    link: "/product/16",
    category: "Clubs",
    isNew: true,
  },
  {
    id: 17,
    name: "ECCO BIOM H4 Golf Shoes",
    price: 179.99,
    image: "/placeholder.svg?height=300&width=300&query=ecco+golf+shoes",
    link: "/product/17",
    category: "Shoes",
    isNew: true,
  },
  {
    id: 19,
    name: "Callaway Apex Pro Irons",
    price: 1299.99,
    image: "/placeholder.svg?height=300&width=300&query=callaway+apex+pro+irons",
    link: "/product/19",
    category: "Clubs",
    isNew: true,
  },
  {
    id: 20,
    name: "TaylorMade TP5x Golf Balls",
    price: 44.99,
    image: "/placeholder.svg?height=300&width=300&query=taylormade+tp5x+golf+balls",
    link: "/product/20",
    category: "Balls",
    isNew: true,
  },
]

export default function NewArrivals() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
          <p className="text-muted-foreground mt-1">The latest additions to our collection</p>
        </div>
        <Link href="/new-arrivals">
          <Button variant="outline" className="gap-2 group">
            View All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {newArrivals.map((product) => (
          <Link key={product.id} href={product.link}>
            <Card className="overflow-hidden h-full transition-all hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover p-4"
                  />
                  <Badge className="absolute top-2 right-2 bg-blue-500 dark:bg-blue-600">New</Badge>
                </div>
                <div className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">{product.category}</div>
                  <h3 className="font-medium line-clamp-2 h-10 text-sm">{product.name}</h3>
                  <p className="font-bold text-green-700 dark:text-green-500 mt-2">${product.price.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
