import PromotionalCarousel from "@/components/promotional-carousel"
import EssentialItemsCarousel from "@/components/essential-items-carousel"
import CustomerSupportBanner from "@/components/customer-support-banner"
import FeaturedProducts from "@/components/featured-products"
import TopDeals from "@/components/top-deals"
import NewArrivals from "@/components/new-arrivals"

export default function Home() {
  return (
    <div className="flex flex-col gap-12 py-6">
      {/* Promotional Carousel */}
      <PromotionalCarousel />

      {/* Customer Support Banner */}
      <CustomerSupportBanner />

      {/* Essential Items Carousel */}
      <section className="container">
        <EssentialItemsCarousel />
      </section>

      {/* Featured Products */}
      <section className="container">
        <FeaturedProducts />
      </section>

      {/* Top Deals */}
      <section className="container">
        <TopDeals />
      </section>

      {/* New Arrivals */}
      <section className="container">
        <NewArrivals />
      </section>
    </div>
  )
}
