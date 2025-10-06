"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getCartItemCount } from "@/lib/data";

export function Navigation() {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartItemCount());
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const NavLinks = ({ mobile = false }) => (
    <>
      <Link 
        href="/products" 
        className={`${mobile ? 'block py-3 px-4 text-base border-b border-border' : 'text-sm'} font-medium hover:text-primary transition-colors`}
        onClick={mobile ? () => setMobileMenuOpen(false) : undefined}
      >
        Products
      </Link>
      <Link 
        href="/products?category=Workspace" 
        className={`${mobile ? 'block py-3 px-4 text-base border-b border-border' : 'text-sm'} font-medium hover:text-primary transition-colors`}
        onClick={mobile ? () => setMobileMenuOpen(false) : undefined}
      >
        Workspace
      </Link>
      <Link 
        href="/products?category=Gaming" 
        className={`${mobile ? 'block py-3 px-4 text-base border-b border-border' : 'text-sm'} font-medium hover:text-primary transition-colors`}
        onClick={mobile ? () => setMobileMenuOpen(false) : undefined}
      >
        Gaming
      </Link>
      <Link 
        href="/products?category=Audio" 
        className={`${mobile ? 'block py-3 px-4 text-base border-b border-border' : 'text-sm'} font-medium hover:text-primary transition-colors`}
        onClick={mobile ? () => setMobileMenuOpen(false) : undefined}
      >
        Audio
      </Link>
      <Link 
        href="/products?category=Smart Home" 
        className={`${mobile ? 'block py-3 px-4 text-base border-b border-border' : 'text-sm'} font-medium hover:text-primary transition-colors`}
        onClick={mobile ? () => setMobileMenuOpen(false) : undefined}
      >
        Smart Home
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Main Navigation Bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-10">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">WA</span>
            </div>
            <span className="text-lg lg:text-xl font-bold">WA Tech</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <NavLinks />
          </nav>

          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-1 max-w-sm mx-6">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Account */}
            <Link href="/admin" className="hidden sm:block">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="p-6 border-b">
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                      <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">WA</span>
                      </div>
                      <span className="text-xl font-bold">WA Tech</span>
                    </Link>
                  </div>

                  {/* Mobile Search */}
                  <div className="p-4 border-b">
                    <form onSubmit={handleSearch}>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search products..."
                          className="pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1">
                    <NavLinks mobile />
                  </nav>

                  {/* Mobile Footer */}
                  <div className="p-4 border-t">
                    <Link 
                      href="/admin" 
                      className="block py-3 px-4 text-base font-medium hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="inline h-5 w-5 mr-2" />
                      Admin Dashboard
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Mobile Search Bar (below header) */}
        <div className="md:hidden pb-4 border-b">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}