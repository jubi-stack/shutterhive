import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Users,
  Package,
  LogOut,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  features: string;
  price: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  orders: number;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);
  const [showEditProductDialog, setShowEditProductDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for products
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Canon EOS 1500D",
      imageUrl:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
      features: "DSLR Camera, 24.1MP, Full HD Video",
      price: 35000,
    },
    {
      id: "2",
      name: "Sony Alpha A7 III",
      imageUrl:
        "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&q=80",
      features: "Mirrorless Camera, 24.2MP, 4K Video",
      price: 150000,
    },
    {
      id: "3",
      name: "Nikon D850",
      imageUrl:
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80",
      features: "DSLR Camera, 45.7MP, 4K UHD Video",
      price: 225000,
    },
  ]);

  // Mock data for users
  const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      joinDate: "2023-01-15",
      orders: 5,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      joinDate: "2023-02-20",
      orders: 3,
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      joinDate: "2023-03-10",
      orders: 8,
    },
  ];

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would add the product to the database
    // For now, we'll just close the dialog
    setShowAddProductDialog(false);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setShowEditProductDialog(true);
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would update the product in the database
    // For now, we'll just close the dialog
    setShowEditProductDialog(false);
  };

  const handleDeleteProduct = (productId: string) => {
    // In a real app, you would delete the product from the database
    // For now, we'll just filter it out from our local state
    setProducts(products.filter((product) => product.id !== productId));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r p-4 flex flex-col">
        <div className="text-2xl font-bold mb-8 text-center">ShutterHive</div>
        <div className="flex flex-col space-y-2">
          <Button
            variant={activeTab === "users" ? "default" : "ghost"}
            className="justify-start"
            onClick={() => setActiveTab("users")}
          >
            <Users className="mr-2 h-5 w-5" />
            Users
          </Button>
          <Button
            variant={activeTab === "products" ? "default" : "ghost"}
            className="justify-start"
            onClick={() => setActiveTab("products")}
          >
            <Package className="mr-2 h-5 w-5" />
            Products
          </Button>
          <Button variant="ghost" className="justify-start mt-auto">
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="bg-card rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Orders</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>{user.orders}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="products" className="bg-card rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Product Management</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-8 w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button onClick={() => setShowAddProductDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>Price (₹)</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell>{product.features}</TableCell>
                    <TableCell>{product.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Product Dialog */}
      <Dialog
        open={showAddProductDialog}
        onOpenChange={setShowAddProductDialog}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddProduct}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input id="imageUrl" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="features" className="text-right">
                  Features
                </Label>
                <Textarea id="features" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price (₹)
                </Label>
                <Input
                  id="price"
                  type="number"
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Product</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog
        open={showEditProductDialog}
        onOpenChange={setShowEditProductDialog}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateProduct}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  className="col-span-3"
                  defaultValue={currentProduct?.name}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="edit-imageUrl"
                  className="col-span-3"
                  defaultValue={currentProduct?.imageUrl}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-features" className="text-right">
                  Features
                </Label>
                <Textarea
                  id="edit-features"
                  className="col-span-3"
                  defaultValue={currentProduct?.features}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">
                  Price (₹)
                </Label>
                <Input
                  id="edit-price"
                  type="number"
                  className="col-span-3"
                  defaultValue={currentProduct?.price}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Product</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
