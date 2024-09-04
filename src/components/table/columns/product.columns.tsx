"use client";
import { toast } from "@/components/ui/use-toast";
import { IProduct } from "@/interfaces";
import { Column, createColumnHelper } from "@tanstack/react-table";
import Header from "../table-header-item";
import Actions from "../table-actions";
import { Button } from "@/components/ui/button";
import Status from "@/app/(dashboard)/_components/Status"; 
import { Checkbox } from "@/components/ui/checkbox";

const columnHelper = createColumnHelper<IProduct>(); 

export const productColumns = [
  columnHelper.accessor("id", {
    header: ({ column }) => <Header title="" column={column} />,
    cell: (info) => <Checkbox className="w-5 h-5" />, // Checkbox for selection
  }),
  columnHelper.accessor("title", {
    header: ({ column }) => <Header title="Product Name" column={column} />,
    cell: (info) => <span className="whitespace-nowrap">{info.getValue()?.toString()}</span>,
  }),
  columnHelper.accessor("price", {
    header: ({ column }) => <Header title="Price" column={column} />,
    cell: (info) => <span>{info.getValue()?.toString()}</span>,
  }),
  columnHelper.accessor("image", {
    header: ({ column }) => <Header title="Image" column={column} />,
    cell: (info) => <img src={info.getValue()?.toString()} alt="Product Image" className="w-16 h-16" />, // Display product image
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => <Header title="Status" column={column} />,
    cell: (info) => <Status value={info.getValue()} />,
  }),
  columnHelper.accessor("id", {
    cell: (info) => {
      return (
        <Actions
          editFunction={async () => {
            // edit function
          }}
          deleteFunction={async () => {
            toast({ description: "Product deleted!" });
          }}
        />
      );
    },
    header: ({ column }) => <Header title="Actions" column={column} />,
  }),
];
