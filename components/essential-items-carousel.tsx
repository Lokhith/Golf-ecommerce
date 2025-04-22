"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatIndianRupees, convertUSDtoINR } from "@/lib/utils"

// Sample essential items data
const essentialItems = [
  {
    id: 2,
    name: "Titleist Pro V1 Golf Balls (Dozen)",
    price: 49.99,
    image: "/pristine-golf-ball-display.png",
    link: "/product/2",
  },
  {
    id: 7,
    name: "Golf Pride MCC Plus4 Grip",
    price: 9.99,
    image: "/golfer-interlock-grip.png",
    link: "/product/7",
  },
  {
    id: 5,
    name: "Nike Dri-FIT Golf Polo",
    price: 55.0,
    image: "/classic-golf-polo.png",
    link: "/product/5",
  },
  {
    id: 6,
    name: "Ping Hoofer Lite Stand Bag",
    price: 229.99,
    image: "/colorful-golf-gear.png",
    link: "/product/6",
  },
  {
    id: 3,
    name: "FootJoy Pro SL Golf Shoes",
    price: 149.99,
    image: "/modern-golf-footwear.png",
    link: "/product/3",
  },
  {
    id: 12,
    name: "Bushnell Pro XE Rangefinder",
    price: 499.99,
    image: "/golfer-using-rangefinder.png",
    link: "/product/12",
  },
  {
    id: 13,
    name: "Callaway Chrome Soft Golf Balls",
    price: 44.99,
    image: "/golf-ball-display.png",
    link: "/product/13",
  },
  {
    id: 18,
    name: "Titleist Players 4 Stand Bag",
    price: 199.99,
    image: "/titleist-golf-bag-studio.png",
    link: "/product/18",
  },
]

export default function EssentialItemsCarousel() {
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
          <h2 className="text-2xl md:text-3xl font-bold">Essential Items</h2>
          <p className="text-muted-foreground mt-1">Frequently purchased by our customers</p>
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
          <Link href="/essential-items" className="hidden md:block">
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
          {essentialItems.map((item) => (
            <Link key={item.id} href={item.link} className="min-w-[180px] sm:min-w-[220px] snap-start">
              <Card className="overflow-hidden h-full transition-all hover:shadow-md dark:bg-gray-800 dark:border-gray-700 border-2 hover:border-green-500 dark:hover:border-green-600">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <Image
                      src={
                        item.image && item.image.trim() !== ""
                          ? item.image
                          : "/placeholder.svg?height=300&width=300&query=golf+equipment"
                      }
                      alt={item.name}
                      fill
                      className="object-cover p-4"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-sm line-clamp-2 h-10">{item.name}</h3>
                    <p className="font-bold text-green-700 dark:text-green-500 mt-2">
                      {formatIndianRupees(convertUSDtoINR(item.price))}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile view all button */}
      <div className="flex justify-center mt-4 md:hidden">
        <Link href="/essential-items">
          <Button variant="outline" className="gap-2 group">
            View All Essentials
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
