"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, PlusCircle, Edit, Trash2, Copy, Tag, Calendar, Percent } from "lucide-react"
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

// Sample coupons data
const coupons = [
  {
    id: 1,
    code: "WELCOME20",
    discount: 20,
    discountType: "percentage",
    description: "20% off for new customers",
    startDate: "2023-04-01",
    endDate: "2023-12-31",
    usageLimit: 1000,
    usageCount: 342,
    minOrderAmount: 50,
    active: true,
    applicableTo: "all",
  },
  {
    id: 2,
    code: "SUMMER10",
    discount: 10,
    discountType: "percentage",
    description: "Summer sale discount",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    usageLimit: 500,
    usageCount: 128,
    minOrderAmount: 0,
    active: true,
    applicableTo: "category",
    categoryName: "Apparels",
  },
  {
    id: 3,
    code: "FREESHIP",
    discount: 0,
    discountType: "free_shipping",
    description: "Free shipping on all orders",
    startDate: "2023-05-15",
    endDate: "2023-07-15",
    usageLimit: 200,
    usageCount: 87,
    minOrderAmount: 75,
    active: true,
    applicableTo: "all",
  },
  {
    id: 4,
    code: "FLAT50",
    discount: 50,
    discountType: "fixed",
    description: "$50 off on orders above $200",
    startDate: "2023-04-10",
    endDate: "2023-05-10",
    usageLimit: 100,
    usageCount: 100,
    minOrderAmount: 200,
    active: false,
    applicableTo: "all",
  },
  {
    id: 5,
    code: "GOLF15",
    discount: 15,
    discountType: "percentage",
    description: "15% off on golf clubs",
    startDate: "2023-03-01",
    endDate: "2023-12-31",
    usageLimit: 300,
    usageCount: 156,
    minOrderAmount: 0,
    active: true,
    applicableTo: "category",
    categoryName: "Clubs",
  },
  {
    id: 6,
    code: "BALLS5",
    discount: 5,
    discountType: "percentage",
    description: "5% off on golf balls",
    startDate: "2023-04-01",
    endDate: "2023-10-31",
    usageLimit: 500,
    usageCount: 89,
    minOrderAmount: 0,
    active: true,
    applicableTo: "category",
    categoryName: "Balls",
  },
  {
    id: 7,
    code: "SHOES25",
    discount: 25,
    discountType: "percentage",
    description: "25% off on golf shoes",
    startDate: "2023-05-01",
    endDate: "2023-06-30",
    usageLimit: 150,
    usageCount: 42,
    minOrderAmount: 0,
    active: true,
    applicableTo: "category",
    categoryName: "Shoes",
  },
]

