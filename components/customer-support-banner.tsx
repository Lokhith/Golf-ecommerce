import { Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CustomerSupportBanner() {
  return (
    <section className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 py-6 md:py-10">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-md">
              <MessageCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 dark:text-gray-100">
            Need Help Finding Your Perfect Golf Gear?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            If you find it tiring to order or could not find your desired items, don't worry! We can sort it out and
            find your best match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white px-6 py-6 rounded-lg shadow-md">
              <Phone className="h-5 w-5" />
              <span className="text-base font-medium">Call Us: +91 9442367666</span>
            </Button>
            <Button className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-6 rounded-lg shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                <path d="M9.5 13.5c.5 1 1.5 1 2 1s1.5 0 2-1" />
              </svg>
              <span className="text-base font-medium">WhatsApp: +91 9442367666</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
