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
