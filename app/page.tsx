import PromotionalCarousel from "@/components/promotional-carousel"
import EssentialItemsCarousel from "@/components/essential-items-carousel"
import CustomerSupportBanner from "@/components/customer-support-banner"
import FeaturedProducts from "@/components/featured-products"
import TopDeals from "@/components/top-deals"
import NewArrivals from "@/components/new-arrivals"
import PremiumBrands from "@/components/premium-brands"
import MobileCategoryNav from "@/components/mobile-category-nav"

export default function Home() {
  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Promotional Carousel */}
      <PromotionalCarousel />

      {/* Mobile Category Navigation - only visible on mobile */}
      <MobileCategoryNav />

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

      {/* Premium Brands */}
      <PremiumBrands />
    </div>
  )
}
