import Image from "next/image"
import Link from "next/link"

// Brand data
const brands = [
  {
    name: "TaylorMade",
    logo: "/brand-logos/taylormade-logo.png",
    href: "/brands/taylormade",
  },
  {
    name: "Callaway",
    logo: "/brand-logos/callaway-logo.png",
    href: "/brands/callaway",
  },
  {
    name: "Titleist",
    logo: "/brand-logos/titleist-logo.png",
    href: "/brands/titleist",
  },
  {
    name: "PING",
    logo: "/brand-logos/ping-logo.png",
    href: "/brands/ping",
  },
  {
    name: "Cobra",
    logo: "/brand-logos/cobra-logo.png",
    href: "/brands/cobra",
  },
  {
    name: "Mizuno",
    logo: "/brand-logos/mizuno-logo.png",
    href: "/brands/mizuno",
  },
  {
    name: "Srixon",
    logo: "/brand-logos/srixon-golf-balls.png",
    href: "/brands/srixon",
  },
  {
    name: "PXG",
    logo: "/brand-logos/pxg-logo.png",
    href: "/brands/pxg",
  },
  {
    name: "Bridgestone",
    logo: "/brand-logos/bridgestone-logo.png",
    href: "/brands/bridgestone",
  },
  {
    name: "Nike",
    logo: "/brand-logos/nike-logo.png",
    href: "/brands/nike",
  },
]

export default function PremiumBrands() {
  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-10">Premium Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {brands.map((brand) => (
            <Link key={brand.name} href={brand.href} className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 h-32 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 group-hover:border-green-500 dark:group-hover:border-green-400">
                <div className="relative h-full w-full dark:bg-white dark:bg-opacity-90 dark:p-2 dark:rounded-lg">
                  {brand.logo && brand.logo.trim() !== "" ? (
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      fill
                      className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full text-lg font-bold text-gray-400">
                      {brand.name}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-center mt-2 font-medium text-gray-700 dark:text-gray-300">{brand.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
