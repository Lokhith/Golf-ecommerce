"use client"

import type React from "react"

import { useState } from "react"
import { Phone, MessageCircle, Send, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function HelpCenterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    issue: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      // Reset form data
      setFormData({
        name: "",
        phone: "",
        email: "",
        issue: "",
      })
    }, 1000)
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        {isSubmitted ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700 text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">Thank You!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your form has been submitted. We will get back to you shortly.
            </p>
            <Button onClick={() => setIsSubmitted(false)} className="bg-green-700 hover:bg-green-800 text-white">
              Submit Another Request
            </Button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                Need Help? We're Just a Call or Message Away!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Since we're a startup, we prioritize personal support. For any issues, feel free to call or message us
                directly. We're committed to responding within 1–3 hours during working hours.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 dark:text-gray-200">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="rounded-lg border-gray-200 dark:border-gray-700 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 dark:text-gray-200">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className="rounded-lg border-gray-200 dark:border-gray-700 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  className="rounded-lg border-gray-200 dark:border-gray-700 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issue" className="text-gray-700 dark:text-gray-200">
                  Issue/Complaint
                </Label>
                <Textarea
                  id="issue"
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  placeholder="Briefly describe your issue"
                  className="rounded-lg border-gray-200 dark:border-gray-700 focus:ring-green-500 focus:border-green-500 min-h-[120px]"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2 pt-2">
                <Link
                  href="https://wa.me/919442367666"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-medium py-3 px-4 rounded-lg transition-transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Message us on WhatsApp
                </Link>

                <Link
                  href="tel:+919442367666"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 px-4 rounded-lg transition-transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                >
                  <Phone className="h-5 w-5" />
                  Call Us
                </Link>
              </div>

              <div className="text-center text-gray-600 dark:text-gray-400 text-sm mt-4">
                Once submitted, we will reach out to you within 1–3 hours during working hours.
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3 rounded-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Raise a Complaint
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
