"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"

export default function WishlistPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("currentUser")

    if (!userData) {
      router.push("/account/login")
      return
    }

    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="container py-12 flex justify-center">
        <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      <Card>
        <CardHeader>
          <CardTitle>Saved Items</CardTitle>
          <CardDescription>Products you've saved for later</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-4">Save items you like to your wishlist.</p>
            <Button className="bg-green-700 hover:bg-green-800" asChild>
              <Link href="/">Explore Products</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
