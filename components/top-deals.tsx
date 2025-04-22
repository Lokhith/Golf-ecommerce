"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatIndianRupees, convertUSDtoINR } from "@/lib/utils"

// Sample top deals data
const topDeals = [
  {
    id: 2,
    name: "Titleist Pro V1 Golf Balls (Dozen)",
    originalPrice: 54.99,
    salePrice: 49.99,
    discount: 9,
    image: "/pristine-golf-ball-display.png",
    link: "/product/2",
    badge: "Limited Time",
  },
  {
    id: 3,
    name: "FootJoy Pro SL Golf Shoes",
    originalPrice: 169.99,
    salePrice: 149.99,
    discount: 12,
    image: "/modern-golf-footwear.png",
    link: "/product/3",
    badge: "Best Seller",
  },
  {
    id: 4,
    name: "Callaway Rogue ST Max Irons",
    originalPrice: 899.99,
    salePrice: 799.99,
    discount: 11,
    image: "/set-of-golf-irons.png",
    link: "/product/4",
    badge: "Hot Deal",
  },
  {
    id: 5,
    name: "Nike Dri-FIT Golf Polo",
    originalPrice: 65.0,
    salePrice: 55.0,
    discount: 15,
    image: "/classic-golf-polo.png",
    link: "/product/5",
    badge: "Clearance",
  },
  {
    id: 6,
    name: "Ping Hoofer Lite Stand Bag",
    originalPrice: 249.99,
    salePrice: 229.99,
    discount: 8,
    image: "/colorful-golf-gear.png",
    link: "/product/6",
    badge: "Weekend Special",
  },
  {
    id: 10,
    name: "Adidas Tour360 22 Golf Shoes",
    originalPrice: 199.99,
    salePrice: 179.99,
    discount: 10,
    image: "/modern-golf-footwear.png",
    link: "/product/10",
    badge: "Flash Sale",
  },
  {
    id: 13,
    name: "Callaway Chrome Soft Golf Balls",
    originalPrice: 49.99,
    salePrice: 44.99,
    discount: 10,
    image: "/golf-ball-display.png",
    link: "/product/13",
    badge: "Deal of the Day",
  },
  {
    id: 14,
    name: "Under Armour Playoff 2.0 Golf Polo",
    originalPrice: 65.0,
    salePrice: 59.99,
    discount: 8,
    image: "/golfer-swing-polo.png",
    link: "/product/14",
    badge: "Limited Stock",
  },
]

export default function TopDeals() {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { current } = carouselRef
      const scrollAmount = direction === "left" ? -current.offsetWidth : current.offsetWidth
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Top Deals</h2>
          <p className="text-muted-foreground mt-1">Limited-time offers on premium golf equipment</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 border-gray-300 dark:border-gray-700"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 border-gray-300 dark:border-gray-700"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Scroll right</span>
          </Button>
          <Link href="/top-deals" className="hidden md:block">
            <Button variant="outline" className="gap-2 group">
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {topDeals.map((deal) => (
            <Link key={deal.id} href={deal.link} className="min-w-[280px] sm:min-w-[320px] snap-start">
              <Card className="overflow-hidden h-full transition-all hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <Image
                      src={
                        deal.image && deal.image.trim() !== ""
                          ? deal.image
                          : "/placeholder.svg?height=300&width=300&query=golf+equipment+sale"
                      }
                      alt={deal.name}
                      fill
                      className="object-cover p-4"
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-2">
                      <Badge className="bg-red-500 dark:bg-red-600 text-white px-2 py-1">{deal.discount}% OFF</Badge>
                      <Badge className="bg-amber-500 dark:bg-amber-600 text-white px-2 py-1">{deal.badge}</Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium line-clamp-2 h-12">{deal.name}</h3>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-bold text-green-700 dark:text-green-500">
                        {formatIndianRupees(convertUSDtoINR(deal.salePrice))}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        {formatIndianRupees(convertUSDtoINR(deal.originalPrice))}
                      </span>
                    </div>
                    <Button className="w-full mt-3 bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile view all button */}
      <div className="flex justify-center mt-4 md:hidden">
        <Link href="/top-deals">
          <Button variant="outline" className="gap-2 group">
            View All Deals
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
