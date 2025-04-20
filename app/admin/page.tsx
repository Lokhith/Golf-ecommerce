import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  AlertTriangle,
  Calendar,
  Tag,
} from "lucide-react"
import { AdminRecentOrders } from "@/components/admin/admin-recent-orders"
import { AdminSalesChart } from "@/components/admin/admin-sales-chart"
import { AdminLowStockAlert } from "@/components/admin/admin-low-stock-alert"
import { AdminTopProducts } from "@/components/admin/admin-top-products"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Admin User</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/products/add">
            <Button className="bg-green-600 hover:bg-green-700">
              <Package className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
          <Link href="/admin/coupons/add">
            <Button variant="outline">
              <Tag className="h-4 w-4 mr-2" />
              Create Coupon
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:border-emerald-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium dark:text-gray-200">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600 dark:text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">₹37,54,247</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1 dark:text-gray-400">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600 dark:text-emerald-400" />
              <span className="text-green-600 font-medium dark:text-emerald-400">+20.1%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium dark:text-gray-200">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">2,350</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1 dark:text-gray-400">
              <Calendar className="h-3 w-3 mr-1 text-blue-600 dark:text-blue-400" />
              <span>124 new this month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:border-orange-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium dark:text-gray-200">Products Listed</CardTitle>
            <Package className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">573</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1 dark:text-gray-400">
              <AlertTriangle className="h-3 w-3 mr-1 text-amber-600 dark:text-amber-400" />
              <span>8 low stock items</span>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium dark:text-gray-200">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">12,234</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1 dark:text-gray-400">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-600 dark:text-emerald-400" />
              <span className="text-green-600 font-medium dark:text-emerald-400">+19%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4 hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-gray-200">Sales Overview</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Monthly revenue for the current year compared to last year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminSalesChart />
          </CardContent>
        </Card>
        <Card className="md:col-span-3 hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="dark:text-gray-200">Recent Orders</CardTitle>
              <CardDescription className="dark:text-gray-400">Latest customer orders and their status</CardDescription>
            </div>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm" className="text-xs">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <AdminRecentOrders />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="dark:text-gray-200">Low Stock Alerts</CardTitle>
              <CardDescription className="dark:text-gray-400">Products with inventory below threshold</CardDescription>
            </div>
            <Link href="/admin/products?filter=low-stock">
              <Button variant="ghost" size="sm" className="text-xs">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <AdminLowStockAlert />
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="dark:text-gray-200">Top Selling Products</CardTitle>
              <CardDescription className="dark:text-gray-400">Best performing products this month</CardDescription>
            </div>
            <Link href="/admin/products?sort=best-selling">
              <Button variant="ghost" size="sm" className="text-xs">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <AdminTopProducts />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
