"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Edit, MoreHorizontal, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import { Switch } from "@/components/ui/switch"

// Sample product data
const allProducts = [
  {
    id: 1,
    name: "TaylorMade Stealth Driver",
    price: 599.99,
    dealPrice: 499.99,
    category: "Clubs",
    image: "/golfer-swing.png",
    stock: 15,
    active: true,
  },
  {
    id: 2,
    name: "Titleist Pro V1 Golf Balls (Dozen)",
    price: 54.99,
    dealPrice: 49.99,
    category: "Balls",
    image: "/pristine-golf-ball-display.png",
    stock: 50,
    active: true,
  },
  {
    id: 3,
    name: "FootJoy Pro SL Golf Shoes",
    price: 169.99,
    dealPrice: 149.99,
    category: "Shoes",
    image: "/modern-golf-footwear.png",
    stock: 8,
    active: true,
  },
  {
    id: 4,
    name: "Callaway Rogue ST Max Irons",
    price: 899.99,
    dealPrice: 799.99,
    category: "Clubs",
    image: "/set-of-golf-irons.png",
    stock: 5,
    active: true,
  },
  {
    id: 5,
    name: "Nike Dri-FIT Golf Polo",
    price: 65.0,
    dealPrice: 55.0,
    category: "Apparels",
    image: "/classic-golf-polo.png",
    stock: 0,
    active: false,
  },
  {
    id: 6,
    name: "Ping Hoofer Lite Stand Bag",
    price: 249.99,
    dealPrice: 229.99,
    category: "Bags",
    image: "/placeholder.svg?height=300&width=300&query=golf+bag",
    stock: 12,
    active: true,
  },
  {
    id: 7,
    name: "Golf Pride MCC Plus4 Grip",
    price: 11.99,
    dealPrice: 9.99,
    category: "Grips",
    image: "/placeholder.svg?height=300&width=300&query=golf+grip",
    stock: 0,
    active: false,
  },
  {
    id: 8,
    name: "Clicgear 4.0 Push Cart",
    price: 259.99,
    dealPrice: 239.99,
    category: "Trolleys",
    image: "/placeholder.svg?height=300&width=300&query=golf+push+cart",
    stock: 3,
    active: true,
  },
]

interface AdminProductListProps {
  filter?: "all" | "out-of-stock" | "low-stock"
}

export default function AdminProductList({ filter = "all" }: AdminProductListProps) {
  const [products, setProducts] = useState(allProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const toggleProductStatus = (id: number) => {
    setProducts(products.map((product) => (product.id === id ? { ...product, active: !product.active } : product)))
  }

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

  // Filter products based on filter prop and search query
  const filteredProducts = products.filter((product) => {
    // Apply filter
    if (filter === "out-of-stock" && product.stock > 0) return false
    if (filter === "low-stock" && (product.stock === 0 || product.stock >= 10)) return false

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query)
    }

    return true
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="text-sm text-muted-foreground">{filteredProducts.length} products</div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
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
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">
                    ${product.dealPrice.toFixed(2)}
                    {product.dealPrice < product.price && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`${product.stock === 0 ? "text-red-500" : product.stock < 10 ? "text-amber-500" : ""}`}
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch checked={product.active} onCheckedChange={() => toggleProductStatus(product.id)} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/admin/products/edit/${product.id}`}>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          className="text-red-500 focus:text-red-500"
                          onClick={() => confirmDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product from your store.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteProduct} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
