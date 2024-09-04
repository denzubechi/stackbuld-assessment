"use client";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "./_components/ProductCard";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(3); // Set items per page for pagination

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        {displayedProducts.length === 0 ? (
          <Skeleton className="w-full h-40 bg-gray-400" />
        ) : (
          displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProductId(product.id === selectedProductId ? null : product.id)}
              isSelected={selectedProductId === product.id}
            />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

// Pagination component
const Pagination = ({ totalPages, currentPage, onPageChange }: { totalPages: number; currentPage: number; onPageChange: (page: number) => void }) => {
  return (
    <div className="flex gap-2">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2"
      >
        Previous
      </Button>
      {[...Array(totalPages)].map((_, i) => (
        <Button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`px-4 py-2 ${currentPage === i + 1 ? "bg-primary text-white" : ""}`}
        >
          {i + 1}
        </Button>
      ))}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2"
      >
        Next
      </Button>
    </div>
  );
};
