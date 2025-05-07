import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ChevronRight,
  CreditCard,
  Home,
  MapPin,
  ShoppingBag,
  Truck,
} from "lucide-react";

const CheckoutPage = () => {
  const [step, setStep] = useState<"address" | "payment" | "review">("address");
  const [progress, setProgress] = useState(33);

  // Mock data for cart items
  const cartItems = [
    {
      id: 1,
      name: "Canon EOS 1500D",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
      price: 35000,
      quantity: 1,
      isRental: false,
    },
    {
      id: 2,
      name: "Tripod Stand",
      image:
        "https://images.unsplash.com/photo-1610847499832-918a1c3c6811?w=400&q=80",
      price: 2500,
      quantity: 1,
      isRental: false,
    },
    {
      id: 3,
      name: "Sony Alpha A7 III",
      image:
        "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&q=80",
      price: 1500,
      quantity: 1,
      isRental: true,
      rentalDuration: 3,
      rentalDates: {
        start: "2023-07-15",
        end: "2023-07-18",
      },
    },
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => {
    if (item.isRental) {
      return acc + item.price * item.rentalDuration!;
    }
    return acc + item.price * item.quantity;
  }, 0);

  const taxes = subtotal * 0.18;
  const deliveryCharge = 200;
  const total = subtotal + taxes + deliveryCharge;

  const handleNextStep = () => {
    if (step === "address") {
      setStep("payment");
      setProgress(66);
    } else if (step === "payment") {
      setStep("review");
      setProgress(100);
    }
  };

  const handlePreviousStep = () => {
    if (step === "payment") {
      setStep("address");
      setProgress(33);
    } else if (step === "review") {
      setStep("payment");
      setProgress(66);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

        {/* Progress bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm">
            <span className={step === "address" ? "font-bold" : ""}>
              Address
            </span>
            <span className={step === "payment" ? "font-bold" : ""}>
              Payment
            </span>
            <span className={step === "review" ? "font-bold" : ""}>Review</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main checkout form */}
          <div className="lg:col-span-2">
            {step === "address" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="+91 9876543210"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        placeholder="560001"
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Main St"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="Bangalore"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        placeholder="Karnataka"
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="landmark">Landmark (Optional)</Label>
                      <Input
                        id="landmark"
                        placeholder="Near Post Office"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button onClick={handleNextStep}>
                      Continue to Payment
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === "payment" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue="upi" className="space-y-4">
                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex-1 cursor-pointer">
                        UPI (Google Pay, PhonePe, Paytm)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label
                        htmlFor="netbanking"
                        className="flex-1 cursor-pointer"
                      >
                        Net Banking
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        Cash on Delivery
                      </Label>
                    </div>
                  </RadioGroup>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Delivery Method</h3>
                    <RadioGroup defaultValue="home" className="space-y-4">
                      <div className="flex items-center space-x-2 border rounded-md p-4">
                        <RadioGroupItem value="home" id="home" />
                        <Label htmlFor="home" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <Truck className="h-5 w-5" />
                            <span>Home Delivery</span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-4">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label
                          htmlFor="pickup"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <Home className="h-5 w-5" />
                            <span>Pick-up from Store</span>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={handlePreviousStep}>
                      Back to Address
                    </Button>
                    <Button onClick={handleNextStep}>
                      Review Order
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === "review" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Review Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Shipping Address
                      </h3>
                      <p className="text-muted-foreground">
                        John Doe
                        <br />
                        123 Main St, Near Post Office
                        <br />
                        Bangalore, Karnataka - 560001
                        <br />
                        Phone: +91 9876543210
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Payment Method
                      </h3>
                      <p className="text-muted-foreground">
                        UPI (Google Pay, PhonePe, Paytm)
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Delivery Method
                      </h3>
                      <p className="text-muted-foreground">Home Delivery</p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Order Items</h3>
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex gap-4">
                            <div className="w-20 h-20 rounded-md overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-muted-foreground text-sm">
                                Quantity: {item.quantity}
                              </p>
                              {item.isRental && (
                                <div className="text-sm text-muted-foreground">
                                  <p>Rental: {item.rentalDuration} days</p>
                                  <p>
                                    From:{" "}
                                    {new Date(
                                      item.rentalDates.start,
                                    ).toLocaleDateString()}
                                  </p>
                                  <p>
                                    To:{" "}
                                    {new Date(
                                      item.rentalDates.end,
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                ₹
                                {item.isRental
                                  ? (
                                      item.price * item.rentalDuration!
                                    ).toLocaleString()
                                  : (
                                      item.price * item.quantity
                                    ).toLocaleString()}
                              </p>
                              {item.isRental && (
                                <p className="text-sm text-muted-foreground">
                                  ₹{item.price.toLocaleString()}/day
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={handlePreviousStep}>
                      Back to Payment
                    </Button>
                    <Button>Place Order</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Taxes (18% GST)
                    </span>
                    <span>₹{taxes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Delivery Charges
                    </span>
                    <span>₹{deliveryCharge.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Tabs defaultValue="items">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="items">
                        Items ({cartItems.length})
                      </TabsTrigger>
                      <TabsTrigger value="rental">Rental Info</TabsTrigger>
                    </TabsList>
                    <TabsContent value="items" className="mt-4 space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-2">
                          <div className="w-12 h-12 rounded-md overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 text-sm">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-sm">
                            ₹
                            {(item.isRental
                              ? item.price * item.rentalDuration!
                              : item.price * item.quantity
                            ).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="rental" className="mt-4">
                      {cartItems.some((item) => item.isRental) ? (
                        <div className="space-y-4">
                          {cartItems
                            .filter((item) => item.isRental)
                            .map((item) => (
                              <div
                                key={item.id}
                                className="border rounded-md p-3"
                              >
                                <p className="font-medium">{item.name}</p>
                                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                  <div>
                                    <p className="text-muted-foreground">
                                      Duration:
                                    </p>
                                    <p>{item.rentalDuration} days</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">
                                      Price/Day:
                                    </p>
                                    <p>₹{item.price.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">
                                      From:
                                    </p>
                                    <p>
                                      {new Date(
                                        item.rentalDates.start,
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">To:</p>
                                    <p>
                                      {new Date(
                                        item.rentalDates.end,
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-center py-4">
                          No rental items in your order
                        </p>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
