"use client"
import { Phone, MessageCircle } from "lucide-react"

export default function BulkOrdersPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 bg-[url('/golf-course-pattern.jpg')] bg-cover bg-center opacity-5 dark:opacity-[0.03]"
        aria-hidden="true"
      />

      {/* Content container */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-200px)] max-w-4xl flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:bg-gray-900/80 sm:p-12">
          {/* Decorative element */}
          <div
            className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-500/20 blur-2xl dark:from-green-400/10 dark:to-emerald-500/10"
            aria-hidden="true"
          />

          {/* Main content */}
          <div className="relative">
            {/* Heading with animation */}
            <h1
              className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl"
              style={{
                opacity: 0,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              Bulk Orders Made Easy
            </h1>

            {/* Subtext with animation */}
            <p
              className="mx-auto mt-4 max-w-2xl text-center text-gray-600 dark:text-gray-300"
              style={{
                opacity: 0,
                animation: "fadeInUp 0.6s ease-out 0.2s forwards",
              }}
            >
              Looking to place a large order? We're here to help you with personalized assistance and best deals.
            </p>

            {/* CTA Buttons */}
            <div
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
              style={{
                opacity: 0,
                animation: "fadeInUp 0.6s ease-out 0.4s forwards",
              }}
            >
              {/* Call Now Button */}
              <a
                href="tel:+919442367666"
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 text-lg font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:from-green-500 dark:to-emerald-500 sm:flex-1"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-green-600 dark:to-emerald-600"></span>
                <Phone className="relative h-5 w-5" />
                <span className="relative">Call Now</span>
              </a>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/919442367666"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#25D366] px-8 py-4 text-lg font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-[#1DA851] sm:flex-1"
              >
                <span className="absolute inset-0 bg-[#1DA851] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-[#0E8C3C]"></span>
                <MessageCircle className="relative h-5 w-5" />
                <span className="relative">WhatsApp Now</span>
              </a>
            </div>

            {/* Note */}
            <p
              className="mx-auto mt-8 max-w-2xl text-center text-sm text-gray-500 dark:text-gray-400 sm:text-base"
              style={{
                opacity: 0,
                animation: "fadeInUp 0.6s ease-out 0.6s forwards",
              }}
            >
              Our golf experts are ready to assist you. Bulk discounts, customization, and fast shipping — all tailored
              to your needs.
            </p>

            {/* Decorative golf ball icon */}
            <div className="mt-12 flex justify-center">
              <div className="h-12 w-12 rounded-full bg-white p-2 shadow-md dark:bg-gray-800">
                <div className="h-full w-full rounded-full bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-900">
                  <div className="flex h-full items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
