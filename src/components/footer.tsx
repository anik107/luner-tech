import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">WA</span>
              </div>
              <span className="text-lg font-bold">WA Tech</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover cutting-edge electronics and gadgets designed for tech enthusiasts, 
              remote workers, and design-conscious consumers.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>hello@watech.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>1-800-WA-TECH</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Products</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products?category=Workspace" className="hover:text-foreground">Workspace</Link></li>
              <li><Link href="/products?category=Smart Home" className="hover:text-foreground">Smart Home</Link></li>
              <li><Link href="/products?category=Audio" className="hover:text-foreground">Audio</Link></li>
              <li><Link href="/products?category=Gaming" className="hover:text-foreground">Gaming</Link></li>
              <li><Link href="/products?category=Mobile" className="hover:text-foreground">Mobile</Link></li>
              <li><Link href="/products" className="hover:text-foreground">All Products</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">Customer Service</Link></li>
              <li><Link href="#" className="hover:text-foreground">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-foreground">Returns</Link></li>
              <li><Link href="#" className="hover:text-foreground">Warranty</Link></li>
              <li><Link href="#" className="hover:text-foreground">FAQ</Link></li>
              <li><Link href="#" className="hover:text-foreground">Contact Us</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="hover:text-foreground">Press</Link></li>
              <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
              <li><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 border-t border-border pt-6 sm:pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © 2024 WA Tech. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:space-x-4 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}