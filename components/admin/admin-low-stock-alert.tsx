"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

// Sample low stock products data
const lowStockProducts = [
  {
    id: 7,
    name: "Golf Pride MCC Plus4 Grip",
    stock: 0,
    threshold: 5,
    image: "/golf-pride-mcc-plus4-front.png",
  },
  {
    id: 8,
    name: "Clicgear 4.0 Push Cart",
    stock: 3,
    threshold: 5,
    image: "/clicgear-4-side-view.png",
  },
  {
    id: 4,
    name: "Callaway Rogue ST Max Irons",
    stock: 5,
    threshold: 10,
    image: "/set-of-golf-irons.png",
  },
  {
    id: 3,
    name: "FootJoy Pro SL Golf Shoes",
    stock: 8,
    threshold: 10,
    image: "/modern-golf-footwear.png",
  },
]

export function AdminLowStockAlert() {
  return (
    <div className="space-y-4">
      {lowStockProducts.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-muted-foreground">No low stock items</p>
        </div>
      ) : (
        <div className="space-y-3">
          {lowStockProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-medium dark:text-gray-200 line-clamp-1">{product.name}</h4>
                  <div className="flex items-center mt-1">
                    <AlertTriangle
                      className={`h-3 w-3 mr-1 ${
                        product.stock === 0 ? "text-red-500 dark:text-red-400" : "text-amber-500 dark:text-amber-400"
                      }`}
                    />
                    <span
                      className={`text-xs ${
                        product.stock === 0 ? "text-red-500 dark:text-red-400" : "text-amber-500 dark:text-amber-400"
                      }`}
                    >
                      {product.stock === 0 ? "Out of stock" : `Only ${product.stock} left`}
                    </span>
                  </div>
                </div>
              </div>
              <Link href={`/admin/products/edit/${product.id}`}>
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  Update Stock
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
