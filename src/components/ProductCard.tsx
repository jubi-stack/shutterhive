import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, CreditCard } from "lucide-react";

interface ProductCardProps {
  id?: string;
  name?: string;
  image?: string;
  features?: string[];
  price?: number;
  isRental?: boolean;
  rentalPrice?: number;
  onAddToCart?: () => void;
  onAddToWishlist?: () => void;
  onBuyNow?: () => void;
}

const ProductCard = ({
  id = "1",
  name = "Canon EOS 1500D DSLR Camera",
  image = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
  features = [
    "24.1MP APS-C CMOS Sensor",
    "DIGIC 4+ Image Processor",
    "Full HD 1080p Video Recording",
  ],
  price = 35999,
  isRental = false,
  rentalPrice = 500,
  onAddToCart = () => console.log("Added to cart"),
  onAddToWishlist = () => console.log("Added to wishlist"),
  onBuyNow = () => console.log("Buy now clicked"),
}: ProductCardProps) => {
  return (
    <Card className="w-full max-w-[300px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {isRental && (
          <Badge className="absolute top-2 right-2 bg-blue-500">
            Rental Available
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="text-lg font-semibold line-clamp-2 mb-2">{name}</h3>

        <ul className="text-sm text-gray-600 mb-3">
          {features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center mb-1">
              <span className="mr-2 text-xs">•</span>
              <span className="line-clamp-1">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-baseline mt-2">
          <span className="text-xl font-bold">₹{price.toLocaleString()}</span>
          {isRental && (
            <span className="ml-2 text-sm text-gray-500">
              (₹{rentalPrice}/day rental)
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2 justify-between">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={onAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Cart
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={onAddToWishlist}
        >
          <Heart className="h-4 w-4 mr-1" />
          Wishlist
        </Button>

        <Button
          variant="default"
          size="sm"
          className="flex-1"
          onClick={onBuyNow}
        >
          <CreditCard className="h-4 w-4 mr-1" />
          Buy
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
