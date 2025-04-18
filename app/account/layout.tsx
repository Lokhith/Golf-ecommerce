"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Footer from "@/components/footer"

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Check if current page is login or register
  const isAuthPage = pathname === "/account/login" || pathname === "/account/register"

  return (
    <>
      {/* Only render the content without header for login/register pages */}
      <main className="flex-1">
        {isAuthPage ? (
          <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 dark:from-green-900 dark:via-emerald-800 dark:to-teal-900 flex items-center justify-center p-4">
            {children}
          </div>
        ) : (
          children
        )}
      </main>
      {isAuthPage ? null : <Footer />}
    </>
  )
}
