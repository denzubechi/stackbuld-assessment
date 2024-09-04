"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { ProductDialog } from "./ProductDialoge";
import { IconStar } from '@tabler/icons-react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
    category: string;
    rating: number;
  };
  onClick: () => void;
  isSelected: boolean;
}

export function ProductCard({ product, onClick, isSelected }: ProductCardProps) {
  return (
    <Dialog onOpenChange={(open) => !open && onClick()}>
      <DialogTrigger asChild>
        <div
          className="p-4 flex flex-col gap-2 w-full rounded border bg-white cursor-pointer"
          onClick={onClick}
        >
          <Image src={product.image} alt={product.name} className="rounded" width={200} height={150} />
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold whitespace-nowrap">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.price}</p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <IconStar key={i} size={16} fill={i < Math.round(product.rating) ? "gold" : "gray"} />
              ))}
              <p className="ml-2 text-sm text-gray-600">{product.rating}</p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      {isSelected && <ProductDialog product={product} />}
    </Dialog>
  );
}
