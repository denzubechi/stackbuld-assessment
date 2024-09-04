"use client";

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IconStar } from "@tabler/icons-react";

interface ProductDialogProps {
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
    rating: number;
  };
}

export function ProductDialog({ product }: ProductDialogProps) {
  return (
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle>{product.name}</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <Image src={product.image} alt={product.name} className="rounded" width={400} height={300} />
        <p>{product.description}</p>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <IconStar key={i} size={20} fill={i < Math.round(product.rating) ? "gold" : "gray"} />
          ))}
          <p className="ml-2 text-lg font-semibold">{product.rating}</p>
        </div>
        <p className="text-lg font-bold">{product.price}</p>
        <Button className="w-full">Buy Now</Button>
      </div>
    </DialogContent>
  );
}
