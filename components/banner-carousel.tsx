"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const banners = [
  {
    id: 1,
    title: "Summer Sale",
    description: "Up to 40% off on selected items",
    buttonText: "Shop Now",
    buttonLink: "/deals",
    image: "/summer-golf-green.png",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Check out the latest golf equipment",
    buttonText: "Discover",
    buttonLink: "/new-arrivals",
    image: "/gleaming-golf-gear.png",
  },
  {
    id: 3,
    title: "Pro Shop Collection",
    description: "Professional grade equipment for serious golfers",
    buttonText: "Explore",
    buttonLink: "/pro-shop",
    image: "/golf-course-essentials.png",
  },
]

export default function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="min-w-full relative">
            <div className="aspect-[21/12] md:aspect-[21/4] w-full relative">
              <Image
                src={
                  banner.image && banner.image.trim() !== ""
                    ? banner.image
                    : "/placeholder.svg?height=600&width=1200&query=golf+course"
                }
                alt={banner.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-1">
                <h2 className="text-xl md:text-3xl font-bold mb-0.5">{banner.title}</h2>
                <p className="text-xs md:text-base mb-1.5 max-w-md">{banner.description}</p>
                <Link href={banner.buttonLink}>
                  <Button size="sm" className="bg-green-700 hover:bg-green-800 text-xs md:text-sm md:h-9">
                    {banner.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
