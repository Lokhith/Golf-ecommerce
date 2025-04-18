"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Loader2, ArrowRight, User, Mail, Lock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Get existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")

      // Check if email already exists
      if (existingUsers.some((user: any) => user.email === email)) {
        setLoading(false)
        setError("Email already in use. Please use a different email or sign in.")
        return
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      }

      // Add user to localStorage
      localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]))

      // Set user as logged in
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
        }),
      )

      // Redirect to home page (this will both navigate and reload)
      window.location.href = "/"
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
          <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-center text-green-100">Join GolfGear Pro and start shopping</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {error && (
            <Alert variant="destructive" className="mb-4 animate-shake">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="username"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-12 pl-10 pr-4 border-2 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 focus-visible:ring-green-500 dark:focus-visible:ring-green-400 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 pl-10 pr-4 border-2 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 focus-visible:ring-green-500 dark:focus-visible:ring-green-400 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 pl-10 pr-10 border-2 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 focus-visible:ring-green-500 dark:focus-visible:ring-green-400 transition-all"
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-12 pl-10 pr-4 border-2 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 focus-visible:ring-green-500 dark:focus-visible:ring-green-400 transition-all"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
              <Checkbox
                id="terms"
                required
                className="text-green-600 border-2 border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
              <Label htmlFor="terms" className="text-sm font-normal text-gray-600">
                I agree to the{" "}
                <Link href="/terms" className="text-green-600 hover:text-green-700 font-medium hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-green-600 hover:text-green-700 font-medium hover:underline">
                  Privacy Policy
                </Link>
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
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col p-6 pt-0 border-t border-gray-100">
          <div className="text-center text-sm text-gray-600 mt-2">
            <p>
              Already have an account?{" "}
              <Link href="/account/login" className="text-green-600 hover:text-green-700 font-medium hover:underline">
                Sign in
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
