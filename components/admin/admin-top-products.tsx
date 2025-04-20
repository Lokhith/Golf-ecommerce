"use client"

import Image from "next/image"
import { TrendingUp, TrendingDown } from "lucide-react"

// Sample top products data
const topProducts = [
  {
    id: 1,
    name: "TaylorMade Stealth Driver",
    sales: 42,
    revenue: 20999.58,
    trend: 15, // percentage increase
    image: "/stealth-driver-closeup.png",
  },
  {
    id: 2,
    name: "Titleist Pro V1 Golf Balls (Dozen)",
    sales: 128,
    revenue: 6398.72,
    trend: 8,
    image: "/golf-ball-box.png",
  },
  {
    id: 3,
    name: "FootJoy Pro SL Golf Shoes",
    sales: 36,
    revenue: 5399.64,
    trend: -3,
    image: "/modern-golf-footwear.png",
  },
  {
    id: 4,
    name: "Callaway Rogue ST Max Irons",
    sales: 24,
    revenue: 19199.76,
    trend: 22,
    image: "/set-of-golf-irons.png",
  },
]

export function AdminTopProducts() {
  return (
    <div className="space-y-4">
      {topProducts.map((product) => (
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
              <div className="flex items-center gap-4 mt-1">
                <span className="text-xs text-muted-foreground dark:text-gray-400">{product.sales} sold</span>
                <span className="text-xs font-medium dark:text-gray-300">
                  ₹{Math.round(product.revenue * 83).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
          <div
            className={`flex items-center text-xs font-medium ${
              product.trend >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}
          >
            {product.trend >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {Math.abs(product.trend)}%
          </div>
        </div>
      ))}
    </div>
  )
}
