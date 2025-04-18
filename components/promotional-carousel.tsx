"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Sample promotional products data
const promotionalProducts = [
  {
    id: 1,
    name: "TaylorMade Stealth Driver",
    originalPrice: 599.99,
    salePrice: 179.99,
    discount: 70,
    image: "/golfer-swing.png",
    link: "/product/1",
    badge: "Limited Time",
    description: "Revolutionary 60X Carbon Twist Face for increased distance",
  },
  {
    id: 2,
    name: "Titleist Pro V1 Golf Balls (Dozen)",
    originalPrice: 54.99,
    salePrice: 19.99,
    discount: 64,
    image: "/pristine-golf-ball-display.png",
    link: "/product/2",
    badge: "Best Seller",
    description: "Exceptional distance, very low long game spin, and Drop-and-Stop™ control",
  },
  {
    id: 3,
    name: "Callaway Rogue ST Max Irons",
    originalPrice: 899.99,
    salePrice: 299.99,
    discount: 67,
    image: "/set-of-golf-irons.png",
    link: "/product/4",
    badge: "Flash Sale",
    description: "A.I. designed Flash Face Cup for increased ball speeds",
  },
]

export default function PromotionalCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === promotionalProducts.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? promotionalProducts.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {promotionalProducts.map((product) => (
          <div key={product.id} className="min-w-full relative">
            <div className="container py-12 md:py-16">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Badge className="bg-red-500 dark:bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase">
                        {product.discount}% Off
                      </Badge>
                      <Badge className="bg-amber-500 dark:bg-amber-600 text-white px-3 py-1 text-xs font-bold uppercase">
                        {product.badge}
                      </Badge>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{product.name}</h2>
                    <p className="text-muted-foreground text-lg max-w-md">{product.description}</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-500">
                        ${product.salePrice.toFixed(2)}
                      </span>
                      <span className="text-xl text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="pt-4">
                      <Link href={product.link}>
                        <Button
                          size="lg"
                          className="bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
                        >
                          Shop Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2 relative">
                  <div className="aspect-square relative max-w-md mx-auto">
                    <div className="absolute inset-0 bg-green-600/10 dark:bg-green-500/10 rounded-full -m-6"></div>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain p-6"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 dark:text-gray-200 rounded-full h-10 w-10 shadow-md"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 dark:text-gray-200 rounded-full h-10 w-10 shadow-md"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next slide</span>
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {promotionalProducts.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              currentSlide === index
                ? "bg-green-600 dark:bg-green-500 w-6"
                : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500",
            )}
            onClick={() => setCurrentSlide(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
