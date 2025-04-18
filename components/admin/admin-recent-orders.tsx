"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample recent orders data
const recentOrders = [
  {
    id: "ORD-7652",
    customer: "John Smith",
    date: "2023-04-17",
    total: 499.99,
    status: "delivered",
  },
  {
    id: "ORD-7651",
    customer: "Sarah Johnson",
    date: "2023-04-16",
    total: 149.99,
    status: "shipped",
  },
  {
    id: "ORD-7650",
    customer: "Michael Brown",
    date: "2023-04-16",
    total: 239.99,
    status: "processing",
  },
  {
    id: "ORD-7649",
    customer: "Emily Davis",
    date: "2023-04-15",
    total: 799.99,
    status: "pending",
  },
  {
    id: "ORD-7648",
    customer: "Robert Wilson",
    date: "2023-04-15",
    total: 55.0,
    status: "delivered",
  },
]

export function AdminRecentOrders() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 text-xs font-medium text-muted-foreground">
        <div>Order</div>
        <div>Customer</div>
        <div>Date</div>
        <div>Total</div>
        <div>Status</div>
      </div>
      <div className="space-y-2">
        {recentOrders.map((order) => (
          <div key={order.id} className="grid grid-cols-5 items-center py-2 text-sm">
            <div className="font-medium">{order.id}</div>
            <div className="truncate">{order.customer}</div>
            <div>{new Date(order.date).toLocaleDateString()}</div>
            <div>${order.total.toFixed(2)}</div>
            <div className="flex items-center gap-2">
              <Badge
                className={
                  order.status === "delivered"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : order.status === "shipped"
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      : order.status === "processing"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                }
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem>Update status</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
