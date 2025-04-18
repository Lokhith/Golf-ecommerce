"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Download } from "lucide-react"

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
  },
  {
    id: "ORD-7651",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    date: "2023-04-16",
    total: 149.99,
    status: "shipped",
    items: 1,
  },
  {
    id: "ORD-7650",
    customer: "Michael Brown",
    email: "mbrown@example.com",
    date: "2023-04-16",
    total: 239.99,
    status: "processing",
    items: 3,
  },
  {
    id: "ORD-7649",
    customer: "Emily Davis",
    email: "emily.davis@example.com",
    date: "2023-04-15",
    total: 799.99,
    status: "pending",
    items: 4,
  },
  {
    id: "ORD-7648",
    customer: "Robert Wilson",
    email: "rwilson@example.com",
    date: "2023-04-15",
    total: 55.0,
    status: "delivered",
    items: 1,
  },
  {
    id: "ORD-7647",
    customer: "Jennifer Taylor",
    email: "jtaylor@example.com",
    date: "2023-04-14",
    total: 329.99,
    status: "shipped",
    items: 2,
  },
  {
    id: "ORD-7646",
    customer: "David Miller",
    email: "dmiller@example.com",
    date: "2023-04-14",
    total: 124.99,
    status: "delivered",
    items: 1,
  },
  {
    id: "ORD-7645",
    customer: "Lisa Anderson",
    email: "lisa.a@example.com",
    date: "2023-04-13",
    total: 459.99,
    status: "cancelled",
    items: 3,
  },
  {
    id: "ORD-7644",
    customer: "James Thomas",
    email: "jthomas@example.com",
    date: "2023-04-13",
    total: 89.99,
    status: "delivered",
    items: 1,
  },
  {
    id: "ORD-7643",
    customer: "Patricia White",
    email: "pwhite@example.com",
    date: "2023-04-12",
    total: 199.99,
    status: "refunded",
    items: 2,
  },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <Download className="h-4 w-4 mr-2" />
          Export Orders
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>View and manage customer orders, update order status, or process refunds.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search by order ID, customer name, or email..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div className="w-[180px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
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
              <div className="w-[180px]">
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Date" />
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
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} className="group hover:bg-gray-50">
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customer}</div>
                          <div className="text-sm text-muted-foreground">{order.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell className="text-right font-medium">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : order.status === "shipped"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                : order.status === "processing"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                  : order.status === "pending"
                                    ? "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                    : order.status === "cancelled"
                                      ? "bg-red-100 text-red-800 hover:bg-red-100"
                                      : "bg-purple-100 text-purple-800 hover:bg-purple-100"
                          }
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/orders/${order.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuItem>Send Invoice</DropdownMenuItem>
                            {order.status !== "refunded" && order.status !== "cancelled" && (
                              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                Process Refund
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
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
