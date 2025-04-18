"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      console.log("Subscribing email:", email)
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="relative overflow-hidden">
      {/* Colorful top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>

      {/* Compact newsletter section */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 dark:from-green-800 dark:to-teal-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="max-w-xs">
              <h3 className="text-xl font-bold text-white mb-1">Join Our Newsletter</h3>
              <p className="text-green-50 text-sm">Get exclusive offers and updates</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-1 max-w-md">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="h-10 pr-12 border-0 rounded-r-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              <Button
                type="submit"
                className={cn(
                  "h-10 rounded-l-none bg-white text-green-600 hover:bg-green-50",
                  subscribed && "bg-green-50",
                )}
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer content - compact and centered */}
      <div className="bg-white dark:bg-gray-900 py-8">
        <div className="container">
          <div className="flex flex-col items-center">
            {/* Logo and links in one row on desktop */}
            <div className="w-full flex flex-col md:flex-row md:items-center justify-between mb-6">
              {/* Logo */}
              <Link href="/" className="inline-flex items-center mb-4 md:mb-0">
                <div className="relative h-8 w-8 mr-2 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-white">G</span>
                </div>
                <div className="font-bold">
                  <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-500 dark:from-green-400 dark:to-teal-400">
                    GolfGear
                  </span>
                  <span className="text-lg font-light text-gray-800 dark:text-gray-200">Pro</span>
                </div>
              </Link>

              {/* Navigation links */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 md:mb-0">
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/contact">Contact Us</FooterLink>
                <FooterLink href="/blog">Blog & News</FooterLink>
                <FooterLink href="/bulk-orders">Bulk Orders</FooterLink>
                <FooterLink href="/help-center">Help Center</FooterLink>
              </div>

              {/* App download section - compact */}
              <div className="flex items-center gap-2">
                <Link href="#" className="transition-all hover:opacity-80">
                  <Image src="/app-store-badge.svg" alt="App Store" width={100} height={30} className="h-8 w-auto" />
                </Link>
                <Link href="#" className="transition-all hover:opacity-80">
                  <Image
                    src="/google-play-badge.svg"
                    alt="Google Play"
                    width={110}
                    height={30}
                    className="h-8 w-auto"
                  />
                </Link>
              </div>
            </div>

            {/* Social and copyright in one row */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
              {/* Social icons */}
              <div className="flex items-center space-x-3 mb-3 md:mb-0 order-1 md:order-none">
                <SocialIcon icon={<Facebook className="h-4 w-4" />} label="Facebook" />
                <SocialIcon icon={<Instagram className="h-4 w-4" />} label="Instagram" />
                <SocialIcon icon={<Twitter className="h-4 w-4" />} label="Twitter" />
                <SocialIcon icon={<Youtube className="h-4 w-4" />} label="YouTube" />
                <SocialIcon icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" />
              </div>

              {/* Copyright */}
              <div className="text-center md:text-right text-sm text-gray-500 dark:text-gray-400 mb-3 md:mb-0">
                &copy; {new Date().getFullYear()} GolfGear Pro. All rights reserved.
              </div>

              {/* Legal links */}
              <div className="flex gap-4 text-xs">
                <Link href="/terms" className="text-gray-500 hover:text-green-600 dark:text-gray-400">
                  Terms
                </Link>
                <Link href="/privacy" className="text-gray-500 hover:text-green-600 dark:text-gray-400">
                  Privacy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Compact social icon component
function SocialIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-500 
      hover:text-white p-2 rounded-full transition-all duration-300 flex items-center justify-center"
    >
      {icon}
    </a>
  )
}

// Compact footer link component
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 
      transition-colors text-sm font-medium"
    >
      {children}
    </Link>
  )
}
