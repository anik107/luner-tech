import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MainLayout from "@/components/main-layout"
import { CheckCircle, ArrowRight, Download, Mail } from "lucide-react"

export default function CheckoutSuccessPage() {
  // In a real app, you'd get this from URL params or API
  const orderNumber = "ORD-2024-" + Math.floor(Math.random() * 1000).toString().padStart(3, '0')

  return (
    <MainLayout>
      <div className="container mx-auto max-w-screen-2xl px-4 py-16">
        <div className="text-center">
          <CheckCircle className="h-24 w-24 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                <p className="text-2xl font-bold">{orderNumber}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                  <p className="font-semibold">3-5 Business Days</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Shipping Method</p>
                  <p className="font-semibold">Standard Shipping</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4 text-center">What's Next?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Order Confirmation</p>
                      <p className="text-sm text-muted-foreground">
                        You'll receive an email confirmation shortly with your order details.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Processing</p>
                      <p className="text-sm text-muted-foreground">
                        We'll prepare your order for shipment within 1-2 business days.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Shipping</p>
                      <p className="text-sm text-muted-foreground">
                        Track your package with the tracking number we'll send you.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                      4
                    </div>
                    <div>
                      <p className="font-medium">Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        Enjoy your new WA Tech products!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Receipt
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12 space-y-4">
            <p className="text-muted-foreground">
              Need help with your order? Contact our support team at{" "}
              <Link href="mailto:support@WAtech.com" className="text-primary hover:underline">
                support@WAtech.com
              </Link>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link href="/products">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild>
                <Link href="/">
                  Back to Home
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-md mx-auto mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-lg">Stay Updated</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Get exclusive deals and be the first to know about new products.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border border-border rounded-md text-sm"
                />
                <Button size="sm">Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}