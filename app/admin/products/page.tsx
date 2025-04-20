"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { PlusCircle, Search, Edit, Trash2, MoreHorizontal, Download, Filter, ArrowUpDown, Eye } from "lucide-react"
import { productData } from "@/lib/product-data"
import { Badge } from "@/components/ui/badge"
import { formatIndianRupees, convertUSDtoINR } from "@/lib/utils"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const filterParam = searchParams.get("filter")
  const sortParam = searchParams.get("sort")

  const [products, setProducts] = useState(productData)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [brandFilter, setBrandFilter] = useState<string>("all")
  const [stockFilter, setStockFilter] = useState<string>("all")
  const [sortOption, setSortOption] = useState<string>(sortParam || "newest")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Get unique categories and brands for filters
  const categories = Array.from(new Set(productData.map((product) => product.category)))
  const brands = Array.from(new Set(productData.map((product) => product.brand)))

  // Apply filters and sorting
  useEffect(() => {
    let filteredProducts = [...productData]

    // Apply URL filter parameter if present
    if (filterParam === "out-of-stock") {
      filteredProducts = filteredProducts.filter((product) => product.stock === 0)
      setStockFilter("out-of-stock")
    } else if (filterParam === "low-stock") {
      filteredProducts = filteredProducts.filter((product) => product.stock > 0 && product.stock < 10)
      setStockFilter("low-stock")
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.toLowerCase() === categoryFilter.toLowerCase(),
      )
    }

    // Apply brand filter
    if (brandFilter !== "all") {
      filteredProducts = filteredProducts.filter((product) => product.brand.toLowerCase() === brandFilter.toLowerCase())
    }

    // Apply stock filter (if not already set by URL param)
    if (stockFilter !== "all" && !filterParam) {
      if (stockFilter === "out-of-stock") {
        filteredProducts = filteredProducts.filter((product) => product.stock === 0)
      } else if (stockFilter === "low-stock") {
        filteredProducts = filteredProducts.filter((product) => product.stock > 0 && product.stock < 10)
      } else if (stockFilter === "in-stock") {
        filteredProducts = filteredProducts.filter((product) => product.stock >= 10)
      }
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        filteredProducts.sort((a, b) => (a.dealPrice || a.price) - (b.dealPrice || b.price))
        break
      case "price-high":
        filteredProducts.sort((a, b) => (b.dealPrice || b.price) - (a.dealPrice || a.price))
        break
      case "name-asc":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "stock-low":
        filteredProducts.sort((a, b) => (a.stock || 0) - (b.stock || 0))
        break
      case "stock-high":
        filteredProducts.sort((a, b) => (b.stock || 0) - (a.stock || 0))
        break
      case "best-selling":
        // In a real app, you would sort by sales data
        // Here we'll just use a random order for demonstration
        filteredProducts.sort(() => Math.random() - 0.5)
        break
      case "newest":
      default:
        // Assuming the array is already sorted by newest first
        break
    }

    setProducts(filteredProducts)
  }, [searchQuery, categoryFilter, brandFilter, stockFilter, sortOption, filterParam, sortParam])

  const confirmDelete = (id: number) => {
    setProductToDelete(id)
    setDeleteDialogOpen(true)
  }

  const deleteProduct = () => {
    if (productToDelete) {
      setProducts(products.filter((product) => product.id !== productToDelete))
      setDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  const toggleProductStatus = (id: number) => {
    setProducts(products.map((product) => (product.id === id ? { ...product, active: !product.active } : product)))
  }

  const exportProducts = () => {
    // In a real app, this would generate a CSV or Excel file
    alert("Products exported successfully!")
  }

  // Mobile product card component
  const MobileProductCard = ({ product }: { product: any }) => (
    <div className="border rounded-lg overflow-hidden mb-4 bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center p-4">
        <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm mb-1 dark:text-gray-300">{product.name}</h3>
          <div className="flex flex-wrap gap-2 mb-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">{product.category}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{product.brand}</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-green-700 dark:text-green-500">
                {formatIndianRupees(convertUSDtoINR(product.dealPrice || product.price))}
              </span>
              {product.dealPrice && (
                <span className="text-xs text-muted-foreground line-through ml-2 dark:text-gray-500">
                  {formatIndianRupees(convertUSDtoINR(product.price))}
                </span>
              )}
            </div>
            <div>
              {product.stock === 0 ? (
                <Badge
                  variant="outline"
                  className="border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400"
                >
                  Out of stock
                </Badge>
              ) : product.stock < 10 ? (
                <Badge
                  variant="outline"
                  className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-900/20 dark:text-amber-400"
                >
                  Low: {product.stock}
                </Badge>
              ) : (
                <span className="text-sm dark:text-gray-300">{product.stock} in stock</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t dark:border-gray-700 p-3 flex justify-between">
        <div className="flex items-center">
          <span className="text-sm mr-2 dark:text-gray-400">Active</span>
          <Switch checked={product.active !== false} onCheckedChange={() => toggleProductStatus(product.id)} />
        </div>
        <div className="flex gap-1">
          <Link href={`/product/${product.id}`} target="_blank">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </Button>
          </Link>
          <Link href={`/admin/products/edit/${product.id}`}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Edit className="h-4 w-4 text-blue-500 dark:text-blue-400" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-500"
            onClick={() => confirmDelete(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
              <DropdownMenuItem asChild className="dark:text-gray-300 dark:focus:bg-gray-700">
                <Link href={`/product/${product.id}`} target="_blank">
                  View Product
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="dark:text-gray-300 dark:focus:bg-gray-700">
                <Link href={`/admin/products/edit/${product.id}`}>Edit Product</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400 dark:focus:bg-gray-700"
                onClick={() => confirmDelete(product.id)}
              >
                Delete Product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Products</h1>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Button variant="outline" onClick={exportProducts} className="flex-1 md:flex-auto">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link href="/admin/products/add" className="flex-1 md:flex-auto">
            <Button className="bg-green-600 hover:bg-green-700 w-full">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="dark:text-gray-200">Product Management</CardTitle>
          <CardDescription className="dark:text-gray-400">
            Manage your products, edit details, update inventory, or remove products.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 dark:bg-gray-800 dark:border-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  className="md:w-auto w-full"
                  onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <div className="flex items-center">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      <span>Sort</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Name: A-Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z-A</SelectItem>
                    <SelectItem value="stock-low">Stock: Low to High</SelectItem>
                    <SelectItem value="stock-high">Stock: High to Low</SelectItem>
                    <SelectItem value="best-selling">Best Selling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isFiltersVisible && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <label className="text-sm font-medium mb-1 block dark:text-gray-300">Category</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block dark:text-gray-300">Brand</label>
                  <Select value={brandFilter} onValueChange={setBrandFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Brands" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Brands</SelectItem>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand.toLowerCase()}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block dark:text-gray-300">Stock Status</label>
                  <Select value={stockFilter} onValueChange={setStockFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Stock Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stock Status</SelectItem>
                      <SelectItem value="in-stock">In Stock (10+)</SelectItem>
                      <SelectItem value="low-stock">Low Stock (1-9)</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground dark:text-gray-400">
                {products.length} {products.length === 1 ? "product" : "products"}
              </div>
              {(searchQuery || categoryFilter !== "all" || brandFilter !== "all" || stockFilter !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("")
                    setCategoryFilter("all")
                    setBrandFilter("all")
                    setStockFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Mobile view - card layout */}
          {isMobile ? (
            <div className="md:hidden">
              {products.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No products found.</p>
                </div>
              ) : (
                products.map((product) => <MobileProductCard key={product.id} product={product} />)
              )}
            </div>
          ) : (
            /* Desktop view - table layout */
            <div className="rounded-md border dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="dark:border-gray-700">
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-center">Stock</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No products found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      products.map((product) => (
                        <TableRow
                          key={product.id}
                          className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 dark:border-gray-700"
                        >
                          <TableCell>
                            <div className="relative h-10 w-10 rounded-md overflow-hidden">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium dark:text-gray-300">{product.name}</TableCell>
                          <TableCell className="dark:text-gray-400">{product.category}</TableCell>
                          <TableCell className="dark:text-gray-400">{product.brand}</TableCell>
                          <TableCell className="text-right dark:text-gray-300">
                            {formatIndianRupees(convertUSDtoINR(product.dealPrice || product.price))}
                            {product.dealPrice && (
                              <span className="text-sm text-muted-foreground line-through ml-2 dark:text-gray-500">
                                {formatIndianRupees(convertUSDtoINR(product.price))}
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <span
                              className={`${
                                product.stock === 0
                                  ? "text-red-500 dark:text-red-400"
                                  : product.stock < 10
                                    ? "text-amber-500 dark:text-amber-400"
                                    : "dark:text-gray-300"
                              }`}
                            >
                              {product.stock === 0 ? (
                                <Badge
                                  variant="outline"
                                  className="border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400"
                                >
                                  Out of stock
                                </Badge>
                              ) : product.stock < 10 ? (
                                <Badge
                                  variant="outline"
                                  className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-900/20 dark:text-amber-400"
                                >
                                  Low: {product.stock}
                                </Badge>
                              ) : (
                                product.stock
                              )}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch
                              checked={product.active !== false}
                              onCheckedChange={() => toggleProductStatus(product.id)}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end">
                              <Link href={`/product/${product.id}`} target="_blank">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                  <span className="sr-only">View</span>
                                </Button>
                              </Link>
                              <Link href={`/admin/products/edit/${product.id}`}>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Edit className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                              </Link>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => confirmDelete(product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">More options</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                                  <DropdownMenuItem asChild className="dark:text-gray-300 dark:focus:bg-gray-700">
                                    <Link href={`/product/${product.id}`} target="_blank">
                                      View Product
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild className="dark:text-gray-300 dark:focus:bg-gray-700">
                                    <Link href={`/admin/products/edit/${product.id}`}>Edit Product</Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400 dark:focus:bg-gray-700"
                                    onClick={() => confirmDelete(product.id)}
                                  >
                                    Delete Product
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="dark:bg-gray-800 dark:border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="dark:text-gray-200">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="dark:text-gray-400">
              This action cannot be undone. This will permanently delete the product from your store.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteProduct}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
