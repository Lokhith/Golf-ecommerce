"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  MoreHorizontal,
  Download,
  Filter,
  Calendar,
  ChevronDown,
  FileText,
  Eye,
  Truck,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Sample orders data
const orders = [
  {
    id: "ORD-7652",
    customer: "John Smith",
    email: "john.smith@example.com",
    date: "2023-04-17",
    total: 499.99,
    status: "delivered",
    items: 2,
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
  },
  {
    id: "ORD-7651",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    date: "2023-04-16",
    total: 149.99,
    status: "shipped",
    items: 1,
    paymentMethod: "PayPal",
    paymentStatus: "paid",
  },
  {
    id: "ORD-7650",
    customer: "Michael Brown",
    email: "mbrown@example.com",
    date: "2023-04-16",
    total: 239.99,
    status: "processing",
    items: 3,
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
  },
  {
    id: "ORD-7649",
    customer: "Emily Davis",
    email: "emily.davis@example.com",
    date: "2023-04-15",
    total: 799.99,
    status: "pending",
    items: 4,
    paymentMethod: "Credit Card",
    paymentStatus: "pending",
  },
  {
    id: "ORD-7648",
    customer: "Robert Wilson",
    email: "rwilson@example.com",
    date: "2023-04-15",
    total: 55.0,
    status: "delivered",
    items: 1,
    paymentMethod: "PayPal",
    paymentStatus: "paid",
  },
  {
    id: "ORD-7647",
    customer: "Jennifer Taylor",
    email: "jtaylor@example.com",
    date: "2023-04-14",
    total: 329.99,
    status: "shipped",
    items: 2,
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
  },
  {
    id: "ORD-7646",
    customer: "David Miller",
    email: "dmiller@example.com",
    date: "2023-04-14",
    total: 124.99,
    status: "delivered",
    items: 1,
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
  },
  {
    id: "ORD-7645",
    customer: "Lisa Anderson",
    email: "lisa.a@example.com",
    date: "2023-04-13",
    total: 459.99,
    status: "cancelled",
    items: 3,
    paymentMethod: "PayPal",
    paymentStatus: "refunded",
  },
  {
    id: "ORD-7644",
    customer: "James Thomas",
    email: "jthomas@example.com",
    date: "2023-04-13",
    total: 89.99,
    status: "delivered",
    items: 1,
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
  },
  {
    id: "ORD-7643",
    customer: "Patricia White",
    email: "pwhite@example.com",
    date: "2023-04-12",
    total: 199.99,
    status: "refunded",
    items: 2,
    paymentMethod: "Credit Card",
    paymentStatus: "refunded",
  },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  // Filter orders based on search query and filters
  const filteredOrders = orders.filter((order) => {
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (
        !order.id.toLowerCase().includes(query) &&
        !order.customer.toLowerCase().includes(query) &&
        !order.email.toLowerCase().includes(query)
      ) {
        return false
      }
    }

    // Apply status filter
    if (statusFilter !== "all" && order.status !== statusFilter) {
      return false
    }

    // Apply payment filter
    if (paymentFilter !== "all" && order.paymentStatus !== paymentFilter) {
      return false
    }

    // Apply date filter (simplified for demo)
    if (dateFilter === "today") {
      const today = new Date().toISOString().split("T")[0]
      if (order.date !== today) {
        return false
      }
    } else if (dateFilter === "week") {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      const orderDate = new Date(order.date)
      if (orderDate < weekAgo) {
        return false
      }
    } else if (dateFilter === "month") {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      const orderDate = new Date(order.date)
      if (orderDate < monthAgo) {
        return false
      }
    }

    return true
  })

  const toggleOrderExpansion = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null)
    } else {
      setExpandedOrder(orderId)
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // In a real app, this would update the order status in the database
    alert(`Order ${orderId} status updated to ${newStatus}`)
  }

  const downloadInvoice = (orderId: string) => {
    // In a real app, this would generate and download an invoice
    alert(`Invoice for order ${orderId} downloaded`)
  }

  const exportOrders = () => {
    // In a real app, this would export orders to CSV or Excel
    alert("Orders exported successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <Button className="bg-green-600 hover:bg-green-700" onClick={exportOrders}>
          <Download className="h-4 w-4 mr-2" />
          Export Orders
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="dark:text-gray-200">Order Management</CardTitle>
          <CardDescription className="dark:text-gray-400">
            View and manage customer orders, update order status, or process refunds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search by order ID, customer name, or email..."
                  className="pl-8 dark:bg-gray-800 dark:border-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="md:w-auto w-full"
                  onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[180px] justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Date Range</span>
                      <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <DatePickerWithRange />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {isFiltersVisible && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <label className="text-sm font-medium mb-1 block dark:text-gray-300">Order Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block dark:text-gray-300">Payment Status</label>
                  <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Payment Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Payment Statuses</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block dark:text-gray-300">Date</label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">Last 7 Days</SelectItem>
                      <SelectItem value="month">Last 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground dark:text-gray-400">
                {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"}
              </div>
              {(searchQuery || statusFilter !== "all" || paymentFilter !== "all" || dateFilter !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("")
                    setStatusFilter("all")
                    setPaymentFilter("all")
                    setDateFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          <div className="rounded-md border dark:border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="dark:border-gray-700">
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <>
                      <TableRow
                        key={order.id}
                        className={`group hover:bg-gray-50 dark:hover:bg-gray-800/50 dark:border-gray-700 ${
                          expandedOrder === order.id ? "bg-gray-50 dark:bg-gray-800/50" : ""
                        }`}
                        onClick={() => toggleOrderExpansion(order.id)}
                      >
                        <TableCell className="font-medium dark:text-gray-300 cursor-pointer">{order.id}</TableCell>
                        <TableCell className="cursor-pointer">
                          <div>
                            <div className="font-medium dark:text-gray-300">{order.customer}</div>
                            <div className="text-sm text-muted-foreground dark:text-gray-400">{order.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="dark:text-gray-400 cursor-pointer">
                          {new Date(order.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="cursor-pointer">{order.items}</TableCell>
                        <TableCell className="text-right font-medium dark:text-gray-300">
                          ₹{Math.round(order.total * 83).toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="cursor-pointer">
                          <Badge
                            className={
                              order.status === "delivered"
                                ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/30"
                                : order.status === "shipped"
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/30"
                                  : order.status === "processing"
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
                                    : order.status === "pending"
                                      ? "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-800"
                                      : order.status === "cancelled"
                                        ? "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/30"
                                        : "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/30"
                            }
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="cursor-pointer">
                          <Badge
                            variant="outline"
                            className={
                              order.paymentStatus === "paid"
                                ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400"
                                : order.paymentStatus === "pending"
                                  ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-900/20 dark:text-amber-400"
                                  : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400"
                            }
                          >
                            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                                <DropdownMenuItem
                                  className="dark:text-gray-300 dark:focus:bg-gray-700"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleOrderExpansion(order.id)
                                  }}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="dark:text-gray-300 dark:focus:bg-gray-700"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    downloadInvoice(order.id)
                                  }}
                                >
                                  <FileText className="h-4 w-4 mr-2" />
                                  Download Invoice
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="dark:text-gray-300 dark:focus:bg-gray-700"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    updateOrderStatus(order.id, "shipped")
                                  }}
                                >
                                  <Truck className="h-4 w-4 mr-2" />
                                  Update Status
                                </DropdownMenuItem>
                                {order.status !== "refunded" && order.status !== "cancelled" && (
                                  <DropdownMenuItem
                                    className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400 dark:focus:bg-gray-700"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      updateOrderStatus(order.id, "cancelled")
                                    }}
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Cancel Order
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedOrder === order.id && (
                        <TableRow className="dark:border-gray-700">
                          <TableCell colSpan={8} className="bg-gray-50 dark:bg-gray-800/30 p-4">
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium mb-1 dark:text-gray-300">Order Details</h4>
                                  <div className="text-sm space-y-1 dark:text-gray-400">
                                    <p>
                                      <span className="font-medium dark:text-gray-300">Order ID:</span> {order.id}
                                    </p>
                                    <p>
                                      <span className="font-medium dark:text-gray-300">Date:</span>{" "}
                                      {new Date(order.date).toLocaleDateString()}
                                    </p>
                                    <p>
                                      <span className="font-medium dark:text-gray-300">Items:</span> {order.items}
                                    </p>
                                    <p>
                                      <span className="font-medium dark:text-gray-300">Total:</span> $
                                      {order.total.toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium mb-1 dark:text-gray-300">Customer Information</h4>
                                  <div className="text-sm space-y-1 dark:text-gray-400">
                                    <p>
                                      <span className="font-medium dark:text-gray-300">Name:</span> {order.customer}
                                    </p>
                                    <p>
                                      <span className="font-medium dark:text-gray-300">Email:</span> {order.email}
                                    </p>
                                    <p>
                                      <span className="font-medium dark:text-gray-300">Payment Method:</span>{" "}
                                      {order.paymentMethod}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium mb-1 dark:text-gray-300">Status</h4>
                                  <div className="text-sm space-y-3 dark:text-gray-400">
                                    <div>
                                      <p className="mb-1">
                                        <span className="font-medium dark:text-gray-300">Order Status:</span>
                                      </p>
                                      <Select
                                        defaultValue={order.status}
                                        onValueChange={(value) => updateOrderStatus(order.id, value)}
                                      >
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="pending">Pending</SelectItem>
                                          <SelectItem value="processing">Processing</SelectItem>
                                          <SelectItem value="shipped">Shipped</SelectItem>
                                          <SelectItem value="delivered">Delivered</SelectItem>
                                          <SelectItem value="cancelled">Cancelled</SelectItem>
                                          <SelectItem value="refunded">Refunded</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button size="sm" className="w-full" onClick={() => downloadInvoice(order.id)}>
                                        <FileText className="h-4 w-4 mr-2" />
                                        Invoice
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => toggleOrderExpansion(order.id)}
                                      >
                                        Close
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-2 dark:text-gray-300">Order Timeline</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-green-400" />
                                    <span className="font-medium dark:text-gray-300">Order Placed</span>
                                    <span className="text-muted-foreground dark:text-gray-400">
                                      - {new Date(order.date).toLocaleDateString()}
                                    </span>
                                  </div>
                                  {order.status !== "pending" && (
                                    <div className="flex items-center gap-2 text-sm">
                                      <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-green-400" />
                                      <span className="font-medium dark:text-gray-300">Processing</span>
                                      <span className="text-muted-foreground dark:text-gray-400">
                                        - {new Date(new Date(order.date).getTime() + 86400000).toLocaleDateString()}
                                      </span>
                                    </div>
                                  )}
                                  {(order.status === "shipped" || order.status === "delivered") && (
                                    <div className="flex items-center gap-2 text-sm">
                                      <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-green-400" />
                                      <span className="font-medium dark:text-gray-300">Shipped</span>
                                      <span className="text-muted-foreground dark:text-gray-400">
                                        - {new Date(new Date(order.date).getTime() + 172800000).toLocaleDateString()}
                                      </span>
                                    </div>
                                  )}
                                  {order.status === "delivered" && (
                                    <div className="flex items-center gap-2 text-sm">
                                      <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-green-400" />
                                      <span className="font-medium dark:text-gray-300">Delivered</span>
                                      <span className="text-muted-foreground dark:text-gray-400">
                                        - {new Date(new Date(order.date).getTime() + 432000000).toLocaleDateString()}
                                      </span>
                                    </div>
                                  )}
                                  {order.status === "cancelled" && (
                                    <div className="flex items-center gap-2 text-sm">
                                      <XCircle className="h-4 w-4 text-red-500 dark:text-red-400" />
                                      <span className="font-medium dark:text-gray-300">Cancelled</span>
                                      <span className="text-muted-foreground dark:text-gray-400">
                                        - {new Date(new Date(order.date).getTime() + 86400000).toLocaleDateString()}
                                      </span>
                                    </div>
                                  )}
                                  {order.status === "refunded" && (
                                    <div className="flex items-center gap-2 text-sm">
                                      <XCircle className="h-4 w-4 text-red-500 dark:text-red-400" />
                                      <span className="font-medium dark:text-gray-300">Refunded</span>
                                      <span className="text-muted-foreground dark:text-gray-400">
                                        - {new Date(new Date(order.date).getTime() + 172800000).toLocaleDateString()}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground dark:text-gray-400">
          Showing <strong>{filteredOrders.length}</strong> of <strong>{orders.length}</strong> orders
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