export default function CouponsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [couponToDelete, setCouponToDelete] = useState<number | null>(null)

  // Filter coupons based on search query and filters
  const filteredCoupons = coupons.filter((coupon) => {
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!coupon.code.toLowerCase().includes(query) && !coupon.description.toLowerCase().includes(query)) {
        return false
      }
    }

    // Apply status filter
    if (statusFilter === "active" && !coupon.active) {
      return false
    }
    if (statusFilter === "inactive" && coupon.active) {
      return false
    }
    if (statusFilter === "expired") {
      const now = new Date()
      const endDate = new Date(coupon.endDate)
      if (endDate >= now) {
        return false
      }
    }

    return true
  })

  const confirmDelete = (id: number) => {
    setCouponToDelete(id)
    setDeleteDialogOpen(true)
  }

  const deleteCoupon = () => {
    if (couponToDelete) {
      // In a real app, this would delete the coupon from the database
      alert(`Coupon with ID ${couponToDelete} deleted`)
      setDeleteDialogOpen(false)
      setCouponToDelete(null)
    }
  }

  const toggleCouponStatus = (id: number) => {
    // In a real app, this would update the coupon status in the database
    alert(`Coupon with ID ${id} status toggled`)
  }

  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code)
    alert(`Coupon code ${code} copied to clipboard`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Coupons</h1>
        <Link href="/admin/coupons/add">
          <Button className="bg-green-600 hover:bg-green-700">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Coupon
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="dark:text-gray-200">Coupon Management</CardTitle>
          <CardDescription className="dark:text-gray-400">
            Create and manage discount coupons for your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search coupons..."
                className="pl-8 dark:bg-gray-800 dark:border-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                className={statusFilter === "all" ? "bg-green-600 hover:bg-green-700" : ""}
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "active" ? "default" : "outline"}
                className={statusFilter === "active" ? "bg-green-600 hover:bg-green-700" : ""}
                onClick={() => setStatusFilter("active")}
              >
                Active
              </Button>
              <Button
                variant={statusFilter === "inactive" ? "default" : "outline"}
                className={statusFilter === "inactive" ? "bg-green-600 hover:bg-green-700" : ""}
                onClick={() => setStatusFilter("inactive")}
              >
                Inactive
              </Button>
              <Button
                variant={statusFilter === "expired" ? "default" : "outline"}
                className={statusFilter === "expired" ? "bg-green-600 hover:bg-green-700" : ""}
                onClick={() => setStatusFilter("expired")}
              >
                Expired
              </Button>
            </div>
          </div>

          <div className="rounded-md border dark:border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="dark:border-gray-700">
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Validity</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCoupons.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No coupons found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCoupons.map((coupon) => {
                    const now = new Date()
                    const endDate = new Date(coupon.endDate)
                    const isExpired = endDate < now
                    const isLimitReached = coupon.usageCount >= coupon.usageLimit

                    return (
                      <TableRow
                        key={coupon.id}
                        className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 dark:border-gray-700"
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/30">
                              {coupon.code}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => copyCouponCode(coupon.code)}
                            >
                              <Copy className="h-3 w-3" />
                              <span className="sr-only">Copy code</span>
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {coupon.discountType === "percentage" ? (
                              <>
                                <Percent className="h-4 w-4 text-green-600 dark:text-green-400" />
                                <span className="dark:text-gray-300">{coupon.discount}% off</span>
                              </>
                            ) : coupon.discountType === "fixed" ? (
                              <>
                                <Tag className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                <span className="dark:text-gray-300">
                                  ₹{Math.round(coupon.discount * 83).toLocaleString("en-IN")} off
                                </span>
                              </>
                            ) : (
                              <>
                                <Tag className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                <span className="dark:text-gray-300">Free shipping</span>
                              </>
                            )}
                          </div>
                          {coupon.minOrderAmount > 0 && (
                            <div className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
                              Min. order: ₹{Math.round(coupon.minOrderAmount * 83).toLocaleString("en-IN")}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate dark:text-gray-300">
                          <span title={coupon.description}>{coupon.description}</span>
                          {coupon.applicableTo !== "all" && (
                            <div className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
                              Category: {coupon.categoryName}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="dark:text-gray-300">
                              {new Date(coupon.startDate).toLocaleDateString()} -{" "}
                              {new Date(coupon.endDate).toLocaleDateString()}
                            </span>
                          </div>
                          {isExpired && <div className="text-xs text-red-500 dark:text-red-400 mt-1">Expired</div>}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 dark:text-gray-300">
                            {coupon.usageCount} / {coupon.usageLimit}
                          </div>
                          {isLimitReached && (
                            <div className="text-xs text-amber-500 dark:text-amber-400 mt-1">Limit reached</div>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            {isExpired ? (
                              <Badge
                                variant="outline"
                                className="border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400"
                              >
                                Expired
                              </Badge>
                            ) : isLimitReached ? (
                              <Badge
                                variant="outline"
                                className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-900/20 dark:text-amber-400"
                              >
                                Limit Reached
                              </Badge>
                            ) : (
                              <Switch checked={coupon.active} onCheckedChange={() => toggleCouponStatus(coupon.id)} />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <Link href={`/admin/coupons/edit/${coupon.id}`}>
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
                              onClick={() => confirmDelete(coupon.id)}
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
                                <DropdownMenuItem
                                  className="dark:text-gray-300 dark:focus:bg-gray-700"
                                  onClick={() => copyCouponCode(coupon.code)}
                                >
                                  <Copy className="h-4 w-4 mr-2" />
                                  Copy Code
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="dark:text-gray-300 dark:focus:bg-gray-700">
                                  <Link href={`/admin/coupons/edit/${coupon.id}`}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Coupon
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400 dark:focus:bg-gray-700"
                                  onClick={() => confirmDelete(coupon.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Coupon
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="dark:bg-gray-800 dark:border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="dark:text-gray-200">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="dark:text-gray-400">
              This action cannot be undone. This will permanently delete the coupon.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteCoupon}
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
