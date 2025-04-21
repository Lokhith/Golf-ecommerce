import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, Clock, Calendar, ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left side - Contact information */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-gray-100">
              Can't find your perfect golf gear?
            </h1>
            <p className="text-xl md:text-2xl font-medium text-green-700 dark:text-green-500">
              We'll help you find your best match!
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <Phone className="h-6 w-6 text-green-700 dark:text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1 dark:text-gray-200">Call us</h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">+91 94423 67666</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <MessageCircle className="h-6 w-6 text-green-700 dark:text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1 dark:text-gray-200">WhatsApp us</h3>
                <Link
                  href="https://wa.me/919442367666"
                  target="_blank"
                  className="text-green-700 dark:text-green-500 text-lg font-medium hover:underline"
                >
                  Chat with us now
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <Mail className="h-6 w-6 text-green-700 dark:text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1 dark:text-gray-200">Email us</h3>
                <Link
                  href="mailto:support@golfgearpro.com"
                  className="text-green-700 dark:text-green-500 text-lg font-medium hover:underline"
                >
                  support@golfgearpro.com
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <Clock className="h-6 w-6 text-green-700 dark:text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1 dark:text-gray-200">Available hours</h3>
                <p className="text-gray-700 dark:text-gray-300">Throughout the week, 9 AM to 8 PM</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-100 dark:border-green-900/30">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Think finding your perfect match is costly?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nope. Book your personalized consultation now — absolutely FREE! Just contact using above links.
            </p>
            <Link href="https://wa.me/919442367666" target="_blank">
              <Button className="bg-green-700 hover:bg-green-800 dark:bg-green-700 dark:hover:bg-green-600 transition-all">
                Book Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl order-first md:order-last">
          <Image
            src="/golf-pro-consultation-male.jpg"
            alt="Male golf professional helping male customer select equipment"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
            <h3 className="text-white text-2xl font-bold mb-2">Expert Guidance</h3>
            <p className="text-white/90">
              Our team of golf enthusiasts is ready to help you find the perfect equipment for your game
            </p>
          </div>
        </div>
      </div>

      {/* Store locations section */}
      <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
          Visit Our Store
        </h2>
        <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 dark:text-gray-200">
              <Calendar className="h-5 w-5 text-green-700 dark:text-green-500" />
              GolfGearPro Store
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              GolfGearPro, Highfield Estate, Walker's Hill Road,
              <br />
              Coonoor, Tamil Nadu 643101
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Monday - Sunday: 9:00 AM - 8:00 PM</p>
            <div className="mt-4">
              <Link
                href="https://www.google.com/maps/dir//No.141,+Highfield+Estate,+Walker's+Hill+Road,+Coonoor,+Tamil+Nadu+643101/@11.3625243,76.7211735,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3ba8953a5307a147:0x30639d34cae55598!2m2!1d76.8035754!2d11.3625357?entry=ttu&g_ep=EgoyMDI1MDQyMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                className="text-green-700 dark:text-green-500 text-sm font-medium hover:underline flex items-center"
              >
                Get Directions
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="mt-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-800/80 p-6 rounded-xl border border-green-100 dark:border-green-900/30 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start gap-3 mb-2">
              <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-700 dark:text-green-400"
                >
                  <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
                  <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
                  <line x1="6" x2="6" y1="2" y2="4"></line>
                  <line x1="10" x2="10" y1="2" y2="4"></line>
                  <line x1="14" x2="14" y1="2" y2="4"></line>
                </svg>
              </div>
              <h3 className="text-lg font-semibold dark:text-gray-200">How long does shipping take?</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 ml-9">
              We offer standard shipping (3-5 business days) and express shipping (1-2 business days) options across
              India.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-800/80 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start gap-3 mb-2">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-700 dark:text-blue-400"
                >
                  <path d="M9 14 4 9l5-5"></path>
                  <path d="M4 9h16"></path>
                  <path d="M15 4v10"></path>
                  <path d="M15 14h5v6H4v-3"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold dark:text-gray-200">What is your return policy?</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 ml-9">
              We offer a 30-day return policy for unused items in original packaging. Custom-fitted clubs have special
              return conditions.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-white dark:from-gray-800 dark:to-gray-800/80 p-6 rounded-xl border border-amber-100 dark:border-amber-900/30 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start gap-3 mb-2">
              <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-700 dark:text-amber-400"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold dark:text-gray-200">Do you offer club fitting services?</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 ml-9">
              Yes, we offer professional club fitting services at our store location. Appointments are recommended.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-800/80 p-6 rounded-xl border border-purple-100 dark:border-purple-900/30 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start gap-3 mb-2">
              <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-700 dark:text-purple-400"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  <line x1="9" x2="15" y1="15" y2="9"></line>
                </svg>
              </div>
              <h3 className="text-lg font-semibold dark:text-gray-200">Can I cancel my order?</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 ml-9">
              Orders can be cancelled within 24 hours of placement. Please contact our customer service team
              immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
