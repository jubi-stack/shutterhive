import React, { useState } from "react";
import { Search } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Input } from "../components/ui/input";

interface Product {
  id: string;
  name: string;
  image: string;
  features: string[];
  price: number;
  category?: string;
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");

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
    },
  ]);

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.features.some((feature) =>
        feature.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      product.category?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation bar would typically be included in a layout component */}

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Photography Equipment</h1>
          <div className="relative w-full max-w-xs">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No products found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                features={product.features}
                price={product.price}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer would typically be included in a layout component */}
    </div>
  );
}
