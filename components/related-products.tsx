import Image from "next/image"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  category: string
  isNew?: boolean
  isSale?: boolean
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Premium WordPress Theme",
    price: 59,
    originalPrice: 89,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=200&width=200",
    category: "Themes",
    isSale: true,
  },
  {
    id: 2,
    name: "SEO Optimization Plugin",
    price: 39,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=200&width=200",
    category: "Plugins",
    isNew: true,
  },
  {
    id: 3,
    name: "E-commerce Solution",
    price: 129,
    originalPrice: 159,
    rating: 4.7,
    reviews: 203,
    image: "/placeholder.svg?height=200&width=200",
    category: "Solutions",
    isSale: true,
  },
  {
    id: 4,
    name: "Analytics Dashboard",
    price: 79,
    rating: 4.6,
    reviews: 156,
    image: "/placeholder.svg?height=200&width=200",
    category: "Tools",
  },
]

export function RelatedProducts() {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Related <span className="text-purple-600">Products</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enhance your WordPress experience with these carefully selected products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 bg-background/80 backdrop-blur hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && <Badge className="bg-green-500 hover:bg-green-600 text-white">New</Badge>}
                  {product.isSale && <Badge className="bg-red-500 hover:bg-red-600 text-white">Sale</Badge>}
                </div>

                {/* Wishlist Button */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-3 right-3 h-8 w-8 bg-white/80 hover:bg-white dark:bg-black/80 dark:hover:bg-black opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className="p-4 space-y-3">
                <div>
                  <Badge variant="secondary" className="text-xs mb-2">
                    {product.category}
                  </Badge>
                  <h3 className="font-semibold line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-purple-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950 rounded-full bg-transparent"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
