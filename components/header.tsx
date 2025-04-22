"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Search, ShoppingCart, Menu, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useClickOutside } from "@/hooks/use-click-outside"
import { productData } from "@/lib/product-data"
import UserAccountNav from "@/components/user-account-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { formatIndianRupees, convertUSDtoINR } from "@/lib/utils"
import { useCart } from "@/context/cart-context"

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

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  // Add a new state for mobile search
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const { itemCount } = useCart()

  // Close search results when clicking outside
  useClickOutside(searchRef, () => {
    setShowSearchResults(false)
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Reset search when navigating to a new page
  useEffect(() => {
    setSearchQuery("")
    setShowSearchResults(false)
  }, [pathname])

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase()
      const filteredProducts = productData.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
      setSearchResults(filteredProducts.slice(0, 5)) // Limit to 5 results
      setShowSearchResults(true)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setShowSearchResults(false)
    }
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchResultClick = (productId: number) => {
    router.push(`/product/${productId}`)
    setShowSearchResults(false)
    setSearchQuery("")
  }

  const clearSearch = () => {
    setSearchQuery("")
    setShowSearchResults(false)
  }

  // Add this function to handle mobile search toggle
  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen)
    if (!mobileSearchOpen) {
      // Focus the input when explicitly opening the search
      setTimeout(() => {
        const mobileSearchInput = document.getElementById("mobile-search-input")
        if (mobileSearchInput) {
          mobileSearchInput.focus()
        }
      }, 100)
    }
  }

  // Add this function to handle mobile search submission
  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setMobileSearchOpen(false)
    }
  }

  // Add a useEffect to close mobile search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileSearchContainer = document.getElementById("mobile-search-container")
      if (mobileSearchOpen && mobileSearchContainer && !mobileSearchContainer.contains(event.target as Node)) {
        setMobileSearchOpen(false)
      }
    }

    if (mobileSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mobileSearchOpen])

  // Check if current page is cart page
  const isCartPage = pathname === "/cart"

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white dark:bg-gray-900 shadow-md"
          : "bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900",
      )}
    >
      {/* Top bar with contact info and account */}
      <div className="bg-black text-white py-1.5 text-xs">
        <div className="container flex justify-between items-center">
          <div>Free shipping on orders over ₹8,000</div>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-green-300 transition-colors">
              Contact Us
            </Link>
            <Link href="/account" className="hover:text-green-300 transition-colors">
              My Account
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container">
        <div className="flex h-20 items-center justify-between">
          {/* Mobile menu button - moved to the left */}
          <div className="flex items-center md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("rounded-full h-11 w-11 -ml-3", isScrolled ? "text-green-600" : "text-white")}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 overflow-y-auto max-h-screen">
                <div className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 p-6">
                  <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                    <div className="relative h-10 w-10 mr-2">
                      <div className="absolute inset-0 bg-white rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-green-600">G</span>
                      </div>
                    </div>
                    <div className="text-white font-bold">
                      <span className="text-xl">GolfGear</span>
                      <span className="text-xl font-light">Pro</span>
                    </div>
                  </Link>
                </div>
                <div className="p-6 pb-20">
                  {/* Search bar - moved to the top */}
                  <div className="relative mb-6 animate-in slide-in-from-left duration-300">
                    <form onSubmit={handleSearch} className="w-full">
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="pr-10 rounded-full border-2 border-green-400"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        autoFocus={false} // Explicitly set autoFocus to false
                      />
                      {searchQuery ? (
                        <button
                          type="button"
                          onClick={clearSearch}
                          className="absolute right-12 top-0 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Clear search</span>
                        </button>
                      ) : null}
                      <Button
                        type="submit"
                        size="icon"
                        className="absolute right-0 top-0 rounded-full h-10 w-10 bg-green-600 hover:bg-green-700"
                      >
                        <Search className="h-4 w-4 text-white" />
                        <span className="sr-only">Search</span>
                      </Button>
                    </form>

                    {/* Mobile search results */}
                    {showSearchResults && searchQuery.trim().length > 1 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-[60vh] overflow-y-auto">
                        {searchResults.length > 0 ? (
                          <div>
                            <div className="max-h-[300px] overflow-y-auto">
                              {searchResults.map((product) => (
                                <div
                                  key={product.id}
                                  className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0"
                                  onClick={() => {
                                    handleSearchResultClick(product.id)
                                    setMobileSearchOpen(false)
                                    setIsMenuOpen(false)
                                  }}
                                >
                                  <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                                    <Image
                                      src={
                                        product.image && product.image.trim() !== ""
                                          ? product.image
                                          : "/placeholder.svg?height=100&width=100&query=golf+product"
                                      }
                                      alt={product.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="ml-3 flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                      {product.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {formatIndianRupees(convertUSDtoINR(product.dealPrice || product.price))}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 text-center">
                            <p className="text-sm text-gray-500">No products found</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Categories section - now below search */}
                  <div className="space-y-1 mb-6 animate-in slide-in-from-left duration-300 delay-150">
                    <h3 className="font-semibold text-lg mb-3">Categories</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {categories.map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          className={cn(
                            "flex flex-col items-center p-3 rounded-lg transition-colors border border-gray-100 dark:border-gray-800",
                            pathname === category.href
                              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                              : "text-gray-700 hover:bg-green-50 hover:text-green-700 hover:border-green-200 dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400 dark:hover:border-green-800",
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="text-sm font-medium">{category.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Quick links - adjust delay */}
                  <div className="space-y-1 animate-in slide-in-from-left duration-300 delay-300">
                    <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
                    <div className="space-y-2">
                      <Link
                        href="/featured"
                        className="block py-2 px-3 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Featured Products
                      </Link>
                      <Link
                        href="/new-arrivals"
                        className="block py-2 px-3 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        New Arrivals
                      </Link>
                      <Link
                        href="/top-deals"
                        className="block py-2 px-3 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Top Deals
                      </Link>
                      <Link
                        href="/essential-items"
                        className="block py-2 px-3 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Essential Items
                      </Link>
                    </div>
                  </div>

                  {/* Account links - adjust delay */}
                  <div className="space-y-1 mt-6 animate-in slide-in-from-left duration-300 delay-500">
                    <h3 className="font-semibold text-lg mb-3">Account</h3>
                    <div className="space-y-2">
                      <Link
                        href="/account"
                        className="block py-2 px-3 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Account
                      </Link>
                      <Link
                        href="/cart"
                        className="block py-2 px-3 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Cart
                      </Link>
                      <Link
                        href="/orders"
                        className="block py-2 px-3 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      <Link
                        href="/contact"
                        className="block py-2 px-3 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors dark:text-gray-300 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo - centered on mobile */}
          <Link href="/" className="flex items-center md:ml-0">
            <div className="relative h-12 w-12 mr-2">
              <div className="absolute inset-0 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">G</span>
              </div>
            </div>
            <div
              className={cn(
                "font-bold transition-colors",
                isScrolled ? "text-green-600 dark:text-green-500" : "text-white",
              )}
            >
              <span className="text-2xl">GolfGear</span>
              <span className="text-2xl font-light">Pro</span>
            </div>
          </Link>

          {/* Search bar */}
          <div ref={searchRef} className="hidden md:flex relative w-full max-w-md mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="pr-10 h-11 rounded-full border-2 border-green-400 focus-visible:ring-green-500"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={() => searchQuery.trim().length > 1 && setShowSearchResults(true)}
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-12 top-0 h-11 flex items-center justify-center text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear search</span>
                  </button>
                ) : null}
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-0 top-0 rounded-full h-11 w-11 bg-green-600 hover:bg-green-700"
                >
                  <Search className="h-5 w-5 text-white" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
            </form>

            {/* Search results dropdown */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                {searchResults.length > 0 ? (
                  <div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                          onClick={() => handleSearchResultClick(product.id)}
                        >
                          <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={
                                product.image && product.image.trim() !== ""
                                  ? product.image
                                  : "/placeholder.svg?height=100&width=100&query=golf+product"
                              }
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-3 flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                            <p className="text-xs text-gray-500">
                              {product.brand} • {product.category}
                            </p>
                          </div>
                          <div className="ml-3 flex-shrink-0">
                            <p className="text-sm font-medium text-green-700">
                              {formatIndianRupees(convertUSDtoINR(product.dealPrice || product.price))}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-gray-50 border-t border-gray-100">
                      <button
                        onClick={() => {
                          if (searchQuery.trim()) {
                            router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
                            setShowSearchResults(false)
                          }
                        }}
                        className="text-sm text-green-700 hover:text-green-800 font-medium w-full text-center"
                      >
                        View all results for "{searchQuery}"
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-500">No products found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-full h-11 w-11 transition-colors",
                  isScrolled
                    ? "text-green-600 hover:text-green-700 hover:bg-green-50"
                    : "text-white hover:text-white hover:bg-white/20",
                )}
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-500 text-xs text-white flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <ThemeToggle />
            <UserAccountNav />
          </div>

          {/* Mobile icons - properly spaced with theme toggle on the right */}
          <div className="flex items-center md:hidden">
            {/* Mobile search icon */}
            <Button
              variant="ghost"
              size="icon"
              className={cn("rounded-full h-10 w-10", isScrolled ? "text-green-600" : "text-white")}
              onClick={toggleMobileSearch}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart icon for mobile */}
            <Link href="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className={cn("rounded-full h-10 w-10", isScrolled ? "text-green-600" : "text-white")}
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-500 text-xs text-white flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* ThemeToggle at the far right */}
            <div className="ml-1">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar overlay */}
      {mobileSearchOpen && (
        <div
          id="mobile-search-container"
          className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50 p-3 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top"
        >
          <form onSubmit={handleMobileSearch} className="relative">
            <Input
              id="mobile-search-input"
              type="search"
              placeholder="Search products..."
              className="pr-10 rounded-full border-2 border-green-400 focus-visible:ring-green-500"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <div className="absolute right-0 top-0 h-full flex items-center pr-3 gap-2">
              {searchQuery && (
                <button type="button" onClick={clearSearch} className="text-gray-400 hover:text-gray-600">
                  <X className="h-4 w-4" />
                </button>
              )}
              <button type="submit" className="text-green-600 hover:text-green-700">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
          {showSearchResults && searchResults.length > 0 && (
            <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-[60vh] overflow-y-auto">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0"
                  onClick={() => {
                    handleSearchResultClick(product.id)
                    setMobileSearchOpen(false)
                  }}
                >
                  <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={
                        product.image && product.image.trim() !== ""
                          ? product.image
                          : "/placeholder.svg?height=100&width=100&query=golf+product"
                      }
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatIndianRupees(convertUSDtoINR(product.dealPrice || product.price))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Category navigation */}
      <div
        className={cn("hidden md:block border-t transition-colors", isScrolled ? "border-gray-200" : "border-white/20")}
      >
        <div className="container">
          <nav className="flex items-center justify-between">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className={cn(
                  "py-3 px-4 font-medium text-sm transition-colors relative group",
                  isScrolled
                    ? pathname === category.href
                      ? "text-green-700 dark:text-green-500"
                      : "text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500"
                    : "text-white hover:text-white",
                )}
              >
                {category.name}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 transition-transform group-hover:scale-x-100",
                    isScrolled ? "bg-green-600 dark:bg-green-500" : "bg-white",
                  )}
                ></span>
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "py-3 px-4 font-medium text-sm transition-colors flex items-center gap-1",
                    isScrolled
                      ? "text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500"
                      : "text-white hover:text-white",
                  )}
                >
                  More <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/deals" className="cursor-pointer">
                    Special Deals
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/new-arrivals" className="cursor-pointer">
                    New Arrivals
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/gift-cards" className="cursor-pointer">
                    Gift Cards
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>

      {/* Removed the fixed mobile cart button when on cart page */}
    </header>
  )
}
