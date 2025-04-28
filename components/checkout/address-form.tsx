"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Home, Briefcase } from "lucide-react"

// List of Indian states
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
]

interface AddressFormProps {
  onSubmit: (address: {
    name: string
    mobile: string
    pincode: string
    locality: string
    address: string
    city: string
    state: string
    landmark?: string
    alternatePhone?: string
    addressType: "home" | "work"
  }) => void
  onCancel: () => void
}

export default function AddressForm({ onSubmit, onCancel }: AddressFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    addressType: "home" as "home" | "work",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Validation for mobile number (only numbers, max 10 digits)
    if (name === "mobile" || name === "alternatePhone") {
      if (value && !/^\d*$/.test(value)) {
        return
      }
      if (value.length > 10) {
        return
      }
    }

    // Validation for pincode (only numbers, max 6 digits)
    if (name === "pincode") {
      if (value && !/^\d*$/.test(value)) {
        return
      }
      if (value.length > 6) {
        return
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleStateChange = (value: string) => {
    setFormData((prev) => ({ ...prev, state: value }))

    // Clear error when user selects
    if (errors.state) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.state
        return newErrors
      })
    }
  }

  const handleAddressTypeChange = (value: "home" | "work") => {
    setFormData((prev) => ({ ...prev, addressType: value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Required fields
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required"
    else if (formData.mobile.length !== 10) newErrors.mobile = "Mobile number must be 10 digits"

    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required"
    else if (formData.pincode.length !== 6) newErrors.pincode = "Pincode must be 6 digits"

    if (!formData.locality.trim()) newErrors.locality = "Locality is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state) newErrors.state = "State is required"

    // Validate alternate phone if provided
    if (formData.alternatePhone && formData.alternatePhone.length !== 10) {
      newErrors.alternatePhone = "Alternate mobile number must be 10 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    } else {
      toast({
        title: "Please check your information",
        description: "Some required fields are missing or invalid.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`${errors.name ? "border-red-500 focus-visible:ring-red-300" : "focus-visible:ring-green-300"} transition-all`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobile" className="text-sm font-medium">
            Mobile Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            className={`${errors.mobile ? "border-red-500 focus-visible:ring-red-300" : "focus-visible:ring-green-300"} transition-all`}
          />
          {errors.mobile && <p className="text-xs text-red-500">{errors.mobile}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div className="space-y-2">
          <Label htmlFor="pincode" className="text-sm font-medium">
            Pincode <span className="text-red-500">*</span>
          </Label>
          <Input
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="6-digit pincode"
            className={`${errors.pincode ? "border-red-500 focus-visible:ring-red-300" : "focus-visible:ring-green-300"} transition-all`}
          />
          {errors.pincode && <p className="text-xs text-red-500">{errors.pincode}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="locality" className="text-sm font-medium">
            Locality <span className="text-red-500">*</span>
          </Label>
          <Input
            id="locality"
            name="locality"
            value={formData.locality}
            onChange={handleChange}
            placeholder="Colony, Street, Locality"
            className={`${errors.locality ? "border-red-500 focus-visible:ring-red-300" : "focus-visible:ring-green-300"} transition-all`}
          />
          {errors.locality && <p className="text-xs text-red-500">{errors.locality}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium">
          Address (Area and Street) <span className="text-red-500">*</span>
        </Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={`${errors.address ? "border-red-500 focus-visible:ring-red-300" : "focus-visible:ring-green-300"} transition-all`}
          placeholder="House no., Building name, Street name"
        />
        {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium">
            City/District/Town <span className="text-red-500">*</span>
          </Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`${errors.city ? "border-red-500 focus-visible:ring-red-300" : "focus-visible:ring-green-300"} transition-all`}
            placeholder="Enter your city"
          />
          {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state" className="text-sm font-medium">
            State <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.state} onValueChange={handleStateChange}>
            <SelectTrigger
              id="state"
              className={`${errors.state ? "border-red-500 focus-visible:ring-red-300" : "focus-visible:ring-green-300"} transition-all`}
            >
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {INDIAN_STATES.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.state && <p className="text-xs text-red-500">{errors.state}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div className="space-y-2">
          <Label htmlFor="landmark" className="text-sm font-medium">
            Landmark (Optional)
          </Label>
          <Input
            id="landmark"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            placeholder="Nearby landmark"
            className="focus-visible:ring-green-300 transition-all"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="alternatePhone" className="text-sm font-medium">
            Alternate Mobile (Optional)
          </Label>
          <Input
            id="alternatePhone"
            name="alternatePhone"
            value={formData.alternatePhone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            className={`${errors.alternatePhone ? "border-red-500 focus-visible:ring-red-300" : "focus-visible:ring-green-300"} transition-all`}
          />
          {errors.alternatePhone && <p className="text-xs text-red-500">{errors.alternatePhone}</p>}
        </div>
      </div>

      <div className="space-y-2 bg-muted/30 p-3 md:p-4 rounded-lg">
        <Label className="text-sm font-medium">
          Address Type <span className="text-red-500">*</span>
        </Label>
        <RadioGroup
          value={formData.addressType}
          onValueChange={handleAddressTypeChange as (value: string) => void}
          className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-2"
        >
          <div className="flex items-center space-x-2 border rounded-md p-2 md:p-3 bg-white dark:bg-gray-800 cursor-pointer hover:border-green-300 dark:hover:border-green-700 transition-colors">
            <RadioGroupItem value="home" id="home" />
            <Label htmlFor="home" className="flex items-center cursor-pointer">
              <Home className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
              Home (All day delivery)
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-2 md:p-3 bg-white dark:bg-gray-800 cursor-pointer hover:border-green-300 dark:hover:border-green-700 transition-colors">
            <RadioGroupItem value="work" id="work" />
            <Label htmlFor="work" className="flex items-center cursor-pointer">
              <Briefcase className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
              Work (Delivery between 10AM - 6PM)
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-green-700 hover:bg-green-800 text-white shadow-sm hover:shadow-md transition-all"
        >
          Save and Deliver Here
        </Button>
      </div>
    </form>
  )
}
