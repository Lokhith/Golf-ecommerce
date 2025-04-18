"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, ShoppingCart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// This component is now deprecated in favor of the Header component
// Keeping it for reference but it's no longer used
const categories = [
  { name: "Balls", href: "/category/balls" },
  { name: "Clubs", href: "/category/clubs" },
  { name: "Shoes", href: "/category/shoes" },
  { name: "Apparels", href: "/category/apparels" },
  { name: "Daily Needs", href: "/category/daily-needs" },
  { name: "Grips", href: "/category/grips" },
  { name: "Trolleys", href: "/category/trolleys" },
  { name: "Training", href: "/category/training" },
  { name: "Bags", href: "/category/bags" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-green-700">GolfGear Pro</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-green-700",
                    pathname === category.href ? "text-green-700" : "text-muted-foreground",
                  )}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="hidden md:flex relative w-full max-w-sm items-center">
              <Input
                type="search"
                placeholder="Search products..."
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="ghost" size="icon" className="absolute right-0">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-4 w-4" />
                <span className="sr-only">Cart</span>
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-700 text-xs text-white flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 py-4">
                  <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                    <span className="text-xl font-bold text-green-700">GolfGear Pro</span>
                  </Link>
                  <form onSubmit={handleSearch} className="flex relative w-full items-center">
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pr-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="submit" variant="ghost" size="icon" className="absolute right-0">
                      <Search className="h-4 w-4" />
                      <span className="sr-only">Search</span>
                    </Button>
                  </form>
                  <nav className="flex flex-col gap-2">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-green-700 p-2 rounded-md",
                          pathname === category.href ? "bg-muted text-green-700" : "text-muted-foreground",
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
