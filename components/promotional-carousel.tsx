"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { formatIndianRupees, convertUSDtoINR } from "@/lib/utils"

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
    <div className="flex justify-center py-4">
      <div className="w-[80%] relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 via-green-600 to-teal-700 dark:from-emerald-900 dark:via-green-800 dark:to-teal-800 shadow-xl">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.1),transparent_40%)]"></div>
        <div className="absolute -left-10 top-1/4 w-40 h-40 rounded-full bg-green-500/20 blur-3xl"></div>
        <div className="absolute -right-10 bottom-1/4 w-40 h-40 rounded-full bg-teal-500/20 blur-3xl"></div>

        <div
          className="flex transition-transform duration-700 ease-in-out relative z-10"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {promotionalProducts.map((product) => (
            <div key={product.id} className="min-w-full relative">
              <div className="py-10 md:py-16 px-6 md:px-10 min-w-full">
                <div className="w-full">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1">
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Badge className="bg-red-500 dark:bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase">
                            {product.discount}% Off
                          </Badge>
                          <Badge className="bg-amber-500 dark:bg-amber-600 text-white px-3 py-1 text-xs font-bold uppercase">
                            {product.badge}
                          </Badge>
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                          {product.name}
                        </h2>
                        <p className="text-gray-200 dark:text-gray-300 text-base md:text-lg max-w-md">
                          {product.description}
                        </p>
                        <div className="flex items-baseline gap-3">
                          <span className="text-2xl md:text-3xl font-bold text-green-400 dark:text-green-300">
                            {formatIndianRupees(convertUSDtoINR(product.salePrice))}
                          </span>
                          <span className="text-xl text-gray-400 line-through">
                            {formatIndianRupees(convertUSDtoINR(product.originalPrice))}
                          </span>
                        </div>
                        <div className="pt-3">
                          <Link href={product.link}>
                            <Button
                              size="lg"
                              className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                            >
                              Shop Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="order-1 md:order-2 relative">
                      <div className="aspect-[1/1] md:aspect-[4/3] relative max-w-sm mx-auto">
                        <div className="absolute inset-0 bg-white/10 dark:bg-white/5 rounded-full -m-6 backdrop-blur-sm"></div>
                        <Image
                          src={
                            product.image && product.image.trim() !== ""
                              ? product.image
                              : "/placeholder.svg?height=600&width=600&query=golf+equipment"
                          }
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
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 dark:text-gray-200 rounded-full h-10 w-10 shadow-md z-20"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous slide</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 dark:text-gray-200 rounded-full h-10 w-10 shadow-md z-20"
          onClick={nextSlide}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next slide</span>
        </Button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {promotionalProducts.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all",
                currentSlide === index ? "bg-white w-6" : "bg-white/40 hover:bg-white/70",
              )}
              onClick={() => setCurrentSlide(index)}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
