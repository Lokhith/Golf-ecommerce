import { notFound } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react"
import ProductImageCarousel from "@/components/product-image-carousel"
import RelatedProducts from "@/components/related-products"

// Update the sample product data to include all products referenced elsewhere in the app
const products = [
  {
    id: 1,
    name: "TaylorMade Stealth Driver",
    price: 599.99,
    dealPrice: 499.99,
    category: "clubs",
    brand: "TaylorMade",
    description:
      "The TaylorMade Stealth Driver features a revolutionary 60X Carbon Twist Face that is 44% lighter than an equivalent titanium face, with a larger face area and a corrective face curvature designed to reduce side spin and deliver straighter shots. The Stealth Driver delivers high MOI performance with a heavy 16g weight positioned on the Inertia Generator. The Stealth Driver is designed with advanced aerodynamics for faster clubhead speed.",
    features: [
      "60X Carbon Twist Face for increased ball speed",
      "Nanotexture Cover for optimal launch and spin",
      "Inertia Generator for improved aerodynamics",
      "Thru-Slot Speed Pocket for enhanced face flexibility",
      "Adjustable loft sleeve for customized performance",
    ],
    specifications: {
      "Loft Options": "9°, 10.5°, 12°",
      Shaft: "Fujikura Ventus Red 5 (Regular, Stiff, X-Stiff)",
      Grip: "Lamkin Crossline 360",
      "Head Volume": "460cc",
      Length: "45.75 inches",
      "Swing Weight": "D4",
    },
    images: [
      "/stealth-driver-closeup.png",
      "/stealth-driver-back.png",
      "/stealth-driver-closeup.png",
      "/stealth-driver-sole.png",
    ],
    rating: 4.8,
    reviewCount: 124,
    stock: 15,
    sizes: null,
  },
  {
    id: 2,
    name: "Titleist Pro V1 Golf Balls (Dozen)",
    price: 54.99,
    dealPrice: 49.99,
    category: "balls",
    brand: "Titleist",
    description:
      "The Titleist Pro V1 is the #1 golf ball in golf and is designed for total performance for every player and provides total performance from tee to green with the combination of longer distance, very low long game spin, penetrating flight, Drop-and-Stop™ short game control and very soft feel.",
    features: [
      "Reformulated 2.0 ZG Process Core for longer distance",
      "Faster High-Flex Casing Layer for low long game spin and high short game spin",
      "New, softer cast urethane elastomer cover system for more greenside spin",
      "Spherically-tiled 388 tetrahedral dimple design for optimized aerodynamics",
      "Exceptional Drop-and-Stop™ control",
    ],
    specifications: {
      Construction: "3-piece",
      Cover: "Cast Urethane Elastomer",
      "Dimple Design": "388 Tetrahedral",
      Color: "White",
      Quantity: "12 balls per box",
    },
    images: [
      "/golf-ball-box.png",
      "/single-prov1.png",
      "/golf-ball-display.png",
      "/titleist-prov1-detail.png",
    ],
    rating: 4.9,
    reviewCount: 342,
    stock: 50,
    sizes: null,
  },
  {
    id: 3,
    name: "FootJoy Pro SL Golf Shoes",
    price: 169.99,
    dealPrice: 149.99,
    category: "shoes",
    brand: "FootJoy",
    description:
      "The FootJoy Pro SL golf shoes feature a premium ChromoSkin™ leather system by Pittards® that is lightweight, durable and completely waterproof. The Pro SL utilizes a dual-density midsole where a firmer perimeter provides stability and a softer interior cushions your foot. The Infinity outsole features 30% more points of traction for maximum stability.",
    features: [
      "ChromoSkin™ leather system by Pittards® for waterproof protection",
      "Dual-density FTF midsole for stability and comfort",
      "Infinity outsole with 30% more points of traction",
      "Laser Plus Fit provides a full rounded toe with a slightly narrower heel",
      "1-year waterproof warranty",
    ],
    specifications: {
      Upper: "ChromoSkin™ leather by Pittards®",
      Midsole: "Fine-Tuned Foam (FTF)",
      Outsole: "TPU Infinity",
      Waterproof: "Yes (1-year warranty)",
      Closure: "Lace-up",
    },
    images: [
      "/footjoy-pro-sl-side-view.png",
      "/footjoy-pro-sl-top-view.png",
      "/placeholder.svg?height=600&width=600&query=footjoy+pro+sl+golf+shoes+sole",
      "/placeholder.svg?height=600&width=600&query=footjoy+pro+sl+golf+shoes+back",
    ],
    rating: 4.7,
    reviewCount: 215,
    stock: 20,
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"],
  },
  {
    id: 4,
    name: "Callaway Rogue ST Max Irons",
    price: 899.99,
    dealPrice: 799.99,
    category: "clubs",
    brand: "Callaway",
    description:
      "The Callaway Rogue ST MAX Irons deliver an extraordinary level of performance and forgiveness. These game-improvement irons feature high-strength 450 steel faces and our A.I. designed Flash Face Cup for increased ball speeds. The refined high-strength 450 steel face cup is combined with our A.I. designed Flash Face Cup for increased ball speeds.",
    features: [
      "A.I. designed Flash Face Cup for increased ball speeds",
      "Precision tungsten weighting for optimal launch and control",
      "Urethane microspheres for improved sound and feel",
      "High launch with strong lofts for increased distance",
      "Refined sole design for improved turf interaction",
    ],
    specifications: {
      "Set Composition": "4-PW, AW",
      Shaft: "True Temper Elevate MPH 95 (Steel) / Mitsubishi Tensei AV Blue (Graphite)",
      Grip: "Golf Pride Tour Velvet 360",
      "Face Material": "High-strength 450 steel",
      "Loft (7-iron)": "30°",
    },
    images: [
      "/placeholder.svg?height=600&width=600&query=callaway+rogue+st+max+irons+set",
      "/placeholder.svg?height=600&width=600&query=callaway+rogue+st+max+irons+single",
      "/placeholder.svg?height=600&width=600&query=callaway+rogue+st+max+irons+address",
      "/placeholder.svg?height=600&width=600&query=callaway+rogue+st+max+irons+back",
    ],
    rating: 4.8,
    reviewCount: 156,
    stock: 5,
    sizes: null,
  },
  {
    id: 5,
    name: "Nike Dri-FIT Golf Polo",
    price: 65.0,
    dealPrice: 55.0,
    category: "apparels",
    brand: "Nike",
    description:
      "The Nike Dri-FIT Golf Polo is made with sweat-wicking fabric to help keep you dry and comfortable on the course. The standard fit is relaxed through the chest, waist and arms, and the fabric has a bit of stretch to help you move naturally.",
    features: [
      "Dri-FIT technology helps you stay dry and comfortable",
      "Standard fit for a relaxed, easy feel",
      "Fold-over collar provides a classic look",
      "2-button placket lets you adjust your coverage",
      "Fabric: 100% polyester",
    ],
    specifications: {
      Material: "100% polyester",
      Fit: "Standard",
      Collar: "Fold-over",
      Closure: "2-button placket",
      Care: "Machine wash",
    },
    images: [
      "/placeholder.svg?height=600&width=600&query=nike+dri+fit+golf+polo+front",
      "/placeholder.svg?height=600&width=600&query=nike+dri+fit+golf+polo+back",
      "/placeholder.svg?height=600&width=600&query=nike+dri+fit+golf+polo+detail",
      "/placeholder.svg?height=600&width=600&query=nike+dri+fit+golf+polo+collar",
    ],
    rating: 4.6,
    reviewCount: 178,
    stock: 35,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  // Add products with IDs 6, 7, and 8 for completeness
  {
    id: 6,
    name: "Ping Hoofer Lite Stand Bag",
    price: 249.99,
    dealPrice: 229.99,
    category: "bags",
    brand: "Ping",
    description:
      "The Ping Hoofer Lite Stand Bag is the perfect combination of comfort, convenience, and style. Weighing just 4.5 pounds, this lightweight bag features a 4-way top with full-length dividers, seven pockets, and a comfortable dual strap system for easy carrying around the course.",
    features: [
      "Lightweight design at only 4.5 pounds",
      "4-way top with full-length dividers",
      "Seven pockets including a water-resistant valuables pocket",
      "Dual strap system for comfortable carrying",
      "Integrated stand mechanism with non-slip foot pads",
    ],
    specifications: {
      Weight: "4.5 pounds",
      "Top Dividers": "4-way with full-length dividers",
      Pockets: "7 total pockets",
      "Strap System": "Dual strap",
      Material: "High-denier polyester",
    },
    images: [
      "/placeholder.svg?height=600&width=600&query=ping+hoofer+lite+stand+bag+front",
      "/placeholder.svg?height=600&width=600&query=ping+hoofer+lite+stand+bag+side",
      "/placeholder.svg?height=600&width=600&query=ping+hoofer+lite+stand+bag+top",
      "/placeholder.svg?height=600&width=600&query=ping+hoofer+lite+stand+bag+pocket",
    ],
    rating: 4.7,
    reviewCount: 112,
    stock: 12,
    sizes: null,
  },
  {
    id: 7,
    name: "Golf Pride MCC Plus4 Grip",
    price: 11.99,
    dealPrice: 9.99,
    category: "grips",
    brand: "Golf Pride",
    description:
      "The Golf Pride MCC Plus4 Grip features an innovative hybrid design with a larger lower hand and new softer rubber material that simulates 4 extra wraps of tape for lighter grip pressure and increased power. The upper hand features brushed cotton cord for moisture management and improved traction.",
    features: [
      "Hybrid design with rubber and brushed cotton cord",
      "Larger lower hand diameter reduces grip tension",
      "Simulates 4 extra wraps of tape",
      "Brushed cotton cord in upper hand for moisture management",
      "Available in multiple colors",
    ],
    specifications: {
      Material: "Hybrid rubber and cotton cord",
      "Core Size": ".580 or .600",
      Weight: "52g",
      Texture: "Medium",
      "Grip Size": "Standard, Midsize, Jumbo",
    },
    images: [
      "/placeholder.svg?height=600&width=600&query=golf+pride+mcc+plus4+grip+front",
      "/placeholder.svg?height=600&width=600&query=golf+pride+mcc+plus4+grip+back",
      "/placeholder.svg?height=600&width=600&query=golf+pride+mcc+plus4+grip+detail",
      "/placeholder.svg?height=600&width=600&query=golf+pride+mcc+plus4+grip+installed",
    ],
    rating: 4.8,
    reviewCount: 245,
    stock: 0,
    sizes: null,
  },
  {
    id: 8,
    name: "Clicgear 4.0 Push Cart",
    price: 259.99,
    dealPrice: 239.99,
    category: "trolleys",
    brand: "Clicgear",
    description:
      "The Clicgear 4.0 Push Cart is the latest version of the award-winning Clicgear cart. This durable, lightweight cart features a compact fold, hand brake, maintenance-free airless tires, and a variety of accessory mounts to customize your cart to your needs.",
    features: [
      "Compact fold for easy storage and transport",
      "Hand brake for secure parking on slopes",
      "Maintenance-free airless tires",
      "Multiple accessory mounts",
      "Adjustable bag straps for secure bag attachment",
    ],
    specifications: {
      "Folded Dimensions": '13" x 15" x 24"',
      Weight: "18 pounds",
      "Wheel Size": "9 inches",
      "Storage Net": "Included",
      "Cup Holder": "Included",
    },
    images: [
      "/placeholder.svg?height=600&width=600&query=clicgear+4.0+push+cart+side",
      "/placeholder.svg?height=600&width=600&query=clicgear+4.0+push+cart+folded",
      "/placeholder.svg?height=600&width=600&query=clicgear+4.0+push+cart+handle",
      "/placeholder.svg?height=600&width=600&query=clicgear+4.0+push+cart+wheel",
    ],
    rating: 4.9,
    reviewCount: 189,
    stock: 3,
    sizes: null,
  },
  // Add the missing products with IDs 9 and 10
  {
    id: 9,
    name: "Titleist TSi2 Fairway Wood",
    price: 349.99,
    dealPrice: 299.99,
    category: "clubs",
    brand: "Titleist",
    description:
      "The Titleist TSi2 Fairway Wood is designed for maximum forgiveness across the face with optimal launch and mid spin. The active recoil channel produces more speed and the high MOI design provides stability and forgiveness. The refined crown and face thicknesses deliver enhanced speed and optimal weight distribution.",
    features: [
      "Active Recoil Channel for increased ball speed",
      "High MOI design for stability and forgiveness",
      "Optimized weight distribution for higher launch",
      "SureFit hosel with 16 independent loft and lie settings",
      "Premium aftermarket shafts as stock options",
    ],
    specifications: {
      "Loft Options": "13.5°, 15°, 16.5°, 18°, 21°",
      "Stock Shaft": "Tensei AV Blue, HZRDUS Smoke Black RDX, Tensei AV White",
      Grip: "Golf Pride Tour Velvet 360",
      "Head Material": "455 Carpenter Steel",
      Adjustability: "SureFit hosel with 16 settings",
    },
    images: [
      "/placeholder.svg?height=600&width=600&query=titleist+tsi2+fairway+wood+front",
      "/placeholder.svg?height=600&width=600&query=titleist+tsi2+fairway+wood+back",
      "/placeholder.svg?height=600&width=600&query=titleist+tsi2+fairway+wood+sole",
      "/placeholder.svg?height=600&width=600&query=titleist+tsi2+fairway+wood+address",
    ],
    rating: 4.8,
    reviewCount: 132,
    stock: 8,
    sizes: null,
  },
  {
    id: 10,
    name: "Adidas Tour360 22 Golf Shoes",
    price: 199.99,
    dealPrice: 179.99,
    category: "shoes",
    brand: "Adidas",
    description:
      "The Adidas Tour360 22 Golf Shoes represent the pinnacle of golf footwear technology. These premium shoes feature a waterproof upper, BOOST midsole for energy return, and a new SPIKEMORE traction system for exceptional stability during your swing. The shoes also include a new DUALSTACK midsole that combines BOOST and EVA for the perfect balance of comfort and stability.",
    features: [
      "Premium waterproof leather upper",
      "BOOST midsole for energy return and comfort",
      "SPIKEMORE traction system for exceptional stability",
      "DUALSTACK midsole combining BOOST and EVA",
      "360WRAP design for locked-in stability",
    ],
    specifications: {
      Upper: "Premium waterproof leather",
      Midsole: "BOOST and EVA DUALSTACK",
      Outsole: "SPIKEMORE traction system",
      Waterproof: "Yes (1-year warranty)",
      Closure: "Traditional lace-up",
    },
    images: [
      "/placeholder.svg?height=600&width=600&query=adidas+tour360+22+golf+shoes+side",
      "/placeholder.svg?height=600&width=600&query=adidas+tour360+22+golf+shoes+top",
      "/placeholder.svg?height=600&width=600&query=adidas+tour360+22+golf+shoes+sole",
      "/placeholder.svg?height=600&width=600&query=adidas+tour360+22+golf+shoes+back",
    ],
    rating: 4.9,
    reviewCount: 178,
    stock: 15,
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"],
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  // Convert the string ID from params to a number to match our product data
  const productId = Number.parseInt(params.id, 10)

  // Find the product by numeric ID
  const product = products.find((p) => p.id === productId)

  if (!product) {
    notFound()
  }

  const discount = product.dealPrice ? Math.round(((product.price - product.dealPrice) / product.price) * 100) : 0

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <ProductImageCarousel images={product.images} />

        <div className="flex flex-col">
          <div className="mb-2 text-muted-foreground">{product.brand}</div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-green-700">
              ${product.dealPrice?.toFixed(2) || product.price.toFixed(2)}
            </span>
            {product.dealPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-muted-foreground mb-6">
            {product.description.split(".")[0]}. {product.description.split(".")[1]}.
          </p>

          {product.sizes && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button key={size} variant="outline" className="h-10 px-4 rounded-md">
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" className="rounded-none">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">1</span>
              <Button variant="ghost" size="icon" className="rounded-none">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">{product.stock} items available</div>
          </div>

          <div className="flex gap-4 mb-8">
            <Button className="flex-1 bg-green-700 hover:bg-green-800">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to Wishlist</span>
            </Button>
          </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p className="text-muted-foreground">{product.description}</p>
            </TabsContent>
            <TabsContent value="features" className="pt-4">
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specifications" className="pt-4">
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="py-2 border-b">
                    <span className="font-medium">{key}:</span> {value}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <RelatedProducts category={product.category} currentProductId={product.id.toString()} />
    </div>
  )
}
