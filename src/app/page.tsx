import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import MainLayout from "@/components/main-layout"
import { getFeaturedProducts, getCategories } from "@/lib/data"
import { ArrowRight, Star, Zap, Shield, Truck } from "lucide-react"

const heroSlides = [
  {
    title: "The Future of Workspace Technology",
    description: "Discover our revolutionary workspace solutions designed for modern professionals",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=600&fit=crop",
    cta: "Shop Workspace",
    link: "/products?category=Workspace"
  },
  {
    title: "Smart Home Revolution",
    description: "Transform your living space with AI-powered devices and seamless automation",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=600&fit=crop",
    cta: "Explore Smart Home",
    link: "/products?category=Smart Home"
  },
  {
    title: "Immersive Audio Experience",
    description: "Premium audio solutions for music lovers and content creators",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1200&h=600&fit=crop",
    cta: "Shop Audio",
    link: "/products?category=Audio"
  }
]

const features = [
  {
    icon: Zap,
    title: "Cutting-Edge Tech",
    description: "Latest innovations in consumer electronics"
  },
  {
    icon: Shield,
    title: "2-Year Warranty",
    description: "Comprehensive protection on all products"
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary delivery on orders over $99"
  },
  {
    icon: Star,
    title: "Expert Support",
    description: "Dedicated customer service team"
  }
]

export default function Home() {
  const featuredProducts = getFeaturedProducts()
  const categories = getCategories()

  return (
    <MainLayout>
      {/* Hero Section with Carousel */}
      <section className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[600px] flex items-center justify-center">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200">
                      {slide.description}
                    </p>
                    <Button asChild size="lg" className="text-lg px-8 py-6">
                      <Link href={slide.link}>
                        {slide.cta}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-screen-2xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto max-w-screen-2xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of cutting-edge electronics and gadgets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 left-4">Featured</Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      <Button asChild>
                        <Link href={`/products/${product.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-screen-2xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-xl text-muted-foreground">
              Find the perfect tech solutions for your lifestyle
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="group"
              >
                <Card className="transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {category}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto max-w-screen-2xl px-4">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Upgrade Your Tech?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied customers who trust Lunar Tech for their technology needs
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/products">
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
