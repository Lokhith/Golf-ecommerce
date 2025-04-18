"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ProductImageCarouselProps {
  images: string[]
}

export default function ProductImageCarousel({ images }: ProductImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToImage = (index: number) => {
    setCurrentImage(index)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square rounded-lg overflow-hidden border">
        <Image src={images[currentImage] || "/placeholder.svg"} alt="Product image" fill className="object-contain" />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="absolute bottom-2 right-2 bg-white/80 hover:bg-white">
              <ZoomIn className="h-4 w-4" />
              <span className="sr-only">Zoom image</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <div className="aspect-square relative">
              <Image
                src={images[currentImage] || "/placeholder.svg"}
                alt="Product image"
                fill
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
          onClick={prevImage}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous image</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
          onClick={nextImage}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next image</span>
        </Button>
      </div>

      <div className="flex gap-2 overflow-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative aspect-square w-20 rounded-md overflow-hidden border ${
              currentImage === index ? "ring-2 ring-green-700" : ""
            }`}
            onClick={() => goToImage(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
