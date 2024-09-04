"use client";
import { useState } from "react";
import { AdminPageHeader } from "../_components/admin-sections";
import BaseTable from "@/components/table/base-table";
import { productColumns } from "@/components/table/columns/product.columns"; // Updated the column name to reflect product columns
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Undo2 } from "lucide-react";
import { productList } from "@/lib/mock/products"; 
import { useRouter } from "next/navigation";
import CreateProductDialog from "./_components/CreateProduct.dialog";

export default function ProductPage() {
  const router = useRouter();
  const [data, setData] = useState(productList); // Use product data

  return (
    <div className="flex flex-col self-stretch px-16 mt-8 max-md:px-5 max-md:max-w-full">
      <AdminPageHeader title="Products" />

      <div className="flex w-full mt-12 items-center justify-between">
        <Button className="flex items-center bg-white text-black w-fit h-full gap-3 py-3" onClick={() => router.back()}>
          <Undo2 size={'1.1rem'} color="black" />
          Back
        </Button>
        <CreateProductDialog>
          <Button className="flex items-center w-fit h-full gap-3 py-5">
            <Plus size={'1.1rem'} />
            Add New Product
          </Button>
        </CreateProductDialog>
      </div>

      <div className="flex flex-col mt-6 leading-[140%] max-md:max-w-full">
        <BaseTable data={data} columns={productColumns} />
      </div>
    </div>
  );
}
