import Link from "next/link"
import {
  GlobeIcon as GolfBall,
  Club,
  Footprints,
  Shirt,
  ShoppingBag,
  Grip,
  ShoppingCart,
  Dumbbell,
  Backpack,
  ChevronRight,
} from "lucide-react"

// Category data with icons
const categories = [
  { name: "Balls", href: "/category/balls", icon: GolfBall },
  { name: "Clubs", href: "/category/clubs", icon: Club },
  { name: "Shoes", href: "/category/shoes", icon: Footprints },
  { name: "Apparels", href: "/category/apparels", icon: Shirt },
  { name: "Daily Needs", href: "/category/daily-needs", icon: ShoppingBag },
  { name: "Grips", href: "/category/grips", icon: Grip },
  { name: "Trolleys", href: "/category/trolleys", icon: ShoppingCart },
  { name: "Training", href: "/category/training", icon: Dumbbell },
  { name: "Bags", href: "/category/bags", icon: Backpack },
]

export default function MobileCategoryNav() {
  return (
    <div className="md:hidden bg-white dark:bg-gray-900 py-4 border-b border-gray-100 dark:border-gray-800">
      <div className="container">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Categories</h2>
          <Link href="/categories" className="text-sm text-green-600 dark:text-green-500 flex items-center">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        {/* Changed from horizontal scrolling to grid layout */}
        <div className="grid grid-cols-3 gap-3">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={category.href} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-1 border border-green-100 dark:border-green-800">
                  <Icon className="h-6 w-6 text-green-600 dark:text-green-500" />
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
