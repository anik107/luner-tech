"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import MainLayout from "@/components/main-layout"
import { getCart, updateCartQuantity, removeFromCart, getCartTotal, clearCart, CartItem } from "@/lib/data"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { toast } from "sonner"


export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCart = () => {
      const items = getCart()
      setCartItems(items)
      setIsLoading(false)
    }

    loadCart()

    const handleCartUpdate = () => {
      loadCart()
    }

    window.addEventListener("cartUpdated", handleCartUpdate)
    return () => window.removeEventListener("cartUpdated", handleCartUpdate)
  }, [])

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const item = cartItems.find(item => item.product.id === productId)
    if (!item) return

    if (newQuantity <= 0) {
      handleRemoveItem(productId)
    } else if (newQuantity <= item.product.inventory) {
      updateCartQuantity(productId, newQuantity)
      toast.success("Quantity updated")
    } else {
      toast.error(`Only ${item.product.inventory} items available`)
    }
  }

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId)
    toast.success("Item removed from cart")
  }

  const handleClearCart = () => {
    clearCart()
    toast.success("Cart cleared")
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 99 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto max-w-screen-2xl px-4 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading your cart...</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto max-w-screen-2xl px-4 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Button asChild size="lg">
              <Link href="/products">
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Shopping Cart</h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          <Button variant="outline" onClick={handleClearCart} className="w-full sm:w-auto">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 sm:space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-border rounded-lg">
                      <div className="relative w-full h-48 sm:w-20 sm:h-20 overflow-hidden rounded-md flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-3 sm:space-y-2">
                        <div>
                          <Link href={`/products/${item.product.id}`}>
                            <h3 className="text-lg sm:text-base font-semibold hover:text-primary transition-colors cursor-pointer">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {item.product.category}
                          </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-center justify-center sm:justify-start space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 1)}
                              className="w-16 text-center"
                              min="1"
                              max={item.product.inventory}
                            />
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.inventory}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="text-center sm:text-right">
                            <div className="text-lg sm:text-base font-semibold">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ${item.product.price.toFixed(2)} each
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-destructive hover:text-destructive w-full sm:w-auto"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {subtotal < 99 && (
                  <div className="bg-muted p-3 rounded-lg text-sm">
                    <p>Add <strong>${(99 - subtotal).toFixed(2)}</strong> more for free shipping!</p>
                  </div>
                )}

                <div className="space-y-3">
                  <Button asChild size="lg" className="w-full">
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                  </Button>

                  <Button asChild variant="outline" size="lg" className="w-full">
                    <Link href="/products">
                      Continue Shopping
                    </Link>
                  </Button>
                </div>

                {/* Security Features */}
                <div className="pt-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>2-year warranty</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Products */}
        <section className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">You might also like</h2>
          <div className="text-center text-muted-foreground">
            <p className="mb-4">Recommended products will appear here based on your cart items.</p>
            <Button asChild className="w-full sm:w-auto" variant="outline">
              <Link href="/products">
                Browse All Products
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}