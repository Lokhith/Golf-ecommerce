"use client"

import { useState, useEffect } from "react"
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
  Percent,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Modify the sidebar links to remove unnecessary sections
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
        href: "/admin/categories",
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
    title: "Coupons",
    href: "/admin/coupons",
    icon: Percent,
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
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const router = useRouter()

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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

  // Mobile sidebar component
  const MobileSidebar = () => (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 shadow-sm"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[280px]">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/admin" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
            <div className="relative h-8 w-8 mr-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">G</span>
              </div>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Admin Panel</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="py-4 overflow-y-auto h-[calc(100vh-4rem)]">
          <nav className="space-y-1 px-2">
            {sidebarLinks.map((link) => (
              <div key={link.title}>
                <Link
                  href={link.href}
                  className={cn(
                    "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive(link.href)
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 dark:from-green-900/40 dark:to-emerald-900/40 dark:text-emerald-400"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800/60 dark:hover:text-emerald-400",
                  )}
                  onClick={() => {
                    if (link.subLinks) {
                      toggleSubmenu(link.title)
                    } else {
                      setMobileMenuOpen(false)
                    }
                  }}
                >
                  <link.icon
                    className={cn(
                      "mr-3 h-5 w-5 transition-colors",
                      isActive(link.href)
                        ? "text-green-600 dark:text-emerald-400"
                        : "text-gray-500 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-emerald-400",
                    )}
                  />
                  <span className="flex-1">{link.title}</span>
                  {link.subLinks && (
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform text-gray-400 dark:text-gray-500",
                        openSubmenu === link.title && "transform rotate-90",
                      )}
                    />
                  )}
                </Link>

                {link.subLinks && openSubmenu === link.title && (
                  <div className="mt-1 ml-8 space-y-1">
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.title}
                        href={subLink.href}
                        className={cn(
                          "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                          pathname === subLink.href
                            ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-emerald-400"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/60 dark:hover:text-emerald-400",
                        )}
                        onClick={() => setMobileMenuOpen(false)}
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

        <div className="absolute bottom-0 w-full border-t border-gray-200 p-4 dark:border-gray-800">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span>Logout</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )

  // If on mobile, render the mobile sidebar
  if (isMobile) {
    return <MobileSidebar />
  }

  // Desktop sidebar
  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 ease-in-out dark:bg-gray-900 dark:border-gray-800",
        collapsed ? "w-[70px]" : "w-[250px]",
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
        {!collapsed && (
          <Link href="/admin" className="flex items-center">
            <div className="relative h-8 w-8 mr-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">G</span>
              </div>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Admin Panel</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <div className="py-4 overflow-y-auto h-[calc(100vh-4rem)]">
        <nav className="space-y-1 px-2">
          {sidebarLinks.map((link) => (
            <div key={link.title}>
              <Link
                href={link.href}
                className={cn(
                  "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive(link.href)
                    ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 dark:from-green-900/40 dark:to-emerald-900/40 dark:text-emerald-400"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800/60 dark:hover:text-emerald-400",
                )}
                onClick={() => link.subLinks && toggleSubmenu(link.title)}
              >
                <link.icon
                  className={cn(
                    "mr-3 h-5 w-5 transition-colors",
                    isActive(link.href)
                      ? "text-green-600 dark:text-emerald-400"
                      : "text-gray-500 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-emerald-400",
                  )}
                />
                {!collapsed && (
                  <>
                    <span className="flex-1">{link.title}</span>
                    {link.subLinks && (
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 transition-transform text-gray-400 dark:text-gray-500",
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
                        "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                        pathname === subLink.href
                          ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-emerald-400"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/60 dark:hover:text-emerald-400",
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

      <div className="absolute bottom-0 w-full border-t border-gray-200 p-4 dark:border-gray-800">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20",
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
