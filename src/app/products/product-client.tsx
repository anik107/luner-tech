"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import MainLayout from "@/components/main-layout";
import { getProducts, getCategories, addToCart, Product } from "@/lib/data";
import { Search, Filter, SlidersHorizontal, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const products = getProducts();
  const categories = getCategories();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    setSelectedCategories(category ? [category] : []);
    setSearchQuery(search || "");
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);

      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchQuery, selectedCategories, priceRange, sortBy]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(checked
      ? [...selectedCategories, category]
      : selectedCategories.filter(c => c !== category));
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange([0, 300]);
    setSortBy("name");
  };

  return (
    <MainLayout>
      <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">All Products</h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Discover our complete collection of modern electronics and gadgets
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Mobile Filters Overlay */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setShowFilters(false)} />
          )}
          
          {/* Filters Sidebar */}
          <aside className={`
            ${showFilters ? 'translate-x-0' : '-translate-x-full'} 
            lg:translate-x-0 
            fixed lg:static 
            inset-y-0 left-0 
            z-50 lg:z-auto 
            w-80 lg:w-80 
            bg-background 
            transition-transform duration-300 ease-in-out
            lg:block
            overflow-y-auto
          `}>
            <div className="bg-card rounded-lg border p-4 sm:p-6 h-full lg:h-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden"
                  >
                    ✕
                  </Button>
                </div>
              </div>

                {/* Search */}
                <div className="space-y-2 mb-6">
                    <label className="text-sm font-medium">Search</label>
                    <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                    </div>
                </div>

                <Separator className="mb-6" />

                {/* Categories */}
                <div className="space-y-4 mb-6">
                    <label className="text-sm font-medium">Categories</label>
                    <div className="space-y-2">
                    {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
                        />
                        <label htmlFor={category} className="text-sm">
                            {category}
                        </label>
                        </div>
                    ))}
                    </div>
                </div>

                <Separator className="mb-6" />

                {/* Price Range */}
                <div className="space-y-4">
                    <label className="text-sm font-medium">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={300}
                    step={10}
                    className="w-full"
                    />
                </div>
                </div>
            </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden w-full sm:w-auto"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <span className="text-sm text-muted-foreground text-center sm:text-left">
                  {filteredProducts.length} products found
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground hidden sm:block" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Sort by Name</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {product.featured && (
                        <Badge className="absolute top-3 left-3 text-xs">Featured</Badge>
                      )}
                      <Badge variant="secondary" className="absolute top-3 right-3 text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <div className="p-4 sm:p-6">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors cursor-pointer">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <span className="text-xl sm:text-2xl font-bold">
                          ${product.price.toFixed(2)}
                        </span>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                            <Link href={`/products/${product.id}`}>
                              View Details
                            </Link>
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                            className="w-full sm:w-auto"
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12 sm:py-16">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search criteria or filters
                </p>
                <Button onClick={clearFilters} className="w-full sm:w-auto">
                  Clear All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </MainLayout>
  );
}