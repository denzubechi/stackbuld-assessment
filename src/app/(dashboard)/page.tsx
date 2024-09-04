"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "./_components/ProductCard";

export default function DashboardPage() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Mock product data
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: "₦1,000",
      image: "/path-to-your-image/product.png", // Update with correct image path
      description: "This is the description for Product 1.",
      category: "Electronics",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Product 2",
      price: "₦2,000",
      image: "/path-to-your-image/product.png", // Update with correct image path
      description: "This is the description for Product 2.",
      category: "Fashion",
      rating: 3.8,
    },
    {
      id: 3,
      name: "Product 3",
      price: "₦3,000",
      image: "/path-to-your-image/product.png", // Update with correct image path
      description: "This is the description for Product 3.",
      category: "Home Appliances",
      rating: 4.2,
    },
    {
      id: 4,
      name: "Product 4",
      price: "₦4,000",
      image: "/path-to-your-image/product.png", // Update with correct image path
      description: "This is the description for Product 4.",
      category: "Fashion",
      rating: 4.7,
    },
    {
      id: 5,
      name: "Product 5",
      price: "₦5,000",
      image: "/path-to-your-image/product.png", // Update with correct image path
      description: "This is the description for Product 5.",
      category: "Electronics",
      rating: 3.9,
    },
    {
      id: 6,
      name: "Product 6",
      price: "₦6,000",
      image: "/path-to-your-image/product.png", // Update with correct image path
      description: "This is the description for Product 6.",
      category: "Home Appliances",
      rating: 4.1,
    },
  ];

  // Filter products by selected category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="self-stretch flex flex-col gap-4 px-16 mt-8 max-md:px-5 max-md:max-w-full">
      <div className="flex justify-between items-center mb-6 max-md:flex-col max-md:gap-4">
        <h1 className="text-2xl font-bold whitespace-nowrap">Product Listings</h1>
        <Select onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger className="flex w-full h-full px-3 py-2 text-sm text-black border rounded-md border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-md:w-full md:w-auto">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Fashion">Fashion</SelectItem>
            <SelectItem value="Home Appliances">Home Appliances</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length === 0 ? (
          <Skeleton className="w-full h-40 bg-gray-400" />
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProductId(product.id === selectedProductId ? null : product.id)}
              isSelected={selectedProductId === product.id}
            />
          ))
        )}
      </div>
    </div>
  );
}
