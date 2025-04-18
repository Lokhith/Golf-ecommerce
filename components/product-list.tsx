"use client"

import { useState } from "react"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Grid3X3, List } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  dealPrice?: number
  category: string
  image: string
  brand: string
}

interface ProductListProps {
  products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">{products.length} products</p>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-green-700 hover:bg-green-800" : ""}
          >
            <Grid3X3 className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-green-700 hover:bg-green-800" : ""}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex border rounded-lg overflow-hidden">
              <div className="w-1/3 relative">
                <div className="aspect-square relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="w-2/3 p-4 flex flex-col">
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-1">{product.brand}</div>
                  <h3 className="font-medium hover:text-green-700 transition-colors">{product.name}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-bold text-green-700">
                      ₹{Math.round((product.dealPrice || product.price) * 83).toLocaleString("en-IN")}
                    </span>
                    {product.dealPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{Math.round(product.price * 83).toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>
                <Button className="mt-4 bg-green-700 hover:bg-green-800">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
