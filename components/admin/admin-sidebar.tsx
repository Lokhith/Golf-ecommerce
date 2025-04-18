"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Tag,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
    subLinks: [
      {
        title: "All Products",
        href: "/admin/products",
      },
      {
        title: "Add Product",
        href: "/admin/products/add",
      },
      {
        title: "Categories",
        href: "/admin/products/categories",
      },
    ],
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Discounts",
    href: "/admin/discounts",
    icon: Tag,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>("Products")

  const router = useRouter()

  const handleLogout = () => {
    // Remove authentication flag
    localStorage.removeItem("adminAuthenticated")
    // Redirect to login page
    router.push("/admin/login")
  }

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[250px]",
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {!collapsed && (
          <Link href="/admin" className="flex items-center">
            <div className="relative h-8 w-8 mr-2">
              <div className="absolute inset-0 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">G</span>
              </div>
            </div>
            <span className="text-lg font-semibold text-gray-900">Admin Panel</span>
          </Link>
        )}
        <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <div className="py-4">
        <nav className="space-y-1 px-2">
          {sidebarLinks.map((link) => (
            <div key={link.title}>
              <Link
                href={link.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200",
                  isActive(link.href)
                    ? "bg-green-50 text-green-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                )}
                onClick={() => link.subLinks && toggleSubmenu(link.title)}
              >
                <link.icon
                  className={cn(
                    "mr-3 h-5 w-5 transition-colors",
                    isActive(link.href) ? "text-green-600" : "text-gray-500 group-hover:text-gray-600",
                  )}
                />
                {!collapsed && (
                  <>
                    <span className="flex-1">{link.title}</span>
                    {link.subLinks && (
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 transition-transform",
                          openSubmenu === link.title && "transform rotate-90",
                        )}
                      />
                    )}
                  </>
                )}
              </Link>

              {!collapsed && link.subLinks && openSubmenu === link.title && (
                <div className="mt-1 ml-8 space-y-1">
                  {link.subLinks.map((subLink) => (
                    <Link
                      key={subLink.title}
                      href={subLink.href}
                      className={cn(
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200",
                        pathname === subLink.href
                          ? "bg-green-50 text-green-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      )}
                    >
                      <span className="flex-1">{subLink.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50",
            collapsed && "justify-center",
          )}
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  )
}
