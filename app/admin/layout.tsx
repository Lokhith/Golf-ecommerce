"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if user is authenticated by looking for a flag in localStorage
    // In a real app, you would use a more secure method like cookies or JWT
    const isLoggedIn = localStorage.getItem("adminAuthenticated") === "true"

    // If not on login page and not authenticated, redirect to login
    if (!isLoggedIn && pathname !== "/admin/login") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(isLoggedIn)
      setIsLoading(false)
    }

    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [pathname, router])

  // Show nothing while checking authentication
  if (isLoading) {
    return null
  }

  // If on login page or not authenticated, just render children (the login page)
  if (pathname === "/admin/login" || !isAuthenticated) {
    return <>{children}</>
  }

  // Update the admin layout for better dark mode appearance
  // If authenticated, render the admin layout
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {/* Add padding-top on mobile for the menu button */}
          <div className={isMobile ? "pt-10" : ""}>{children}</div>
        </main>
      </div>
    </div>
  )
}
