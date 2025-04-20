"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  MoreHorizontal,
  Download,
  Filter,
  Mail,
  ShoppingBag,
  Calendar,
  DollarSign,
  UserCog,
  Eye,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample customers data
const customers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    totalOrders: 8,
    totalSpent: 1249.97,
    lastOrderDate: "2023-04-17",
    status: "active",
    registrationDate: "2022-06-12",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    totalOrders: 5,
    totalSpent: 789.95,
    lastOrderDate: "2023-04-16",
    status: "active",
    registrationDate: "2022-08-23",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "mbrown@example.com",
    totalOrders: 12,
    totalSpent: 2459.88,
    lastOrderDate: "2023-04-16",
    status: "active",
    registrationDate: "2021-11-05",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    totalOrders: 3,
    totalSpent: 1099.97,
    lastOrderDate: "2023-04-15",
    status: "active",
    registrationDate: "2023-01-18",
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "rwilson@example.com",
    totalOrders: 1,
    totalSpent: 55.0,
    lastOrderDate: "2023-04-15",
    status: "inactive",
    registrationDate: "2023-02-27",
  },
  {
    id: 6,
    name: "Jennifer Taylor",
    email: "jtaylor@example.com",
    totalOrders: 7,
    totalSpent: 1429.93,
    lastOrderDate: "2023-04-14",
    status: "active",
    registrationDate: "2022-05-14",
  },
  {
    id: 7,
    name: "David Miller",
    email: "dmiller@example.com",
    totalOrders: 4,
    totalSpent: 624.96,
    lastOrderDate: "2023-04-14",
    status: "active",
    registrationDate: "2022-09-30",
  },
  {
    id: 8,
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    totalOrders: 9,
    totalSpent: 1859.91,
    lastOrderDate: "2023-04-13",
    status: "inactive",
    registrationDate: "2022-03-08",
  },
  {
    id: 9,
    name: "James Thomas",
    email: "jthomas@example.com",
    totalOrders: 2,
    totalSpent: 179.98,
    lastOrderDate: "2023-04-13",
    status: "active",
    registrationDate: "2023-03-15",
  },
  {
    id: 10,
    name: "Patricia White",
    email: "pwhite@example.com",
    totalOrders: 6,
    totalSpent: 899.94,
    lastOrderDate: "2023-04-12",
    status: "active",
    registrationDate: "2022-07-19",
  },
]

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortOption, setSortOption] = useState("recent")
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)
  const [expandedCustomer, setExpandedCustomer] = useState<number | null>(null)

  // Filter customers based on search query and filters
  const filteredCustomers = customers
    .filter((customer) => {
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (!customer.name.toLowerCase().includes(query) && !customer.email.toLowerCase().includes(query)) {
          return false
        }
      }

      // Apply status filter
      if (statusFilter !== "all" && customer.status !== statusFilter) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "orders-high":
          return b.totalOrders - a.totalOrders
        case "orders-low":
          return a.totalOrders - b.totalOrders
        case "spent-high":
          return b.totalSpent - a.totalSpent
        case "spent-low":
          return a.totalSpent - b.totalSpent
        case "recent":
        default:
          return new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime()
      }
    })

  const toggleCustomerExpansion = (customerId: number) => {
    if (expandedCustomer === customerId) {
      setExpandedCustomer(null)
    } else {
      setExpandedCustomer(customerId)
    }
  }

  const exportCustomers = () => {
    // In a real app, this would export customers to CSV or Excel
    alert("Customers exported successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <Button className="bg-green-600 hover:bg-green-700" onClick={exportCustomers}>
          <Download className="h-4 w-4 mr-2" />
          Export Customers
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="dark:text-gray-200">Customer Management</CardTitle>
          <CardDescription className="dark:text-gray-400">
            View and manage your customers, track their orders and spending.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search by name or email..."
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
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recent Order</SelectItem>
                    <SelectItem value="name-asc">Name: A-Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z-A</SelectItem>
                    <SelectItem value="orders-high">Orders: High to Low</SelectItem>
                    <SelectItem value="orders-low">Orders: Low to High</SelectItem>
                    <SelectItem value="spent-high">Spent: High to Low</SelectItem>
                    <SelectItem value="spent-low">Spent: Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isFiltersVisible && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <label className="text-sm font-medium mb-1 block dark:text-gray-300">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground dark:text-gray-400">
                {filteredCustomers.length} {filteredCustomers.length === 1 ? "customer" : "customers"}
              </div>
              {(searchQuery || statusFilter !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("")
                    setStatusFilter("all")
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
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Orders</TableHead>
                  <TableHead className="text-right">Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No customers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <>
                      <TableRow
                        key={customer.id}
                        className={`group hover:bg-gray-50 dark:hover:bg-gray-800/50 dark:border-gray-700 ${
                          expandedCustomer === customer.id ? "bg-gray-50 dark:bg-gray-800/50" : ""
                        }`}
                        onClick={() => toggleCustomerExpansion(customer.id)}
                      >
                        <TableCell className="cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white">
                                {customer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium dark:text-gray-300">{customer.name}</div>
                              <div className="text-sm text-muted-foreground dark:text-gray-400">{customer.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="cursor-pointer">
                          <Badge
                            variant="outline"
                            className={
                              customer.status === "active"
                                ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400"
                                : "border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                            }
                          >
                            {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center cursor-pointer dark:text-gray-300">
                          {customer.totalOrders}
                        </TableCell>
                        <TableCell className="text-right cursor-pointer font-medium dark:text-gray-300">
                          ₹{Math.round(customer.totalSpent * 83).toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="cursor-pointer dark:text-gray-400">
                          {new Date(customer.lastOrderDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(`mailto:${customer.email}`, "_blank")
                              }}
                            >
                              <Mail className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                              <span className="sr-only">Email</span>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More options</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                                <DropdownMenuItem
                                  className="dark:text-gray-300 dark:focus:bg-gray-700"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleCustomerExpansion(customer.id)
                                  }}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="dark:text-gray-300 dark:focus:bg-gray-700"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    window.open(`mailto:${customer.email}`, "_blank")
                                  }}
                                >
                                  <Mail className="h-4 w-4 mr-2" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="dark:text-gray-300 dark:focus:bg-gray-700"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    alert(`View orders for ${customer.name}`)
                                  }}
                                >
                                  <ShoppingBag className="h-4 w-4 mr-2" />
                                  View Orders
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="dark:text-gray-300 dark:focus:bg-gray-700"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    alert(`Edit customer ${customer.name}`)
                                  }}
                                >
                                  <UserCog className="h-4 w-4 mr-2" />
                                  Edit Customer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedCustomer === customer.id && (
                        <TableRow className="dark:border-gray-700">
                          <TableCell colSpan={6} className="bg-gray-50 dark:bg-gray-800/30 p-4">
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium mb-1 dark:text-gray-300">Customer Details</h4>
                                  <div className="text-sm space-y-1 dark:text-gray-400">
                                    <p>
                                      <span className="font-medium dark:text-gray-300">Name:</span> {customer.name}
                                    </p>
                                    <p>
                                      <span className="font-medium dark:text-gray-300">Email:</span> {customer.email}
                                    </p>
                                    <p>
                                      <span className="font-medium dark:text-gray-300">Status:</span> {customer.status}
                                    </p>
                                    <p>
                                      <span className="font-medium dark:text-gray-300">Registered:</span>{" "}
                                      {new Date(customer.registrationDate).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium mb-1 dark:text-gray-300">Order Statistics</h4>
                                  <div className="text-sm space-y-1 dark:text-gray-400">
                                    <p>
                                      <span className="font-medium dark:text-gray-300">Total Orders:</span>{" "}
                                      {customer.totalOrders}
                                    </p>
                                    <p>
                                      <span className="font-medium dark:text-gray-300">Total Spent:</span> ₹
                                      {Math.round(customer.totalSpent * 83).toLocaleString("en-IN")}
                                    </p>
                                    <p>
                                      <span className="font-medium dark:text-gray-300">Last Order:</span>{" "}
                                      {new Date(customer.lastOrderDate).toLocaleDateString()}
                                    </p>
                                    <p>
                                      <span className="font-medium dark:text-gray-300">Average Order Value:</span> ₹
                                      {Math.round((customer.totalSpent / customer.totalOrders) * 83).toLocaleString(
                                        "en-IN",
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium mb-1 dark:text-gray-300">Actions</h4>
                                  <div className="space-y-2">
                                    <Button
                                      size="sm"
                                      className="w-full"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        window.open(`mailto:${customer.email}`, "_blank")
                                      }}
                                    >
                                      <Mail className="h-4 w-4 mr-2" />
                                      Send Email
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="w-full"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        alert(`View orders for ${customer.name}`)
                                      }}
                                    >
                                      <ShoppingBag className="h-4 w-4 mr-2" />
                                      View Orders
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="w-full"
                                      onClick={() => toggleCustomerExpansion(customer.id)}
                                    >
                                      Close
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-2 dark:text-gray-300">Recent Activity</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                                    <span className="font-medium dark:text-gray-300">Last Order</span>
                                    <span className="text-muted-foreground dark:text-gray-400">
                                      - {new Date(customer.lastOrderDate).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <ShoppingBag className="h-4 w-4 text-green-500 dark:text-green-400" />
                                    <span className="font-medium dark:text-gray-300">Total Orders</span>
                                    <span className="text-muted-foreground dark:text-gray-400">
                                      - {customer.totalOrders} orders placed
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <DollarSign className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                                    <span className="font-medium dark:text-gray-300">Total Spent</span>
                                    <span className="text-muted-foreground dark:text-gray-400">
                                      - ₹{Math.round(customer.totalSpent * 83).toLocaleString("en-IN")}
                                    </span>
                                  </div>
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
          Showing <strong>{filteredCustomers.length}</strong> of <strong>{customers.length}</strong> customers
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
