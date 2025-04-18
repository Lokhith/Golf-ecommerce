"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { formatIndianRupees, convertUSDtoINR } from "@/lib/utils"

// Sample new arrivals data
const newArrivals = [
  {
    id: 15,
    name: "Cobra KING Forged Tec Irons",
    price: 1099.99,
    image: "/cobra-forged-irons-closeup.png",
    link: "/product/15",
    category: "Clubs",
    isNew: true,
  },
  {
    id: 16,
    name: "Mizuno JPX921 Forged Irons",
    price: 1199.99,
    image: "/mizuno-jpx921-irons-display.png",
    link: "/product/16",
    category: "Clubs",
    isNew: true,
  },
  {
    id: 17,
    name: "ECCO BIOM H4 Golf Shoes",
    price: 179.99,
    image: "/stylish-golfer-swing.png",
    link: "/product/17",
    category: "Shoes",
    isNew: true,
  },
  {
    id: 19,
    name: "Callaway Apex Pro Irons",
    price: 1299.99,
    image: "/apex-pro-irons-closeup.png",
    link: "/product/19",
    category: "Clubs",
    isNew: true,
  },
  {
    id: 20,
    name: "TaylorMade TP5x Golf Balls",
    price: 44.99,
    image: "/tp5x-golf-balls-dozen.png",
    link: "/product/20",
    category: "Balls",
    isNew: true,
  },
]

export default function NewArrivals() {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { current } = carouselRef
      const scrollAmount = direction === "left" ? -current.offsetWidth / 2 : current.offsetWidth / 2
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
          <p className="text-muted-foreground mt-1">The latest additions to our collection</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 border-gray-300 dark:border-gray-700 md:flex hidden"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 border-gray-300 dark:border-gray-700 md:flex hidden"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Scroll right</span>
          </Button>
          <Link href="/new-arrivals" className="hidden md:block">
            <Button variant="outline" className="gap-2 group">
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile and desktop layouts */}
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {newArrivals.map((product) => (
            <Link
              key={product.id}
              href={product.link}
              className="min-w-[220px] sm:min-w-[240px] md:min-w-0 md:w-full snap-start md:snap-none"
            >
              <Card className="overflow-hidden h-full transition-all hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <Image
                      src={
                        product.image && product.image.trim() !== ""
                          ? product.image
                          : "/placeholder.svg?height=300&width=300&query=new+golf+equipment"
                      }
                      alt={product.name}
                      fill
                      className="object-cover p-4"
                    />
                    <Badge className="absolute top-2 right-2 bg-blue-500 dark:bg-blue-600">New</Badge>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-muted-foreground mb-1">{product.category}</div>
                    <h3 className="font-medium line-clamp-2 h-10 text-sm">{product.name}</h3>
                    <p className="font-bold text-green-700 dark:text-green-500 mt-2">
                      {formatIndianRupees(convertUSDtoINR(product.price))}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Mobile view all button */}
        <div className="flex justify-center mt-4 md:hidden">
          <Link href="/new-arrivals">
            <Button variant="outline" className="gap-2 group">
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
