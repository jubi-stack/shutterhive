import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  X,
  Camera,
  Lightbulb,
  Package,
  SlidersHorizontal,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { Checkbox } from "../components/ui/checkbox";
import { Separator } from "../components/ui/separator";

interface Product {
  id: string;
  name: string;
  image: string;
  features: string[];
  price: number;
  category?: string;
  isRental?: boolean;
  rentalPrice?: number;
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [showRentalOnly, setShowRentalOnly] = useState(false);

  // Mock products data
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Canon EOS 1500D DSLR Camera",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
      features: [
        "24.1MP APS-C CMOS Sensor",
        "DIGIC 4+ Image Processor",
        "Full HD 1080p Video Recording",
      ],
      price: 35999,
      category: "camera",
      isRental: true,
      rentalPrice: 500,
    },
    {
      id: "2",
      name: "Sony Alpha a7 III Mirrorless Camera",
      image:
        "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=800&q=80",
      features: [
        "24.2MP Full-Frame Exmor R BSI CMOS Sensor",
        "4K Video Recording",
        "5-Axis SteadyShot INSIDE",
      ],
      price: 149990,
      category: "camera",
      isRental: true,
      rentalPrice: 2000,
    },
    {
      id: "3",
      name: "Manfrotto Professional Tripod",
      image:
        "https://images.unsplash.com/photo-1584824388173-6d975a254c9e?w=800&q=80",
      features: [
        "Carbon Fiber Construction",
        "Maximum Height: 175cm",
        "Load Capacity: 8kg",
      ],
      price: 12999,
      category: "accessory",
      isRental: true,
      rentalPrice: 200,
    },
    {
      id: "4",
      name: "Godox SL-60W LED Video Light",
      image:
        "https://images.unsplash.com/photo-1533425962554-8a7d3e36c944?w=800&q=80",
      features: [
        "60W Output",
        "5600K Color Temperature",
        "Wireless Remote Control",
      ],
      price: 9999,
      category: "lighting",
      isRental: true,
      rentalPrice: 150,
    },
    {
      id: "5",
      name: "DJI Ronin-S Gimbal Stabilizer",
      image:
        "https://images.unsplash.com/photo-1595073752802-7b1db8839501?w=800&q=80",
      features: [
        "3-Axis Stabilization",
        "8-Hour Battery Life",
        "Supports up to 8 lbs",
      ],
      price: 39999,
      category: "accessory",
      isRental: true,
      rentalPrice: 600,
    },
    {
      id: "6",
      name: "Nikon Z6 II Mirrorless Camera",
      image:
        "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=800&q=80",
      features: [
        "24.5MP BSI CMOS Sensor",
        "4K UHD Video Recording",
        "In-Body Image Stabilization",
      ],
      price: 164990,
      category: "camera",
      isRental: true,
      rentalPrice: 2200,
    },
    {
      id: "7",
      name: "SanDisk Extreme Pro 128GB SD Card",
      image:
        "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&q=80",
      features: [
        "Read Speed: up to 170MB/s",
        "Write Speed: up to 90MB/s",
        "UHS-I / V30 / U3 / Class 10",
      ],
      price: 2499,
      category: "accessory",
      isRental: false,
    },
    {
      id: "8",
      name: "Lowepro ProTactic 450 AW II Camera Backpack",
      image:
        "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=800&q=80",
      features: [
        "Fits 1-2 Pro DSLRs",
        "Holds 8 Lenses/Speed Lights",
        "Dedicated Laptop Compartment",
      ],
      price: 14999,
      category: "accessory",
      isRental: false,
    },
  ]);

  // Get unique categories
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ].filter(Boolean) as string[];

  // Apply filters
  const filteredProducts = products.filter((product) => {
    // Search query filter
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.features.some((feature) =>
        feature.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      product.category?.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      selectedCategories.length === 0 ||
      (product.category && selectedCategories.includes(product.category));

    // Price range filter
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    // Rental filter
    const matchesRental = !showRentalOnly || product.isRental;

    return matchesSearch && matchesCategory && matchesPrice && matchesRental;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default: // featured or any other case
        return 0;
    }
  });

  // Reset filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 200000]);
    setShowRentalOnly(false);
    setSortBy("featured");
  };

  // Category icon mapping
  const getCategoryIcon = (category?: string) => {
    switch (category?.toLowerCase()) {
      case "camera":
        return <Camera className="h-4 w-4" />;
      case "lighting":
        return <Lightbulb className="h-4 w-4" />;
      case "accessory":
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            ShutterHive Photography Equipment
          </h1>
          <p className="text-lg max-w-2xl">
            Professional gear for photographers of all levels. Buy or rent the
            latest cameras, lenses, and accessories.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Search and filter controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative w-full md:max-w-md">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown
                className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </Button>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active filters */}
        {(selectedCategories.length > 0 ||
          showRentalOnly ||
          sortBy !== "featured" ||
          priceRange[0] > 0 ||
          priceRange[1] < 200000) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm font-medium">Active filters:</span>

            {selectedCategories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {category}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setSelectedCategories((prev) =>
                      prev.filter((c) => c !== category),
                    )
                  }
                />
              </Badge>
            ))}

            {showRentalOnly && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Rental only
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setShowRentalOnly(false)}
                />
              </Badge>
            )}

            {(priceRange[0] > 0 || priceRange[1] < 200000) && (
              <Badge variant="secondary" className="flex items-center gap-1">
                ₹{priceRange[0].toLocaleString()} - ₹
                {priceRange[1].toLocaleString()}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setPriceRange([0, 200000])}
                />
              </Badge>
            )}

            {sortBy !== "featured" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Sort:{" "}
                {sortBy === "price-low"
                  ? "Price (Low to High)"
                  : sortBy === "price-high"
                    ? "Price (High to Low)"
                    : "Name"}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSortBy("featured")}
                />
              </Badge>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-sm"
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-card border rounded-lg p-4 mb-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                Filter Options
              </h3>
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Reset
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h4 className="font-medium mb-2">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories((prev) => [
                              ...prev,
                              category,
                            ]);
                          } else {
                            setSelectedCategories((prev) =>
                              prev.filter((c) => c !== category),
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="text-sm flex items-center gap-1 cursor-pointer"
                      >
                        {getCategoryIcon(category)}
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 200000]}
                    min={0}
                    max={200000}
                    step={1000}
                    value={priceRange}
                    onValueChange={(value) =>
                      setPriceRange(value as [number, number])
                    }
                    className="mb-6"
                  />
                  <div className="flex justify-between text-sm">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Rental Option */}
              <div>
                <h4 className="font-medium mb-2">Availability</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rental-only"
                    checked={showRentalOnly}
                    onCheckedChange={(checked) => setShowRentalOnly(!!checked)}
                  />
                  <label
                    htmlFor="rental-only"
                    className="text-sm cursor-pointer"
                  >
                    Show rental items only
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category quick filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={
                selectedCategories.includes(category) ? "default" : "outline"
              }
              size="sm"
              className="flex items-center gap-1"
              onClick={() => {
                if (selectedCategories.includes(category)) {
                  setSelectedCategories((prev) =>
                    prev.filter((c) => c !== category),
                  );
                } else {
                  setSelectedCategories((prev) => [...prev, category]);
                }
              }}
            >
              {getCategoryIcon(category)}
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {sortedProducts.length}{" "}
            {sortedProducts.length === 1 ? "product" : "products"}
          </p>
          <Separator className="mt-2" />
        </div>

        {/* Product grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <p className="text-xl text-muted-foreground mb-2">
              No products found matching your search.
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                features={product.features}
                price={product.price}
                isRental={product.isRental}
                rentalPrice={product.rentalPrice}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-16 py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">ShutterHive</h3>
              <p className="text-sm text-gray-600">
                Your one-stop shop for professional photography equipment. Buy
                or rent the latest gear for your creative projects.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    Rentals
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <address className="text-sm text-gray-600 not-italic">
                123 Photography Lane
                <br />
                Mumbai, Maharashtra 400001
                <br />
                India
                <br />
                <br />
                <a
                  href="tel:+919876543210"
                  className="text-blue-600 hover:underline"
                >
                  +91 98765 43210
                </a>
                <br />
                <a
                  href="mailto:info@shutterhive.com"
                  className="text-blue-600 hover:underline"
                >
                  info@shutterhive.com
                </a>
              </address>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} ShutterHive. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
