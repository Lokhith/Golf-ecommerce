"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]")

      // Find user with matching email
      const user = users.find((u: any) => u.email === email)

      if (user && user.password === password) {
        // Set user as logged in
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            id: user.id,
            email: user.email,
            username: user.username,
          }),
        )

        // Redirect to home page (this will both navigate and reload)
        window.location.href = "/"
      } else {
        setLoading(false)
        setError("Invalid email or password. Please try again.")
      }
    }, 1000)
  }

  return (
    <div className="w-full max-w-md">
      <Link href="/" className="flex items-center justify-center mb-8">
        <div className="relative h-16 w-16 mr-2">
          <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-green-600 dark:text-green-400">G</span>
          </div>
        </div>
        <div className="font-bold text-white">
          <span className="text-3xl">GolfGear</span>
          <span className="text-3xl font-light">Pro</span>
        </div>
      </Link>

      <Card className="border-none shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300">
        <CardHeader className="space-y-1 bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-700 dark:to-teal-700 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center text-green-100">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {error && (
            <Alert variant="destructive" className="mb-4 animate-shake">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 px-4 border-2 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 focus-visible:ring-green-500 dark:focus-visible:ring-green-400 transition-all"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <Link href="/account/forgot-password" className="text-xs text-green-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 px-4 border-2 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 focus-visible:ring-green-500 dark:focus-visible:ring-green-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                className="text-green-600 border-2 border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
              <Label htmlFor="remember" className="text-sm font-normal text-gray-600">
                Remember me for 30 days
              </Label>
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-base font-medium bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 dark:from-green-700 dark:to-teal-700 dark:hover:from-green-600 dark:hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col p-6 pt-0 border-t border-gray-100">
          <div className="text-center text-sm text-gray-600 mt-2">
            <p>
              Don&apos;t have an account?{" "}
              <Link
                href="/account/register"
                className="text-green-600 hover:text-green-700 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>

      <div className="text-center mt-6">
        <Link href="/" className="text-sm text-white hover:text-green-100 transition-colors">
          ← Return to store
        </Link>
      </div>
    </div>
  )
}
