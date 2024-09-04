"use client";
import { useState, useEffect } from "react";
import { AdminPageHeader } from "../_components/admin-sections";
import BaseTable from "@/components/table/base-table";
import { productColumns as baseProductColumns } from "@/components/table/columns/product.columns";
import { Button } from "@/components/ui/button";
import { Plus, Undo2 } from "lucide-react";
import CreateEditProductDialog from "./_components/CreateEditProduct.dialog";
import DeleteProductDialog from "./_components/DeleteProduct.dialogue";
import { IProduct } from "@/interfaces";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/table/table-header-item";

export default function ProductPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const saveProductsToLocalStorage = (newProducts: IProduct[]) => {
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  const handleSaveProduct = (product: IProduct) => {
    const updatedProducts = products.some((p) => p.id === product.id)
      ? products.map((p) => (p.id === product.id ? product : p))
      : [...products, product];
    saveProductsToLocalStorage(updatedProducts);
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    saveProductsToLocalStorage(updatedProducts);
  };

  const productColumns = [
    ...baseProductColumns,
    {
      accessorKey: "actions",
      header: "Actions",
      cell: (info: any) => (
        <div className="flex gap-2">
          <CreateEditProductDialog
            product={info.row.original}
            onSave={handleSaveProduct}
          >
            <Button variant="outline">Edit</Button>
          </CreateEditProductDialog>
          <DeleteProductDialog
            productTitle={info.row.original.title}
            onDelete={() => handleDeleteProduct(info.row.original.id)}
          >
            <Button variant="destructive">Delete</Button>
          </DeleteProductDialog>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">
      <AdminPageHeader title="Products" />
      <div className="flex w-full mt-12 items-center justify-between">
        <Button className="flex items-center bg-white text-black w-fit h-full gap-3 py-3" onClick={() => window.history.back()}>
          <Undo2 size={"1.1rem"} color="black" />
          Back
        </Button>
        <CreateEditProductDialog onSave={handleSaveProduct}>
          <Button className="flex items-center w-fit h-full gap-3 py-5">
            <Plus size={"1.1rem"} />
            Add New Product
          </Button>
        </CreateEditProductDialog>
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-8">
          <Skeleton className="w-full h-40" />
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center mt-8">
          <p className="text-lg">No Products Available</p>
        </div>
      ) : (
        <div className="flex flex-col mt-6 leading-[140%] max-md:max-w-full">
          <BaseTable
            data={products}
            columns={productColumns}
          />
        </div>
      )}
    </div>
  );
}
