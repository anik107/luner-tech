"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart, Search, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { getCartItemCount } from "@/lib/data"
import { Card, CardContent } from "./ui/card"

const categories = [
  "Workspace",
  "Smart Home", 
  "Audio",
  "Gaming",
  "Peripherals",
  "Storage",
  "Mobile",
  "Wearables",
  "Accessories"
]

export default function Header() {
  const [cartItemCount, setCartItemCount] = React.useState(0)
  const [searchQuery, setSearchQuery] = React.useState("")
  const router = useRouter()

  React.useEffect(() => {
    const updateCartCount = () => {
      setCartItemCount(getCartItemCount())
    }

    updateCartCount()
    window.addEventListener("cartUpdated", updateCartCount)

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="flex flex-col space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">LT</span>
            </div>
            <span className="text-lg font-bold">WA Tech</span>
          </Link>
          
          <div className="space-y-2">
            <Link href="/products" className="block py-2 text-sm hover:text-primary">
              All Products
            </Link>
            {categories.map((category) => (
              <Link 
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="block py-2 text-sm hover:text-primary pl-4"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center px-4">
        <div className="flex items-center space-x-4 lg:space-x-6">
          <MobileNav />
          
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">LT</span>
            </div>
            <span className="hidden sm:block text-lg font-bold">WA Tech</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <div className="col-span-1">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/products"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">All Products</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Browse our complete collection of modern electronics and gadgets
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                    <div className="col-span-1 space-y-1">
                      {categories.slice(0, 6).map((category) => (
                        <NavigationMenuLink key={category} asChild>
                          <Link
                            href={`/products?category=${encodeURIComponent(category)}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <Card className="transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                              <CardContent className="p-6 text-center">
                                <h3 className="font-semibold group-hover:text-primary transition-colors">
                                  {category}
                                </h3>
                              </CardContent>
                            </Card>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <form onSubmit={handleSearch} className="hidden sm:flex items-center space-x-2 max-w-sm w-full">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <Button variant="ghost" size="icon" className="relative">
            <Link href="/cart" className="flex items-center">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Link>
          </Button>

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}