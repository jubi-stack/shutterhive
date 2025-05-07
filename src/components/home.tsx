import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Menu,
  ShoppingCart,
  Heart,
  Package,
  Calendar,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import ProductCard from "./ProductCard";

interface HomeProps {
  isAuthenticated?: boolean;
}

const Home = ({ isAuthenticated = false }: HomeProps) => {
  // Mock featured products data
  const featuredProducts = [
    {
      id: "1",
      name: "Canon EOS 1500D",
      image:
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80",
      features: ["24.1 MP", "Full HD Video", "DIGIC 4+"],
      price: 35999,
      rentalPrice: 500,
    },
    {
      id: "2",
      name: "Sony Alpha A7 III",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
      features: ["24.2 MP", "4K Video", "15-Stop Dynamic Range"],
      price: 149990,
      rentalPrice: 1200,
    },
    {
      id: "3",
      name: "Nikon D850",
      image:
        "https://images.unsplash.com/photo-1617559746218-7b72f27b9f1f?w=800&q=80",
      features: ["45.7 MP", "4K UHD Video", "EXPEED 5"],
      price: 229990,
      rentalPrice: 1500,
    },
    {
      id: "4",
      name: "Professional Tripod",
      image:
        "https://images.unsplash.com/photo-1584715642381-6f1c4b452b1c?w=800&q=80",
      features: ["Aluminum", "Adjustable Height", "Ball Head"],
      price: 5999,
      rentalPrice: 100,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-10 w-full border-b bg-background">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          {/* Left - Menu Dropdown */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link to="/cart" className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Cart
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/wishlist" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Wishlist
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/rental" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Rental
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Orders
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Center - Logo */}
          <div className="flex items-center justify-center">
            <Link to="/" className="text-2xl font-bold tracking-tighter">
              ShutterHive
            </Link>
          </div>

          {/* Right - Auth */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
                        alt="User"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/logout" className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Professional Photography Equipment
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Buy or rent top-quality cameras, lenses, and accessories for
                your photography needs.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/rental">Rent Equipment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured Equipment
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Explore our most popular photography equipment available for
                purchase or rental.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Why Choose ShutterHive?
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                We offer the best photography equipment with flexible purchase
                and rental options.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background">
              <div className="p-2 bg-primary/10 rounded-full">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Quality Equipment</h3>
              <p className="text-muted-foreground text-center">
                All our products are carefully selected and maintained to ensure
                top performance.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background">
              <div className="p-2 bg-primary/10 rounded-full">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Flexible Rentals</h3>
              <p className="text-muted-foreground text-center">
                Rent equipment for the duration you need, from a single day to
                several weeks.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background">
              <div className="p-2 bg-primary/10 rounded-full">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Easy Purchase</h3>
              <p className="text-muted-foreground text-center">
                Simple checkout process with multiple payment options and fast
                delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Customer Feedback
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                See what our customers have to say about their experience with
                ShutterHive.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            <div className="flex flex-col space-y-4 border rounded-lg p-6 bg-background">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=john"
                    alt="John D."
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">John D.</p>
                  <p className="text-sm text-muted-foreground">
                    Professional Photographer
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The rental service at ShutterHive is exceptional. I was able to
                get a high-end camera for a weekend shoot without breaking the
                bank."
              </p>
            </div>
            <div className="flex flex-col space-y-4 border rounded-lg p-6 bg-background">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
                    alt="Sarah M."
                  />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Sarah M.</p>
                  <p className="text-sm text-muted-foreground">
                    Photography Student
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "As a student, I appreciate the affordable rental options. It
                allows me to practice with professional equipment that I
                couldn't otherwise afford."
              </p>
            </div>
            <div className="flex flex-col space-y-4 border rounded-lg p-6 bg-background">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=michael"
                    alt="Michael T."
                  />
                  <AvatarFallback>MT</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Michael T.</p>
                  <p className="text-sm text-muted-foreground">
                    Wedding Photographer
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "I purchased my main camera from ShutterHive and the experience
                was seamless. Fast delivery and excellent customer service."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">ShutterHive</h3>
              <p className="text-sm text-muted-foreground">
                Your one-stop shop for all photography equipment needs.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/products" className="hover:underline">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/rental" className="hover:underline">
                    Rental
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/terms" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/refund" className="hover:underline">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Feedback</h3>
              <form className="space-y-2">
                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium sr-only"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    placeholder="Your email"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    type="email"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium sr-only"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Your feedback"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
                  ></textarea>
                </div>
                <Button type="submit" size="sm" className="w-full">
                  Send Feedback
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ShutterHive. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
