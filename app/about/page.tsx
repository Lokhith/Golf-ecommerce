import Image from "next/image"
import Link from "next/link"
import { ShoppingBagIcon as GolfBag, Award, Store, MapPin, Phone, Clock, Users, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        <Image src="/golf-course-premium.png" alt="Premium Golf Course" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-center">
            About <span className="text-green-400 dark:text-emerald-400">GolfGearPro</span>
          </h1>
          <div className="w-24 h-1 bg-green-400 dark:bg-emerald-400 mb-6"></div>
          <p className="text-lg md:text-xl max-w-2xl text-center text-gray-100">
            Premium Golf Equipment & Expert Instruction
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-16 md:py-24 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6 relative">
                Our <span className="text-green-600 dark:text-emerald-400">Story</span>
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-green-500 dark:bg-emerald-400"></span>
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 space-y-4">
                <p>
                  GolfGearPro is owned and operated by Mr. Ashok, a certified golf instructor and passionate golfer.
                  With years of experience in coaching players of all levels, Mr. Ashok runs a prestigious golf academy
                  located in the scenic town of Highfield, Coonoor.
                </p>
                <p>
                  Beyond coaching, he also owns a fully-equipped pro shop located right next to the academy. The pro
                  shop features an advanced indoor golf simulator, providing players the perfect environment to
                  practice, get fitted, and choose the best equipment tailored to their game.
                </p>
                <p>
                  GolfGearPro is an extension of this passion — delivering professional advice, premium gear, and
                  exceptional service to golfers across the country.
                </p>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden rounded-lg shadow-xl border-4 border-white dark:border-gray-800">
                <Image src="/indoor-golf-simulator.png" alt="Indoor Golf Simulator" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-green-50 dark:bg-emerald-900/30 rounded-lg -z-10"></div>
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-green-50 dark:bg-emerald-900/30 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 md:py-24 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-16">
            Why Choose <span className="text-green-600 dark:text-emerald-400">GolfGearPro</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2 border border-transparent dark:border-gray-700">
              <div className="w-16 h-16 bg-green-50 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Award className="w-8 h-8 text-green-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-4">
                Certified Golf Instruction
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Learn from certified professionals with years of experience teaching players of all skill levels.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2 border border-transparent dark:border-gray-700">
              <div className="w-16 h-16 bg-green-50 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Target className="w-8 h-8 text-green-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-4">
                State-of-the-Art Golf Simulator
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Experience our advanced simulator for precise club fitting and realistic practice sessions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2 border border-transparent dark:border-gray-700">
              <div className="w-16 h-16 bg-green-50 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6 mx-auto">
                <GolfBag className="w-8 h-8 text-green-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-4">
                Handpicked Premium Golf Gear
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Shop from our curated collection of the finest golf equipment from top global brands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="py-16 md:py-24 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-2/5">
              <div className="relative">
                <div className="relative h-[400px] sm:h-[500px] w-full overflow-hidden rounded-lg shadow-xl border-4 border-white dark:border-gray-800">
                  <Image
                    src="/founder-placeholder.png"
                    alt="Mr. Ashok - Founder of GolfGearPro"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-green-500 dark:border-emerald-500 rounded-lg -z-10"></div>
              </div>
            </div>

            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6 relative">
                Meet the <span className="text-green-600 dark:text-emerald-400">Founder</span>
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-green-500 dark:bg-emerald-400"></span>
              </h2>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">Mr. Ashok</h3>
                <p className="text-green-600 dark:text-emerald-400 font-medium">
                  Certified Golf Instructor & Entrepreneur
                </p>
              </div>

              <div className="relative mb-8 pl-6 border-l-4 border-green-500 dark:border-emerald-500">
                <p className="italic text-lg text-gray-600 dark:text-gray-300">
                  "My mission is to help every golfer reach their full potential with the right guidance and equipment.
                  At GolfGearPro, we don't just sell products – we deliver an experience that transforms your game."
                </p>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-8">
                With over 15 years of experience as a golf instructor and equipment specialist, Mr. Ashok has helped
                thousands of players improve their game. His deep knowledge of golf mechanics and equipment technology
                makes GolfGearPro a trusted destination for golfers seeking quality and expertise.
              </p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-50 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mr-3">
                    <MapPin className="w-5 h-5 text-green-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200">Highfield, Coonoor</span>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-50 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-green-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200">PGA Certified</span>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-50 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mr-3">
                    <Store className="w-5 h-5 text-green-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200">Pro Shop Owner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-16 md:py-24 px-4 bg-green-800 dark:bg-emerald-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Visit Our Academy & Pro Shop</h2>
            <p className="text-green-100 max-w-2xl mx-auto">
              Experience our state-of-the-art facilities and get personalized service from our team of experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-700/80 dark:bg-emerald-800/80 p-8 rounded-lg transition-transform duration-300 hover:-translate-y-2 backdrop-blur-sm">
              <div className="w-12 h-12 bg-green-600/80 dark:bg-emerald-700/80 rounded-full flex items-center justify-center mb-6 mx-auto">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Location</h3>
              <p className="text-green-100 text-center">
                GolfGearPro Academy & Pro Shop
                <br />
                123 Fairway Drive
                <br />
                Highfield, Coonoor 643001
              </p>
            </div>

            <div className="bg-green-700/80 dark:bg-emerald-800/80 p-8 rounded-lg transition-transform duration-300 hover:-translate-y-2 backdrop-blur-sm">
              <div className="w-12 h-12 bg-green-600/80 dark:bg-emerald-700/80 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Hours</h3>
              <p className="text-green-100 text-center">
                Monday - Friday: 9:00 AM - 7:00 PM
                <br />
                Saturday: 8:00 AM - 6:00 PM
                <br />
                Sunday: 9:00 AM - 4:00 PM
              </p>
            </div>

            <div className="bg-green-700/80 dark:bg-emerald-800/80 p-8 rounded-lg transition-transform duration-300 hover:-translate-y-2 backdrop-blur-sm">
              <div className="w-12 h-12 bg-green-600/80 dark:bg-emerald-700/80 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Contact</h3>
              <p className="text-green-100 text-center">
                Phone: +91 98765 43210
                <br />
                Email: info@golfgearpro.com
                <br />
                <Link
                  href="/contact"
                  className="text-white underline mt-2 inline-block hover:text-green-200 dark:hover:text-emerald-200 transition-colors"
                >
                  Book an Appointment
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
            Ready to Elevate Your Golf Game?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Browse our premium collection of golf equipment or schedule a fitting session with our experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-green-600 dark:bg-emerald-600 text-white rounded-md font-medium hover:bg-green-700 dark:hover:bg-emerald-700 transition-colors"
            >
              Shop Premium Gear
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-white dark:bg-gray-900 border border-green-600 dark:border-emerald-500 text-green-600 dark:text-emerald-400 rounded-md font-medium hover:bg-green-50 dark:hover:bg-gray-800 transition-colors"
            >
              Book a Fitting Session
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
