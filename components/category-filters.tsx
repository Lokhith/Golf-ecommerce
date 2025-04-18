"use client"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatIndianRupees } from "@/lib/utils"

interface CategoryFiltersProps {
  category: string
  priceRange: number[]
  setPriceRange: (value: number[]) => void
  sortOption: string
  setSortOption: (value: string) => void
  discountFilter: string[]
  setDiscountFilter: (value: string[]) => void
}

export default function CategoryFilters({
  category,
  priceRange,
  setPriceRange,
  sortOption,
  setSortOption,
  discountFilter,
  setDiscountFilter,
}: CategoryFiltersProps) {
  // Maximum price in INR for the slider (approximately $1000 converted to INR)
  const maxPrice = 100000

  // Handle discount filter changes
  const handleDiscountChange = (discount: string) => {
    setDiscountFilter((prev) => {
      if (prev.includes(discount)) {
        return prev.filter((d) => d !== discount)
      } else {
        return [...prev, discount]
      }
    })
  }

  // Sample brands for each category
  const brandsByCategory: Record<string, string[]> = {
    clubs: ["TaylorMade", "Callaway", "Titleist", "Ping", "Cobra", "Mizuno"],
    balls: ["Titleist", "Callaway", "TaylorMade", "Bridgestone", "Srixon"],
    shoes: ["FootJoy", "Adidas", "Nike", "Puma", "Ecco", "Under Armour"],
    apparels: ["Nike", "Adidas", "Under Armour", "Puma", "FootJoy", "Callaway"],
    "daily-needs": ["Titleist", "FootJoy", "Callaway", "TaylorMade"],
    grips: ["Golf Pride", "Lamkin", "SuperStroke", "Winn", "Iomic"],
    trolleys: ["Clicgear", "Bag Boy", "Sun Mountain", "Stewart Golf", "Motocaddy"],
    training: ["PuttOut", "Orange Whip", "SuperSpeed", "SKLZ", "Perfect Practice"],
    bags: ["Ping", "Titleist", "Callaway", "TaylorMade", "Sun Mountain", "Ogio"],
  }

  const brands = brandsByCategory[category] || []

  // Additional category-specific filters
  const renderCategorySpecificFilters = () => {
    if (category === "clubs") {
      return (
        <AccordionItem value="club-type">
          <AccordionTrigger>Club Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="club-drivers" />
                <Label htmlFor="club-drivers">Drivers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="club-irons" />
                <Label htmlFor="club-irons">Irons</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="club-wedges" />
                <Label htmlFor="club-wedges">Wedges</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="club-putters" />
                <Label htmlFor="club-putters">Putters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="club-fairway" />
                <Label htmlFor="club-fairway">Fairway Woods</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="club-hybrids" />
                <Label htmlFor="club-hybrids">Hybrids</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      )
    }

    if (category === "shoes") {
      return (
        <AccordionItem value="shoe-size">
          <AccordionTrigger>Shoe Size</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2">
              {[7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13].map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox id={`size-${size}`} />
                  <Label htmlFor={`size-${size}`}>{size}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      )
    }

    if (category === "apparels") {
      return (
        <AccordionItem value="apparel-size">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox id={`size-${size}`} />
                  <Label htmlFor={`size-${size}`}>{size}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      )
    }

    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Sort By</h3>
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="name-asc">Name: A-Z</SelectItem>
            <SelectItem value="name-desc">Name: Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Accordion type="multiple" defaultValue={["price", "discount"]}>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, maxPrice]}
                max={maxPrice}
                step={1000}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex items-center justify-between">
                <span>{formatIndianRupees(priceRange[0])}</span>
                <span>{formatIndianRupees(priceRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {renderCategorySpecificFilters()}

        <AccordionItem value="discount">
          <AccordionTrigger>Discount</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="discount-10"
                  checked={discountFilter.includes("10")}
                  onCheckedChange={() => handleDiscountChange("10")}
                />
                <Label htmlFor="discount-10">10% or more</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="discount-20"
                  checked={discountFilter.includes("20")}
                  onCheckedChange={() => handleDiscountChange("20")}
                />
                <Label htmlFor="discount-20">20% or more</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="discount-30"
                  checked={discountFilter.includes("30")}
                  onCheckedChange={() => handleDiscountChange("30")}
                />
                <Label htmlFor="discount-30">30% or more</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="discount-40"
                  checked={discountFilter.includes("40")}
                  onCheckedChange={() => handleDiscountChange("40")}
                />
                <Label htmlFor="discount-40">40% or more</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="discount-50"
                  checked={discountFilter.includes("50")}
                  onCheckedChange={() => handleDiscountChange("50")}
                />
                <Label htmlFor="discount-50">50% or more</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
